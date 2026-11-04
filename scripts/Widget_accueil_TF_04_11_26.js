// ========================================================================
// 🎛️ PANNEAU DE PILOTAGE FACILE (ZONE MODIFIABLE PAR L'ÉQUIPE)
// ========================================================================
const PILOTAGE = {
    // 1. Événement à placer en 1ère position "À la une" (mettre l'ID, ou 0 pour désactiver)
    CARTE_A_LA_UNE_ID: 468, // Expo Lina

    // 2. Afficher la carte récapitulative des expos vers la fin du carrousel ? (true / false)
    CARTE_EXPOS_ACTIVE: true,

    // 3. Boutons événementiels personnalisés dans les filtres
    BOUTONS_SPECIAUX: [
        {
            titre: "Mois du Doc",
            icone: "fa-film",
            couleur: "#e07548", // Orange Mois du Doc
            ids: [390, 409, 410, 391, 394, 392, 452, 411, 466, 464]
        }
    ]
};
// ========================================================================

function initWidgetTempsForts() {
    const FEATURED_HASHTAGS = ["Atelier", "Exposition", "Club", "Conférence", "Lecture Spectacle"];
    const MAX_CARDS_DISPLAYED = 15;
    const MAIN_AGENDA_URL = "https://bibliotheques.agglopolys.fr/EXPLOITATION/agenda2026.aspx";
    const JSON_URL = "https://rlbib.github.io/communications-rss/agenda.json";

    const grid = document.getElementById('hb-widget-grid');
    if (!grid) return;

    const hashtagsWrapper = document.getElementById('hb-hashtags');
    const ctaBtn = document.getElementById('hb-cta-btn');
    const scrollLeftBtn = document.getElementById('hb-scroll-left');
    const scrollRightBtn = document.getElementById('hb-scroll-right');

    const modalOverlay = document.getElementById('hb-modal-overlay');
    const modalClose = document.getElementById('hb-modal-close');
    const modalHero = document.getElementById('hb-modal-hero');
    const modalImg = document.getElementById('hb-modal-img');
    const modalBodyContent = document.getElementById('hb-modal-body-content');

    let allEvents = [];
    let activeCategory = 'all';

    const dFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    function buildLocalDate(dateStr, heureStr) {
        if (!dateStr) return null;
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            let hours = 0, minutes = 0;
            if (heureStr) {
                const match = heureStr.match(/(\d{1,2})[h:](\d{2})?/i);
                if (match) { hours = parseInt(match[1], 10); minutes = match[2] ? parseInt(match[2], 10) : 0; }
            }
            return new Date(year, month, day, hours, minutes, 0, 0);
        }
        return new Date(dateStr);
    }

    function formatTime(date) {
        if (!date || isNaN(date.getTime())) return "";
        const hours = date.getHours();
        const minutes = date.getMinutes();
        if (hours === 0 && minutes === 0) return "";
        return minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`;
    }

    function formatEventDates(startDate, endDate, category) {
        let formattedStart = dFormatter.format(startDate);
        formattedStart = formattedStart.charAt(0).toUpperCase() + formattedStart.slice(1);
        const isExpo = category && (category.toLowerCase().trim() === 'exposition' || category.toLowerCase().trim() === 'expositions');
        if (isExpo && endDate && !isNaN(endDate.getTime())) {
            let formattedEnd = dFormatter.format(endDate);
            formattedEnd = formattedEnd.charAt(0).toUpperCase() + formattedEnd.slice(1);
            if (startDate.getFullYear() === endDate.getFullYear()) {
                const startNoYear = formattedStart.replace(new RegExp('\\s+' + startDate.getFullYear() + '$'), '');
                return "Du " + startNoYear + " au " + formattedEnd;
            }
            return "Du " + formattedStart + " au " + formattedEnd;
        }
        const timeStr = formatTime(startDate);
        return "Le " + formattedStart + (timeStr ? ` <span class="hb-time-highlight"><i class="fa fa-clock-o"></i> ${timeStr}</span>` : "");
    }

    // Pastilles dynamiques temporelles
    function getRelativeDateBadge(event, nowLocal, todayStart) {
        if (!event.date || isNaN(event.date.getTime())) return '';
        const isExpo = event.category && event.category.toLowerCase().includes('exposition');
        if (isExpo && event.date <= nowLocal && event.endDate >= nowLocal) {
            return `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-calendar-check-o"></i> En cours</span>`;
        }
        const eventDateOnly = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), 0, 0, 0, 0);
        const diffDays = Math.round((eventDateOnly - todayStart) / 86400000);

        if (diffDays === 0) {
            return `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #ffebeb; color: #e11d48; border: 1px solid #fecdd3;"><i class="fa fa-clock-o"></i> Aujourd'hui</span>`;
        } else if (diffDays === 1) {
            return `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #fff7ed; color: #ea580c; border: 1px solid #ffedd5;"><i class="fa fa-calendar-o"></i> Demain</span>`;
        } else if (diffDays > 1 && diffDays <= 30) {
            return `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-hourglass-start"></i> Dans ${diffDays} j.</span>`;
        }
        return '';
    }

    function getGroupedLocation(locStr) {
        if (!locStr) return "Médiathèque";
        return locStr.split(',')[0].trim();
    }

    function isSummerPeriod() {
        const now = new Date();
        const m = now.getMonth();
        const d = now.getDate();
        if (m < 5 || (m === 5 && d < 23) || m > 7 || (m === 7 && d > 29)) return false;
        return true;
    }

    function isExceptionallyClosed(libType) {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const d = now.getDate();
        if (y !== 2026) return false;
        if (libType === "gregoire" && m === 7 && d >= 11 && d <= 15) return true;
        if (libType === "genevoix" && m === 7 && d >= 15 && d <= 22) return true;
        if (libType === "valland" && m === 7 && d >= 11 && d <= 22) return true;
        return false;
    }

    function getLiveStatusBadge(libType) {
        const now = new Date();
        const day = now.getDay();
        const time = now.getHours() + (now.getMinutes() / 60);
        let isOpen = false;

        if (isExceptionallyClosed(libType)) {
            return `<span class="hb-status-badge hb-status-exception"><i class="fa fa-exclamation-triangle"></i> Fermé (été)</span>`;
        }

        if (isSummerPeriod()) {
            if (libType === "gregoire" && day >= 2 && day <= 6) isOpen = (time >= 10 && time < 15.5);
            else if (libType === "genevoix" && day >= 2 && day <= 6) isOpen = ((time >= 10 && time < 12.5) || (time >= 13.5 && time < 15.5));
            else if (libType === "valland" && day >= 3 && day <= 6) isOpen = (time >= 10 && time < 13);
        } else {
            if (libType === "gregoire") {
                if (day === 2 || day === 4 || day === 5) isOpen = (time >= 13 && time < 18.5);
                else if (day === 3) isOpen = (time >= 10 && time < 18.5);
                else if (day === 6) isOpen = (time >= 10 && time < 18);
            } else if (libType === "genevoix") {
                if (day === 2 || day === 4 || day === 5) isOpen = (time >= 15 && time < 18);
                else if (day === 3 || day === 6) isOpen = ((time >= 10 && time < 13) || (time >= 14 && time < 18));
            } else if (libType === "valland") {
                if (day === 3) isOpen = ((time >= 10 && time < 13) || (time >= 14 && time < 18.5));
                else if (day === 4 || day === 5) isOpen = (time >= 15 && time < 18.5);
                else if (day === 6) isOpen = ((time >= 10 && time < 13) || (time >= 14 && time < 18));
            }
        }
        return isOpen 
            ? `<span class="hb-status-badge hb-status-open"><i class="fa fa-circle" style="font-size:7px;"></i> Ouvert</span>`
            : `<span class="hb-status-badge hb-status-closed"><i class="fa fa-circle" style="font-size:7px;"></i> Fermé</span>`;
    }

    // Contact complet avec horaires d'été et fermetures restaurés
    function getLibraryContactInfo(locationStr) {
        const loc = (locationStr || "").toLowerCase();
        let libType = "gregoire";

        const hoursGregoire    = "<strong>Mar, Jeu, Ven :</strong> 13h – 18h30<br><strong>Mercredi :</strong> 10h – 18h30<br><strong>Samedi :</strong> 10h – 18h";
        const hoursGenevoix    = "<strong>Mar, Jeu, Ven :</strong> 15h – 18h<br><strong>Mercredi & Samedi :</strong> 10h – 13h / 14h – 18h";
        const hoursValland     = "<strong>Mercredi :</strong> 10h – 13h / 14h – 18h30<br><strong>Jeu & Ven :</strong> 15h – 18h30<br><strong>Samedi :</strong> 10h – 13h / 14h – 18h";

        const summerHoursGregoire = "<span class=\"hb-summer-label\">Horaires d'été</span><br><strong>Mardi – Samedi :</strong> 10h – 15h30";
        const summerHoursGenevoix = "<span class=\"hb-summer-label\">Horaires d'été</span><br><strong>Mardi – Samedi :</strong> 10h – 12h30 / 13h30 – 15h30";
        const summerHoursValland  = "<span class=\"hb-summer-label\">Horaires d'été</span><br><strong>Mercredi – Samedi :</strong> 10h – 13h";

        const exceptionGregoire = "<div class=\"hb-summer-exception-note\"><i class=\"fa fa-exclamation-triangle\"></i><span><strong>Fermeture exceptionnelle du 11 au 15 août 2026.</strong></span></div>";
        const exceptionGenevoix = "<div class=\"hb-summer-exception-note\"><i class=\"fa fa-exclamation-triangle\"></i><span><strong>Fermeture exceptionnelle du 15 au 22 août 2026.</strong></span></div>";
        const exceptionValland  = "<div class=\"hb-summer-exception-note\"><i class=\"fa fa-exclamation-triangle\"></i><span><strong>Fermeture exceptionnelle du 11 au 22 août 2026.</strong></span></div>";

        if (loc.includes("genevoix")) libType = "genevoix";
        else if (loc.includes("valland") || loc.includes("veuzain")) libType = "valland";

        let name, phone, hours;
        if (libType === "gregoire") {
            name  = "Bibliothèque Abbé-Grégoire";
            phone = "02 54 56 27 40";
            hours = isSummerPeriod() ? summerHoursGregoire + exceptionGregoire : hoursGregoire;
        } else if (libType === "genevoix") {
            name  = "Médiathèque Maurice-Genevoix";
            phone = "02 54 43 31 13";
            hours = isSummerPeriod() ? summerHoursGenevoix + exceptionGenevoix : hoursGenevoix;
        } else {
            name  = "Médiathèque Rose-Valland";
            phone = "02 54 20 78 00";
            hours = isSummerPeriod() ? summerHoursValland + exceptionValland : hoursValland;
        }

        return { name, phone, hours, badge: getLiveStatusBadge(libType) };
    }

    async function loadAgendaData() {
        let success = false;
        let data = [];
        try {
            const res = await fetch(`${JSON_URL}?t=${new Date().getTime()}`);
            if (res.ok) {
                data = await res.json();
                success = true;
            }
        } catch (e) {}

        if (!success) {
            try {
                const resProxy = await fetch(`https://corsproxy.io/?${encodeURIComponent(JSON_URL)}`);
                if (resProxy.ok) {
                    data = await resProxy.json();
                    success = true;
                }
            } catch (err) {}
        }

        if (!success) {
            grid.innerHTML = `<div style="text-align:center; padding:30px; color:#ef4444;">Échec de synchronisation.</div>`;
            return;
        }

        allEvents = data;
        buildHashtags();
        renderWidget();
    }

    function buildHashtags() {
        if (!hashtagsWrapper) return;
        hashtagsWrapper.innerHTML = '';
        const todayStr = new Date().toISOString().split('T')[0];

        const allBtn = document.createElement('button');
        allBtn.className = 'hb-hashtag-btn' + (activeCategory === 'all' ? ' hb-active' : '');
        allBtn.dataset.cat = 'all';
        allBtn.textContent = '# Tout';
        hashtagsWrapper.appendChild(allBtn);

        const liveExpos = allEvents.filter(item => {
            const cat = (item.Catégorie || item.Categorie || '').toLowerCase();
            return cat.includes('exposition') && (!item.Date_Fin || item.Date_Fin >= todayStr);
        });

        FEATURED_HASHTAGS.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'hb-hashtag-btn' + (activeCategory === cat ? ' hb-active' : '');
            btn.dataset.cat = cat;
            if (cat.toLowerCase() === 'exposition') {
                btn.innerHTML = `# ${cat} <span class="hb-counter-pill">${liveExpos.length}</span>`;
            } else {
                btn.textContent = `# ${cat}`;
            }
            hashtagsWrapper.appendChild(btn);
        });

        (PILOTAGE.BOUTONS_SPECIAUX || []).forEach(spe => {
            const count = allEvents.filter(ev => spe.ids.includes(parseInt(ev.id, 10))).length;
            const speBtn = document.createElement('button');
            speBtn.className = 'hb-hashtag-btn hb-btn-special-custom';
            speBtn.style.backgroundColor = spe.couleur || '#111827';
            speBtn.style.borderColor = spe.couleur || '#111827';
            speBtn.innerHTML = `<i class="fa ${spe.icone}"></i> ${spe.titre} <span class="hb-special-pill-count">${count}</span>`;
            speBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openSpecialModal(spe);
            });
            hashtagsWrapper.appendChild(speBtn);
        });

        hashtagsWrapper.addEventListener('click', (e) => {
            const btn = e.target.closest('.hb-hashtag-btn');
            if (btn && !btn.classList.contains('hb-btn-special-custom')) {
                document.querySelectorAll('.hb-hashtag-btn').forEach(b => b.classList.remove('hb-active'));
                btn.classList.add('hb-active');
                activeCategory = btn.dataset.cat;
                renderWidget();
            }
        });
    }

    function renderWidget() {
        if (!grid) return;
        grid.innerHTML = '';
        const today = new Date();
        const nowLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

        let events = allEvents.map((item, index) => {
            const startDate = buildLocalDate(item.Date_Debut, item.Heure);
            const endDate = item.Date_Fin ? buildLocalDate(item.Date_Fin, "18h") : startDate;
            const itemCat = item.Catégorie || item.Categorie || "Animation";
            return {
                id: item.id || index,
                rawItem: item,
                title: item.Titre || "Sans titre",
                link: item.Lien || MAIN_AGENDA_URL,
                date: startDate,
                endDate: endDate,
                category: itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim(),
                location: item.Localisation || "Médiathèque",
                description: item.Description || "",
                imageUrl: item.URL_de_l_image ? item.URL_de_l_image.replace(/^http:\/\//i, 'https://') : null,
                highlight: (String(item.A_la_Une || '').toUpperCase() === "TRUE" || String(item.Selection || '').toUpperCase() === "TRUE"),
                reservation: item.Reservation === "TRUE"
            };
        }).filter(ev => {
            if (!ev.date || isNaN(ev.date.getTime())) return false;
            const isExpo = ev.category.toLowerCase().includes('exposition');
            if (isExpo) {
                const validEndDate = (ev.endDate && !isNaN(ev.endDate.getTime())) ? ev.endDate : ev.date;
                return validEndDate >= nowLocal;
            }
            return new Date(ev.date.getTime() + (60 * 60 * 1000)) >= nowLocal;
        });

        if (ctaBtn) ctaBtn.innerHTML = `Voir nos ${events.length} animations <i class="fa fa-chevron-right"></i>`;

        if (activeCategory === 'all') {
            // CARTE SPOTLIGHT (À LA UNE)
            let spotlightId = parseInt(PILOTAGE.CARTE_A_LA_UNE_ID, 10);
            if (!spotlightId) {
                const autoHigh = events.find(ev => ev.highlight);
                if (autoHigh) spotlightId = parseInt(autoHigh.id, 10);
            }

            if (spotlightId) {
                const spotItem = allEvents.find(it => parseInt(it.id, 10) === spotlightId);
                if (spotItem) {
                    const sStart = buildLocalDate(spotItem.Date_Debut, spotItem.Heure);
                    const sEnd = spotItem.Date_Fin ? buildLocalDate(spotItem.Date_Fin, "18h") : sStart;
                    const sDates = formatEventDates(sStart, sEnd, spotItem.Catégorie || 'Exposition');
                    const sImg = spotItem.URL_de_l_image ? spotItem.URL_de_l_image.replace(/^http:\/\//i, 'https://') : '';
                    const spotEventMock = { date: sStart, endDate: sEnd, category: spotItem.Catégorie || 'Exposition' };
                    const spotRelativeHtml = getRelativeDateBadge(spotEventMock, nowLocal, todayStart);

                    grid.insertAdjacentHTML('beforeend', `
                        <div class="agenda-card hb-card-featured-spotlight" data-id="${spotItem.id}">
                            <span class="hb-tag-spotlight"><i class="fa fa-paint-brush"></i> ${spotItem.Catégorie || 'Événement'}</span>
                            <span class="hb-star-spotlight"><i class="fa fa-star"></i> À la une</span>
                            <div class="hb-image-wrapper">
                                ${sImg ? `<img class="agenda-card-image" src="${sImg}" alt="" />` : '<i class="fa fa-calendar hb-fallback-icon"></i>'}
                            </div>
                            <div class="agenda-card-details">
                                <div class="title-wrapper"><h3 class="agenda-card-title-simple">${spotItem.Titre || ''}</h3></div>
                                <div class="hb-card-meta-inline">
                                    ${spotRelativeHtml}
                                    <span class="hb-meta-pill hb-pill-free"><i class="fa fa-check"></i> Entrée libre</span>
                                </div>
                                <div class="agenda-card-dateloc-block">
                                    <hr class="agenda-card-separator-custom" style="background-color:var(--hb-spotlight);" />
                                    <p class="agenda-card-date">${sDates}</p>
                                    <p class="agenda-card-location">${getGroupedLocation(spotItem.Localisation)}</p>
                                </div>
                            </div>
                        </div>
                    `);
                }
            }

            // Filtrage des expositions classiques pour ne pas surcharger le carrousel
            events = events.filter(ev => !ev.category.toLowerCase().includes('exposition') && parseInt(ev.id, 10) !== spotlightId);
            events.sort((a, b) => a.date - b.date);

            // Rendu des animations avec pastilles temporelles et badges
            events.slice(0, MAX_CARDS_DISPLAYED).forEach(ev => renderSingleCard(ev, nowLocal, todayStart));

            // CARTE RÉCAPITULATIF DES EXPOSITIONS
            if (PILOTAGE.CARTE_EXPOS_ACTIVE) {
                const todayStr = new Date().toISOString().split('T')[0];
                const activeExpos = allEvents.filter(it => {
                    const cat = (it.Catégorie || it.Categorie || '').toLowerCase();
                    return cat.includes('exposition') && (!it.Date_Fin || it.Date_Fin >= todayStr);
                });

                if (activeExpos.length > 0) {
                    const featuredImg = activeExpos[0].URL_de_l_image ? activeExpos[0].URL_de_l_image.replace(/^http:\/\//i, 'https://') : '';
                    grid.insertAdjacentHTML('beforeend', `
                        <div class="agenda-card hb-card-smart-expo" id="btn-open-expo-modal">
                            <span class="hb-expo-tag-badge"><i class="fa fa-paint-brush"></i> Expositions</span>
                            <span class="hb-expo-count-badge-top">${activeExpos.length} à l'affiche</span>
                            <div class="hb-image-wrapper">
                                ${featuredImg ? `<img class="agenda-card-image" src="${featuredImg}" alt="" />` : '<i class="fa fa-paint-brush hb-fallback-icon"></i>'}
                            </div>
                            <div class="agenda-card-details">
                                <div class="title-wrapper"><h3 class="agenda-card-title-simple">Les Expositions du moment</h3></div>
                                <p style="font-size:12px; color:#4b5563; margin:0 0 10px 0;">Découvrez toutes les expositions actuellement présentées.</p>
                                <button type="button" class="hb-btn-smart-expo-action">
                                    Découvrir les expos (${activeExpos.length}) &rarr;
                                </button>
                            </div>
                        </div>
                    `);
                }
            }

            // CARTE VOIR PLUS
            grid.insertAdjacentHTML('beforeend', `
                <a class="agenda-card hb-more-cta-card" href="${MAIN_AGENDA_URL}">
                    <div class="hb-more-cta-icon-wrapper"><i class="fa fa-arrow-right"></i></div>
                    <h3 class="hb-more-cta-title">Voir plus</h3>
                    <p class="hb-more-cta-desc">Consulter tout l'agenda de vos bibliothèques</p>
                </a>
            `);

        } else {
            // Vues filtrées par hashtag
            events = events.filter(ev => ev.category.toLowerCase().trim() === activeCategory.toLowerCase().trim());
            events.sort((a, b) => a.date - b.date);
            events.slice(0, MAX_CARDS_DISPLAYED).forEach(ev => renderSingleCard(ev, nowLocal, todayStart));

            grid.insertAdjacentHTML('beforeend', `
                <a class="agenda-card hb-more-cta-card" href="${MAIN_AGENDA_URL}">
                    <div class="hb-more-cta-icon-wrapper"><i class="fa fa-arrow-right"></i></div>
                    <h3 class="hb-more-cta-title">Voir plus</h3>
                </a>
            `);
        }

        const btnExpo = document.getElementById('btn-open-expo-modal');
        if (btnExpo) btnExpo.addEventListener('click', openExposModal);

        grid.scrollLeft = 0;
        setTimeout(updateScrollButtonsVisibility, 100);
    }

    // CARTE NORMALE : RESTAURATION DE L'ÉTOILE ET BORDURE SI "A LA UNE"
    function renderSingleCard(event, nowLocal, todayStart) {
        const dateText = formatEventDates(event.date, event.endDate, event.category);
        const relativeDateHtml = getRelativeDateBadge(event, nowLocal, todayStart);

        const isEventComplet = event.title.toLowerCase().includes('[complet]');
        let resHtml = isEventComplet
            ? `<span class="hb-meta-pill" style="background:#fee2e2; color:#991b1b;"><i class="fa fa-times-circle"></i> Complet</span>`
            : (event.reservation
                ? `<span class="hb-meta-pill hb-pill-reservation"><i class="fa fa-ticket"></i> Inscription</span>`
                : `<span class="hb-meta-pill hb-pill-free"><i class="fa fa-check"></i> Entrée libre</span>`);

        grid.insertAdjacentHTML('beforeend', `
            <div class="agenda-card format-tempsFortsPortail ${event.highlight ? 'hb-highlighted' : ''}" data-id="${event.id}">
                <span class="agenda-card-tag">${event.category}</span>
                ${event.highlight ? `<span class="hb-card-star"><i class="fa fa-star"></i> À la une</span>` : ''}
                <div class="hb-image-wrapper">
                    ${event.imageUrl ? `<img class="agenda-card-image" src="${event.imageUrl}" alt="${event.title}" />` : '<i class="fa fa-calendar hb-fallback-icon"></i>'}
                </div>
                <div class="agenda-card-details">
                    <div class="title-wrapper"><h3 class="agenda-card-title-simple">${event.title}</h3></div>
                    <div class="hb-card-meta-inline">${relativeDateHtml} ${resHtml}</div>
                    <div class="agenda-card-dateloc-block">
                        <hr class="agenda-card-separator-custom" />
                        <p class="agenda-card-date">${dateText}</p>
                        <p class="agenda-card-location">${getGroupedLocation(event.location)}</p>
                    </div>
                </div>
            </div>
        `);
    }

    function updateScrollButtonsVisibility() {
        if (!grid || !scrollLeftBtn || !scrollRightBtn) return;
        scrollLeftBtn.classList.toggle('hb-disabled', grid.scrollLeft <= 5);
        scrollRightBtn.classList.toggle('hb-disabled', grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 5);
    }

    if (scrollLeftBtn) scrollLeftBtn.addEventListener('click', () => grid.scrollBy({ left: -315, behavior: 'smooth' }));
    if (scrollRightBtn) scrollRightBtn.addEventListener('click', () => grid.scrollBy({ left: 315, behavior: 'smooth' }));
    if (grid) grid.addEventListener('scroll', updateScrollButtonsVisibility);

    function openSpecialModal(spe) {
        const eventsList = allEvents.filter(it => spe.ids.includes(parseInt(it.id, 10)));
        const venueGroups = {};

        eventsList.forEach(it => {
            const loc = getGroupedLocation(it.Localisation);
            if (!venueGroups[loc]) venueGroups[loc] = [];
            venueGroups[loc].push(it);
        });

        modalHero.style.display = 'none';

        let bodyHtml = `
            <div style="display:flex; align-items:center; gap:12px; border-bottom:3px solid ${spe.couleur}; padding-bottom:12px; margin-bottom:16px;">
                <div style="width:42px; height:42px; border-radius:50%; background:${spe.couleur}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px;">
                    <i class="fa ${spe.icone}"></i>
                </div>
                <div>
                    <h3 style="margin:0; font-size:18px; font-weight:800; text-transform:uppercase;">${spe.titre}</h3>
                    <p style="margin:2px 0 0 0; font-size:12px; color:#6b7280;">${eventsList.length} rendez-vous programmés</p>
                </div>
            </div>
        `;

        Object.keys(venueGroups).sort().forEach(locName => {
            const items = venueGroups[locName];
            items.sort((a, b) => buildLocalDate(a.Date_Debut, a.Heure) - buildLocalDate(b.Date_Debut, b.Heure));

            bodyHtml += `
                <div class="hb-modal-venue-section">
                    <div class="hb-modal-venue-title">
                        <span><i class="fa fa-map-marker" style="color:${spe.couleur};"></i> ${locName}</span>
                        <span style="font-size:11px; background:#f3f4f6; padding:2px 8px; border-radius:10px;">${items.length} date${items.length > 1 ? 's' : ''}</span>
                    </div>
                    ${items.map(ev => {
                        const start = buildLocalDate(ev.Date_Debut, ev.Heure);
                        const dStr = dFormatter.format(start);
                        const img = ev.URL_de_l_image ? ev.URL_de_l_image.replace(/^http:\/\//i, 'https://') : '';
                        return `
                            <div class="hb-doc-item-row" style="border-left:4px solid ${spe.couleur};">
                                ${img ? `<img class="hb-doc-item-thumb" src="${img}" alt="" />` : ''}
                                <div class="hb-doc-item-content">
                                    <h4>${ev.Titre || ''}</h4>
                                    <div class="hb-doc-item-meta">
                                        <span><i class="fa fa-calendar" style="color:${spe.couleur};"></i> ${dStr}</span>
                                        ${ev.Heure ? `<span><i class="fa fa-clock-o"></i> ${ev.Heure}</span>` : ''}
                                    </div>
                                </div>
                                <button type="button" class="hb-btn-modal-doc" style="background:${spe.couleur};" onclick="openDetailsModal(${ev.id})">
                                    Détails &rarr;
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        });

        modalBodyContent.innerHTML = bodyHtml;
        modalOverlay.classList.add('hb-active');
    }

    function openExposModal() {
        const todayStr = new Date().toISOString().split('T')[0];
        const expos = allEvents.filter(it => {
            const cat = (it.Catégorie || it.Categorie || '').toLowerCase();
            return cat.includes('exposition') && (!it.Date_Fin || it.Date_Fin >= todayStr);
        });

        modalHero.style.display = 'none';

        modalBodyContent.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; border-bottom:3px solid var(--hb-accent); padding-bottom:12px; margin-bottom:16px;">
                <div style="width:42px; height:42px; border-radius:50%; background:var(--hb-accent); color:#111; display:flex; align-items:center; justify-content:center; font-size:18px;">
                    <i class="fa fa-paint-brush"></i>
                </div>
                <div>
                    <h3 style="margin:0; font-size:18px; font-weight:800; text-transform:uppercase;">Expositions à l'affiche</h3>
                    <p style="margin:2px 0 0 0; font-size:12px; color:#6b7280;">${expos.length} expositions dans vos médiathèques</p>
                </div>
            </div>
            ${expos.map(exp => {
                const start = buildLocalDate(exp.Date_Debut);
                const end = exp.Date_Fin ? buildLocalDate(exp.Date_Fin) : null;
                const dRange = formatEventDates(start, end, 'exposition');
                return `
                    <div class="hb-doc-item-row" style="border-left:4px solid var(--hb-accent);">
                        <div class="hb-doc-item-content">
                            <h4>${exp.Titre || 'Exposition'}</h4>
                            <div class="hb-doc-item-meta">
                                <span style="color:#b45309; font-weight:bold;"><i class="fa fa-calendar"></i> ${dRange}</span>
                                <span><i class="fa fa-map-marker"></i> ${getGroupedLocation(exp.Localisation)}</span>
                            </div>
                        </div>
                        <button type="button" class="hb-btn-modal-doc" style="background:var(--hb-accent); color:#111 !important;" onclick="openDetailsModal(${exp.id})">
                            Découvrir &rarr;
                        </button>
                    </div>
                `;
            }).join('')}
        `;
        modalOverlay.classList.add('hb-active');
    }

    // MODALE DÉTAILS AVEC TOUS LES CHAMPS RESTAURÉS
    window.openDetailsModal = function(eventId) {
        const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId);
        if (!rawEvent) return;

        const startDate = buildLocalDate(rawEvent.Date_Debut, rawEvent.Heure);
        const endDate = rawEvent.Date_Fin ? buildLocalDate(rawEvent.Date_Fin, "18h") : startDate;
        const cleanCat = (rawEvent.Catégorie || rawEvent.Categorie || "Animation");
        const dateText = formatEventDates(startDate, endDate, cleanCat);
        const plainDateText = dateText.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();

        // Récupération restaurée du public cible
        const publicCible = rawEvent.Public_cible || rawEvent.Public || rawEvent["Public cible"] || rawEvent["Public_Cible"] || "";

        const contact = getLibraryContactInfo(rawEvent.Localisation);
        const isComplet = (rawEvent.Titre || "").toLowerCase().includes('[complet]');

        if (rawEvent.URL_de_l_image && modalImg) {
            modalImg.src = rawEvent.URL_de_l_image.replace(/^http:\/\//i, 'https://');
            modalHero.style.display = 'block';
        } else {
            modalHero.style.display = 'none';
        }

        let reservationHtml = '';
        if (isComplet) {
            reservationHtml = `
                <div class="hb-resa-box" style="border-left-color: #dc2626; background:#fef2f2;">
                    <div class="hb-resa-title" style="color:#991b1b;"><i class="fa fa-ban" style="color:#dc2626; font-size:16px;"></i> Animation Complète</div>
                    <p style="margin:0; font-size:12.5px; color:#991b1b; font-weight:bold;">Cette animation est actuellement complète. Les réservations par e-mail sont closes.</p>
                    <p style="margin:6px 0 0 0; color:#4b5563; font-size:12px;">Pour toute demande de désistement, contactez l'équipe au <strong>${contact.phone}</strong>.</p>
                </div>
            `;
        } else if (rawEvent.Reservation === "TRUE") {
            // Formulaire restauré avec compteur de places et alerte d'erreur
            reservationHtml = `
                <div class="hb-resa-box">
                    <div class="hb-resa-title"><i class="fa fa-ticket" style="color:var(--hb-accent);"></i> Inscription Obligatoire</div>
                    <p class="hb-resa-subtitle" style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
                        <i class="fa fa-phone" style="color:var(--hb-muted);"></i> Appeler le <a href="tel:${contact.phone.replace(/\s/g, '')}" style="color:var(--hb-primary); font-weight:800; text-decoration:none; border-bottom:2px solid var(--hb-accent);">${contact.phone}</a> ${contact.badge}
                    </p>
                    <details class="hb-hours-details">
                        <summary class="hb-hours-summary"><i class="fa fa-info-circle"></i> Détail des horaires d'ouverture</summary>
                        <div class="hb-hours-content">${contact.hours}</div>
                    </details>
                    <hr style="border:0; height:1px; background:#e5e7eb; margin:15px 0;">
                    <p class="hb-resa-subtitle"><i class="fa fa-envelope-o" style="color:var(--hb-muted);"></i> Ou préparez votre e-mail de demande :</p>
                    <div class="hb-form-grid" id="resa-email-form">
                        <input type="text" id="r-nom" class="hb-input" placeholder="Votre Nom*" required>
                        <input type="text" id="r-prenom" class="hb-input" placeholder="Votre Prénom*" required>
                        <input type="tel" id="r-tel" class="hb-input hb-form-full" placeholder="Numéro de téléphone">
                        <input type="email" id="r-mail" class="hb-input" placeholder="Adresse E-mail">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <label for="r-places" style="font-size:13px; color:#4b5563;">Places :</label>
                            <input type="number" id="r-places" class="hb-input" style="width:70px;" min="1" value="1">
                        </div>
                        <input type="text" id="r-age" class="hb-input hb-form-full" placeholder="Âge de la ou des personnes inscrites*">
                        <button type="button" id="btn-generate-mail" class="hb-btn-submit hb-form-full">
                            Créer mon e-mail <i class="fa fa-paper-plane" style="margin-left:8px;"></i>
                        </button>
                    </div>
                    <div id="resa-error-msg" style="color:#991b1b; font-size:11.5px; margin-top:8px; font-weight:bold; display:none;">
                        <i class="fa fa-exclamation-circle"></i> Veuillez remplir au moins le Nom, le Prénom et l'Âge.
                    </div>
                </div>
            `;
        } else {
            reservationHtml = `
                <div style="background:#f0fdf4; color:#166534; padding:8px 12px; border-radius:4px; font-weight:bold; font-size:12px; margin-top:10px; border-left:4px solid #4ade80; text-transform:uppercase;">
                    <i class="fa fa-check"></i> Entrée libre (sans réservation)
                </div>
            `;
        }

        const shareUrl = encodeURIComponent(rawEvent.Lien || MAIN_AGENDA_URL);
        const shareTitle = encodeURIComponent(`À découvrir : ${rawEvent.Titre || "Animation"}`);
        const shareText = encodeURIComponent(`Découvrez cette animation dans vos médiathèques : ${rawEvent.Titre || "Animation"}`);

        modalBodyContent.innerHTML = `
            <span class="agenda-card-tag" style="position:static; display:inline-block; margin-bottom:12px;">${cleanCat}</span>
            <h3 class="hb-modal-title">${rawEvent.Titre || "Sans titre"}</h3>
            ${rawEvent.Description ? `<div class="hb-modal-desc">${rawEvent.Description}</div>` : ''}
            <div class="hb-modal-meta-list">
                <div class="hb-modal-meta-item"><i class="fa fa-map-marker"></i> <strong>Lieu :</strong> ${rawEvent.Localisation || "Médiathèque"}</div>
                <div class="hb-modal-meta-item"><i class="fa fa-calendar"></i> <strong>Date :</strong> ${dateText}</div>
                ${publicCible ? `<div class="hb-modal-meta-item"><i class="fa fa-users"></i> <strong>Public :</strong> ${publicCible}</div>` : ''}
                ${rawEvent.Heure ? `<div class="hb-modal-meta-item" style="background:#f3f4f6; padding:6px 12px; border-radius:4px; border-left:4px solid var(--hb-accent); margin-top:5px; font-weight:bold; color:var(--hb-primary);"><i class="fa fa-clock-o"></i> Horaires : ${rawEvent.Heure}</div>` : ''}
            </div>
            ${reservationHtml}
            <div class="hb-modal-actions">
                <button id="hb-modal-ics" class="hb-btn-action hb-btn-calendar"><i class="fa fa-calendar-plus-o"></i> Rappel Agenda</button>
                <button id="hb-modal-share" class="hb-btn-action hb-btn-share"><i class="fa fa-share-alt"></i> Partager</button>
                ${rawEvent.Lien ? `<a href="${rawEvent.Lien}" target="_blank" class="hb-btn-action" style="background:#f3f4f6; color:#111;">En savoir plus &rarr;</a>` : ''}
            </div>
            <div id="hb-share-panel" class="hb-share-panel" style="margin-top:10px;">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="hb-social-btn hb-fb"><i class="fa fa-facebook"></i></a>
                <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" class="hb-social-btn hb-wa"><i class="fa fa-whatsapp"></i></a>
                <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" class="hb-social-btn hb-tw"><i class="fa fa-twitter"></i></a>
                <a href="mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${shareUrl}" class="hb-social-btn hb-em"><i class="fa fa-envelope"></i></a>
                <button id="hb-btn-copy" class="hb-social-btn hb-cp" title="Copier le lien"><i class="fa fa-link"></i></button>
            </div>
        `;

        modalOverlay.classList.add('hb-active');

        // Partage
        const shareBtn = document.getElementById('hb-modal-share');
        const sharePanel = document.getElementById('hb-share-panel');
        if (shareBtn && sharePanel) {
            shareBtn.addEventListener('click', () => sharePanel.classList.toggle('hb-active'));
        }

        const copyBtn = document.getElementById('hb-btn-copy');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(rawEvent.Lien || MAIN_AGENDA_URL).then(() => {
                    copyBtn.innerHTML = '<i class="fa fa-check"></i>';
                    setTimeout(() => { copyBtn.innerHTML = '<i class="fa fa-link"></i>'; }, 2000);
                });
            });
        }

        // Formulaire mail avec validation restaurée
        const btnMail = document.getElementById('btn-generate-mail');
        if (btnMail) {
            btnMail.addEventListener('click', () => {
                const nom = document.getElementById('r-nom').value.trim();
                const prenom = document.getElementById('r-prenom').value.trim();
                const tel = document.getElementById('r-tel').value.trim();
                const mail = document.getElementById('r-mail').value.trim();
                const places = document.getElementById('r-places') ? document.getElementById('r-places').value : 1;
                const age = document.getElementById('r-age') ? document.getElementById('r-age').value.trim() : '';
                const errorMsg = document.getElementById('resa-error-msg');

                if (!nom || !prenom || !age) {
                    if (errorMsg) errorMsg.style.display = 'block';
                    return;
                }
                if (errorMsg) errorMsg.style.display = 'none';

                const subject = `Réservation : ${rawEvent.Titre} (${plainDateText})`;
                let body = `Bonjour,%0A%0AJe souhaite réserver ${places} place(s) pour l'animation "${rawEvent.Titre}" (${plainDateText}).%0A%0A`;
                body += `Mes coordonnées :%0A`;
                body += `Nom : ${nom}%0A`;
                body += `Prénom : ${prenom}%0A`;
                body += `Âge des personnes inscrites : ${age}%0A`;
                if (tel) body += `Téléphone : ${tel}%0A`;
                if (mail) body += `Email : ${mail}%0A`;
                body += `%0AMerci d'avance.`;

                window.location.href = `mailto:bibliotheques@agglopolys.fr?subject=${encodeURIComponent(subject)}&body=${body}`;
            });
        }

        // Export ICS
        const btnIcs = document.getElementById('hb-modal-ics');
        if (btnIcs) {
            btnIcs.addEventListener('click', () => generateICS(rawEvent));
        }
    };

    function generateICS(rawEvent) {
        const start = buildLocalDate(rawEvent.Date_Debut, rawEvent.Heure);
        const end = rawEvent.Date_Fin ? buildLocalDate(rawEvent.Date_Fin, rawEvent.Heure || "18h00") : new Date(start.getTime() + 3600000);
        const fDate = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

        const ics = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Agglopolys//FR', 'BEGIN:VEVENT',
            `DTSTART:${fDate(start)}`,
            `DTEND:${fDate(end)}`,
            `SUMMARY:${(rawEvent.Titre || 'Animation').replace(/,/g, '\\,')}`,
            `DESCRIPTION:${(rawEvent.Description || '').replace(/<[^>]*>?/gm, '').replace(/\n/g, '\\n')}`,
            `LOCATION:${(rawEvent.Localisation || 'Médiathèque').replace(/,/g, '\\,')}`,
            'END:VEVENT', 'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `evenement.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => modalOverlay.classList.remove('hb-active'));
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('hb-active'); });
    }

    if (grid) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.agenda-card');
            if (card && card.dataset.id && !card.classList.contains('hb-card-smart-expo') && !card.classList.contains('hb-more-cta-card')) {
                openDetailsModal(parseInt(card.dataset.id, 10));
            }
        });
    }

    loadAgendaData();
}

// Lancement automatique sécurisé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgetTempsForts);
} else {
    initWidgetTempsForts();
}
