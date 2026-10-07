/* Na `react-scripts build` (npm postbuild): schrijft per film build/v/<slug>/index.html.
 * Dat is gewoon de app (index.html), maar met een eigen titel en preview (og:image = poster,
 * og:video = mp4), zodat een gedeelde link in WhatsApp, LinkedIn enz. de juiste video toont.
 * Crawlers draaien geen JavaScript; daarom moet dit in de HTML zelf staan.
 * De lijst met films komt uit src/data/films.ts (zelfde bron als de site). */
const fs = require('fs');
const path = require('path');
const { films } = require('./films');

const SITE = (process.env.SITE_URL || 'https://fwp.one').replace(/\/$/, '');
const BUILD = path.join(__dirname, '..', 'build');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const basis = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
// Oude titel, omschrijving en previewtags eruit; de nieuwe komen vlak voor </head>.
const kaal = basis
  .replace(/<title>[\s\S]*?<\/title>/i, '')
  .replace(/<meta\s+(?:property|name)="(?:og:[^"]*|twitter:[^"]*|description)"[^>]*>/gi, '');

for (const f of films) {
  const url = `${SITE}/v/${f.slug}/`;
  const titel = `${f.title} — FWP`;
  const omschrijving = f.context
    ? `${f.context}: ${f.title}. Gemaakt door Fieldworks Production.`
    : `${f.title}. Gemaakt door Fieldworks Production.`;
  // Licht previewbeeld (scripts/og-beelden.js) als dat er is; anders de poster.
  const og = fs.existsSync(path.join(BUILD, 'og', `${f.slug}.jpg`));
  const beeld = `${SITE}${og ? `/og/${f.slug}.jpg` : f.poster || '/og-image.png'}`;
  const [bw, bh] = og ? [1200, 630] : f.ratio === '9/16' ? [1080, 1920] : [1920, 1080];
  const [b, h] = f.ratio === '9/16' ? [1080, 1920] : [1920, 1080];
  const kop = [
    `<title>${esc(titel)}</title>`,
    `<meta name="description" content="${esc(omschrijving)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="video.other">`,
    `<meta property="og:site_name" content="FWP — Fieldworks Production">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:title" content="${esc(titel)}">`,
    `<meta property="og:description" content="${esc(omschrijving)}">`,
    `<meta property="og:image" content="${esc(beeld)}">`,
    `<meta property="og:image:width" content="${bw}">`,
    `<meta property="og:image:height" content="${bh}">`,
    `<meta property="og:video" content="${esc(SITE + f.mp4)}">`,
    `<meta property="og:video:secure_url" content="${esc(SITE + f.mp4)}">`,
    `<meta property="og:video:type" content="video/mp4">`,
    `<meta property="og:video:width" content="${b}">`,
    `<meta property="og:video:height" content="${h}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(titel)}">`,
    `<meta name="twitter:description" content="${esc(omschrijving)}">`,
    `<meta name="twitter:image" content="${esc(beeld)}">`,
  ].join('');
  const dir = path.join(BUILD, 'v', f.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), kaal.replace(/<\/head>/i, kop + '</head>'));
}
console.log(`deelpagina's: ${films.length} films -> build/v/<slug>/index.html (${SITE})`);
