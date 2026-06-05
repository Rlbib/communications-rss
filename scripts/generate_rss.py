import os
import requests
import xml.sax.saxutils as sx
import dateutil.parser
import datetime

# ==========================================
# CONFIGURATION - À PERSONNALISER
# ==========================================
# Remplace {DOC_ID} et {TABLE_ID} par tes vraies valeurs Grist
GRIST_API_URL = "https://grist.numerique.gouv.fr/api/docs/9yLQzULqduhD/tables/Com/data"
SITE_TITLE = "Communications"
SITE_LINK = "https://votre-site.example" # Mets l'adresse de ton site si tu en as un
SITE_DESC = "Flux RSS généré depuis la vue Com de Grist"
# ==========================================

def iso_to_rfc2822(iso):
    try:
        dt = dateutil.parser.isoparse(iso)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.strftime("%a, %d %b %Y %H:%M:%S %z")
    except Exception:
        return datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")

def fetch_rows():
    api_key = os.environ.get("GRIST_API_KEY")
    if not api_key:
        raise SystemExit("Erreur : La clé GRIST_API_KEY est manquante dans les secrets GitHub.")
    
    headers = {"Authorization": f"Bearer {api_key}"}
    resp = requests.get(GRIST_API_URL, headers=headers)
    resp.raise_for_status()
    return resp.json()

def get_field(rec, name):
    if isinstance(rec, dict):
        if "fields" in rec and isinstance(rec["fields"], dict):
            return rec["fields"].get(name)
        return rec.get(name)
    return None

def build_items(rows):
    items = []
    candidates = rows.get("records") if isinstance(rows, dict) and "records" in rows else rows
    
    for r in (candidates or []):
        titre = get_field(r, "Titre") or "Sans titre"
        link = get_field(r, "Lien_vers_affiche") or get_field(r, "URL_de_l_image") or SITE_LINK
        desc = get_field(r, "Description") or ""
        date_debut = get_field(r, "Date_Debut") or ""
        ville = get_field(r, "Ville") or ""
        loc = get_field(r, "Localisation") or ""
        guid = r.get("id") or get_field(r, "id") or link
        
        meta = []
        if loc: meta.append(loc)
        if ville: meta.append(ville)
        
        full_desc = (", ".join(meta) + "\n\n" + desc) if desc else ", ".join(meta)
        pub_rfc = iso_to_rfc2822(date_debut) if date_debut else datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")
        
        items.append(f"""  <item>
    <title>{sx.escape(str(titre))}</title>
    <link>{sx.escape(str(link))}</link>
    <guid isPermaLink="false">{sx.escape(str(guid))}</guid>
    <pubDate>{pub_rfc}</pubDate>
    <description>{sx.escape(str(full_desc))}</description>
  </item>""")
          
    return "\n".join(items)

def main():
    rows = fetch_rows()
    items_xml = build_items(rows)
    now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")
    
    rss = f'''<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
<channel>
  <title>{sx.escape(SITE_TITLE)}</title>
  <link>{sx.escape(SITE_LINK)}</link>
  <description>{sx.escape(SITE_DESC)}</description>
  <lastBuildDate>{now}</lastBuildDate>
{items_xml}
</channel>
</rss>'''
    
    with open("rss.xml", "w", encoding="utf-8") as f:
        f.write(rss)
    print("Le fichier rss.xml a été généré avec succès.")

if __name__ == "__main__":
    main()
