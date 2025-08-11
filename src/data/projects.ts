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
    demoUrl: 'https://cursor-flow-cyan.vercel.app',
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
    image: '/images/clonebox-animation.svg',
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
    image: '/images/neural-dreams-animation.svg',
    video: '/videos/neural-dreams-teaser.mp4',
    demoUrl: undefined,
    featured: true,
    year: 2024
  },
  {
    id: 'living-posters',
    title: 'Living Posters',
    subtitle: 'Dynamic Digital Art Installations',
    description: 'Interactieve digitale posters die reageren op beweging en geluid. Gebruikt computer vision en real-time rendering voor immersive ervaringen.',
    category: 'design',
    technologies: ['OpenCV', 'Processing', 'Max/MSP', 'Computer Vision'],
    image: '/images/living-posters-animation.svg',
    demoUrl: undefined,
    githubUrl: undefined,
    featured: true,
    year: 2024
  },
  {
    id: 'virtual-dj',
    title: 'Virtual DJ Booth',
    subtitle: 'Web-Based Music Mixing Platform',
    description: 'Een volledig functionele DJ applicatie in de browser met real-time audio processing, beat matching en visuele feedback.',
    category: 'music',
    technologies: ['Web Audio API', 'React', 'TypeScript', 'Canvas API'],
    image: '/images/virtual-dj-animation.svg',
    demoUrl: undefined,
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'modular-synth',
    title: 'Modular Synth',
    subtitle: 'Browser-Based Synthesizer',
    description: 'Een modulaire synthesizer die volledig in de browser draait. Features oscillators, filters, envelopes en patch cables.',
    category: 'music',
    technologies: ['Web Audio API', 'React', 'TypeScript', 'Modular Synthesis'],
    image: '/images/modular-synth-animation.svg',
    demoUrl: undefined,
    githubUrl: undefined,
    featured: false,
    year: 2024
  }
]; 