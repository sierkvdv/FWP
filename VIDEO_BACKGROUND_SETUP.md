# Video Background Setup Guide

## Optie 1: Supabase Storage (Aanbevolen)

### Stap 1: Supabase Project Aanmaken (BELANGRIJK: Direct via Supabase, NIET via Vercel!)

**⚠️ LET OP: Maak het project DIRECT op Supabase.com, NIET via Vercel Marketplace!**

1. **Ga DIRECT naar Supabase (omzeil Vercel)**
   - Open een NIEUWE TAB in je browser
   - Ga DIRECT naar: **https://app.supabase.com** (of https://supabase.com/dashboard)
   - Log in met je Supabase account
   - **NIET via Vercel gaan!**

2. **Maak een nieuw project**
   - In je Supabase dashboard, kijk naar de projectenlijst
   - Klik op **"New Project"** (rechtsboven, grote groene knop)
   - **NIET** op "Add Project" of via Vercel Marketplace!

3. **Vul het formulier in:**
   - **Organization**: Kies je bestaande organisatie (of maak een nieuwe)
   - **Name**: Bijv. `fwp-website` of `fwp-videos`
   - **Database Password**: Kies een sterk wachtwoord (sla dit op!)
   - **Region**: Kies het dichtstbijzijnde (bijv. "West EU (Ireland)" voor Nederland)
   - **Pricing Plan**: Kies **"Free"** (gratis tier is genoeg voor video storage)
   
4. **Maak het project aan**
   - Klik op **"Create new project"** (onderaan het formulier)
   - ⏳ Wacht 1-2 minuten tot het project is aangemaakt
   - Je ziet nu je nieuwe project in de lijst!

**Als je nog steeds in een loop komt:**
- Gebruik een incognito/private browser window
- Of log uit bij Vercel en ga direct naar Supabase
- Het project hoeft NIET gekoppeld te zijn aan Vercel voor Storage te werken!

### Stap 2: Storage Bucket Aanmaken

1. **Ga naar Storage**
   - In je Supabase dashboard, klik op "Storage" in het linker menu
   - Je ziet nu de Storage pagina

2. **Maak een nieuwe bucket**
   - Klik op de knop "New bucket" (rechtsboven)
   - Vul in:
     - **Name**: `videos` (of een andere naam die je wilt)
     - **Public bucket**: ✅ **Zet dit AAN** (dit is belangrijk! Zet het vinkje aan)
   - Klik op "Create bucket"
   - ✅ Je bucket is nu aangemaakt en publiek toegankelijk

### Stap 3: Video's Uploaden

1. **Open je bucket**
   - Klik op de bucket die je net hebt gemaakt (bijv. "videos")
   - Je ziet nu een lege bucket

2. **Upload video's**
   - Klik op "Upload file" (of sleep video's naar het scherm)
   - Selecteer je video bestanden (bij voorkeur .mp4 formaat)
   - ⏳ Wacht tot de upload klaar is
   - **Tip**: Upload één video per keer om te testen, of meerdere tegelijk

3. **Kopieer de Public URL**
   - Klik op een geüploade video in de lijst
   - Je ziet nu de video details
   - Zoek naar "Public URL" of "URL"
   - Klik op het kopieer icoon of selecteer en kopieer de URL
   - Format ziet er zo uit: 
     ```
     https://[jouw-project-id].supabase.co/storage/v1/object/public/videos/[video-naam].mp4
     ```
   - **Voorbeeld**: 
     ```
     https://abcdefghijklmnop.supabase.co/storage/v1/object/public/videos/background1.mp4
     ```

### Stap 4: URLs Toevoegen aan je Code

1. **Open het bestand**
   - Open `src/utils/constants.ts` in je code editor

2. **Voeg je video URLs toe**
   - Zoek naar `backgroundVideos: []`
   - Vervang de lege array met je video URLs:
   ```typescript
   backgroundVideos: [
     'https://jouw-project-id.supabase.co/storage/v1/object/public/videos/video1.mp4',
     'https://jouw-project-id.supabase.co/storage/v1/object/public/videos/video2.mp4',
     'https://jouw-project-id.supabase.co/storage/v1/object/public/videos/video3.mp4',
   ],
   ```

3. **Test lokaal (optioneel)**
   - Run `npm start` om te testen
   - Check of de video's afspelen op de homepage

4. **Deploy**
   - Commit en push naar GitHub
   - Vercel deployt automatisch
   - Test op je live site

### Video Optimalisatie Tips:
- **Formaat**: MP4 (H.264 codec)
- **Resolutie**: 1920x1080 (1080p) is meestal genoeg voor achtergrond
- **Bitrate**: 2-5 Mbps voor goede kwaliteit/performance balans
- **Lengte**: Kortere video's (10-30 seconden) werken beter
- **Grootte**: Probeer onder 10MB per video te blijven

---

## Optie 2: Alternatieve Oplossingen (als Supabase niet werkt)

### A. Cloudinary (Gratis tier beschikbaar)
- Ga naar https://cloudinary.com
- Maak gratis account
- Upload video's naar Media Library
- Gebruik de "Auto" delivery URL's
- Voeg URLs toe aan `backgroundVideos`

### B. Bunny.net (Goedkoop CDN)
- Ga naar https://bunny.net
- Maak account (gratis tier)
- Upload video's naar Storage
- Gebruik de CDN URLs

### C. YouTube (Eenvoudig maar minder controle)
Als je YouTube wilt gebruiken, kun je een playlist maken en de video IDs gebruiken. Dit vereist wel wat extra code aanpassingen.

**Nadelen van YouTube:**
- Minder controle over autoplay (vooral op mobiel)
- YouTube branding kan zichtbaar zijn
- Minder performance dan directe video streaming

**Voordelen:**
- Geen hosting nodig
- Automatische CDN
- Makkelijk te beheren

---

## Huidige Implementatie

De `VideoBackground` component:
- ✅ Speelt video's automatisch achter elkaar af
- ✅ Loopt oneindig (gaat terug naar eerste video na laatste)
- ✅ Muted en autoplay (voor achtergrond)
- ✅ Werkt op mobiel met `playsInline`
- ✅ Automatische overlay voor tekst leesbaarheid
- ✅ Fallback naar particle background als geen video's

---

## Testen

1. Upload een test video naar Supabase
2. Voeg de URL toe aan `backgroundVideos` in `constants.ts`
3. Deploy naar Vercel
4. Test op verschillende devices (desktop, mobiel, tablet)

---

## Troubleshooting

**Video speelt niet af:**
- Check of de bucket public is
- Check of de URL correct is
- Check browser console voor errors
- Op mobiel kan autoplay geblokkeerd zijn (normaal gedrag)

**Video laadt langzaam:**
- Comprimeer je video's meer
- Gebruik lagere resolutie
- Overweeg een CDN (Cloudflare, Bunny.net)

**Video stopt na één keer:**
- Check of alle video URLs correct zijn
- Check browser console voor errors

