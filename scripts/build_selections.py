import os
import json
import requests

SERVER = "https://grist.numerique.gouv.fr"
DOC_ID = os.environ.get("GRIST_DOC_ID", "qp8t9UCuaPoo")
API_KEY = os.environ.get("GRIST_API_KEY")

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Accept": "application/json"
}

def fetch_table(table_name):
    url = f"{SERVER}/api/docs/{DOC_ID}/tables/{table_name}/records"
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    return r.json().get("records", [])

def main():
    print(f"📥 Récupération des données depuis {SERVER}...")
    selections_records = fetch_table("Selections")
    documents_records = fetch_table("Documents")

    # Dictionnaire des documents groupés par Sélection
    docs_by_selection_row_id = {}
    for doc in documents_records:
        f = doc["fields"]
        sel_ref = f.get("ID_Selection")
        if sel_ref:
            if sel_ref not in docs_by_selection_row_id:
                docs_by_selection_row_id[sel_ref] = []
            
            # Gestion blindée de la colonne Ordre (vide ou texte)
            raw_order = f.get("Ordre")
            try:
                order_val = int(str(raw_order).strip()) if raw_order is not None and str(raw_order).strip() else 99
            except (ValueError, TypeError):
                order_val = 99

            docs_by_selection_row_id[sel_ref].append({
                "id_notice": str(f.get("ID_Notice", "")),
                "title": f.get("Titre", "Titre inconnu"),
                "author": f.get("Auteur", ""),
                "fmt": f.get("Format", "Livre"),
                "loc": f.get("Disponibilite", "Disponible"),
                "img": f.get("URL_Vignette", ""),
                "link": f.get("Lien_Notice", "https://bibliotheques.agglopolys.fr"),
                "order": order_val
            })

    # Construction du JSON final
    final_output = {}

    for sel in selections_records:
        fields = sel["fields"]
        
        if not fields.get("Actif"):
            continue

        sel_id_key = fields.get("ID_Selection")
        if not sel_id_key:
            continue

        items = docs_by_selection_row_id.get(sel["id"], [])
        items.sort(key=lambda x: x["order"])

        tag_color = fields.get("Couleur_Tag", "#16a34a")

        final_output[sel_id_key] = {
            "targetEventId": str(fields.get("ID_Syracuse", "0")),
            "tag": fields.get("Tag", "Coup de cœur"),
            "tagColor": tag_color,
            "title": fields.get("Titre_Selection", ""),
            "subtitle": fields.get("Sous_Titre", ""),
            "quote": fields.get("Avis_Bibliothecaire", ""),
            "location": fields.get("Lieu", "Toutes médiathèques"),
            "items": items
        }

    output_filename = "selections.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(final_output, f, ensure_ascii=False, indent=2)

    print(f"✔ Fichier {output_filename} généré avec succès ({len(final_output)} sélection(s)) !")

if __name__ == "__main__":
    main()
