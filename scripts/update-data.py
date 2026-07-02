#!/usr/bin/env python3
"""
Fetch petition signature count from Change.org and polling snapshot from
dawum.de, then write static JSON files to the given output directory.
Called by the update-count GitHub Actions workflow.
"""

import gzip
import json
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

# Canonical petition URL (change.org redirects slug variants here)
CHANGE_ORG_URL = (
    'https://www.change.org/p/'
    '%C3%A4ndern-der-afd-darstellung-in-medien-von-blau-zu-braun'
)

DAWUM_API_URL = 'https://api.dawum.de/'
INSA_INSTITUTE = 'INSA'
BUNDESTAG_PARLIAMENT_ID = '0'

PARLIAMENTS = {
    '0': {'nameDe': 'Bundestag (Deutschland)', 'nameEn': 'Bundestag (Germany)', 'slug': 'bundestag'},
    '1': {'nameDe': 'Baden-Württemberg', 'nameEn': 'Baden-Württemberg', 'slug': 'baden-wuerttemberg'},
    '2': {'nameDe': 'Bayern', 'nameEn': 'Bavaria', 'slug': 'bayern'},
    '3': {'nameDe': 'Berlin', 'nameEn': 'Berlin', 'slug': 'berlin'},
    '4': {'nameDe': 'Brandenburg', 'nameEn': 'Brandenburg', 'slug': 'brandenburg'},
    '5': {'nameDe': 'Bremen', 'nameEn': 'Bremen', 'slug': 'bremen'},
    '6': {'nameDe': 'Hamburg', 'nameEn': 'Hamburg', 'slug': 'hamburg'},
    '7': {'nameDe': 'Hessen', 'nameEn': 'Hesse', 'slug': 'hessen'},
    '8': {'nameDe': 'Mecklenburg-Vorpommern', 'nameEn': 'Mecklenburg-Vorpommern', 'slug': 'mecklenburg-vorpommern'},
    '9': {'nameDe': 'Niedersachsen', 'nameEn': 'Lower Saxony', 'slug': 'niedersachsen'},
    '10': {'nameDe': 'Nordrhein-Westfalen', 'nameEn': 'North Rhine-Westphalia', 'slug': 'nordrhein-westfalen'},
    '11': {'nameDe': 'Rheinland-Pfalz', 'nameEn': 'Rhineland-Palatinate', 'slug': 'rheinland-pfalz'},
    '12': {'nameDe': 'Saarland', 'nameEn': 'Saarland', 'slug': 'saarland'},
    '13': {'nameDe': 'Sachsen', 'nameEn': 'Saxony', 'slug': 'sachsen'},
    '14': {'nameDe': 'Sachsen-Anhalt', 'nameEn': 'Saxony-Anhalt', 'slug': 'sachsen-anhalt'},
    '15': {'nameDe': 'Schleswig-Holstein', 'nameEn': 'Schleswig-Holstein', 'slug': 'schleswig-holstein'},
    '16': {'nameDe': 'Thüringen', 'nameEn': 'Thuringia', 'slug': 'thueringen'}
}

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

# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def curl_get(url, user_agent):
    """Fetch URL via curl subprocess — better TLS fingerprint than Python urllib."""
    cmd = [
        'curl', '-sL', '--max-time', '30', '--compressed', '--fail',
        '-H', f'User-Agent: {user_agent}',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        '-H', 'Accept-Language: de,en-US;q=0.7,en;q=0.3',
        '-H', 'Connection: keep-alive',
        url,
    ]
    result = subprocess.run(cmd, capture_output=True, timeout=40)
    if result.returncode != 0:
        stderr = result.stderr.decode('utf-8', errors='replace').strip()
        raise RuntimeError(f'curl exit {result.returncode}: {stderr[:200]}')
    return result.stdout.decode('utf-8', errors='replace')


def urllib_get(url, user_agent=None):
    """Fetch URL via Python urllib."""
    ua = user_agent or 'Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0'
    headers = {
        'User-Agent': ua,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read()
        if 'gzip' in resp.info().get('Content-Encoding', ''):
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

# Change.org server-side renders petition data for Googlebot. The JSON blob in
# the SSR HTML contains signatureCount.total which is the authoritative count.
_CHANGE_ORG_PATTERNS = [
    r'"signatureCount"\s*:\s*\{[^}]*"total"\s*:\s*(\d+)',
    r'"signatureCount"\s*:\s*\{[^}]*"displayed"\s*:\s*(\d+)',
    r'"signature_count"\s*:\s*(\d+)',
    r'"displayed_signature_count"\s*:\s*"?([\d,]+)"?',
    r'"supporter_count"\s*:\s*(\d+)',
]

_GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
_FIREFOX_UA = 'Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0'


def extract_change_org_count(content):
    for pat in _CHANGE_ORG_PATTERNS:
        m = re.search(pat, content, re.IGNORECASE)
        if m:
            count = int(m.group(1).replace(',', ''))
            if count > 0:
                return count
    return None


def fetch_signature_count(output_dir):
    existing_file = output_dir / 'signature-count.json'

    # change.org serves SSR content (including signatureCount JSON) to
    # Googlebot; all other bot detection blocks standard user-agents.
    strategies = [
        ('curl + Googlebot UA',  lambda: curl_get(CHANGE_ORG_URL, _GOOGLEBOT_UA)),
        ('urllib + Googlebot UA', lambda: urllib_get(CHANGE_ORG_URL, _GOOGLEBOT_UA)),
        ('curl + Firefox UA',    lambda: curl_get(CHANGE_ORG_URL, _FIREFOX_UA)),
        ('allorigins proxy',     lambda: urllib_get(
            'https://api.allorigins.win/raw?url=' + urllib.parse.quote(CHANGE_ORG_URL),
        )),
    ]

    for name, fetch_fn in strategies:
        print(f'  [{name}] fetching …')
        try:
            content = fetch_fn()
            count = extract_change_org_count(content)
            if count:
                existing_file.write_text(json.dumps({'count': count}))
                print(f'  Signature count: {count}  (via {name})')
                return
            snippet = content[:400].replace('\n', ' ')
            print(f'  [{name}] no count found. Snippet: {snippet!r}', file=sys.stderr)
        except Exception as exc:
            print(f'  [{name}] failed: {exc}', file=sys.stderr)

    # All strategies failed — keep existing data so the job still succeeds
    if existing_file.exists():
        existing = json.loads(existing_file.read_text())
        print(
            f'  WARNING: all strategies failed; '
            f'keeping existing count ({existing.get("count")})',
            file=sys.stderr,
        )
        return

    raise ValueError(
        'All Change.org fetch strategies failed and no existing count to fall back to'
    )


# ---------------------------------------------------------------------------
# Polling snapshot — dawum.de (no auth, no CORS issue in CI)
# ---------------------------------------------------------------------------

def fetch_polling_snapshot(output_dir):
    print('Fetching dawum.de polling API …')
    content = urllib_get(DAWUM_API_URL)
    data = json.loads(content)

    surveys = data.get('Surveys', {})
    institutes = data.get('Institutes', data.get('Institute', {}))
    methods = data.get('Methods', {})
    database = data.get('Database', {})

    def extract_party_pct(results, party_key):
        mapping = {
            'cdu': ['1', '101', '102'],
            'afd': ['7'],
            'spd': ['2'],
            'greens': ['4'],
            'left': ['5']
        }
        ids = mapping.get(party_key, [])
        val = 0.0
        for pid in ids:
            if pid in results:
                val += to_float(results[pid])
        return val

    parliament_snapshots = {}

    for parl_id, parl_info in PARLIAMENTS.items():
        parl_surveys = [
            s for s in surveys.values()
            if isinstance(s, dict)
            and str(s.get('Parliament_ID', '')) == parl_id
            and 'Date' in s
        ]
        if not parl_surveys:
            continue

        parl_surveys.sort(key=lambda s: str(s.get('Date', '')), reverse=True)

        latest = None
        pcts = {}
        for survey in parl_surveys:
            results = survey.get('Results', {})
            if not results:
                continue
            has_cdu = any(pid in results for pid in ['1', '101', '102'])
            has_afd = '7' in results
            if has_cdu and has_afd:
                latest = survey
                pcts = {k: extract_party_pct(results, k) for k in ['cdu', 'afd', 'spd', 'greens', 'left']}
                break

        if not latest:
            continue

        total = sum(pcts.values())
        pcts['others'] = max(0.0, round_one(100 - total))

        bars = []
        for b in BASE_BARS:
            bars.append({
                **b,
                'pct': round_one(pcts.get(b['key'], b['pct']))
            })

        inst_id = str(latest.get('Institute_ID', ''))
        institute = institutes.get(inst_id, {})
        inst_name = (
            institute.get('Name', 'Dawum')
            if isinstance(institute, dict) and institute.get('Name')
            else 'Dawum'
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
            'sourceUrl': f"https://dawum.de/{parl_info['slug'].capitalize()}/" if parl_id != '0' else 'https://dawum.de/Bundestag/',
            'nameDe': parl_info['nameDe'],
            'nameEn': parl_info['nameEn']
        }
        parliament_snapshots[parl_id] = snapshot

    out = output_dir / 'polling-snapshot.json'
    out.write_text(json.dumps(parliament_snapshots, indent=2, ensure_ascii=False))
    print(f"  Polling snapshot: Wrote {len(parliament_snapshots)} parliaments polling snapshot.")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    output_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    output_dir.mkdir(parents=True, exist_ok=True)

    errors = []

    print('--- Signature count ---')
    try:
        fetch_signature_count(output_dir)
    except Exception as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        errors.append('signature-count')

    print('--- Polling snapshot ---')
    try:
        fetch_polling_snapshot(output_dir)
    except Exception as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        errors.append('polling-snapshot')

    if errors:
        print(f'Failed (no fallback): {", ".join(errors)}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
