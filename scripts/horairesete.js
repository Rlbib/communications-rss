(function(){
    var host = document.getElementById('agglo-summer-host');
    if(!host){ host=document.createElement('div'); host.id='agglo-summer-host'; host.style.cssText='all:initial;display:block;font-family:inherit;'; document.currentScript.parentNode.insertBefore(host,document.currentScript); }
    var shadow = host.attachShadow({mode:'open'});

    var fa = document.createElement('link');
    fa.rel='stylesheet'; fa.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    shadow.appendChild(fa);

    var s = document.createElement('style');
    s.textContent = ''
+':host{'
+'  --r:8px;--r-sm:5px;'
+'  --pri:#4b5563;--pri-h:#374151;'
+'  --acc:#efac2a;--acc-h:#d99318;'
+'  --dark:#1f2937;--text:#374151;--muted:#6b7280;'
+'  --light:#f9fafb;--border:#e5e7eb;'
+'  --green:#059669;--green-bg:#ecfdf5;--green-bd:#a7f3d0;'
+'  --red:#dc2626;--red-bg:#fef2f2;--red-bd:#fecaca;'
+'  --orange:#d97706;--orange-bg:#fffbeb;--orange-bd:#fde68a;'
+'  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;'
+'  display:block;width:100%;'
+'}'
+'*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}'
+''
+'.w{width:100%;padding:0 16px 12px;}'
+''
+'.hd{margin-bottom:12px;}'
+'.hd h2{font-size:22px;font-weight:700;color:var(--pri);line-height:1.3;}'
+'.hd h2 span{border-bottom:3px solid var(--acc);padding-bottom:4px;}'
+''
+'.now{display:flex;gap:8px;margin-bottom:10px;}'
+'.now-item{flex:1;display:flex;align-items:center;justify-content:space-between;gap:6px;background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:8px 10px;transition:border-color .2s,box-shadow .2s;cursor:pointer;}'
+'.now-item:hover{border-color:var(--acc);box-shadow:0 2px 8px rgba(239,172,42,.15);}'
+'.now-name{font-size:11.5px;font-weight:700;color:var(--pri);display:flex;align-items:center;gap:5px;white-space:nowrap;}'
+'.now-name i{color:var(--acc);font-size:10px;}'
+'.now-r{display:flex;align-items:center;gap:6px;flex-shrink:0;}'
+'.now-t{font-size:11px;font-weight:600;color:var(--text);white-space:nowrap;}'
+'.st{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:.2px;white-space:nowrap;}'
+'.st-o{background:var(--green-bg);color:var(--green);border:1px solid var(--green-bd);}'
+'.st-c{background:var(--red-bg);color:var(--red);border:1px solid var(--red-bd);}'
+'.dot{width:5px;height:5px;border-radius:50%;display:block;}'
+'.st-o .dot{background:var(--green);box-shadow:0 0 0 0 rgba(5,150,105,.6);animation:p 2s infinite;}'
+'.st-c .dot{background:var(--red);}'
+'@keyframes p{0%{box-shadow:0 0 0 0 rgba(5,150,105,.6);}70%{box-shadow:0 0 0 4px rgba(5,150,105,0);}100%{box-shadow:0 0 0 0 rgba(5,150,105,.6);}}'
+''
+'.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch;}'
+'.bl{background:#fff;border:1px solid var(--border);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column;}'
+'.bl-h{padding:8px 12px;background:var(--light);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:6px;flex-shrink:0;}'
+'.bl-h-l{display:flex;align-items:center;gap:6px;}'
+'.bl-h-l i{color:var(--acc);font-size:12px;}'
+'.bl-h-l span{font-size:11.5px;font-weight:700;color:var(--pri);text-transform:uppercase;letter-spacing:.2px;}'
+'.bl-h-btn{background:none;border:1px solid var(--border);color:var(--muted);font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;gap:4px;font-family:inherit;white-space:nowrap;position:relative;overflow:hidden;}'
+'.bl-h-btn::after{content:"";position:absolute;inset:0;background:var(--acc);opacity:0;transition:opacity .3s;border-radius:3px;}'
+'.bl-h-btn:hover{border-color:var(--acc);color:var(--dark);transform:translateX(2px);}'
+'.bl-h-btn:hover::after{opacity:.1;}'
+'.bl-h-btn i{transition:transform .3s cubic-bezier(.4,0,.2,1);position:relative;z-index:1;}'
+'.bl-h-btn:hover i{transform:translateX(3px);}'
+'.bl-h-btn span{position:relative;z-index:1;}'
+'@keyframes btn-glow{0%,100%{box-shadow:0 0 0 0 rgba(239,172,42,0);}50%{box-shadow:0 0 0 4px rgba(239,172,42,.2);}}'
+'.bl-h-btn{animation:btn-glow 3s ease-in-out infinite;}'
+'.bl-h-btn:hover{animation:none;box-shadow:0 2px 8px rgba(239,172,42,.25);}'
+''
+'.bl-b{padding:10px 12px;flex-grow:1;display:flex;flex-direction:column;}'
+'.ete-line{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;padding:6px 0;border-bottom:1px dashed var(--border);font-size:11px;color:var(--text);line-height:1.4;cursor:pointer;transition:color .2s;}'
+'.ete-line:hover{color:var(--dark);}'
+'.ete-line:last-child{border-bottom:none;padding-bottom:0;}'
+'.ete-line:first-child{padding-top:0;}'
+'.ete-line-n{font-weight:700;color:var(--pri);white-space:nowrap;}'
+'.ete-line-h{text-align:right;white-space:nowrap;}'
+'.ete-line-c{display:block;font-size:10px;color:var(--orange);font-weight:600;margin-top:1px;}'
+''
+'.pret{display:flex;align-items:center;gap:12px;flex-grow:1;justify-content:center;}'
+'.pret-ico{width:42px;height:42px;border-radius:50%;background:var(--acc);display:flex;align-items:center;justify-content:center;color:var(--dark);font-size:17px;flex-shrink:0;box-shadow:0 3px 10px rgba(239,172,42,.25);}'
+'.pret-txt h4{font-size:13px;font-weight:700;color:var(--dark);text-transform:uppercase;margin-bottom:2px;}'
+'.pret-txt p{font-size:11px;color:var(--muted);line-height:1.4;}'
+'.pret-note{margin-top:auto;padding-top:10px;border-top:1px dashed var(--border);font-size:10px;color:var(--muted);display:flex;align-items:flex-start;gap:5px;line-height:1.4;}'
+'.pret-note i{color:var(--acc);font-size:10px;margin-top:2px;flex-shrink:0;}'
+''
+'/* ============================================================'
+'   MODALE — LISIBLE, aérée, zébrée'
+'   =========================================================== */'
+'.ov{position:fixed;inset:0;background:rgba(17,24,39,.5);backdrop-filter:blur(4px);z-index:99999;display:none;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .3s ease;}'
+'.ov.on{display:flex;opacity:1;}'
+'.md{background:#fff;border-radius:var(--r);max-width:820px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.12);overflow:hidden;max-height:88vh;display:flex;flex-direction:column;transform:translateY(12px) scale(.98);transition:transform .3s cubic-bezier(.4,0,.2,1);}'
+'.ov.on .md{transform:translateY(0) scale(1);}'
+'.mh{background:var(--pri);padding:16px 22px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}'
+'.mh h3{font-size:16px;font-weight:700;color:#fff;display:flex;align-items:center;gap:8px;}'
+'.mh h3 i{color:var(--acc);font-size:15px;}'
+'.mx{background:rgba(255,255,255,.15);border:none;width:32px;height:32px;border-radius:50%;color:#fff;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;font-family:inherit;}'
+'.mx:hover{background:rgba(255,255,255,.3);}'
+'.mb{padding:24px;overflow-y:auto;flex-grow:1;-webkit-overflow-scrolling:touch;}'
+''
+'/* Sections */'
+'.ms{font-size:15px;font-weight:700;color:var(--dark);margin:24px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--acc);display:flex;align-items:center;gap:8px;}'
+'.ms:first-child{margin-top:0;}'
+'.ms i{color:var(--acc);font-size:14px;}'
+'.ms.warm{border-bottom-color:var(--orange);}.ms.warm i{color:var(--orange);}'
+''
+'/* Tableaux lisibles */'
+'.tw{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -2px;padding:0 2px;}'
+'table{width:100%;border-collapse:collapse;margin-bottom:20px;min-width:520px;}'
+'th{background:var(--pri);color:#fff;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px;padding:11px 14px;text-align:left;border:1px solid var(--pri);}'
+'td{padding:11px 14px;font-size:13px;color:var(--text);text-align:left;border:1px solid var(--border);line-height:1.5;vertical-align:top;}'
+'/* Zébrure */'
+'tbody tr:nth-child(even) td{background:var(--light);}'
+'tbody tr:hover td{background:var(--orange-bg);}'
+'td strong{font-weight:700;color:var(--dark);font-size:13px;}'
+'td:first-child strong{white-space:nowrap;}'
+'.bc{display:inline-flex;align-items:center;gap:4px;background:var(--orange);color:#fff;font-weight:700;font-size:10px;padding:3px 9px;border-radius:4px;text-transform:uppercase;white-space:nowrap;}'
+'.ft{font-size:12px;color:var(--muted);margin-top:8px;display:flex;align-items:center;gap:6px;padding:10px 12px;background:var(--light);border-radius:var(--r-sm);border:1px solid var(--border);}'
+'.ft i{color:var(--acc);font-size:11px;}'
+''
+'/* === MOBILE === */'
+'@media(max-width:600px){'
+'  .w{padding:0 10px 8px;}'
+'  .hd{margin-bottom:10px;}'
+'  .hd h2{font-size:19px;}'
+'  .now{flex-direction:column;gap:6px;}'
+'  .now-item{padding:7px 9px;}'
+'  .now-name{font-size:11px;}'
+'  .now-t{font-size:10.5px;}'
+'  .row2{grid-template-columns:1fr;gap:8px;}'
+'  .bl-h{padding:7px 10px;}'
+'  .bl-h-l span{font-size:11px;}'
+'  .bl-b{padding:9px 10px;}'
+'  .ete-line{font-size:10.5px;}'
+'  .pret{gap:10px;}'
+'  .pret-ico{width:36px;height:36px;font-size:14px;}'
+'  .pret-txt h4{font-size:11.5px;}'
+'  .pret-txt p{font-size:10.5px;}'
+'  .pret-note{font-size:9.5px;padding-top:8px;}'
+'  .ov{padding:0;align-items:flex-end;}'
+'  .md{max-height:92vh;border-radius:var(--r) var(--r) 0 0;transform:translateY(100%);}'
+'  .ov.on .md{transform:translateY(0);}'
+'  .mh{padding:14px 16px;}'
+'  .mh h3{font-size:14px;}'
+'  .mb{padding:16px 14px 28px;}'
+'  .ms{font-size:13px;margin:18px 0 10px;padding-bottom:6px;}'
+'  th{font-size:10px;padding:9px 10px;letter-spacing:.3px;}'
+'  td{padding:9px 10px;font-size:12px;}'
+'  table{min-width:400px;}'
+'  .mx{width:34px;height:34px;font-size:14px;}'
+'  .ft{font-size:11px;padding:8px 10px;}'
+'}'
+'@media(max-width:380px){'
+'  .hd h2{font-size:17px;}'
+'  .ete-line{flex-direction:column;gap:2px;}'
+'  .ete-line-h{text-align:left;}'
+'}';
    shadow.appendChild(s);

    var w=document.createElement('div');w.className='w';
    w.innerHTML=''

        +'<div class="hd"><h2><span>Horaires</span></h2></div>'

        +'<div class="now">'
        +'  <div class="now-item" data-open-modal>'
        +'    <span class="now-name"><i class="fa fa-book"></i> Abb\u00e9-Gr\u00e9goire</span>'
        +'    <div class="now-r">'
        +'      <span class="now-t" data-t="ag">...</span>'
        +'      <span class="st st-c" data-l="ag"><span class="dot"></span><span data-x="ag">...</span></span>'
        +'    </div>'
        +'  </div>'
        +'  <div class="now-item" data-open-modal>'
        +'    <span class="now-name"><i class="fa fa-bookmark"></i> Maurice-Genevoix</span>'
        +'    <div class="now-r">'
        +'      <span class="now-t" data-t="mg">...</span>'
        +'      <span class="st st-c" data-l="mg"><span class="dot"></span><span data-x="mg">...</span></span>'
        +'    </div>'
        +'  </div>'
        +'  <div class="now-item" data-open-modal>'
        +'    <span class="now-name"><i class="fa fa-star"></i> Rose-Valland</span>'
        +'    <div class="now-r">'
        +'      <span class="now-t" data-t="rv">...</span>'
        +'      <span class="st st-c" data-l="rv"><span class="dot"></span><span data-x="rv">...</span></span>'
        +'    </div>'
        +'  </div>'
        +'</div>'

        +'<div class="row2">'
        +'  <div class="bl">'
        +'    <div class="bl-h">'
        +'      <div class="bl-h-l"><i class="fa fa-sun-o"></i><span>Horaires d\'\u00e9t\u00e9 (23 juin \u2013 29 ao\u00fbt)</span></div>'
        +'      <button class="bl-h-btn" id="jo" type="button"><span>D\u00e9tails</span> <i class="fa fa-arrow-right"></i></button>'
        +'    </div>'
        +'    <div class="bl-b">'
        +'      <div class="ete-line" data-open-modal><span class="ete-line-n">Abb\u00e9-Gr\u00e9goire</span><span class="ete-line-h">Mar.\u2013sam. 10h\u201315h30<span class="ete-line-c">Ferm\u00e9 11/08\u201315/08</span></span></div>'
        +'      <div class="ete-line" data-open-modal><span class="ete-line-n">Maurice-Genevoix</span><span class="ete-line-h">Mar.\u2013sam. 10h\u201315h30<span class="ete-line-c">Ferm\u00e9 18/08\u201322/08</span></span></div>'
        +'      <div class="ete-line" data-open-modal><span class="ete-line-n">Rose-Valland</span><span class="ete-line-h">Mer.\u2013sam. 10h\u201313h<span class="ete-line-c">Ferm\u00e9 11/08\u201322/08</span></span></div>'
        +'    </div>'
        +'  </div>'
        +'  <div class="bl">'
        +'    <div class="bl-h"><div class="bl-h-l"><i class="fa fa-book"></i><span>Pr\u00eats d\'\u00e9t\u00e9</span></div></div>'
        +'    <div class="bl-b">'
        +'      <div class="pret">'
        +'        <div class="pret-ico"><i class="fa fa-book"></i></div>'
        +'        <div class="pret-txt">'
        +'          <h4>4 juillet \u2013 22 ao\u00fbt</h4>'
        +'          <p>Empruntez pour 8 semaines, sans prolongation.</p>'
        +'        </div>'
        +'      </div>'
        +'      <div class="pret-note"><i class="fa fa-info-circle"></i><span>Pensez \u00e0 v\u00e9rifier vos dates de retour sur votre compte.</span></div>'
        +'    </div>'
        +'  </div>'
        +'</div>';
    shadow.appendChild(w);

    var ov=document.createElement('div');ov.className='ov';
    ov.innerHTML=''
        +'<div class="md">'
        +'  <div class="mh"><h3><i class="fa fa-calendar"></i> Grille compl\u00e8te des horaires</h3><button class="mx" id="jc" type="button"><i class="fa fa-times"></i></button></div>'
        +'  <div class="mb">'
        +'    <div class="ms"><i class="fa fa-calendar-o"></i> Horaires habituels</div>'
        +'    <div class="tw"><table>'
        +'      <thead><tr><th>Structure</th><th>Mardi</th><th>Mercredi</th><th>Jeudi</th><th>Vendredi</th><th>Samedi</th></tr></thead>'
        +'      <tbody>'
        +'        <tr><td><strong>Abb\u00e9-Gr\u00e9goire</strong></td><td>13h \u2013 18h30</td><td>10h \u2013 18h30</td><td>13h \u2013 18h30</td><td>13h \u2013 18h30</td><td>10h \u2013 18h00</td></tr>'
        +'        <tr><td><strong>Maurice-Genevoix</strong></td><td>15h \u2013 18h00</td><td>10h \u2013 13h / 14h \u2013 18h</td><td>15h \u2013 18h00</td><td>15h \u2013 18h00</td><td>10h \u2013 13h / 14h \u2013 18h</td></tr>'
        +'        <tr><td><strong>Rose-Valland</strong></td><td>Ferm\u00e9</td><td>10h \u2013 13h / 14h \u2013 18h</td><td>15h \u2013 18h00</td><td>15h \u2013 18h00</td><td>10h \u2013 13h / 14h \u2013 18h</td></tr>'
        +'      </tbody>'
        +'    </table></div>'
        +'    <div class="ms warm"><i class="fa fa-sun-o"></i> Horaires d\'\u00e9t\u00e9 (4 juillet \u2013 29 ao\u00fbt)</div>'
        +'    <div class="tw"><table>'
        +'      <thead><tr><th>Structure</th><th>Horaires</th><th>Fermeture annuelle</th></tr></thead>'
        +'      <tbody>'
        +'        <tr><td><strong>Abb\u00e9-Gr\u00e9goire</strong></td><td>Mardi au samedi<br>10h \u2013 15h30</td><td><span class="bc"><i class="fa fa-lock"></i> Ferm\u00e9</span> 11/08 \u2013 15/08</td></tr>'
        +'        <tr><td><strong>Maurice-Genevoix</strong></td><td>Mardi au samedi<br>10h \u2013 12h30 / 13h30 \u2013 15h30</td><td><span class="bc"><i class="fa fa-lock"></i> Ferm\u00e9</span> 18/08 \u2013 22/08</td></tr>'
        +'        <tr><td><strong>Rose-Valland</strong></td><td>Mercredi au samedi<br>10h \u2013 13h00</td><td><span class="bc"><i class="fa fa-lock"></i> Ferm\u00e9</span> 11/08 \u2013 22/08</td></tr>'
        +'      </tbody>'
        +'    </table></div>'
        +'    <div class="ft"><i class="fa fa-info-circle"></i> Ferm\u00e9 le dimanche et le lundi en p\u00e9riode habituelle.</div>'
        +'  </div>'
        +'</div>';
    shadow.appendChild(ov);

    /* LOGIQUE */
    var q=function(sel){return shadow.querySelector(sel);};
    var qa=function(sel){return shadow.querySelectorAll(sel);};

    function openModal(e){
        e.preventDefault(); e.stopPropagation();
        ov.classList.add('on');
        document.body.style.overflow='hidden';
    }
    function closeModal(){
        ov.classList.remove('on');
        document.body.style.overflow='';
    }

    /* Bouton "Détails" */
    q('#jo').addEventListener('click', openModal);
    /* Bouton fermer */
    q('#jc').addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); closeModal(); });
    /* Clic fond */
    ov.addEventListener('click', function(e){ if(e.target===ov) closeModal(); });
    /* Escape */
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&ov.classList.contains('on')) closeModal(); });
    /* Clic sur les items "En ce moment" */
    qa('[data-open-modal]').forEach(function(el){
        el.addEventListener('click', openModal);
        el.style.cursor='pointer';
    });

    /* Horaires temps réel */
    var Y=new Date().getFullYear(),SS=new Date(Y,6,4),SE=new Date(Y,7,29);
    var CL={ag:{s:new Date(Y,7,11),e:new Date(Y,7,15)},mg:{s:new Date(Y,7,18),e:new Date(Y,7,22)},rv:{s:new Date(Y,7,11),e:new Date(Y,7,22)}};
    var RG={ag:{0:null,1:null,2:[{s:13,e:18.5}],3:[{s:10,e:18.5}],4:[{s:13,e:18.5}],5:[{s:13,e:18.5}],6:[{s:10,e:18}]},mg:{0:null,1:null,2:[{s:15,e:18}],3:[{s:10,e:13},{s:14,e:18}],4:[{s:15,e:18}],5:[{s:15,e:18}],6:[{s:10,e:13},{s:14,e:18}]},rv:{0:null,1:null,2:null,3:[{s:10,e:13},{s:14,e:18}],4:[{s:15,e:18}],5:[{s:15,e:18}],6:[{s:10,e:13},{s:14,e:18}]}};
    var SM={ag:{0:null,1:null,2:[{s:10,e:15.5}],3:[{s:10,e:15.5}],4:[{s:10,e:15.5}],5:[{s:10,e:15.5}],6:[{s:10,e:15.5}]},mg:{0:null,1:null,2:[{s:10,e:12.5},{s:13.5,e:15.5}],3:[{s:10,e:12.5},{s:13.5,e:15.5}],4:[{s:10,e:12.5},{s:13.5,e:15.5}],5:[{s:10,e:12.5},{s:13.5,e:15.5}],6:[{s:10,e:12.5},{s:13.5,e:15.5}]},rv:{0:null,1:null,2:null,3:[{s:10,e:13}],4:[{s:10,e:13}],5:[{s:10,e:13}],6:[{s:10,e:13}]}};
    function f(h){var r=Math.floor(h),m=Math.round((h-r)*60);return String(r).padStart(2,'0')+'h'+String(m).padStart(2,'0');}
    function io(sl,n){if(!sl)return false;for(var i=0;i<sl.length;i++)if(n>=sl[i].s&&n<sl[i].e)return true;return false;}
    function bw(d,a,b){var t=d.getTime();return t>=a.getTime()&&t<=b.getTime();}
    function tick(){
        var n=new Date(),dw=n.getDay(),h=n.getHours()+n.getMinutes()/60,iu=bw(n,SS,SE);
        ['ag','mg','rv'].forEach(function(l){
            var tE=q('[data-t="'+l+'"]'),lE=q('[data-l="'+l+'"]'),xE=q('[data-x="'+l+'"]');
            if(!tE||!lE||!xE)return;
            if(iu&&bw(n,CL[l].s,CL[l].e)){tE.textContent='Ferm\u00e9';lE.className='st st-c';xE.textContent='Ferm\u00e9';return;}
            var sl=(iu?SM[l]:RG[l])[dw],op=io(sl,h);
            if(!sl)tE.textContent='Ferm\u00e9';else tE.textContent=sl.map(function(s){return f(s.s)+'\u2013'+f(s.e);}).join(' / ');
            lE.className=op?'st st-o':'st st-c';xE.textContent=op?'Ouvert':'Ferm\u00e9';
        });
    }
    tick();setInterval(tick,30000);
})();
