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
SITE_DESC = "Flux RSS généré depuis la vue Com de Grist avec Catégories et Dates de Fin"
# ==========================================

def iso_to_rfc2822(val, fallback_to_now=True):
    """Convertit de manière ultra-robuste une date Grist (timestamp ou texte) au format RFC2822."""
    if not val:
        return datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000") if fallback_to_now else ""
    
    # Cas 1 : Si Grist renvoie un timestamp numérique (int ou float)
    if isinstance(val, (int, float)):
        try:
            # Grist renvoie parfois en millisecondes, on s'adapte
            if val > 100000000000: 
                val = val / 1000.0
            dt = datetime.datetime.fromtimestamp(val, datetime.timezone.utc)
            return dt.strftime("%a, %d %b %Y %H:%M:%S %z")
        except Exception:
            pass
            
    val_str = str(val).strip()
    
    # Cas 2 : Si le timestamp est stocké sous forme de texte numérique
    if val_str.replace('.', '', 1).isdigit():
        try:
            ts = float(val_str)
            if ts > 100000000000:
                ts = ts / 1000.0
            dt = datetime.datetime.fromtimestamp(ts, datetime.timezone.utc)
            return dt.strftime("%a, %d %b %Y %H:%M:%S %z")
        except Exception:
            pass

    # Cas 3 : Parsing flexible de chaînes textuelles (ISO, YYYY-MM-DD, etc.)
    try:
        dt = dateutil.parser.parse(val_str)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.strftime("%a, %d %b %Y %H:%M:%S %z")
    except Exception:
        pass
        
    # Repli de secours
    return datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000") if fallback_to_now else ""

def fetch_rows():
    """Récupère publiquement les lignes du document Grist."""
    print(f"Tentative d'accès public à l'API : {GRIST_API_URL}")
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
        
        # 1. ADAPTATION : Recherche multicritère de la Catégorie / Type d'animation
        categorie = "Animation"
        champs_categories_possibles = ["Categorie", "categorie", "Type", "type", "Rubrique", "rubrique", "Genre", "genre"]
        for champ in champs_categories_possibles:
            valeur_trouvee = get_field(r, champ)
            if valeur_trouvee:
                categorie = str(valeur_trouvee).strip()
                break

        # 2. ADAPTATION : Recherche multicritère de la colonne Date de début dans votre tableau Grist
        date_debut = ""
        champs_dates_possibles = [
            "Date_Debut", "Date_debut", "date_debut", 
            "Date", "date", "Date de début", "Start Date", "date_evenement"
        ]
        for champ in champs_dates_possibles:
            valeur_trouvee = get_field(r, champ)
            if valeur_trouvee:
                date_debut = valeur_trouvee
                break

        # 3. ADAPTATION : Recherche de la colonne Date de fin
        date_fin = ""
        champs_fin_possibles = ["Date_Fin", "Date_fin", "date_fin", "Date de fin", "End Date", "Date_fin_evenement"]
        for champ in champs_fin_possibles:
            valeur_trouvee = get_field(r, champ)
            if valeur_trouvee:
                date_fin = valeur_trouvee
                break
        
        # Mise en forme de la localisation et de la description
        meta = []
        if loc: meta.append(loc)
        if ville: meta.append(ville)
        
        full_desc = (", ".join(meta) + "\n\n" + desc) if desc else ", ".join(meta)
        pub_rfc = iso_to_rfc2822(date_debut)
        
        # Formatage de la date de fin (sans fallback sur 'now' si vide)
        pub_fin_rfc = iso_to_rfc2822(date_fin, fallback_to_now=False) if date_fin else ""
        
        # Génération de la balise XML avec notre catégorie et notre balise personnalisée d'endDate
        items.append(f"""  <item>
    <title>{sx.escape(str(titre))}</title>
    <link>{sx.escape(str(link))}</link>
    <guid isPermaLink="false">{sx.escape(str(guid))}</guid>
    <pubDate>{pub_rfc}</pubDate>
    <category>{sx.escape(str(categorie))}</category>
    <endDate>{sx.escape(str(pub_fin_rfc))}</endDate>
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
    print("Le fichier rss.xml a été généré avec succès avec gestion des catégories et des dates de fin.")

if __name__ == "__main__":
    main()
