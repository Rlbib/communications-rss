    //<![CDATA[
    document.addEventListener('DOMContentLoaded', () => {
        // ==========================================
        // CONFIGURATION URL
        // ==========================================
        const JSON_URL = "https://rlbib.github.io/communications-rss/agenda.json";

        const grid = document.getElementById('hb-events-grid');
        const searchBox = document.getElementById('hb-search-box');
        const locationFilter = document.getElementById('hb-location-filter');
        const categoryFilter = document.getElementById('hb-category-filter');
        const dateTabs = document.querySelectorAll('.hb-tab-btn');
        const resultsCounter = document.getElementById('hb-results-counter');
        
        const modalOverlay = document.getElementById('hb-modal-overlay');
        const modalClose = document.getElementById('hb-modal-close');
        const modalImg = document.getElementById('hb-modal-img');
        const modalBodyContent = document.getElementById('hb-modal-body-content');

        let allEvents = [];
        let currentDateFilter = 'all';

        // Formateur de date FR
        const dFormatter = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
        });

        // ==========================================
        // OUTILS DE FORMATAGE ET PARSING
        // ==========================================
        function buildUTCDate(dateStr, heureStr) {
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
                return new Date(Date.UTC(year, month, day, hours, minutes, 0, 0));
            }
            return new Date(dateStr);
        }

        function formatTime(date) {
            if (!date || isNaN(date.getTime())) return "";
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            if (hours === 0 && minutes === 0) return "";
            return minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`;
        }

        function formatEventDates(startDate, endDate, category) {
            let formattedStart = dFormatter.format(startDate);
            formattedStart = formattedStart.charAt(0).toUpperCase() + formattedStart.slice(1);
            const isExpo = category && (category.toLowerCase().trim() === 'exposition' || category.toLowerCase().trim() === 'expositions');

            if (isExpo && endDate && !isNaN(endDate.getTime())) {
                if (startDate.getUTCDate() === endDate.getUTCDate() && startDate.getUTCMonth() === endDate.getUTCMonth()) {
                    return formattedStart;
                }
                let formattedEnd = dFormatter.format(endDate);
                formattedEnd = formattedEnd.charAt(0).toUpperCase() + formattedEnd.slice(1);
                if (startDate.getUTCFullYear() === endDate.getUTCFullYear()) {
                    const startNoYear = formattedStart.replace(new RegExp('\\s+' + startDate.getUTCFullYear() + '$'), '');
                    return "Du " + startNoYear + " au " + formattedEnd;
                }
                return "Du " + formattedStart + " au " + formattedEnd;
            }
            
            const timeStr = formatTime(startDate);
            return "Le " + formattedStart + (timeStr ? ` <span class="hb-time-highlight"><i class="fa fa-clock-o"></i> ${timeStr}</span>` : "");
        }

        function getGroupedLocation(locStr) {
            if (!locStr) return "Autres structures";
            const lower = locStr.toLowerCase();
            if (lower.includes("abbé-grégoire") || lower.includes("abbé gregoire") || lower.includes("abbé")) return "Bibliothèque Abbé-Grégoire";
            if (lower.includes("maurice-genevoix") || lower.includes("genevoix")) return "Médiathèque Maurice-Genevoix";
            if (lower.includes("rose-valland") || lower.includes("valland")) return "Bibliothèque Rose-Valland";
            return "Autres structures";
        }

        // ==========================================
        // CHARGEMENT DES DONNÉES
        // ==========================================
        async function loadAgendaData() {
            let response = null;
            let success = false;
            let data = [];

            try {
                response = await fetch(`${JSON_URL}?t=${new Date().getTime()}`);
                if (response.ok) { data = await response.json(); success = true; }
            } catch (e) { console.warn("Fetch bloqué, essai proxy..."); }

            if (!success) {
                try {
                    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(JSON_URL)}`;
                    response = await fetch(proxyUrl);
                    if (response.ok) { data = await response.json(); success = true; }
                } catch (err) { console.error("Erreur critique chargement JSON :", err); }
            }

            if (!success) {
                grid.innerHTML = `<div class="hb-error"><i class="fa fa-exclamation-triangle"></i> Échec du chargement de l'agenda. Veuillez réessayer ultérieurement.</div>`;
                resultsCounter.textContent = "0 animation trouvée";
                return;
            }

            allEvents = data;
            buildCategoryFilter();
            renderAgenda();
        }

        // ==========================================
        // CONSTRUCTION DU FILTRE RUBRIQUE DYNAMIQUE
        // ==========================================
        function buildCategoryFilter() {
            const categories = new Set();
            allEvents.forEach(ev => {
                const itemCat = ev.Catégorie || ev.Categorie;
                if (itemCat) {
                    const cleanCat = itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim();
                    categories.add(cleanCat);
                }
            });

            Array.from(categories).sort().forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = `🏷️ ${cat}`;
                categoryFilter.appendChild(opt);
            });
        }

        // ==========================================
        // MOTEUR DE RENDU ET DE FILTRAGE GLOBAL
        // ==========================================
        function renderAgenda() {
            grid.innerHTML = '';
            
            const today = new Date();
            const nowLocalAsUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0));
            const todayLocalAsUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));

            // Nettoyage et mapping
            let events = allEvents.map((item, index) => {
                const startDate = buildUTCDate(item.Date_Debut, item.Heure);
                const endDate = item.Date_Fin ? buildUTCDate(item.Date_Fin, "18h") : startDate;
                const cleanCat = (item.Catégorie || item.Categorie || "Animation").charAt(0).toUpperCase() + (item.Catégorie || item.Categorie || "Animation").slice(1).toLowerCase().trim();

                const isHighlighted = (
                    String(item.A_la_Une || '').toUpperCase() === "TRUE" || String(item.Selection || '').toUpperCase() === "TRUE" ||
                    String(item.Note || '').toLowerCase().includes("une") || String(item.Note || '').toLowerCase().includes("phare") || String(item.Note || '').toLowerCase().includes("coeur")
                );

                return {
                    id: item.id || index,
                    title: item.Titre || "Sans titre",
                    link: item.Lien || "",
                    date: startDate,
                    endDate: endDate,
                    category: cleanCat,
                    location: item.Localisation || "Médiathèque",
                    ville: item.Ville || "",
                    description: item.Description || "",
                    imageUrl: item.URL_de_l_image || null,
                    duration: (item.Durée || item.Duree || "").trim(),
                    targetAudience: (item.Public_cible || "").trim(),
                    time: (item.Heure || "").trim(),
                    highlight: isHighlighted,
                    reservation: item.Reservation === "TRUE"
                };
            }).filter(ev => {
                // Règle 1 : Supprimer les événements passés (+1h pour les anims, minuit pour les expos)
                const isExpo = ev.category.toLowerCase().includes('exposition') || ev.category.toLowerCase().includes('expositions');
                if (isExpo) {
                    return ev.endDate >= todayLocalAsUTC; 
                } else {
                    const oneHourAfterStart = new Date(ev.date.getTime() + (60 * 60 * 1000));
                    return oneHourAfterStart >= nowLocalAsUTC;
                }
            });

            // Règle 2 : Filtrage Textuel
            const q = searchBox.value.toLowerCase().trim();
            if (q) {
                events = events.filter(ev => (ev.title||'').toLowerCase().includes(q) || (ev.description||'').toLowerCase().includes(q) || (ev.location||'').toLowerCase().includes(q));
            }

            // Règle 3 : Filtrage par Lieu
            const selLoc = locationFilter.value;
            if (selLoc !== 'all') {
                events = events.filter(ev => getGroupedLocation(ev.location) === selLoc);
            }

            // Règle 4 : Filtrage par Rubrique
            const selCat = categoryFilter.value;
            if (selCat !== 'all') {
                events = events.filter(ev => ev.category === selCat);
            }

            // Règle 5 : Filtrage par Onglet Temporel
            if (currentDateFilter !== 'all') {
                events = events.filter(ev => {
                    // Les expos en cours passent tous les filtres temporels si on est dedans
                    const isExpo = ev.category.toLowerCase().includes('exposition') || ev.category.toLowerCase().includes('expositions');
                    if (isExpo && ev.date <= todayLocalAsUTC && ev.endDate >= todayLocalAsUTC) return true;

                    if (currentDateFilter === 'today') {
                        return ev.date.getUTCDate() === todayLocalAsUTC.getUTCDate() && ev.date.getUTCMonth() === todayLocalAsUTC.getUTCMonth() && ev.date.getUTCFullYear() === todayLocalAsUTC.getUTCFullYear();
                    }
                    if (currentDateFilter === 'weekend') {
                        const dayOfWeek = todayLocalAsUTC.getUTCDay(); // 0 = Dim, 6 = Sam
                        const saturday = new Date(todayLocalAsUTC); saturday.setUTCDate(todayLocalAsUTC.getUTCDate() + (dayOfWeek === 0 ? -1 : 6 - dayOfWeek));
                        const sunday = new Date(todayLocalAsUTC); sunday.setUTCDate(todayLocalAsUTC.getUTCDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek));
                        const eD = ev.date.getUTCDate(), eM = ev.date.getUTCMonth(), eY = ev.date.getUTCFullYear();
                        return (eD === saturday.getUTCDate() && eM === saturday.getUTCMonth() && eY === saturday.getUTCFullYear()) || 
                               (eD === sunday.getUTCDate() && eM === sunday.getUTCMonth() && eY === sunday.getUTCFullYear());
                    }
                    if (currentDateFilter === 'week') {
                        const endOfWeek = new Date(todayLocalAsUTC); endOfWeek.setUTCDate(todayLocalAsUTC.getUTCDate() + 7);
                        return ev.date >= todayLocalAsUTC && ev.date <= endOfWeek;
                    }
                    if (currentDateFilter === 'month') {
                        return ev.date.getUTCMonth() === todayLocalAsUTC.getUTCMonth() && ev.date.getUTCFullYear() === todayLocalAsUTC.getUTCFullYear();
                    }
                    return true;
                });
            }

            // Règle 6 : Tri (Expos toujours repoussées en fin de liste)
            events.sort((a, b) => {
                const isAExpo = a.category.toLowerCase().includes('exposition') || a.category.toLowerCase().includes('expositions');
                const isBExpo = b.category.toLowerCase().includes('exposition') || b.category.toLowerCase().includes('expositions');
                if (isAExpo && !isBExpo) return 1;
                if (!isAExpo && isBExpo) return -1;
                return a.date - b.date;
            });

            // Affichage Compteur
            resultsCounter.innerHTML = `<i class="fa fa-list-ul"></i> ${events.length} animation${events.length > 1 ? 's' : ''} correspond${events.length > 1 ? 'ent' : ''} à vos critères`;

            if (events.length === 0) {
                grid.innerHTML = `<div class="hb-no-results"><i class="fa fa-search-minus"></i> Oups, aucune animation ne correspond à vos critères.<br><br><span style="font-size:13px; font-weight:normal; color:var(--hb-muted);">Essayez d'élargir votre recherche ou de modifier vos filtres temporels.</span></div>`;
                return;
            }

            // Injection des cartes
            events.forEach(event => {
                const dateText = formatEventDates(event.date, event.endDate, event.category);
                
                // Micro-badges temps & réservation
                const eventDateOnly = new Date(Date.UTC(event.date.getUTCFullYear(), event.date.getUTCMonth(), event.date.getUTCDate(), 0, 0, 0, 0));
                const diffTime = eventDateOnly - todayLocalAsUTC;
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                
                let relativeDateHtml = '';
                const isExpo = event.category.toLowerCase().includes('exposition') || event.category.toLowerCase().includes('expositions');
                
                if (isExpo && event.date <= nowLocalAsUTC && event.endDate >= nowLocalAsUTC) {
                    relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-calendar-check-o"></i> En cours</span>`;
                } else if (diffDays === 0) {
                    relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #ffebeb; color: #e11d48; border-color: #fecdd3;"><i class="fa fa-clock-o"></i> Aujourd'hui</span>`;
                } else if (diffDays === 1) {
                    relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #fff7ed; color: #ea580c; border-color: #ffedd5;"><i class="fa fa-calendar-o"></i> Demain</span>`;
                } else if (diffDays > 1 && diffDays <= 30) {
                    relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-hourglass-start"></i> Dans ${diffDays} j.</span>`;
                }

                let reservationHtml = event.reservation 
                    ? `<span class="hb-meta-pill hb-pill-reservation"><i class="fa fa-ticket"></i> Sur inscription</span>` 
                    : `<span class="hb-meta-pill hb-pill-free"><i class="fa fa-check"></i> Entrée libre</span>`;

                const locDisplay = event.location.includes(event.ville) ? event.location : (event.ville ? `${event.location}, ${event.ville}` : event.location);

                const cardHtml = `
                    <div class="agenda-card ${event.highlight ? 'hb-highlighted' : ''}" data-id="${event.id}">
                        <span class="agenda-card-tag">${event.category}</span>
                        ${event.highlight ? `<span class="hb-card-star"><i class="fa fa-star" aria-hidden="true"></i> À la une</span>` : ''}

                        <div class="hb-image-wrapper">
                            <i class="fa fa-calendar hb-fallback-icon" aria-hidden="true" style="${event.imageUrl ? 'display: none;' : 'display: block;'}"></i>
                            ${event.imageUrl ? `<img class="agenda-card-image" src="${event.imageUrl}" alt="${event.title}" onerror="this.previousElementSibling.style.display='block'; this.style.display='none';" loading="lazy" />` : ''}
                        </div>
                        
                        <div class="agenda-card-details">
                            <div class="title-wrapper">
                                <h3 class="agenda-card-title-simple">${event.title}</h3>
                            </div>
                            
                            <div class="hb-card-meta-inline">
                                ${relativeDateHtml}
                                ${reservationHtml}
                            </div>
                            
                            <div class="agenda-card-dateloc-block">
                                <hr class="agenda-card-separator-custom" />
                                <p class="agenda-card-date">${dateText}</p>
                                <p class="agenda-card-location"><i class="fa fa-map-marker"></i> ${locDisplay}</p>
                            </div>
                        </div>
                    </div>
                `;
                grid.insertAdjacentHTML('beforeend', cardHtml);
            });
        }

        // ==========================================
        // GESTION DES EVENEMENTS & MODAL
        // ==========================================
        
        // Clics sur les onglets de date
        dateTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                dateTabs.forEach(b => b.classList.remove('hb-active'));
                btn.classList.add('hb-active');
                currentDateFilter = btn.dataset.date;
                renderAgenda();
            });
        });

        // Modification des filtres Select et Recherche textuelle
        searchBox.addEventListener('input', renderAgenda);
        locationFilter.addEventListener('change', renderAgenda);
        categoryFilter.addEventListener('change', renderAgenda);

        // Affichage Modal
        function openDetailsModal(eventId) {
            const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId);
            if (!rawEvent) return;

            const startDate = buildUTCDate(rawEvent.Date_Debut, rawEvent.Heure);
            const endDate = rawEvent.Date_Fin ? buildUTCDate(rawEvent.Date_Fin, "18h") : startDate;
            const cleanCat = (rawEvent.Catégorie || rawEvent.Categorie || "Animation").charAt(0).toUpperCase() + (rawEvent.Catégorie || rawEvent.Categorie || "Animation").slice(1).toLowerCase().trim();
            const dateText = formatEventDates(startDate, endDate, cleanCat);

            let locText = rawEvent.Localisation || "Médiathèque";
            if (rawEvent.Ville) locText += `, ${rawEvent.Ville}`;

            if (rawEvent.URL_de_l_image) {
                modalImg.src = rawEvent.URL_de_l_image; modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
            }

            const durationStr = (rawEvent.Durée || rawEvent.Duree || "").trim();
            const targetAudienceStr = (rawEvent.Public_cible || "").trim();

            let reservationModalHtml = rawEvent.Reservation === "TRUE"
                ? `<div class="hb-modal-meta-item" style="background-color: #fee2e2; color: #b91c1c; padding: 6px 12px; border-radius: 4px; border-left: 4px solid #f87171; font-weight: bold; margin-top: 5px; font-size: 12.5px; text-transform: uppercase;"><i class="fa fa-ticket"></i> Inscription / Réservation Obligatoire</div>`
                : `<div class="hb-modal-meta-item" style="background-color: #f0fdf4; color: #166534; padding: 6px 12px; border-radius: 4px; border-left: 4px solid #4ade80; font-weight: bold; margin-top: 5px; font-size: 12.5px; text-transform: uppercase;"><i class="fa fa-check"></i> Entrée libre (Sans réservation)</div>`;

            modalBodyContent.innerHTML = `
                <span class="agenda-card-tag" style="position:static; display:inline-block; margin-bottom:12px;">${cleanCat}</span>
                <h3 class="hb-modal-title">${rawEvent.Titre || "Sans titre"}</h3>
                
                <div class="hb-modal-meta-list">
                    <div class="hb-modal-meta-item"><i class="fa fa-map-marker"></i> <strong>Lieu :</strong> ${locText}</div>
                    <div class="hb-modal-meta-item"><i class="fa fa-calendar"></i> <strong>Date :</strong> ${dateText}</div>
                    ${rawEvent.Heure ? `<div class="hb-modal-meta-item" style="background-color: var(--hb-secondary); padding: 6px 12px; border-radius: 4px; border-left: 4px solid var(--hb-accent); margin-top: 5px; font-weight: bold; color: var(--hb-dark);"><i class="fa fa-clock-o"></i> Horaires : ${rawEvent.Heure}</div>` : ''}
                    ${durationStr ? `<div class="hb-modal-meta-item" style="margin-top: 8px;"><i class="fa fa-hourglass-half"></i> <strong>Durée de l'animation :</strong> ${durationStr}</div>` : ''}
                    ${targetAudienceStr ? `<div class="hb-modal-meta-item"><i class="fa fa-users"></i> <strong>Public :</strong> ${targetAudienceStr}</div>` : ''}
                    ${reservationModalHtml}
                </div>
                <div class="hb-modal-desc">${rawEvent.Description || 'Découvrez cette animation proposée par vos médiathèques.'}</div>
                <div class="hb-modal-actions">
                    ${rawEvent.Lien ? `<a href="${rawEvent.Lien}" target="_blank" class="hb-btn hb-btn-primary"><i class="fa fa-external-link"></i> En savoir plus / Réserver</a>` : ''}
                    <button id="hb-modal-ics" class="hb-btn hb-btn-default"><i class="fa fa-calendar-plus-o"></i> Ajouter à mon agenda</button>
                </div>
            `;

            document.getElementById('hb-modal-ics').addEventListener('click', () => {
                const start = buildUTCDate(rawEvent.Date_Debut, rawEvent.Heure);
                const end = rawEvent.Date_Fin ? buildUTCDate(rawEvent.Date_Fin, "18h") : new Date(start.getTime() + 2 * 60 * 60 * 1000);
                const formatDateICS = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                const ics = [
                    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Agglopolys//AgendaComplet//FR", "BEGIN:VEVENT",
                    `UID:ev-${eventId}-${new Date().getTime()}@agglopolys.fr`,
                    `DTSTAMP:${formatDateICS(new Date())}`, `DTSTART:${formatDateICS(start)}`, `DTEND:${formatDateICS(end)}`,
                    `SUMMARY:[${cleanCat.toUpperCase()}] ${rawEvent.Titre}`, `LOCATION:${locText.replace(/,/g, "\\,")}`,
                    `DESCRIPTION:${(rawEvent.Description || '').substring(0, 300).replace(/\n/g, "\\n")}`,
                    "END:VEVENT", "END:VCALENDAR"
                ].join("\r\n");
                const blob = new Blob([ics], { type: "text/calendar;charset=utf-8;" });
                const link = document.createElement("a"); link.href = URL.createObjectURL(blob);
                link.setAttribute("download", `${(rawEvent.Titre || "event").toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`);
                document.body.appendChild(link); link.click(); document.body.removeChild(link);
            });

            modalOverlay.style.display = 'flex';
            void modalOverlay.offsetWidth;
            modalOverlay.classList.add('hb-active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalOverlay.classList.remove('hb-active');
            setTimeout(() => { modalOverlay.style.display = 'none'; document.body.style.overflow = ''; }, 300);
        }

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('hb-active')) closeModal(); });

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.agenda-card');
            if (card) { e.preventDefault(); openDetailsModal(parseInt(card.dataset.id, 10)); }
        });

        // Lancement
        loadAgendaData();
    });
    //]]>
