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
    id: 'glod',
    title: 'GLØD — "De Plons"',
    mp4: '/videos/ads/glod-de-plons-v2.mp4',
    poster: '/videos/ads/glod-de-plons.jpg',
    ratio: '16/9',
  },
  {
    id: 'ombra',
    title: 'OMBRA — "Find your shade"',
    mp4: '/videos/ads/ombra-find-your-shade.mp4',
    poster: '/videos/ads/ombra-find-your-shade.jpg',
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
  {
    id: 'lookup',
    title: 'LOOK UP — "The modern human"',
    mp4: '/videos/ads/look-up-the-modern-human.mp4',
    poster: '/videos/ads/look-up-the-modern-human.jpg',
    ratio: '16/9',
  },
  {
    id: 'behindyou',
    title: 'LOOK UP — "Behind you"',
    mp4: '/videos/ads/look-up-behind-you.mp4',
    poster: '/videos/ads/look-up-behind-you.jpg',
    ratio: '16/9',
  },
];
