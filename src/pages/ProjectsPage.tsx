import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { cases, tracks } from '../data/cases';
import { moreWork } from '../data/moreWork';
import CaseRow from '../components/CaseRow';
import CaseMedia from '../components/CaseMedia';
import { Container, Section, Kicker, Reveal } from '../components/primitives';

const t = {
  nl: {
    kicker: 'Werk',
    title: 'Problemen, opgelost.',
    lead: 'Elk project hieronder begon met iets dat niet meer met de hand te doen was — of met een merk dat niet opviel. Dit is wat er gebouwd is, en wat het opleverde.',
    moreKicker: 'Meer werk',
    moreTitle: 'Experimenten & ouder werk',
    moreLead: 'Concepten, tools en creatief werk van de afgelopen jaren. Speelser van aard — maar hier is het vak geleerd.',
    visit: 'Bekijk ↗',
    watch: 'Video ↗',
  },
  en: {
    kicker: 'Work',
    title: 'Problems, solved.',
    lead: 'Every project below started with something that could no longer be done by hand — or with a brand that didn’t stand out. This is what got built, and what it delivered.',
    moreKicker: 'More work',
    moreTitle: 'Experiments & earlier work',
    moreLead: 'Concepts, tools and creative work from the past years. More playful in nature — but this is where the craft was learned.',
    visit: 'Visit ↗',
    watch: 'Video ↗',
  },
};

const ProjectsPage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];

  return (
    <main className="pt-16">
      {/* Page header */}
      <Section className="pb-0 md:pb-0 lg:pb-0">
        <Container>
          <Kicker>{c.kicker}</Kicker>
          <h1 className="mt-5 max-w-3xl text-4xl font-extralight tracking-display sm:text-5xl lg:text-6xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">
            {c.lead}
          </p>
        </Container>
      </Section>

      {/* Cases, gegroepeerd per spoor */}
      {tracks.map((track) => {
        const trackCases = cases.filter((x) => x.track === track.id);
        if (trackCases.length === 0) return null;
        return (
          <Section key={track.id} id={track.id} className="border-b border-line last-of-type:border-b-0">
            <Container>
              <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <h2 className="text-3xl font-light tracking-display lg:text-4xl">
                  {track.label[language]}
                </h2>
                <p className="text-[15px] text-muted">{track.blurb[language]}</p>
              </Reveal>
              <div className="mt-14 flex flex-col gap-20 lg:gap-28">
                {trackCases.map((item, i) => (
                  <CaseRow key={item.id} item={item} index={i} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Meer werk — secundaire grid, sober */}
      <Section className="border-t border-line bg-surface/40">
        <Container>
          <Kicker>{c.moreKicker}</Kicker>
          <h2 className="mt-5 text-3xl font-light tracking-display lg:text-4xl">
            {c.moreTitle}
          </h2>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
            {c.moreLead}
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {moreWork.map((item, i) => {
              const href = item.liveUrl || item.video;
              return (
                <Reveal as="li" key={item.id} delay={Math.min(i, 5) * 0.04}>
                  <div className="group">
                    <CaseMedia
                      src={item.image}
                      video={item.videoLoop}
                      poster={item.videoPoster}
                      label={item.title}
                      ratio="16/10"
                      // SVG-animaties netjes passend; screenshots/foto's/video's vullend
                      fit={item.image?.endsWith('.svg') ? 'contain' : 'cover'}
                    />
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-normal text-ink">{item.title}</h3>
                      <span className="shrink-0 text-xs tabular-nums text-muted">{item.year}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.subtitle[language]}
                    </p>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                      >
                        {item.video && !item.liveUrl ? c.watch : c.visit}
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-2xl text-3xl font-light tracking-display">
              {language === 'nl'
                ? 'Herken je je eigen probleem hierin?'
                : 'Recognise your own problem in any of this?'}
            </h2>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5"
            >
              {language === 'nl' ? 'Praat met me' : 'Talk to me'} →
            </Link>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
};

export default ProjectsPage;
