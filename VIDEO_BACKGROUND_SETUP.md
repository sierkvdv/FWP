# Video Background Setup Guide

## Optie 1: Supabase Storage (Aanbevolen)

### Stappen:

1. **Ga naar je Supabase Dashboard**
   - Log in op https://supabase.com
   - Selecteer je project

2. **Maak een Storage Bucket**
   - Ga naar "Storage" in het menu
   - Klik op "New bucket"
   - Naam: `videos` (of een andere naam)
   - Maak de bucket **public** (zodat video's publiek toegankelijk zijn)

3. **Upload je video's**
   - Klik op de bucket die je net hebt gemaakt
   - Klik op "Upload file"
   - Upload je video bestanden (bij voorkeur .mp4 formaat)
   - **Tip**: Comprimeer je video's voor betere performance (gebruik bijvoorbeeld HandBrake of online tools)

4. **Kopieer de URLs**
   - Klik op een geüploade video
   - Kopieer de "Public URL"
   - Format: `https://[project-id].supabase.co/storage/v1/object/public/videos/[filename].mp4`

5. **Voeg URLs toe aan de code**
   - Open `src/utils/constants.ts`
   - Voeg je video URLs toe aan `backgroundVideos`:
   ```typescript
   backgroundVideos: [
     'https://your-project.supabase.co/storage/v1/object/public/videos/video1.mp4',
     'https://your-project.supabase.co/storage/v1/object/public/videos/video2.mp4',
     'https://your-project.supabase.co/storage/v1/object/public/videos/video3.mp4',
   ],
   ```

### Video Optimalisatie Tips:
- **Formaat**: MP4 (H.264 codec)
- **Resolutie**: 1920x1080 (1080p) is meestal genoeg voor achtergrond
- **Bitrate**: 2-5 Mbps voor goede kwaliteit/performance balans
- **Lengte**: Kortere video's (10-30 seconden) werken beter
- **Grootte**: Probeer onder 10MB per video te blijven

---

## Optie 2: YouTube Playlist (Alternatief)

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

