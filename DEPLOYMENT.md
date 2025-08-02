# Deployment Guide

Deze gids helpt je bij het deployen van de Creative Engineer CV website naar verschillende platforms.

## 🚀 Vercel (Aanbevolen)

Vercel is de beste optie voor React applicaties vanwege de automatische deployments en optimale performance.

### Stap 1: Voorbereiding
1. Zorg dat je code in een GitHub repository staat
2. Maak een account aan op [vercel.com](https://vercel.com)

### Stap 2: Deployment
1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Importeer je GitHub repository
3. Vercel detecteert automatisch dat het een React app is
4. Klik op "Deploy"

### Stap 3: Configuratie
Vercel gebruikt automatisch de juiste build settings:
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Stap 4: Custom Domain (Optioneel)
1. Ga naar je project dashboard
2. Klik op "Settings" → "Domains"
3. Voeg je custom domain toe
4. Configureer DNS records

## 🌐 Netlify

### Stap 1: Build Locally
```bash
npm run build
```

### Stap 2: Deploy
1. Ga naar [netlify.com](https://netlify.com)
2. Sleep de `build` folder naar Netlify
3. Of connect je GitHub repository

### Stap 3: Configuratie
- **Build command**: `npm run build`
- **Publish directory**: `build`

## 🔧 Environment Variables

Voeg deze environment variables toe indien nodig:

```env
REACT_APP_GA_TRACKING_ID=your-ga-tracking-id
REACT_APP_CONTACT_EMAIL=your-email@domain.com
```

## 📱 Performance Optimalisatie

### Voor Vercel
Vercel optimaliseert automatisch:
- ✅ Code splitting
- ✅ Image optimization
- ✅ CDN caching
- ✅ Gzip compression

### Voor Netlify
Voeg `_redirects` toe in `public/`:
```
/*    /index.html   200
```

## 🔍 SEO Optimalisatie

### Meta Tags
Update `public/index.html`:
```html
<meta name="description" content="Creative Engineer - AI, Web Development, Music & Design Portfolio">
<meta name="keywords" content="creative engineer, AI, web development, music, design, portfolio">
<meta property="og:title" content="Creative Engineer Portfolio">
<meta property="og:description" content="AI, Web Development, Music & Design Portfolio">
<meta property="og:image" content="%PUBLIC_URL%/og-image.jpg">
```

### Sitemap
Genereer een sitemap.xml in `public/`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/projects</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/contact</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

## 📊 Analytics

### Google Analytics
1. Maak een GA4 property aan
2. Voeg tracking ID toe aan environment variables
3. Implementeer in `src/index.tsx`:

```typescript
// Google Analytics
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

if (GA_TRACKING_ID) {
  // Add GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
}
```

## 🔒 Security

### Content Security Policy
Voeg CSP headers toe in `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
```

### HTTPS
- Vercel: Automatisch HTTPS
- Netlify: Automatisch HTTPS
- Custom domain: Configureer SSL certificaat

## 📈 Monitoring

### Vercel Analytics
1. Ga naar project dashboard
2. Klik op "Analytics"
3. Schakel in voor performance monitoring

### Error Tracking
Voeg Sentry toe:
```bash
npm install @sentry/react @sentry/tracing
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🚀 Continuous Deployment

### GitHub Actions (Optioneel)
Maak `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🔧 Troubleshooting

### Build Errors
1. Check Node.js versie (18+)
2. Clear cache: `npm run build -- --reset-cache`
3. Delete node_modules en reinstall

### Routing Issues
Voor SPA routing, voeg redirects toe:
- Vercel: Automatisch
- Netlify: `_redirects` file
- Apache: `.htaccess`
- Nginx: `nginx.conf`

### Performance Issues
1. Check bundle size: `npm run build`
2. Optimize images
3. Enable compression
4. Use CDN voor assets

## 📞 Support

Voor deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- GitHub: [github.com/support](https://github.com/support)

---

Succesvol deployment! 🎉 