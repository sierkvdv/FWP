import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Container, Section, Kicker, Reveal } from './primitives';
import AutoVideo from './AutoVideo';

/* ------------------------------------------------------------------ *
 *  FILM — eigen tv-software (De Ontsnapping is nog niet af). Speelt stil mee zodra 'ie in beeld
 *  komt (ook op iPhone); geluid aan via de controls.
 *  Bestand vervangen = nieuwe bestandsnaam (media wordt 1 jaar gecached).
 * ------------------------------------------------------------------ */
const FILM = {
  mp4: '/videos/brandfilm/fwp-tv-eigen-software.mp4',
  poster: '/videos/brandfilm/fwp-tv-eigen-software.jpg',
  // telefoon: staande versie
  mp4Mobile: '/videos/brandfilm/fwp-tv-eigen-software-9x16.mp4',
  posterMobile: '/videos/brandfilm/fwp-tv-eigen-software-9x16.jpg',
};

const copy = {
  nl: {
    kicker: 'Eigen werk',
    title: 'Mijn tv was traag. Dus schreef ik nieuwe software.',
    sub: 'Zelfde tv, eigen startscherm, telefoon als afstandsbediening en met één klik mijn clubradio met live visuals. In m’n eentje gebouwd, sneller dan de meeste bedrijven denken.',
    sound: 'Zet het geluid aan',
  },
  en: {
    kicker: 'Own work',
    title: 'My TV was slow. So I rewrote its software.',
    sub: 'Same TV, my own home screen, my phone as the remote and one click for my club radio with live visuals. Built on my own, faster than most companies think.',
    sound: 'Turn the sound on',
  },
};

const BrandFilm: React.FC = () => {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <Section id="film" className="border-t border-line">
      <Container>
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <Kicker className="text-accent">{c.kicker}</Kicker>
            <h2 className="mt-5 text-3xl font-light tracking-display sm:text-4xl lg:text-[2.75rem] lg:leading-snug">
              {c.title}
            </h2>
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">{c.sub}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          {/* telefoon: 9:16 */}
          <div
            className="mx-auto max-w-sm overflow-hidden rounded-lg border border-line bg-surface sm:hidden"
            style={{ aspectRatio: '9/16' }}
          >
            <AutoVideo
              src={FILM.mp4Mobile}
              poster={FILM.posterMobile}
              className="h-full w-full object-cover"
              controls
              loop={false}
            />
          </div>
          {/* breder scherm: 16:9 */}
          <div
            className="hidden overflow-hidden rounded-lg border border-line bg-surface sm:block"
            style={{ aspectRatio: '16/9' }}
          >
            <AutoVideo
              src={FILM.mp4}
              poster={FILM.poster}
              className="h-full w-full object-cover"
              controls
              loop={false}
            />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">{c.sound}</p>
        </Reveal>
      </Container>
    </Section>
  );
};

export default BrandFilm;
