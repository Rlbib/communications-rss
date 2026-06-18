document.addEventListener('DOMContentLoaded', () => {
    const JSON_URL = "https://rlbib.github.io/communications-rss/agenda.json";
    const MAIN_AGENDA_URL = "https://bibliotheques.agglopolys.fr/agenda"; 

    const grid = document.getElementById('hb-events-grid');
    const searchBox = document.getElementById('hb-search-box');
    const dateTabs = document.querySelectorAll('.hb-tab-btn');
    const resultsCounter = document.getElementById('hb-results-counter');
    const activeFiltersBar = document.getElementById('hb-active-filters');
    const modalOverlay = document.getElementById('hb-modal-overlay');
    const modalClose = document.getElementById('hb-modal-close');
    const modalImg = document.getElementById('hb-modal-img');
    const modalBodyContent = document.getElementById('hb-modal-body-content');

    let allEvents = []; 
    let currentDateFilter = 'all';
    let currentLocationFilter = 'all';
    let currentCategoryFilter = 'all';

    const dFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

    // ==========================================
    // INITIALISATION URL & UI
    // ==========================================
    function loadInitialState() {
        const params = new URLSearchParams(window.location.search);
        if(params.has('q')) searchBox.value = params.get('q');
        if(params.has('lieu')) currentLocationFilter = params.get('lieu');
        if(params.has('cat')) currentCategoryFilter = params.get('cat');
        if(params.has('date')) currentDateFilter = params.get('date');

        if(currentLocationFilter !== 'all') {
            const activeLieuLi = document.querySelector(`#hb-location-dropdown li[data-value="${currentLocationFilter}"]`);
            if(activeLieuLi) {
                document.querySelector('#hb-location-dropdown .hb-dropdown-text').textContent = activeLieuLi.querySelector('a').textContent;
                document.querySelectorAll('#hb-location-dropdown li').forEach(li => li.classList.remove('active'));
                activeLieuLi.classList.add('active');
            }
        }
        if(currentCategoryFilter !== 'all') {
            const activeCatLi = document.querySelector(`#hb-category-dropdown li[data-value="${currentCategoryFilter}"]`);
            if(activeCatLi) {
                document.querySelector('#hb-category-dropdown .hb-dropdown-text').textContent = activeCatLi.querySelector('a').textContent;
                document.querySelectorAll('#hb-category-dropdown li').forEach(li => li.classList.remove('active'));
                activeCatLi.classList.add('active');
            }
        }
        dateTabs.forEach(btn => { btn.classList.remove('hb-active'); if(btn.dataset.date === currentDateFilter) btn.classList.add('hb-active'); });
    }

    function updateURL() {
        const params = new URLSearchParams();
        if(searchBox.value.trim()) params.set('q', searchBox.value.trim());
        if(currentLocationFilter !== 'all') params.set('lieu', currentLocationFilter);
        if(currentCategoryFilter !== 'all') params.set('cat', currentCategoryFilter);
        if(currentDateFilter !== 'all') params.set('date', currentDateFilter);
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        history.replaceState(null, '', newUrl);
    }

    // ==========================================
    // OUTILS DE FORMATAGE ET PARSING
    // ==========================================
    function buildUTCDate(dateStr, heureStr) { if (!dateStr) return null; const parts = dateStr.split('-'); if (parts.length === 3) { let hours = 0, minutes = 0; if (heureStr) { const match = heureStr.match(/(\d{1,2})[h:](\d{2})?/i); if (match) { hours = parseInt(match[1], 10); minutes = match[2] ? parseInt(match[2], 10) : 0; } } return new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), hours, minutes, 0, 0)); } return new Date(dateStr); }
    function formatTime(date) { if (!date || isNaN(date.getTime())) return ""; const hours = date.getUTCHours(); const minutes = date.getUTCMinutes(); if (hours === 0 && minutes === 0) return ""; return minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`; }
    function formatEventDates(startDate, endDate, category) { let formattedStart = dFormatter.format(startDate); formattedStart = formattedStart.charAt(0).toUpperCase() + formattedStart.slice(1); const isExpo = category && (category.toLowerCase().trim() === 'exposition' || category.toLowerCase().trim() === 'expositions'); if (isExpo && endDate && !isNaN(endDate.getTime())) { if (startDate.getUTCDate() === endDate.getUTCDate() && startDate.getUTCMonth() === endDate.getUTCMonth()) return formattedStart; let formattedEnd = dFormatter.format(endDate); formattedEnd = formattedEnd.charAt(0).toUpperCase() + formattedEnd.slice(1); if (startDate.getUTCFullYear() === endDate.getUTCFullYear()) { return "Du " + formattedStart.replace(new RegExp('\\s+' + startDate.getUTCFullYear() + '$'), '') + " au " + formattedEnd; } return "Du " + formattedStart + " au " + formattedEnd; } const timeStr = formatTime(startDate); return "Le " + formattedStart + (timeStr ? ` <span class="hb-time-highlight"><i class="fa fa-clock-o"></i> ${timeStr}</span>` : ""); }
    function getGroupedLocation(locStr) { if (!locStr) return "Autres structures"; const lower = locStr.toLowerCase(); if (lower.includes("abbé-grégoire") || lower.includes("abbé gregoire") || lower.includes("abbé")) return "Bibliothèque Abbé-Grégoire"; if (lower.includes("maurice-genevoix") || lower.includes("genevoix")) return "Médiathèque Maurice-Genevoix"; if (lower.includes("rose-valland") || lower.includes("valland")) return "Bibliothèque Rose-Valland"; return "Autres structures"; }
    
    function getLiveStatusBadge(libType) { const now = new Date(); const day = now.getDay(); const time = now.getHours() + (now.getMinutes() / 60); let isOpen = false; if (libType === "gregoire") { if ((day===2||day===4||day===5) && time >= 13 && time < 18.5) isOpen=true; else if (day===3 && time >= 10 && time < 18.5) isOpen=true; else if (day===6 && time >= 10 && time < 18) isOpen=true; } else if (libType === "genevoix") { if ((day===2||day===4||day===5) && time >= 15 && time < 18) isOpen=true; else if ((day===3||day===6) && ((time >= 10 && time < 13) || (time >= 14 && time < 18))) isOpen=true; } else if (libType === "valland") { if (day===3 && ((time >= 10 && time < 13) || (time >= 14 && time < 18.5))) isOpen=true; else if ((day===4||day===5) && time >= 15 && time < 18.5) isOpen=true; else if (day===6 && ((time >= 10 && time < 13) || (time >= 14 && time < 18))) isOpen=true; } return isOpen ? `<span class="hb-status-badge hb-status-open"><i class="fa fa-circle" style="font-size:8px;"></i> Ouvert</span>` : `<span class="hb-status-badge hb-status-closed"><i class="fa fa-circle" style="font-size:8px;"></i> Fermé</span>`; }
    
    function getLibraryContactInfo(locationStr) { const loc = (locationStr || "").toLowerCase(); let libType = "gregoire"; const hoursGregoire = "<strong>Mar, Jeu, Ven :</strong> 13h - 18h30<br><strong>Mercredi :</strong> 10h - 18h30<br><strong>Samedi :</strong> 10h - 18h"; const hoursGenevoix = "<strong>Mar, Jeu, Ven :</strong> 15h - 18h<br><strong>Mercredi & Samedi :</strong> 10h - 13h / 14h - 18h"; const hoursValland = "<strong>Mercredi :</strong> 10h - 13h / 14h - 18h30<br><strong>Jeu & Ven :</strong> 15h - 18h30<br><strong>Samedi :</strong> 10h - 13h / 14h - 18h"; if (loc.includes("genevoix")) libType = "genevoix"; else if (loc.includes("valland") || loc.includes("veuzain")) libType = "valland"; const statusBadge = getLiveStatusBadge(libType); if (libType === "genevoix") return { name: "Médiathèque Maurice-Genevoix", phone: "02 54 43 31 13", hours: hoursGenevoix, badge: statusBadge, email: "bibliotheques@agglopolys.fr" }; if (libType === "valland") return { name: "Médiathèque Rose-Valland", phone: "02 54 20 78 00", hours: hoursValland, badge: statusBadge, email: "bibliotheques@agglopolys.fr" }; return { name: "Bibliothèque Abbé-Grégoire", phone: "02 54 56 27 40", hours: hoursGregoire, badge: statusBadge, email: "bibliotheques@agglopolys.fr" }; }

    async function loadAgendaData() { let response = null; let success = false; let data = []; try { response = await fetch(`${JSON_URL}?t=${new Date().getTime()}`); if (response.ok) { data = await response.json(); success = true; } } catch (e) {} if (!success) { try { response = await fetch(`https://corsproxy.io/?${encodeURIComponent(JSON_URL)}`); if (response.ok) { data = await response.json(); success = true; } } catch (err) {} } if (!success) { grid.innerHTML = `<div class="hb-error"><i class="fa fa-exclamation-triangle"></i> Échec du chargement.</div>`; resultsCounter.textContent = "0 animation trouvée"; return; } allEvents = data; buildCategoryDropdown(); renderAgenda(); }
    
    function buildCategoryDropdown() { 
        const categories = new Set(); const catMenu = document.getElementById('hb-cat-menu');
        allEvents.forEach(ev => { const itemCat = ev.Catégorie || ev.Categorie; if (itemCat) categories.add(itemCat.charAt(0).toUpperCase() + itemCat.slice(1).toLowerCase().trim()); }); 
        Array.from(categories).sort().forEach(cat => { const li = document.createElement('li'); li.dataset.value = cat; li.innerHTML = `<a href="#">🏷️ ${cat}</a>`; catMenu.appendChild(li); }); 
        bindDropdowns(); 
    }

    // ==========================================
    // MOTEUR DE RENDU HYBRIDE
    // ==========================================
    function renderAgenda() {
        grid.innerHTML = '';
        const today = new Date(); const nowLocalAsUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0)); const todayLocalAsUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));
        let events = allEvents.map((item, index) => { const startDate = buildUTCDate(item.Date_Debut, item.Heure); const endDate = item.Date_Fin ? buildUTCDate(item.Date_Fin, "18h") : startDate; const cleanCat = (item.Catégorie || item.Categorie || "Animation").charAt(0).toUpperCase() + (item.Catégorie || item.Categorie || "Animation").slice(1).toLowerCase().trim(); return { id: item.id || index, title: item.Titre || "Sans titre", link: item.Lien || "", date: startDate, endDate: endDate, category: cleanCat, location: item.Localisation || "Médiathèque", ville: item.Ville || "", description: item.Description || "", imageUrl: item.URL_de_l_image || null, duration: (item.Durée || item.Duree || "").trim(), targetAudience: (item.Public_cible || "").trim(), time: (item.Heure || "").trim(), highlight: (String(item.A_la_Une || '').toUpperCase() === "TRUE" || String(item.Selection || '').toUpperCase() === "TRUE"), reservation: item.Reservation === "TRUE" }; }).filter(ev => { const isExpo = ev.category.toLowerCase().includes('exposition'); return isExpo ? ev.endDate >= todayLocalAsUTC : new Date(ev.date.getTime() + (60 * 60 * 1000)) >= nowLocalAsUTC; });

        const q = searchBox.value.toLowerCase().trim(); if (q) events = events.filter(ev => (ev.title||'').toLowerCase().includes(q) || (ev.description||'').toLowerCase().includes(q) || (ev.location||'').toLowerCase().includes(q));
        if (currentLocationFilter !== 'all') events = events.filter(ev => getGroupedLocation(ev.location) === currentLocationFilter);
        if (currentCategoryFilter !== 'all') events = events.filter(ev => ev.category === currentCategoryFilter);
        if (currentDateFilter !== 'all') { events = events.filter(ev => { const isExpo = ev.category.toLowerCase().includes('exposition'); const isOngoing = isExpo && ev.date <= todayLocalAsUTC && ev.endDate >= nowLocalAsUTC; if (isOngoing && (currentDateFilter==='today'||currentDateFilter==='week'||currentDateFilter==='month')) return true; if (currentDateFilter === 'today') return ev.date.getUTCDate() === todayLocalAsUTC.getUTCDate() && ev.date.getUTCMonth() === todayLocalAsUTC.getUTCMonth(); if (currentDateFilter === 'weekend') { const dayOfWeek = todayLocalAsUTC.getUTCDay(); const saturday = new Date(todayLocalAsUTC); saturday.setUTCDate(todayLocalAsUTC.getUTCDate() + (dayOfWeek === 0 ? -1 : 6 - dayOfWeek)); const sunday = new Date(todayLocalAsUTC); sunday.setUTCDate(todayLocalAsUTC.getUTCDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek)); return (ev.date.getUTCDate() === saturday.getUTCDate() && ev.date.getUTCMonth() === saturday.getUTCMonth()) || (ev.date.getUTCDate() === sunday.getUTCDate() && ev.date.getUTCMonth() === sunday.getUTCMonth()); } if (currentDateFilter === 'week') { const endOfWeek = new Date(todayLocalAsUTC); endOfWeek.setUTCDate(todayLocalAsUTC.getUTCDate() + 7); return ev.date >= todayLocalAsUTC && ev.date <= endOfWeek; } if (currentDateFilter === 'month') return ev.date.getUTCMonth() === todayLocalAsUTC.getUTCMonth() && ev.date.getUTCFullYear() === todayLocalAsUTC.getUTCFullYear(); return true; }); }

        updateTabCounts(events, todayLocalAsUTC, nowLocalAsUTC);
        renderChips();

        let ongoingExpos = []; let imminentEvents = []; let laterEvents = [];
        const DAYS_THRESHOLD = 14; const months = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEP", "OCT", "NOV", "DÉC"];

        events.forEach(ev => { const isExpo = ev.category.toLowerCase().includes('exposition'); const isOngoing = isExpo && ev.date <= nowLocalAsUTC && ev.endDate >= nowLocalAsUTC; const eventDateOnly = new Date(Date.UTC(ev.date.getUTCFullYear(), ev.date.getUTCMonth(), ev.date.getUTCDate(), 0, 0, 0, 0)); const diffDays = Math.round((eventDateOnly - todayLocalAsUTC) / (1000 * 60 * 60 * 24)); if (isOngoing) ongoingExpos.push({event: ev, diffDays: diffDays}); else if (diffDays <= DAYS_THRESHOLD) imminentEvents.push({event: ev, diffDays: diffDays}); else laterEvents.push({event: ev, diffDays: diffDays}); });
        imminentEvents.sort((a, b) => a.event.date - b.event.date); ongoingExpos.sort((a, b) => b.event.endDate - a.event.endDate); laterEvents.sort((a, b) => a.event.date - b.event.date);
        resultsCounter.innerHTML = `<i class="fa fa-list-ul"></i> ${events.length} animation${events.length > 1 ? 's' : ''} correspond${events.length > 1 ? 'ent' : ''} à vos critères`;
        if (events.length === 0) { grid.innerHTML = `<div class="hb-no-results"><i class="fa fa-search-minus"></i> Oups, aucune animation ne correspond à vos critères.</div>`; return; }

        if (imminentEvents.length > 0) { imminentEvents.forEach(({event, diffDays}) => { const dateText = formatEventDates(event.date, event.endDate, event.category); let relativeDateHtml = ''; if (diffDays === 0) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #ffebeb; color: #e11d48; border-color: #fecdd3;"><i class="fa fa-clock-o"></i> Aujourd'hui</span>`; else if (diffDays === 1) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown" style="background-color: #fff7ed; color: #ea580c; border-color: #ffedd5;"><i class="fa fa-calendar-o"></i> Demain</span>`; else if (diffDays > 1 && diffDays <= 30) relativeDateHtml = `<span class="hb-meta-pill hb-pill-countdown"><i class="fa fa-hourglass-start"></i> Dans ${diffDays} j.</span>`; let resHtml = event.reservation ? `<span class="hb-meta-pill hb-pill-reservation"><i class="fa fa-ticket"></i> Inscription</span>` : `<span class="hb-meta-pill hb-pill-free"><i class="fa fa-check"></i> Entrée libre</span>`; const locDisplay = event.location.includes(event.ville) ? event.location : (event.ville ? `${event.location}, ${event.ville}` : event.location); grid.insertAdjacentHTML('beforeend', `<div class="agenda-card ${event.highlight ? 'hb-highlighted' : ''}" data-id="${event.id}"><span class="agenda-card-tag">${event.category}</span>${event.highlight ? `<span class="hb-card-star"><i class="fa fa-star"></i> À la une</span>` : ''}<div class="hb-image-wrapper"><i class="fa fa-calendar hb-fallback-icon" style="${event.imageUrl ? 'display: none;' : 'display: block;'}"></i>${event.imageUrl ? `<img class="agenda-card-image" src="${event.imageUrl}" alt="${event.title}" onerror="this.previousElementSibling.style.display='block'; this.style.display='none';" />` : ''}</div><div class="agenda-card-details"><div class="title-wrapper"><h3 class="agenda-card-title-simple">${event.title}</h3></div><div class="hb-card-meta-inline">${relativeDateHtml} ${resHtml}</div><div class="agenda-card-dateloc-block"><hr class="agenda-card-separator-custom" /><p class="agenda-card-date">${dateText}</p><p class="agenda-card-location"><i class="fa fa-map-marker"></i> ${locDisplay}</p></div></div></div>`); }); }
        if (ongoingExpos.length > 0) { grid.insertAdjacentHTML('beforeend', `<div class="hb-section-title"><i class="fa fa-paint-brush"></i> Expositions en cours</div>`); ongoingExpos.forEach(({event}) => { const dateText = formatEventDates(event.date, event.endDate, event.category); const locDisplay = event.location.includes(event.ville) ? event.location : (event.ville ? `${event.location}, ${event.ville}` : event.location); grid.insertAdjacentHTML('beforeend', `<div class="hb-ongoing-card" data-id="${event.id}">${event.imageUrl ? `<img class="hb-ongoing-img" src="${event.imageUrl}" alt="${event.title}" />` : `<div class="hb-ongoing-img" style="display:flex;align-items:center;justify-content:center;"><i class="fa fa-image" style="font-size:40px; color:#6b7280; opacity:0.3;"></i></div>`}<div class="hb-ongoing-content"><div class="hb-ongoing-badge"><i class="fa fa-circle" style="font-size:8px;"></i> En cours actuellement</div><h3 class="hb-ongoing-title">${event.title}</h3><p class="hb-ongoing-meta"><span><i class="fa fa-calendar"></i> ${dateText}</span><span><i class="fa fa-map-marker"></i> ${locDisplay}</span>${event.reservation ? `<span><i class="fa fa-ticket"></i> Sur inscription</span>` : `<span><i class="fa fa-check"></i> Entrée libre</span>`}</p></div></div>`); }); }
        if (laterEvents.length > 0) { grid.insertAdjacentHTML('beforeend', `<div class="hb-section-title"><i class="fa fa-clock-o"></i> A venir plus tard</div>`); laterEvents.forEach(({event}) => { const dayNum = event.date.getUTCDate(); const monthStr = months[event.date.getUTCMonth()]; const yearStr = event.date.getUTCFullYear() > todayLocalAsUTC.getUTCFullYear() ? event.date.getUTCFullYear() : ''; const locDisplay = event.location.includes(event.ville) ? event.location : (event.ville ? `${event.location}, ${event.ville}` : event.location); grid.insertAdjacentHTML('beforeend', `<div class="agenda-list-item" data-id="${event.id}"><div class="hb-list-date-badge"><span class="hb-list-day">${dayNum}</span><span class="hb-list-month">${monthStr}</span>${yearStr ? `<span class="hb-list-year">${yearStr}</span>` : ''}</div><div class="hb-list-content"><h4 class="hb-list-title">${event.title}</h4><p class="hb-list-meta"><span class="hb-list-tag">${event.category}</span><span><i class="fa fa-map-marker" style="color: var(--hb-accent);"></i> ${locDisplay}</span></p></div><div class="hb-list-action"><button class="hb-list-ics-btn" data-id="${event.id}" title="Ajouter à mon agenda"><i class="fa fa-calendar-plus-o"></i> Rappel</button></div></div>`); }); }
        
        updateURL();
    }

    function updateTabCounts(events, todayLocalAsUTC, nowLocalAsUTC) {
        const countFor = (filterType) => {
            return events.filter(ev => { if(filterType === 'all') return true; const isExpo = ev.category.toLowerCase().includes('exposition'); const isOngoing = isExpo && ev.date <= nowLocalAsUTC && ev.endDate >= nowLocalAsUTC; if (isOngoing && (filterType==='today'||filterType==='week'||filterType==='month')) return true; if (filterType === 'today') return ev.date.getUTCDate() === todayLocalAsUTC.getUTCDate() && ev.date.getUTCMonth() === todayLocalAsUTC.getUTCMonth(); if (filterType === 'weekend') { const dayOfWeek = todayLocalAsUTC.getUTCDay(); const saturday = new Date(todayLocalAsUTC); saturday.setUTCDate(todayLocalAsUTC.getUTCDate() + (dayOfWeek === 0 ? -1 : 6 - dayOfWeek)); const sunday = new Date(todayLocalAsUTC); sunday.setUTCDate(todayLocalAsUTC.getUTCDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek)); return (ev.date.getUTCDate() === saturday.getUTCDate() && ev.date.getUTCMonth() === saturday.getUTCMonth()) || (ev.date.getUTCDate() === sunday.getUTCDate() && ev.date.getUTCMonth() === sunday.getUTCMonth()); } if (filterType === 'week') { const endOfWeek = new Date(todayLocalAsUTC); endOfWeek.setUTCDate(todayLocalAsUTC.getUTCDate() + 7); return ev.date >= todayLocalAsUTC && ev.date <= endOfWeek; } if (filterType === 'month') return ev.date.getUTCMonth() === todayLocalAsUTC.getUTCMonth() && ev.date.getUTCFullYear() === todayLocalAsUTC.getUTCFullYear(); return true; }).length;
        };
        dateTabs.forEach(btn => { const type = btn.dataset.date; const count = countFor(type); btn.querySelector('.hb-tab-count').textContent = count; if(count === 0 && type !== 'all') btn.classList.add('hb-zero'); else btn.classList.remove('hb-zero'); });
    }

    function renderChips() {
        activeFiltersBar.innerHTML = ''; let hasFilter = false;
        const addChip = (text, type) => { hasFilter = true; activeFiltersBar.insertAdjacentHTML('beforeend', `<span class="hb-chip">${text} <i class="fa fa-times" data-type="${type}"></i></span>`); };
        if(searchBox.value.trim()) addChip(`Recherche : "${searchBox.value.trim()}"`, 'q');
        if(currentLocationFilter !== 'all') {
            const lieuli = document.querySelector(`#hb-location-dropdown li[data-value="${currentLocationFilter}"]`);
            if(lieuli) addChip(lieuli.querySelector('a').textContent, 'lieu');
        }
        if(currentCategoryFilter !== 'all') {
            const catli = document.querySelector(`#hb-category-dropdown li[data-value="${currentCategoryFilter}"]`);
            if(catli) addChip(catli.querySelector('a').textContent, 'cat');
        }
        if(currentDateFilter !== 'all') addChip(document.querySelector(`.hb-tab-btn[data-date="${currentDateFilter}"]`).textContent.trim().split(' ')[0], 'date');
        if(hasFilter) { activeFiltersBar.insertAdjacentHTML('beforeend', `<button class="hb-clear-all">Tout effacer</button>`); }
    }

    // ==========================================
    // GESTION DES EVENEMENTS
    // ==========================================
    dateTabs.forEach(btn => { btn.addEventListener('click', () => { if(btn.classList.contains('hb-zero')) return; dateTabs.forEach(b => b.classList.remove('hb-active')); btn.classList.add('hb-active'); currentDateFilter = btn.dataset.date; renderAgenda(); }); });
    searchBox.addEventListener('input', renderAgenda);
    
    function bindDropdowns() {
        document.querySelectorAll('.hb-dropdown-wrapper').forEach(wrapper => {
            const toggle = wrapper.querySelector('.hb-dropdown-toggle'); const menu = wrapper.querySelector('.hb-dropdown-menu');
            toggle.addEventListener('click', (e) => { e.stopPropagation(); document.querySelectorAll('.hb-dropdown-wrapper.open').forEach(w => { if(w !== wrapper) w.classList.remove('open'); }); wrapper.classList.toggle('open'); });
            menu.querySelectorAll('li').forEach(li => { li.addEventListener('click', (e) => { e.preventDefault(); const val = li.dataset.value; const text = li.querySelector('a').textContent; wrapper.querySelector('.hb-dropdown-text').textContent = text; menu.querySelectorAll('li').forEach(l => l.classList.remove('active')); li.classList.add('active'); wrapper.classList.remove('open'); if(wrapper.id === 'hb-location-dropdown') currentLocationFilter = val; if(wrapper.id === 'hb-category-dropdown') currentCategoryFilter = val; renderAgenda(); }); });
        });
        document.addEventListener('click', () => { document.querySelectorAll('.hb-dropdown-wrapper.open').forEach(w => w.classList.remove('open')); });
    }

    activeFiltersBar.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-times')) { 
            const type = e.target.dataset.type; 
            if(type === 'q') searchBox.value = ''; 
            if(type === 'lieu') { currentLocationFilter = 'all'; document.querySelector('#hb-location-dropdown .hb-dropdown-text').textContent = "📍 Tous les lieux"; document.querySelectorAll('#hb-location-dropdown li').forEach(l => l.classList.remove('active')); document.querySelector('#hb-location-dropdown li[data-value="all"]').classList.add('active'); } 
            if(type === 'cat') { currentCategoryFilter = 'all'; document.querySelector('#hb-category-dropdown .hb-dropdown-text').textContent = "🏷️ Toutes les rubriques"; document.querySelectorAll('#hb-category-dropdown li').forEach(l => l.classList.remove('active')); document.querySelector('#hb-category-dropdown li[data-value="all"]').classList.add('active'); } 
            if(type === 'date') { currentDateFilter = 'all'; dateTabs.forEach(b => b.classList.remove('hb-active')); document.querySelector('.hb-tab-btn[data-date="all"]').classList.add('hb-active'); } 
            renderAgenda(); 
        }
        if(e.target.classList.contains('hb-clear-all')) { 
            searchBox.value = ''; currentLocationFilter = 'all'; currentCategoryFilter = 'all'; currentDateFilter = 'all'; 
            document.querySelector('#hb-location-dropdown .hb-dropdown-text').textContent = "📍 Tous les lieux"; document.querySelectorAll('#hb-location-dropdown li').forEach(l => l.classList.remove('active')); document.querySelector('#hb-location-dropdown li[data-value="all"]').classList.add('active');
            document.querySelector('#hb-category-dropdown .hb-dropdown-text').textContent = "🏷️ Toutes les rubriques"; document.querySelectorAll('#hb-category-dropdown li').forEach(l => l.classList.remove('active')); document.querySelector('#hb-category-dropdown li[data-value="all"]').classList.add('active');
            dateTabs.forEach(b => b.classList.remove('hb-active')); document.querySelector('.hb-tab-btn[data-date="all"]').classList.add('hb-active'); 
            renderAgenda(); 
        }
    });

    grid.addEventListener('click', (e) => { const icsBtn = e.target.closest('.hb-list-ics-btn'); if (icsBtn) { e.stopPropagation(); downloadICS(parseInt(icsBtn.dataset.id, 10)); return; } const target = e.target.closest('.agenda-card, .agenda-list-item, .hb-ongoing-card'); if (target) { e.preventDefault(); openDetailsModal(parseInt(target.dataset.id, 10)); } });

    // CORRECTION ICS : Fuseau horaire local (sans Z)
    function downloadICS(eventId) { 
        const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId); 
        if (!rawEvent) return; 
        
        const startDate = buildUTCDate(rawEvent.Date_Debut, rawEvent.Heure); 
        const endDate = rawEvent.Date_Fin ? buildUTCDate(rawEvent.Date_Fin, "18h") : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); 
        
        // On retire le Z final pour que l'heure soit considérée comme locale
        const formatDateICS = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0]; 
        
        const cleanCat = (rawEvent.Catégorie || rawEvent.Categorie || "Animation"); 
        const locText = (rawEvent.Localisation || "Médiathèque") + (rawEvent.Ville ? `, ${rawEvent.Ville}` : ''); 
        
        const ics = [
            "BEGIN:VCALENDAR", 
            "VERSION:2.0", 
            "PRODID:-//Agglopolys//AgendaComplet//FR", 
            "BEGIN:VEVENT", 
            `UID:ev-${eventId}-${new Date().getTime()}@agglopolys.fr`, 
            `DTSTAMP:${formatDateICS(new Date())}Z`, // Le stamp de création reste en UTC
            `DTSTART;VALUE=DATE-TIME:${formatDateICS(startDate)}`, // Heure locale
            `DTEND;VALUE=DATE-TIME:${formatDateICS(endDate)}`, // Heure locale
            `SUMMARY:[${cleanCat.toUpperCase()}] ${rawEvent.Titre}`, 
            `LOCATION:${locText.replace(/,/g, "\\,")}`, 
            `DESCRIPTION:${(rawEvent.Description || '').substring(0, 300).replace(/\n/g, "\\n")}`, 
            "END:VEVENT", "END:VCALENDAR"
        ].join("\r\n"); 
        
        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8;" }); 
        const link = document.createElement("a"); 
        link.href = URL.createObjectURL(blob); 
        link.setAttribute("download", `${(rawEvent.Titre || "event").toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`); 
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
    }

    function openDetailsModal(eventId) { 
        const rawEvent = allEvents.find(ev => (ev.id !== undefined ? ev.id : allEvents.indexOf(ev)) === eventId); 
        if (!rawEvent) return;
        const startDate = buildUTCDate(rawEvent.Date_Debut, rawEvent.Heure); const endDate = rawEvent.Date_Fin ? buildUTCDate(rawEvent.Date_Fin, "18h") : startDate;
        const cleanCat = (rawEvent.Catégorie || rawEvent.Categorie || "Animation").charAt(0).toUpperCase() + (rawEvent.Catégorie || rawEvent.Categorie || "Animation").slice(1).toLowerCase().trim();
        const dateText = formatEventDates(startDate, endDate, cleanCat); let locText = rawEvent.Localisation || "Médiathèque"; if (rawEvent.Ville) locText += `, ${rawEvent.Ville}`;
        if (rawEvent.URL_de_l_image) { modalImg.src = rawEvent.URL_de_l_image; modalImg.style.display = 'block'; } else { modalImg.style.display = 'none'; } 
        
        // Récupération sécurisée du public cible dans le JSON
        const publicCible = (rawEvent.Public_cible || rawEvent.Public || rawEvent["Public cible"] || rawEvent["Public_Cible"] || "").trim();

        let reservationModalHtml = '';
        if (rawEvent.Reservation === "TRUE") { 
            const contact = getLibraryContactInfo(rawEvent.Localisation); 
            reservationModalHtml = `<div class="hb-resa-box"><div class="hb-resa-title"><i class="fa fa-ticket" style="color: var(--hb-accent); font-size: 16px;"></i> Inscription Obligatoire</div><p class="hb-resa-subtitle" style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;"><i class="fa fa-phone" style="color: var(--hb-muted);"></i> Appeler le <a href="tel:${contact.phone.replace(/\s/g, '')}" style="color: var(--hb-primary); font-weight: 800; text-decoration: none; border-bottom: 2px solid var(--hb-accent);">${contact.phone}</a> ${contact.badge}</p><details class="hb-hours-details"><summary class="hb-hours-summary"><i class="fa fa-info-circle"></i> Détail des horaires d'ouverture</summary><div class="hb-hours-content">${contact.hours}</div></details><hr style="border: 0; height: 1px; background-color: #e5e7eb; margin: 15px 0;"><p class="hb-resa-subtitle"><i class="fa fa-envelope-o" style="color: var(--hb-muted);"></i> Ou préparez votre e-mail de demande :</p><div class="hb-form-grid" id="resa-email-form"><input type="text" id="r-nom" class="hb-input" placeholder="Votre Nom*" required><input type="text" id="r-prenom" class="hb-input" placeholder="Votre Prénom*" required><input type="tel" id="r-tel" class="hb-input hb-form-full" placeholder="Numéro de téléphone"><input type="email" id="r-mail" class="hb-input" placeholder="Adresse E-mail"><div class="hb-form-full" style="display:flex; align-items:center; gap:10px;"><label for="r-places" style="font-size: 13px; color: #4b5563;">Nombre de places :</label><input type="number" id="r-places" class="hb-input" style="width:80px;" min="1" value="1"></div><button type="button" id="btn-generate-mail" class="hb-btn-submit hb-form-full">Créer mon e-mail <i class="fa fa-paper-plane" style="margin-left: 8px;"></i></button></div><div id="resa-error-msg" style="color: #991b1b; font-size: 11.5px; margin-top: 8px; font-weight: bold; display: none;"><i class="fa fa-exclamation-circle"></i> Veuillez au moins remplir votre Nom et Prénom.</div></div>`; 
        } else { 
            reservationModalHtml = `<div class="hb-modal-meta-item" style="background-color: #f0fdf4; color: #166534; padding: 6px 12px; border-radius: 4px; border-left: 4px solid #4ade80; font-weight: bold; margin-top: 5px; font-size: 12px; text-transform: uppercase;"><i class="fa fa-check"></i> Entrée libre (Sans réservation)</div>`; 
        } 

        // AJOUT : Conversion du Markdown (Gras et Italique) pour la description
        let descHtmlContent = rawEvent.Description || '';
        descHtmlContent = descHtmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Gras
        descHtmlContent = descHtmlContent.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italique

        const shareUrl = encodeURIComponent(rawEvent.Lien || MAIN_AGENDA_URL); const shareTitle = encodeURIComponent(`À découvrir : ${rawEvent.Titre || "Animation"}`); const shareText = encodeURIComponent(`Découvrez cette animation dans vos médiathèques d'Agglopolys : ${rawEvent.Titre || "Animation"}`);
        
        modalBodyContent.innerHTML = `
            <span class="agenda-card-tag" style="position:static; display:inline-block; margin-bottom:12px;">${cleanCat}</span>
            <h3 class="hb-modal-title">${rawEvent.Titre || "Sans titre"}</h3>
            ${descHtmlContent ? `<div class="hb-modal-desc">${descHtmlContent}</div>` : ''}
            <div class="hb-modal-meta-list">
                <div class="hb-modal-meta-item"><i class="fa fa-map-marker"></i> <strong>Lieu :</strong> ${locText}</div>
                <div class="hb-modal-meta-item"><i class="fa fa-calendar"></i> <strong>Date :</strong> ${dateText}</div>
                ${publicCible ? `<div class="hb-modal-meta-item"><i class="fa fa-users"></i> <strong>Public :</strong> ${publicCible}</div>` : ''}
                ${rawEvent.Heure ? `<div class="hb-modal-meta-item" style="background-color: #f3f4f6; padding: 6px 12px; border-radius: 4px; border-left: 4px solid var(--hb-accent); margin-top: 5px; font-weight: bold; color: var(--hb-primary);"><i class="fa fa-clock-o"></i> Horaires : ${rawEvent.Heure}</div>` : ''}
                ${reservationModalHtml}
            </div>
            <div class="hb-modal-actions">
                <div id="hb-share-panel" class="hb-share-panel">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="hb-social-btn hb-fb"><i class="fa fa-facebook"></i></a>
                    <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" class="hb-social-btn hb-wa"><i class="fa fa-whatsapp"></i></a>
                    <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" class="hb-social-btn hb-tw"><i class="fa fa-twitter"></i></a>
                    <a href="mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${shareUrl}" class="hb-social-btn hb-em"><i class="fa fa-envelope"></i></a>
                    <button id="hb-btn-copy-link" class="hb-social-btn hb-cp" data-url="${MAIN_AGENDA_URL}"><i class="fa fa-link"></i></button>
                </div>
                <button id="hb-modal-ics" class="hb-btn-action hb-btn-calendar"><i class="fa fa-calendar-plus-o"></i> Rappel</button>
                <button id="hb-btn-share" class="hb-btn-action hb-btn-share"><i class="fa fa-share-alt"></i> Partager</button>
                ${rawEvent.Lien ? `<a href="${rawEvent.Lien}" target="_blank" class="hb-btn-action hb-btn-calendar"><i class="fa fa-external-link"></i> En savoir plus</a>` : ''}
            </div>`; 
        
        if (rawEvent.Reservation === "TRUE") { 
            document.getElementById('btn-generate-mail').addEventListener('click', () => { 
                const nom = document.getElementById('r-nom').value.trim(); const prenom = document.getElementById('r-prenom').value.trim(); const errorMsg = document.getElementById('resa-error-msg'); 
                if (!nom || !prenom) { errorMsg.style.display = 'block'; return; } errorMsg.style.display = 'none';
                const tel = document.getElementById('r-tel').value.trim(); const mail = document.getElementById('r-mail').value.trim(); const places = document.getElementById('r-places').value; const contact = getLibraryContactInfo(rawEvent.Localisation); 
                const subject = `Réservation : ${rawEvent.Titre}`; const body = `Bonjour,\nJe souhaite réserver ${places} place(s) pour l'animation "${rawEvent.Titre}".\nNom : ${nom}\nPrénom : ${prenom}\nTél : ${tel || 'Non renseigné'}\nEmail : ${mail || 'Non renseigné'}\n\nMerci.`; 
                window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; 
            }); 
        } 
        
        document.getElementById('hb-btn-share').addEventListener('click', () => { document.getElementById('hb-share-panel').classList.toggle('hb-active'); }); 
        document.getElementById('hb-btn-copy-link').addEventListener('click', (e) => { const url = e.currentTarget.dataset.url; navigator.clipboard.writeText(url).then(() => { const icon = e.currentTarget.querySelector('i'); icon.className = 'fa fa-check'; setTimeout(() => { icon.className = 'fa fa-link'; }, 2000); }); }); 
        document.getElementById('hb-modal-ics').addEventListener('click', () => { downloadICS(eventId); }); 
        
        modalOverlay.style.display = 'flex'; void modalOverlay.offsetWidth; modalOverlay.classList.add('hb-active'); document.body.style.overflow = 'hidden'; 
    }

    function closeModal() { modalOverlay.classList.remove('hb-active'); setTimeout(() => { modalOverlay.style.display = 'none'; document.body.style.overflow = ''; }, 300); }
    modalClose.addEventListener('click', closeModal); 
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); }); 
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('hb-active')) closeModal(); });

    // Lancement
    loadInitialState();
    loadAgendaData();
});
