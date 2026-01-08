import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Load translations
const translations: Record<Language, Record<string, string>> = {
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projecten',
    'nav.about': 'Over',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.welcome': 'Welkom bij',
    'hero.viewProjects': 'Bekijk Projecten',
    'hero.getInTouch': 'Neem Contact Op',
    'hero.viewEvents': 'FWP Events',
    
    // HomePage
    'home.featuredProjects': 'Uitgelichte Projecten',
    'home.featuredDescription': 'Een overzicht van ons meest innovatieve en creatieve werk',
    'home.viewAllProjects': 'Bekijk Alle Projecten',
    
    // ProjectsPage
    'projects.title': 'Projecten Portfolio',
    'projects.description': 'Een overzicht van mijn creatieve werk, van AI-gegenereerde films tot interactieve websites',
    'projects.searchPlaceholder': 'Zoek projecten...',
    'projects.allProjects': 'Alle Projecten',
    'projects.ai': 'AI & ML',
    'projects.web': 'Web Development',
    'projects.music': 'Muziek & Audio',
    'projects.design': 'Design',
    'projects.software': 'Software',
    'projects.found': 'projecten gevonden',
    'projects.foundOne': 'project gevonden',
    'projects.notFound': 'Geen projecten gevonden',
    'projects.tryOther': 'Probeer andere zoektermen of filters',
    
    // ProjectDetailPage
    'project.back': 'Terug naar Projecten',
    'project.viewLive': 'Bekijk Live',
    'project.viewCode': 'Bekijk Code',
    'project.watchDemo': 'Bekijk Demo',
    'project.technologies': 'Gebruikte Technologieën',
    'project.about': 'Over Dit Project',
    'project.notFound': 'Project Niet Gevonden',
    'project.firstVersion': 'Eerste versie (2018)',
    
    // ContactPage
    'contact.title': "Laten We",
    'contact.connect': 'Verbinden',
    'contact.description': 'Ben je geïnteresseerd in samenwerking? Heb je een project in gedachten? Ik hoor graag van je!',
    'contact.sendMessage': 'Stuur een Bericht',
    'contact.name': 'Naam',
    'contact.namePlaceholder': 'Jouw naam',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'jouw@email.com',
    'contact.subject': 'Onderwerp',
    'contact.subjectPlaceholder': 'Waar gaat het over?',
    'contact.message': 'Bericht',
    'contact.messagePlaceholder': 'Vertel me meer over je project of idee...',
    'contact.sending': 'Verzenden...',
    'contact.send': 'Verstuur Bericht',
    'contact.info': 'Contact Info',
    'contact.location': 'Locatie',
    'contact.locationValue': 'Amsterdam, Nederland',
    'contact.availability': 'Beschikbaarheid',
    'contact.availabilityValue': 'Voor nieuwe projecten',
    'contact.follow': 'Volg Mij',
    'contact.responseTime': 'Response Tijd',
    'contact.responseDescription': 'Ik probeer binnen 24 uur te reageren op alle berichten.',
    'contact.usuallyOnline': 'Meestal online',
    'contact.emailOpened': 'Email client geopend! Stuur het bericht om contact met me op te nemen.',
    
    // AboutPage
    'about.title': 'Over',
    'about.me': 'Mij',
    'about.description': 'FWP is een creatief bureau dat de grenzen tussen technologie en kunst vervaagt. Onze passie ligt in het creëren van digitale ervaringen die zowel functioneel als esthetisch zijn.',
    'about.story': 'Ons Verhaal',
    'about.story1': 'FWP is ontstaan uit een fascinatie voor de combinatie van technologie en creativiteit. Wat begon als experimenten met muziek en code, groeide uit tot een passie voor het creëren van digitale ervaringen die mensen raken.',
    'about.story2': 'We specialiseren ons in frontend development, AI-technologieën en muziekproductie. Ons werk varieert van interactieve websites tot AI-gegenereerde films en elektronische muziek.',
    'about.story3': 'We geloven dat de beste digitale producten ontstaan wanneer technologie en creativiteit samenkomen. Elk project is een kans om iets nieuws te ontdekken en te leren.',
    'about.experience': 'Ervaring',
    'about.years': 'Jaar Ervaring',
    'about.projectsCompleted': 'Projecten Voltooid',
    'about.technologiesMastered': 'Technologieën Beheerst',
    'about.happyClients': 'Blije Klanten',
    'about.skills': 'Vaardigheden',
    'about.and': '&',
    'about.expertise': 'Expertise',
    'about.skillsDescription': 'Een overzicht van mijn technische vaardigheden en expertise',
    'about.connect': 'Verbinden',
    'about.connectDescription': 'Ben je geïnteresseerd in samenwerking? Neem contact op!',
    'about.sendMessage': 'Stuur een Bericht',
    
    // Common
    'common.youtube': 'YouTube',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.welcome': 'Welcome to',
    'hero.viewProjects': 'View Projects',
    'hero.getInTouch': 'Get in Touch',
    'hero.viewEvents': 'FWP Events',
    
    // HomePage
    'home.featuredProjects': 'Featured Projects',
    'home.featuredDescription': 'A showcase of our most innovative and creative work',
    'home.viewAllProjects': 'View All Projects',
    
    // ProjectsPage
    'projects.title': 'Projects',
    'projects.description': 'An overview of my creative work, from AI-generated films to interactive websites',
    'projects.searchPlaceholder': 'Search projects...',
    'projects.allProjects': 'All Projects',
    'projects.ai': 'AI & ML',
    'projects.web': 'Web Development',
    'projects.music': 'Music & Audio',
    'projects.design': 'Design',
    'projects.software': 'Software',
    'projects.found': 'projects found',
    'projects.foundOne': 'project found',
    'projects.notFound': 'No projects found',
    'projects.tryOther': 'Try different search terms or filters',
    
    // ProjectDetailPage
    'project.back': 'Back to Projects',
    'project.viewLive': 'View Live',
    'project.viewCode': 'View Code',
    'project.watchDemo': 'Watch Demo',
    'project.technologies': 'Technologies Used',
    'project.about': 'About This Project',
    'project.notFound': 'Project Not Found',
    'project.firstVersion': 'First version (2018)',
    
    // ContactPage
    'contact.title': "Let's",
    'contact.connect': 'Connect',
    'contact.description': 'Interested in collaboration? Have a project in mind? I\'d love to hear from you!',
    'contact.sendMessage': 'Send a Message',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'What is it about?',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me more about your project or idea...',
    'contact.sending': 'Sending...',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Info',
    'contact.location': 'Location',
    'contact.locationValue': 'Amsterdam, Netherlands',
    'contact.availability': 'Availability',
    'contact.availabilityValue': 'Available for new projects',
    'contact.follow': 'Follow Me',
    'contact.responseTime': 'Response Time',
    'contact.responseDescription': 'I try to respond to all messages within 24 hours.',
    'contact.usuallyOnline': 'Usually online',
    'contact.emailOpened': 'Email client opened! Send the message to get in touch with me.',
    
    // AboutPage
    'about.title': 'About',
    'about.me': 'Me',
    'about.description': 'FWP is a creative agency that blurs the boundaries between technology and art. Our passion lies in creating digital experiences that are both functional and aesthetic.',
    'about.story': 'Our Story',
    'about.story1': 'FWP was born from a fascination with the combination of technology and creativity. What started as experiments with music and code, grew into a passion for creating digital experiences that touch people.',
    'about.story2': 'We specialize in frontend development, AI technologies and music production. Our work ranges from interactive websites to AI-generated films and electronic music.',
    'about.story3': 'We believe that the best digital products emerge when technology and creativity come together. Every project is an opportunity to discover and learn something new.',
    'about.experience': 'Experience',
    'about.years': 'Years of Experience',
    'about.projectsCompleted': 'Projects Completed',
    'about.technologiesMastered': 'Technologies Mastered',
    'about.happyClients': 'Happy Clients',
    'about.skills': 'Skills',
    'about.and': '&',
    'about.expertise': 'Expertise',
    'about.skillsDescription': 'An overview of my technical skills and expertise',
    'about.connect': 'Connect',
    'about.connectDescription': 'Interested in collaboration? Get in touch!',
    'about.sendMessage': 'Send a Message',
    
    // Common
    'common.youtube': 'YouTube',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to browser language
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'nl' || saved === 'en')) {
      return saved;
    }
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'nl' ? 'nl' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

