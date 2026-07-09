import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from './primitives';
import BrandMark from './BrandMark';
import AutoVideo from './AutoVideo';

const copy = {
  nl: {
    statement: { pre: 'Ik los bedrijfsproblemen op met techniek ', accent: 'én', post: ' communicatie.' },
    sub: 'Van slimme automatisering tot merken die opvallen — gebouwd door één maker.',
    cta: 'Bekijk werk',
    secondary: 'Praat met me',
    tracks: ['Automatiseren', 'Bouwen', 'Creëren'],
  },
  en: {
    statement: { pre: 'I solve business problems with technology ', accent: 'and', post: ' communication.' },
    sub: 'From smart automation to brands that stand out — built by one maker.',
    cta: 'See the work',
    secondary: 'Talk to me',
    tracks: ['Automate', 'Build', 'Create'],
  },
};

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = copy[language];

  const item = {
    initial: reduce ? {} : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden pt-16">
      {/* Video-achtergrond — stil, donker, subtiel. Overlay houdt tekst leesbaar. */}
      <div className="absolute inset-0" aria-hidden="true">
        <AutoVideo
          src="/videos/hero-seamless2.mp4"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid min-h-[72vh] grid-cols-1 items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
          {/* Statement */}
          <div className="lg:col-span-8">
            <motion.h1
              {...item}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="text-4xl font-extralight leading-[1.06] tracking-display sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              {t.statement.pre}
              <span className="text-accent">{t.statement.accent}</span>
              {t.statement.post}
            </motion.h1>

            <motion.p
              {...item}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="mt-7 max-w-prose text-lg leading-relaxed text-muted"
            >
              {t.sub}
            </motion.p>

            <motion.div
              {...item}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5"
              >
                {t.cta}
                <span className="transition-transform duration-200 ease-editorial group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {t.secondary}
              </Link>
            </motion.div>
          </div>

          {/* Merkteken — bouwt zich op volgens de logo-README */}
          <div className="hidden justify-end lg:col-span-4 lg:flex">
            <BrandMark className="w-56 xl:w-72" />
          </div>
        </div>

        {/* Spoor-rij — in de flow, geen overlap meer */}
        <motion.div
          {...item}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line py-6"
        >
          {t.tracks.map((track, i) => (
            <React.Fragment key={track}>
              {i > 0 && <span className="text-line">·</span>}
              <span className="kicker">{track}</span>
            </React.Fragment>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
