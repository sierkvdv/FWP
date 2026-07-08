import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: '/projects', label: { nl: 'Werk', en: 'Work' } },
    { to: '/about', label: { nl: 'Aanpak', en: 'Approach' } },
    { to: '/contact', label: { nl: 'Contact', en: 'Contact' } },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors duration-200 ease-editorial ${
      isActive ? 'text-ink' : 'text-muted hover:text-ink'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link to="/" className="flex items-center" aria-label="FWP — home">
          <img
            src="/logo/fwp-logo-horizontal-dark.svg"
            alt="FWP — Fieldworks Production"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label[language]}
            </NavLink>
          ))}
          <LangSwitch language={language} setLanguage={setLanguage} />
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center text-muted hover:text-ink md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-200 ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-200 ${
                open ? '-translate-y-1 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="py-2 text-base text-muted hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label[language]}
              </NavLink>
            ))}
            <div className="pt-3">
              <LangSwitch language={language} setLanguage={setLanguage} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const LangSwitch: React.FC<{
  language: 'nl' | 'en';
  setLanguage: (l: 'nl' | 'en') => void;
}> = ({ language, setLanguage }) => (
  <div className="flex items-center gap-1 text-xs">
    {(['nl', 'en'] as const).map((l, i) => (
      <React.Fragment key={l}>
        {i === 1 && <span className="text-line">/</span>}
        <button
          onClick={() => setLanguage(l)}
          className={`uppercase tracking-label transition-colors ${
            language === l ? 'text-accent' : 'text-muted hover:text-ink'
          }`}
          aria-pressed={language === l}
        >
          {l}
        </button>
      </React.Fragment>
    ))}
  </div>
);

export default Navigation;
