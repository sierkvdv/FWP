/* ------------------------------------------------------------------ *
 *  SHOWREEL — reclamevideo's op de homepage.
 *  Eén video toevoegen = één entry hieronder. De eerste entry wordt
 *  groot getoond (speelt automatisch, stil, in loop); volgende entries
 *  komen in een rij eronder (starten op klik, met geluid).
 *  - youtube: volledige YouTube-URL (embed wordt automatisch gemaakt)
 *  - mp4: pad naar mp4 in /public/videos (met poster-still)
 *  - ratio: '16/9' (liggend, default) of '9/16' (verticaal/social)
 * ------------------------------------------------------------------ */

export interface ShowreelVideo {
  id: string;
  title?: string;
  youtube?: string;
  mp4?: string;
  /** Stilstaand beeld zolang de video niet speelt. */
  poster?: string;
  ratio?: '16/9' | '9/16';
}

export const showreel: ShowreelVideo[] = [
  {
    id: 'de-reis',
    title: 'Fieldworks Production — "De Reis" (brand film)',
    mp4: '/videos/ads/de-reis.mp4',
    poster: '/videos/ads/de-reis.jpg',
    ratio: '16/9',
  },
  {
    id: 'glod',
    title: 'GLØD — "De Plons"',
    mp4: '/videos/ads/glod-de-plons.mp4',
    poster: '/videos/ads/glod-de-plons.jpg',
    ratio: '16/9',
  },
  {
    id: 'nordax',
    title: 'NORDAX — commercial',
    mp4: '/videos/ads/nordax-hero.mp4',
    poster: '/videos/ads/nordax-hero.jpg',
    ratio: '16/9',
  },
  {
    id: 'tij',
    title: 'TIJ — strand-commercial',
    mp4: '/videos/ads/tij-eb.mp4',
    poster: '/videos/ads/tij-eb.jpg',
    ratio: '16/9',
  },
];
