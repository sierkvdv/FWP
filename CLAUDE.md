# FWP-site (fwp.one): portfolio van Fieldworks Production

React 18 + TypeScript (CRA), react-router 6, Tailwind 3, Framer Motion. Openbare repo: geen servergegevens, sleutels of klantdetails in dit bestand.

## Branches en deploy
- `main` = productie op fwp.one. Vercel bouwt automatisch bij elke push naar `main`.
- `redesign` = werkbranch. De dev-versie staat op fwp.sierk.dev: `npm run build` en de `build`-map via tar over ssh naar de dev-server (host en sleutel staan in de lokale Claude-config, niet hier).
- Ship: `git push origin redesign:main`, maar alleen als alles op `redesign` is goedgekeurd.
- Staan er nog niet-goedgekeurde commits op `redesign`? Bouw de losse wijziging dan op een branch vanaf `origin/main`, push die naar `main` en merge hem daarna in `redesign`.
- Na elke productie-deploy de live bundle checken: haal `static/js/main.*.js` van fwp.one en grep op de nieuwe (en de oude) bestandsnaam.

## Inhoud
- Cases: `src/data/cases.ts` (tweetalig NL/EN, drie sporen: automatiseren, bouwen, creëren). Oud werk: `src/data/moreWork.ts`.
- Reclamevideo's staan op twee plekken: `src/data/showreel.ts` (homepage-blok; de eerste entry wordt groot getoond) en de `gallery` van case `reclamevideos` in `cases.ts`. Altijd allebei bijwerken en daarna `grep -rn <bestandsnaam> src public`.
- Media staan in `public/videos/...`. Bij gewijzigde inhoud altijd een nieuwe bestandsnaam, want media worden een jaar gecachet.
- Video's altijd via `AutoVideo` (stil, autoplay zodra in beeld, werkt op iOS). Een kale `<video controls>` speelt op de telefoon niet vanzelf.
- Ad-video's: 1920×1080, H.264 rond 3,3 Mbit/s, AAC 160k, `-movflags +faststart`, poster-jpg 1920×1080 uit een sterk frame.
- `vercel.json` gebruikt `rewrites` (niet `routes`), anders breken `/videos` en `/images`.
