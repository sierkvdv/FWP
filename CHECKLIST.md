# Video Background Setup Checklist

## ✅ Wat moet klaar zijn:

### 1. Supabase Bucket
- [ ] Bucket naam is precies: `hero-videos` (hoofdlettergevoelig!)
- [ ] Bucket is **PUBLIC** (belangrijk!)
- [ ] Video's zijn geüpload naar de bucket
- [ ] Video formaten zijn: `.mp4`, `.webm`, `.ogg`, of `.mov`

### 2. Vercel Environment Variables
- [x] `REACT_APP_SUPABASE_URL` is ingesteld
- [x] `REACT_APP_SUPABASE_ANON_KEY` is ingesteld
- [ ] Beide zijn ingesteld voor Production, Preview, en Development

### 3. Deployment
- [x] Code is gepusht naar GitHub
- [ ] Vercel deployment is klaar
- [ ] Nieuwe deployment is gemaakt NA het toevoegen van environment variables

### 4. Testen
- [ ] Ga naar je live site
- [ ] Open browser console (F12)
- [ ] Check of er errors zijn
- [ ] Check of video's worden geladen

## 🔍 Als het niet werkt:

1. **Check bucket naam**: Moet exact `hero-videos` zijn
2. **Check bucket is public**: Ga naar Supabase > Storage > je bucket > Settings > zet "Public bucket" aan
3. **Check environment variables**: Zorg dat `REACT_APP_SUPABASE_URL` en `REACT_APP_SUPABASE_ANON_KEY` in Vercel staan
4. **Check Vercel deployment**: Maak een nieuwe deployment na het toevoegen van environment variables
5. **Check browser console**: Open F12 en kijk naar errors

## 📝 Als je bucket een andere naam heeft:

Laat me weten wat de naam is, dan pas ik de code aan naar jouw bucket naam.

