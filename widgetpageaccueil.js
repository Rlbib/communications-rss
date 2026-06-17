    //<![CDATA[
    document.addEventListener('DOMContentLoaded', () => {
        // --- 1. INJECTION DU CSS HARMONISÉ ---
        const style = document.createElement('style');
        style.innerHTML = `
            /* CORRECTION DU DÉFILEMENT DE LA MODALE */
            .hb-modal-container { max-height: 92vh !important; display: flex !important; flex-direction: column !important; }
            .hb-modal-hero { flex-shrink: 0 !important; height: 180px !important; }
            .hb-modal-body { overflow-y: auto !important; padding: 22px !important; flex-grow: 1 !important; }
            .hb-modal-body::-webkit-scrollbar { width: 6px; }
            .hb-modal-body::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
            .hb-modal-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
            .hb-modal-body::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

            /* CORRECTION DESCRIPTION (Affichage complet et aéré) */
            .hb-modal-desc { max-height: none !important; overflow-y: visible !important; margin-top: 15px !important; margin-bottom: 25px !important; font-size: 14px !important; line-height: 1.6 !important; color: #374151 !important; }

            /* Style Formulaire Réservation */
            .hb-resa-box { background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 18px; border-radius: 6px; margin-top: 15px; border-left: 4px solid var(--hb-primary); box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
            .hb-resa-title { color: var(--hb-primary); font-weight: 800; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; }
            .hb-resa-subtitle { font-size: 13.5px; color: #4b5563; margin: 0 0 10px 0; line-height: 1.5; font-weight: 600; }
            
            /* Status Badge Temps Réel */
            .hb-status-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 12px; margin-left: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
            .hb-status-open { color: #166534; background: #dcfce7; border: 1px solid #bbf7d0; }
            .hb-status-closed { color: #991b1b; background: #fee2e2; border: 1px solid #fecaca; }
            
            /* Accordéon Horaires */
            .hb-hours-details { margin-bottom: 15px; background: #ffffff; border-radius: 4px; border: 1px solid #e5e7eb; overflow: hidden; }
            .hb-hours-summary { padding: 8px 12px; font-size: 12px; font-weight: bold; color: var(--hb-muted); cursor: pointer; background: #f3f4f6; list-style: none; display: flex; align-items: center; justify-content: space-between; transition: background 0.2s; }
            .hb-hours-summary:hover { background: #e5e7eb; color: var(--hb-primary); }
            .hb-hours-summary::-webkit-details-marker { display: none; }
            .hb-hours-summary::after { content: '\\f078'; font-family: 'FontAwesome'; font-size: 10px; transition: transform 0.2s; }
            .hb-hours-details[open] .hb-hours-summary::after { transform: rotate(180deg); }
            .hb-hours-content { padding: 12px; font-size: 12px; color: #374151; line-height: 1.6; }
            
            /* Mini-formulaire */
            .hb-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px; }
            .hb-form-full { grid-column: span 2; }
            .hb-input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px; box-sizing: border-box; font-family: inherit; background: #ffffff; transition: border-color 0.2s; }
            .hb-input:focus { outline: none; border-color: var(--hb-accent); box-shadow: 0 0 0 3px rgba(239, 172, 42, 0.2); }
            
            .hb-btn-submit { background-color: var(--hb-accent); color: var(--hb-dark); padding: 12px 16px; border: none; border-radius: 4px; display: flex; align-items: center; justify-content: center; width: 100%; font-weight: 800; font-size: 13.5px; transition: all 0.2s; cursor: pointer; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
            .hb-btn-submit:hover { background-color: var(--hb-primary); color: #ffffff; transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

            /* BOUTONS D'ACTION EN BAS */
            .hb-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; }
            .hb-btn-action { flex: 1; min-width: 130px; padding: 10px 15px; border-radius: 6px; font-weight: 800; font-size: 12.5px; text-decoration: none !important; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; text-transform: uppercase; letter-spacing: 0.5px; gap: 8px; }
            
            .hb-btn-calendar { background-color: var(--hb-primary); color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .hb-btn-calendar:hover { background-color: #000000; color: #ffffff; transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
            
            .hb-btn-share { background-color: #ffffff; color: var(--hb-primary); border-color: var(--hb-primary); }
            .hb-btn-share:hover { background-color: var(--hb-light); color: var(--hb-primary); transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.08); }

            /* MENU DE PARTAGE VISUEL */
            .hb-share-panel { display: none; width: 100%; background: #f3f4f6; border-radius: 6px; border: 1px solid #e5e7eb; padding: 12px; margin-bottom: 5px; justify-content: center; gap: 12px; flex-wrap: wrap; animation: fadeIn 0.3s ease; box-sizing: border-box; }
            .hb-share-panel.hb-active { display: flex; }
            .hb-social-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white !important; font-size: 18px; text-decoration: none !important; transition: transform 0.2s; border: none; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .hb-social-btn:hover { transform: scale(1.1); color: white !important; }
            .hb-fb { background-color: #1877F2; }
            .hb-wa { background-color: #25D366; }
            .hb-tw { background-color: #000000; }
            .hb-em { background-color: #ef4444; }
            .hb-cp { background-color: #6b7280; }
            
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);

        // CONFIGURATION WIDGET
        const FEATURED_HASHTAGS = ["Atelier", "Exposition", "Club", "Conférence", "Lecture Spectacle"];
        const MAX_CARDS_DISPLAYED = 15;
        const MAIN_AGENDA_URL = "https://bibliotheques.agglopolys.fr/EXPLOITATION/agenda2026.aspx";
        const JSON_URL = "https://rlbib.github.io/communications-rss/agenda.json";

        const grid = document.getElementById('hb-widget-grid');
        const hashtagsWrapper = document.getElementById('hb-hashtags');
        const ctaBtn = document.getElementById('hb-cta-btn');
        const scrollLeftBtn = document.getElementById('hb-scroll-left');
        const scrollRightBtn = document.getElementById('hb-scroll-right');
        
        const modalOverlay = document.getElementById('hb-modal-overlay');
        const modalClose = document.getElementById('hb-modal-close');
        const modalImg = document.getElementById('hb-modal-img');
        const modalBodyContent = document.getElementById('hb-modal-body-content');

        let allEvents = []; let activeCategory = 'all';

        // Formatage sans forcer l'UTC pour afficher l'heure française naturelle
        const dFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // Construction en heure LOCALE (française)
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
            const hours = date.getHours(); // Heure locale
            const minutes = date.getMinutes(); // Minutes locales
            if (hours === 0 && minutes === 0) return "";
            return minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`;
        }

        function formatEventDates(startDate, endDate, category) {
            let formattedStart = dFormatter.format(startDate);
            formattedStart = formattedStart.charAt(0).toUpperCase() + formattedStart.slice(1);
            const isExpo = category && (category.toLowerCase().trim() === 'exposition' || category.toLowerCase().trim() === 'expositions');

            if (isExpo && endDate && !isNaN(endDate.getTime())) {
                if (startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth()) return formattedStart;
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

        function getGroupedLocation(locStr) {
            if (!locStr) return "Médiathèque"; return locStr.split(',')[0].trim();
        }

        function getLiveStatusBadge(libType) {
            const now = new Date();
            const day = now.getDay();
            const time = now.getHours() + (now.getMinutes() / 60);
            let isOpen = false;

            if (libType === "gregoire") {
                if (day === 2 || day === 4 || day === 5) isOpen = (time >= 13 && time < 18.5);
                else if (day === 3) isOpen = (time >= 10 && time < 18.5);
                else if (day === 6) isOpen = (time >= 10 && time < 18);
            } 
            else if (libType === "genevoix") {
                if (day === 2 || day === 4 || day === 5) isOpen = (time >= 15 && time < 18);
                else if (day === 3 || day === 6) isOpen = ((time >= 10 && time < 13) || (time >= 14 && time < 18));
            } 
            else if (libType === "valland") {
                if (day === 3) isOpen = ((time >= 10 && time < 13) || (time >= 14 && time < 18.5));
                else if (day === 4 || day === 5) isOpen = (time >= 15 && time < 18.5);
                else if (day === 6) isOpen = ((time >= 10 && time < 13) || (time >= 14 && time < 18));
            }

            if (isOpen) {
                return `<span class="hb-status-badge hb-status-open" title="Vous pouvez appeler maintenant"><i class="fa fa-circle" style="font-size:8px;"></i> Ouvert</span>`;
            } else {
                return `<span class="hb-status-badge hb-status-closed" title="Le standard est actuellement fermé"><i class="fa fa-circle" style="font-size:8px;"></i> Fermé</span>`;
            }
        }

        function getLibraryContactInfo(locationStr) {
            const loc = (locationStr || "").toLowerCase();
            let libType = "gregoire";
            
            const hoursGregoire = "<strong>Mar, Jeu, Ven :</strong> 13h - 18h30<br><strong>Mercredi :</strong> 10h - 18h30<br><strong>Samedi :</strong> 10h - 18h";
            const hoursGenevoix = "<strong>Mar, Jeu, Ven :</strong> 15h - 18h<br><strong>Mercredi & Samedi :</strong> 10h - 13h / 14h - 18h";
            const hoursValland = "<strong>Mercredi :</strong> 10h - 13h / 14h - 18h30<br><strong>Jeu & Ven :</strong> 15h - 18h30<br><strong>Samedi :</strong> 10h - 13h / 14h - 18h";

            if (loc.includes("genevoix")) libType = "genevoix";
            else if (loc.includes("valland") || loc.includes("veuzain")) libType = "valland";

            const statusBadge = getLiveStatusBadge(libType);

            if (libType === "gregoire") return { name: "Bibliothèque Abbé-Grégoire", phone: "02 54 56 27 40", hours: hoursGregoire, badge: statusBadge };
            if (libType === "genevoix") return { name: "Médiathèque Maurice-Genevoix", phone: "02 54 43 31 13", hours: hoursGenevoix, badge: statusBadge };
            if (libType === "valland") return { name: "Médiathèque Rose-Valland", phone: "02 54 20 78 00", hours: hoursValland, badge: statusBadge };
        }

        async function loadAgendaData() {
            let response = null; let success = false; let data = [];
            try { response = await fetch(`${JSON_URL}?t=${new Date().getTime()}`); if (response.ok) { data = await response.json(); success = true; } } catch (e) {}
            if (!success) { try { response = await fetch(`https://corsproxy.io/?${encodeURIComponent(JSON_URL)}`); if (response.ok) { data = await response.json(); success = true; } } catch (err) {} }
            if (!success) { grid.innerHTML = `<div class="hb-error">Échec de synchronisation.</div>`; return; }
            allEvents = data; buildHashtags(); renderWidget();
        }

        function buildHashtags() {
            FEATURED_HASHTAGS.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'hb-hashtag-btn'; btn.dataset.cat = cat; btn.textContent = `# ${cat}`;
                hashtagsWrapper.appendChild(btn);
            });
            hashtagsWrapper.addEventListener('click', (e) => {
                const btn = e.target.closest('.hb-hashtag-btn');
                if (btn) {
                    document.querySelectorAll('.hb-hashtag-btn').forEach(b => b.classList.remove('hb-active'));
                    btn.classList.add('hb-active'); activeCategory = btn.dataset.cat; renderWidget();
                }
            });
        }

        function renderWidget() {
            grid.innerHTML = '';
            const today = new Date();
            const nowLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0);
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

            let events = allEvents.map((item, index) => {
                const startDate = buildLocalDate(item.Date_Debut, item.Heure);
                const endDate = item.Date_Fin ? buildLocalDate(item.Date_Fin, "18h") : startDate;
                const itemCat = item.Catégorie || item.Categorie || "Animation";
                return {
                    id: item.id || index, title: item.Titre || "Sans titre", link: item.Lien || MAIN_AGENDA_URL,
                    date: startDate, endDate: endDate, category: itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim(),
                    location: item.Localisation || "Médiathèque", ville: item.Ville || "",
                    description: item.Description || "", imageUrl: item.URL_de_l_image || null,
                    highlight: (String(item.A_la_Une || '').toUpperCase() === "TRUE" || String(item.Selection || '').toUpperCase() === "TRUE"),
                    reservation: item.Reservation === "TRUE"
                };
            }).filter(ev => {
                const isExpo = ev.category.toLowerCase().includes('exposition');
                return isExpo ? ev.endDate >= nowLocal : new Date(ev.date.getTime() + (60 * 60 * 1000)) >= nowLocal;
            });

            ctaBtn.innerHTML = `Voir nos ${events.length} animations <i class="fa fa-chevron-right"></i>`;
            if (activeCategory !== 'all') events = events.filter(ev => ev.category.toLowerCase().trim() === activeCategory.toLowerCase().trim());

            events.sort((a, b) => {
                const isAExpo = a.category.toLowerCase().includes('exposition');
                const isBExpo = b.category.toLowerCase().includes('exposition');
                if (isAExpo && !isBExpo) return 1; if (!isAExpo && isBExpo) return -1;
                return a.date - b.date;
            });

            if (events.length === 0) { grid.innerHTML = `<div class="hb-loading">Aucune animation.</div>`; return; }

            let displayedEvents = events.length > MAX_CARDS_DISPLAYED ? events.slice(0, MAX_CARDS_DISPLAYED) : events;

            displayedEvents.forEach(event => {
                const dateText = formatEventDates(event.date, event.endDate, event.category);
                const eventDateOnly = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), 0, 0, 0, 0);
                const diffDays = Math.round((eventDateOnly - todayStart) / 86400000);
                let relativeDateHtml = '';
                const isExpo = event.category.toLowerCase().includes('exposition');
                if (isExpo && event.date <= nowLocal && event.endDate >= nowLocal) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-calendar-check-o"></i> En cours</span>`;
                else if (diffDays === 0) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #ffebeb; color: #e11d48; border-color: #fecdd3;"><i class="fa fa-clock-o"></i> Aujourd'hui</span>`;
                else if (diffDays === 1) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #fff7ed; color: #ea580c; border-color: #ffedd5;"><i class="fa fa-calendar-o"></i> Demain</span>`;
                else if (diffDays > 1 && diffDays <= 30) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-hourglass-start"></i> Dans ${diffDays} j.</span>`;

                let resHtml = event.reservation ? `<span class="hb-meta-pill hb-pill-reservation"><i class="fa fa-ticket"></i> Inscription</span>` : `<span class="hb-meta-pill hb-pill-free"><i class="fa fa-check"></i> Entrée libre</span>`;

                grid.insertAdjacentHTML('beforeend', `
                    <div class="agenda-card format-tempsFortsPortail ${event.highlight ? 'hb-highlighted' : ''}" data-id="${event.id}">
                        <span class="agenda-card-tag">${event.category}</span>
                        ${event.highlight ? `<span class="hb-card-star"><i class="fa fa-star"></i> À la une</span>` : ''}
                        <div class="hb-image-wrapper">
                            <i class="fa fa-calendar hb-fallback-icon" style="${event.imageUrl ? 'display: none;' : 'display: block;'}"></i>
                            ${event.imageUrl ? `<img class="agenda-card-image" src="${event.imageUrl}" alt="${event.title}" onerror="this.previousElementSibling.style.display='block'; this.style.display='none';" />` : ''}
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
            });

            if (events.length > MAX_CARDS_DISPLAYED) {
                grid.insertAdjacentHTML('beforeend', `<a class="agenda-card hb-more-cta-card" href="${MAIN_AGENDA_URL}"><div class="hb-more-cta-icon-wrapper"><i class="fa fa-arrow-right"></i></div><h3 class="hb-more-cta-title">Voir plus</h3></a>`);
            }
            grid.scrollLeft = 0; setTimeout(updateScrollButtonsVisibility, 100);
        }

        function updateScrollButtonsVisibility() {
            scrollLeftBtn.classList.toggle('hb-disabled', grid.scrollLeft <= 5);
            scrollRightBtn.classList.toggle('hb-disabled', grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 5 || grid.scrollWidth <= grid.clientWidth);
        }
        scrollLeftBtn.addEventListener('click', () => grid.scrollBy({ left: -315, behavior: 'smooth' }));
        scrollRightBtn.addEventListener('click', () => grid.scrollBy({ left: 315, behavior: 'smooth' }));
        grid.addEventListener('scroll', updateScrollButtonsVisibility);

        function openDetailsModal(eventId) {
            const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId);
            if (!rawEvent) return;

            const startDate = buildLocalDate(rawEvent.Date_Debut, rawEvent.Heure);
            const endDate = rawEvent.Date_Fin ? buildLocalDate(rawEvent.Date_Fin, "18h") : startDate;
            const cleanCat = (rawEvent.Catégorie || rawEvent.Categorie || "Animation").charAt(0).toUpperCase() + (rawEvent.Catégorie || rawEvent.Categorie || "Animation").slice(1).toLowerCase().trim();
            const dateText = formatEventDates(startDate, endDate, cleanCat);
            let locText = rawEvent.Localisation || "Médiathèque";

            if (rawEvent.URL_de_l_image) { modalImg.src = rawEvent.URL_de_l_image; modalImg.style.display = 'block'; } 
            else { modalImg.style.display = 'none'; }

            let reservationModalHtml = '';
            if (rawEvent.Reservation === "TRUE") {
                const contact = getLibraryContactInfo(rawEvent.Localisation);
                
                reservationModalHtml = `
                <div class="hb-resa-box">
                    <div class="hb-resa-title"><i class="fa fa-ticket" style="color: var(--hb-accent); font-size: 16px;"></i> Inscription Obligatoire</div>
                    
                    <p class="hb-resa-subtitle" style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
                        <i class="fa fa-phone" style="color: var(--hb-muted);"></i> Appeler le <a href="tel:${contact.phone.replace(/\s/g, '')}" style="color: var(--hb-primary); font-weight: 800; text-decoration: none; border-bottom: 2px solid var(--hb-accent);">${contact.phone}</a>
                        ${contact.badge}
                    </p>
                    
                    <details class="hb-hours-details">
                        <summary class="hb-hours-summary"><i class="fa fa-info-circle"></i> Détail des horaires d'ouverture</summary>
                        <div class="hb-hours-content">${contact.hours}</div>
                    </details>
                    
                    <hr style="border: 0; height: 1px; background-color: #e5e7eb; margin: 15px 0;">

                    <p class="hb-resa-subtitle"><i class="fa fa-envelope-o" style="color: var(--hb-muted);"></i> Ou préparez votre e-mail de demande :</p>
                    
                    <div class="hb-form-grid" id="resa-email-form">
                        <input type="text" id="r-nom" class="hb-input" placeholder="Votre Nom*" required>
                        <input type="text" id="r-prenom" class="hb-input" placeholder="Votre Prénom*" required>
                        <input type="tel" id="r-tel" class="hb-input hb-form-full" placeholder="Numéro de téléphone">
                        <input type="email" id="r-mail" class="hb-input" placeholder="Adresse E-mail">
                        <div class="hb-form-full" style="display:flex; align-items:center; gap:10px;">
                            <label for="r-places" style="font-size: 13px; color: #4b5563;">Nombre de places :</label>
                            <input type="number" id="r-places" class="hb-input" style="width:80px;" min="1" value="1">
                        </div>
                        
                        <button type="button" id="btn-generate-mail" class="hb-btn-submit hb-form-full">
                            Créer mon e-mail <i class="fa fa-paper-plane" style="margin-left: 8px;"></i>
                        </button>
                    </div>
                    <div id="resa-error-msg" style="color: #991b1b; font-size: 11.5px; margin-top: 8px; font-weight: bold; display: none;">
                        <i class="fa fa-exclamation-circle"></i> Veuillez au moins remplir votre Nom et Prénom.
                    </div>
                </div>`;
            } else {
                reservationModalHtml = `<div class="hb-modal-meta-item" style="background-color: #f0fdf4; color: #166534; padding: 6px 12px; border-radius: 4px; border-left: 4px solid #4ade80; font-weight: bold; margin-top: 5px; font-size: 12px; text-transform: uppercase;"><i class="fa fa-check"></i> Entrée libre (Sans réservation)</div>`;
            }

            const shareUrl = encodeURIComponent(rawEvent.Lien || MAIN_AGENDA_URL);
            const shareTitle = encodeURIComponent(`À découvrir : ${rawEvent.Titre || "Animation"}`);
            const shareText = encodeURIComponent(`Découvrez cette animation dans vos médiathèques d'Agglopolys : ${rawEvent.Titre || "Animation"}`);

            // On injecte le HTML dans la modale - AJOUT de data-event-id sur le container
            modalBodyContent.innerHTML = `
                <span class="agenda-card-tag" style="position:static; display:inline-block; margin-bottom:12px;">${cleanCat}</span>
                <h3 class="hb-modal-title">${rawEvent.Titre || "Sans titre"}</h3>
                
                ${rawEvent.Description ? `<div class="hb-modal-desc">${rawEvent.Description}</div>` : ''}

                <div class="hb-modal-meta-list">
                    <div class="hb-modal-meta-item"><i class="fa fa-map-marker"></i> <strong>Lieu :</strong> ${locText}</div>
                    <div class="hb-modal-meta-item"><i class="fa fa-calendar"></i> <strong>Date :</strong> ${dateText}</div>
                    ${rawEvent.Heure ? `<div class="hb-modal-meta-item" style="background-color: #f3f4f6; padding: 6px 12px; border-radius: 4px; border-left: 4px solid var(--hb-accent); margin-top: 5px; font-weight: bold; color: var(--hb-primary);"><i class="fa fa-clock-o"></i> Horaires : ${rawEvent.Heure}</div>` : ''}
                    ${reservationModalHtml}
                </div>
                
                <div class="hb-modal-actions">
                    <div id="hb-share-panel" class="hb-share-panel">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="hb-social-btn hb-fb" title="Partager sur Facebook"><i class="fa fa-facebook"></i></a>
                        <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" class="hb-social-btn hb-wa" title="Partager sur WhatsApp"><i class="fa fa-whatsapp"></i></a>
                        <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" class="hb-social-btn hb-tw" title="Partager sur X (Twitter)"><i class="fa fa-twitter"></i></a>
                        <a href="mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${shareUrl}" class="hb-social-btn hb-em" title="Envoyer par E-mail"><i class="fa fa-envelope"></i></a>
                        <button id="hb-btn-copy-link" class="hb-social-btn hb-cp" title="Copier le lien"><i class="fa fa-link"></i></button>
                    </div>

                    <button id="hb-modal-ics" class="hb-btn-action hb-btn-calendar"><i class="fa fa-calendar-plus-o"></i> Rappel Agenda</button>
                    <button id="hb-modal-share" class="hb-btn-action hb-btn-share"><i class="fa fa-share-alt"></i> Partager</button>
                </div>
            `;
            
            // Mise à jour du conteneur parent avec l'ID de l'événement pour le récupérer lors de l'export .ics
            modalBodyContent.closest('.hb-modal-container').dataset.eventId = eventId;

            modalOverlay.classList.add('hb-active');

            // Gestion du bouton de partage
            const shareBtn = document.getElementById('hb-modal-share');
            const sharePanel = document.getElementById('hb-share-panel');
            if(shareBtn && sharePanel) {
                shareBtn.addEventListener('click', () => {
                    sharePanel.classList.toggle('hb-active');
                });
            }

            // Gestion du bouton copier le lien
            const copyBtn = document.getElementById('hb-btn-copy-link');
            if(copyBtn) {
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(rawEvent.Lien || MAIN_AGENDA_URL).then(() => {
                        copyBtn.innerHTML = '<i class="fa fa-check"></i>';
                        setTimeout(() => { copyBtn.innerHTML = '<i class="fa fa-link"></i>'; }, 2000);
                    });
                });
            }

            // Gestion formulaire réservation
            const btnGenerateMail = document.getElementById('btn-generate-mail');
            if (btnGenerateMail) {
                btnGenerateMail.addEventListener('click', () => {
                    const nom = document.getElementById('r-nom').value.trim();
                    const prenom = document.getElementById('r-prenom').value.trim();
                    const tel = document.getElementById('r-tel').value.trim();
                    const mail = document.getElementById('r-mail').value.trim();
                    const places = document.getElementById('r-places').value;
                    const errorMsg = document.getElementById('resa-error-msg');

                    if (!nom || !prenom) {
                        errorMsg.style.display = 'block';
                        return;
                    }
                    errorMsg.style.display = 'none';

                    const contact = getLibraryContactInfo(rawEvent.Localisation);
                    const subject = `Réservation : ${rawEvent.Titre}`;
                    let body = `Bonjour,%0A%0AJe souhaite réserver ${places} place(s) pour l'animation "${rawEvent.Titre}".%0A%0A`;
                    body += `Mes coordonnées :%0A`;
                    body += `Nom : ${nom}%0A`;
                    body += `Prénom : ${prenom}%0A`;
                    if (tel) body += `Téléphone : ${tel}%0A`;
                    if (mail) body += `Email : ${mail}%0A`;
                    body += `%0AMerci d'avance.`;

                    window.location.href = `mailto:${contact.name.replace(/\s/g, '.').toLowerCase()}@agglopolys.fr?subject=${encodeURIComponent(subject)}&body=${body}`;
                });
            }
        }

        // Fermeture modale
        modalClose.addEventListener('click', () => modalOverlay.classList.remove('hb-active'));
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('hb-active'); });

        // Clic sur les cartes
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.agenda-card');
            if (card && card.dataset.id && !card.classList.contains('hb-more-cta-card')) {
                openDetailsModal(parseInt(card.dataset.id));
            }
        });

        // --- FONCTION D'EXPORT .ICS CORRIGÉE POUR L'HEURE FRANÇAISE ---
        function generateICS(rawEvent) {
            // 1. On crée la date en heure locale (française)
            const startDate = buildLocalDate(rawEvent.Date_Debut, rawEvent.Heure);
            // Par défaut, l'événement dure 1h si pas de date de fin explicite
            const endDate = rawEvent.Date_Fin ? buildLocalDate(rawEvent.Date_Fin, rawEvent.Heure || "18h00") : new Date(startDate.getTime() + 3600000);

            // 2. Le format ICS EXIGE du temps UTC absolu identifié par un Z à la fin.
            // toISOString() convertit parfaitement notre heure locale (Paris) en heure UTC vraie.
            const formatICSDate = (date) => {
                return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
            };

            const dtStart = formatICSDate(startDate);
            const dtEnd = formatICSDate(endDate);

            // 3. Nettoyage des textes pour le format ICS
            const title = (rawEvent.Titre || "Animation").replace(/,/g, '\\,');
            const desc = (rawEvent.Description || "").replace(/<[^>]*>?/gm, '').replace(/,/g, '\\,').replace(/\n/g, '\\n');
            const location = (rawEvent.Localisation || "Médiathèque").replace(/,/g, '\\,');
            const url = rawEvent.Lien || MAIN_AGENDA_URL;

            // 4. Génération du fichier
            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Agglopolys//FR',
                'BEGIN:VEVENT',
                `DTSTART:${dtStart}`,
                `DTEND:${dtEnd}`,
                `SUMMARY:${title}`,
                `DESCRIPTION:${desc}`,
                `LOCATION:${location}`,
                `URL;VALUE=URI:${url}`,
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `evenement.ics`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Écouteur global pour le bouton d'export ICS
        document.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'hb-modal-ics') {
                const modalContainer = document.querySelector('.hb-modal-container');
                const eventId = parseInt(modalContainer.dataset.eventId);
                const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId);
                if (rawEvent) generateICS(rawEvent);
            }
        });

        // Chargement initial
        loadAgendaData();
    });
    //]]>
