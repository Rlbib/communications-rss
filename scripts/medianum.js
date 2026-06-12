// On attend que le DOM (la page HTML) soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {

  // 1. TON JSON COMPLET
  const moviesData = [
  {
    "titre": "So Long, My Son",
    "annee": "2019",
    "duree": "3H05",
    "note": "5/5",
    "qualite": "SD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/c0/8d/c08dcc30-b86c-4fc5-8ebf-bf7934179699.jpg",
    "url": "https://www.arte.tv/films/so-long-my-son"
  },
  {
    "titre": "Le Prix du succès",
    "annee": "2016",
    "duree": "1H32",
    "note": "2.25/5",
    "qualite": "SD,HD",
    "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/5a/54/5a54a2e96f55d.jpeg?width=510",
    "url": "https://www.arte.tv/films/le-prix-du-succes"
  },
  {
    "titre": "'71",
    "annee": "2013",
    "duree": "1H39",
    "note": "5/5",
    "qualite": "SD,HD, âge limite : 12 ans",
    "image": "https://medias.mednum.lab.arte.tv/images/510/2d/99/2d99712e-6c24-11e4-9b63-3d3c777362b5.jpg",
    "url": "https://www.arte.tv/films/71"
  },
  {
    "titre": "Adam",
    "annee": "2019",
    "duree": "1H38",
    "note": "4.861111/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/2c/2c/2c2c5f78-75ad-11ea-885b-511e0a4f8f7e.jpg",
    "url": "https://www.arte.tv/films/adam"
  },
  {
    "titre": "Kings",
    "annee": "2017",
    "duree": "1H30",
    "note": "2.5/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/20/d9/20d9be82-a206-11e8-9fb9-05e15fa1af64.jpg",
    "url": "https://www.arte.tv/films/kings"
  },
  {
    "titre": "Amore",
    "annee": "2009",
    "duree": "1H58",
    "note": "4/5",
    "qualite": "SD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/48/d7/48d7458f-4c0b-11e0-9e3b-ada99accce55.png",
    "url": "https://www.arte.tv/films/amore"
  },
  {
    "titre": "Les Meutes",
    "annee": "2023",
    "duree": "1H34",
    "note": "3.642857/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/e3/6f/e36f4744-ccf8-479f-a024-d87a353eced9.jpg",
    "url": "https://www.arte.tv/films/les-meutes-0"
  },
  {
    "titre": "Dark River",
    "annee": "2017",
    "duree": "1H29",
    "note": "4.4444447/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/0f/98/0f98dc4f-e349-11e8-bf17-15c48d631ac5.jpg",
    "url": "https://www.arte.tv/films/dark-river"
  },
  {
    "titre": "La Terre des hommes",
    "annee": "2020",
    "duree": "1H36",
    "note": "4.2916665/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/8c/4a/8c4a4588-e779-432d-acae-f5ee601e054e.jpg",
    "url": "https://www.arte.tv/films/la-terre-des-hommes"
  },
  {
    "titre": "Au-delà des montagnes",
    "annee": "2014",
    "duree": "2H06",
    "note": "4.1666665/5",
    "qualite": "SD,HD, sous-titres sourds et malentendant disponibles",
    "image": "https://medias.mednum.lab.arte.tv/images/510/35/ff/35ffeed9-0246-11e6-a4a8-35ba40b3b7c0.jpg",
    "url": "https://www.arte.tv/films/au-dela-des-montagnes"
  },
  {
    "titre": "Jamais de la vie",
    "annee": "2014",
    "duree": "1H35",
    "note": "3.3333333/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/7d/e7/7de79cd4-093e-11e5-97c4-27b00ba0d7d8.jpg",
    "url": "https://www.arte.tv/films/jamais-de-la-vie"
  },
  {
    "titre": "Take Shelter",
    "annee": "2010",
    "duree": "1H56",
    "note": "4.3125/5",
    "qualite": "SD,HD, âge limite : 10 ans",
    "image": "https://medias.mednum.lab.arte.tv/images/510/60/14/6014c605-7743-11e1-8c9b-f17d938a387c.jpg",
    "url": "https://www.arte.tv/films/take-shelter"
  },
  {
    "titre": "À l'ombre des filles",
    "annee": "2020",
    "duree": "1H46",
    "note": "4.0875/5",
    "qualite": "SD,HD, sous-titres sourds et malentendant disponibles, audiodescription disponible",
    "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/ac/52/ac522b57-f8fc-4bcd-a280-103afdf9020d.jpg?width=510",
    "url": "https://www.arte.tv/films/a-lombre-des-filles"
  },
  {
    "titre": "Cow",
    "annee": "2021",
    "duree": "1H34",
    "note": "3.8333333/5",
    "qualite": "SD,HD",
    "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/e2/a1/e2a141dc-348e-49ef-9832-d24eb1687154.jpg?width=510",
    "url": "https://www.arte.tv/films/cow"
  },
  {
    "titre": "Le Grand Soir",
    "annee": "2011",
    "duree": "1H32",
    "note": "3.6363637/5",
    "qualite": "SD,HD, sous-titres sourds et malentendant disponibles",
    "image": "https://medias.mednum.lab.arte.tv/images/510/b4/ba/b4ba15ae-dfb4-11e1-bb18-67a26603e59a.png",
    "url": "https://www.arte.tv/films/le-grand-soir"
  },
  {
    "titre": "J'enrage de son absence",
    "annee": "2011",
    "duree": "1H38",
    "note": "4.5/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/09/cc/09cc95ab-3ad8-11e2-8331-ff80d92de94a.png",
    "url": "https://www.arte.tv/films/jenrage-de-son-absence"
  },
  {
    "titre": "Le Fils de Saul",
    "annee": "2015",
    "duree": "1H47",
    "note": "4.3333335/5",
    "qualite": "SD,HD, sous-titres sourds et malentendant disponibles, âge limite : 12 ans",
    "image": "https://medias.mednum.lab.arte.tv/images/510/cd/99/cd99e6d1-dc93-11e5-a8f3-13a1ecbd47b1.jpg",
    "url": "https://www.arte.tv/films/le-fils-de-saul"
  },
  {
    "titre": "Whiplash",
    "annee": "2013",
    "duree": "1H45",
    "note": "4.180851/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/4a/6a/4a6ab25c-c0f4-11e4-bbde-215eef33312e.jpg",
    "url": "https://www.arte.tv/films/whiplash"
  },
  {
    "titre": "Los delincuentes",
    "annee": "2023",
    "duree": "3H10",
    "note": "3.7857144/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/01/1e/011e907e-3071-485b-88d6-aa7cf13d88e5.jpg",
    "url": "https://www.arte.tv/films/los-delincuentes"
  },
  {
    "titre": "Vampire humaniste cherche suicidaire consentant",
    "annee": "2023",
    "duree": "1H31",
    "note": "4.5875/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/bd/af/bdafd9c5-454a-46a5-adad-4391801af49d.jpg",
    "url": "https://www.arte.tv/films/vampire-humaniste-cherche-suicidaire-con"
  },
  {
    "titre": "Mustang",
    "annee": "2015",
    "duree": "1H34",
    "note": "4.214286/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/5d/fa/5dfa5035-0b70-11e5-a5f0-37d817bc0083.jpg",
    "url": "https://www.arte.tv/films/mustang"
  },
  {
    "titre": "Mud - Sur les rives du Mississippi",
    "annee": "2012",
    "duree": "2H03",
    "note": "4.611111/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/ef/1c/ef1c4a99-ea8e-11e4-a49b-1f91210baf52.jpg",
    "url": "https://www.arte.tv/films/mud-sur-les-rives-du-mississippi"
  },
  {
    "titre": "Atlantique",
    "annee": "2019",
    "duree": "1H45",
    "note": "4.1/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/8b/a4/8ba4191c-48ca-11ea-aaa0-e5add7a19955.jpg",
    "url": "https://www.arte.tv/films/atlantique"
  },
  {
    "titre": "Wonderland, le royaume sans pluie",
    "annee": "2019",
    "duree": "1H55",
    "note": "3.5/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/38/e8/38e84dd3-441e-4a2d-ad87-b1744c527df1.jpg",
    "url": "https://www.arte.tv/films/wonderland-le-royaume-sans-pluie"
  },
  {
    "titre": "Here",
    "annee": "2023",
    "duree": "1H22",
    "note": "3.25/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/3d/a4/3da4042e-b16f-46ba-b04a-c75316cb8a94.jpg",
    "url": "https://www.arte.tv/films/here"
  },
  {
    "titre": "Mis Hermanos",
    "annee": "2021",
    "duree": "1H25",
    "note": "Non noté",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/79/7a/797a3684-1bb8-4532-8689-6d3622968593.jpg",
    "url": "https://www.arte.tv/films/mis-hermanos"
  },
  {
    "titre": "Scrapper",
    "annee": "2023",
    "duree": "1H24",
    "note": "4.35/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/b8/9b/b89bb1cb-df1c-4d82-bb4a-c1e00bca9e75.jpg",
    "url": "https://www.arte.tv/films/scrapper"
  },
  {
    "titre": "Nitram",
    "annee": "2020",
    "duree": "1H52",
    "note": "3.8888888/5",
    "qualite": "SD,HD, âge limite : 12 ans",
    "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/4c/ce/4cce9c1e-e6eb-4725-9835-1af0ebd97549.png?width=510",
    "url": "https://www.arte.tv/films/nitram"
  },
  {
    "titre": "En même temps",
    "annee": "2022",
    "duree": "1H48",
    "note": "2.8387096/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/9e/37/9e372ce4-c8c9-4a8e-b0df-0e8038c8e3cb.jpg",
    "url": "https://www.arte.tv/films/en-meme-temps-3"
  },
  {
    "titre": "L'Ombre d'un mensonge",
    "annee": "2019",
    "duree": "1H39",
    "note": "4.354839/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/c0/03/c003e068-abdd-4b72-85bf-6466dc5ac474.jpg",
    "url": "https://www.arte.tv/films/lombre-dun-mensonge-0"
  },
  {
    "titre": "À la poursuite de Ricky Baker",
    "annee": "2016",
    "duree": "1H41",
    "note": "4.75/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/6e/38/6e38f294-60af-4c93-8863-24eeb305c46e.jpg",
    "url": "https://www.arte.tv/films/a-la-poursuite-de-ricky-baker"
  },
  {
    "titre": "Tijuana Bible",
    "annee": "2020",
    "duree": "1H32",
    "note": "2.6666667/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/94/fc/94fcb880-cb5a-11ea-8942-03107dc9c4ae.jpg",
    "url": "https://www.arte.tv/films/tijuana-bible"
  },
  {
    "titre": "Les Éternels (Ash is Purest White)",
    "annee": "2018",
    "duree": "2H16",
    "note": "4.1/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/37/86/378635bf-0fb7-4652-9175-6b6a02373e16.jpg",
    "url": "https://www.arte.tv/films/les-eternels-ash-is-purest-white"
  },
  {
    "titre": "Sunset",
    "annee": "2018",
    "duree": "2H22",
    "note": "3.3333333/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/8b/d7/8bd7d68e-ae77-476e-9147-e1dcb1c2a900.jpeg",
    "url": "https://www.arte.tv/films/sunset-3"
  },
  {
    "titre": "Asako I & II",
    "annee": "2018",
    "duree": "1H59",
    "note": "Non noté",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/02/12/02121f91-5ba8-11e9-a7c9-11bc1d2eebc5.jpg",
    "url": "https://www.arte.tv/films/asako-i-ii-0"
  },
  {
    "titre": "L'Échange des princesses",
    "annee": "2017",
    "duree": "1H40",
    "note": "3.3333333/5",
    "qualite": "SD,HD",
    "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/5a/ea/5aeae6cbe4253.jpeg?width=510",
    "url": "https://www.arte.tv/films/lechange-des-princesses"
  },
  {
    "titre": "Good Time",
    "annee": "2017",
    "duree": "1H41",
    "note": "Non noté",
    "qualite": "SD,HD, âge limite : 12 ans",
    "image": "https://medias.mednum.lab.arte.tv/images/510/85/41/85419444-88a1-472b-9b71-d301861a36bc.jpg",
    "url": "https://www.arte.tv/films/good-time"
  },
  {
    "titre": "Planetarium",
    "annee": "2016",
    "duree": "1H45",
    "note": "2.125/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/6e/cf/6ecf325f-452f-4dff-b51b-eb2d0e876e1f.jpeg",
    "url": "https://www.arte.tv/films/planetarium"
  },
  {
    "titre": "Les Poings dans les poches",
    "annee": "1965",
    "duree": "1H45",
    "note": "4.6666665/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/05/d7/05d7e1a5-0bf2-46a0-985e-ca3177cfad3a.jpg",
    "url": "https://www.arte.tv/films/les-poings-dans-les-poches"
  },
  {
    "titre": "Le Monde de Nathan",
    "annee": "2014",
    "duree": "1H51",
    "note": "Non noté",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/a4/cb/a4cb76ee-879b-4b77-b8e1-d5fc7c80cf3a.jpg",
    "url": "https://www.arte.tv/films/le-monde-de-nathan"
  },
  {
    "titre": "Les Merveilles",
    "annee": "2013",
    "duree": "2H01",
    "note": "4.875/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/9c/2b/9c2bb6aa-fcd8-413c-a35b-a18316d9c4d3.jpg",
    "url": "https://www.arte.tv/films/les-merveilles"
  },
  {
    "titre": "A 14 ans",
    "annee": "2014",
    "duree": "1H26",
    "note": "4/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/43/af/43af7021-0e8c-11e5-8fc8-55f289b77455.jpg",
    "url": "https://www.arte.tv/films/a-14-ans"
  },
  {
    "titre": "Ablations",
    "annee": "2013",
    "duree": "1H33",
    "note": "1.5/5",
    "qualite": "SD,HD, âge limite : 10 ans",
    "image": "https://medias.mednum.lab.arte.tv/images/510/0b/33/0b33a16e-e528-4d2a-b512-7b45869d832a.jpg",
    "url": "https://www.arte.tv/films/ablations"
  },
  {
    "titre": "La Vie domestique",
    "annee": "2012",
    "duree": "1H33",
    "note": "3.5/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/af/43/af431fba-6408-11e3-8c78-39dc9f60925e.jpg",
    "url": "https://www.arte.tv/films/la-vie-domestique"
  },
  {
    "titre": "Grand Central",
    "annee": "2013",
    "duree": "1H35",
    "note": "4.5/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/f9/eb/f9eb274f-7cff-11e3-b387-dd1e584d1483.jpg",
    "url": "https://www.arte.tv/films/grand-central"
  },
  {
    "titre": "Les Coquillettes",
    "annee": "2011",
    "duree": "1H16",
    "note": "4/5",
    "qualite": "SD,HD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/29/6d/296df81e-edfd-11e2-bf4d-7b0285074078.jpg",
    "url": "https://www.arte.tv/films/les-coquillettes"
  },
  {
    "titre": "Somers Town",
    "annee": "2008",
    "duree": "1H11",
    "note": "4.5/5",
    "qualite": "SD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/39/98/3998256e-f8b1-11e4-98d9-23d49b954970.jpg",
    "url": "https://www.arte.tv/films/somers-town"
  },
  {
    "titre": "Louise-Michel",
    "annee": "2007",
    "duree": "1H31",
    "note": "4.1/5",
    "qualite": "SD",
    "image": "https://medias.mednum.lab.arte.tv/images/510/44/1d/441dbeb9-3d91-4915-936d-4020ff6118ea.jpg",
    "url": "https://www.arte.tv/films/louise-michel"
  },
  {
    "titre": "Bullhead",
    "annee": "2010",
    "duree": "2H09",
    "note": "Non noté",
    "qualite": "SD,HD, âge limite : 12 ans",
    "image": "https://medias.mednum.lab.arte.tv/images/510/87/35/873508ae-d4de-11e1-8869-01323b884589.png",
    "url": "https://www.arte.tv/films/bullhead"
  },
  {
    "titre": "De l’autre côté du ciel  ",
    "annee": "2020",
    "duree": "1H40",
    "note": "5/5",
    "qualite": "SD,HD",
    "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/f7/9e/f79ed70f-fdde-4b0f-89ec-620791d2a807.png?width=510",
    "url": "https://www.arte.tv/films/de-lautre-cote-du-ciel-0"
  }
];

  // 2. L'URL de base du SSO
  const ssoBaseURL = "https://bibliotheques.agglopolys.fr/EXPLOITATION/Default/Ermes/ASSARedirect.ashx?url=https%3a%2f%2fportal.mediatheque-numerique.com%2fsso_login%3freturn_url%3dhttps%3a%2f%2fvod.mediatheque-numerique.com%2ffilms%2f";

  // 3. Fonction pour générer une carte film
  function createMovieCard(movie) {
    const slug = movie.url.split('/').pop();
    const watchLink = ssoBaseURL + slug;
    const imgSrc = movie.image && movie.image.trim() !== '' ? movie.image : '';
    const placeholderStyle = imgSrc === '' ? 'display:flex;' : 'display:none;';

    return `
      <div class="movie-card-2026" data-title="${movie.titre.toLowerCase()}">
        <a href="${watchLink}" class="movie-card-inner" target="_blank" title="Regarder ${movie.titre}">
          <div class="poster-box-2026">
            <span class="badge-illimite">Illimité</span>
            ${imgSrc !== '' ? `<img src="${imgSrc}" class="poster-img-2026" alt="${movie.titre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
            <div class="poster-placeholder-2026" style="${placeholderStyle}"><span>${movie.titre}</span></div>
          </div>
          <div class="card-infos-2026">
            <div class="card-title-2026">${movie.titre}</div>
            <div class="card-meta-2026">${movie.annee} • ${movie.duree}</div>
            <button class="btn-play-2026">▶ Regarder</button>
          </div>
        </a>
      </div>
    `;
  }

  // 4. Affichage des films
  const moviesGrid = document.getElementById('moviesGrid');
  
  // Sécurité : on vérifie que l'élément existe bien sur la page avant de remplir le HTML
  if (moviesGrid) {
    let htmlContent = moviesData.map(createMovieCard).join('');
    moviesGrid.innerHTML = htmlContent;
  }

  // 5. Fonction de recherche
  const searchInput = document.getElementById('movieSearch');
  
  // Sécurité : on vérifie que la barre de recherche existe avant d'y attacher un événement
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.movie-card-2026');
      
      cards.forEach(card => {
        const title = card.getAttribute('data-title');
        if (title.includes(searchTerm)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

}); // Fin du DOMContentLoaded
