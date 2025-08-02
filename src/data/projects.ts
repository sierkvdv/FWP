import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'ai-film-teaser',
    title: 'Neural Dreams',
    subtitle: 'AI-Generated Surrealist Short Film',
    description: 'Een 30-seconden surrealistische film gegenereerd met Runway ML. Glitchy transitions en Error Instruments vibes creëren een hypnotiserende ervaring die de grenzen tussen realiteit en AI-kunst vervaagt.',
    category: 'ai',
    technologies: ['Runway ML', 'After Effects', 'Error Instruments', 'AI Video Generation'],
    image: '/images/placeholder.svg',
    video: '/videos/neural-dreams-teaser.mp4',
    demoUrl: 'https://neural-dreams-demo.vercel.app',
    featured: true,
    year: 2024
  },
  {
    id: 'generative-website',
    title: 'CursorFlow',
    subtitle: 'Generative Interactive Website',
    description: 'Een website die meebeweegt met je cursor. Elke beweging creëert unieke visuele patronen en geluidseffecten. Gebouwd met React en geavanceerde cursor-tracking.',
    category: 'web',
    technologies: ['React', 'Framer Motion', 'Web Audio API', 'Canvas API'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://cursorflow-demo.vercel.app',
    githubUrl: 'https://github.com/username/cursorflow',
    featured: true,
    year: 2024
  },
  {
    id: 'virtual-dj-booth',
    title: 'SynthSpace',
    subtitle: '3D Virtual DJ Experience',
    description: 'Een immersieve 3D-website waar bezoekers muziekfragmenten kunnen triggeren door virtuele synthesizers aan te raken. Volledig interactief met WebGL en spatial audio.',
    category: 'music',
    technologies: ['Three.js', 'WebGL', 'Web Audio API', 'React Three Fiber'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://synthspace-demo.vercel.app',
    featured: false,
    year: 2024
  },
  {
    id: 'living-posters',
    title: 'Living Posters',
    subtitle: 'AI-Animated Poster Series',
    description: 'Een serie posters die tot leven komen met AI-animatie. Elk ontwerp transformeert van statisch naar dynamisch, gecreëerd met Runway ML en After Effects compositing.',
    category: 'design',
    technologies: ['Runway ML', 'After Effects', 'Photoshop', 'AI Animation'],
    image: '/images/placeholder.svg',
    video: '/videos/living-posters-showcase.mp4',
    featured: false,
    year: 2024
  },

  {
    id: 'modular-synth-store',
    title: 'Modular Synth Store',
    subtitle: 'Futuristic Synth Landing Page',
    description: 'Een fictieve landing page voor een futuristisch synthesizer merk. Met AI-gegenereerde visuals, interactieve product demos en custom muziek composities.',
    category: 'music',
    technologies: ['React', 'Framer Motion', 'AI Generated Visuals', 'Web Audio'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://modular-synth-demo.vercel.app',
    featured: false,
    year: 2024
  },
  {
    id: 'first-electron-clonebox',
    title: 'Clonebox',
    subtitle: 'USB Backup Tool',
    description: 'Een professionele USB backup tool ontwikkeld met Electron en Node.js. Features real-time progress tracking, automatische drive detectie en geavanceerde error handling. Cross-platform compatibel voor Windows, macOS en Linux.',
    category: 'software',
    technologies: ['Electron', 'Node.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/images/clonebox-preview.svg',
    demoUrl: undefined,
    githubUrl: 'https://github.com/sierkvdv/First-Electron-Clonebox',
    featured: true,
    year: 2024
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Creative Engineer CV',
    description: 'Een moderne portfolio website gebouwd met React en TypeScript. Met smooth animaties, responsive design en een professionele uitstraling. Toont projecten, skills en contact informatie.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://creative-engineer-cv.vercel.app',
    featured: false,
    year: 2024
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    subtitle: 'DALL-E Integration',
    description: 'Een web applicatie die DALL-E AI gebruikt om afbeeldingen te genereren op basis van tekst prompts. Met real-time preview en download functionaliteit.',
    category: 'ai',
    technologies: ['React', 'OpenAI API', 'DALL-E', 'TypeScript', 'Tailwind CSS'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://ai-image-generator-demo.vercel.app',
    featured: true,
    year: 2024
  },
  {
    id: 'task-manager-app',
    title: 'Task Manager',
    subtitle: 'Productivity App',
    description: 'Een volledig functionele task manager applicatie met drag & drop, categories, deadlines en real-time updates. Gebouwd met moderne web technologieën.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'React DnD'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://task-manager-demo.vercel.app',
    featured: true,
    year: 2024
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    subtitle: 'Real-time Weather Dashboard',
    description: 'Een moderne weather app met real-time data, 7-daagse forecast en interactieve kaarten. Gebouwd met React en OpenWeatherMap API.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'OpenWeatherMap API', 'Tailwind CSS', 'Chart.js'],
    image: '/images/placeholder.svg',
    demoUrl: 'https://weather-app-demo.vercel.app',
    featured: true,
    year: 2024
  }
]; 