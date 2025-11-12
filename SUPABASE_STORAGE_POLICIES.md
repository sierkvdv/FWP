# Supabase Storage Policies - Stap voor Stap Instructies

## Het Probleem

Je bucket is public, maar je krijgt toch 0 bestanden terug. Dit komt omdat Supabase Storage **Storage Policies** nodig heeft om anon users toe te staan om bestanden te lezen.

## Oplossing: Storage Policies Instellen

### Stap 1: Ga naar Storage Policies

1. Ga naar je **Supabase Dashboard**: https://app.supabase.com
2. Selecteer je project
3. Klik op **Storage** in het linkermenu
4. Klik op **Policies** (boven in het menu, naast "Buckets")

### Stap 2: Selecteer je Bucket

1. Je ziet een lijst met buckets
2. Klik op de bucket **`hero-videos`**

### Stap 3: Maak een Nieuwe Policy

1. Klik op **"New Policy"** (rechtsboven)
2. Kies **"Create a policy from scratch"** (of gebruik een template als beschikbaar)

### Stap 4: Configureer de Policy

1. **Policy name**: `Allow public read access` (of een andere naam)
2. **Allowed operation**: Selecteer **`SELECT`** (dit staat lezen toe)
3. **Target roles**: Selecteer **`anon`** en **`authenticated`** (of alleen `anon` als je alleen anon users wilt toestaan)
4. **Policy definition**: 
   - Gebruik deze SQL:
   ```sql
   (bucket_id = 'hero-videos'::text)
   ```
   - Of gebruik de policy editor en selecteer:
     - **Bucket**: `hero-videos`
     - **Operation**: `SELECT` (read)
     - **Roles**: `anon`, `authenticated`

### Stap 5: Sla de Policy op

1. Klik op **"Review"** of **"Save"**
2. Controleer dat de policy is opgeslagen

### Stap 6: Test

1. Refresh je website
2. Check de browser console (F12)
3. Je zou nu moeten zien: `📁 Found X files in bucket "hero-videos"`

## Alternatief: Via SQL Editor

Als de UI niet werkt, kun je ook via de SQL Editor een policy maken:

1. Ga naar **SQL Editor** in Supabase Dashboard
2. Voer deze SQL query uit:

```sql
-- Create a policy that allows anon users to read files from hero-videos bucket
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'hero-videos');
```

3. Klik op **"Run"**

## Verificatie

Na het instellen van de policy:

1. Refresh je website
2. Open browser console (F12)
3. Je zou moeten zien:
   - `✅ Found X files in bucket "hero-videos"`
   - `🎥 Found X video files: [lijst van video's]`
   - `✅ Successfully loaded X video URL(s)`

## Troubleshooting

### Policy werkt niet?

1. **Check of de policy actief is**: Ga naar Storage > Policies > hero-videos en controleer dat de policy zichtbaar is
2. **Check de bucket naam**: Zorg dat de bucket naam exact `hero-videos` is (hoofdlettergevoelig)
3. **Check de policy SQL**: Zorg dat de bucket_id exact overeenkomt: `'hero-videos'`
4. **Wacht even**: Soms duurt het een minuut voordat policies actief worden

### Nog steeds geen bestanden?

1. **Check of bestanden in de root staan**: De code kijkt alleen naar bestanden in de root van de bucket (geen subfolders)
2. **Check de bestandsformaten**: Alleen `.mp4`, `.webm`, `.ogg`, `.mov` worden ondersteund
3. **Check de browser console**: Kijk naar de error messages voor meer details

## Belangrijk

- **Public bucket alleen is niet genoeg**: Je moet ook Storage Policies instellen
- **Storage Policies zijn verplicht**: Zelfs voor public buckets moet je expliciet toestemming geven voor lezen
- **Anon users hebben beperkte rechten**: Anon users kunnen alleen lezen als je dit expliciet toestaat via policies

