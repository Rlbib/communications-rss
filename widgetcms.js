 //<![CDATA[
    document.addEventListener('DOMContentLoaded', () => {
        // ==========================================
        // CONFIGURATION DE L'URL D'ACCÈS AU FICHIER JSON
        // ==========================================
        const JSON_URL = "https://rlbib.github.io/communications-rss/agenda.json";

        const container = document.getElementById('hb-events-grid');
        const dateTabs = document.querySelectorAll('.hb-tab-btn');
        const searchBox = document.getElementById('hb-search-box');
        const locationFilter = document.getElementById('hb-location-filter');
        const categoryFilter = document.getElementById('hb-category-filter');
        
        const modalOverlay = document.getElementById('hb-modal-overlay');
        const modalClose = document.getElementById('hb-modal-close');
        const modalImg = document.getElementById('hb-modal-img');
        const modalBodyContent = document.getElementById('hb-modal-body-content');

        let allEvents = [];
        let currentDateFilter = 'all';

        // Formateur linguistique pour forcer l'analyse et l'affichage en UTC pur
        const dFormatter = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });

        // Fonction d'attribution d'un groupe à un lieu
        function getGroupedLocation(locStr) {
            if (!locStr) return "Autres structures";
            const lower = locStr.toLowerCase();
            if (lower.includes("abbé-grégoire") || lower.includes("abbé grégoire") || lower.includes("abbé-gregoire") || lower.includes("abbé gregoire") || lower.includes("abbé") || lower.includes("gregoire")) {
                return "Bibliothèque Abbé-Grégoire";
            }
            if (lower.includes("maurice-genevoix") || lower.includes("maurice genevoix") || lower.includes("genevoix")) {
                return "Médiathèque Maurice-Genevoix";
            }
            if (lower.includes("rose-valland") || lower.includes("rose valland") || lower.includes("valland")) {
                return "Bibliothèque Rose-Valland";
            }
            return "Autres structures";
        }

        // Parseur robuste de date pour créer des dates UTC parfaites
        function buildUTCDate(dateStr, heureStr) {
            if (!dateStr) return null;
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                let hours = 0;
                let minutes = 0;
                if (heureStr) {
                    const match = heureStr.match(/(\d{1,2})[h:](\d{2})?/i);
                    if (match) {
                        hours = parseInt(match[1], 10);
                        minutes = match[2] ? parseInt(match[2], 10) : 0;
                    }
                }
                return new Date(Date.UTC(year, month, day, hours, minutes, 0, 0));
            }
            return new Date(dateStr);
        }

        // Extraction de l'heure en lecture UTC
        function formatTime(date) {
            if (!date || isNaN(date.getTime())) return "";
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            if (hours === 0 && minutes === 0) return "";
            return minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`;
        }

        // Formatage de l'heure et des plages de dates (Exposition exclusive) avec icônes intégrées et préfixe explicite
        function formatEventDates(startDate, endDate, category) {
            let formattedStart = dFormatter.format(startDate);
            formattedStart = formattedStart.charAt(0).toUpperCase() + formattedStart.slice(1);
            const isExpo = category && (category.toLowerCase().trim() === 'exposition' || category.toLowerCase().trim() === 'expositions');

            if (isExpo && endDate && !isNaN(endDate.getTime())) {
                if (startDate.getUTCDate() === endDate.getUTCDate() && startDate.getUTCMonth() === endDate.getUTCMonth()) {
                    return `<i class="fa fa-calendar" aria-hidden="true"></i> ` + formattedStart;
                }
                let formattedEnd = dFormatter.format(endDate);
                formattedEnd = formattedEnd.charAt(0).toUpperCase() + formattedEnd.slice(1);
                
                if (startDate.getUTCFullYear() === endDate.getUTCFullYear()) {
                    const startNoYear = formattedStart.replace(new RegExp('\\s+' + startDate.getUTCFullYear() + '$'), '');
                    return `<i class="fa fa-calendar" aria-hidden="true"></i> Du ` + startNoYear + " au " + formattedEnd;
                }
                return `<i class="fa fa-calendar" aria-hidden="true"></i> Du ` + formattedStart + " au " + formattedEnd;
            }
            
            const timeStr = formatTime(startDate);
            // AJUSTEMENT ICI : Retrait du texte "Début à " pour n'avoir que l'heure épurée
            return `<i class="fa fa-calendar" aria-hidden="true"></i> Le ` + formattedStart + (timeStr ? ` <span class="hb-time-highlight"><i class="fa fa-clock-o" aria-hidden="true"></i> ${timeStr}</span>` : "");
        }

        // Chargement asynchrone du fichier JSON d'Agglopolys
        async function loadAgenda() {
            let response = null;
            let success = false;
            let data = [];

            try {
                // Utilisation d'un timestamp dynamique pour bypasser les caches du navigateur
                response = await fetch(`${JSON_URL}?t=${new Date().getTime()}`);
                if (response.ok) {
                    data = await response.json();
                    success = true;
                }
            } catch (e) {
                console.warn("Fetch direct bloqué. Tentative via proxy CORS...");
            }

            if (!success) {
                try {
                    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(JSON_URL)}`;
                    response = await fetch(proxyUrl);
                    if (response.ok) {
                        data = await response.json();
                        success = true;
                    }
                } catch (proxyErr) {
                    console.error("Échec du chargement :", proxyErr);
                }
            }

            if (!success) {
                container.innerHTML = `<div class="hb-error"><i class="fa fa-exclamation-triangle"></i> Erreur lors de la récupération des données de l'agenda.</div>`;
                return;
            }

            allEvents = data;
            populateFilters();
            renderEvents();
        }

        // Remplissage dynamique des listes de filtres
        function populateFilters() {
            const categories = new Set();

            allEvents.forEach(ev => {
                const itemCat = ev.Catégorie || ev.Categorie || "Animation";
                if (itemCat) {
                    const cleanCat = itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim();
                    categories.add(cleanCat);
                }
            });

            // Vider et alimenter le select de catégories
            categoryFilter.innerHTML = '<option value="all">🏷️ Toutes les rubriques</option>';
            Array.from(categories).sort().forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = "🏷️ " + cat;
                categoryFilter.appendChild(opt);
            });
        }

        // Moteur d'injection et de tri graphique des cartes
        function renderEvents() {
            container.innerHTML = '';
            
            const today = new Date();
            const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));

            // 1. Filtrage par date dynamique (UTC strict pour éviter les décalages d'heures)
            let filtered = allEvents.map((item, index) => {
                const eventDate = buildUTCDate(item.Date_Debut, item.Heure);
                const endDate = item.Date_Fin ? buildUTCDate(item.Date_Fin, "18h") : eventDate;

                let metadata = item.Localisation || "Blois";
                if (item.Ville) {
                    metadata += `, ${item.Ville}`;
                }

                const itemCat = item.Catégorie || item.Categorie || "Animation";
                const cleanedCategory = itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim();

                // Détection de la mise en valeur de l'événement (A la Une / Important / Coup de cœur)
                // Recherche dans plusieurs colonnes possibles Grist (A_la_Une, Note, Selection)
                const isHighlighted = (
                    String(item.A_la_Une || '').toUpperCase() === "TRUE" ||
                    String(item.Selection || '').toUpperCase() === "TRUE" ||
                    String(item.Note || '').toLowerCase().includes("une") ||
                    String(item.Note || '').toLowerCase().includes("phare") ||
                    String(item.Note || '').toLowerCase().includes("coeur") ||
                    String(item.Note || '').toLowerCase().includes("cœur")
                );

                return {
                    id: item.id || index,
                    title: item.Titre || "Sans titre",
                    link: item.Lien || "#",
                    date: eventDate,
                    endDate: endDate,
                    category: cleanedCategory,
                    metadata: metadata,
                    description: item.Description || "",
                    imageUrl: item.URL_de_l_image || null,
                    duration: (item.Durée || item.Duree || "").trim(),
                    targetAudience: (item.Public_cible || "").trim(),
                    reservation: item.Reservation === "TRUE",
                    time: (item.Heure || "").trim(),
                    highlight: isHighlighted
                };
            }).filter(ev => {
                // On cache d'office les événements dont la date de fin est passée
                if (ev.endDate < todayUTC) return false;

                if (currentDateFilter === 'all') return true;

                // Aujourd'hui
                if (currentDateFilter === 'today') {
                    return ev.date.getUTCDate() === todayUTC.getUTCDate() && ev.date.getUTCMonth() === todayUTC.getUTCMonth() && ev.date.getUTCFullYear() === todayUTC.getUTCFullYear();
                }

                // Demain
                if (currentDateFilter === 'tomorrow') {
                    const tomorrow = new Date(todayUTC);
                    tomorrow.setUTCDate(todayUTC.getUTCDate() + 1);
                    return ev.date.getUTCDate() === tomorrow.getUTCDate() && ev.date.getUTCMonth() === tomorrow.getUTCMonth() && ev.date.getUTCFullYear() === tomorrow.getUTCFullYear();
                }

                // Ce week-end (Samedi et Dimanche)
                if (currentDateFilter === 'weekend') {
                    const dayOfWeek = todayUTC.getUTCDay(); // 0 = Dimanche, 6 = Samedi
                    const saturday = new Date(todayUTC);
                    saturday.setUTCDate(todayUTC.getUTCDate() + (6 - dayOfWeek));
                    const sunday = new Date(todayUTC);
                    sunday.setUTCDate(todayUTC.getUTCDate() + (7 - dayOfWeek));
                    
                    const eventDay = ev.date.getUTCDate();
                    const eventMonth = ev.date.getUTCMonth();
                    
                    return (eventDay === saturday.getUTCDate() && eventMonth === saturday.getUTCMonth()) || 
                           (eventDay === sunday.getUTCDate() && eventMonth === sunday.getUTCMonth());
                }

                // Cette semaine (7 prochains jours)
                if (currentDateFilter === 'week') {
                    const maxWeek = new Date(todayUTC);
                    maxWeek.setUTCDate(todayUTC.getUTCDate() + 7);
                    return ev.date >= todayUTC && ev.date <= maxWeek;
                }

                return true;
            });

            // 2. Filtrage par recherche textuelle libre
            const query = searchBox.value.toLowerCase().trim();
            if (query) {
                filtered = filtered.filter(ev => 
                    (ev.title || '').toLowerCase().includes(query) || 
                    (ev.description || '').toLowerCase().includes(query) ||
                    (ev.metadata || '').toLowerCase().includes(query)
                );
            }

            // 3. Filtrage par Bâtiment Regroupé
            const selLoc = locationFilter.value;
            if (selLoc !== 'all') {
                filtered = filtered.filter(ev => getGroupedLocation(ev.metadata) === selLoc);
            }

            // 4. Filtrage par Rubrique
            const selCat = categoryFilter.value;
            if (selCat !== 'all') {
                filtered = filtered.filter(ev => ev.category && ev.category.toLowerCase().trim() === selCat.toLowerCase().trim());
            }

            // Tri chronologique ascendant (plus proche d'abord)
            filtered.sort((a, b) => a.date - b.date);

            if (filtered.length === 0) {
                container.innerHTML = `<div class="hb-loading">Aucune animation disponible pour ces critères.</div>`;
                return;
            }

            // Injection HTML des cartes
            filtered.forEach(event => {
                const dateText = formatEventDates(event.date, event.endDate, event.category);

                const cardHtml = `
                    <div class="hb-card ${event.highlight ? 'hb-highlighted' : ''}" data-id="${event.id}">
                        <div class="hb-img-container">
                            <span class="hb-badge-cat">${event.category || 'Animation'}</span>
                            
                            <!-- Insertion dynamique du badge À La Une si l'événement est prioritaire -->
                            ${event.highlight ? `<span class="hb-badge-highlight"><i class="fa fa-star" aria-hidden="true"></i> À la une</span>` : ''}
                            
                            <i class="fa fa-calendar-o hb-placeholder-icon"></i>
                            ${event.imageUrl ? `<img src="${event.imageUrl}" alt="${event.title}" onerror="this.style.display='none';" />` : ''}
                            <div class="hb-date-badge">${dateText}</div>
                        </div>
                        <div class="hb-content">
                            <div>
                                <h4 class="hb-title">${event.title}</h4>
                                <div class="hb-specs-row">
                                    ${event.time ? `<span><i class="fa fa-clock-o"></i> Horaires : ${event.time}</span>` : ''}
                                    ${event.targetAudience ? `<span><i class="fa fa-users"></i> ${event.targetAudience}</span>` : ''}
                                    ${event.duration ? `<span><i class="fa fa-hourglass-half"></i> Durée : ${event.duration}</span>` : ''}
                                </div>
                                <p class="hb-desc">${event.description || ''}</p>
                            </div>
                            <div class="hb-card-footer">
                                <span><i class="fa fa-map-marker"></i> ${event.metadata.split(',')[0]}</span>
                                <span class="hb-more-btn">Découvrir <i class="fa fa-chevron-right"></i></span>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHtml);
            });
        }

        // --- INTERACTION DU MODAL DÉTAILS ---
        function openModal(eventId) {
            // Re-mapping à la volée pour l'événement sélectionné
            const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId);
            if (!rawEvent) return;

            const startDate = buildUTCDate(rawEvent.Date_Debut, rawEvent.Heure);
            const endDate = rawEvent.Date_Fin ? buildUTCDate(rawEvent.Date_Fin, "18h") : startDate;
            
            const itemCat = rawEvent.Catégorie || rawEvent.Categorie || "Animation";
            const cleanedCategory = itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim();
            const dateText = formatEventDates(startDate, endDate, cleanedCategory);

            let metadata = rawEvent.Localisation || "Blois";
            if (rawEvent.Ville) {
                metadata += `, ${rawEvent.Ville}`;
            }

            if (rawEvent.URL_de_l_image) {
                modalImg.src = rawEvent.URL_de_l_image;
                modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
            }

            const durationStr = (rawEvent.Durée || rawEvent.Duree || "").trim();
            const targetAudienceStr = (rawEvent.Public_cible || "").trim();

            modalBodyContent.innerHTML = `
                <span class="hb-badge-cat" style="position:static; display:inline-block; margin-bottom:10px;">
                    ${cleanedCategory}
                </span>
                <h3 class="hb-modal-title">${rawEvent.Titre || "Sans titre"}</h3>
                
                <div class="hb-modal-meta-list">
                    <div class="hb-modal-meta-item">
                        <i class="fa fa-map-marker"></i> <strong>Lieu :</strong> ${metadata}
                    </div>
                    <div class="hb-modal-meta-item">
                        <i class="fa fa-calendar"></i> <strong>Date :</strong> ${dateText}
                    </div>
                    ${rawEvent.Heure ? `
                    <div class="hb-modal-meta-item" style="background-color: var(--hb-secondary); padding: 6px 12px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; border-left: 4px solid var(--hb-accent); margin-top: 5px; font-weight: bold;">
                        <i class="fa fa-clock-o"></i> Horaires : ${rawEvent.Heure}
                    </div>` : ''}
                    ${durationStr ? `<div class="hb-modal-meta-item" style="margin-top: 8px;"><i class="fa fa-hourglass-half"></i> <strong>Durée de l'animation :</strong> ${durationStr}</div>` : ''}
                    ${targetAudienceStr ? `<div class="hb-modal-meta-item"><i class="fa fa-users"></i> <strong>Public :</strong> ${targetAudienceStr}</div>` : ''}
                </div>

                <div class="hb-modal-desc">${rawEvent.Description || 'Découvrez cette animation proposée par vos médiathèques.'}</div>
                
                <div class="hb-modal-actions">
                    ${rawEvent.Lien ? `
                        <a href="${rawEvent.Lien}" target="_blank" class="hb-btn hb-btn-primary">
                            <i class="fa fa-external-link"></i> En savoir plus / Réserver
                        </a>
                    ` : ''}
                    <button id="hb-modal-ics" class="hb-btn hb-btn-default"><i class="fa fa-calendar-plus-o"></i> Ajouter à mon agenda</button>
                </div>
            `;

            // Exportation du calendrier (.ICS)
            document.getElementById('hb-modal-ics').addEventListener('click', () => {
                const start = buildUTCDate(rawEvent.Date_Debut, rawEvent.Heure);
                const end = rawEvent.Date_Fin ? buildUTCDate(rawEvent.Date_Fin, "18h") : new Date(start.getTime() + 2 * 60 * 60 * 1000);
                
                const formatDateICS = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                
                const ics = [
                    "BEGIN:VCALENDAR",
                    "VERSION:2.0",
                    "PRODID:-//Agglopolys//AgendaCulturel//FR",
                    "BEGIN:VEVENT",
                    `UID:ev-${eventId}-${new Date().getTime()}@agglopolys.fr`,
                    `DTSTAMP:${formatDateICS(new Date())}`,
                    `DTSTART:${formatDateICS(start)}`,
                    `DTEND:${formatDateICS(end)}`,
                    `SUMMARY:[${cleanedCategory.toUpperCase()}] ${rawEvent.Titre}`,
                    `LOCATION:${metadata.replace(/,/g, "\\,")}`,
                    `DESCRIPTION:${(rawEvent.Description || '').substring(0, 300).replace(/\n/g, "\\n")}`,
                    "END:VEVENT",
                    "END:VCALENDAR"
                ].join("\r\n");

                const blob = new Blob([ics], { type: "text/calendar;charset=utf-8;" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.setAttribute("download", `${(rawEvent.Titre || "event").toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            modalOverlay.style.display = 'flex';
            void modalOverlay.offsetWidth; // Force le reflow de l'animation d'ouverture
            modalOverlay.classList.add('hb-active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalOverlay.classList.remove('hb-active');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }

        // Écouteurs de fermeture de modal
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('hb-active')) closeModal();
        });

        // Liaison de clic sur les cartes pour ouvrir les détails
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.hb-card');
            if (card) {
                e.preventDefault();
                const eventId = parseInt(card.dataset.id, 10);
                openModal(eventId);
            }
        });

        // Liaison de sélection des onglets temporels
        dateTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                dateTabs.forEach(b => b.classList.remove('hb-active'));
                btn.classList.add('hb-active');
                currentDateFilter = btn.dataset.date;
                renderEvents();
            });
        });

        // Écouteurs d'interactivité sur les filtres
        searchBox.addEventListener('input', renderEvents);
        locationFilter.addEventListener('change', renderEvents);
        categoryFilter.addEventListener('change', renderEvents);

        // Premier allumage automatique
        loadAgenda();
    });
    //]]>
