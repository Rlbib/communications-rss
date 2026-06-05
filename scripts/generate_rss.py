import os
import requests
import xml.sax.saxutils as sx
import dateutil.parser
import datetime

# ==========================================
# CONFIGURATION
# ==========================================
DOC_ID = "9yLQzULqduhD"
TABLE_ID = "Com" 

# Utilisation de l'endpoint public /records (le serveur Grist refuse /data)
GRIST_API_URL = f"https://grist.numerique.gouv.fr/api/docs/{DOC_ID}/tables/{TABLE_ID}/records"

SITE_TITLE = "Communications"
SITE_LINK = "https://grist.numerique.gouv.fr"
SITE_DESC = "Flux RSS généré depuis la vue Com de Grist"
# ==========================================

def iso_to_rfc2822(iso):
    """Convertit une date ISO de Grist au format standardisé RFC2822 pour le RSS."""
    try:
        dt = dateutil.parser.isoparse(iso)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.strftime("%a, %d %b %Y %H:%M:%S %z")
    except Exception:
        # En cas d'erreur de parsing, retourne la date et l'heure actuelle
        return datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")

def fetch_rows():
    """Récupère publiquement les lignes du document Grist."""
    print(f"Tentative d'accès public à l'API : {GRIST_API_URL}")
    
    # Appel anonyme sans token d'autorisation requis
    resp = requests.get(GRIST_API_URL)
    
    if resp.status_code != 200:
        print(f"Erreur de l'API Grist ({resp.status_code}) : {resp.text}")
        raise SystemExit(f"Le serveur Grist a renvoyé une erreur. Vérifiez le TABLE_ID '{TABLE_ID}'.")
        
    return resp.json()

def get_field(rec, name):
    """Récupère proprement un champ dans l'objet de record Grist."""
    if isinstance(rec, dict):
        if "fields" in rec and isinstance(rec["fields"], dict):
            return rec["fields"].get(name)
        return rec.get(name)
    return None

def build_items(rows):
    """Génère la structure XML de chaque item du flux RSS."""
    items = []
    
    if isinstance(rows, dict) and "records" in rows:
        candidates = rows["records"]
    elif isinstance(rows, list):
        candidates = rows
    else:
        print(f"Format de données inattendu reçu de Grist : {rows}")
        return ""
    
    for r in (candidates or []):
        if not isinstance(r, dict):
            continue
            
        # Extraction robuste des champs (insensible à la casse)
        titre = get_field(r, "Titre") or get_field(r, "titre") or "Sans titre"
        link = get_field(r, "Lien_vers_affiche") or get_field(r, "URL_de_l_image") or get_field(r, "Lien") or get_field(r, "lien") or SITE_LINK
        desc = get_field(r, "Description") or get_field(r, "description") or ""
        ville = get_field(r, "Ville") or get_field(r, "ville") or ""
        loc = get_field(r, "Localisation") or get_field(r, "localisation") or ""
        guid = r.get("id") or get_field(r, "id") or link
        
        # ADAPTATION INTELLIGENTE : Recherche multicritère de la colonne Date dans Grist
        date_debut = ""
        champs_dates_possibles = [
            "Date_Debut", "Date_debut", "date_debut", 
            "Date", "date", "Date de début", "Start Date"
        ]
        
        for champ in champs_dates_possibles:
            valeur_trouvee = get_field(r, champ)
            if valeur_trouvee:
                date_debut = valeur_trouvee
                break
        
        # Mise en forme de la localisation et de la description
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
    print("Le fichier rss.xml a été généré avec succès en mode public.")

if __name__ == "__main__":
    main()
