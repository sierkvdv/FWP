# Supabase Video Setup - Stap voor Stap Instructies

Deze handleiding legt uit hoe je video's uit Supabase Storage kunt gebruiken als achtergrond voor de Hero sectie op de startpagina.

## Stap 1: Supabase Project Setup

1. Ga naar [Supabase Dashboard](https://app.supabase.com)
2. Maak een nieuw project aan (of gebruik een bestaand project)
3. Wacht tot het project volledig is opgezet

## Stap 2: Storage Bucket Aanmaken

1. Ga in je Supabase project naar **Storage** (in het linkermenu)
2. Klik op **New bucket**
3. Geef de bucket de naam: `hero-videos`
4. Zet **Public bucket** aan (belangrijk! Dit maakt de video's publiek toegankelijk)
5. Klik op **Create bucket**

## Stap 3: Video's Uploaden

1. Klik op de bucket `hero-videos` die je net hebt aangemaakt
2. Klik op **Upload file** of sleep video bestanden naar het scherm
3. Upload je video bestanden (ondersteunde formaten: `.mp4`, `.webm`, `.ogg`, `.mov`)
4. **Tip**: Zorg dat video's geoptimaliseerd zijn voor web (niet te groot, max ~10-20MB per video)

## Stap 4: Environment Variables Instellen

### Belangrijk: Create React App heeft `REACT_APP_` prefix nodig!

**In Create React App** worden alleen environment variables met de `REACT_APP_` prefix beschikbaar in de browser. Andere variabelen (zoals `SUPABASE_URL` zonder prefix) werken **niet** in Create React App.

### Optie 1: Als je al Supabase variabelen hebt in Vercel

Als je al variabelen hebt zoals:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Dan moet je deze kopiëren met `REACT_APP_` prefix:**

1. Ga naar je Vercel project dashboard
2. Navigeer naar **Settings** > **Environment Variables**
3. Klik op een bestaande variabele (bijv. `SUPABASE_URL` of `NEXT_PUBLIC_SUPABASE_URL`)
4. Kopieer de waarde
5. Voeg een **nieuwe** variabele toe met de naam: `REACT_APP_SUPABASE_URL`
6. Plak dezelfde waarde
7. Doe hetzelfde voor de anon key: voeg `REACT_APP_SUPABASE_ANON_KEY` toe (gebruik de waarde van `SUPABASE_ANON_KEY` of `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
8. Zorg dat beide nieuwe variabelen beschikbaar zijn voor:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
9. Klik op **Save**

**Je hoeft de oude variabelen NIET te verwijderen** - die kunnen door andere projecten worden gebruikt. Je maakt gewoon nieuwe variabelen met `REACT_APP_` prefix.

### Optie 2: Als je nog geen Supabase variabelen hebt

1. Ga naar je Supabase project dashboard
2. Ga naar **Settings** > **API**
3. Kopieer de **Project URL**
4. Kopieer de **anon public** key
5. Ga naar je Vercel project dashboard
6. Navigeer naar **Settings** > **Environment Variables**
7. Voeg de volgende environment variables toe:
   - Naam: `REACT_APP_SUPABASE_URL`, Waarde: je Supabase project URL
   - Naam: `REACT_APP_SUPABASE_ANON_KEY`, Waarde: je Supabase anon key
8. Zorg dat beide variabelen beschikbaar zijn voor:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
9. Klik op **Save**

### Na het instellen:

**Belangrijk**: Na het toevoegen van environment variables, moet je je deployment opnieuw deployen voor de wijzigingen actief te worden.

## Stap 5: Testen

1. Start je lokale development server: `npm start`
2. Ga naar de startpagina (`/`)
3. De video's zouden automatisch moeten worden geladen en achter elkaar moeten afspelen
4. Als er geen video's zijn, wordt de ParticleBackground getoond als fallback

## Stap 6: Video's Toevoegen/Verwijderen

- **Video's toevoegen**: Upload nieuwe video's naar de `hero-videos` bucket in Supabase
- **Video's verwijderen**: Verwijder video's uit de bucket in Supabase
- **Video volgorde**: Video's worden alfabetisch gesorteerd op bestandsnaam

## Troubleshooting

### Video's worden niet getoond

1. **Check console logs**: Open de browser console (F12) en kijk naar eventuele errors
2. **Check environment variables**: Zorg dat `REACT_APP_SUPABASE_URL` en `REACT_APP_SUPABASE_ANON_KEY` correct zijn ingesteld
3. **Check bucket naam**: Zorg dat de bucket naam precies `hero-videos` is (hoofdlettergevoelig)
4. **Check bucket permissions**: Zorg dat de bucket **public** is
5. **Check video formaten**: Zorg dat video's een ondersteund formaat hebben (`.mp4`, `.webm`, `.ogg`, `.mov`)

### Video's laden niet in Vercel

1. **Environment variables**: Zorg dat de environment variables correct zijn ingesteld in Vercel
2. **Redeploy**: Na het toevoegen van environment variables, moet je een nieuwe deployment maken
3. **Check logs**: Ga naar je Vercel project > **Deployments** > klik op de laatste deployment > bekijk de logs

### Video's spelen niet af

1. **Autoplay blocked**: Sommige browsers blokkeren autoplay. Dit is normaal gedrag
2. **Video formaat**: Zorg dat video's geschikt zijn voor web (geoptimaliseerd, niet te groot)
3. **Network**: Check of video's toegankelijk zijn via de publieke URL

## Technische Details

- De video's worden automatisch opgehaald uit Supabase Storage wanneer de Hero component wordt geladen
- Video's worden automatisch achter elkaar afgespeeld in een loop
- Als er geen video's zijn of als er een fout optreedt, wordt de ParticleBackground getoond als fallback
- Video's worden alfabetisch gesorteerd op bestandsnaam
- De bucket naam kan worden aangepast in `src/lib/supabase.ts` (zoek naar `VIDEO_BUCKET_NAME`)

## Veiligheid

- De anon key is veilig om te gebruiken in de frontend (het is een publieke key)
- Video's in een publieke bucket zijn toegankelijk voor iedereen met de URL
- Als je privé video's wilt, moet je een andere aanpak gebruiken met authenticated requests
