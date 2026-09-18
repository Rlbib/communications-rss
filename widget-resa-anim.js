(function() {
    // Les ID des animations à afficher
    const TARGET_IDS = [320, 387, 395, 349];
    const JSON_URL = "https://rlbib.github.io/communications-rss/agenda.json";
    const monthsShort = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];

    function parseEventDate(dateStr, heureStr) {
        if (!dateStr) return null;
        const p = dateStr.split('-');
        if (p.length === 3) {
            let h = 23, m = 59;
            if (heureStr) {
                const match = heureStr.match(/(\d{1,2})[h:](\d{2})?/i);
                if (match) {
                    h = parseInt(match[1], 10);
                    m = match[2] ? parseInt(match[2], 10) : 0;
                }
            }
            return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10), h, m);
        }
        return new Date(dateStr);
    }

    // PASSERELLE MAGIQUE : Déclenche l'écouteur officiel du widget du haut
    function triggerOfficialModal(eventId) {
        // 1. Si window.openDetailsModal est disponible
        if (typeof window.openDetailsModal === 'function') {
            window.openDetailsModal(eventId);
            return;
        }

        // 2. Pont direct avec le conteneur du haut : on simule un clic capté par le script principal
        const topGrid = document.getElementById('hb-widget-grid');
        if (topGrid) {
            const bridgeElement = document.createElement('div');
            bridgeElement.className = 'agenda-card';
            bridgeElement.dataset.id = eventId;
            bridgeElement.style.display = 'none';
            topGrid.appendChild(bridgeElement);
            bridgeElement.click();
            bridgeElement.remove();
        }
    }

    async function loadTicketDesk() {
        const container = document.getElementById('hb-ticket-list-content');
        if (!container) return;

        let data = [];
        try {
            const res = await fetch(`${JSON_URL}?t=${new Date().getTime()}`);
            if (res.ok) data = await res.json();
        } catch(e) {}

        if (!data.length) {
            container.innerHTML = '<div style="font-size:12px; color:#9ca3af; padding:10px;">Agenda synchronisé.</div>';
            return;
        }

        const now = new Date();

        let events = data.filter(ev => TARGET_IDS.includes(ev.id));
        if (!events.length) events = data.filter(ev => ev.Reservation === "TRUE").slice(0, 3);

        events.forEach(ev => {
            const endD = parseEventDate(ev.Date_Fin || ev.Date_Debut, ev.Heure);
            ev.isPassed = endD ? (endD < now) : false;
        });

        events.sort((a, b) => (a.isPassed === b.isPassed) ? 0 : a.isPassed ? 1 : -1);

        container.innerHTML = events.map(ev => {
            const isResa = (String(ev.Reservation).toUpperCase() === "TRUE");
            const startDate = parseEventDate(ev.Date_Debut, ev.Heure);
            
            const dayNum = startDate ? String(startDate.getDate()).padStart(2, '0') : '--';
            const monthText = startDate ? monthsShort[startDate.getMonth()] : '';
            const heureText = ev.Heure ? ev.Heure : '';
            const location = (ev.Localisation || "Blois").split(',')[0].trim();
            const cleanDesc = (ev.Description || "").replace(/\\n/g, ' ').replace(/\n+/g, ' ').trim();
            
            const hasValidImage = ev.URL_de_l_image && ev.URL_de_l_image.trim() !== "";
            const imgUrl = hasValidImage ? ev.URL_de_l_image.replace(/^http:\/\//i, 'https://') : null;

            let actionHtml = '';
            if (ev.isPassed) {
                actionHtml = `<span class="hb-status-past-pill">Session passée</span>`;
            } else if (isResa) {
                actionHtml = `<button type="button" class="hb-ticket-btn-resa"><i class="fa fa-ticket"></i> Réserver</button>`;
            } else {
                actionHtml = `<span class="hb-ticket-pill-free"><i class="fa fa-check"></i> Entrée libre</span><i class="fa fa-chevron-right hb-ticket-arrow"></i>`;
            }

            return `
                <div class="hb-ticket-row ${ev.isPassed ? 'hb-is-past' : ''}" data-id="${ev.id}">
                    <div class="hb-ticket-date-box">
                        <div class="hb-ticket-date-month">${monthText}</div>
                        <div class="hb-ticket-date-day">${dayNum}</div>
                        <div class="hb-ticket-date-time">${heureText}</div>
                    </div>

                    ${imgUrl ? `<div class="hb-ticket-thumb"><img src="${imgUrl}" alt=""></div>` : ''}

                    <div class="hb-ticket-main">
                        <div class="hb-ticket-meta">
                            <span class="hb-ticket-cat">${ev.Catégorie || 'Rencontre'}</span>
                            <span>•</span>
                            <span class="hb-ticket-loc"><i class="fa fa-map-marker" style="color:#efac2a;"></i> ${location}</span>
                        </div>
                        <h4 class="hb-ticket-title">${ev.Titre}</h4>
                        <p class="hb-ticket-desc">${cleanDesc}</p>
                    </div>

                    <div class="hb-ticket-action">
                        ${actionHtml}
                    </div>
                </div>
            `;
        }).join('');

        // Écouteur de clic : appelle la fonction passerelle
        container.querySelectorAll('.hb-ticket-row').forEach(row => {
            row.addEventListener('click', (e) => {
                const eventId = parseInt(row.dataset.id, 10);
                triggerOfficialModal(eventId);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadTicketDesk);
    } else {
        loadTicketDesk();
    }
})();
