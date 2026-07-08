export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'ai' | 'web' | 'music' | 'design' | 'software';
  technologies: string[];
  image: string;
  video?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
}

/* ------------------------------------------------------------------ *
 * FWP redesign — content model. Groepeer NAAR WAT HET DEED voor de
 * klant, niet naar techniek. Alle klant-tekst is tweetalig (NL/EN).
 * ------------------------------------------------------------------ */

export type Track = 'automatiseren' | 'bouwen' | 'creeren';

/** Tweetalige string. NL is default; EN vult /en. */
export interface Localized {
  nl: string;
  en: string;
}

/** Een volwaardige case: probleem -> oplossing -> resultaat. */
export interface CaseStudy {
  id: string;
  title: string;
  client?: string;
  track: Track;
  problem: Localized;
  solution: Localized;
  result: Localized;
  /** Het cyaan accent-getal, taal-neutraal. Bv. "100+ foutcodes". */
  metric?: string;
  image?: string;
  liveUrl?: string;
  year: number;
  /** Toont op de homepage. */
  featured?: boolean;
}

/** Compacte kaart voor de secundaire "Meer werk"-grid. */
export interface WorkItem {
  id: string;
  title: string;
  subtitle: Localized;
  track?: Track;
  image?: string;
  liveUrl?: string;
  video?: string;
  year: number;
}

/** Metadata per spoor voor de overzicht-sectie. */
export interface TrackMeta {
  id: Track;
  label: Localized;
  blurb: Localized;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'music';
  level: number; // 1-5
  icon: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  twitter?: string;
  instagram?: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
} 