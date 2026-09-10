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

    for r in candidates or []:
        if not isinstance(r, dict):
            continue

        # =====================================================================
        # FILTRE DE PUBLICATION : "SUR LE PORTAIL"
        # =====================================================================
        # Grist génère généralement les ID de colonne sans espaces ("SUR_LE_PORTAIL")
        # On vérifie toutes les variantes possibles du nom.
        sur_portail_val = get_field_any(
            r,
            [
                "SUR LE PORTAIL",
                "SUR_LE_PORTAIL",
                "Sur_le_portail",
                "sur_le_portail",
                "Sur_Le_Portail",
                "SUR_LE_PORTAIL_",
            ],
        )

        statut_portail = str(sur_portail_val or "").strip().lower()

        # Si le statut est expressément "non" ou "en attente", on l'exclut !
        if statut_portail in ["non", "en attente"]:
            continue

        # NB : Si la cellule est vide, vous pouvez choisir de :
        # - L'inclure d'office (comportement par défaut "Oui") : ne rien faire de plus.
        # - L'exclure par sécurité : décommentez les deux lignes suivantes :
        # if statut_portail not in ["oui"]:
        #     continue

        record_id = r.get("id") or 999

        titre = get_field_any(r, ["Titre", "titre"]) or "Sans titre"

        categorie = "Animation"
        categorie = (
            get_field_any(
                r, ["Categorie", "categorie", "Catégorie", "Type", "type"]
            )
            or categorie
        )
        categorie = str(categorie).strip() if categorie else "Animation"

        loc = (
            get_field_any(
                r, ["Localisation", "localisation", "Localisation2", "Lieu"]
            )
            or ""
        )
        ville = get_field_any(r, ["Ville", "ville"]) or ""

        date_debut_raw = (
            get_field_any(
                r,
                [
                    "Date_Debut",
                    "Date_debut",
                    "date_debut",
                    "Date Début",
                    "Date",
                    "date",
                ],
            )
            or ""
        )
        date_fin_raw = (
            get_field_any(
                r, ["Date_Fin", "Date_fin", "date_fin", "Date Fin"]
            )
            or ""
        )

        date_debut = clean_date(date_debut_raw)
        date_fin = clean_date(date_fin_raw) if date_fin_raw else date_debut

        desc = get_field_any(r, ["Description", "description"]) or ""

        heure = (
            get_field_any(
                r,
                [
                    "Heure",
                    "heure",
                    "heure2",
                    "Heure_Debut",
                    "heure_debut",
                    "Horaire",
                ],
            )
            or ""
        )
        duree = get_field_any(r, ["Duree", "duree", "Durée", "durée"]) or ""
        public = (
            get_field_any(r, ["Public_cible", "public_cible", "Public", "public"])
            or ""
        )

        image_url = (
            get_field_any(
                r,
                [
                    "URL de l'image",
                    "URL_de_l_image",
                    "URL_de_l_image_",
                    "URL_de_l_amp_image",
                ],
            )
            or ""
        )

        lien = get_field_any(r, ["Lien", "lien"]) or ""
        reservation_val = get_field_any(r, ["Reservation", "reservation"])
        reservation = (
            "TRUE" if str(reservation_val).upper() == "TRUE" else "FALSE"
        )

        # ===== CHAMPS RH =====
        animateurs = get_field_list(
            r,
            [
                "Animateurs_Biblio",
                "Animateurs_Biblio_",
                "Animateurs",
                "Animateurs_Bibliotheque",
                "Agents_Prevus",
                "Agents",
            ],
        )

        besoin_rh_raw = get_field_any(
            r, ["Besoin_RH", "BesoinRH", "Besoin", "Nb_Agents", "Nb_agents"]
        )
        try:
            besoin_rh = (
                int(float(besoin_rh_raw))
                if besoin_rh_raw not in (None, "", [])
                else (len(animateurs) if animateurs else 1)
            )
        except:
            besoin_rh = 1

        section_requise = (
            get_field_any(r, ["Section_Requise", "Section", "section_requise"])
            or ""
        )
        creneau_rh = (
            get_field_any(r, ["Creneau_RH", "Creneau", "creneau_rh"]) or ""
        )
        impact_sp_raw = get_field_any(r, ["Impact_SP", "ImpactSP", "impact_sp"])
        impact_sp = False
        if isinstance(impact_sp_raw, bool):
            impact_sp = impact_sp_raw
        elif str(impact_sp_raw).lower() in ("true", "1", "oui", "vrai"):
            impact_sp = True

        statut_rh = get_field_any(r, ["Statut_RH", "StatutRH", "Statut"]) or ""
        commentaire_rh = (
            get_field_any(r, ["Commentaire_RH", "CommentaireRH", "commentaire_rh"])
            or ""
        )

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
            "Agents_Prevus": animateurs,
            "Animateurs_Biblio": animateurs,
            "Besoin_RH": besoin_rh,
            "Section_Requise": str(section_requise),
            "Creneau_RH": str(creneau_rh),
            "Impact_SP": impact_sp,
            "Statut_RH": str(statut_rh),
            "Commentaire_RH": str(commentaire_rh),
        }

        events_list.append(event_item)

    return events_list
