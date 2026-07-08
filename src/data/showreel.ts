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
    title: 'TIJ — strand-commercial (concept)',
    mp4: '/videos/ads/tij.mp4',
    poster: '/videos/ads/tij.jpg',
    ratio: '16/9',
  },
  {
    id: 'hondad',
    title: 'Jouw hond, maar dan geschilderd',
    mp4: '/videos/ads/hondad.mp4',
    poster: '/videos/ads/hondad.jpg',
    ratio: '9/16',
  },
  {
    id: 'aipet',
    title: 'Custom AI Pet — reveal',
    mp4: '/videos/ads/aipet.mp4',
    poster: '/videos/ads/aipet.jpg',
    ratio: '9/16',
  },
  {
    id: 'portretto-ad',
    title: 'Portretto — familieportret',
    mp4: '/videos/ads/portretto-ad.mp4',
    poster: '/videos/ads/portretto-ad.jpg',
    ratio: '9/16',
  },
];
