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
    id: 'sfeerbaas',
    title: 'Sfeerbaas Configurator',
    client: 'Sfeerbaas',
    image: '/images/cases/sfeerbaas.webp',
    track: 'bouwen',
    problem: {
      nl: 'Klanten wilden een eigen neonreclame ontwerpen, maar standaard-configurators boden nauwelijks vrijheid — en je zag pas bij levering hoe het echt werd.',
      en: 'Customers wanted to design their own neon sign, but standard configurators offered barely any freedom — and you only saw the real result on delivery.',
    },
    solution: {
      nl: 'Een configurator waarin je tekst, kleur en lettertype vrij combineert, met een live preview die exact toont wat er gemaakt wordt.',
      en: 'A configurator that lets you freely combine text, colour and typeface, with a live preview showing exactly what will be made.',
    },
    result: {
      nl: 'De klant ontwerpt zelf en bestelt met vertrouwen: wat je ziet is wat je krijgt.',
      en: 'Customers design it themselves and order with confidence: what you see is what you get.',
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
    video: '/videos/cases/wondertale.mp4',
    videoPoster: '/videos/cases/wondertale.jpg',
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
    gallery: [
      {
        mp4: '/videos/campaign/wondertale-ad-v3.mp4',
        poster: '/videos/campaign/wondertale-ad-v3.jpg',
        title: 'Ad — "Eigen gezicht. Eigen avontuur."',
      },
      {
        mp4: '/videos/campaign/wondertale-ad-v1.mp4',
        poster: '/videos/campaign/wondertale-ad-v1.jpg',
        title: 'Ad — schone cut',
      },
      {
        mp4: '/videos/campaign/wondertale-ad-v4.mp4',
        poster: '/videos/campaign/wondertale-ad-v4.jpg',
        title: 'Ad — alternatieve caption',
      },
    ],
    liveUrl: 'https://wonder-tale.com',
    year: 2026,
    featured: true,
  },
  {
    id: 'portretto',
    title: 'Portretto',
    client: 'Portretto',
    image: '/images/cases/portretto.webp',
    video: '/videos/cases/portretto.mp4',
    videoPoster: '/videos/cases/portretto.jpg',
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
    gallery: [
      {
        mp4: '/videos/ads/hondad.mp4',
        poster: '/videos/ads/hondad.jpg',
        title: 'Ad — Jouw hond, maar dan geschilderd',
      },
      {
        mp4: '/videos/ads/aipet.mp4',
        poster: '/videos/ads/aipet.jpg',
        title: 'Ad — Custom AI Pet reveal',
      },
      {
        mp4: '/videos/ads/portretto-ad.mp4',
        poster: '/videos/ads/portretto-ad.jpg',
        title: 'Ad — Familieportret',
      },
    ],
    liveUrl: 'https://portretto.org',
    year: 2026,
    featured: true,
  },
  {
    id: 'clonebox',
    title: 'Clonebox',
    client: 'Clonebox',
    image: '/images/cases/clonebox.webp',
    video: '/videos/cases/clonebox.mp4',
    videoPoster: '/videos/cases/clonebox.jpg',
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
  // ------------------------------ CREËREN --------------------------------
  {
    id: 'schelpenfissa',
    title: 'Schelpenfissa',
    client: 'Schelpenfissa',
    video: '/videos/campaign/hoeder-van-het-koude-9x16.mp4',
    videoPoster: '/videos/campaign/hoeder-van-het-koude-9x16.jpg',
    mediaRatio: '1/1',
    track: 'creeren',
    problem: {
      nl: 'Een gloednieuw strandfeest zonder naam moest in weken een merk én publiek opbouwen.',
      en: 'A brand-new beach party with no name had to build a brand and an audience in weeks.',
    },
    solution: {
      nl: 'Complete campagne: identiteit, one-pager site en een serie AI-video’s — teaser, natuurdocs over de DJ’s en respect-de-plek-content voor Instagram.',
      en: 'A full campaign: identity, one-pager site and a series of AI videos — teaser, nature-doc DJ portraits and respect-the-beach content for Instagram.',
    },
    result: {
      nl: 'Een herkenbaar merk met een feed die blijft hangen — vóór het eerste feest plaatsvond.',
      en: 'A recognisable brand with a feed that sticks — before the first party even happened.',
    },
    gallery: [
      {
        mp4: '/videos/campaign/hoeder-van-het-koude-9x16.mp4',
        poster: '/videos/campaign/hoeder-van-het-koude-9x16.jpg',
        title: 'Natuurdoc — Hoeder van het Koude',
      },
      {
        mp4: '/videos/campaign/discokat-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/discokat-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — Discokat',
      },
      {
        mp4: '/videos/campaign/deepstepper-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/deepstepper-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — Deepstepper',
      },
      {
        mp4: '/videos/campaign/djwallie-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/djwallie-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — DJ Wallie',
      },
      {
        mp4: '/videos/campaign/djuntold-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/djuntold-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — DJ Untold',
      },
      {
        mp4: '/videos/campaign/djsamsonite-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/djsamsonite-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — DJ Samsonite',
      },
      {
        mp4: '/videos/campaign/djtaleuntold-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/djtaleuntold-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — Tale & Untold',
      },
      {
        mp4: '/videos/campaign/shawne-natuurdoc-9x16.mp4',
        poster: '/videos/campaign/shawne-natuurdoc-9x16.jpg',
        title: 'Natuurdoc — Shawne',
      },
      {
        mp4: '/videos/campaign/respect-de-plek-9x16.mp4',
        poster: '/videos/campaign/respect-de-plek-9x16.jpg',
        title: 'Respect de plek',
      },
    ],
    liveUrl: 'https://schelpenfissa.com',
    year: 2026,
    featured: true,
  },
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
