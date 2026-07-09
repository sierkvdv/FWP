/* ------------------------------------------------------------------ *
 *  SHOWREEL — reclamevideo's op de homepage.
 *  Eén video toevoegen = één entry hieronder. De eerste entry wordt
 *  groot getoond; volgende entries komen in een rij eronder.
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
    id: 'tij',
    title: 'TIJ — strand-commercial',
    mp4: '/videos/ads/tij-eb.mp4',
    poster: '/videos/ads/tij-eb.jpg',
    ratio: '16/9',
  },
  {
    id: 'nordax',
    title: 'NORDAX — commercial',
    mp4: '/videos/ads/nordax.mp4',
    poster: '/videos/ads/nordax.jpg',
    ratio: '16/9',
  },
];
