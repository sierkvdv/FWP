import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Container, Section, Kicker, Reveal } from './primitives';
import AutoVideo from './AutoVideo';

/* ------------------------------------------------------------------ *
 *  BRAND FILM — "De Ontsnapping". Speelt stil mee zodra 'ie in beeld
 *  komt (ook op iPhone); geluid aan via de controls.
 *  Bestand vervangen = nieuwe bestandsnaam (media wordt 1 jaar gecached).
 * ------------------------------------------------------------------ */
const FILM = {
  mp4: '/videos/brandfilm/de-ontsnapping-v6.mp4',
  poster: '/videos/brandfilm/de-ontsnapping-v6.jpg',
};

const copy = {
  nl: {
    kicker: 'Brand film',
    title: 'Negen op hun plek. Eén die eruit stapt.',
    sub: 'Elk project bestaat uit bouwstenen die precies goed moeten staan. Onthouden wordt het ene dat de rij verlaat. Dat is wat ik maak.',
    sound: 'Zet het geluid aan',
  },
  en: {
    kicker: 'Brand film',
    title: 'Nine in place. One that steps out.',
    sub: 'Every project is built from pieces that have to sit exactly right. What people remember is the one that leaves the line. That is what I make.',
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
          <div
            className="overflow-hidden rounded-lg border border-line bg-surface"
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
