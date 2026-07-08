import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { cases, tracks } from '../data/cases';
import { moreWork } from '../data/moreWork';
import CaseMedia from '../components/CaseMedia';
import { domainOf } from '../components/CaseRow';
import { Container, Section, Kicker } from '../components/primitives';

const t = {
  nl: {
    back: '← Terug naar werk',
    problem: 'Het probleem',
    solution: 'De oplossing',
    result: 'Het resultaat',
    live: 'Bekijk live ↗',
    video: 'Bekijk video ↗',
    notFound: 'Niet gevonden.',
    next: 'Volgende case',
    ctaTitle: 'Een vergelijkbaar probleem?',
    ctaBtn: 'Praat met me',
  },
  en: {
    back: '← Back to work',
    problem: 'The problem',
    solution: 'The solution',
    result: 'The result',
    live: 'View live ↗',
    video: 'Watch video ↗',
    notFound: 'Not found.',
    next: 'Next case',
    ctaTitle: 'A similar problem?',
    ctaBtn: 'Talk to me',
  },
};

const ProjectDetailPage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];
  const { id } = useParams<{ id: string }>();

  const caseStudy = cases.find((x) => x.id === id);
  const workItem = !caseStudy ? moreWork.find((x) => x.id === id) : undefined;

  if (!caseStudy && !workItem) {
    return (
      <main className="pt-16">
        <Section>
          <Container>
            <h1 className="text-3xl font-light tracking-display">{c.notFound}</h1>
            <Link
              to="/projects"
              className="mt-6 inline-block text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {c.back}
            </Link>
          </Container>
        </Section>
      </main>
    );
  }

  // ---- Volwaardige case ----
  if (caseStudy) {
    const track = tracks.find((x) => x.id === caseStudy.track);
    const idx = cases.indexOf(caseStudy);
    const next = cases[(idx + 1) % cases.length];

    return (
      <main className="pt-16">
        <Section className="pb-0 md:pb-0 lg:pb-0">
          <Container>
            <Link
              to="/projects"
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {c.back}
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {track && <Kicker className="text-accent">{track.label[language]}</Kicker>}
              <span className="text-line">·</span>
              <Kicker>{caseStudy.year}</Kicker>
              {caseStudy.client && (
                <>
                  <span className="text-line">·</span>
                  <Kicker>{caseStudy.client}</Kicker>
                </>
              )}
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-extralight tracking-display sm:text-5xl lg:text-6xl">
              {caseStudy.title}
            </h1>
          </Container>
        </Section>

        <Section>
          <Container>
            <CaseMedia
              src={caseStudy.image}
              video={caseStudy.video}
              poster={caseStudy.videoPoster}
              label={caseStudy.title}
              ratio={caseStudy.video ? '16/9' : '21/9'}
            />

            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="border-t border-line pt-6">
                <Kicker>{c.problem}</Kicker>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {caseStudy.problem[language]}
                </p>
              </div>
              <div className="border-t border-line pt-6">
                <Kicker>{c.solution}</Kicker>
                <p className="mt-4 text-[15px] leading-relaxed text-ink">
                  {caseStudy.solution[language]}
                </p>
              </div>
              <div className="border-t border-accent pt-6">
                <Kicker className="text-accent">{c.result}</Kicker>
                {caseStudy.metric && (
                  <div className="mt-4 text-3xl font-light tracking-display text-accent">
                    {caseStudy.metric}
                  </div>
                )}
                <p className="mt-3 text-[15px] leading-relaxed text-ink">
                  {caseStudy.result[language]}
                </p>
              </div>
            </div>

            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-block text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {domainOf(caseStudy.liveUrl)} ↗
              </a>
            )}

            {/* Campagne-galerij */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <div className="mt-20">
                <Kicker>{language === 'nl' ? 'Uit de campagne' : 'From the campaign'}</Kicker>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {caseStudy.gallery.map((g) => (
                    <div key={g.mp4}>
                      <div
                        className="overflow-hidden rounded-lg border border-line bg-surface"
                        style={{ aspectRatio: '9/16' }}
                      >
                        <video
                          src={g.mp4}
                          poster={g.poster}
                          className="h-full w-full object-cover"
                          controls
                          preload="metadata"
                          playsInline
                        />
                      </div>
                      {g.title && <p className="mt-3 text-sm text-muted">{g.title}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>

        <Section className="border-t border-line">
          <Container>
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
              <div>
                <Kicker>{c.next}</Kicker>
                <Link
                  to={`/projects/${next.id}`}
                  className="mt-3 block text-3xl font-light tracking-display text-ink transition-colors hover:text-accent"
                >
                  {next.title} →
                </Link>
              </div>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5"
              >
                {c.ctaBtn} →
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  // ---- Meer-werk item (compact) ----
  const item = workItem!;
  const href = item.liveUrl || item.video;

  return (
    <main className="pt-16">
      <Section>
        <Container>
          <Link
            to="/projects"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {c.back}
          </Link>

          <div className="mt-10 flex items-center gap-3">
            <Kicker>{item.year}</Kicker>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-extralight tracking-display sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">
            {item.subtitle[language]}
          </p>

          <div className="mt-12 max-w-3xl">
            <CaseMedia src={item.image} label={item.title} ratio="16/10" />
          </div>

          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {item.video && !item.liveUrl ? c.video : c.live}
            </a>
          )}
        </Container>
      </Section>
    </main>
  );
};

export default ProjectDetailPage;
