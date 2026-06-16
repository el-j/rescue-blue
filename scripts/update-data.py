#!/usr/bin/env python3
"""
Fetch petition signature count from Change.org and polling snapshot from
dawum.de, then write static JSON files to the given output directory.
Called by the update-count GitHub Actions workflow.
"""

import gzip
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

CHANGE_ORG_URL = (
    'https://www.change.org/p/'
    '%C3%A4ndern-sie-die-afd-darstellung-in-medien-von-blau-zu-braun/'
)
DAWUM_API_URL = 'https://api.dawum.de/'
INSA_INSTITUTE = 'INSA'
BUNDESTAG_PARLIAMENT_ID = '0'

PARTY_IDS = {'cdu': '1', 'afd': '7', 'spd': '2', 'greens': '4', 'left': '5'}

BASE_BARS = [
    {
        'key': 'cdu', 'pct': 22, 'labelDe': 'CDU/CSU', 'labelEn': 'CDU/CSU',
        'defaultColor': 'bg-neutral-950 border border-neutral-700', 'isAfd': False,
    },
    {
        'key': 'afd', 'pct': 29, 'labelDe': 'AfD', 'labelEn': 'AfD',
        'defaultColor': 'bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20',
        'isAfd': True,
    },
    {
        'key': 'spd', 'pct': 13, 'labelDe': 'SPD', 'labelEn': 'SPD',
        'defaultColor': 'bg-red-600', 'isAfd': False,
    },
    {
        'key': 'greens', 'pct': 14, 'labelDe': 'GRÜNE', 'labelEn': 'GREENS',
        'defaultColor': 'bg-green-600', 'isAfd': False,
    },
    {
        'key': 'left', 'pct': 10, 'labelDe': 'LINKE', 'labelEn': 'LEFT',
        'defaultColor': 'bg-pink-600', 'isAfd': False,
    },
    {
        'key': 'others', 'pct': 6, 'labelDe': 'Sonstige', 'labelEn': 'Others',
        'defaultColor': 'bg-neutral-600', 'isAfd': False,
    },
]


def http_get(url, extra_headers=None):
    headers = {
        'User-Agent': (
            'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) '
            'Gecko/20100101 Firefox/120.0'
        ),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
    }
    if extra_headers:
        headers.update(extra_headers)
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read()
        encoding = resp.info().get('Content-Encoding', '')
        if 'gzip' in encoding:
            raw = gzip.decompress(raw)
        return raw.decode('utf-8', errors='replace')


def to_float(value):
    if value is None:
        return None
    try:
        return float(str(value).replace(',', '.'))
    except (ValueError, TypeError):
        return None


def round_one(value):
    return round(value * 10) / 10


# ---------------------------------------------------------------------------
# Change.org signature count
# ---------------------------------------------------------------------------

def fetch_signature_count(output_dir):
    print(f'Fetching Change.org petition page …')
    content = http_get(CHANGE_ORG_URL)

    patterns = [
        r'"signature_count"\s*:\s*(\d+)',
        r'"displayed_signature_count"\s*:\s*"?([\d,]+)"?',
        r'"supporter_count"\s*:\s*(\d+)',
        r'"supporters_count"\s*:\s*(\d+)',
        r'"supportersCount"\s*:\s*(\d+)',
        r'"total_signature_count"\s*:\s*(\d+)',
    ]
    for pat in patterns:
        m = re.search(pat, content, re.IGNORECASE)
        if m:
            count = int(m.group(1).replace(',', ''))
            if count > 0:
                out = output_dir / 'signature-count.json'
                out.write_text(json.dumps({'count': count}))
                print(f'  Signature count: {count}')
                return

    print(f'  Response snippet (first 800 chars):', file=sys.stderr)
    print(f'  {content[:800]!r}', file=sys.stderr)
    raise ValueError('Could not parse signature count from Change.org response')


# ---------------------------------------------------------------------------
# Polling snapshot (dawum.de — no auth needed, CORS not an issue in CI)
# ---------------------------------------------------------------------------

def fetch_polling_snapshot(output_dir):
    print(f'Fetching dawum.de polling API …')
    content = http_get(DAWUM_API_URL, extra_headers={'Accept': 'application/json'})
    data = json.loads(content)

    surveys = data.get('Surveys', {})
    institutes = data.get('Institutes', data.get('Institute', {}))
    methods = data.get('Methods', {})
    database = data.get('Database', {})

    def institute_name(inst_id):
        inst = institutes.get(str(inst_id), {})
        return inst.get('Name', '') if isinstance(inst, dict) else ''

    bundestag_insa = [
        s for s in surveys.values()
        if isinstance(s, dict)
        and str(s.get('Parliament_ID', '')) == BUNDESTAG_PARLIAMENT_ID
        and institute_name(s.get('Institute_ID')) == INSA_INSTITUTE
        and 'Date' in s
    ]
    if not bundestag_insa:
        raise ValueError('No INSA Bundestag surveys found in dawum.de response')

    latest = max(bundestag_insa, key=lambda s: str(s.get('Date', '')))
    results = latest.get('Results', {})

    pcts = {k: to_float(results.get(pid)) for k, pid in PARTY_IDS.items()}
    if any(v is None for v in pcts.values()):
        raise ValueError(f'Missing party percentages: {pcts}')

    total = sum(pcts.values())
    pcts['others'] = max(0.0, round_one(100 - total))

    bars = [{**b, 'pct': round_one(pcts.get(b['key'], b['pct']))} for b in BASE_BARS]

    inst_id = str(latest.get('Institute_ID', ''))
    institute = institutes.get(inst_id, {})
    inst_name = (
        institute.get('Name', INSA_INSTITUTE)
        if isinstance(institute, dict)
        else INSA_INSTITUTE
    )

    method_id = str(latest.get('Method_ID', ''))
    method = methods.get(method_id, {})
    method_name = method.get('Name') if isinstance(method, dict) else None

    sp_raw = latest.get('Survey_Period')
    survey_period = None
    if sp_raw and isinstance(sp_raw, dict):
        survey_period = {
            'start': str(sp_raw.get('Date_Start', '')),
            'end': str(sp_raw.get('Date_End', '')),
        }

    snapshot = {
        'bars': bars,
        'instituteName': inst_name,
        'surveyDate': str(latest.get('Date', '')),
        'surveyPeriod': survey_period,
        'methodName': method_name,
        'surveyedPersons': to_float(latest.get('Surveyed_Persons')),
        'apiUpdatedAt': database.get('Last_Update') if isinstance(database, dict) else None,
        'sourceUrl': 'https://dawum.de/Bundestag/',
    }

    out = output_dir / 'polling-snapshot.json'
    out.write_text(json.dumps(snapshot))
    print(f"  Polling snapshot: {inst_name} {snapshot['surveyDate']}, AfD {pcts.get('afd')}%")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    output_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    output_dir.mkdir(parents=True, exist_ok=True)

    errors = []

    try:
        fetch_signature_count(output_dir)
    except Exception as exc:
        print(f'ERROR fetching signature count: {exc}', file=sys.stderr)
        errors.append('signature-count')

    try:
        fetch_polling_snapshot(output_dir)
    except Exception as exc:
        print(f'ERROR fetching polling snapshot: {exc}', file=sys.stderr)
        errors.append('polling-snapshot')

    if errors:
        print(f'Failed: {", ".join(errors)}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
