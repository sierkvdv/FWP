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
  /** Case-video (mp4) — wint van image in de kaart. */
  video?: string;
  videoPoster?: string;
  /** Beeldverhouding van de kaart-media (default 4/3). */
  mediaRatio?: string;
  /** Extra campagne-media op de detailpagina (video óf beeld). */
  gallery?: { mp4?: string; img?: string; poster?: string; title?: string }[];
  /** Beeldverhouding van de galerij-tegels (default '9/16'). */
  galleryRatio?: string;
  /** 'cover' (default) of 'contain' (volledig werk tonen, bv. posters/logo's). */
  galleryFit?: 'cover' | 'contain';
  /** Kopje boven de galerij (default 'Uit de campagne'). */
  galleryLabel?: Localized;
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
  /** Naadloze loop-video voor de kaart (wint van image). */
  videoLoop?: string;
  videoPoster?: string;
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
  /** Muzieklabel (Bloodline / Deepstepper). */
  bloodline?: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
} 