import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Container, Section, Kicker, Reveal } from './primitives';
import AutoVideo from './AutoVideo';
import ShareButton from './ShareButton';
import { brandFilm as FILM } from '../data/brandfilm';
import { filmSlug } from '../data/films';

/* ------------------------------------------------------------------ *
 *  FILM — eigen tv-software (De Ontsnapping is nog niet af). Speelt stil mee zodra 'ie in beeld
 *  komt (ook op iPhone); geluid aan via de controls.
 *  Bestand en titel: src/data/brandfilm.ts.
 * ------------------------------------------------------------------ */

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
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{c.sound}</p>
            <ShareButton slug={filmSlug(FILM.mp4)} title={FILM.title} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};

export default BrandFilm;
