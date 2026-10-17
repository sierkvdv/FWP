import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useClubStatus } from '../lib/clubStatus';

/** Tv-icoontje (scherm met pootjes) met een rood LIVE-lampje. */
export const TvIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2.5" y="5" width="19" height="13" rx="2" />
    <path d="M8 21h8M12 18v3" />
    <path d="M7 3l5 2 5-2" />
  </svg>
);

/**
 * Zwevende LIVE-badge, als een tv-zender: rood lampje, tv-icoontje, "LIVE" en hoeveel mensen er in de club zijn.
 * Staat op elke pagina rechtsonder zolang Sierk draait (status van club.sierk.dev), niet op /live zelf. Klik = naar /live.
 */
const LiveBadge: React.FC = () => {
  const { language } = useLanguage();
  const s = useClubStatus(15000);
  const { pathname } = useLocation();
  if (!s.live || pathname === '/live') return null;
  const t = language === 'nl'
    ? { live: 'LIVE', sub: 'Deep SamSo Club', kijk: s.bezoekers > 0 ? `${s.bezoekers} in de club` : 'nu aan het draaien' }
    : { live: 'LIVE', sub: 'Deep SamSo Club', kijk: s.bezoekers > 0 ? `${s.bezoekers} in the club` : 'playing now' };
  return (
    <Link
      to="/live"
      aria-label={`${t.live}: ${t.sub}`}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-red-500/60 bg-bg/90 py-2 pl-2 pr-4 text-ink shadow-[0_0_24px_rgba(239,68,68,0.35)] backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] sm:bottom-6 sm:right-6"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
        <TvIcon className="h-5 w-5" />
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-80" />
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-bg bg-red-500" />
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400">● {t.live}</span>
        <span className="text-sm">{t.sub}</span>
        <span className="text-[11px] text-muted">{t.kijk}</span>
      </span>
    </Link>
  );
};

export default LiveBadge;
