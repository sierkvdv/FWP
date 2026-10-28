import { useEffect, useState } from 'react';

/**
 * Status van de Deep SamSo Club LIVE (club.sierk.dev/live/): is Sierk aan het draaien, hoeveel mensen zijn er binnen,
 * hoeveel staan er in de rij. Gelezen uit /live/status (alleen lezen, CORS open). Gebruikt door de navigatie (rood bolletje)
 * en de pagina /live. TWITCH_KANAAL leeg = geen speler, alleen de club-knop.
 * 25-10-2026: Twitch geschorst wegens 24/7 heruitzending van opgenomen dj-sets (niet toegestaan in het DJ-programma): geen Twitch meer,
 * /live speelt de radio zelf (RADIO_URL). CLUB_URL met ?wandelen=1, anders stuurt de club je door naar /kijken.
 */
export const CLUB_URL = 'https://club.sierk.dev/live/?wandelen=1';
export const RADIO_URL = 'https://club.sierk.dev/live/stream';
export const CLUB_KIJK_URL = 'https://club.sierk.dev/live/?uitzenden=1';  // 28-10: club in kijkmodus als er geen uitzending is
export const TV_URL = 'https://club.sierk.dev/tv/club.m3u8';  // 26-10: eigen uitzending (OBS -> VPS), HLS
export const STATUS_URL = 'https://club.sierk.dev/live/status';
export const TWITCH_KANAAL = '';

export type ClubStatus = {
  live: boolean;
  bezoekers: number;
  rij: number;
  max: number;
  titel: string;
  ok: boolean;
};

const leeg: ClubStatus = { live: false, bezoekers: 0, rij: 0, max: 0, titel: '', ok: false };

export async function haalClubStatus(): Promise<ClubStatus> {
  try {
    const r = await fetch(STATUS_URL, { cache: 'no-store' });
    if (!r.ok) return leeg;
    const j = await r.json();
    const relay = j.relay || {};
    return {
      live: !!relay.live,
      bezoekers: +j.bezoekers || 0,
      rij: +j.rij || 0,
      max: +j.max || 0,
      titel: relay.titel ? decodeURIComponent(String(relay.titel)) : '',
      ok: true,
    };
  } catch {
    return leeg;
  }
}

export function useClubStatus(intervalMs = 15000): ClubStatus {
  const [s, setS] = useState<ClubStatus>(leeg);
  useEffect(() => {
    let weg = false;
    const tik = async () => { const r = await haalClubStatus(); if (!weg) setS(r); };
    tik();
    const t = setInterval(tik, intervalMs);
    return () => { weg = true; clearInterval(t); };
  }, [intervalMs]);
  return s;
}
