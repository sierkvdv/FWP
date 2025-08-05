import { Project } from '../types';

// 🚀 EENVOUDIG PROJECTEN TOEVOEGEN:
// Voeg gewoon een nieuwe entry toe onder deze lijst met dit format:
// {
//   id: 'unieke-naam',
//   title: 'Project Titel',
//   subtitle: 'Korte beschrijving',
//   description: 'Lange beschrijving...',
//   category: 'web', // of 'ai', 'music', 'design', 'software'
//   technologies: ['React', 'TypeScript'],
//   image: '/images/placeholder.svg',
//   demoUrl: 'https://jouw-demo-url.com', // of undefined
//   githubUrl: 'https://github.com/username/project', // of undefined
//   featured: true, // of false
//   year: 2024
// }

export const projects: Project[] = [
  {
    id: 'cursorflow',
    title: 'CursorFlow',
    subtitle: 'Interactive Cursor Tracking & Visual Effects',
    description: 'Een interactieve website die je cursor volgt met real-time particle effects en geluidseffecten. Elke muisbeweging creëert unieke visuele patronen met Web Audio API en Canvas API.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Canvas API', 'Web Audio API', 'Framer Motion'],
    image: '/images/cursorflow-animation.svg',
    demoUrl: 'https://cursor-flow-9bnzmvftu-sierks-projects.vercel.app/',
    githubUrl: undefined,
    featured: true,
    year: 2024
  },
  {
    id: 'clonebox',
    title: 'Clonebox',
    subtitle: 'USB Backup Tool',
    description: 'Een professionele USB backup tool ontwikkeld met Electron en Node.js. Features real-time progress tracking en automatische drive detectie.',
    category: 'software',
    technologies: ['Electron', 'Node.js', 'React', 'TypeScript'],
    image: '/images/clonebox-preview.svg',
    demoUrl: undefined,
    githubUrl: 'https://github.com/sierkvdv/First-Electron-Clonebox',
    featured: true,
    year: 2024
  },
  {
    id: 'neural-dreams',
    title: 'Neural Dreams',
    subtitle: 'AI-Generated Surrealist Short Film',
    description: 'Een 30-seconden surrealistische film gegenereerd met Runway ML. Glitchy transitions en Error Instruments vibes.',
    category: 'ai',
    technologies: ['Runway ML', 'After Effects', 'AI Video Generation'],
    image: '/images/placeholder.svg',
    video: '/videos/neural-dreams-teaser.mp4',
    demoUrl: undefined,
    featured: true,
    year: 2024
  }
]; 