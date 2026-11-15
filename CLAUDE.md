# FWP-site (fwp.one): portfolio van Fieldworks Production

React 18 + TypeScript (CRA), react-router 6, Tailwind 3, Framer Motion. Openbare repo: geen servergegevens, sleutels of klantdetails in dit bestand.

## Branches en deploy
- `main` = productie op fwp.one. **Sinds 15-11-2026 draait fwp.one op de eigen VPS, niet meer op Vercel** (DNS bij Oxxa: A-records @ en www naar de VPS). Uitrollen: `npm run build` (met `.env.production.local` voor het contactformulier, staat niet in git) en de `build`-map via tar over ssh naar de productiemap op de VPS (pad en nginx-conf in de lokale Claude-config). Vercel bouwt nog mee bij een push, maar dat is niet meer wat bezoekers zien.
- `redesign` = werkbranch. De dev-versie staat op fwp.sierk.dev: `npm run build` en de `build`-map via tar over ssh naar de dev-server (host en sleutel staan in de lokale Claude-config, niet hier).
- Ship: `git push origin redesign:main`, maar alleen als alles op `redesign` is goedgekeurd.
- Staan er nog niet-goedgekeurde commits op `redesign`? Bouw de losse wijziging dan op een branch vanaf `origin/main`, push die naar `main` en merge hem daarna in `redesign`.
- Na elke productie-deploy de live bundle checken: haal `static/js/main.*.js` van fwp.one en grep op de nieuwe (en de oude) bestandsnaam.
- Twee agents of sessies nooit tegelijk in deze map laten werken: op 15-11 nam een commit een halve wijziging van een andere agent mee (type-fout) en faalde elke build.

## Inhoud
- Beta-blok "Nu in beta" (testers gezocht): `src/components/BetaLab.tsx`, op home onder de hero en bovenaan /projects. Nu: Deep SamSo Club en DIEPTE (diep.sierk.dev). Project klaar of nieuw: daar weghalen of toevoegen.
- Cases: `src/data/cases.ts` (tweetalig NL/EN, drie sporen: automatiseren, bouwen, creëren). Oud werk: `src/data/moreWork.ts`. Volgorde op home: `lead` in `HomePage.tsx`, rest in bestandsvolgorde. `liveLabel` (bv. "Bekijk in 3D") maakt van de live-link een knop en het hoofdbeeld klikbaar (zonder label erop); alleen voor openbare pagina's zonder login (Maquette, Brein-kijkversie). Die links krijgen `?lang=nl|en` mee (`liveHref`), zodat de bezoeker in de taal van de case binnenkomt. `client` mag tweetalig zijn (`clientLabel`); spoorlabels komen uit `tracks`.
- Reclamevideo's staan op twee plekken: `src/data/showreel.ts` (homepage-blok; de eerste entry wordt groot getoond) en de `gallery` van case `reclamevideos` in `cases.ts`. Altijd allebei bijwerken en daarna `grep -rn <bestandsnaam> src public`.
- Media staan in `public/videos/...`. Bij gewijzigde inhoud altijd een nieuwe bestandsnaam, want media worden een jaar gecachet.
- Video's: op de VPS serveert nginx `/videos/` rechtstreeks uit de video-opslag (zelfde bestanden als de video-host). Vroeger (Vercel) via een rewrite in `vercel.json` naar de aparte video-host (sinds 08-11-2026, anders liep de Vercel-opslag vol). Nieuwe of gewijzigde video: ook naar die host uploaden (zelfde pad onder `videos/`, details in de lokale Claude-config), dan pas naar `main` pushen, en daarna live testen met `curl -r 0-99 https://fwp.one/videos/<pad>` (moet 206 geven).
- Deellinks: elke video met geluid (brand film, showreel, case-galerijen) heeft een eigen pagina `/v/<slug>/` en een knop "Deel" (`ShareButton`). De lijst bouwt zichzelf in `src/data/films.ts` (slug = bestandsnaam zonder `-v2`/`-9x16`). `npm run build` schrijft daarna per film een HTML met preview (`scripts/deelpaginas.js`). Nieuwe video: `node scripts/og-beelden.js` maakt het lichte previewbeeld `public/og/<slug>.jpg` (WhatsApp toont niets boven ~300 KB).
- Video's altijd via `AutoVideo` (stil, autoplay zodra in beeld, werkt op iOS). Een kale `<video controls>` speelt op de telefoon niet vanzelf.
- Ad-video's: 1920×1080, H.264 rond 3,3 Mbit/s, AAC 160k, `-movflags +faststart`, poster-jpg 1920×1080 uit een sterk frame.
- `vercel.json` gebruikt `rewrites` (niet `routes`), anders breken `/videos` en `/images`.
- Demo bedrijfssysteem (`public/demo/systeem/`, case `bedrijfssysteem`): echte schermen van het uren-systeem, opgeslagen vanaf de database `uren_demo` (verzonnen data). Opnieuw maken: `scripts/demo-systeem/` (seed.cjs → start-demo.cjs → capture.mjs → bouw.py).

## Huisstijl site
- Donker #0a0a0c, surface #101014, lijn #1c1c22, tekst #f4f4f6, muted #7a7a86, accent cyaan #00e5c7 (spaarzaam: 1 CTA + 1 statement per scherm). Font Sora. Editorial: grote ExtraLight display, veel wit, hairlines, kalme fade-up (≤400 ms, cubic-bezier(0.16,1,0.3,1)). Geen glow, parallax, blobs, gradient-tekst; beelden in kleur.
- Positionering: één maker die bedrijfsproblemen oplost met techniek én communicatie; taal van de klant, geen buzzwords, nooit "wij". NL is de standaardtaal. Sfeerbaas-case = configurator (niet track&trace).

## Open (sinds 07-2026)
- Harde cijfers per case; dev automatisch deployen (GitHub Actions + deploy-key); /en + hreflang en SEO (robots, sitemap, OG-beeld, structured data); Lighthouse-opruiming (ongebruikte deps/componenten).

## Stand
- 15-11-2026 avond: Brein-case zegt nu wat het systeem doet (ochtendscript meet, regels ontstaan in een sessie); EN-labels (Own system/product, Build/Automate); "Bekijk in 3D" niet meer op het beeld. Op fwp.sierk.dev, niet op `main`.
- 15-11-2026: cases De Maquette (bouwen) en Brein (automatiseren) toegevoegd op `redesign`, met knop "Bekijk in 3D" naar de openbare versies; op home op plek 2 en 4. Staat op fwp.sierk.dev, nog niet op `main`/fwp.one (wacht op Sierks ok).
