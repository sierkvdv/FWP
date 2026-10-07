import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { filmBySlug } from '../data/films';
import ShareButton from '../components/ShareButton';
import { Container, Section, Kicker } from '../components/primitives';

const t = {
  nl: {
    kicker: 'Video',
    by: 'Gemaakt door Fieldworks Production',
    play: 'Afspelen',
    cta: 'Ook zo’n video?',
    ctaBtn: 'Neem contact op',
    case: 'Bekijk de case →',
    more: 'Meer werk →',
    notFound: 'Deze video bestaat niet (meer).',
  },
  en: {
    kicker: 'Video',
    by: 'Made by Fieldworks Production',
    play: 'Play',
    cta: 'Want a video like this?',
    ctaBtn: 'Get in touch',
    case: 'See the case →',
    more: 'More work →',
    notFound: 'This video does not exist (anymore).',
  },
};

/**
 * Deelpagina van één film (/v/<slug>/): de video groot, met geluid
 * na één tik. De preview in WhatsApp/LinkedIn komt uit de HTML die
 * scripts/deelpaginas.js na de build per film schrijft.
 */
const VideoPage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];
  const { slug } = useParams<{ slug: string }>();
  const film = filmBySlug(slug);
  const ref = useRef<HTMLVideoElement>(null);
  const [gestart, setGestart] = useState(false);

  useEffect(() => {
    if (film) document.title = `${film.title} — FWP`;
  }, [film]);

  if (!film) {
    return (
      <main className="pt-16">
        <Section>
          <Container>
            <h1 className="text-3xl font-light tracking-display">{c.notFound}</h1>
            <Link
              to="/projects"
              className="mt-6 inline-block text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {c.more}
            </Link>
          </Container>
        </Section>
      </main>
    );
  }

  const staand = film.ratio === '9/16';
  const speel = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      /* geweigerd — de bediening blijft beschikbaar */
    });
  };

  return (
    <main className="pt-16">
      <Section className="pb-0 md:pb-0 lg:pb-0">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <Kicker className="text-accent">{film.context || c.kicker}</Kicker>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-extralight tracking-display sm:text-5xl lg:text-6xl">
            {film.title}
          </h1>
        </Container>
      </Section>

      <Section className="pt-12 md:pt-14 lg:pt-16">
        <Container>
          <div className={staand ? 'mx-auto max-w-sm' : ''}>
            <div
              className="relative overflow-hidden rounded-lg border border-line bg-surface"
              style={{ aspectRatio: film.ratio }}
            >
              <video
                ref={ref}
                src={film.mp4}
                poster={film.poster}
                className="h-full w-full object-cover"
                controls={gestart}
                playsInline
                preload="metadata"
                onPlay={() => setGestart(true)}
              />
              {!gestart && (
                <button
                  type="button"
                  onClick={speel}
                  aria-label={c.play}
                  className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-200 hover:bg-black/10"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-[#04110f] transition-transform duration-200 ease-editorial group-hover:scale-105">
                    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-muted">{c.by}</p>
              <ShareButton slug={film.slug} title={film.title} />
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-2xl font-light tracking-display">{c.cta}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5"
              >
                {c.ctaBtn} →
              </Link>
              <Link
                to={film.caseId ? `/projects/${film.caseId}` : '/projects'}
                className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {film.caseId ? c.case : c.more}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default VideoPage;
