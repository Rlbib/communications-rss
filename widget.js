        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('agd-lite-events');
            const filterBtns = document.querySelectorAll('.agd-lite-filter-btn');

            const agendaData = [
  {
    "id": 1,
    "Titre": "Club manga",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Musique, Cinéma et Jeux vidéo",
    "Date_Debut": "2026-05-23",
    "Date_Fin": "2026-05-23",
    "Cycle": "Lectures",
    "Description": "Tu es curieux de découvrir les mangas ? Tu les dévores déjà ? Si tu as envie de plonger dans cet univers, ce club est fait pour toi, pour découvrir des nouveautés, échanger et même suggérer les prochains achats.",
    "Heure": "10h",
    "Public_cible": "à partir de 10 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicimagedownload.ashx?repositoryId=1&itemId=10788",
    "Reservation": "FALSE"
  },
  {
    "id": 2,
    "Titre": "Troc de plantes et de graines",
    "Catégorie": "Rencontre",
    "Localisation": "Médiathèque Maurice-Genevoix",
    "Date_Debut": "2026-05-23",
    "Date_Fin": "2026-05-23",
    "Cycle": "",
    "Description": "Amateurs et amoureux des végétaux, venez échanger avec nous vos boutures et vos conseils (avec la contribution du Service Parcs et Jardins - Espaces naturels de la Ville de Blois). Conseils pratiques : pensez à étiqueter et préparer vos plantes dans des contenants pour les futurs adoptants !",
    "Heure": "10h-12h / 14h-17h",
    "Public_cible": "Tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicfilesdownload.ashx?repositoryId=1&itemId=11175",
    "Reservation": "FALSE"
  },
  {
    "id": 3,
    "Titre": "Coin des gameurs",
    "Catégorie": "Jeux vidéo",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-05-23",
    "Date_Fin": "2026-05-23",
    "Cycle": "Club",
    "Description": "Fan de culture gaming ou de tournoi e-sport, envie de découvrir de nouveaux jeux ou de nouvelles consoles, viens relever le défi et affronter d'autres joueurs au Coin des gameurs !",
    "Heure": "10h",
    "Public_cible": "A partir de 12 ans",
    "Note": "Autres dates : 23/05, 06/06 et 20/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicimagedownload.ashx?repositoryId=1&itemId=6129",
    "Reservation": "FALSE"
  },
  {
    "id": 4,
    "Titre": "1, 2, 3... Il était une fois",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-05-23",
    "Date_Fin": "2026-05-23",
    "Cycle": "Lectures",
    "Description": "Les bibliothécaires lisent des albums et des comptines choisis parmi les nouveautés et leurs coups de cœur",
    "Heure": "11h",
    "Public_cible": "Dès 2 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 5,
    "Titre": "1 smartphone 1 question",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-05-27",
    "Date_Fin": "2026-05-27",
    "Cycle": "",
    "Description": "Vous disposez d’un smartphone ou d’une tablette mais vous ne savez pas vraiment vous en servir ? Un point de blocage ? Ce rendez-vous vous permettra de prendre en main votre écran. Par rdv de 20 min., les mercredis matin. Inscription obligatoire au 02 54 51 33 22 en précisant la demande.",
    "Heure": "10h",
    "Public_cible": "Public adulte",
    "Note": "Autres dates du trimestre : 29/04, 27/05, 10/06, 24/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicimagedownload.ashx?repositoryId=1&itemId=8196",
    "Reservation": "FALSE"
  },
  {
    "id": 6,
    "Titre": "Laissez-vous conter",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Jeunesse",
    "Date_Debut": "2026-05-27",
    "Date_Fin": "2026-05-27",
    "Cycle": "Lectures",
    "Description": "Chaque mois, venez écouter des histoires pour enfants à partir de 3 ans",
    "Heure": "10h30",
    "Public_cible": "A partir de 3 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 7,
    "Titre": "Game over",
    "Catégorie": "Jeux vidéo",
    "Localisation": "Médiathèque Maurice-Genevoix, Auditorium",
    "Date_Debut": "2026-05-27",
    "Date_Fin": "2026-05-27",
    "Cycle": "Club",
    "Description": "Sur console (PS5 ou Switch 2) et grand écran, venez vous mesurer à d’autres joueurs en incarnant un pilote de course automobile, le capitaine d’une équipe de football, un aventurier ou un super héros !",
    "Heure": "14h",
    "Public_cible": "8-16 ans",
    "Note": "2e date : 17/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 8,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-05-27",
    "Date_Fin": "2026-05-27",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 9,
    "Titre": "Rencontre-débat sur la sélection 2026",
    "Catégorie": "Rencontre",
    "Localisation": "IUT, Amphithéâtre n°1",
    "Date_Debut": "2026-05-28",
    "Date_Fin": "2026-05-28",
    "Cycle": "",
    "Description": "Les six titres sont évoqués tour à tour à l’occasion de deux soirées. Des rencontres au cours desquelles chaque lecteur peut échanger avec les autres participant. La rencontre du jeudi 28 mai sera consacrée à Les mandragores, Pâture et Le jardin dans le ciel",
    "Heure": "18h30",
    "Public_cible": "Adultes",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicfilesdownload.ashx?repositoryId=1&itemId=11181",
    "Reservation": "FALSE"
  },
  {
    "id": 10,
    "Titre": "Raconte Thé Cinéma",
    "Catégorie": "Club",
    "Localisation": "Espace Quinière - Rosa Parks",
    "Date_Debut": "2026-05-28",
    "Date_Fin": "2026-05-28",
    "Cycle": "",
    "Description": "Le rendez-vous des amateurs de série et de cinéma ! Une rencontre conviviale autour d'un thé ou d'un café, pour discuter librement de l'actualité, débattre et partager vos coups de cœur.",
    "Heure": "11h",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 11,
    "Titre": "La CLE des mots - Le Club Ludique d'Ecriture de Veuzain",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Rose-Valland",
    "Date_Debut": "2026-05-29",
    "Date_Fin": "2026-05-29",
    "Cycle": "Club",
    "Description": "La CLÉ des mots est le Club Ludique d’Écriture des lecteurs de la médiathèque de Veuzain. Dans une joyeuse bonne humeur, les participants échangent anagrammes, cafés et contrepèteries un vendredi sur deux. Venez essayer. Restez partager !",
    "Heure": "10h",
    "Public_cible": "Ado/adulte",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicimagedownload.ashx?repositoryId=1&itemId=10479",
    "Reservation": "FALSE"
  },
  {
    "id": 12,
    "Titre": "Henriette et Rosette, Amour et charcuterie",
    "Catégorie": "Concert",
    "Localisation": "Médiathèque Rose-Valland",
    "Date_Debut": "2026-05-29",
    "Date_Fin": "2026-05-29",
    "Cycle": "Les femmes dans l’art",
    "Description": "Henriette, du Mans, et Rosette, de Lyon, deux chanteuses gouailleuse, amoureuses de leur liberté, vous proposent un répertoire savamment relevé. A partager avec toutes les bouches. Swing et bonne humeur garantis !",
    "Heure": "18h",
    "Public_cible": "Tout public",
    "Note": "En attente de visuel du partenaire",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicfilesdownload.ashx?repositoryId=1&itemId=11179",
    "Reservation": "FALSE"
  },
  {
    "id": 13,
    "Titre": "Thé Coups de cœur",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Adultes",
    "Date_Debut": "2026-05-30",
    "Date_Fin": "2026-05-30",
    "Cycle": "Club",
    "Description": "Installés confortablement autour d’un café ou d’un thé, nous prendrons le temps d’échanger sur les livres qui nous ont plu. Chacun pourra repartir avec le coup de cœur d’un autre. Nous vous attendons !",
    "Heure": "15h30",
    "Public_cible": "Public adulte",
    "Note": "Autre date du trimestre : 30/05",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 14,
    "Titre": "Compositrices, l'histoire oubliée de la musique",
    "Catégorie": "Conférence - Musique Classique",
    "Localisation": "Bibliothèque Abbé-Grégoire, Auditorium Samuel Paty",
    "Date_Debut": "2026-05-30",
    "Date_Fin": "2026-05-30",
    "Cycle": "Les femmes dans l’art",
    "Description": "Le combat pour la reconnaissance des compositrices a été très long, il est encore en cours. Il a également été très difficile, principalement pour des raisons culturelles. Pourtant, les femmes ont été nombreuses au fil des siècles à exercer leurs talents dans un domaine habituellement réservé aux hommes. L’histoire les a continuellement oubliées. Ces conférences leur rendent justice au travers d’une galerie de portraits de compositrices engagées dans leur art, contre vents et marée, et à l’écoute de leur vocation malgré toutes les barrières rencontrées, depuis le Moyen Âge jusqu’à nos jours. \n\nPar Guillaume Kosmicki musicologue et écrivain spécialisé dans l’histoire de la musique au sens large, présentera un panorama passant par Fanny Mendelssohn, Clara Schumann, Marie Jaëll, Amy Beach, Cécile Chaminade et tant d’autres au travers les siècles. Du fait de nombreux préjugés et tabous sociaux, devenir compositrice a toujours été très difficile. Pour les rares candidates, il a fallu faire preuve de volonté pour passer outre ces barrages. Au cours du XIXème siècle, les choses changent. Malgré de fortes résistances, la société accueille de plus en plus de musiciennes chevronnées qui adoptent des genres ambitieux, loin de ceux auxquels on les confinait habituellement. La révolution industrielle, l’essor économique de l’Europe et de l’Amérique permettent un changement des mœurs.",
    "Heure": "16h",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicfilesdownload.ashx?repositoryId=1&itemId=11180",
    "Reservation": "FALSE"
  },
  {
    "id": 15,
    "Titre": "Vivaces",
    "Catégorie": "Atelier",
    "Localisation": "Bibliothèque Abbe-Grégoire, espace Adultes",
    "Date_Debut": "2026-05-30",
    "Date_Fin": "2026-05-30",
    "Cycle": "Les femmes dans l’art",
    "Description": "Atelier Fanzine en présence de Lucile et Pauline Torregrossa, auteure et illustratrice de la BD Vivaces",
    "Heure": "14h30",
    "Public_cible": "Adultes et adolescents dès 13 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "Création d'un fanzine antidote. Venez créer votre fanzine sur un sujet, une personnalité ou une œuvre qui vous inspire et vous (re)donne de l’espoir et du pouvoir. Accompagné.e par la scénariste et la dessinatrice de la bd Vivaces, vous pourrez dessiner, écrire, découper, coller, selon vos envies et votre projet",
    "URL_de_l_image": "https://www.desrondsdanslo.com/images/Vivaces/extrait2.jpg",
    "Reservation": "FALSE"
  },
  {
    "id": 16,
    "Titre": "[ANNULE] Planètes musicales",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Musique, Cinéma et Jeux vidéo",
    "Date_Debut": "2026-05-30",
    "Date_Fin": "2026-05-30",
    "Cycle": "Club",
    "Description": "À partir d'extraits audio et vidéo, venez échanger sur des trouvailles musicales d'hier et d'aujourd'hui. Malgré le déclin de l'industrie du disque, les productions éditées par les artistes eux-mêmes et les micro-labels se multiplient à travers le monde. Et depuis des décennies, quantité de genres musicaux font leur apparition.",
    "Heure": "11h",
    "Public_cible": "Public adulte",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 17,
    "Titre": "Le Coin des gameurs",
    "Catégorie": "Jeux",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-03",
    "Date_Fin": "2026-01-03",
    "Cycle": "Club",
    "Description": "Fan de culture gaming ou de tournoi e-sport, envie de découvrir de nouveaux jeux ou de nouvelles consoles, viens relever le défi et affronter d'autres joueurs au Coin des gameurs !",
    "Heure": "10h",
    "Public_cible": "",
    "Note": "à partir de 12 ans",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 18,
    "Titre": "Atelier arts plastiques avec Maria Jalibert",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, Salle polyvalente",
    "Date_Debut": "2026-06-03",
    "Date_Fin": "2026-06-03",
    "Cycle": "",
    "Description": "Après un échange avec l'artiste, réalisez une image inspirée du tableau *Le Déjeuner au chien* de Bonnard, mis en scène dans son album *L'Art en jouets* (éd. Palette). Goûter offert.\n\nÀ partir de 7 ans — 14h30 — 10 places\nDurée : 1h30\nInscription conseillée",
    "Heure": "14h30",
    "Public_cible": "A partir de 7 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 19,
    "Titre": "Aiguilles & cie",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Adultes",
    "Date_Debut": "2026-06-03",
    "Date_Fin": "2026-06-03",
    "Cycle": "Club",
    "Description": "Vous êtes doué en crochet ? Vous avez un bouton à recoudre et vous ne savez pas comment on fait ? Vous voulez apprendre de nouvelles mailles au tricot ? Vous voulez passer un moment agréable autour d'un goûter en discutant chiffons ? Amenez vos aiguilles, travaux, dés et patrons ! Rendez-vous pour partager votre temps et vos connaissances avec les autres usagers de la médiathèque.",
    "Heure": "16h",
    "Public_cible": "Tout public",
    "Note": "Autres dates : 06/05 et 03/06 à 16h, durée 2h",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 20,
    "Titre": "Atelier fresque avec Virginie Costa",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Rose-Valland",
    "Date_Debut": "2026-06-03",
    "Date_Fin": "2026-06-03",
    "Cycle": "",
    "Description": "Virginie Costa vous entraîne dans son univers d'animaux décalés et colorés pour créer ensemble une grande fresque collective.\n\nDurée : 1h ; 4 – 7 ans — 15h30 — 10 places\nInscription conseillée",
    "Heure": "15h30",
    "Public_cible": "4-7 ans",
    "Note": "En attente de visuel de l'artiste",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 21,
    "Titre": "Atelier dessin avec Frédéric Marais",
    "Catégorie": "Atelier",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-06-03",
    "Date_Fin": "2026-06-03",
    "Cycle": "",
    "Description": "Auteur-illustrateur de *Didgeridoo*, *Bob et Marley* ou *Yasuké*, Frédéric Marais vous guide pour réaliser votre propre illustration en s'inspirant de son album *Didgeridoo*. Goûter offert.\n\nÀ partir de 7 ans — 15h — 12 places\nDurée : 2h\\\nInscription conseillée",
    "Heure": "15h",
    "Public_cible": "A partir de 7 ans",
    "Note": "Inscription conseillée, 12 places",
    "Ville": "",
    "Accroche": "Dans le cadre du Salon du livre jeunesse « Délires de lire » de Saint-Gervais-la-Forêt du 5 au 7 juin 2026, les bibliothèques d'Agglopolys vous invitent à vivre une après-midi de création avec trois auteurs-illustrateurs. Le mercredi 3 juin 2026, venez à leur rencontre, découvrez leurs univers et repartez avec une œuvre que vous aurez réalisée de vos propres mains.",
    "URL_de_l_image": "https://fredericmarais.com/didgeridoo/",
    "Reservation": "FALSE"
  },
  {
    "id": 22,
    "Titre": "« Kusama : Infinity » de Heather Lenz",
    "Catégorie": "Projection",
    "Localisation": "Médiathèque Maurice-Genevoix, Auditorium",
    "Date_Debut": "2026-06-04",
    "Date_Fin": "2026-06-04",
    "Cycle": "Les femmes dans l’art",
    "Description": "Yayoi Kusama est née dans une famille conservatrice de la campagne japonaise et a gagné l’Amérique au lendemain de la Seconde Guerre mondiale. Là-bas, sans relations et ne parlant qu’un anglais approximatif, elle s’est consacrée à son seul véritable amour, la création artistique. Lors de son premier jour à New York, Kusama a déclaré qu’elle était montée au sommet de l’Empire State Building, qu’elle avait regardé la ville et qu’elle avait pris la décision de se démarquer de tous ceux qu’elle voyait en contrebas et de devenir une star. Aujourd’hui âgée de 80 ans, Kusama a passé les 30 dernières années dans un établissement psychiatrique au Japon. « Kusama : Infinity » explore le parcours de l’artiste Yayoi Kusama, depuis son éducation conservatrice au Japon jusqu’à ses débuts dans la célébrité aux États-Unis dans les années 1960 (où elle rivalisait avec Andy Warhol pour attirer l’attention de la presse), pour aboutir à la renommée internationale qu’elle a finalement acquise dans le monde de l’art.",
    "Heure": "18h30",
    "Public_cible": "Public adulte, 25 places",
    "Note": "Crédit de la photo Visuel : Artist Yayoi Kusama drawing in Kusama - Infinity, directed by Heather Lenz. © Tokyo Lee Productions, Inc. Courtesy of Magnolia Pictures",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 23,
    "Titre": "Coin des gameurs",
    "Catégorie": "Jeux vidéo",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-06",
    "Date_Fin": "2026-06-06",
    "Cycle": "Club",
    "Description": "Fan de culture gaming ou de tournoi e-sport, envie de découvrir de nouveaux jeux ou de nouvelles consoles, viens relever le défi et affronter d'autres joueurs au Coin des gameurs !",
    "Heure": "10h",
    "Public_cible": "A partir de 12 ans",
    "Note": "Autres dates : 23/05, 06/06 et 20/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 24,
    "Titre": "Exposition \"Vivaces",
    "Catégorie": "Exposition",
    "Localisation": "Médiathèque Maurice-Genevoix, Auditorium",
    "Date_Debut": "2026-06-06",
    "Date_Fin": "2026-07-04",
    "Cycle": "",
    "Description": "Vivaces\" est un roman graphique qui parle de luttes pour l'environnement, de féminisme et de transmission familiale. L'exposition présente les grandes étapes de création de cette Bd, du scénario aux pages finales, en passant par des dessins inédits et des planches originales réalisées à l'aquarelle.",
    "Heure": "",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 25,
    "Titre": "L'espionne aux tableaux, Rose Valland face au pillage nazi, de Brigitte Chevet, 52 min 2021, France",
    "Catégorie": "Projection",
    "Localisation": "Bibliothèque Abbé-Grégoire, Auditorium Samuel Paty",
    "Date_Debut": "2026-06-06",
    "Date_Fin": "2026-06-06",
    "Cycle": "Les femmes dans l’art",
    "Description": "Attachée de conservation au musée du Jeu de Paume pendant l’Occupation, Rose Valland a joué un rôle décisif dans la sauvegarde, la récupération et la restitution de plus de 60 000 œuvres d'art et biens culturels volés et spoliés par les nazis pendant la Seconde Guerre mondiale aux institutions publiques et aux familles juives françaises. Venez découvrir le travail de cette femme d’exception. Projection suivie d’un échange avec Brigitte Chevet, réalisatrice du film.",
    "Heure": "16h",
    "Public_cible": "Ado/adulte",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 26,
    "Titre": "1 smartphone 1 question",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-10",
    "Date_Fin": "2026-06-10",
    "Cycle": "",
    "Description": "Vous disposez d’un smartphone ou d’une tablette mais vous ne savez pas vraiment vous en servir ? Un point de blocage ? Ce rendez-vous vous permettra de prendre en main votre écran. Par rdv de 20 min., les mercredis matin. Inscription obligatoire au 02 54 51 33 22 en précisant la demande.",
    "Heure": "10h",
    "Public_cible": "Public adulte",
    "Note": "Autres dates du trimestre : 29/04, 27/05, 10/06, 24/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 27,
    "Titre": "Découverte numérique : codage avec Lightbot",
    "Catégorie": "Initiation informatique",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-10",
    "Date_Fin": "2026-06-10",
    "Cycle": "",
    "Description": "Lightbot est un jeu de logique : un casse-tête dont le fonctionnement est basé sur des concepts de programmation. Choisis ton robot ou ta robote et fais-le se déplacer pour accomplir les missions.",
    "Heure": "15h",
    "Public_cible": "8-14 ans, 8 places",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://www.banq.qc.ca/sites/default/files/815e0b52-637b-489b-991c-cd1fd7de39d9.jpg",
    "Reservation": "FALSE"
  },
  {
    "id": 28,
    "Titre": "La CLE des mots - Le Club Ludique d'Ecriture de Veuzain",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Rose-Valland",
    "Date_Debut": "2026-06-12",
    "Date_Fin": "2026-06-12",
    "Cycle": "Club",
    "Description": "La CLÉ des mots est le Club Ludique d’Écriture des lecteurs de la médiathèque de Veuzain. Dans une joyeuse bonne humeur, les participants échangent anagrammes, cafés et contrepèteries un vendredi sur deux. Venez essayer. Restez partager !",
    "Heure": "10h",
    "Public_cible": "Ado/adulte",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicimagedownload.ashx?repositoryId=1&itemId=10479",
    "Reservation": "FALSE"
  },
  {
    "id": 29,
    "Titre": "Les Bons clics - Le B.A-BA de l'IA",
    "Catégorie": "Initiation informatique",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-12",
    "Date_Fin": "2026-06-12",
    "Cycle": "",
    "Description": "Venez vous familiariser avec les principes et le fonctionnement de l'IA au travers d'exercices ludiques et de quelques tests.",
    "Heure": "15h",
    "Public_cible": "Public adulte, 6 places",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "même visuel utilisé en février",
    "Reservation": "FALSE"
  },
  {
    "id": 30,
   "Titre": "Remise du prix 2026",
    "Catégorie": "Rencontre",
    "Localisation": "Halle aux Grains",
    "Date_Debut": "2026-06-12",
    "Date_Fin": "2026-06-12",
    "Cycle": "",
    "Description": "Depuis mars, les romans sélectionnés font l’objet des lectures, débats, échanges de la part des lecteurs amateurs, réunis régulièrement au sein de leurs comités, associant ainsi plaisir des échanges et goût de la lecture. Le résultat des votes des comités sera rendu public à la Halle aux grains en présence des auteurs sélectionnés qui s’entretiendront avec Matthieu Garrigou-Lagrange. Un temps de dédicaces et un cocktail se tiendront aux alentours de 19h.",
    "Heure": "17h",
    "Public_cible": "Adultes",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 31,
    "Titre": "**ApiDays — Extraction de miel avec le Syndicat des Apiculteurs de Loir-et-Cher**",
    "Catégorie": "Atelier",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-06-13",
    "Date_Fin": "2026-06-13",
    "Cycle": "",
    "Description": "Dans le cadre de l'événement national *ApiDays*, Agglopolys vous invite à assister à l'extraction du miel provenant de ses 6 ruches. Au programme : démonstration d'extraction, atelier bougies, mise en pot, dégustation et animations pour les enfants avec la mascotte Zélia. Animations sur le parvis Jean-Jaurès : fabrication de nichoirs...etc.\n\nTout public — 10h à 13h\n\nEntrée libre",
    "Heure": "10h",
    "Public_cible": "Parents-enfants à partir de 8 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 32,
    "Titre": "Atelier découverte gravure avec le GRIFE",
    "Catégorie": "Atelier",
    "Localisation": "Bibliothèque Abbé-Grégoire - Antichambre",
    "Date_Debut": "2026-06-13",
    "Date_Fin": "2026-06-13",
    "Cycle": "",
    "Description": "**Atelier découverte gravure avec le GRIFE**\\\n\nEn lien avec l'exposition *Fonds d'encre*, les membres de l'association GRIFE vous invitent à découvrir la taille d'épargne sur linoléum, en s'inspirant d'iconographies issues du fonds ancien de la bibliothèque. Démonstration de matériel et initiation à l'impression. Une visite commentée de l'exposition sera proposée.\\\n\nAtelier parents-enfants à partir de 8 ans — 15h — 10 places\\\nBibliothèque Abbé-Grégoire — 4/6 place Jean-Jaurès, Blois\\\nDurée : 1h15\\\nInscription conseillée",
    "Heure": "15h",
    "Public_cible": "Parents-enfants à partir de 8 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 33,
    "Titre": "Club manga",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Musique, Cinéma et Jeux vidéo",
    "Date_Debut": "2026-06-13",
    "Date_Fin": "2026-06-13",
    "Cycle": "Lectures",
    "Description": "Tu es curieux de découvrir les mangas ? Tu les dévores déjà ? Si tu as envie de plonger dans cet univers, ce club est fait pour toi, pour découvrir des nouveautés, échanger et même suggérer les prochains achats.",
    "Heure": "10h",
    "Public_cible": "à partir de 10 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 34,
    "Titre": "Atelier créez un fanzine antidote",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, Salle polyvalente",
    "Date_Debut": "2026-06-13",
    "Date_Fin": "2026-06-13",
    "Cycle": "Les femmes dans l’art",
    "Description": "Atelier Fanzine en présence de Lucile et Pauline Torregrossa, auteure et illustratrice de la BD Vivaces",
    "Heure": "14h30",
    "Public_cible": "Adultes et adolescents dès 13 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "Création d'un fanzine \"antidote\". Venez créer votre fanzine sur un sujet, une personnalité ou une œuvre qui vous inspire et vous (re)donne de l’espoir et du pouvoir. Accompagné.e par la scénariste et la dessinatrice de la bd Vivaces, vous pourrez dessiner, écrire, découper, coller, selon vos envies et votre projet",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 35,
    "Titre": "1, 2, 3... Il était une fois",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-06-13",
    "Date_Fin": "2026-06-13",
    "Cycle": "Lectures",
    "Description": "Les bibliothécaires lisent des albums et des comptines choisis parmi les nouveautés et leurs coups de cœur",
    "Heure": "11h",
    "Public_cible": "Dès 2 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 36,
    "Titre": "Game over",
    "Catégorie": "Jeux vidéo",
    "Localisation": "Médiathèque Maurice-Genevoix, Auditorium",
    "Date_Debut": "2026-06-17",
    "Date_Fin": "2026-06-17",
    "Cycle": "Club",
    "Description": "Sur console (PS5 ou Switch 2) et grand écran, venez vous mesurer à d’autres joueurs en incarnant un pilote de course automobile, le capitaine d’une équipe de football, un aventurier ou un super héros !",
    "Heure": "14h",
    "Public_cible": "8-16 ans",
    "Note": "2e date : 17/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 37,
    "Titre": "Laissez-vous conter",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Jeunesse",
    "Date_Debut": "2026-06-17",
    "Date_Fin": "2026-06-17",
    "Cycle": "Lectures",
    "Description": "Chaque mois, venez écouter des histoires pour enfants à partir de 3 ans",
    "Heure": "10h30",
    "Public_cible": "A partir de 3 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 38,
    "Titre": "Lectures transformées - des garçons et des filles",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Médiathèque Rose-Valland",
    "Date_Debut": "2026-06-17",
    "Date_Fin": "2026-06-17",
    "Cycle": "",
    "Description": "Une fille, c’est rose et c’est doux. Un garçon, c’est fort et ça ne pleure pas. Ou pas. Venez rencontrer des filles piquantes, des garçons silencieux, des enfants qui vivent leur vie d’enfants, loin des idées des grands… Dans le cadre du Mois des Fiertés.",
    "Heure": "10h30",
    "Public_cible": "2-7 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 39,
    "Titre": "Big eyes\" de Tim Burton",
    "Catégorie": "Projection",
    "Localisation": "Bibliothèque Abbé-Grégoire, Auditorium Samuel Paty",
    "Date_Debut": "2026-06-18",
    "Date_Fin": "2026-06-18",
    "Cycle": "",
    "Description": "« Big eyes » raconte la scandaleuse histoire vraie de l’une des plus grandes impostures de l’histoire de l’art. À la fin des années 50 et au début des années 60, le peintre Walter Keane a connu un succès phénoménal et révolutionné le commerce de l’art grâce à ses énigmatiques tableaux représentant des enfants malheureux aux yeux immenses. \nLa projection sera suivie d'un échange l'artiste plasticienne Svetlina Petrova. et Jean-Jacques Milhem président de l'Artothèque Val-de-Loire.",
    "Heure": "18h30",
    "Public_cible": "Public adulte, 120 places",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 40,
    "Titre": "Coin des gameurs",
    "Catégorie": "Jeux vidéo",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-20",
    "Date_Fin": "2026-06-20",
    "Cycle": "Club",
    "Description": "Fan de culture gaming ou de tournoi e-sport, envie de découvrir de nouveaux jeux ou de nouvelles consoles, viens relever le défi et affronter d'autres joueurs au Coin des gameurs !",
    "Heure": "10h",
    "Public_cible": "A partir de 12 ans",
    "Note": "Autres dates : 23/05, 06/06 et 20/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 41,
    "Titre": "Raconte Thé Cinéma",
    "Catégorie": "Club",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Musique, Cinéma et Jeux vidéo",
    "Date_Debut": "2026-06-20",
    "Date_Fin": "2026-06-20",
    "Cycle": "",
    "Description": "Le rendez-vous des amateurs de série et de cinéma ! Une rencontre conviviale autour d'un thé ou d'un café, pour discuter librement de l'actualité, débattre et partager vos coups de cœur.",
    "Heure": "15h",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 42,
    "Titre": "Atelier création BD – Super-héros",
    "Catégorie": "Atelier",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-06-24",
    "Date_Fin": "2026-04-24",
    "Cycle": "",
    "Description": "Imagine et dessine ton propre super-héros : à toi de choisir ses pouvoirs, son costume, son univers ! Un atelier encadré par les animateurs de la Maison de la BD, dans le cadre de Partir en livre. Réservation conseillée - 12 places",
    "Heure": "15h",
    "Public_cible": "à partir de 8 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 43,
    "Titre": "Atelier \"Big eyes",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, Salle polyvalente",
    "Date_Debut": "2026-06-24",
    "Date_Fin": "2026-06-24",
    "Cycle": "Les femmes dans l’art",
    "Description": "Créez une petite toile à la manière de Margaret Keane dont l'histoire a inspiré le film de Tim Burton, \"Big eyes\" (projection le 18 juin)",
    "Heure": "14h30",
    "Public_cible": "A partir de 12 ans, 12 places",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 44,
    "Titre": "1 smartphone 1 question",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, ETNA",
    "Date_Debut": "2026-06-24",
    "Date_Fin": "2026-06-24",
    "Cycle": "",
    "Description": "Vous disposez d’un smartphone ou d’une tablette mais vous ne savez pas vraiment vous en servir ? Un point de blocage ? Ce rendez-vous vous permettra de prendre en main votre écran. Par rdv de 20 min., les mercredis matin. Inscription obligatoire au 02 54 51 33 22 en précisant la demande.",
    "Heure": "10h",
    "Public_cible": "Public adulte",
    "Note": "Autres dates du trimestre : 29/04, 27/05, 10/06, 24/06",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 45,
    "Titre": "La CLE des mots - Le Club Ludique d'Ecriture de Veuzain",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Rose-Valland",
    "Date_Debut": "2026-06-26",
    "Date_Fin": "2026-06-26",
    "Cycle": "Club",
    "Description": "La CLÉ des mots est le Club Ludique d’Écriture des lecteurs de la médiathèque de Veuzain. Dans une joyeuse bonne humeur, les participants échangent anagrammes, cafés et contrepèteries un vendredi sur deux. Venez essayer. Restez partager !",
    "Heure": "10h",
    "Public_cible": "Ado/adulte",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/basicimagedownload.ashx?repositoryId=1&itemId=10479",
    "Reservation": "FALSE"
  },
  {
    "id": 46,
    "Titre": "Club manga",
    "Catégorie": "Club",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Musique, Cinéma et Jeux vidéo",
    "Date_Debut": "2026-06-27",
    "Date_Fin": "2026-06-27",
    "Cycle": "Lectures",
    "Description": "Tu es curieux de découvrir les mangas ? Tu les dévores déjà ? Si tu as envie de plonger dans cet univers, ce club est fait pour toi, pour découvrir des nouveautés, échanger et même suggérer les prochains achats.",
    "Heure": "10h",
    "Public_cible": "à partir de 10 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://bibliotheques.agglopolys.fr/EXPLOITATION/basicfilesdownload.ashx?repositoryId=1&itemId=11184",
    "Reservation": "FALSE"
  },
  {
    "id": 47,
    "Titre": "Mode Vacances : activé ! Smoothie party",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, Salle polyvalente",
    "Date_Debut": "2026-07-01",
    "Date_Fin": "2026-07-01",
    "Cycle": "",
    "Description": "Choisis tes fruits et tes ingrédients, mixe, et installe-toi dans le jardin pour savourer ta création ! Une pause fraîche et gourmande, à siroter sans modération.",
    "Heure": "16h30",
    "Public_cible": "Tout public",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "Du 1er au 10 juillet, la médiathèque Maurice-Genevoix vous invite à plonger dans l'été avec une série d'activités créatives et conviviales — à partager entre amis, en famille et en profiter pour se faire de nouveaux amis. De quoi démarrer les grandes vacances du bon pied !",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 48,
    "Titre": "Atelier création BD – Super-héros",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, Salle polyvalente",
    "Date_Debut": "2026-07-01",
    "Date_Fin": "2026-07-01",
    "Cycle": "",
    "Description": "Imagine et dessine ton propre super-héros : à toi de choisir ses pouvoirs, son costume, son univers ! Un atelier encadré par les animateurs de la Maison de la BD, dans le cadre de Partir en livre. Réservation conseillée - 12 places",
    "Heure": "15h30",
    "Public_cible": "à partir de 8 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "https://www.partir-en-livre.fr/partirenlivre/les-ressources-de-ledition-2026",
    "Reservation": "FALSE"
  },
  {
    "id": 49,
    "Titre": "**Lectures et chansons aux jardins**",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Jardin de la Médiathèque Maurice-Genevoix",
    "Date_Debut": "2026-07-02",
    "Date_Fin": "2026-07-02",
    "Cycle": "",
    "Description": "Albums à voix haute, chansons à la guitare et moments à chanter ensemble : bibliothécaires et animatrices des Relais Petite Enfance unissent leur voix, accompagnées par la musicienne Clémence Bouin, pour un rendez-vous tendre et complice, pensé pour les tout-petits et leurs parents.\n\nJeudi 2 juillet – Jardin de la médiathèque Maurice-Genevoix *(en cas de pluie : à l'intérieur de la médiathèque)*\\\nVendredi 3 juillet – Jardins de la crèche multiaccueil de Blois-Vienn&#x65;*(en cas de pluie : à l'ALCV)*\\\nMercredi 8 juillet – Jardins de l'Évêch&#xE9;*(en cas de pluie : bibliothèque Abbé-Grégoire)*\n\n*9h30 et 12h30 – 2 séances de 35 min – Pour les tout-petits – Entrée libre*\n\n*Merci d'apporter de quoi vous asseoir.*",
    "Heure": "9h30 et 10h30",
    "Public_cible": "Pour les tout-petits",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "L:\\Bibliotheques\\JEUNESSE\\COMMUN\\PHOTOS ANIMATIONS\\DLE 2025\\com DLE 2026.jpg",
    "Reservation": "FALSE"
  },
  {
   "id": 50,
    "Titre": "**Lectures et chansons aux jardins**",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Jardin de la Crèche de Blois Vienne",
    "Date_Debut": "2026-07-03",
    "Date_Fin": "2026-07-03",
    "Cycle": "",
    "Description": "Albums à voix haute, chansons à la guitare et moments à chanter ensemble : bibliothécaires et animatrices des Relais Petite Enfance unissent leur voix, accompagnées par la musicienne Clémence Bouin, pour un rendez-vous tendre et complice, pensé pour les tout-petits et leurs parents.\n\nJeudi 2 juillet – Jardin de la médiathèque Maurice-Genevoix *(en cas de pluie : à l'intérieur de la médiathèque)*\\\nVendredi 3 juillet – Jardins de la crèche multiaccueil de Blois-Vienn&#x65;*(en cas de pluie : à l'ALCV)*\\\nMercredi 8 juillet – Jardins de l'Évêch&#xE9;*(en cas de pluie : bibliothèque Abbé-Grégoire)*\n\n*9h30 et 12h30 – 2 séances de 35 min – Pour les tout-petits – Entrée libre*\n\n*Merci d'apporter de quoi vous asseoir.*",
    "Heure": "9h30 et 10h30",
    "Public_cible": "Pour les tout-petits",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 51,
    "Titre": "Mode Vacances : activé ! Création d'un tote bag",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Adultes",
    "Date_Debut": "2026-07-07",
    "Date_Fin": "2026-07-07",
    "Cycle": "",
    "Description": "Viens créer ton tote bag d'été en compagnie de Jade du Bar à couture ! Dessine, assemble, personnalise — et repars avec un sac 100% fait main, idéal pour l'été.\n - 6 places",
    "Heure": "14h",
    "Public_cible": "A partir de 12 ans",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "Du 1er au 10 juillet, la médiathèque Maurice-Genevoix vous invite à plonger dans l'été avec une série d'activités créatives et conviviales — à partager entre amis, en famille et en profiter pour se faire de nouveaux amis. De quoi démarrer les grandes vacances du bon pied !",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 52,
    "Titre": "**Lectures et chansons aux jardins**",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Jardin de l'Évêché",
    "Date_Debut": "2026-07-08",
    "Date_Fin": "2026-07-08",
    "Cycle": "",
    "Description": "Albums à voix haute, chansons à la guitare et moments à chanter ensemble : bibliothécaires et animatrices des Relais Petite Enfance unissent leur voix, accompagnées par la musicienne Clémence Bouin, pour un rendez-vous tendre et complice, pensé pour les tout-petits et leurs parents.\n\nJeudi 2 juillet – Jardin de la médiathèque Maurice-Genevoix *(en cas de pluie : à l'intérieur de la médiathèque)*\\\nVendredi 3 juillet – Jardins de la crèche multiaccueil de Blois-Vienn&#x65;*(en cas de pluie : à l'ALCV)*\\\nMercredi 8 juillet – Jardins de l'Évêch&#xE9;*(en cas de pluie : bibliothèque Abbé-Grégoire)*\n\n*9h30 et 10h30 – 2 séances de 35 min – Pour les tout-petits – Entrée libre*\n\n*Merci d'apporter de quoi vous asseoir.*",
    "Heure": "9h30 et 10h30",
    "Public_cible": "Pour les tout-petits",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "L:\\Bibliotheques\\JEUNESSE\\COMMUN\\PHOTOS ANIMATIONS\\DLE 2025\\com DLE 2026.jpg",
    "Reservation": "FALSE"
  },
  {
    "id": 53,
    "Titre": "Mode Vacances : activé ! Atelier \"diamond painting\" sur livre",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Adultes",
    "Date_Debut": "2026-07-08",
    "Date_Fin": "2026-07-08",
    "Cycle": "",
    "Description": "Tu as un livre préféré ou un qui mérite une seconde vie ? Apporte-le et customise-le en y posant de petites résines colorées — les « diamonds » — pour lui donner un look unique et tout brillant.\n - 8 places",
    "Heure": "14h",
    "Public_cible": "A partir de 12 ans",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "Du 1er au 10 juillet, la médiathèque Maurice-Genevoix vous invite à plonger dans l'été avec une série d'activités créatives et conviviales — à partager entre amis, en famille et en profiter pour se faire de nouveaux amis. De quoi démarrer les grandes vacances du bon pied !",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 54,
    "Titre": "Mode Vacances : activé ! Atelier bracelet diamonds",
    "Catégorie": "Atelier",
    "Localisation": "Médiathèque Maurice-Genevoix, Salle polyvalente",
    "Date_Debut": "2026-07-09",
    "Date_Fin": "2026-07-09",
    "Cycle": "",
    "Description": "Pose, assemble, crée ! Dans cet atelier, on place une à une de petites résines colorées — les « diamonds » — sur un support adhésif pour composer un bracelet brillant et personnalisé. Laisse libre cours à ta créativité !\n - 12 places",
    "Heure": "14h",
    "Public_cible": "A partir de 8 ans",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "Du 1er au 10 juillet, la médiathèque Maurice-Genevoix vous invite à plonger dans l'été avec une série d'activités créatives et conviviales — à partager entre amis, en famille et en profiter pour se faire de nouveaux amis. De quoi démarrer les grandes vacances du bon pied !",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 55,
    "Titre": "Découverte du casque de réalité virtuelle (VR)",
    "Catégorie": "Jeux vidéo",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Musique, Cinéma et Jeux vidéo",
    "Date_Debut": "2026-07-09",
    "Date_Fin": "2026-08-27",
    "Cycle": "",
    "Description": "Vous avez envie d'une immersion en station spatiale ? De combattre des zombies ou de mignons extraterrestres ? Ou simplement d'une initiation à la réalité virtuelle ? Venez découvrir notre tout nouveau casque VR Meta Quest 3 accompagné d'un agent de votre bibliothèque.",
    "Heure": "tous les jeudis de l'été entre 13h30 et 15h30 sur inscription.",
    "Public_cible": "10 et +",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 56,
    "Titre": "Mode Vacances : activé ! Lectures au jardin",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Jardin de la Médiathèque Maurice-Genevoix",
    "Date_Debut": "2026-07-10",
    "Date_Fin": "2026-07-10",
    "Cycle": "",
    "Description": "Moment détente en plein air avec les lectures au jardin : histoires racontées à voix haute, coin lecture libre sur tapis, etc.",
    "Heure": "14h30",
    "Public_cible": "A partir de 3 ans",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "Du 1er au 10 juillet, la médiathèque Maurice-Genevoix vous invite à plonger dans l'été avec une série d'activités créatives et conviviales — à partager entre amis, en famille et en profiter pour se faire de nouveaux amis. De quoi démarrer les grandes vacances du bon pied !",
    "URL_de_l_image": "https://pixabay.com/photos/reading-plant-nature-leaf-garden-3355230/",
    "Reservation": "FALSE"
  },
  {
    "id": 57,
    "Titre": "Les Instants FIGAS — Concert",
    "Catégorie": "Concert",
    "Localisation": "Médiathèque Maurice-Genevoix, espace Jeunesse",
    "Date_Debut": "2026-07-15",
    "Date_Fin": "2026-07-15",
    "Cycle": "",
    "Description": "Pour fêter sa 10ᵉ édition, le Festival International FIGAS — célébrant depuis 10 ans les musiques et cultures d'Afrique et de sa diaspora à Blois — s'invite à la médiathèque le temps d'un de ses Instants FIGAS. Le nom du groupe sera connu le 1er juin.\nEn partenariat avec l'association Afrik'Consult.\n\nTout public — 18h — 50 places\nRéservation conseillée\n\nFestival International FIGAS — 17 au 19 juillet 2026, Blois",
    "Heure": "18h",
    "Public_cible": "Tout public",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 58,
    "Titre": "Visite insolite de la médiathèque Maurice-Genevoix",
    "Catégorie": "Visite des bibliothèques",
    "Localisation": "Médiathèque Maurice-Genevoix",
    "Date_Debut": "2026-07-21",
    "Date_Fin": "2026-07-21",
    "Cycle": "",
    "Description": "Plongez dans les coulisses interdites de votre médiathèque ! Entre anecdotes historiques, exploration d'espaces secrets d'ordinaire inaccessibles et voyage dans le temps à travers nos archives, découvrez l’envers du décor et les mystères d'un métier bien plus surprenant qu'il n'y paraît.",
    "Heure": "11h",
    "Public_cible": "Tout public",
    "Note": "Pas de visuel trouvé, cf mail de Mélissa à Anne-Marie du 31/03/26",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 59,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-07-22",
    "Date_Fin": "2026-07-22",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 60,
    "Titre": "Mon quart d'heure avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-07-25",
    "Date_Fin": "2026-07-25",
    "Cycle": "Lectures",
    "Description": "Pour trouver ou retrouver le plaisir de lire à haute voix et profiter de ton moment privilégié avec Plume. Tu choisis le livre que tu souhaites lire à Plume (ou lui raconter si tu ne maîtrises pas la lecture) et tu viens la rejoindre dans sa tente cocooning. N’hésite plus. Prends ton RDV avec Plume en téléphonant à l’Espace jeunesse de la bibliothèque au 02 54 56 27 51 Plume t’attend !",
    "Heure": "10h45-12h",
    "Public_cible": "A partir de 6 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 61,
    "Titre": "Pour une fraction de seconde de Guy Delisle - Prix Château-de-Cheverny de la BD historique",
    "Catégorie": "Exposition",
    "Localisation": "Bibliothèque Abbe-Grégoire, Espace Julien-Angelier",
    "Date_Debut": "2026-07-28",
    "Date_Fin": "2026-10-17",
    "Cycle": "Rendez-vous de l'histoire",
    "Description": "1855, Eadweard Muybridge, un jeune anglais qui ne s'intéresse pas particulièrement aux chevaux émigre en Californie. Passionné par un procédé technique qui en est à ses débuts, la photographie, il va rapidement devenir un des plus célèbres photographes de son époque. Aidé par l'homme le plus riche des États-Unis, il va réussir un exploit inédit : fixer sur pellicule la course d'un cheval au galop. Bien avant Edison et les frères lumières, Muybridge est le premier homme à dompter le mouvement et à projeter un film. Guy Delisle tire le portrait d'un pionnier du cinéma, injustement oublié par l'histoire.\n\nCoproduction Agglopolys, Rendez-vous de l’histoire et bd BOUM\nPartenariat avec le Fonds patrimonial et la Maison de la magie",
    "Heure": "",
    "Public_cible": "",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 62,
    "Titre": "Visite insolite de la médiathèque Maurice-Genevoix",
    "Catégorie": "Visite des bibliothèques",
    "Localisation": "Médiathèque Maurice-Genevoix",
    "Date_Debut": "2026-07-29",
    "Date_Fin": "2026-07-29",
    "Cycle": "",
    "Description": "Plongez dans les coulisses interdites de votre médiathèque ! Entre anecdotes historiques, exploration d'espaces secrets d'ordinaire inaccessibles et voyage dans le temps à travers nos archives, découvrez l’envers du décor et les mystères d'un métier bien plus surprenant qu'il n'y paraît.",
    "Heure": "11h",
    "Public_cible": "Tout public",
    "Note": "Pas de visuel trouvé, cf mail de Mélissa à Anne-Marie du 31/03/26",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 63,
    "Titre": "Ciné d'été : En fanfare",
    "Catégorie": "Projection",
    "Localisation": "Bibliothèque Abbé-Grégoire, Auditorium Samuel Paty",
    "Date_Debut": "2026-08-05",
    "Date_Fin": "2026-08-05",
    "Cycle": "",
    "Description": "Thibaut est un chef d’orchestre de renommée \ninternationale qui parcourt le monde. Lorsqu’il apprend \nqu’il a été adopté, il découvre l’existence d’un frère, Jimmy, \nemployé de cantine scolaire et qui joue du trombone dans \nune fanfare du nord de la France.\nEn apparence tout les sépare, sauf l’amour de la musique. \nDétectant les capacités musicales exceptionnelles de son \nfrère, Thibaut se donne pour mission de réparer l’injustice \ndu destin. Jimmy se prend alors à rêver d’une autre vie.",
    "Heure": "18h",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "De Emmanuel Courcol, avec Benjamin Lavernhe, Pierre Lottin, Sarah Suco (comédie dramatique, 2024, 1h43, France)",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 64,
    "Titre": "Médiathèque Hors les murs",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Lac de la Pinçonnière",
    "Date_Debut": "2026-08-05",
    "Date_Fin": "2026-08-05",
    "Cycle": "",
    "Description": "Moment lecture avec la médiathèque Maurice-Genevoix au lac de la Pinçonnière, en partenariat avec les ludothèques de l'Espace Mirabeau et de Rosa-Parks. Lectures, jeux et activités seront proposés ! Annulé en cas de pluie.",
    "Heure": "16h",
    "Public_cible": "Tout public",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 65,
    "Titre": "Médiathèque Hors les murs",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Lac de la Pinçonnière",
    "Date_Debut": "2026-08-12",
    "Date_Fin": "2026-08-12",
    "Cycle": "",
    "Description": "Moment lecture avec la médiathèque Maurice-Genevoix au lac de la Pinçonnière, en partenariat avec les ludothèques de l'Espace Mirabeau et de Rosa-Parks. Lectures, jeux et activités seront proposés ! Annulé en cas de pluie.",
    "Heure": "16h",
    "Public_cible": "Tout public",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 66,
    "Titre": "Ciné d'été : Charade",
    "Catégorie": "Projection",
    "Localisation": "Bibliothèque Abbé-Grégoire, Auditorium Samuel Paty",
    "Date_Debut": "2026-08-19",
    "Date_Fin": "2026-08-19",
    "Cycle": "",
    "Description": "Aux sports d’hiver, une Américaine tombe amoureuse d’un séduisant célibataire. De retour à Paris, elle apprend le meurtre de son mari et elle va être poursuivie par d’étranges personnages, à la recherche d'un magot caché par la victime et dont elle ignore tout.",
    "Heure": "18h",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "De Stanley Donen, avec Cary Grant, Audrey Hepburn, Walter Matthau. (Policier, 1963, 1h54, États-Unis, VOSTFR)",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 67,
    "Titre": "Médiathèque Hors les murs",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Lac de la Pinçonnière",
    "Date_Debut": "2026-08-19",
    "Date_Fin": "2026-08-19",
    "Cycle": "",
    "Description": "Moment lecture avec la médiathèque Maurice-Genevoix au lac de la Pinçonnière, en partenariat avec les ludothèques de l'Espace Mirabeau et de Rosa-Parks. Lectures, jeux et activités seront proposés ! Annulé en cas de pluie.",
    "Heure": "16h",
    "Public_cible": "Tout public",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 68,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-08-26",
    "Date_Fin": "2026-08-26",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
   "Reservation": "FALSE"
  },
  {
    "id": 69,
    "Titre": "Ciné d'été : L'Aventura",
    "Catégorie": "Projection",
    "Localisation": "Bibliothèque Abbé-Grégoire, Auditorium Samuel Paty",
    "Date_Debut": "2026-08-26",
    "Date_Fin": "2026-08-26",
    "Cycle": "",
    "Description": "Les vacances d’été. Sardaigne, Italie. Un (road) trip en famille. Claudine, bientôt 11 ans, raconte leurs aventures au fur et à mesure. Quand Raoul, son frère de 3 ans, ne l’en empêche pas.",
    "Heure": "18h",
    "Public_cible": "tout public",
    "Note": "",
    "Ville": "",
    "Accroche": "De Sophie Letourneur, avec Philippe Katerine, Sophie Letourneur, Bérénice Vernet (comédie, 2025, 1h47, France)",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 70,
    "Titre": "Médiathèque hors les murs",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Lac de la Pinçonnière",
    "Date_Debut": "2026-08-26",
    "Date_Fin": "2026-08-26",
    "Cycle": "",
    "Description": "Moment lecture avec la médiathèque Maurice-Genevoix au lac de la Pinçonnière, en partenariat avec les ludothèques de l'Espace Mirabeau et de Rosa-Parks. Lectures, jeux et activités seront proposés ! Annulé en cas de pluie.",
    "Heure": "16h",
    "Public_cible": "Tout public",
    "Note": "Dans le cadre des DLE",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 71,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-09-02",
    "Date_Fin": "2026-09-02",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 72,
    "Titre": "Mon quart d'heure avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-09-05",
    "Date_Fin": "2026-09-05",
    "Cycle": "Lectures",
    "Description": "Pour trouver ou retrouver le plaisir de lire à haute voix et profiter de ton moment privilégié avec Plume. Tu choisis le livre que tu souhaites lire à Plume (ou lui raconter si tu ne maîtrises pas la lecture) et tu viens la rejoindre dans sa tente cocooning. N’hésite plus. Prends ton RDV avec Plume en téléphonant à l’Espace jeunesse de la bibliothèque au 02 54 56 27 51 Plume t’attend !",
    "Heure": "10h45-12h",
    "Public_cible": "A partir de 6 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
   "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 73,
    "Titre": "1, 2, 3... Il était une fois",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-09-12",
    "Date_Fin": "2026-09-12",
    "Cycle": "Lectures",
    "Description": "Les bibliothécaires lisent des albums et des comptines choisis parmi les nouveautés et leurs coups de cœur",
    "Heure": "11h",
    "Public_cible": "Dès 2 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 74,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-09-16",
    "Date_Fin": "2026-09-16",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 75,
    "Titre": "Conférence : La bibliothèque de Blois de 1939 à 1945 : un havre de paix pendant la guerre ?",
    "Catégorie": "Rencontre",
    "Localisation": "Bibliothèque Abbé-Grégoire, Fonds patrimonial",
    "Date_Debut": "2026-09-19",
    "Date_Fin": "2026-09-19",
    "Cycle": "",
    "Description": "Comment la bibliothèque municipale de Blois, alors située au château, a-t-elle traversé la guerre ? Etait-elle un lieu épargné où les Blésois pouvaient trouver calme et répit durant les années d’occupation ? De la gestion des livres « anti-allemands » à la mise à l’abri des livres précieux au château de Chantreuil, cette conférence décrit comment le personnel de la bibliothèque a dû cohabiter avec l’occupant et comment les livres ont été préservés.\nRainer Pohl travaille depuis plusieurs années sur la vie à Blois pendant le Seconde Guerre mondiale et est l’auteur de plusieurs publications et conférences.\nUne exposition de documents d’archives accompagnera la conférence du 16 au 24 septembre.",
    "Heure": "14h",
    "Public_cible": "Adulte",
    "Note": "",
    "Ville": "",
    "Accroche": "Par Rainer Pohl, professeur d'histoire et Rachel Denoeud, documentaliste\nDans le cadre des Journées européennes du Patrimoine",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 76,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-09-30",
    "Date_Fin": "2026-09-30",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 77,
    "Titre": "1, 2, 3... Il était une fois",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-10-03",
    "Date_Fin": "2026-10-03",
    "Cycle": "Lectures",
    "Description": "Les bibliothécaires lisent des albums et des comptines choisis parmi les nouveautés et leurs coups de cœur",
    "Heure": "11h",
    "Public_cible": "Dès 2 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 78,
    "Titre": "Mon quart d'heure avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-10-03",
    "Date_Fin": "2026-10-03",
    "Cycle": "Lectures",
    "Description": "Pour trouver ou retrouver le plaisir de lire à haute voix et profiter de ton moment privilégié avec Plume. Tu choisis le livre que tu souhaites lire à Plume (ou lui raconter si tu ne maîtrises pas la lecture) et tu viens la rejoindre dans sa tente cocooning. N’hésite plus. Prends ton RDV avec Plume en téléphonant à l’Espace jeunesse de la bibliothèque au 02 54 56 27 51 Plume t’attend !",
    "Heure": "10h45-12h",
    "Public_cible": "A partir de 6 ans",
    "Note": "",
    "Ville": "",
   "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 79,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-10-28",
    "Date_Fin": "2026-10-28",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 80,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-11-04",
    "Date_Fin": "2026-11-04",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 81,
    "Titre": "1, 2, 3... Il était une fois",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-11-07",
    "Date_Fin": "2026-11-07",
    "Cycle": "Lectures",
    "Description": "Les bibliothécaires lisent des albums et des comptines choisis parmi les nouveautés et leurs coups de cœur",
    "Heure": "11h",
    "Public_cible": "Dès 2 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 82,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-11-18",
    "Date_Fin": "2026-11-18",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 83,
    "Titre": "Mon quart d'heure avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-11-28",
    "Date_Fin": "2026-11-28",
    "Cycle": "Lectures",
    "Description": "Pour trouver ou retrouver le plaisir de lire à haute voix et profiter de ton moment privilégié avec Plume. Tu choisis le livre que tu souhaites lire à Plume (ou lui raconter si tu ne maîtrises pas la lecture) et tu viens la rejoindre dans sa tente cocooning. N’hésite plus. Prends ton RDV avec Plume en téléphonant à l’Espace jeunesse de la bibliothèque au 02 54 56 27 51 Plume t’attend !",
    "Heure": "10h45-12h",
    "Public_cible": "A partir de 6 ans",
    "Note": "",
    "Ville": "",
   "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 84,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-12-02",
    "Date_Fin": "2026-12-02",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 85,
    "Titre": "1, 2, 3... Il était une fois",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-12-12",
    "Date_Fin": "2026-12-12",
    "Cycle": "Lectures",
    "Description": "Les bibliothécaires lisent des albums et des comptines choisis parmi les nouveautés et leurs coups de cœur",
    "Heure": "11h",
    "Public_cible": "Dès 2 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 86,
    "Titre": "Mon quart d'heure avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, salle du conte",
    "Date_Debut": "2026-12-12",
    "Date_Fin": "2026-12-12",
    "Cycle": "Lectures",
    "Description": "Pour trouver ou retrouver le plaisir de lire à haute voix et profiter de ton moment privilégié avec Plume. Tu choisis le livre que tu souhaites lire à Plume (ou lui raconter si tu ne maîtrises pas la lecture) et tu viens la rejoindre dans sa tente cocooning. N’hésite plus. Prends ton RDV avec Plume en téléphonant à l’Espace jeunesse de la bibliothèque au 02 54 56 27 51 Plume t’attend !",
    "Heure": "10h45-12h",
    "Public_cible": "A partir de 6 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  },
  {
    "id": 87,
    "Titre": "Je lis avec Plume",
    "Catégorie": "Lecture spectacle",
    "Localisation": "Bibliothèque Abbé-Grégoire, espace Jeunesse",
    "Date_Debut": "2026-12-16",
    "Date_Fin": "2026-12-16",
    "Cycle": "Lectures",
    "Description": "Plume, notre caniche royale (chien d’assistance Handi’chiens) et Christine sa référente bibliothécaire, accompagnent les enfants à la découverte ludique des livres.",
    "Heure": "10h15",
    "Public_cible": "0-5 ans",
    "Note": "",
    "Ville": "",
    "Accroche": "",
    "URL_de_l_image": "",
    "Reservation": "FALSE"
  }
            ];
            
            let activeFilter = 'all';
            let isMobileExpanded = false;

            let wasMobile = window.innerWidth <= 768;
            window.addEventListener('resize', () => {
                const isMobile = window.innerWidth <= 768;
                if (isMobile !== wasMobile) {
                    wasMobile = isMobile;
                    renderWidget(agendaData);
                }
            });

            function getCountdownHtml(dateString) {
                if (!dateString) return '';
                const today = new Date();
                today.setHours(0,0,0,0);
                const eventDate = new Date(dateString);
                if (isNaN(eventDate)) return '';
                eventDate.setHours(0,0,0,0);
                
                const diffDays = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));
                
                if (diffDays >= 0 && diffDays <= 7) {
                    let text = `Dans ${diffDays} jours`;
                    if (diffDays === 0) text = "Aujourd'hui";
                    else if (diffDays === 1) text = "Demain";
                    return `<span class="agd-lite-tag" style="background: #f9fafb; color: #4b5563; border: 1px solid #e5e7eb;">⏳ ${text}</span>`;
                }
                return '';
            }

            function formatDateStr(dateString) {
                const dateObj = new Date(dateString);
                if (isNaN(dateObj)) return dateString; 
                const options = { weekday: 'long', day: 'numeric', month: 'long' };
                let str = dateObj.toLocaleDateString('fr-FR', options);
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            function renderWidget(events) {
                const isMobile = window.innerWidth <= 768;
                const widgetEl = document.querySelector('.agd-lite-widget');
                if (widgetEl) {
                    if (isMobile && !isMobileExpanded) {
                        widgetEl.classList.add('is-collapsed');
                    } else {
                        widgetEl.classList.remove('is-collapsed');
                    }
                }

                let filteredEvents = events.filter(e => {
                    // Masquer les événements passés (en tenant compte de la date et de l'heure)
                    if (!e.Date_Debut) return false;
                    const eventDate = new Date(e.Date_Debut);
                    if (isNaN(eventDate)) return false;

                    if (e.Heure) {
                        const timeMatch = e.Heure.match(/(\d+)[hH:]?([0-5]\d)?/);
                        if (timeMatch) {
                            eventDate.setHours(parseInt(timeMatch[1], 10), timeMatch[2] ? parseInt(timeMatch[2], 10) : 0, 0, 0);
                        } else {
                            eventDate.setHours(23, 59, 59, 999);
                        }
                    } else {
                        eventDate.setHours(23, 59, 59, 999);
                    }

                    const now = new Date();
                    if (eventDate < now) return false;

                    // Filtre par tags
                    if (activeFilter !== 'all') {
                        return (e.Cycle && e.Cycle.includes(activeFilter)) || 
                               (e.Catégorie && e.Catégorie.includes(activeFilter));
                    }
                    return true;
                });

                if (filteredEvents.length === 0) {
                    container.innerHTML = '<div class="agd-lite-loading">Aucun événement.</div>';
                    return;
                }

                const grouped = {};
                filteredEvents.forEach(ev => {
                    const d = ev.Date_Debut;
                    if (!grouped[d]) grouped[d] = [];
                    grouped[d].push(ev);
                });

                const sortedDates = Object.keys(grouped).sort((a,b) => new Date(a) - new Date(b));
                let html = '';
                let displayedCount = 0;
                
                const maxEvents = (isMobile && !isMobileExpanded) ? 1 : Infinity;
                let renderedCount = 0;
                let hasMoreEvents = false;

                sortedDates.forEach(dateStr => {
                    const eventsForDate = grouped[dateStr];
                    
                    if (renderedCount >= maxEvents) {
                        hasMoreEvents = true;
                        return;
                    }
                    
                    const formattedDate = formatDateStr(dateStr);
                    let dateHtml = `
                        <div class="agd-lite-timeline-header">
                            <div class="agd-lite-timeline-dot"></div>
                            <h3 class="agd-lite-timeline-date">${formattedDate}</h3>
                            <div class="agd-lite-timeline-line"></div>
                        </div>
                    `;
                    let hasAddedDateHeader = false;

                    eventsForDate.forEach(event => {
                        if (renderedCount >= maxEvents) {
                            hasMoreEvents = true;
                            return;
                        }
                        
                        if (!hasAddedDateHeader) {
                            html += dateHtml;
                            hasAddedDateHeader = true;
                        }

                        const showImage = displayedCount < 2;
                        const imgUrl = event.urlImg || event.URL_de_l_image;
                        const imageHtml = (showImage && imgUrl) ? `<img src="${imgUrl}" alt="" class="agd-lite-image">` : '';
                        const countdownBadge = getCountdownHtml(event.Date_Debut);
                        
                        const tagsHtml = `
                            <div class="agd-lite-tags">
                                ${countdownBadge}
                                ${(event.Reservation === true || String(event.Reservation).toLowerCase() === 'true') ? `<span class="agd-lite-tag agd-lite-tag-res">🎟️ Sur réservation</span>` : ''}
                                ${event.Catégorie ? `<span class="agd-lite-tag agd-lite-tag-cat">${event.Catégorie}</span>` : ''}
                                ${event.Public ? `<span class="agd-lite-tag agd-lite-tag-pub">${event.Public}</span>` : ''}
                            </div>
                        `;

                        // Heure formatage
                        let dateHeure = formattedDate;
                        if (event.Heure) {
                            dateHeure += ` à ${event.Heure}`;
                        }

                        const eventJson = encodeURIComponent(JSON.stringify(event));
                        
                        html += `
                            <div class="agd-lite-card-container">
                                <a href="${event.Lien_Afficher || '#'}" class="agd-lite-card agd-lite-card-link" data-event="${eventJson}" data-dateheure="${dateHeure}">
                                    ${imageHtml}
                                    ${tagsHtml}
                                    <h4 class="agd-lite-card-title">${event.Titre || 'Événement'}</h4>
                                    
                                    <div class="agd-lite-info-blocks">
                                        <div class="agd-lite-info-row">
                                            <span class="material-symbols-rounded agd-lite-icon agd-lite-icon-date">calendar_today</span>
                                            <span class="agd-lite-info-value">${dateHeure}</span>
                                        </div>
                                        
                                        ${event.Localisation ? `
                                        <div class="agd-lite-info-row">
                                            <span class="material-symbols-rounded agd-lite-icon agd-lite-icon-loc">location_on</span>
                                            <span class="agd-lite-info-value">${event.Localisation}</span>
                                        </div>
                                        ` : ''}
                                    </div>
                                </a>
                            </div>
                        `;
                        displayedCount++;
                        renderedCount++;
                    });
                });
                
                if (hasMoreEvents) {
                    html += `
                        <button id="agd-lite-expand-btn" class="agd-lite-expand-btn">
                            Voir toutes les animations (${filteredEvents.length})
                        </button>
                    `;
                }

                container.innerHTML = html;
                
                if (hasMoreEvents) {
                    document.getElementById('agd-lite-expand-btn').addEventListener('click', () => {
                        isMobileExpanded = true;
                        renderWidget(agendaData);
                    });
                }
            }

            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filterBtns.forEach(b => b.classList.remove('agd-active'));
                    e.currentTarget.classList.add('agd-active');
                    activeFilter = e.currentTarget.dataset.filter;
                    renderWidget(agendaData);
                });
            });

            renderWidget(agendaData);
            
            // --- Modal Logic ---
            const modalOverlay = document.getElementById('agd-lite-modal');
            const modalBodyContent = document.getElementById('agd-lite-modal-body');
            const modalClose = document.getElementById('agd-lite-modal-close');

            function generateICSUrl(event) {
                if (!event.Date_Debut) return '#';
                const startDate = new Date(event.Date_Debut);
                if (isNaN(startDate.getTime())) return '#';
                
                if (event.Heure) {
                    const timeMatch = event.Heure.match(/(\d+)[hH:]?([0-5]\d)?/);
                    if (timeMatch) {
                        startDate.setHours(parseInt(timeMatch[1], 10), timeMatch[2] ? parseInt(timeMatch[2], 10) : 0);
                    }
                }
                
                const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); 
                
                const fmt = (d) => {
                    const pad = n => n < 10 ? '0'+n : n;
                    return d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate()) + 'T' + 
                           pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
                };
                
                const title = event.Titre || 'Événement';
                const desc = event.Description || '';
                const loc = event.Localisation || '';
                
                const icsLines = [
                    "BEGIN:VCALENDAR",
                    "VERSION:2.0",
                    "PRODID:-//AgendaWidget//FR",
                    "BEGIN:VEVENT",
                    `DTSTART:${fmt(startDate)}`,
                    `DTEND:${fmt(endDate)}`,
                    `SUMMARY:${title}`,
                    `DESCRIPTION:${desc.replace(/\n/g, '\\n')}`,
                    `LOCATION:${loc}`,
                    "END:VEVENT",
                    "END:VCALENDAR"
                ];
                
                return "data:text/calendar;charset=utf-8," + encodeURIComponent(icsLines.join("\r\n"));
            }

            function openModal(eventData, dateHeure) {
                const imgUrl = eventData.urlImg || eventData.URL_de_l_image;
                const imageHtml = imgUrl ? `<img src="${imgUrl}" alt="" class="agd-lite-modal-image">` : '';
                const descHtml = eventData.Description ? `<p class="agd-lite-modal-desc">${eventData.Description}</p>` : '';
                const countdownBadge = getCountdownHtml(eventData.Date_Debut);
                
                const icsUrl = generateICSUrl(eventData);
                const icsFilename = (eventData.Titre || 'evenement').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.ics';

                const actionsHtml = `
                    <div class="agd-lite-modal-actions">
                        ${eventData.Lien_Afficher && eventData.Lien_Afficher !== '#' ? `<a href="${eventData.Lien_Afficher}" target="_blank" class="agd-lite-modal-btn">En savoir plus</a>` : ''}
                        <a href="${icsUrl}" download="${icsFilename}" class="agd-lite-modal-btn agd-lite-modal-btn-outline">
                            <span class="material-symbols-rounded" style="font-size: 20px;">calendar_month</span>
                            Ajouter à l'agenda
                        </a>
                    </div>
                `;
                
                const tagsHtml = `
                    <div class="agd-lite-tags" style="margin-bottom: 0;">
                        ${countdownBadge}
                        ${(eventData.Reservation === true || String(eventData.Reservation).toLowerCase() === 'true') ? `<span class="agd-lite-tag agd-lite-tag-res">🎟️ Sur réservation</span>` : ''}
                        ${eventData.Catégorie ? `<span class="agd-lite-tag agd-lite-tag-cat">${eventData.Catégorie}</span>` : ''}
                        ${eventData.Public ? `<span class="agd-lite-tag agd-lite-tag-pub">${eventData.Public}</span>` : ''}
                    </div>
                `;

                modalBodyContent.innerHTML = `
                    <div class="agd-lite-modal-body-pad">
                        <div class="agd-lite-modal-header-flex">
                            ${imageHtml}
                            <div class="agd-lite-modal-header-content">
                                ${tagsHtml}
                                <h2 class="agd-lite-modal-title" style="margin: 0; font-size: 20px;">${eventData.Titre || 'Événement'}</h2>
                            </div>
                        </div>
                        
                        <div class="agd-lite-info-blocks" style="margin-bottom: 24px;">
                            <div class="agd-lite-info-row">
                                <span class="material-symbols-rounded agd-lite-icon agd-lite-icon-date">calendar_today</span>
                                <span class="agd-lite-info-value">${dateHeure}</span>
                            </div>
                            
                            ${eventData.Localisation ? `
                            <div class="agd-lite-info-row">
                                <span class="material-symbols-rounded agd-lite-icon agd-lite-icon-loc">location_on</span>
                                <span class="agd-lite-info-value">${eventData.Localisation}</span>
                            </div>
                            ` : ''}
                        </div>
                        
                        ${descHtml}
                        ${actionsHtml}
                    </div>
                `;
                
                modalOverlay.style.display = 'flex';
                // Force reflow
                void modalOverlay.offsetWidth;
                modalOverlay.classList.add('agd-active');
                document.body.style.overflow = 'hidden';
            }

            function closeModal() {
                modalOverlay.classList.remove('agd-active');
                setTimeout(() => {
                    modalOverlay.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }

            modalClose.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });

            // Event delegation for opening modal on card click
            container.addEventListener('click', (e) => {
                const card = e.target.closest('.agd-lite-card-link');
                if (card) {
                    e.preventDefault();
                    const eventData = JSON.parse(decodeURIComponent(card.dataset.event));
                    const dateHeure = card.dataset.dateheure;
                    openModal(eventData, dateHeure);
                }
            });
        });
