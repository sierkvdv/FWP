import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/* ------------------------------------------------------------------ *
 *  Klikbare kloon van Sierks eigen bedrijfssysteem (case 'bedrijfssysteem').
 *  De pagina's in /demo/systeem/ zijn de echte schermen van het systeem,
 *  opgeslagen vanaf een aparte demo-database met verzonnen klanten en
 *  bedragen. Er wordt niets opgeslagen of verstuurd.
 * ------------------------------------------------------------------ */

const BedrijfssysteemDemo: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate text-xs text-muted">
          {language === 'nl'
            ? 'demo · alle namen en bedragen zijn verzonnen'
            : 'demo · all names and amounts are made up'}
        </span>
        <a
          href="/demo/systeem/index.html"
          target="_blank"
          rel="noopener"
          className="ml-auto shrink-0 text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          {language === 'nl' ? 'Volledig scherm ↗' : 'Full screen ↗'}
        </a>
      </div>
      <iframe
        src="/demo/systeem/index.html"
        title={language === 'nl' ? 'Demo van het bedrijfssysteem' : 'Business system demo'}
        loading="lazy"
        className="block h-[44rem] w-full bg-bg md:h-[50rem]"
      />
    </div>
  );
};

export default BedrijfssysteemDemo;
