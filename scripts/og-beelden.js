/* Handmatig (na een nieuwe video): maakt per film een licht previewbeeld public/og/<slug>.jpg
 * (1200x630, <300 KB, anders toont WhatsApp geen voorbeeld). Staande video's komen gecentreerd
 * op een vervaagde achtergrond van zichzelf. Bestaande beelden blijven staan; --opnieuw maakt alles opnieuw.
 * Vereist ffmpeg in PATH. Gebruik: node scripts/og-beelden.js [--opnieuw] */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { films } = require('./films');

const PUBLIC = path.join(__dirname, '..', 'public');
const DOEL = path.join(PUBLIC, 'og');
const opnieuw = process.argv.includes('--opnieuw');
fs.mkdirSync(DOEL, { recursive: true });

for (const f of films) {
  const uit = path.join(DOEL, `${f.slug}.jpg`);
  if (!opnieuw && fs.existsSync(uit)) continue;
  if (!f.poster) {
    console.log(`overgeslagen (geen poster): ${f.slug}`);
    continue;
  }
  const bron = path.join(PUBLIC, f.poster);
  const filter =
    f.ratio === '9/16'
      ? '[0:v]split[a][b];[a]scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,boxblur=24:2,eq=brightness=-0.25[bg];' +
        '[b]scale=-2:630[fg];[bg][fg]overlay=(W-w)/2:0'
      : 'scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630';
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', bron, '-filter_complex', filter, '-frames:v', '1', '-q:v', '4', uit]);
  console.log(`${f.slug}.jpg ${Math.round(fs.statSync(uit).size / 1024)} KB`);
}
