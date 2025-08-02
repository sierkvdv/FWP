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