(function () {
    // =========================================================
    // 1. INITIALISATION DU CONTENEUR (SANS SHADOW DOM)
    // =========================================================
    let host = document.getElementById('agglo-summer-host');
    if (!host) {
        host = document.createElement('div');
        host.id = 'agglo-summer-host';
        host.style.cssText = 'all:initial;display:block;font-family:inherit;';
        
        if (document.currentScript && document.currentScript.parentNode) {
            document.currentScript.parentNode.insertBefore(host, document.currentScript);
        } else {
            document.body.appendChild(host);
        }
    }

    host.innerHTML = '';

    // =========================================================
    // 2. INJECTION DES STYLES OPTIMISÉS (CORRIGÉS)
    // =========================================================
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        document.head.appendChild(fa);
    }

    const style = document.createElement('style');
    style.textContent = `
        #agglo-summer-host {
            --r: 8px; --r-sm: 5px;
            --pri: #4b5563; --pri-h: #374151;
            --acc: #efac2a; --acc-h: #d99318;
            --dark: #1f2937; --text: #374151; --muted: #6b7280;
            --light: #f9fafb; --border: #e5e7eb;
            --green: #059669; --green-bg: #ecfdf5; --green-bd: #a7f3d0;
            --red: #dc2626; --red-bg: #fef2f2; --red-bd: #fecaca;
            --orange: #d97706; --orange-bg: #fffbeb; --orange-bd: #fde68a;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            display: block; width: 100%;
        }
        #agglo-summer-host *, #agglo-summer-host *::before, #agglo-summer-host *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        #agglo-summer-host .w { width: 100%; padding: 0 16px 12px; }
        
        #agglo-summer-host .hd { margin-bottom: 14px; }
        #agglo-summer-host .hd h2 { font-size: 22px; font-weight: 700; color: var(--pri); line-height: 1.3; }
        #agglo-summer-host .hd h2 span { border-bottom: 3px solid var(--acc); padding-bottom: 4px; }
        
        #agglo-summer-host .now { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 10px; 
            margin-bottom: 14px; 
        }
        
        #agglo-summer-host .now-item { 
            display: flex; 
            flex-direction: column; 
            justify-content: space-between;
            gap: 8px; 
            background: #fff; 
            border: 1px solid var(--border); 
            border-radius: var(--r); 
            padding: 12px; 
            transition: border-color .2s, box-shadow .2s; 
            cursor: pointer; 
            min-width: 0; /* Permet aux colonnes de respecter la largeur de la grille */
        }
        #agglo-summer-host .now-item:hover { border-color: var(--acc); box-shadow: 0 2px 8px rgba(239,172,42,.15); }
        
        #agglo-summer-host .now-name { 
            font-size: 13px; 
            font-weight: 700; 
            color: var(--dark); 
            display: flex; 
            align-items: center; 
            gap: 6px; 
        }
        #agglo-summer-host .now-name i { color: var(--acc); font-size: 12px; }
        
        #agglo-summer-host .now-r { 
            display: flex; 
            align-items: flex-start; /* Aligne le badge en haut si le texte fait plusieurs lignes */
            justify-content: space-between; 
            gap: 8px; 
            border-top: 1px dashed var(--border);
            padding-top: 8px;
        }
        
        /* MODIFICATION : On retire white-space: nowrap pour permettre le retour à la ligne */
        #agglo-summer-host .now-t { 
            font-size: 11px; 
            font-weight: 600; 
            color: var(--muted); 
            line-height: 1.3;
        }
        
        /* MODIFICATION : Ajout de flex-shrink: 0 pour éviter que le badge ne s'écrase */
        #agglo-summer-host .st { 
            display: inline-flex; 
            align-items: center; 
            gap: 4px; 
            font-size: 10px; 
            font-weight: 700; 
            padding: 2px 8px; 
            border-radius: 20px; 
            text-transform: uppercase; 
            letter-spacing: .2px; 
            white-space: nowrap; 
            flex-shrink: 0; 
        }
        #agglo-summer-host .st-o { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-bd); }
        #agglo-summer-host .st-c { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-bd); }
        #agglo-summer-host .dot { width: 5px; height: 5px; border-radius: 50%; display: block; }
        #agglo-summer-host .st-o .dot { background: var(--green); box-shadow: 0 0 0 0 rgba(5,150,105,.6); animation: pulse 2s infinite; }
        #agglo-summer-host .st-c .dot { background: var(--red); }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(5,150,105,.6); } 70% { box-shadow: 0 0 0 4px rgba(5,150,105,0); } 100% { box-shadow: 0 0 0 0 rgba(5,150,105,.6); } }
        
        #agglo-summer-host .widget-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 10px 14px;
            background: var(--light);
            border: 1px solid var(--border);
            border-radius: var(--r);
            font-size: 11.5px;
            color: var(--text);
        }
        #agglo-summer-host .summer-info {
            display: flex;
            align-items: center;
            gap: 6px;
            line-height: 1.4;
        }
        #agglo-summer-host .summer-info i { color: var(--orange); font-size: 13px; }
        #agglo-summer-host .summer-info strong { color: var(--dark); }
        #agglo-summer-host .btn-more {
            background: none;
            border: none;
            color: var(--pri);
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            padding: 2px 4px;
            transition: color .2s;
            text-decoration: underline;
            white-space: nowrap;
        }
        #agglo-summer-host .btn-more:hover { color: var(--acc-h); }

        /* MODALE */
        #agglo-summer-host .ov { position: fixed; inset: 0; background: rgba(17,24,39,.5); backdrop-filter: blur(4px); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 16px; opacity: 0; transition: opacity .3s ease; }
        #agglo-summer-host .ov.on { display: flex; opacity: 1; }
        #agglo-summer-host .md { background: #fff; border-radius: var(--r); max-width: 820px; width: 100%; box-shadow: 0 20px 50px rgba(0,0,0,.12); overflow: hidden; max-height: 88vh; display: flex; flex-direction: column; transform: translateY(12px) scale(.98); transition: transform .3s cubic-bezier(.4,0,.2,1); }
        #agglo-summer-host .ov.on .md { transform: translateY(0) scale(1); }
        #agglo-summer-host .mh { background: var(--pri); padding: 16px 22px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        #agglo-summer-host .mh h3 { font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
        #agglo-summer-host .mh h3 i { color: var(--acc); font-size: 15px; }
        #agglo-summer-host .mx { background: rgba(255,255,255,.15); border: none; width: 32px; height: 32px; border-radius: 50%; color: #fff; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; font-family: inherit; }
        #agglo-summer-host .mx:hover { background: rgba(255,255,255,.3); }
        #agglo-summer-host .mb { padding: 24px; overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch; }
        
        #agglo-summer-host .ms { font-size: 15px; font-weight: 700; color: var(--dark); margin: 24px 0 14px; padding-bottom: 8px; border-bottom: 2px solid var(--acc); display: flex; align-items: center; gap: 8px; }
        #agglo-summer-host .ms:first-child { margin-top: 0; }
        #agglo-summer-host .ms i { color: var(--acc); font-size: 14px; }
        #agglo-summer-host .ms.warm { border-bottom-color: var(--orange); }
        #agglo-summer-host .ms.warm i { color: var(--orange); }
        
        #agglo-summer-host .tw { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 -2px; padding: 0 2px; }
        #agglo-summer-host table { width: 100%; border-collapse: collapse; margin-bottom: 20px; min-width: 520px; border: 1px solid var(--border); }
        #agglo-summer-host th { background: var(--pri); color: #fff; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: .5px; padding: 11px 14px; text-align: left; border: 1px solid var(--pri); }
        #agglo-summer-host td { padding: 11px 14px; font-size: 13px; color: var(--text); text-align: left; border: 1px solid var(--border); line-height: 1.5; vertical-align: top; }
        #agglo-summer-host tbody tr:nth-child(even) td { background: var(--light); }
        #agglo-summer-host tbody tr:hover td { background: var(--orange-bg); }
        #agglo-summer-host td strong { font-weight: 700; color: var(--dark); font-size: 13px; }
        #agglo-summer-host td:first-child strong { white-space: nowrap; }
        #agglo-summer-host .bc { display: inline-flex; align-items: center; gap: 4px; background: var(--orange); color: #fff; font-weight: 700; font-size: 10px; padding: 3px 9px; border-radius: 4px; text-transform: uppercase; white-space: nowrap; }
        #agglo-summer-host .ft { font-size: 12px; color: var(--muted); margin-top: 8px; display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: var(--light); border-radius: var(--r-sm); border: 1px solid var(--border); }
        #agglo-summer-host .ft i { color: var(--acc); font-size: 11px; }
        
        @media (max-width: 768px) {
            #agglo-summer-host .now { grid-template-columns: 1fr; gap: 8px; }
            #agglo-summer-host .widget-footer { flex-direction: column; align-items: flex-start; gap: 10px; }
            #agglo-summer-host .btn-more { align-self: flex-end; }
        }
        @media (max-width: 600px) {
            #agglo-summer-host .w { padding: 0 10px 8px; }
            #agglo-summer-host .hd { margin-bottom: 10px; }
            #agglo-summer-host .hd h2 { font-size: 19px; }
            #agglo-summer-host .ov { padding: 0; align-items: flex-end; }
            #agglo-summer-host .md { max-height: 92vh; border-radius: var(--r) var(--r) 0 0; transform: translateY(100%); }
            #agglo-summer-host .mh { padding: 14px 16px; }
            #agglo-summer-host .mh h3 { font-size: 14px; }
            #agglo-summer-host .mb { padding: 16px 14px 28px; }
            #agglo-summer-host .ms { font-size: 13px; margin: 18px 0 10px; padding-bottom: 6px; }
            #agglo-summer-host th { font-size: 10px; padding: 9px 10px; letter-spacing: .3px; }
            #agglo-summer-host td { padding: 9px 10px; font-size: 12px; }
            #agglo-summer-host table { min-width: 400px; }
            #agglo-summer-host .mx { width: 34px; height: 34px; font-size: 14px; }
            #agglo-summer-host .ft { font-size: 11px; padding: 8px 10px; }
        }
    `;
    host.appendChild(style);

    // =========================================================
    // 3. INJECTION DU HTML (WIDGET COMPACT & MODALE - AVEC Rose-Valland)
    // =========================================================
    const widgetHTML = document.createElement('div');
    widgetHTML.className = 'w';
    widgetHTML.innerHTML = `
        <div class="hd"><h2><span>Horaires</span></h2></div>

        <div class="now">
            <div class="now-item" data-open-modal>
                <span class="now-name"><i class="fa fa-book"></i> Abbé-Grégoire</span>
                <div class="now-r">
                    <span class="now-t" data-t="ag">...</span>
                    <span class="st st-c" data-l="ag"><span class="dot"></span><span data-x="ag">...</span></span>
                </div>
            </div>
            <div class="now-item" data-open-modal>
                <span class="now-name"><i class="fa fa-bookmark"></i> Maurice-Genevoix</span>
                <div class="now-r">
                    <span class="now-t" data-t="mg">...</span>
                    <span class="st st-c" data-l="mg"><span class="dot"></span><span data-x="mg">...</span></span>
                </div>
            </div>
            <div class="now-item" data-open-modal>
                <span class="now-name"><i class="fa fa-sun-o"></i> Rose-Valland</span>
                <div class="now-r">
                    <span class="now-t" data-t="vz">...</span>
                    <span class="st st-c" data-l="vz"><span class="dot"></span><span data-x="vz">...</span></span>
                </div>
            </div>
        </div>

        <div class="widget-footer">
            <div class="summer-info">
                <i class="fa fa-sun-o"></i>
                <span><strong>Prêts d'été (4 juil. – 29 août) :</strong> emprunts prolongés à 8 semaines.</span>
            </div>
            <button class="btn-more" id="jo" type="button">Voir tous les horaires <i class="fa fa-chevron-right"></i></button>
        </div>
    `;
    host.appendChild(widgetHTML);

    const overlayHTML = document.createElement('div');
    overlayHTML.className = 'ov';
    overlayHTML.innerHTML = `
        <div class="md">
            <div class="mh">
                <h3><i class="fa fa-calendar"></i> Grille complète des horaires</h3>
                <button class="mx" id="jc" type="button"><i class="fa fa-times"></i></button>
            </div>
            <div class="mb">
                
                <div class="ms warm"><i class="fa fa-sun-o"></i> Horaires d'été (23 juin – 29 août)</div>
                <div class="tw">
                    <table>
                        <thead>
                            <tr><th>Structure</th><th>Horaires</th><th>Fermeture annuelle</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Abbé-Grégoire</strong></td><td>Mardi au samedi<br>10h – 15h30</td><td><span class="bc"><i class="fa fa-lock"></i> Fermé</span> 11/08 – 15/08</td></tr>
                            <tr><td><strong>Maurice-Genevoix</strong></td><td>Mardi au samedi<br>10h – 12h30 / 13h30 – 15h30</td><td><span class="bc"><i class="fa fa-lock"></i> Fermé</span> 15/08 – 22/08</td></tr>
                            <tr><td><strong>Rose-Valland</strong></td><td>Mercredi au samedi<br>10h – 13h00</td><td><span class="bc"><i class="fa fa-lock"></i> Fermé</span> 11/08 – 22/08</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="ms"><i class="fa fa-calendar-o"></i> Horaires habituels</div>
                <div class="tw">
                    <table>
                        <thead>
                            <tr><th>Structure</th><th>Mardi</th><th>Mercredi</th><th>Jeudi</th><th>Vendredi</th><th>Samedi</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Abbé-Grégoire</strong></td><td>13h – 18h30</td><td>10h – 18h30</td><td>13h – 18h30</td><td>13h – 18h30</td><td>10h – 18h00</td></tr>
                            <tr><td><strong>Maurice-Genevoix</strong></td><td>15h – 18h00</td><td>10h – 13h / 14h – 18h</td><td>15h – 18h00</td><td>15h – 18h00</td><td>10h – 13h / 14h – 18h</td></tr>
                            <tr><td><strong>Rose-Valland</strong></td><td>Fermé</td><td>10h – 13h / 14h – 18h</td><td>15h – 18h00</td><td>15h – 18h00</td><td>10h – 13h / 14h – 18h</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="ft"><i class="fa fa-info-circle"></i> Fermé le dimanche et le lundi.</div>
            </div>
        </div>
    `;
    host.appendChild(overlayHTML);

    // =========================================================
    // 4. LOGIQUE D'OUVERTURE / FERMETURE DE LA MODALE
    // =========================================================
    const q = (sel) => host.querySelector(sel);
    const qa = (sel) => host.querySelectorAll(sel);
    const overlay = host.querySelector('.ov');

    const openModal = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        overlay.classList.add('on');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        overlay.classList.remove('on');
        document.body.style.overflow = '';
    };

    q('#jo').addEventListener('click', openModal);
    q('#jc').addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeModal(); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('on')) closeModal(); });

    qa('[data-open-modal]').forEach((el) => {
        el.addEventListener('click', openModal);
        el.style.cursor = 'pointer';
    });

    // =========================================================
    // 5. LOGIQUE DES HORAIRES EN TEMPS RÉEL
    // =========================================================
    const currentYear = new Date().getFullYear();
    
    const summerStart = new Date(currentYear, 5, 23);
    const summerEnd = new Date(currentYear, 7, 29);

    const closures = {
        ag: { start: new Date(currentYear, 7, 11), end: new Date(currentYear, 7, 15) },
        mg: { start: new Date(currentYear, 7, 18), end: new Date(currentYear, 7, 22) },
        vz: { start: new Date(currentYear, 7, 11), end: new Date(currentYear, 7, 22) }
    };

    // --- ZONE MODIFIABLE : FERMETURES TEMPORAIRES EXCEPTIONNELLES ---
    // Les mois dans l'objet Date de JavaScript commencent à 0 (juillet = 6, août = 7).
    const exceptionalClosures = {
        vz: {
            start: new Date(currentYear, 6, 8),  // 8 Juillet (6)
            end: new Date(currentYear, 6, 11),  // 11 Juillet (6)
            reason: "En raison des fortes chaleurs, la médiathèque sera exceptionnellement fermée."
        }
    };

    const regularHours = {
        ag: { 0: null, 1: null, 2: [{ s: 13, e: 18.5 }], 3: [{ s: 10, e: 18.5 }], 4: [{ s: 13, e: 18.5 }], 5: [{ s: 13, e: 18.5 }], 6: [{ s: 10, e: 18 }] },
        mg: { 0: null, 1: null, 2: [{ s: 15, e: 18 }], 3: [{ s: 10, e: 13 }, { s: 14, e: 18 }], 4: [{ s: 15, e: 18 }], 5: [{ s: 15, e: 18 }], 6: [{ s: 10, e: 13 }, { s: 14, e: 18 }] },
        vz: { 0: null, 1: null, 2: null, 3: [{ s: 10, e: 13 }, { s: 14, e: 18 }], 4: [{ s: 15, e: 18 }], 5: [{ s: 15, e: 18 }], 6: [{ s: 10, e: 13 }, { s: 14, e: 18 }] }
    };

    const summerHours = {
        ag: { 0: null, 1: null, 2: [{ s: 10, e: 15.5 }], 3: [{ s: 10, e: 15.5 }], 4: [{ s: 10, e: 15.5 }], 5: [{ s: 10, e: 15.5 }], 6: [{ s: 10, e: 15.5 }] },
        mg: { 0: null, 1: null, 2: [{ s: 10, e: 12.5 }, { s: 13.5, e: 15.5 }], 3: [{ s: 10, e: 12.5 }, { s: 13.5, e: 15.5 }], 4: [{ s: 10, e: 12.5 }, { s: 13.5, e: 15.5 }], 5: [{ s: 10, e: 12.5 }, { s: 13.5, e: 15.5 }], 6: [{ s: 10, e: 12.5 }, { s: 13.5, e: 15.5 }] },
        vz: { 0: null, 1: null, 2: null, 3: [{ s: 10, e: 13 }], 4: [{ s: 10, e: 13 }], 5: [{ s: 10, e: 13 }], 6: [{ s: 10, e: 13 }] }
    };

    const formatHour = (h) => {
        const hours = Math.floor(h);
        const minutes = Math.round((h - hours) * 60);
        return `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}`;
    };

    const isOpenNow = (slots, currentTime) => {
        if (!slots) return false;
        return slots.some(slot => currentTime >= slot.s && currentTime < slot.e);
    };

    const isBetweenDates = (date, start, end) => {
        const t = date.getTime();
        return t >= start.getTime() && t <= end.getTime();
    };

    const updateStatus = () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const currentTime = now.getHours() + now.getMinutes() / 60;
        const isSummer = isBetweenDates(now, summerStart, summerEnd);

        ['ag', 'mg', 'vz'].forEach((lib) => {
            const timeEl = q(`[data-t="${lib}"]`);
            const statusEl = q(`[data-l="${lib}"]`);
            const labelEl = q(`[data-x="${lib}"]`);
            
            if (!timeEl || !statusEl || !labelEl) return;

            // 1. VÉRIFICATION DES FERMETURES EXCEPTIONNELLES
            if (exceptionalClosures[lib] && isBetweenDates(now, exceptionalClosures[lib].start, exceptionalClosures[lib].end)) {
                timeEl.textContent = exceptionalClosures[lib].reason || 'Fermé';
                statusEl.className = 'st st-c';
                labelEl.textContent = 'Fermé';
                return;
            }

            // 2. VÉRIFICATION DES FERMETURES ANNUELLES
            if (isSummer && isBetweenDates(now, closures[lib].start, closures[lib].end)) {
                timeEl.textContent = 'Fermé';
                statusEl.className = 'st st-c';
                labelEl.textContent = 'Fermé';
                return;
            }

            // 3. HORAIRES STANDARDS
            const slots = (isSummer ? summerHours[lib] : regularHours[lib])[dayOfWeek];
            const open = isOpenNow(slots, currentTime);

            timeEl.textContent = slots ? slots.map(s => `${formatHour(s.s)}–${formatHour(s.e)}`).join(' / ') : 'Fermé';
            statusEl.className = open ? 'st st-o' : 'st st-c';
            labelEl.textContent = open ? 'Ouvert' : 'Fermé';
        });
    };

    updateStatus();
    setInterval(updateStatus, 30000);
})();
