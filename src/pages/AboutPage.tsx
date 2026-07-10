import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { contactInfo } from '../data/contact';
import { Container, Section, Kicker, Reveal } from '../components/primitives';

const t = {
  nl: {
    kicker: 'Aanpak',
    title: 'Techniek bouwt het. Communicatie verkoopt het.',
    intro1:
      'Ik ben Sierk van der Velde. FWP is geen bureau — het is één maker die twee vakken combineert die zelden in dezelfde persoon zitten: software bouwen en merken laten opvallen.',
    intro2:
      'De meeste bedrijven huren daar twee partijen voor in, die elkaar vervolgens niet verstaan. Bij mij zit het in één hoofd. De automatisering die ik bouw, snapt waarom de klant belt. De campagne die ik maak, weet wat het product technisch kan.',
    howKicker: 'Hoe ik werk',
    steps: [
      {
        n: '01',
        title: 'Eerst het probleem',
        body: 'Geen intake over tools of features. Wat kost je nu tijd, geld of klanten? Daar beginnen we.',
      },
      {
        n: '02',
        title: 'Klein bewijs, snel',
        body: 'Binnen dagen een werkende eerste versie — geen wekenlange offertes. Je ziet het draaien voor je verder investeert.',
      },
      {
        n: '03',
        title: 'Bouwen wat blijft',
        body: 'Degelijk, onderhoudbaar, van jou. Geen abonnement op mij; je kunt ermee verder zonder mij.',
      },
      {
        n: '04',
        title: 'Vertellen wat het doet',
        body: 'Een tool die niemand begrijpt, bestaat niet. Ik lever het verhaal erbij — voor je klanten, je team of je markt.',
      },
    ],
    stackKicker: 'Waarmee',
    stackLead: 'Gereedschap is een middel. Dit is waar ik dagelijks mee werk:',
    stack: [
      ['Automatisering & AI', 'agents, chatbots, kennisbanken, koppelingen (API’s, CRM)'],
      ['Web & apps', 'React, TypeScript, Next.js, Node, Postgres'],
      ['Content & beeld', 'AI-video en -beeld, montage, huisstijl, campagnes'],
      ['Infra', 'eigen servers, CI/CD, betaalintegraties (o.a. Mollie)'],
    ],
    asideKicker: 'En verder',
    aside:
      'Buiten werktijd sta ik als DJ achter de draaitafels en bouw ik audio-tools — vandaar dat mijn werk voor muziek en events een eigen hoekje in het portfolio heeft. Het scherpt hetzelfde vak: iets maken waar mensen op reageren.',
    ctaTitle: 'Benieuwd of ik jouw probleem herken?',
    ctaBtn: 'Praat met me',
  },
  en: {
    kicker: 'Approach',
    title: 'Technology builds it. Communication sells it.',
    intro1:
      'I’m Sierk van der Velde. FWP isn’t an agency — it’s one maker combining two crafts that rarely live in the same person: building software and making brands stand out.',
    intro2:
      'Most companies hire two parties for that, who then fail to understand each other. With me it lives in one head. The automation I build knows why the customer calls. The campaign I make knows what the product can technically do.',
    howKicker: 'How I work',
    steps: [
      {
        n: '01',
        title: 'The problem first',
        body: 'No intake about tools or features. What is costing you time, money or customers right now? That’s where we start.',
      },
      {
        n: '02',
        title: 'Small proof, fast',
        body: 'A working first version within days — not weeks of proposals. You see it run before you invest further.',
      },
      {
        n: '03',
        title: 'Build what lasts',
        body: 'Solid, maintainable, yours. No subscription to me; you can carry on without me.',
      },
      {
        n: '04',
        title: 'Tell what it does',
        body: 'A tool nobody understands doesn’t exist. I deliver the story with it — for your customers, your team or your market.',
      },
    ],
    stackKicker: 'With what',
    stackLead: 'Tools are a means. This is what I work with daily:',
    stack: [
      ['Automation & AI', 'agents, chatbots, knowledge bases, integrations (APIs, CRM)'],
      ['Web & apps', 'React, TypeScript, Next.js, Node, Postgres'],
      ['Content & visuals', 'AI video and imagery, editing, brand identity, campaigns'],
      ['Infra', 'own servers, CI/CD, payment integrations (incl. Mollie)'],
    ],
    asideKicker: 'Beyond that',
    aside:
      'Outside working hours I DJ and build audio tools — which is why music and event work has its own corner in the portfolio. It sharpens the same craft: making something people respond to.',
    ctaTitle: 'Curious whether I recognise your problem?',
    ctaBtn: 'Talk to me',
  },
};

const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];

  return (
    <main className="pt-16">
      {/* Statement */}
      <Section>
        <Container>
          <Kicker>{c.kicker}</Kicker>
          <h1 className="mt-5 max-w-4xl text-4xl font-extralight leading-display tracking-display sm:text-5xl lg:text-6xl">
            {c.title}
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <p className="max-w-prose text-[15px] leading-relaxed text-ink">{c.intro1}</p>
            <p className="max-w-prose text-[15px] leading-relaxed text-muted">{c.intro2}</p>
          </div>
        </Container>
      </Section>

      {/* Hoe ik werk */}
      <Section className="border-t border-line">
        <Container>
          <Kicker>{c.howKicker}</Kicker>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {c.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.05} className="border-t border-line pt-6">
                <div className="flex items-baseline gap-5">
                  <span className="text-sm tabular-nums text-accent">{step.n}</span>
                  <div>
                    <h2 className="text-xl font-normal text-ink">{step.title}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Stack — sobere tabelvorm */}
      <Section className="border-t border-line">
        <Container>
          <Kicker>{c.stackKicker}</Kicker>
          <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-muted">{c.stackLead}</p>
          <div className="mt-8 max-w-3xl">
            {c.stack.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-1 border-t border-line py-4 sm:grid-cols-[220px,1fr] sm:gap-6"
              >
                <span className="text-sm font-medium text-ink">{label}</span>
                <span className="text-sm leading-relaxed text-muted">{value}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Muziek — voetnoot, geen hoofdverhaal */}
      <Section className="border-t border-line">
        <Container>
          <div className="max-w-prose">
            <Kicker>{c.asideKicker}</Kicker>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.aside}</p>
            {contactInfo.bloodline && (
              <a
                href={contactInfo.bloodline}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {language === 'nl'
                  ? 'Mijn muzieklabel: Bloodline ↗'
                  : 'My music label: Bloodline ↗'}
              </a>
            )}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t border-line">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-2xl text-3xl font-light tracking-display">{c.ctaTitle}</h2>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5"
            >
              {c.ctaBtn} →
            </Link>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
};

export default AboutPage;
