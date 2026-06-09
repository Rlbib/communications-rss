import os
import requests
import json
import dateutil.parser
import datetime

# ==========================================
# CONFIGURATION
# ==========================================
DOC_ID = "9yLQzULqduhD"
TABLE_ID = "Com" 

# Utilisation de l'endpoint public /records de Grist
GRIST_API_URL = f"https://grist.numerique.gouv.fr/api/docs/{DOC_ID}/tables/{TABLE_ID}/records"
# ==========================================

def fetch_rows():
    """Récupère publiquement les lignes du document Grist."""
    print(f"Tentative d'accès public à l'API Grist : {GRIST_API_URL}")
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

def clean_date(val):
    """Normalise la date de Grist pour renvoyer un format standardisé YYYY-MM-DD."""
    if not val:
        return ""
    # Si c'est un timestamp numérique
    if isinstance(val, (int, float)):
        try:
            if val > 100000000000:
                val = val / 1000.0
            dt = datetime.datetime.fromtimestamp(val, datetime.timezone.utc)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass
    
    val_str = str(val).strip()
    if val_str.replace('.', '', 1).isdigit():
        try:
            ts = float(val_str)
            if ts > 100000000000:
                ts = ts / 1000.0
            dt = datetime.datetime.fromtimestamp(ts, datetime.timezone.utc)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass

    try:
        dt = dateutil.parser.parse(val_str)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return val_str

def build_json_data(rows):
    """Génère la structure JSON conforme à votre modèle à partir des données Grist."""
    events_list = []
    
    if isinstance(rows, dict) and "records" in rows:
        candidates = rows["records"]
    elif isinstance(rows, list):
        candidates = rows
    else:
        print(f"Format de données inattendu reçu de Grist : {rows}")
        return []
    
    for r in (candidates or []):
        if not isinstance(r, dict):
            continue
            
        record_id = r.get("id") or 999
        
        # Extraction robuste et insensible à la casse des métadonnées
        titre = get_field(r, "Titre") or get_field(r, "titre") or "Sans titre"
        
        # Recherche de la catégorie
        categorie = "Animation"
        champs_cat = ["Categorie", "categorie", "Type", "type", "Rubrique", "rubrique", "Genre", "genre"]
        for c in champs_cat:
            val = get_field(r, c)
            if val:
                categorie = str(val).strip()
                break
                
        # Recherche de la localisation
        loc = get_field(r, "Localisation") or get_field(r, "localisation") or get_field(r, "Lieu") or ""
        ville = get_field(r, "Ville") or get_field(r, "ville") or ""
        
        # Formatage des dates
        date_debut_raw = ""
        champs_debut = ["Date_Debut", "Date_debut", "date_debut", "Date", "date", "Date de début", "Start Date"]
        for c in champs_debut:
            val = get_field(r, c)
            if val:
                date_debut_raw = val
                break
                
        date_fin_raw = ""
        champs_fin = ["Date_Fin", "Date_fin", "date_fin", "Date de fin", "End Date"]
        for c in champs_fin:
            val = get_field(r, c)
            if val:
                date_fin_raw = val
                break

        date_debut = clean_date(date_debut_raw)
        # Si pas de date de fin, on s'aligne par défaut sur la date de début
        date_fin = clean_date(date_fin_raw) if date_fin_raw else date_debut
        
        desc = get_field(r, "Description") or get_field(r, "description") or ""
        
        # Extraction de l'Heure
        heure = ""
        champs_heures = ["Heure", "heure", "Heure_Debut", "heure_debut", "Horaire", "horaire"]
        for c in champs_heures:
            val = get_field(r, c)
            if val:
                heure = str(val).strip()
                break
                
        # Extraction de la Durée
        duree = ""
        champs_duree = ["Duree", "duree", "Durée", "durée"]
        for c in champs_duree:
            val = get_field(r, c)
            if val:
                duree = str(val).strip()
                break
                
        # Extraction du Public cible
        public = ""
        champs_public = ["Public_cible", "public_cible", "Public", "public", "Public cible"]
        for c in champs_public:
            val = get_field(r, c)
            if val:
                public = str(val).strip()
                break
                
        # Image et lien
        image_url = get_field(r, "Lien_vers_affiche") or get_field(r, "URL_de_l_image") or ""
        lien = get_field(r, "Lien") or get_field(r, "lien") or ""
        reservation = "TRUE" if str(get_field(r, "Reservation") or get_field(r, "reservation")).upper() == "TRUE" else "FALSE"
        
        # Construction de l'objet événement conforme à votre schéma JSON
        event_item = {
            "id": record_id,
            "Titre": str(titre),
            "Catégorie": str(categorie),
            "Localisation": str(loc),
            "Date_Debut": str(date_debut),
            "Date_Fin": str(date_fin),
            "Description": str(desc),
            "Heure": str(heure),
            "Durée": str(duree),
            "Public_cible": str(public),
            "Ville": str(ville),
            "URL_de_l_image": str(image_url),
            "Lien": str(lien),
            "Reservation": str(reservation)
        }
        
        events_list.append(event_item)
        
    return events_list

def main():
    rows = fetch_rows()
    events_json = build_json_data(rows)
    
    # Écriture du fichier agenda.json
    with open("agenda.json", "w", encoding="utf-8") as f:
        json.dump(events_json, f, ensure_ascii=False, indent=2)
        
    print(f"Le fichier agenda.json a été généré avec succès ({len(events_json)} événements exportés).")

if __name__ == "__main__":
    main()
