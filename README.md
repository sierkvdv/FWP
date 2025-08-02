# FWP - Fieldworks Production

Een moderne, creatieve portfolio website voor een creatief bureau. Gebouwd met React, TypeScript, Tailwind CSS en Framer Motion.

## 🚀 Features

- **Moderne UI/UX**: Donkere thema met neon groen accent kleur
- **Smooth Animaties**: Framer Motion voor vloeiende overgangen
- **Responsive Design**: Volledig responsive voor alle apparaten
- **Modulaire Architectuur**: Herbruikbare componenten en utilities
- **TypeScript**: Volledige type safety
- **Performance Geoptimaliseerd**: Lazy loading en geoptimaliseerde animaties

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 📁 Project Structuur

```
src/
├── components/          # Herbruikbare UI componenten
│   ├── Navigation.tsx   # Hoofdnavigatie
│   ├── Hero.tsx        # Hero sectie
│   ├── ProjectCard.tsx # Project kaart component
│   └── CloneboxDemo.tsx # Clonebox demo modal
├── pages/              # Pagina componenten
│   ├── HomePage.tsx    # Homepage
│   ├── ProjectsPage.tsx # Projecten overzicht
│   ├── ProjectDetailPage.tsx # Project detail
│   ├── AboutPage.tsx   # Over ons
│   └── ContactPage.tsx # Contact
├── data/               # Statische data
│   ├── projects.ts     # Project data
│   ├── skills.ts       # Skills data
│   └── contact.ts      # Contact informatie
├── types/              # TypeScript interfaces
│   └── index.ts        # Type definities
├── utils/              # Utility functies
│   ├── animations.ts   # Framer Motion variants
│   └── constants.ts    # App constants
└── assets/             # Statische assets
```

## 🎨 Design Systeem

### Kleuren
- **Primary**: `#00ff88` (Neon groen)
- **Background**: `#0a0a0a` (Donker)
- **Surface**: `#1a1a1a` (Donker grijs)
- **Text**: `#ffffff` (Wit)

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Monospace**: JetBrains Mono
- **Gradients**: Accent naar purple voor highlights

### Animaties
- **Fade In Up**: Standaard entrance animatie
- **Stagger**: Voor lijsten en grids
- **Hover Effects**: Scale en color transitions
- **Page Transitions**: Smooth route changes

## 🚀 Development

### Installatie
```bash
npm install
```

### Development Server
```bash
npm start
```

### Build voor Productie
```bash
npm run build
```

### Testen
```bash
npm test
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Optimalisaties

- **Code Splitting**: Automatisch door React Router
- **Lazy Loading**: Componenten laden alleen wanneer nodig
- **Optimized Images**: WebP format waar mogelijk
- **Minimal Dependencies**: Alleen essentiële packages
- **Tree Shaking**: Ongebruikte code wordt weggehaald

## 🔧 Customization

### Nieuwe Project Toevoegen
1. Voeg project data toe aan `src/data/projects.ts`
2. Upload afbeelding naar `public/images/`
3. Update project array met nieuwe entry

### Kleuren Aanpassen
1. Update `tailwind.config.js` voor nieuwe kleuren
2. Update `src/utils/constants.ts` voor accent kleur
3. Update CSS variabelen in `src/index.css`

### Animaties Aanpassen
1. Bewerk `src/utils/animations.ts` voor nieuwe variants
2. Update timing in `src/utils/constants.ts`

## 📄 Licentie

MIT License - zie LICENSE bestand voor details.

## 🤝 Contact

Voor vragen of suggesties, neem contact op via de contact pagina op de website. 