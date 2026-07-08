import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { cases, tracks } from '../data/cases';
import Hero from '../components/Hero';
import AdShowcase from '../components/AdShowcase';
import CaseRow from '../components/CaseRow';
import { Container, Section, Kicker, Reveal } from '../components/primitives';

const t = {
  nl: {
    tracksKicker: 'Wat ik doe',
    tracksTitle: 'Eén maker, drie sporen.',
    tracksLead:
      'Van slimme automatisering en maatwerk-tools tot merken en content die opvallen. De rode draad: techniek die een echt probleem oplost, verteld in de taal van de klant.',
    workKicker: 'Geselecteerd werk',
    workTitle: 'Problemen, opgelost.',
    viewAll: 'Bekijk al het werk →',
    ctaTitle: 'Iets dat slimmer of scherper kan?',
    ctaSub: 'Vertel me het probleem — ik denk in techniek én communicatie.',
    ctaBtn: 'Praat met me',
  },
  en: {
    tracksKicker: 'What I do',
    tracksTitle: 'One maker, three tracks.',
    tracksLead:
      'From smart automation and custom tools to brands and content that stand out. The throughline: technology that solves a real problem, told in the client’s language.',
    workKicker: 'Selected work',
    workTitle: 'Problems, solved.',
    viewAll: 'See all work →',
    ctaTitle: 'Something that could be smarter or sharper?',
    ctaSub: 'Tell me the problem — I think in both technology and communication.',
    ctaBtn: 'Talk to me',
  },
};

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];
  const featured = cases.filter((x) => x.featured);

  return (
    <main>
      <Hero />

      {/* Reclamevideo's — de nieuwe tak, prominent */}
      <AdShowcase />

      {/* Drie sporen */}
      <Section id="tracks" className="border-t border-line">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Kicker>{c.tracksKicker}</Kicker>
              <h2 className="mt-5 text-4xl font-light tracking-display lg:text-5xl">
                {c.tracksTitle}
              </h2>
              <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">
                {c.tracksLead}
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul>
                {tracks.map((track, i) => (
                  <Reveal
                    as="li"
                    key={track.id}
                    delay={i * 0.06}
                    className="grid grid-cols-[auto,1fr] items-baseline gap-x-6 border-t border-line py-7 first:border-t-0 first:pt-0"
                  >
                    <span className="text-sm tabular-nums text-muted">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-2xl font-light tracking-display">
                        {track.label[language]}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">
                        {track.blurb[language]}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Geselecteerd werk */}
      <Section id="work" className="border-t border-line">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Kicker>{c.workKicker}</Kicker>
              <h2 className="mt-5 text-4xl font-light tracking-display lg:text-5xl">
                {c.workTitle}
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden shrink-0 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline sm:inline"
            >
              {c.viewAll}
            </Link>
          </div>

          <div className="mt-16 flex flex-col gap-24 lg:gap-32">
            {featured.map((item, i) => (
              <CaseRow key={item.id} item={item} index={i} />
            ))}
          </div>

          <div className="mt-16 sm:hidden">
            <Link
              to="/projects"
              className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {c.viewAll}
            </Link>
          </div>
        </Container>
      </Section>

      {/* Contact-CTA */}
      <Section className="border-t border-line">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-2xl text-3xl font-light tracking-display lg:text-4xl">
                {c.ctaTitle}
              </h2>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
                {c.ctaSub}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-line px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 ease-editorial hover:border-accent hover:text-accent"
            >
              {c.ctaBtn} →
            </Link>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
};

export default HomePage;
