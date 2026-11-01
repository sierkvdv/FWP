import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { CLUB_URL, useClubStatus } from '../lib/clubStatus';
import AutoVideo from './AutoVideo';
import { Container, Section, Kicker, Reveal } from './primitives';

const DIEPTE_URL = 'https://diep.sierk.dev/';
// Totale diepte van de wereld in DIEPTE (diep-site: 8 biomen, 557 m).
const DIEPTE_METERS = 557;

const t = {
  nl: {
    kicker: 'Nu in beta',
    titel: 'Twee dingen die ik nu bouw. Kom ze stukmaken.',
    lead: 'Allebei nog ruw, allebei speelbaar. Ik zoek mensen die erin rondlopen, spelen en zeggen wat er beter moet.',
    beta: 'Beta',
    club: {
      live: 'Live',
      open: '24/7 open',
      binnen: 'in de club',
      tekst: 'Een 3D-club die dag en nacht draait op de mixen van Deepstepper. Loop rond met je eigen poppetje, dans en praat met wie er is. Of zet je VR-bril op.',
      tags: ['Browser', 'Telefoon', 'VR-bril', 'Geen account'],
      knop: 'Ga de club in',
      kijk: 'Kijk de stream',
      feedback: 'Idee? Typ !idea in de chat.',
    },
    diepte: {
      tekst: `Co-op boorgame voor één tot vier spelers op één bank. Boor samen ${DIEPTE_METERS} meter de grond in, stut je gangen en sleep elkaar eruit als je strandt.`,
      tags: ['Windows', 'Controller', '1–4 spelers', 'Testbuild'],
      knop: 'Download de testbuild',
      aanmelden: 'Meld je aan als tester',
      feedback: 'Feedback gaat via het formulier op de site.',
      diep: 'diep',
    },
  },
  en: {
    kicker: 'Now in beta',
    titel: 'Two things I’m building right now. Come break them.',
    lead: 'Both still rough, both playable. I’m looking for people to walk around, play, and tell me what needs fixing.',
    beta: 'Beta',
    club: {
      live: 'Live',
      open: 'Open 24/7',
      binnen: 'in the club',
      tekst: 'A 3D club running day and night on Deepstepper’s mixes. Walk around as your own character, dance and talk to whoever is there. Or put on your VR headset.',
      tags: ['Browser', 'Phone', 'VR headset', 'No account'],
      knop: 'Enter the club',
      kijk: 'Watch the stream',
      feedback: 'Got an idea? Type !idea in the chat.',
    },
    diepte: {
      tekst: `Couch co-op drilling game for one to four players. Drill ${DIEPTE_METERS} metres down together, shore up your tunnels and drag each other out when you get stuck.`,
      tags: ['Windows', 'Controller', '1–4 players', 'Test build'],
      knop: 'Download the test build',
      aanmelden: 'Sign up as a tester',
      feedback: 'Feedback goes through the form on the site.',
      diep: 'deep',
    },
  },
};

const Tags: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((x) => (
      <li
        key={x}
        className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-label text-white/80 backdrop-blur-sm"
      >
        {x}
      </li>
    ))}
  </ul>
);

const BetaStempel: React.FC<{ label: string; className?: string }> = ({ label, className = '' }) => (
  <span
    className={`inline-block -rotate-6 rounded-sm border-2 px-2 py-0.5 text-xs font-semibold uppercase tracking-label ${className}`}
  >
    {label}
  </span>
);

/** Equalizer-staafjes die meedansen (stil als iemand minder beweging wil). */
const Equalizer: React.FC = () => (
  <span className="beta-eq inline-flex h-3 items-end gap-[2px]" aria-hidden>
    {[0, 1, 2, 3].map((i) => (
      <span key={i} style={{ animationDelay: `${i * -0.23}s` }} />
    ))}
  </span>
);

const ClubKaart: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language].club;
  const s = useClubStatus(15000);

  return (
    <article className="group relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface lg:min-h-[640px]">
      <AutoVideo
        src="/videos/beta/club-loop-v1.mp4"
        poster="/images/beta/club-poster-v1.jpg"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />

      <div className="relative flex items-center justify-between gap-4 p-6 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs uppercase tracking-label text-white backdrop-blur-sm">
          {s.live ? (
            <>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500">
                <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75" />
              </span>
              {c.live}
            </>
          ) : (
            <>
              <Equalizer />
              {c.open}
            </>
          )}
          {s.ok && s.bezoekers > 0 && (
            <span className="normal-case tracking-normal text-white/70">
              · {s.bezoekers} {c.binnen}
            </span>
          )}
        </span>
        <BetaStempel label={t[language].beta} className="border-fuchsia-400 text-fuchsia-300" />
      </div>

      <div className="relative p-6 sm:p-8">
        {s.live && s.titel && (
          <p className="mb-3 truncate text-xs uppercase tracking-label text-fuchsia-300">♪ {s.titel}</p>
        )}
        <h3 className="text-4xl font-extralight tracking-display text-white sm:text-5xl">
          Deep SamSo Club
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">{c.tekst}</p>
        <div className="mt-5">
          <Tags items={c.tags} />
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={CLUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(217,70,239,0.45)] transition hover:bg-fuchsia-400"
          >
            {c.knop} →
          </a>
          <Link
            to="/live"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm text-white transition hover:border-white/60"
          >
            {c.kijk}
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/55">{c.feedback}</p>
      </div>
    </article>
  );
};

const DiepteKaart: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language].diepte;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Hoe verder je scrolt, hoe dieper de schacht in beeld komt en hoe verder de meter loopt.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const beeldY = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-41%'], { clamp: true });
  const meters = useTransform(scrollYProgress, [0.1, 0.9], [0, DIEPTE_METERS], { clamp: true });
  const meterTekst = useTransform(meters, (m) => `${Math.round(m)} m`);
  const wijzer = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'], { clamp: true });

  return (
    <article
      ref={ref}
      className="group relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface lg:min-h-[640px]"
    >
      {/* Het beeld is hoger dan de kaart en schuift omhoog: je zakt de schacht in. */}
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-editorial group-hover:scale-105">
        <motion.img
          src="/images/beta/diepte-schacht-v1.webp"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute left-0 top-0 h-[170%] w-full object-cover"
          style={{ y: reduce ? '-20%' : beeldY }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

      {/* Dieptemeter langs de rechterrand */}
      <div className="pointer-events-none absolute bottom-10 right-5 top-24 hidden w-10 sm:block" aria-hidden>
        <div className="absolute inset-y-0 right-0 w-px bg-amber-200/30" />
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className="absolute right-0 h-px bg-amber-200/40"
            style={{ top: `${i * 10}%`, width: i % 5 === 0 ? 14 : 7 }}
          />
        ))}
        <motion.div className="absolute right-0 flex -translate-y-1/2 items-center gap-2" style={{ top: wijzer }}>
          <motion.span className="whitespace-nowrap rounded-sm bg-amber-400 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-black">
            {meterTekst}
          </motion.span>
        </motion.div>
      </div>

      <div className="relative flex items-center justify-between gap-4 p-6 sm:p-8">
        <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs uppercase tracking-label text-amber-200 backdrop-blur-sm">
          {DIEPTE_METERS} m {c.diep}
        </span>
        <BetaStempel label={t[language].beta} className="border-amber-400 text-amber-300 sm:mr-14" />
      </div>

      <div className="relative p-6 sm:p-8 sm:pr-20">
        <h3>
          <img
            src="/images/beta/diepte-logo-v1.webp"
            alt="DIEPTE"
            width={672}
            height={288}
            loading="lazy"
            className="-ml-2 w-64 drop-shadow-[0_6px_24px_rgba(255,140,0,0.35)] sm:w-80"
          />
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/80">{c.tekst}</p>
        <div className="mt-5">
          <Tags items={c.tags} />
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={`${DIEPTE_URL}#speel`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-black shadow-[0_0_30px_rgba(251,191,36,0.4)] transition hover:bg-amber-300"
          >
            {c.knop} ↓
          </a>
          <a
            href={`${DIEPTE_URL}#doe-mee`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm text-white transition hover:border-white/60"
          >
            {c.aanmelden}
          </a>
        </div>
        <p className="mt-4 text-xs text-white/55">{c.feedback}</p>
      </div>
    </article>
  );
};

/**
 * "Nu in beta": de projecten waar Sierk testers voor zoekt (Deep SamSo Club, DIEPTE).
 * Staat op de homepage direct onder de hero en bovenaan /projects.
 */
const BetaLab: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language } = useLanguage();
  const c = t[language];

  return (
    <Section id="beta" className={className}>
      <Container>
        <Reveal className="max-w-3xl">
          <Kicker className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {c.kicker}
          </Kicker>
          <h2 className="mt-5 text-4xl font-light tracking-display lg:text-5xl">{c.titel}</h2>
          <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">{c.lead}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <ClubKaart />
          </Reveal>
          <Reveal delay={0.08}>
            <DiepteKaart />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};

export default BetaLab;
