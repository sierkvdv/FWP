/* ------------------------------------------------------------------ *
 *  SHOWREEL — reclamevideo's op de homepage.
 *  Eén video toevoegen = één entry hieronder. De eerste entry wordt
 *  groot getoond; volgende entries komen in een rij eronder.
 *  - youtube: volledige YouTube-URL (embed wordt automatisch gemaakt)
 *  - mp4: pad naar mp4 in /public/videos (speelt stil in loop)
 * ------------------------------------------------------------------ */

export interface ShowreelVideo {
  id: string;
  title?: string;
  youtube?: string;
  mp4?: string;
  /** Stilstaand beeld zolang de video laadt (optioneel). */
  poster?: string;
}

export const showreel: ShowreelVideo[] = [
  // Voorbeeld:
  // { id: 'higg-summer', title: 'HiGG — Summer Fresh', youtube: 'https://www.youtube.com/watch?v=XXXX' },
  // { id: 'demo-ad', title: 'Product-demo', mp4: '/videos/demo-ad.mp4' },
];
