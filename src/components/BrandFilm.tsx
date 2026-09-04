import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Container, Section, Kicker, Reveal } from './primitives';

/* ------------------------------------------------------------------ *
 *  BRAND FILM — "De Ontsnapping". Eén video, start op klik (met geluid).
 *  Bestand vervangen = nieuwe bestandsnaam (media wordt 1 jaar gecached).
 * ------------------------------------------------------------------ */
const FILM = {
  mp4: '/videos/brandfilm/de-ontsnapping-v4.mp4',
  poster: '/videos/brandfilm/de-ontsnapping-v4.jpg',
};

const copy = {
  nl: {
    kicker: 'Brand film',
    title: 'Negen op hun plek. Eén die eruit stapt.',
    sub: 'Elk project bestaat uit bouwstenen die precies goed moeten staan. Onthouden wordt het ene dat de rij verlaat. Dat is wat ik maak.',
  },
  en: {
    kicker: 'Brand film',
    title: 'Nine in place. One that steps out.',
    sub: 'Every project is built from pieces that have to sit exactly right. What people remember is the one that leaves the line. That is what I make.',
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
            <video
              src={FILM.mp4}
              poster={FILM.poster}
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};

export default BrandFilm;
