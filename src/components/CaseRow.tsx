import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Reveal } from './primitives';
import CaseMedia from './CaseMedia';

const trackLabel: Record<CaseStudy['track'], string> = {
  automatiseren: 'Automatiseren',
  bouwen: 'Bouwen',
  creeren: 'Creëren',
};

const CaseRow: React.FC<{ item: CaseStudy; index: number }> = ({ item, index }) => {
  const { language } = useLanguage();
  const flip = index % 2 === 1;

  return (
    <Reveal className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
      {/* Beeld */}
      <div className={flip ? 'md:order-2' : ''}>
        <CaseMedia src={item.image} label={item.title} ratio="4/3" />
      </div>

      {/* Tekst */}
      <div className={flip ? 'md:order-1' : ''}>
        <div className="flex items-center gap-3">
          <span className="kicker text-accent">{trackLabel[item.track]}</span>
          <span className="text-line">·</span>
          <span className="kicker">{item.year}</span>
        </div>

        <h3 className="mt-4 text-3xl font-light tracking-display lg:text-4xl">
          {item.title}
        </h3>

        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          {item.problem[language]}
        </p>
        <p className="mt-3 flex gap-2 text-[15px] leading-relaxed text-ink">
          <span className="select-none text-accent">→</span>
          <span>{item.solution[language]}</span>
        </p>

        <div className="mt-6 border-t border-line pt-5">
          {item.metric && (
            <div className="text-2xl font-light tracking-display text-accent">
              {item.metric}
            </div>
          )}
          <p className="mt-1 text-[15px] leading-relaxed text-ink">
            {item.result[language]}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-5 text-sm">
          <Link
            to={`/projects/${item.id}`}
            className="text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {language === 'nl' ? 'Lees case →' : 'Read case →'}
          </Link>
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {language === 'nl' ? 'Live ↗' : 'Live ↗'}
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default CaseRow;
