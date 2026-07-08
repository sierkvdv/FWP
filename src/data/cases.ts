import { CaseStudy, TrackMeta, Track } from '../types';

/* ------------------------------------------------------------------ *
 *  EEN CASE TOEVOEGEN = EEN ENTRY HIERONDER. Geen herbouw.
 *  Verplicht: id, title, track, problem, solution, result, year.
 *  Optioneel: client, metric (cyaan getal), image, liveUrl, featured.
 *  Alle klant-tekst is tweetalig: { nl: '...', en: '...' }.
 * ------------------------------------------------------------------ */

export const tracks: TrackMeta[] = [
  {
    id: 'automatiseren',
    label: { nl: 'Automatiseren', en: 'Automate' },
    blurb: {
      nl: 'Slimme tools en agents die handwerk uit je proces halen.',
      en: 'Smart tools and agents that take the manual work out of your process.',
    },
  },
  {
    id: 'bouwen',
    label: { nl: 'Bouwen', en: 'Build' },
    blurb: {
      nl: 'Maatwerk-apps, generators en configurators die echt gebruikt worden.',
      en: 'Custom apps, generators and configurators that actually get used.',
    },
  },
  {
    id: 'creeren',
    label: { nl: 'Creëren', en: 'Create' },
    blurb: {
      nl: 'Merken, beeld en video die opvallen en kloppen.',
      en: 'Brands, visuals and video that stand out and hold together.',
    },
  },
];

export const cases: CaseStudy[] = [
  // ---------------------------- AUTOMATISEREN ----------------------------
  {
    id: 'qwic',
    title: 'Qwic',
    client: 'Qwic',
    image: '/images/cases/qwic.webp',
    track: 'automatiseren',
    problem: {
      nl: 'Dealers moesten voor elke storing en foutcode de handleiding of de helpdesk in.',
      en: 'For every fault or error code, dealers had to dig through manuals or wait on the helpdesk.',
    },
    solution: {
      nl: 'Een chatbot bovenop de complete kennisbank, die elk gesprek veilig terug logt in het CRM.',
      en: 'A chatbot on top of the full knowledge base that securely logs every conversation back into the CRM.',
    },
    result: {
      nl: 'Antwoord op elke foutcode in seconden — 24/7, in de taal van de dealer, zonder wachtrij.',
      en: 'An answer to any error code in seconds — 24/7, in the dealer’s language, no queue.',
    },
    metric: '100+ foutcodes',
    liveUrl: undefined,
    year: 2025,
    featured: true,
  },
  {
    id: 'sfeerbaas-tt',
    title: 'Sfeerbaas Track & Trace',
    client: 'Sfeerbaas',
    image: '/images/cases/sfeerbaas-tt.webp',
    track: 'automatiseren',
    problem: {
      nl: 'Klanten belden voor de status van hun bestelling; elke update ging met de hand.',
      en: 'Customers called to check their order status; every update was handled by hand.',
    },
    solution: {
      nl: 'Geautomatiseerde track & trace die statusupdates zelf ophaalt en verstuurt.',
      en: 'Automated track & trace that fetches and sends status updates on its own.',
    },
    result: {
      nl: 'Klanten zijn altijd op de hoogte, het statuswerk verdween naar de achtergrond.',
      en: 'Customers are always in the loop; the status busywork moved into the background.',
    },
    metric: undefined,
    year: 2026,
    featured: true,
  },
  {
    id: 'autoflow',
    title: 'AutoFlow',
    client: 'AutoFlow',
    image: '/images/cases/autoflow.webp',
    track: 'automatiseren',
    problem: {
      nl: 'MKB-teams verloren uren per week aan repeterend, handmatig werk tussen losse tools.',
      en: 'SMB teams lost hours a week to repetitive manual work between disconnected tools.',
    },
    solution: {
      nl: 'Automatiseringen die de tools koppelen en processen zelf laten lopen.',
      en: 'Automations that connect the tools and let processes run themselves.',
    },
    result: {
      nl: 'Terugkerend werk verdwijnt naar de achtergrond; het team houdt tijd over voor het echte werk.',
      en: 'Recurring work fades into the background; the team gets time back for real work.',
    },
    liveUrl: 'https://auto-flow-agency.com',
    year: 2026,
    featured: false,
  },

  // ------------------------------- BOUWEN --------------------------------
  {
    id: 'wondertale',
    title: 'Wondertale',
    client: 'Eigen product',
    image: '/images/cases/wondertale.webp',
    track: 'bouwen',
    problem: {
      nl: 'Een gepersonaliseerd kinderboek maken kostte normaal dagen ontwerp- en tekenwerk.',
      en: 'Making a personalised children’s book normally took days of design and illustration.',
    },
    solution: {
      nl: 'Een generator die verhaal, illustraties en een drukklare PDF automatisch opbouwt.',
      en: 'A generator that automatically builds the story, illustrations and a print-ready PDF.',
    },
    result: {
      nl: 'Van naam en foto naar een uniek, drukklaar boek — in minuten in plaats van dagen.',
      en: 'From a name and a photo to a unique, print-ready book — in minutes instead of days.',
    },
    metric: 'minuten',
    liveUrl: undefined,
    year: 2026,
    featured: true,
  },
  {
    id: 'portretto',
    title: 'Portretto',
    client: 'Portretto',
    image: '/images/cases/portretto.webp',
    track: 'bouwen',
    problem: {
      nl: 'Mensen wilden een mooi portret of poster, maar AI-tools voelden te technisch.',
      en: 'People wanted a beautiful portrait or poster, but AI tools felt too technical.',
    },
    solution: {
      nl: 'Een simpele generator die van één foto een portret of poster maakt, digitaal geleverd.',
      en: 'A simple generator that turns one photo into a portrait or poster, delivered digitally.',
    },
    result: {
      nl: 'Een persoonlijk kunstwerk zonder gedoe — in een paar klikken klaar.',
      en: 'A personal piece of art without the hassle — done in a few clicks.',
    },
    liveUrl: 'https://portretto.org',
    year: 2026,
    featured: true,
  },
  {
    id: 'clonebox',
    title: 'Clonebox',
    client: 'Clonebox',
    image: '/images/cases/clonebox.webp',
    track: 'bouwen',
    problem: {
      nl: 'DJ’s beheren hun Rekordbox-collectie los van hun back-ups, versies en tweede laptop.',
      en: 'DJs manage their Rekordbox library separately from their backups, versions and second laptop.',
    },
    solution: {
      nl: 'Een tool die náást Rekordbox draait en de collectie veilig kloont en synchroniseert.',
      en: 'A tool that runs alongside Rekordbox and safely clones and syncs the library.',
    },
    result: {
      nl: 'Je set staat klaar en je bibliotheek is beschermd — zonder Rekordbox te vervangen.',
      en: 'Your set is ready and your library is safe — without replacing Rekordbox.',
    },
    liveUrl: 'https://clonebox.uk',
    year: 2025,
    featured: true,
  },
  {
    id: 'configurators',
    title: 'Productconfigurators',
    track: 'bouwen',
    problem: {
      nl: 'Klanten wilden een product samenstellen, maar zagen niet wat ze kozen.',
      en: 'Customers wanted to build a product, but couldn’t see what they were choosing.',
    },
    solution: {
      nl: 'Configurators met live visuele preview — kleur, tekst en opties direct in beeld.',
      en: 'Configurators with a live visual preview — colour, text and options shown in real time.',
    },
    result: {
      nl: 'De klant ziet meteen wat ’ie krijgt: minder twijfel, minder retouren, meer bestellingen.',
      en: 'Customers see exactly what they’ll get: less doubt, fewer returns, more orders.',
    },
    year: 2025,
    featured: false,
  },

  // ------------------------------ CREËREN --------------------------------
  {
    id: 'reclamevideos',
    title: 'Reclamevideo’s',
    image: '/images/cases/reclamevideos.webp',
    track: 'creeren',
    problem: {
      nl: 'Professionele reclames laten maken is duur, traag en moeilijk in volume vol te houden.',
      en: 'Commissioning professional ads is expensive, slow and hard to sustain at volume.',
    },
    solution: {
      nl: 'Ads die met AI worden gegenereerd en gemonteerd — muziek, timing en montage in één pass.',
      en: 'Ads generated and edited with AI — music, timing and cut in a single pass.',
    },
    result: {
      nl: 'Scroll-stoppende reclames in de juiste hoeveelheid, in dagen in plaats van weken.',
      en: 'Scroll-stopping ads at the right volume, in days instead of weeks.',
    },
    year: 2026,
    featured: true,
  },
  {
    id: 'grafisch-werk',
    title: 'Grafisch & visueel werk',
    track: 'creeren',
    problem: {
      nl: 'Merken hadden beeld nodig dat opvalt én consistent klopt over alle kanalen.',
      en: 'Brands needed visuals that stand out and stay consistent across every channel.',
    },
    solution: {
      nl: 'Visuele identiteit, key visuals en content — van concept tot oplevering.',
      en: 'Visual identity, key visuals and content — from concept to delivery.',
    },
    result: {
      nl: 'Herkenbaar, samenhangend beeld dat een merk serieus laat overkomen.',
      en: 'Recognisable, coherent imagery that makes a brand feel serious.',
    },
    year: 2025,
    featured: false,
  },
];

/** Cases per spoor, in vaste spoor-volgorde. */
export function casesByTrack(track: Track): CaseStudy[] {
  return cases.filter((c) => c.track === track);
}
