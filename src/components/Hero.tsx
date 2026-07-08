import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from './primitives';

const copy = {
  nl: {
    statement: { pre: 'Ik los bedrijfsproblemen op met techniek ', accent: 'én', post: ' communicatie.' },
    sub: 'Van slimme automatisering tot merken die opvallen — gebouwd door één maker.',
    cta: 'Bekijk werk',
    secondary: 'Praat met me',
  },
  en: {
    statement: { pre: 'I solve business problems with technology ', accent: 'and', post: ' communication.' },
    sub: 'From smart automation to brands that stand out — built by one maker.',
    cta: 'See the work',
    secondary: 'Talk to me',
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
    <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-16">
      {/* Zeer subtiele, statische raster-textuur — geen animatie, geen glow. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(90% 80% at 75% 15%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(90% 80% at 75% 15%, black 0%, transparent 70%)',
        }}
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <motion.h1
            {...item}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-[2.75rem] font-extralight leading-[1.06] tracking-display sm:text-6xl lg:text-[5.25rem]"
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
            className="mt-10 flex items-center gap-7"
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
      </Container>

      {/* Spoor-rij, onderaan de hero. */}
      <motion.div
        {...item}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="absolute inset-x-0 bottom-8"
      >
        <Container>
          <div className="flex items-center gap-4 border-t border-line pt-5">
            <span className="kicker">Automatiseren</span>
            <span className="text-line">·</span>
            <span className="kicker">Bouwen</span>
            <span className="text-line">·</span>
            <span className="kicker">Creëren</span>
          </div>
        </Container>
      </motion.div>
    </section>
  );
};

export default Hero;
