// Klikbare kloon van het uren-systeem (fwp.one). Echte pagina's, verzonnen data; er wordt niets opgeslagen.
(function () {
  var KLANTEN = {
    'Atelier Mos': { kleur: '#8fd694', projecten: ['Onderhoud website'] },
    'Bakkerij De Vries': { kleur: '#f2b84b', projecten: ['Webshop', 'Bestelpagina'] },
    'Studio Noord': { kleur: '#7c9cff', projecten: ['Campagnevideo najaar'] },
    'Van Dijk Installatie': { kleur: '#ff8a7a', projecten: ['Offertetool'] },
  };

  function toast(tekst) {
    var t = document.getElementById('demo-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'demo-toast';
      t.style.cssText =
        'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);z-index:100;background:#101014;' +
        'border:1px solid #00e5c7;color:#f4f4f6;font-size:13px;padding:10px 16px;border-radius:6px;' +
        'transition:opacity .25s;max-width:90vw;text-align:center';
      document.body.appendChild(t);
    }
    t.textContent = tekst;
    t.style.opacity = '1';
    clearTimeout(t._uit);
    t._uit = setTimeout(function () { t.style.opacity = '0'; }, 2600);
  }

  function klantNaam(select) {
    var o = select && select.options[select.selectedIndex];
    return o ? o.textContent.trim() : '';
  }

  // Projectkeuze volgt de klant, net als in het echte systeem.
  function vulProjecten(klantSel, projSel) {
    if (!klantSel || !projSel) return;
    var k = KLANTEN[klantNaam(klantSel)];
    var leeg = projSel.options[0] ? projSel.options[0].textContent : '—';
    projSel.innerHTML = '';
    var o = document.createElement('option');
    o.value = '';
    o.textContent = leeg;
    projSel.appendChild(o);
    (k ? k.projecten : []).forEach(function (p) {
      var x = document.createElement('option');
      x.value = p;
      x.textContent = p;
      projSel.appendChild(x);
    });
  }
  [['timer-klant', 'timer-project'], ['qa-klant', 'qa-project']].forEach(function (ids) {
    var k = document.getElementById(ids[0]);
    var p = document.getElementById(ids[1]);
    if (k && p) {
      vulProjecten(k, p);
      k.addEventListener('change', function () { vulProjecten(k, p); });
    }
  });

  // Snelknoppen voor minuten (15m, 30m, 1u ...)
  var minuten = document.getElementById('qa-minuten');
  if (minuten) {
    var knoppen = Array.prototype.filter.call(
      minuten.closest('form').querySelectorAll('button[type=button]'),
      function (b) { return /^\d+(m|u)( \d+m)?$/.test(b.textContent.trim()); }
    );
    var zet = function (b) {
      knoppen.forEach(function (x) {
        var aan = x === b;
        x.classList.toggle('border-accent', aan);
        x.classList.toggle('text-accent', aan);
        x.classList.toggle('border-line', !aan);
        x.classList.toggle('text-muted', !aan);
      });
    };
    knoppen.forEach(function (b) {
      b.addEventListener('click', function () {
        var m = b.textContent.trim().match(/^(\d+)(m|u)(?: (\d+)m)?$/);
        minuten.value = m[2] === 'm' ? m[1] : String(Number(m[1]) * 60 + Number(m[3] || 0));
        zet(b);
      });
    });
    minuten.addEventListener('input', function () {
      zet(knoppen.find(function (b) {
        var m = b.textContent.trim().match(/^(\d+)(m|u)(?: (\d+)m)?$/);
        return (m[2] === 'm' ? m[1] : String(Number(m[1]) * 60 + Number(m[3] || 0))) === minuten.value;
      }));
    });
  }

  // Timer: starten toont de lopende timer zoals in het echte systeem.
  function fmt(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h + ':' + String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function startTimer(form) {
    var kaart = form.closest('.card');
    var origineel = kaart.outerHTML;
    var naam = klantNaam(form.querySelector('#timer-klant'));
    var proj = form.querySelector('#timer-project');
    var projNaam = proj && proj.value ? proj.value : '';
    var oms = (form.querySelector('#timer-omschrijving') || {}).value || '';
    var kleur = (KLANTEN[naam] || {}).kleur || '#00e5c7';
    var start = Date.now();
    var div = document.createElement('div');
    div.className = 'card p-6 md:p-8 border-accent/30';
    div.innerHTML =
      '<div class="flex items-center justify-between gap-4 mb-6"><p class="eyebrow">Timer loopt</p>' +
      '<span class="flex items-center gap-2 text-xs text-accent"><span class="w-2 h-2 rounded-full bg-accent animate-pulse-soft"></span>actief</span></div>' +
      '<div class="flex items-center gap-3 mb-1"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color:' + kleur + '"></span>' +
      '<p class="text-ink text-lg">' + esc(naam) + '</p>' + (projNaam ? '<span class="text-muted text-sm">— ' + esc(projNaam) + '</span>' : '') + '</div>' +
      (oms ? '<p class="text-muted text-sm mb-4">' + esc(oms) + '</p>' : '') +
      '<p class="text-6xl font-extralight tracking-tight text-ink tabular-nums my-6"><span data-tik>0:00:00</span></p>' +
      '<div class="flex gap-3"><button type="button" class="btn-accent" data-stop>Stop &amp; opslaan</button>' +
      '<button type="button" class="btn-danger" data-weg>Weggooien</button></div>';
    kaart.replaceWith(div);
    var tik = div.querySelector('[data-tik]');
    var iv = setInterval(function () { tik.textContent = fmt(Date.now() - start); }, 1000);
    var terug = function (melding) {
      clearInterval(iv);
      var tmp = document.createElement('div');
      tmp.innerHTML = origineel;
      div.replaceWith(tmp.firstElementChild);
      koppelFormulieren();
      vulProjecten(document.getElementById('timer-klant'), document.getElementById('timer-project'));
      document.getElementById('timer-klant').addEventListener('change', function () {
        vulProjecten(document.getElementById('timer-klant'), document.getElementById('timer-project'));
      });
      if (melding) toast(melding);
    };
    div.querySelector('[data-stop]').addEventListener('click', function () {
      var min = Math.max(1, Math.round((Date.now() - start) / 60000));
      terug('Opgeslagen: ' + min + 'm voor ' + naam + '. (Demo: niet echt bewaard.)');
    });
    div.querySelector('[data-weg]').addEventListener('click', function () { terug('Timer weggegooid.'); });
  }

  function koppelFormulieren() {
    Array.prototype.forEach.call(document.querySelectorAll('form'), function (f) {
      if (f._demo) return;
      f._demo = true;
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (f.querySelector('#timer-klant')) return startTimer(f);
        toast('Demo: hier wordt niets opgeslagen of verstuurd.');
      });
    });
  }
  koppelFormulieren();

  // Keuzelijst bij een banktransactie ("Wat is dit?"): in het echte systeem wordt hij meteen geboekt.
  document.addEventListener('change', function (e) {
    var s = e.target;
    if (s.tagName !== 'SELECT' || /^(timer|qa)-/.test(s.id || '')) return;
    var o = s.options[s.selectedIndex];
    if (!o || !o.value) return;
    toast('Geboekt als ' + o.textContent.trim() + '. (Demo: niet echt opgeslagen.)');
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-demo-uit]');
    if (a) {
      e.preventDefault();
      toast('Deze pagina zit niet in de demo.');
    }
  });
})();
