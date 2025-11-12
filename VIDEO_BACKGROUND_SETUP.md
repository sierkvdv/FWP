# Video Background Setup Guide

## Optie 1: Supabase Storage (Aanbevolen)

### Stap 1: Gebruik een BESTAAND Supabase Project (Makkelijker!)

**✅ OPLOSSING: Je hoeft GEEN nieuw project aan te maken! Gebruik gewoon een van je bestaande projecten!**

Je hebt al 2 Supabase projecten:
- `supabase-codebuddy`
- `supabase-open-ai-gen`

**Gebruik gewoon een van deze! Video storage werkt prima in een bestaand project.**

1. **Open een bestaand Supabase project**
   - In Vercel: Klik op "Open in Supabase" bij een van je Supabase integraties
   - Of ga direct naar: https://app.supabase.com
   - Klik op een van je bestaande projecten (bijv. "supabase-codebuddy")

2. **Ga naar Storage**
   - In het linker menu, klik op **"Storage"**
   - Je kunt nu gewoon een bucket maken en video's uploaden!

**Dat is het! Je hoeft geen nieuw project aan te maken. Storage werkt gewoon in een bestaand project.**

---

### Alternatief: Als je echt een nieuw project wilt (maar dit is NIET nodig!)

Als je toch een nieuw project wilt maken (maar dit is echt niet nodig!):

1. **Log UIT bij Vercel** (tijdelijk)
2. Ga naar https://supabase.com in een incognito/private window
3. Log in met je Supabase account
4. Maak daar een nieuw project aan
5. Log weer in bij Vercel

**Maar nogmaals: dit is NIET nodig! Gebruik gewoon een bestaand project!**

### Stap 2: Storage Bucket Aanmaken (in je BESTAANDE project)

1. **Open je Supabase project**
   - Klik op "Open in Supabase" in Vercel, of ga direct naar https://app.supabase.com
   - Selecteer een van je bestaande projecten (bijv. "supabase-codebuddy")

2. **Ga naar Storage**
   - In het linker menu, klik op **"Storage"**
   - Je ziet nu de Storage pagina

3. **Maak een nieuwe bucket**
   - Klik op de knop **"New bucket"** (rechtsboven)
   - Vul in:
     - **Name**: `videos` (of `fwp-videos` of een andere naam)
     - **Public bucket**: ✅ **Zet dit AAN** (dit is belangrijk! Zet het vinkje aan)
   - Klik op **"Create bucket"**
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

