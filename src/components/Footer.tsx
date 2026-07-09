import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { contactInfo } from '../data/contact';
import { Container } from './primitives';
import Wordmark from './Wordmark';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const year = 2026;

  const socials = [
    { label: 'LinkedIn', href: contactInfo.linkedin },
    { label: 'GitHub', href: contactInfo.github },
    { label: 'Instagram', href: contactInfo.instagram || '#' },
  ];

  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-3 text-sm text-muted">
              {language === 'nl'
                ? 'Techniek én communicatie, door één maker.'
                : 'Technology and communication, by one maker.'}
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-4 inline-block text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <nav className="flex gap-6 text-sm">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-6 text-sm">
              <Link to="/projects" className="text-muted transition-colors hover:text-ink">
                {language === 'nl' ? 'Werk' : 'Work'}
              </Link>
              <Link to="/contact" className="text-muted transition-colors hover:text-ink">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          © {year} Fieldworks Production — Sierk van der Velde
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
