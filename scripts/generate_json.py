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

def get_field_any(rec, possible_names):
    """Cherche le premier champ qui existe parmi une liste de noms possibles."""
    for n in possible_names:
        v = get_field(rec, n)
        if v not in (None, "", []):
            return v
    # fallback insensible à la casse
    if isinstance(rec, dict):
        fields = rec.get("fields", rec) if "fields" in rec else rec
        if isinstance(fields, dict):
            lower_map = {k.lower(): v for k, v in fields.items()}
            for n in possible_names:
                if n.lower() in lower_map:
                    val = lower_map[n.lower()]
                    if val not in (None, "", []):
                        return val
    return None

def get_field_list(rec, possible_names):
    """Récupère un champ qui est une ChoiceList / liste d'agents, toujours en liste Python."""
    val = get_field_any(rec, possible_names)
    if val is None:
        return []
    if isinstance(val, list):
        # Grist renvoie ChoiceList comme list, ex: ["Amiot Matthieu", "Basire Céline"] ou ["L"]
        # On nettoie les vides
        return [str(x).strip() for x in val if str(x).strip()]
    if isinstance(val, str):
        # Si c'est une string avec séparateur virgule
        if "," in val:
            return [s.strip() for s in val.split(",") if s.strip()]
        if val.strip():
            return [val.strip()]
    return []

def clean_date(val):
    """Normalise la date de Grist pour renvoyer un format standardisé YYYY-MM-DD."""
    if not val:
        return ""
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
    """Génère la structure JSON conforme + extension RH."""
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
        
        titre = get_field_any(r, ["Titre", "titre"]) or "Sans titre"
        
        categorie = "Animation"
        categorie = get_field_any(r, ["Categorie", "categorie", "Catégorie", "Type", "type"]) or categorie
        categorie = str(categorie).strip() if categorie else "Animation"
                
        loc = get_field_any(r, ["Localisation", "localisation", "Localisation2", "Lieu"]) or ""
        ville = get_field_any(r, ["Ville", "ville"]) or ""
        
        date_debut_raw = get_field_any(r, ["Date_Debut", "Date_debut", "date_debut", "Date", "date"]) or ""
        date_fin_raw = get_field_any(r, ["Date_Fin", "Date_fin", "date_fin"]) or ""

        date_debut = clean_date(date_debut_raw)
        date_fin = clean_date(date_fin_raw) if date_fin_raw else date_debut
        
        desc = get_field_any(r, ["Description", "description"]) or ""
        
        heure = get_field_any(r, ["Heure", "heure", "heure2", "Heure_Debut", "heure_debut", "Horaire"]) or ""
        duree = get_field_any(r, ["Duree", "duree", "Durée", "durée"]) or ""
        public = get_field_any(r, ["Public_cible", "public_cible", "Public", "public"]) or ""
                
        image_url = get_field_any(r, ["Lien_vers_affiche", "URL_de_l_image", "URL_image"]) or ""
        lien = get_field_any(r, ["Lien", "lien"]) or ""
        reservation_val = get_field_any(r, ["Reservation", "reservation"])
        reservation = "TRUE" if str(reservation_val).upper() == "TRUE" else "FALSE"

        # ===== NOUVEAUX CHAMPS RH =====
        # 1. Animateurs Biblio (ta nouvelle colonne ChoiceList)
        animateurs = get_field_list(r, [
            "Animateurs_Biblio", "Animateurs_Biblio_", "Animateurs", 
            "Animateurs_Bibliotheque", "Agents_Prevus", "Agents"
        ])

        # 2. Besoin RH (si tu ajoutes la colonne plus tard, déjà géré)
        besoin_rh_raw = get_field_any(r, ["Besoin_RH", "BesoinRH", "Besoin", "Nb_Agents", "Nb_agents"])
        try:
            besoin_rh = int(float(besoin_rh_raw)) if besoin_rh_raw not in (None, "", []) else (len(animateurs) if animateurs else 1)
        except:
            besoin_rh = 1

        # 3. Autres champs optionnels (si tu les ajoutes plus tard, ils sortiront auto)
        section_requise = get_field_any(r, ["Section_Requise", "Section", "section_requise"]) or ""
        creneau_rh = get_field_any(r, ["Creneau_RH", "Creneau", "creneau_rh"]) or ""
        impact_sp_raw = get_field_any(r, ["Impact_SP", "ImpactSP", "impact_sp"])
        impact_sp = False
        if isinstance(impact_sp_raw, bool):
            impact_sp = impact_sp_raw
        elif str(impact_sp_raw).lower() in ("true", "1", "oui", "vrai"):
            impact_sp = True
        
        statut_rh = get_field_any(r, ["Statut_RH", "StatutRH", "Statut"]) or ""
        commentaire_rh = get_field_any(r, ["Commentaire_RH", "CommentaireRH", "commentaire_rh"]) or ""

        # Construction de l'objet événement
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
            "Reservation": str(reservation),
            # --- EXTENSION RH POUR SIRIUS ---
            "Agents_Prevus": animateurs,  # <- c'est ce que SIRIUS va lire pour l'infobulle
            "Animateurs_Biblio": animateurs,  # alias compatibilité
            "Besoin_RH": besoin_rh,
            "Section_Requise": str(section_requise),
            "Creneau_RH": str(creneau_rh),
            "Impact_SP": impact_sp,
            "Statut_RH": str(statut_rh),
            "Commentaire_RH": str(commentaire_rh),
        }
        
        events_list.append(event_item)
        
    return events_list

def main():
    rows = fetch_rows()
    events_json = build_json_data(rows)
    
    # Tri par date pour SIRIUS
    def sort_key(e):
        try:
            return dateutil.parser.parse(e.get("Date_Debut",""))
        except:
            return datetime.datetime.max
    events_json.sort(key=sort_key)

    with open("agenda.json", "w", encoding="utf-8") as f:
        json.dump(events_json, f, ensure_ascii=False, indent=2)
        
    print(f"Le fichier agenda.json a été généré avec succès ({len(events_json)} événements exportés).")
    # Stats RH
    avec_agents = sum(1 for e in events_json if e.get("Agents_Prevus"))
    print(f"→ {avec_agents} animations avec au moins 1 animateur biblio affecté")
    print(f"Exemple avec agents: {[e for e in events_json if e.get('Agents_Prevus')][:2]}")

if __name__ == "__main__":
    main()

