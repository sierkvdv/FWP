import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/** Deellink van een film: eigen pagina met preview (titel + poster). */
export function filmUrl(slug: string): string {
  return `${window.location.origin}/v/${slug}/`;
}

const copy = {
  nl: { share: 'Deel', copied: 'Link gekopieerd' },
  en: { share: 'Share', copied: 'Link copied' },
};

async function kopieer(tekst: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(tekst);
    return true;
  } catch {
    // Oudere browsers / geen toestemming: via een tijdelijk tekstveld.
    const el = document.createElement('textarea');
    el.value = tekst;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(el);
    return ok;
  }
}

/**
 * Deelknop onder een video. Telefoon: het deelmenu van het toestel
 * (WhatsApp, Mail, AirDrop…). Computer: link naar het klembord.
 */
const ShareButton: React.FC<{ slug: string; title: string; className?: string }> = ({
  slug,
  title,
  className = '',
}) => {
  const { language } = useLanguage();
  const c = copy[language];
  const [copied, setCopied] = useState(false);

  const deel = async () => {
    const url = filmUrl(slug);
    const telefoon = window.matchMedia('(pointer: coarse)').matches;
    if (telefoon && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: `${title} — FWP`, url });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return; // zelf geannuleerd
      }
    }
    if (await kopieer(url)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } else {
      // Kopiëren geweigerd (bv. venster zonder focus): link tonen om zelf te kopiëren.
      window.prompt(language === 'nl' ? 'Kopieer deze link' : 'Copy this link', url);
    }
  };

  return (
    <button
      type="button"
      onClick={deel}
      aria-label={`${c.share}: ${title}`}
      className={`inline-flex shrink-0 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span aria-live="polite">{copied ? c.copied : c.share}</span>
    </button>
  );
};

export default ShareButton;
