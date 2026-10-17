import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Container, Section, Kicker } from '../components/primitives';
import { CLUB_URL, TWITCH_KANAAL, useClubStatus } from '../lib/clubStatus';

const t = {
  nl: {
    kicker: 'Live',
    titel: 'Deep SamSo Club',
    live: 'Nu live',
    uit: 'Nu niet live',
    intro: 'Een club in 3D. Sierk draait, jij loopt rond met je eigen poppetje, praat met wie er is en ziet hem als hologram achter de decks.',
    binnen: 'in de club',
    rij: 'in de rij',
    knop: 'Ga de club in',
    hoe: 'Werkt in de browser, op telefoon, pc of VR-bril. Geen account, geen app.',
    kijk: 'Alleen kijken? De stream staat hieronder.',
    geenKanaal: 'De uitzending komt hier zodra er gedraaid wordt.',
  },
  en: {
    kicker: 'Live',
    titel: 'Deep SamSo Club',
    live: 'Live now',
    uit: 'Not live right now',
    intro: 'A club in 3D. Sierk plays, you walk around as your own character, talk to whoever is there and see him as a hologram behind the decks.',
    binnen: 'in the club',
    rij: 'in line',
    knop: 'Enter the club',
    hoe: 'Runs in the browser, on phone, pc or VR headset. No account, no app.',
    kijk: 'Just watching? The stream is below.',
    geenKanaal: 'The broadcast appears here when a set is on.',
  },
};

/**
 * /live: de Deep SamSo Club als tv-kanaal op fwp.one. Rood bolletje als Sierk draait (status van club.sierk.dev),
 * de Twitch-speler (als TWITCH_KANAAL is ingevuld) en de knop naar de club zelf.
 */
const LivePage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];
  const s = useClubStatus(10000);
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
              {s.live ? c.live : c.uit}
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
            ) : (
              <div className="flex aspect-video items-center justify-center px-6 text-center text-sm text-muted">
                {s.titel ? `${c.live}: ${s.titel}` : c.geenKanaal}
              </div>
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
