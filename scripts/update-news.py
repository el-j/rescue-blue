#!/usr/bin/env python3
"""
Fetch news from trusted RSS feeds, filter for AfD extremist/fascist actions,
combine articles reporting on the same event into one entry, and save to public/news.json.
This version uses a regex-based RSS parser and supports combining multiple sources.
"""

import html
import json
import re
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

# News feeds list
FEEDS = [
    ("Taz", "https://taz.de/Politik/!p4615;rss/"),
    ("Tagesschau", "https://www.tagesschau.de/xml/rss2/"),
    ("Spiegel", "https://www.spiegel.de/politik/index.rss"),
    ("Süddeutsche Zeitung", "https://rss.sueddeutsche.de/rss/Politik"),
    ("Zeit Online", "https://newsfeed.zeit.de/politik/index"),
    ("CORRECTIV", "https://correctiv.org/feed/"),
    ("Volksverpetzer", "https://www.volksverpetzer.de/feed/"),
    ("Belltower.News", "https://www.belltower.news/feed/"),
]

# Keywords for AfD politicians
AFD_KEYWORDS = [
    r"\bafd\b",
    r"\bhöcke\b",
    r"\bkrah\b",
    r"\bchrupalla\b",
    r"\bweidel\b",
    r"\bhalemba\b",
    r"\bbystron\b",
    r"\bkalbitz\b",
    r"\bjens maier\b",
]

# Keywords for extremist/fascist actions/judgments/scandals
EXTREMIST_KEYWORDS = [
    r"fasch",
    r"neonazi",
    r"rechtsextrem",
    r"verfassungsfeind",
    r"hitlergru",
    r"sa-parole",
    r"volksverhetzung",
    r"remigration",
    r"vertreibung",
    r"spionage",
    r"spion",
    r"geldstrafe",
    r"urteil",
    r"prozess",
    r"geheimtreffen",
    r"verurteil",
    r"völkisch",
    r"rechtspopul",
    r"xenophob",
    r"fremdenfeind",
    r"verfassungsbeobachtung",
    r"beobachtungsobjekt",
    r"gesichert rechtsextrem",
    r"parteiverbot",
    r"ovg",
    r"münster",
    r"verfassungsschutz",
    r"bestech",
    r"agententätigkeit",
    r"geldwäsche",
    r"staatsanwaltschaft",
    r"durchsuch",
]

MONTHS = {
    "jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6,
    "jul": 7, "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12,
    "mrz": 3, "mai": 5, "okt": 10, "dez": 12
}

def clean_html(text):
    """Remove HTML tags and unescape HTML entities."""
    if not text:
        return ""
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def parse_date(date_str):
    """Parse RSS pubDate format to ISO date (YYYY-MM-DD) locale-independently."""
    if not date_str:
        return datetime.utcnow().strftime("%Y-%m-%d")
    
    date_str = date_str.strip()
    iso_match = re.search(r"(\d{4})-(\d{2})-(\d{2})", date_str)
    if iso_match:
        return iso_match.group(0)
        
    rfc_match = re.search(r"(\d{1,2})\s+([a-zA-ZäöüÄÖÜß]{3,9})\s+(\d{4})", date_str)
    if rfc_match:
        day = int(rfc_match.group(1))
        month_word = rfc_match.group(2).lower()[:3]
        year = int(rfc_match.group(3))
        month = MONTHS.get(month_word, 1)
        return f"{year:04d}-{month:02d}-{day:02d}"
        
    formats = [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S GMT",
        "%d %b %Y %H:%M:%S %z",
        "%Y-%m-%dT%H:%M:%S%z",
    ]
    for fmt in formats:
        try:
            dt = datetime.strptime(date_str, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
            
    return datetime.utcnow().strftime("%Y-%m-%d")

def fetch_feed_items(source_name, url):
    print(f"Fetching {source_name} feed...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            xml_data = response.read()
            return parse_rss(source_name, xml_data)
    except Exception as e:
        print(f"Error fetching {source_name}: {e}", file=sys.stderr)
        return []

def parse_rss(source_name, xml_data_bytes):
    """Regex-based RSS parser to avoid C-extension expat dependency issues."""
    try:
        xml_data = xml_data_bytes.decode('utf-8', errors='ignore')
    except Exception:
        xml_data = xml_data_bytes.decode('latin-1', errors='ignore')
        
    items = []
    item_blocks = re.findall(r'<item>(.*?)</item>', xml_data, re.DOTALL | re.IGNORECASE)
    
    for block in item_blocks:
        title_match = re.search(r'<title>(.*?)</title>', block, re.DOTALL | re.IGNORECASE)
        title_text = title_match.group(1).strip() if title_match else ""
        if title_text.startswith('<![CDATA[') and title_text.endswith(']]>'):
            title_text = title_text[9:-3].strip()
            
        link_match = re.search(r'<link>(.*?)</link>', block, re.DOTALL | re.IGNORECASE)
        link_text = link_match.group(1).strip() if link_match else ""
        if link_text.startswith('<![CDATA[') and link_text.endswith(']]>'):
            link_text = link_text[9:-3].strip()
            
        desc_match = re.search(r'<description>(.*?)</description>', block, re.DOTALL | re.IGNORECASE)
        desc_text = desc_match.group(1).strip() if desc_match else ""
        if not desc_text:
            content_match = re.search(r'<content:encoded>(.*?)</content:encoded>', block, re.DOTALL | re.IGNORECASE)
            desc_text = content_match.group(1).strip() if content_match else ""
            
        if desc_text.startswith('<![CDATA[') and desc_text.endswith(']]>'):
            desc_text = desc_text[9:-3].strip()
            
        date_match = re.search(r'<pubDate>(.*?)</pubDate>', block, re.DOTALL | re.IGNORECASE)
        date_text = date_match.group(1).strip() if date_match else ""
        if date_text.startswith('<![CDATA[') and date_text.endswith(']]>'):
            date_text = date_text[9:-3].strip()
            
        if not title_text or not link_text:
            continue
            
        cleaned_desc = clean_html(desc_text)
        if len(cleaned_desc) > 180:
            cleaned_desc = cleaned_desc[:177] + "..."
            
        items.append({
            "title": clean_html(title_text),
            "source": source_name,
            "url": link_text.strip(),
            "date": parse_date(date_text),
            "excerpt": cleaned_desc,
        })
    return items

def matches_filters(item):
    """Filter newly fetched articles. Existing ones in news.json are kept to preserve history."""
    title_lower = item["title"].lower()
    text_to_check = (item["title"] + " " + item["excerpt"]).lower()
    
    # 1. The title itself must mention AfD or an AfD politician
    has_afd_in_title = any(re.search(pat, title_lower) for pat in AFD_KEYWORDS)
    if not has_afd_in_title:
        return False
        
    # 2. Exclude other party internal disputes (e.g. Die Linke, BSW, Wagenknecht) in the title
    EXCLUSIONS = [
        r"\blinke\b",
        r"\blinkspartei\b",
        r"\blinkenchef\b",
        r"\blinkespende\b",
        r"\bbsw\b",
        r"\bwagenknecht\b",
    ]
    has_exclusion_in_title = any(re.search(pat, title_lower) for pat in EXCLUSIONS)
    if has_exclusion_in_title:
        return False
        
    # 3. Check extremist/fascist association anywhere in title or excerpt
    has_extremist = any(re.search(pat, text_to_check) for pat in EXTREMIST_KEYWORDS)
    
    return has_extremist

def get_similarity_key(title):
    """Decompose title to lowercase keywords for similarity checks."""
    # Replace hyphens with spaces to split compound words (e.g., hitlergruß-vorwurf)
    normalized = title.lower().replace('-', ' ')
    words = re.sub(r'[^a-z0-9äöüß\s]', '', normalized).split()
    stop_words = {'in', 'der', 'die', 'das', 'und', 'ist', 'im', 'mit', 'von', 'auf', 'den', 'dem', 'am', 'für', 'zu', 'als', 'und'}
    keywords = [w for w in words if len(w) > 3 and w not in stop_words]
    return sorted(list(set(keywords)))

def are_similar(item1, item2):
    """Check if two articles are published on the same date and report the same event."""
    if item1["date"] != item2["date"]:
        return False
        
    keys1 = get_similarity_key(item1["title"])
    keys2 = get_similarity_key(item2["title"])
    
    if not keys1 or not keys2:
        return False
        
    # Overlap metric
    shared = set(keys1).intersection(set(keys2))
    # Share at least 2 significant words or 50% keyword overlap
    if len(shared) >= 2 or (len(shared) / max(len(keys1), len(keys2)) >= 0.5):
        return True
    return False

def combine_articles(articles):
    """Merge similar items into a single entry with multiple sources."""
    combined = []
    for item in articles:
        # Guarantee item has "sources" format
        if "sources" not in item:
            item = {
                "title": item["title"],
                "date": item["date"],
                "excerpt": item["excerpt"],
                "sources": [{"name": item.get("source", "Unknown"), "url": item.get("url", "")}]
            }
            
        found = False
        for c_item in combined:
            if are_similar(c_item, item):
                # Merge sources
                existing_urls = {src["url"] for src in c_item["sources"]}
                for src in item["sources"]:
                    if src["url"] not in existing_urls:
                        c_item["sources"].append(src)
                # Keep the longer title and excerpt for detail completeness
                if len(item["title"]) > len(c_item["title"]):
                    c_item["title"] = item["title"]
                if len(item["excerpt"]) > len(c_item["excerpt"]):
                    c_item["excerpt"] = item["excerpt"]
                found = True
                break
                
        if not found:
            combined.append(item)
            
    return combined

def main():
    output_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / "news.json"

    # Load existing news if file exists to append
    existing_items = []
    if output_file.exists():
        try:
            existing_content = output_file.read_text(encoding="utf-8")
            if existing_content.strip():
                existing_items = json.loads(existing_content)
                if not isinstance(existing_items, list):
                    existing_items = []
            
            # Upgrade existing items in-memory if they use the legacy single-source format
            for item in existing_items:
                if "sources" not in item:
                    item["sources"] = [{"name": item.get("source", "Unknown"), "url": item.get("url", "")}]
                    if "source" in item: del item["source"]
                    if "url" in item: del item["url"]
                    
            print(f"Loaded {len(existing_items)} existing news items from {output_file}")
        except Exception as e:
            print(f"Could not load existing news: {e}", file=sys.stderr)

    # Fetch new items
    all_items = []
    for name, url in FEEDS:
        items = fetch_feed_items(name, url)
        all_items.extend(items)

    print(f"Total raw items fetched: {len(all_items)}")

    # Filter only newly fetched items
    filtered_items = [item for item in all_items if matches_filters(item)]
    print(f"Filtered new items: {len(filtered_items)}")

    # Convert new items to the standard combined schema
    new_formatted_items = []
    for item in filtered_items:
        new_formatted_items.append({
            "title": item["title"],
            "date": item["date"],
            "excerpt": item["excerpt"],
            "sources": [{"name": item["source"], "url": item["url"]}]
        })

    # Combine existing (already filtered and seeded) and newly fetched items
    combined_items = existing_items + new_formatted_items

    # Merge/Group similar items together (different sources reporting same news)
    grouped_items = combine_articles(combined_items)

    # Sort by date descending
    grouped_items.sort(key=lambda x: x["date"], reverse=True)

    # Write all total news back to file (keep the history!)
    output_file.write_text(json.dumps(grouped_items, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(grouped_items)} total combined news items to {output_file}")

if __name__ == "__main__":
    main()
