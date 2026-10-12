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
    image: '/images/cases/qwic-atlas.webp',
    video: '/videos/cases/qwic-atlas6.mp4',
    videoPoster: '/videos/cases/qwic-atlas6.jpg',
    track: 'automatiseren',
    problem: {
      nl: 'Dealers moesten voor elke storing en foutcode de handleiding of de helpdesk in.',
      en: 'For every fault or error code, dealers had to dig through manuals or wait on the helpdesk.',
    },
    solution: {
      nl: 'Voor Qwic bouwde ik een chatbot bovenop hun complete kennisbank, die elk gesprek veilig terug logt in het CRM — één van twee tools die ik voor ze maakte, naast DixaHelper.',
      en: 'For Qwic I built a chatbot on top of their full knowledge base that securely logs every conversation into the CRM — one of two tools I made for them, alongside DixaHelper.',
    },
    result: {
      nl: 'Antwoord op elke foutcode in seconden — 24/7, in de taal van de dealer, zonder wachtrij.',
      en: 'An answer to any error code in seconds — 24/7, in the dealer’s language, no queue.',
    },
    metric: '100+ foutcodes',
    liveUrl: 'https://chat.sierk.dev',
    year: 2025,
    featured: true,
  },
  {
    id: 'dixahelper',
    title: 'DixaHelper',
    client: 'Qwic',
    image: '/images/cases/dixahelper.webp',
    video: '/videos/cases/dixahelper.mp4',
    videoPoster: '/videos/cases/dixahelper.jpg',
    track: 'automatiseren',
    problem: {
      nl: 'Elk telefoongesprek betekende nawerk: aantekeningen uitwerken, samenvatten en acties overtypen in het CRM.',
      en: 'Every phone call meant afterwork: writing up notes, summarising and retyping actions into the CRM.',
    },
    solution: {
      nl: 'Voor Qwic bouwde ik een assistent die meeluistert: live transcript, samenvatting, belangrijkste punten en actiepunten — de medewerker past aan, keurt goed, en alles wordt in het CRM gelogd.',
      en: 'For Qwic I built an assistant that listens along: live transcript, summary, key points and action items — the agent edits, approves, and everything is logged into the CRM.',
    },
    result: {
      nl: 'Nawerk van minuten naar seconden — en geen gespreksdetail gaat meer verloren.',
      en: 'Afterwork from minutes to seconds — and no call detail gets lost anymore.',
    },
    liveUrl: 'https://dixahelper.sierk.dev',
    year: 2026,
    featured: true,
  },
  {
    // Sierks eigen administratie (repo sierkvdv/uren). Beelden = testomgeving met demodata, geen echte cijfers.
    id: 'bedrijfssysteem',
    title: 'Eigen bedrijfssysteem',
    image: '/images/cases/bedrijfssysteem.webp',
    track: 'automatiseren',
    problem: {
      nl: 'Als zelfstandige kostte de administratie me elke week uren: uren bijhouden, facturen maken, betalingen nalopen, bonnetjes zoeken, mail sorteren. Tijd die niet naar klanten ging.',
      en: 'As a freelancer, admin cost me hours every week: tracking time, writing invoices, chasing payments, finding receipts, sorting email. Time that didn’t go to clients.',
    },
    solution: {
      nl: 'Een eigen systeem dat de hele administratie draait: uren, facturen, bank, bonnetjes, mail en agenda in één geheel. Ik bedien het in gewone taal, via Telegram of mijn AI-assistent, en keur goed wat er klaarstaat. Gebouwd met Next.js en Postgres, gekoppeld aan Rabobank, Wise, Mollie, Gmail, de iPhone-agenda en Telegram.',
      en: 'A system of my own that runs the whole back office: hours, invoices, bank, receipts, email and calendar in one place. I operate it in plain language, via Telegram or my AI assistant, and approve what’s prepared. Built with Next.js and Postgres, connected to Rabobank, Wise, Mollie, Gmail, the iPhone calendar and Telegram.',
    },
    result: {
      nl: 'Van de 1.348 banktransacties van dit jaar zijn er 1.334 vanzelf geboekt; 11 deed ik zelf. In de eerste maand werden 1.422 mails gesorteerd en 42 bonnetjes uit de mail gekoppeld. Ik keur alleen nog, en hetzelfde kan ik inrichten voor andere zelfstandigen en kleine bedrijven.',
      en: 'Of this year’s 1,348 bank transactions, 1,334 were booked automatically; I did 11 myself. In the first month, 1,422 emails were sorted and 42 receipts from email were matched. I only approve, and I can set up the same for other freelancers and small businesses.',
    },
    metric: '99% vanzelf geboekt',
    features: [
      {
        title: { nl: 'Uren en klantportaal', en: 'Hours and client portal' },
        text: {
          nl: 'Timer per klant en project. Elke klant krijgt een eigen link met zijn uren en facturen, zonder wachtwoord.',
          en: 'A timer per client and project. Every client gets a private link to their hours and invoices, no password needed.',
        },
      },
      {
        title: { nl: 'Facturen', en: 'Invoices' },
        text: {
          nl: 'Pdf in eigen huisstijl, nummering vanzelf, verstuurd vanaf het eigen domein met een betaallink. Maandfacturen gaan op de 1e automatisch de deur uit; wie te laat is, krijgt een herinnering.',
          en: 'PDF in house style, automatic numbering, sent from my own domain with a payment link. Monthly invoices go out automatically on the 1st; late payers get a reminder.',
        },
      },
      {
        title: { nl: 'Abonnementen', en: 'Subscriptions' },
        text: {
          nl: 'Vaste klanten betalen per maand via automatische incasso. De factuur staat daarna vanzelf op betaald; een storno wordt gemeld.',
          en: 'Recurring clients pay monthly by direct debit. The invoice then marks itself as paid; a reversed payment gets flagged.',
        },
      },
      {
        title: { nl: 'Bank en boekhouding', en: 'Bank and bookkeeping' },
        text: {
          nl: 'Transacties van Rabobank en Wise komen automatisch binnen en worden aan facturen en kosten gekoppeld. Wat de regels niet herkennen, plaatst AI; bij twijfel krijg ik een vraag. Omzet, kosten en winst per kwartaal zijn altijd actueel.',
          en: 'Transactions from Rabobank and Wise come in automatically and are matched to invoices and costs. What the rules don’t recognise, AI places; when in doubt, I get a question. Revenue, costs and profit per quarter are always up to date.',
        },
      },
      {
        title: { nl: 'Bonnetjes', en: 'Receipts' },
        text: {
          nl: 'Facturen van leveranciers en PayPal-bonnen worden uit de mail gehaald en aan de juiste afschrijving gehangen. Een papieren bon? Foto naar de Telegram-bot, die vraagt bij welke uitgave hij hoort.',
          en: 'Supplier invoices and PayPal receipts are pulled from email and attached to the right payment. A paper receipt? Send a photo to the Telegram bot and it asks which expense it belongs to.',
        },
      },
      {
        title: { nl: 'Mail', en: 'Email' },
        text: {
          nl: 'De inbox wordt gesorteerd op wat belangrijk is, rekeningen in de mail worden herkend en op klantmail staat een concept-antwoord klaar.',
          en: 'The inbox is sorted by what matters, bills in email are recognised and client emails get a draft reply ready.',
        },
      },
      {
        title: { nl: 'Assistent in gewone taal', en: 'Assistant in plain language' },
        text: {
          nl: 'Via Telegram vraag ik ‘wat heb ik dit kwartaal omgezet?’ of ‘zet morgen om 10 een taak’. Elke ochtend een overzicht van agenda en taken, die ook in mijn iPhone-agenda staan.',
          en: 'On Telegram I ask ‘what did I bill this quarter?’ or ‘add a task for 10 tomorrow’. Every morning an overview of calendar and tasks, which also show up in my iPhone calendar.',
        },
      },
      {
        title: { nl: 'Jij houdt de regie', en: 'You stay in control' },
        text: {
          nl: 'Acties en antwoorden komen als voorstel met ja/nee-knoppen. Valt een koppeling stil, dan krijg ik direct een melding.',
          en: 'Actions and replies arrive as a proposal with yes/no buttons. If a connection stops working, I get notified right away.',
        },
      },
    ],
    gallery: [
      { img: '/images/cases/bedrijfssysteem-boekhouding.webp', title: 'Boekhouding' },
      { img: '/images/cases/bedrijfssysteem-facturen.webp', title: 'Facturen' },
      { img: '/images/cases/bedrijfssysteem-factuur.webp', title: 'Factuur (pdf)' },
      { img: '/images/cases/bedrijfssysteem-uren.webp', title: 'Uren' },
    ],
    galleryRatio: '16/9',
    galleryLabel: { nl: 'Uit het systeem (testomgeving, demodata)', en: 'From the system (test environment, demo data)' },
    year: 2023,
    featured: false,
  },
  {
    id: 'sfeerbaas',
    title: 'Sfeerbaas Configurator',
    client: 'Sfeerbaas',
    image: '/images/cases/sfeerbaas.webp',
    video: '/videos/cases/sfeerbaas.mp4',
    videoPoster: '/videos/cases/sfeerbaas.jpg',
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
    liveUrl: 'https://sfeerbaas.sierk.dev',
    year: 2026,
    featured: true,
  },
  {
    id: 'autoflow',
    title: 'AutoFlow',
    client: 'AutoFlow',
    image: '/images/cases/autoflow.webp',
    video: '/videos/cases/autoflow.mp4',
    videoPoster: '/videos/cases/autoflow.jpg',
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
  {
    id: 'sfeerbaas-tt',
    title: 'Sfeerbaas Track & Trace',
    client: 'Sfeerbaas',
    image: '/images/cases/sfeerbaas-tt.webp',
    video: '/videos/cases/sfeerbaas-tt.mp4',
    videoPoster: '/videos/cases/sfeerbaas-tt.jpg',
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
      nl: 'Klanten zijn altijd op de hoogte; het statuswerk verdween naar de achtergrond.',
      en: 'Customers are always in the loop; the status busywork moved into the background.',
    },
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
        mp4: '/videos/campaign/wt-ad.mp4',
        poster: '/videos/campaign/wt-ad.jpg',
        title: 'Ad — "Zet jouw kind in zijn eigen boek"',
      },
      {
        mp4: '/videos/campaign/wt-reveal.mp4',
        poster: '/videos/campaign/wt-reveal.jpg',
        title: 'Reveal — het boek in handen',
      },
      {
        mp4: '/videos/campaign/wt-oma.mp4',
        poster: '/videos/campaign/wt-oma.jpg',
        title: 'Oma & kleinkind',
      },
      {
        mp4: '/videos/campaign/wt-unboxing.mp4',
        poster: '/videos/campaign/wt-unboxing.jpg',
        title: 'Unboxing',
      },
      {
        mp4: '/videos/campaign/wt-bedtime.mp4',
        poster: '/videos/campaign/wt-bedtime.jpg',
        title: 'Bedtime — samen lezen',
      },
      {
        mp4: '/videos/campaign/wt-blader.mp4',
        poster: '/videos/campaign/wt-blader.jpg',
        title: 'Het blader-moment',
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
    video: '/videos/cases/reclamevideos.mp4',
    videoPoster: '/videos/cases/reclamevideos.jpg',
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
    galleryRatio: '16/9',
    gallery: [
      {
        mp4: '/videos/ads/glod-de-plons-v2.mp4',
        poster: '/videos/ads/glod-de-plons.jpg',
        title: 'GLØD — "De Plons"',
      },
      {
        mp4: '/videos/ads/ombra-find-your-shade.mp4',
        poster: '/videos/ads/ombra-find-your-shade.jpg',
        title: 'OMBRA — "Find your shade"',
      },
      {
        mp4: '/videos/ads/nordax-hero.mp4',
        poster: '/videos/ads/nordax-hero.jpg',
        title: 'NORDAX — commercial',
      },
      {
        mp4: '/videos/ads/tij-eb.mp4',
        poster: '/videos/ads/tij-eb.jpg',
        title: 'TIJ — strand-commercial',
      },
      {
        mp4: '/videos/ads/look-up-the-modern-human.mp4',
        poster: '/videos/ads/look-up-the-modern-human.jpg',
        title: 'LOOK UP — "The modern human"',
      },
      {
        mp4: '/videos/ads/look-up-behind-you.mp4',
        poster: '/videos/ads/look-up-behind-you.jpg',
        title: 'LOOK UP — "Behind you"',
      },
    ],
    year: 2026,
    featured: true,
  },
  {
    id: 'bloodline',
    title: 'Bloodline Project',
    client: 'Eigen label',
    image: '/images/cases/bloodline.webp',
    video: '/videos/cases/bloodline.mp4',
    videoPoster: '/videos/cases/bloodline.jpg',
    track: 'creeren',
    problem: {
      nl: 'De muziek en artiesten van een father-son collectief hadden een eigen thuis nodig — één plek met identiteit, niet verspreid over losse platforms.',
      en: 'The music and artists of a father–son collective needed a home of their own — one place with an identity, not scattered across platforms.',
    },
    solution: {
      nl: 'Bloodline Project: merk, site en visuele identiteit die de artiesten (o.a. Deepstepper en DJ Sam Sonight) en releases samenbrengen.',
      en: 'Bloodline Project: a brand, site and visual identity bringing the artists (incl. Deepstepper and DJ Sam Sonight) and releases together.',
    },
    result: {
      nl: 'Een herkenbare thuisbasis voor het label — synths, vinyl en jaren aan obsessie op één plek.',
      en: 'A recognisable home for the label — synths, vinyl and decades of obsession in one place.',
    },
    liveUrl: 'https://bloodlineproject.vercel.app',
    year: 2025,
    featured: false,
  },
  {
    id: 'grafisch-werk',
    title: 'Grafisch & visueel werk',
    image: '/images/cases/grafisch-werk.webp',
    video: '/videos/cases/grafisch-werk.mp4',
    videoPoster: '/videos/cases/grafisch-werk.jpg',
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
    galleryLabel: { nl: 'Selectie', en: 'Selected work' },
    galleryRatio: '4/3',
    galleryFit: 'contain',
    gallery: [
      { img: '/images/grafisch/sf-logo.webp', title: 'Schelpenfissa — logo & identiteit' },
      { img: '/images/grafisch/sf-savethedate.webp', title: 'Schelpenfissa — save the date' },
      { img: '/images/grafisch/sf-launch.webp', title: 'Schelpenfissa — launch-post' },
      { img: '/images/grafisch/sf-djcat.webp', title: 'Schelpenfissa — DJ Cat-post' },
      { img: '/images/grafisch/sf-vibe.webp', title: 'Schelpenfissa — sfeerbeeld' },
      { img: '/images/grafisch/fidelio-logo.webp', title: 'Project Fidelio — logo' },
      { img: '/images/grafisch/wt-banner.webp', title: 'Wondertale — merkbanner' },
      { img: '/images/grafisch/wt-trio.webp', title: 'Wondertale — thema-covers' },
      { img: '/images/grafisch/wt-flatlay.webp', title: 'Wondertale — cadeau-visual' },
      { img: '/images/grafisch/wt-reveal.webp', title: 'Wondertale — campagnebeeld' },
    ],
    year: 2025,
    featured: false,
  },
];

/** Cases per spoor, in vaste spoor-volgorde. */
export function casesByTrack(track: Track): CaseStudy[] {
  return cases.filter((c) => c.track === track);
}
