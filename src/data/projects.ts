import { Project } from '../types';

// 🚀 EENVOUDIG PROJECTEN TOEVOEGEN - Updated:
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
    featured: true,
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
    featured: true,
    year: 2024
  },
  {
    id: 'ai-album-gen',
    title: 'AI Album Generator',
    subtitle: 'Betaalbare Afbeeldingsgenerator met Editor',
    description: 'Een betaalbare afbeeldingsgenerator waarbij je per 5 afbeeldingen betaalt. Geen abonnement nodig! Inclusief gratis bewerker met contrast effecten, tekst toevoegen en layer bewerking.',
    category: 'ai',
    technologies: ['AI', 'Image Generation', 'React', 'Editor', 'Vercel'],
    image: '/images/ai-album-gen-animation.svg',
    demoUrl: 'https://ai-album-gen.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'game-of-life',
    title: 'Game of Life',
    subtitle: 'Conway\'s Game of Life Simulator',
    description: 'Een interactieve implementatie van Conway\'s Game of Life. Bekijk hoe cellulaire automaten evolueren volgens eenvoudige regels en creëer fascinerende patronen.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Canvas API', 'Algorithms', 'Cellular Automata'],
    image: '/images/game-of-life-animation.svg',
    demoUrl: 'https://game-of-life-kappa-wine.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'codebuddy',
    title: 'CodeBuddy',
    subtitle: 'Interactive Coding Learning Platform',
    description: 'Leer programmeren door interactieve games! Reis door magische werelden, los programmeeruitdagingen op en zie je robot buddy je code tot leven brengen. Met XP systeem, badges en thematische werelden.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Gamification', 'Education', 'Interactive Learning'],
    image: '/images/codebuddy-animation.svg',
    demoUrl: 'https://codebuddy-mu.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'patch-field',
    title: 'Patch Field',
    subtitle: 'Interactive Patch System',
    description: 'Een interactieve patch field applicatie voor creatieve experimenten en visuele manipulatie. Ontdek nieuwe mogelijkheden met dynamische patching.',
    category: 'design',
    technologies: ['React', 'TypeScript', 'Interactive Design', 'Visual Effects', 'Creative Tools'],
    image: '/images/patch-field-animation.svg',
    demoUrl: 'https://patch-field.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'blastfield',
    title: 'Blastfield',
    subtitle: 'Legends Interactive Experience',
    description: 'Een interactieve ervaring met Blastfield Legends. Ontdek de wereld van legends en ervaar een unieke digitale beleving.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Interactive Experience', 'Legends', 'Digital Storytelling'],
    image: '/images/blastfield-animation.svg',
    demoUrl: 'https://blastfield.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'washly',
    title: 'Washly',
    subtitle: 'Peer-to-Peer Laundry Service Concept',
    description: 'Een innovatief concept voor een peer-to-peer wasservice app. Buurtgenoten helpen elkaar met wassen, drogen en vouwen. Volledig uitgewerkt merkdocument met missie, visie, doelgroep en positionering.',
    category: 'design',
    technologies: ['Branding', 'Concept Development', 'UX Research', 'Business Strategy', 'Merkdocument'],
    image: '/images/washly-animation.svg',
    demoUrl: 'https://washly-blond.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'charge-guard',
    title: 'Charge Guard',
    subtitle: 'Battery Protection Concept',
    description: 'Een concept voor batterijbescherming en opladingsoptimalisatie. Volledig uitgewerkt branding concept met visuele identiteit en positionering.',
    category: 'design',
    technologies: ['Branding', 'Concept Development', 'Product Design', 'Visual Identity', 'Tech Innovation'],
    image: '/images/charge-guard-animation.svg',
    demoUrl: 'https://charge-guard.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'atelier-ai',
    title: 'AtelierAI',
    subtitle: 'AI Video Service Concept',
    description: 'AI video, handcrafted in a living room. Een indy alternatief voor de grote AI video platforms. Volledig uitgewerkt merkdocument met missie, visie, doelgroep, positionering en technische capaciteit overview.',
    category: 'design',
    technologies: ['Branding', 'Concept Development', 'Visual Identity', 'Merkdocument', 'AI Video', 'Business Strategy'],
    image: '/images/atelier-ai-animation.svg',
    demoUrl: 'https://atelier-ai-merkdocument.vercel.app/',
    githubUrl: undefined,
    featured: false,
    year: 2024
  },
  {
    id: 'video-project-1',
    title: 'Video Project 1',
    subtitle: 'Video Showcase',
    description: 'Een video showcase project. Bekijk de video om meer te zien.',
    category: 'design',
    technologies: ['Video Production', 'Creative Content'],
    image: '/images/placeholder.svg',
    video: 'https://www.youtube.com/watch?v=zC-BARbjyIg',
    demoUrl: undefined,
    githubUrl: undefined,
    featured: false,
    year: 2024
  }
]; 