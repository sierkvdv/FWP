import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Container, Section, Kicker } from '../components/primitives';
import { CLUB_KIJK_URL, CLUB_URL, RADIO_URL, TV_URL, TWITCH_KANAAL, useClubStatus } from '../lib/clubStatus';

const t = {
  nl: {
    kicker: 'Live',
    titel: 'Deep SamSo Club',
    live: 'Nu live',
    uit: 'Nu niet live',
    intro: 'Een club in 3D die 24/7 draait op de mixen van Deepstepper. Jij loopt rond met je eigen poppetje, danst en praat met wie er is. Het is een beta: tik in de club op 💡 of typ !idea in de chat met wat erbij moet, de beste ideeën bouw ik erin.',
    binnen: 'in de club',
    rij: 'in de rij',
    knop: 'Ga de club in',
    hoe: 'Werkt in de browser, op telefoon, pc of VR-bril. Geen account, geen app.',
    kijk: 'Alleen kijken? De stream staat hieronder.',
    geenKanaal: 'De uitzending komt hier zodra er gedraaid wordt.',
    radio: 'Deep SamSo Radio, 24/7',
    nu: 'Nu',
    luister: 'Alleen luisteren kan ook: druk op play.',
    geluid: 'Geluid aan',
    terug: 'Terug naar de live uitzending',
    kijkGeluid: 'Geluid: klik in beeld op 🔊 Listen along, of zet hier de radio aan.',
  },
  en: {
    kicker: 'Live',
    titel: 'Deep SamSo Club',
    live: 'Live now',
    uit: 'Not live right now',
    intro: "A 3D club running 24/7 on Deepstepper's DJ mixes. Walk around as your own character, dance and talk to whoever is there. It's a beta: tap 💡 in the club or type !idea in the chat with what you want added, I build the best ones.",
    binnen: 'in the club',
    rij: 'in line',
    knop: 'Enter the club',
    hoe: 'Runs in the browser, on phone, pc or VR headset. No account, no app.',
    kijk: 'Just watching? The stream is below.',
    geenKanaal: 'The broadcast appears here when a set is on.',
    radio: 'Deep SamSo Radio, 24/7',
    nu: 'Now',
    luister: 'Just want to listen? Press play.',
    geluid: 'Sound on',
    terug: 'Back to the live broadcast',
    kijkGeluid: 'Sound: click 🔊 Listen along in the picture, or play the radio here.',
  },
};

/** Is de uitzending echt in de lucht? (de playlist bestaat alleen als OBS zendt) */
async function tvLeeft(): Promise<boolean> {
  try { const r = await fetch(TV_URL, { cache: 'no-store' }); return r.ok && (await r.text()).includes('#EXTINF'); }
  catch { return false; }
}

/**
 * Eigen uitzending (HLS van club.sierk.dev/tv): Safari speelt het zelf, elders hls.js van cdnjs.
 * onFout (reserve: de club op het apparaat zelf) alleen als de uitzending echt weg is. 30-10: "geen beeld binnen 15 s" was niet genoeg: een
 * telefoon die niet vanzelf start (spaarstand, traag netwerk) of even hapert bleef dan op de reserve hangen terwijl de stream gewoon liep.
 */
const Tv: React.FC<{ onFout: () => void; geluidTekst: string }> = ({ onFout, geluidTekst }) => {
  const v = useRef<HTMLVideoElement>(null);
  const [stil, setStil] = useState(true);
  const geluidStart = useRef<null | (() => void)>(null);
  useEffect(() => {
    const el = v.current; if (!el) return;
    let speelt = false, hls: any = null, weg = false;
    const klaar = () => { speelt = true; };
    el.addEventListener('playing', klaar);
    const t = setTimeout(async () => { if (!speelt && !weg && !(await tvLeeft()) && !weg) onFout(); }, 15000);
    const native = el.canPlayType('application/vnd.apple.mpegurl');
    const laad = () => {  // (opnieuw) aan de uitzending koppelen, ook na een herstart van OBS (playlist begint dan opnieuw)
      if (native) { el.src = TV_URL; el.play().catch(() => {}); return; }
      const H = (window as any).Hls; if (weg || !H || !H.isSupported()) return;
      if (hls) hls.destroy();
      hls = new H({ liveSyncDurationCount: 3 });
      hls.on(H.Events.ERROR, (_e: any, d: any) => {
        if (!d.fatal || weg) return;
        if (d.type === H.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError(); else setTimeout(() => { if (!weg && hls) hls.loadSource(TV_URL); }, 5000);
      });
      hls.loadSource(TV_URL); hls.attachMedia(el); el.play().catch(() => {});
    };
    if (native) laad();
    else {
      const sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.15/hls.min.js';
      sc.onload = laad;
      sc.onerror = () => onFout();
      document.head.appendChild(sc);
    }
    // 28-10: telefoonscherm uit = de browser pauzeert de video (en het geluid). Dan de radio (alleen geluid, speelt op de achtergrond
    // door) en terug naar de video als je weer kijkt. De radio wordt bij de eerste keer geluid aan vrijgegeven (iOS eist een tik).
    const radio = new Audio(); radio.preload = 'none'; let opRadio = false, vrij = false;
    const geefVrij = () => { if (vrij || el.muted) return; vrij = true; radio.src = RADIO_URL; radio.play().then(() => radio.pause()).catch(() => {}); };
    el.addEventListener('volumechange', geefVrij);
    // 30-10: iPhone/Safari: bij vergrendelen pauzeert iOS de video en een wissel naar de radio op dat moment lukt niet. Daarom bij 'Geluid aan'
    // meteen een audio-element op dezelfde uitzending: de video blijft stil beeld, het geluid loopt door op slot. Terug = beeld weer bij het geluid.
    const geluid = native ? new Audio() : null;
    geluidStart.current = () => {
      if (!geluid) { el.muted = false; el.play().catch(() => {}); return; }
      geluid.src = TV_URL; geluid.play().catch(() => {}); setStil(false);
    };
    const blijfStil = () => { if (geluid && geluid.src && !el.muted) { el.muted = true; } };
    el.addEventListener('volumechange', blijfStil);
    const beeldBijGeluid = () => {
      if (!geluid || !geluid.src || document.hidden) return;
      if (geluid.paused) geluid.play().catch(() => {});
      el.play().catch(() => {});
      if (el.seekable && el.seekable.length) el.currentTime = Math.max(0, el.seekable.end(el.seekable.length - 1) - 6);  // beeld terug naar het live punt, daar zit het geluid ook
    };
    document.addEventListener('visibilitychange', beeldBijGeluid);
    // 30-10: de video nooit zelf stoppen. Alleen als de telefoon hem echt heeft gepauzeerd terwijl de pagina weg is, de radio; niet bij volledig
    // scherm (iPhone: draaien = volledig scherm = pagina telt als verborgen, dat stopte de video).
    const volScherm = () => !!((el as any).webkitDisplayingFullscreen || document.fullscreenElement || (document as any).webkitFullscreenElement);
    const naarRadio = () => {
      if (native || opRadio || !document.hidden || el.muted || !speelt || !el.paused || volScherm()) return;
      opRadio = true; radio.src = RADIO_URL + '?t=' + Date.now(); radio.play().catch(() => {});
    };
    const zicht = () => {
      if (document.hidden) naarRadio();
      else if (opRadio) {
        opRadio = false; radio.pause(); radio.removeAttribute('src'); radio.load();
        if (el.seekable && el.seekable.length) el.currentTime = el.seekable.end(el.seekable.length - 1) - 4;
        el.play().catch(() => {});
      }
    };
    el.addEventListener('pause', naarRadio);
    // 30-10: na een telefoongesprek houdt iOS het geluid nog even vast: afspelen mislukt dan. Terug op de pagina: elke 5 s opnieuw proberen,
    // max 2 min. Alleen als je niet zelf op pauze drukte (pauze terwijl de pagina zichtbaar is = jij).
    let zelfPauze = false, poging: ReturnType<typeof setInterval> | null = null;
    const stopPoging = () => { if (poging) { clearInterval(poging); poging = null; } };
    const opPauze = () => { if (!document.hidden && !volScherm()) zelfPauze = true; };
    const opSpelen = () => { zelfPauze = false; stopPoging(); };
    const blijfProberen = () => {
      if (poging || zelfPauze || !speelt || !el.paused) return;
      let n = 0; el.play().catch(() => {}); if (geluid && geluid.src) geluid.play().catch(() => {});
      poging = setInterval(() => { if (!el.paused || ++n > 24) { stopPoging(); return; } el.play().catch(() => {}); }, 5000);
    };
    const terugOpPagina = () => { if (!document.hidden) setTimeout(blijfProberen, 500); };
    el.addEventListener('pause', opPauze); el.addEventListener('playing', opSpelen);
    // 30-10: beeld staat 25 s stil of start niet: is de uitzending echt weg (pc uit) dan de club op dit apparaat, anders opnieuw koppelen.
    let tVorig = -1, stil = 0;
    const wacht = setInterval(async () => {
      if (document.hidden || (speelt && el.paused)) return;
      if (el.currentTime === tVorig) {
        stil += 5;
        if (stil >= 25) {
          stil = 0;
          if (await tvLeeft()) { if (speelt && !weg) laad(); }
          else if (!weg) { clearInterval(wacht); onFout(); }
        }
      } else { stil = 0; tVorig = el.currentTime; }
    }, 5000);
    document.addEventListener('visibilitychange', terugOpPagina); window.addEventListener('focus', terugOpPagina);
    document.addEventListener('visibilitychange', zicht);
    return () => { weg = true; clearTimeout(t); el.removeEventListener('playing', klaar); el.removeEventListener('volumechange', geefVrij); el.removeEventListener('pause', naarRadio); el.removeEventListener('pause', opPauze); el.removeEventListener('playing', opSpelen); document.removeEventListener('visibilitychange', terugOpPagina); window.removeEventListener('focus', terugOpPagina); stopPoging(); clearInterval(wacht); document.removeEventListener('visibilitychange', zicht); radio.pause(); if (geluid) { geluid.pause(); geluid.removeAttribute('src'); geluid.load(); } el.removeEventListener('volumechange', blijfStil); document.removeEventListener('visibilitychange', beeldBijGeluid); geluidStart.current = null; if (hls) hls.destroy(); };
  }, [onFout]);
  return (
    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
      <video ref={v} className="absolute inset-0 h-full w-full bg-black" playsInline controls muted autoPlay onVolumeChange={(e) => { const m = (e.target as HTMLVideoElement).muted; if (!m) setStil(false); }} />
      {stil && (
        <button onClick={() => { if (geluidStart.current) geluidStart.current(); }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg">
          🔊 {geluidTekst}
        </button>
      )}
    </div>
  );
};

/**
 * /live: de Deep SamSo Club als tv-kanaal op fwp.one. Rood bolletje als Sierk draait (status van club.sierk.dev),
 * de Twitch-speler (als TWITCH_KANAAL is ingevuld) en de knop naar de club zelf.
 */
const LivePage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];
  const s = useClubStatus(10000);
  const [tvWeg, setTvWeg] = useState(false);
  const tvFout = React.useCallback(() => setTvWeg(true), []);
  // op de reserve: zodra de uitzending er weer is een knop terug (niet automatisch: dat zou het geluid van de luisteraar afbreken)
  const [tvTerug, setTvTerug] = useState(false);
  useEffect(() => {
    if (!tvWeg) { setTvTerug(false); return; }
    let weg = false;
    const kijk = async () => { const l = await tvLeeft(); if (!weg) setTvTerug(l); };
    kijk();
    const i = setInterval(kijk, 20000);
    return () => { weg = true; clearInterval(i); };
  }, [tvWeg]);
  const host = typeof window !== 'undefined' ? window.location.hostname : 'fwp.one';
  const parents = ['fwp.one', 'www.fwp.one', 'fwp.sierk.dev', 'localhost', host].filter((v, i, a) => a.indexOf(v) === i);

  useEffect(() => { document.title = 'Live — FWP'; }, []);

  return (
    <main className="pt-16">
      <Section>
        <Container>
          <Kicker>{c.kicker}</Kicker>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-extralight tracking-display sm:text-6xl">{c.titel}</h1>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs uppercase tracking-label text-muted">
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s.live ? 'bg-red-500' : 'bg-line'}`}>
                {s.live && <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75" />}
              </span>
              {!s.ok ? '…' : s.live ? c.live : c.uit}
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted">{c.intro}</p>

          <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface">
            {TWITCH_KANAAL ? (
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  title="Deep SamSo Club live"
                  className="absolute inset-0 h-full w-full"
                  src={`https://player.twitch.tv/?channel=${encodeURIComponent(TWITCH_KANAAL)}&${parents.map((p) => 'parent=' + p).join('&')}&muted=false`}
                  allowFullScreen
                  allow="autoplay; fullscreen"
                />
              </div>
            ) : !tvWeg ? (
              <Tv onFout={tvFout} geluidTekst={c.geluid} />
            ) : (
              // 28-10: geen uitzending (pc van Sierk uit): de club zelf in kijkmodus, getekend in de browser van de kijker,
              // met de radio van de server als geluid ('Listen along' in beeld). Daaronder de radio los.
              <>
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe title="Deep SamSo Club" className="absolute inset-0 h-full w-full" src={CLUB_KIJK_URL} allow="autoplay; fullscreen" allowFullScreen />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-5 text-center">
                  {tvTerug && (
                    <button onClick={() => setTvWeg(false)} className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg">📺 {c.terug}</button>
                  )}
                  <div className="text-sm text-ink">{s.titel ? `${c.nu}: ${s.titel}` : c.radio}</div>
                  <audio controls preload="none" src={RADIO_URL} className="w-full max-w-xs" />
                  <div className="text-sm text-muted">{c.kijkGeluid}</div>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={CLUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              {c.knop} →
            </a>
            <div className="text-sm text-muted">
              {s.ok && (
                <>
                  <span className="text-ink">{s.bezoekers}</span> {c.binnen}
                  {s.rij > 0 && (
                    <>
                      {' · '}<span className="text-ink">{s.rij}</span> {c.rij}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">{c.hoe}{TWITCH_KANAAL ? ` ${c.kijk}` : ''}</p>
        </Container>
      </Section>
    </main>
  );
};

export default LivePage;
