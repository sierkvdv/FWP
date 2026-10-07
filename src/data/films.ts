import { showreel } from './showreel';
import { cases } from './cases';
import { brandFilm } from './brandfilm';

/* ------------------------------------------------------------------ *
 *  FILMS — elke video met geluid die je los kunt delen.
 *  Wordt automatisch opgebouwd uit de brand film, de showreel en de
 *  case-galerijen; niets apart bijhouden. Elke film krijgt een eigen
 *  pagina op /v/<slug>/ (deellink). scripts/deelpaginas.js schrijft
 *  na de build per film een HTML met de juiste preview (titel, poster)
 *  voor WhatsApp, LinkedIn enz.
 * ------------------------------------------------------------------ */

export interface Film {
  slug: string;
  title: string;
  mp4: string;
  poster?: string;
  ratio: string;
  /** Case-titel als context, bv. "Wondertale". */
  context?: string;
  /** Case waar de film bij hoort (link "Bekijk de case"). */
  caseId?: string;
}

/**
 * Slug uit de bestandsnaam: stabiel, kort en leesbaar.
 * Versie- en formaatstaarten vallen weg, zodat een nieuwe versie
 * (glod-de-plons-v2.mp4) dezelfde deellink houdt.
 */
export function filmSlug(mp4: string): string {
  const naam = (mp4.split('/').pop() || mp4).replace(/\.mp4$/i, '');
  return naam
    .toLowerCase()
    .replace(/-(v\d+|\d+x\d+)$/g, '')
    .replace(/-(v\d+|\d+x\d+)$/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function bouw(): Film[] {
  const lijst: Film[] = [
    {
      slug: filmSlug(brandFilm.mp4),
      title: brandFilm.title,
      mp4: brandFilm.mp4,
      poster: brandFilm.poster,
      ratio: '16/9',
    },
  ];
  for (const v of showreel) {
    if (!v.mp4) continue;
    lijst.push({
      slug: filmSlug(v.mp4),
      title: v.title || 'Reclamevideo',
      mp4: v.mp4,
      poster: v.poster,
      ratio: v.ratio || '16/9',
      caseId: 'reclamevideos',
    });
  }
  for (const c of cases) {
    for (const g of c.gallery || []) {
      if (!g.mp4) continue;
      lijst.push({
        slug: filmSlug(g.mp4),
        title: g.title || c.title,
        mp4: g.mp4,
        poster: g.poster,
        ratio: c.galleryRatio || '9/16',
        context: c.id === 'reclamevideos' ? undefined : c.title,
        caseId: c.id,
      });
    }
  }
  // Dezelfde video op twee plekken (showreel + case) = één film.
  const gezien = new Set<string>();
  return lijst.filter((f) => (gezien.has(f.slug) ? false : (gezien.add(f.slug), true)));
}

export const films: Film[] = bouw();

export function filmBySlug(slug?: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}
