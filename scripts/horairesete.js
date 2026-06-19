(function() {
    const daysName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentYear = new Date().getFullYear();

    // Définition de la période d'été
    const summerStart = new Date(currentYear, 6, 4); // 4 Juillet
    const summerEnd = new Date(currentYear, 7, 29);  // 29 Août

    // Périodes de fermetures annuelles
    const closures = {
        ag: { start: new Date(currentYear, 7, 11), end: new Date(currentYear, 7, 15) },
        mg: { start: new Date(currentYear, 7, 11), end: new Date(currentYear, 7, 22) },
        rv: { start: new Date(currentYear, 7, 11), end: new Date(currentYear, 7, 22) }
    };

    // HORAIRES POUR L'AFFICHAGE TEXTE
    const textStandard = {
        ag: ['Fermé', 'Fermé', 'Mardi : 13h00 - 18h30', 'Mercredi : 10h00 - 18h30', 'Jeudi : 13h00 - 18h30', 'Vendredi : 13h00 - 18h30', 'Samedi : 10h00 - 18h00'],
        mg: ['Fermé', 'Fermé', 'Mardi : 15h00 - 18h00', 'Mercredi : 10h-13h / 14h-18h', 'Jeudi : 15h00 - 18h00', 'Vendredi : 15h00 - 18h00', 'Samedi : 10h-13h / 14h-18h'],
        rv: ['Fermé', 'Fermé', 'Fermé', 'Mercredi : 10h-13h / 14h-18h', 'Jeudi : 15h00 - 18h00', 'Vendredi : 15h00 - 18h00', 'Samedi : 10h-13h / 14h-18h']
    };

    const textSummer = {
        ag: ['Fermé', 'Fermé', 'Mardi : 10h00 - 15h30', 'Mercredi : 10h00 - 15h30', 'Jeudi : 10h00 - 15h30', 'Vendredi : 10h00 - 15h30', 'Samedi : 10h00 - 15h30'],
        mg: ['Fermé', 'Fermé', 'Mardi : 10h-12h30 / 13h30-15h30', 'Mercredi : 10h-12h30 / 13h30-15h30', 'Jeudi : 10h-12h30 / 13h30-15h30', 'Vendredi : 10h-12h30 / 13h30-15h30', 'Samedi : 10h-12h30 / 13h30-15h30'],
        rv: ['Fermé', 'Fermé', 'Fermé', 'Mercredi : 10h00 - 13h00', 'Jeudi : 10h00 - 13h00', 'Vendredi : 10h00 - 13h00', 'Samedi : 10h00 - 13h00']
    };

    // STRUCTURE DE CALCUL POUR L'INSTANT T (en minutes depuis minuit)
    // Exemple : 13h00 = 13 * 60 = 780 minutes
    const slotsStandard = {
        ag: [
            [], [], // Dim, Lun
            [{start: 780, end: 1110}], // Mar (13h-18h30)
            [{start: 600, end: 1110}], // Mer (10h-18h30)
            [{start: 780, end: 1110}], // Jeu (13h-18h30)
            [{start: 780, end: 1110}], // Ven (13h-18h30)
            [{start: 600, end: 1080}]  // Sam (10h-18h)
        ],
        mg: [
            [], [],
            [{start: 900, end: 1080}], // Mar (15h-18h)
            [{start: 600, end: 780}, {start: 840, end: 1080}], // Mer (10h-13h et 14h-18h)
            [{start: 900, end: 1080}], // Jeu
            [{start: 900, end: 1080}], // Ven
            [{start: 600, end: 780}, {start: 840, end: 1080}]  // Sam
        ],
        rv: [
            [], [], [], // Dim, Lun, Mar
            [{start: 600, end: 780}, {start: 840, end: 1080}], // Mer (10h-13h et 14h-18h)
            [{start: 900, end: 1080}], // Jeu (15h-18h)
            [{start: 900, end: 1080}], // Ven (15h-18h)
            [{start: 600, end: 780}, {start: 840, end: 1080}]  // Sam
        ]
    };

    const slotsSummer = {
        ag: [
            [], [],
            [{start: 600, end: 930}], // Mar (10h-15h30)
            [{start: 600, end: 930}], // Mer
            [{start: 600, end: 930}], // Jeu
            [{start: 600, end: 930}], // Ven
            [{start: 600, end: 930}]  // Sam
        ],
        mg: [
            [], [],
            [{start: 600, end: 750}, {start: 810, end: 930}], // Mar (10h-12h30 et 13h30-15h30)
            [{start: 600, end: 750}, {start: 810, end: 930}], // Mer
            [{start: 600, end: 750}, {start: 810, end: 930}], // Jeu
            [{start: 600, end: 750}, {start: 810, end: 930}], // Ven
            [{start: 600, end: 750}, {start: 810, end: 930}]  // Sam
        ],
        rv: [
            [], [], [],
            [{start: 600, end: 780}], // Mer (10h-13h)
            [{start: 600, end: 780}], // Jeu
            [{start: 600, end: 780}], // Ven
            [{start: 600, end: 780}]  // Sam
        ]
    };

    function checkLiveStatus(libId) {
        const now = new Date();
        const dayIdx = now.getDay();
        const currentMinutes = (now.getHours() * 60) + now.getMinutes();
        const checkDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // A. Vérifier les fermetures annuelles en cours
        if (checkDate >= closures[libId].start && checkDate <= closures[libId].end) {
            return {
                displayText: "Fermeture annuelle",
                isCurrentlyOpen: false,
                isSummerPeriod: true,
                badgeText: "Fermé (Fermeture)"
            };
        }

        // B. Détecter si on applique l'été ou les horaires standards
        const isSummer = (checkDate >= summerStart && checkDate <= summerEnd);
        const textSet = isSummer ? textSummer[libId] : textStandard[libId];
        const slotSet = isSummer ? slotsSummer[libId] : slotsStandard[libId];

        const todayText = textSet[dayIdx];
        const activeTodaySlots = slotSet[dayIdx];

        // Vérification si un créneau horaire correspond à l'heure courante (T)
        let isCurrentlyOpen = false;
        if (activeTodaySlots && activeTodaySlots.length > 0) {
            for (let i = 0; i < activeTodaySlots.length; i++) {
                const slot = activeTodaySlots[i];
                if (currentMinutes >= slot.start && currentMinutes < slot.end) {
                    isCurrentlyOpen = true;
                    break;
                }
            }
        }

        return {
            displayText: todayText,
            isCurrentlyOpen: isCurrentlyOpen,
            isSummerPeriod: isSummer,
            badgeText: isSummer ? "🌞 Période d'été" : "📅 Horaire habituel"
        };
    }

    function updateInterface() {
        const libs = ['ag', 'mg', 'rv'];
        libs.forEach(libId => {
            const card = document.getElementById(`card-${libId}`);
            if (!card) return;

            const status = checkLiveStatus(libId);
            
            // 1. Mise à jour du texte des horaires du jour
            const textEl = card.querySelector('.time-text');
            if (textEl) {
                textEl.textContent = status.displayText;
            }

            // 2. Mise à jour du badge "Période active"
            const periodBadge = document.getElementById(`period-badge-${libId}`);
            if (periodBadge) {
                periodBadge.textContent = status.badgeText;
                periodBadge.className = 'agglo-period-badge ' + (status.isSummerPeriod ? 'agglo-badge-summer' : 'agglo-badge-standard');
            }

            // 3. Mise à jour de l'Instant T (Badge Live vert/rouge)
            const liveBadge = document.getElementById(`live-badge-${libId}`);
            if (liveBadge) {
                const liveText = liveBadge.querySelector('.live-text');
                if (status.isCurrentlyOpen) {
                    liveBadge.className = "agglo-live-status-badge agglo-live-open";
                    if (liveText) liveText.textContent = "Ouvert actuellement";
                } else {
                    liveBadge.className = "agglo-live-status-badge agglo-live-closed";
                    if (liveText) liveText.textContent = "Fermé actuellement";
                }
            }
        });
    }

    // Gestion de la modale
    const modal = document.getElementById('aggloSummerModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.style.display = 'flex');
    }
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // Lancement et actualisation de l'affichage chaque minute
    updateInterface();
    setInterval(updateInterface, 60000); // Rafraîchit automatiquement à chaque minute
})();
