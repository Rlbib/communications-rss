// On attend que le corps de la page principale soit chargé
document.addEventListener("DOMContentLoaded", function() {
    
    // On crée un "observateur" qui surveille l'apparition d'éléments dans la page
    const observer = new MutationObserver(function(mutationsList, observer) {
        // On cherche l'élément par son ID, ou par sa classe au cas où le CMS aurait modifié l'ID
        const moviesGrid = document.getElementById('moviesGrid') || document.querySelector('.vod-slider');
        
        // Si l'élément existe enfin dans la page
        if (moviesGrid) {
            // On arrête de surveiller (pour ne pas boucler infiniment)
            observer.disconnect();
            
            // ==========================================
            // TON CODE DE GENERATION DES FILMS
            // ==========================================
            
            // 1. TON JSON COMPLET
            const moviesData = [
              {
                "titre": "So Long, My Son",
                "annee": "2019",
                "duree": "3H05",
                "image": "https://medias.mednum.lab.arte.tv/images/510/c0/8d/c08dcc30-b86c-4fc5-8ebf-bf7934179699.jpg",
                "url": "https://www.arte.tv/films/so-long-my-son"
              },
              {
                "titre": "Le Prix du succès",
                "annee": "2016",
                "duree": "1H32",
                "image": "https://mediasarte.mednum.lab.arte.tv/mednum/prod/medias/thumbs/5a/54/5a54a2e96f55d.jpeg?width=510",
                "url": "https://www.arte.tv/films/le-prix-du-succes"
              },
              {
                "titre": "'71",
                "annee": "2013",
                "duree": "1H39",
                "image": "https://medias.mednum.lab.arte.tv/images/510/2d/99/2d99712e-6c24-11e4-9b63-3d3c777362b5.jpg",
                "url": "https://www.arte.tv/films/71"
              }
              // ... RAJOUTE LES 47 AUTRES FILMS ICI ...
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

            // 4. Affichage des films (L'élément est garanti d'exister ici)
            let htmlContent = moviesData.map(createMovieCard).join('');
            moviesGrid.innerHTML = htmlContent;

            // 5. Fonction de recherche
            const searchInput = document.getElementById('movieSearch') || document.querySelector('.vod-search-input');
            
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
            
            // ==========================================
            // FIN DU CODE
            // ==========================================
        }
    });

    // On demande à l'observateur de surveiller l'ensemble du document 
    // et ses sous-éléments (au cas où le CMS les injecte en profondeur)
    observer.observe(document.body, { childList: true, subtree: true });

});
