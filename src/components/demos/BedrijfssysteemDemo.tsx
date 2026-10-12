import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ------------------------------------------------------------------ *
 *  Klikbare demo van Sierks eigen bedrijfssysteem (case 'bedrijfssysteem').
 *  Zelfde opbouw en stijl als het echte systeem, maar ALLE namen en
 *  bedragen zijn verzonnen. Geen echte klanten, geen echte cijfers.
 * ------------------------------------------------------------------ */

type Lang = 'nl' | 'en';
type Tab = 'overzicht' | 'facturen' | 'bank' | 'bonnen' | 'mail' | 'assistent';
type T2 = { nl: string; en: string };

const tabs: { id: Tab; label: T2 }[] = [
  { id: 'overzicht', label: { nl: 'Overzicht', en: 'Overview' } },
  { id: 'facturen', label: { nl: 'Facturen', en: 'Invoices' } },
  { id: 'bank', label: { nl: 'Bank', en: 'Bank' } },
  { id: 'bonnen', label: { nl: 'Bonnetjes', en: 'Receipts' } },
  { id: 'mail', label: { nl: 'Mail', en: 'Email' } },
  { id: 'assistent', label: { nl: 'Assistent', en: 'Assistant' } },
];

const euro = (cents: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(
    cents / 100
  );

/* ---------- kleine bouwstenen ---------- */

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`text-[10px] uppercase tracking-[0.2em] text-muted ${className}`}>{children}</div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-md border border-line bg-surface p-4 ${className}`}>{children}</div>
);

type ChipTone = 'accent' | 'plain' | 'warn' | 'dim';
const Chip: React.FC<{ tone?: ChipTone; children: React.ReactNode }> = ({ tone = 'plain', children }) => {
  const cls = {
    accent: 'border-accent/40 text-accent',
    plain: 'border-line text-ink',
    warn: 'border-[#ff8a7a]/40 text-[#ff8a7a]',
    dim: 'border-line text-muted',
  }[tone];
  return (
    <span className={`inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${cls}`}>
      {children}
    </span>
  );
};

const Knop: React.FC<{ onClick: () => void; primary?: boolean; children: React.ReactNode }> = ({
  onClick,
  primary,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={
      primary
        ? 'rounded bg-accent px-3 py-1.5 text-xs font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5'
        : 'rounded border border-line px-3 py-1.5 text-xs text-ink transition-colors hover:border-muted'
    }
  >
    {children}
  </button>
);

/* ---------- 1. Overzicht ---------- */

const Overzicht: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [sec, setSec] = useState(1 * 3600 + 12 * 60 + 8);
  const [loopt, setLoopt] = useState(true);
  useEffect(() => {
    if (!loopt) return;
    const id = window.setInterval(() => setSec((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [loopt]);
  const hms = [Math.floor(sec / 3600), Math.floor((sec % 3600) / 60), sec % 60]
    .map((n, i) => (i === 0 ? String(n) : String(n).padStart(2, '0')))
    .join(':');
  const omzet = 1864000;
  const kor = 2000000;
  const feed: [string, T2][] = [
    ['08:00', { nl: 'Ochtendbericht naar Telegram: 2 afspraken, 4 taken', en: 'Morning brief sent to Telegram: 2 meetings, 4 tasks' }],
    ['09:14', { nl: 'FWP-2026-0042 betaald via iDEAL · € 605,00', en: 'FWP-2026-0042 paid via iDEAL · €605.00' }],
    ['10:02', { nl: 'Rabobank: 9 nieuwe transacties, allemaal geboekt', en: 'Rabobank: 9 new transactions, all booked' }],
    ['11:30', { nl: 'Bon van Hostinger uit de mail gekoppeld', en: 'Hostinger receipt matched from email' }],
    ['12:45', { nl: 'Concept-antwoord klaar voor Studio Noord', en: 'Draft reply ready for Studio Noord' }],
  ];
  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Label>{loopt ? (lang === 'nl' ? 'Timer loopt' : 'Timer running') : lang === 'nl' ? 'Opgeslagen' : 'Saved'}</Label>
          <div className="mt-1 text-sm text-ink">Bakkerij De Vries · {lang === 'nl' ? 'nieuwe bestelpagina' : 'new order page'}</div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-light tabular-nums ${loopt ? 'text-accent' : 'text-ink'} text-2xl`}>{hms}</span>
          <Knop onClick={() => setLoopt((l) => !l)} primary={!loopt}>
            {loopt ? 'Stop' : lang === 'nl' ? 'Verder' : 'Resume'}
          </Knop>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          [{ nl: 'Omzet 2026', en: 'Revenue 2026' }, euro(omzet, lang), false],
          [{ nl: 'Kosten 2026', en: 'Costs 2026' }, euro(231500, lang), false],
          [{ nl: 'Winst 2026', en: 'Profit 2026' }, euro(omzet - 231500, lang), true],
          [{ nl: 'Openstaand', en: 'Outstanding' }, euro(229000, lang), false],
        ].map(([l, v, acc]) => (
          <Card key={(l as T2).nl}>
            <Label>{(l as T2)[lang]}</Label>
            <div className={`mt-2 text-lg font-light ${acc ? 'text-accent' : 'text-ink'}`}>{v as string}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Label>{lang === 'nl' ? 'KOR-grens (€ 20.000 omzet per jaar)' : 'Small-business scheme limit (€20,000/yr)'}</Label>
          <span className="text-xs text-[#ff8a7a]">
            {lang === 'nl' ? `Let op: nog ${euro(kor - omzet, lang)} tot de grens` : `Heads-up: ${euro(kor - omzet, lang)} to go`}
          </span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-line">
          <div className="h-1.5 rounded-full bg-accent" style={{ width: `${(omzet / kor) * 100}%` }} />
        </div>
      </Card>
      <Card>
        <Label>{lang === 'nl' ? 'Vandaag, vanzelf' : 'Today, automatically'}</Label>
        <ul className="mt-3 space-y-2">
          {feed.map(([t, s]) => (
            <li key={t} className="flex gap-3 text-sm">
              <span className="w-11 shrink-0 tabular-nums text-muted">{t}</span>
              <span className="text-ink">{s[lang]}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

/* ---------- 2. Facturen ---------- */

type Factuur = {
  nr: string;
  klant: string;
  cents: number;
  status: 'betaald' | 'verzonden' | 'telaat' | 'concept' | 'incasso';
  regels: [T2, number][];
};

const facturen: Factuur[] = [
  { nr: 'FWP-2026-0044', klant: 'Atelier Mos', cents: 9500, status: 'incasso', regels: [[{ nl: 'Website-onderhoud oktober', en: 'Website maintenance October' }, 9500]] },
  { nr: 'FWP-2026-0043', klant: 'Studio Noord', cents: 145000, status: 'verzonden', regels: [[{ nl: 'Campagnevideo, 2 versies', en: 'Campaign video, 2 cuts' }, 120000], [{ nl: 'Ondertitels NL/EN', en: 'Subtitles NL/EN' }, 25000]] },
  { nr: 'FWP-2026-0042', klant: 'Bakkerij De Vries', cents: 60500, status: 'betaald', regels: [[{ nl: 'Bestelpagina, 5,5 uur à € 110', en: 'Order page, 5.5 hrs at €110' }, 60500]] },
  { nr: 'FWP-2026-0041', klant: 'Van Dijk Installatie', cents: 84000, status: 'telaat', regels: [[{ nl: 'Offertetool, fase 1', en: 'Quote tool, phase 1' }, 84000]] },
  { nr: '—', klant: 'Bakkerij De Vries', cents: 33000, status: 'concept', regels: [[{ nl: 'Uren oktober (tot nu)', en: 'Hours October (so far)' }, 33000]] },
];

const statusChip = (s: Factuur['status'], lang: Lang, herinnerd: boolean) => {
  const m: Record<Factuur['status'], [ChipTone, T2]> = {
    betaald: ['accent', { nl: 'Betaald', en: 'Paid' }],
    verzonden: ['plain', { nl: 'Verzonden', en: 'Sent' }],
    telaat: ['warn', herinnerd ? { nl: 'Herinnerd', en: 'Reminded' } : { nl: 'Te laat', en: 'Overdue' }],
    concept: ['dim', { nl: '1 nov vanzelf', en: 'Sends Nov 1' }],
    incasso: ['accent', { nl: 'Incasso', en: 'Direct debit' }],
  };
  const [tone, l] = m[s];
  return <Chip tone={tone}>{l[lang]}</Chip>;
};

const Facturen: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [open, setOpen] = useState(facturen[3].nr);
  const [herinnerd, setHerinnerd] = useState(false);
  const f = facturen.find((x) => x.nr === open) || facturen[0];
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="divide-y divide-line rounded-md border border-line bg-surface">
        {facturen.map((x) => (
          <button
            key={x.nr + x.status}
            type="button"
            onClick={() => setOpen(x.nr)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02] ${
              open === x.nr ? 'bg-white/[0.03]' : ''
            }`}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${open === x.nr ? 'bg-accent' : 'bg-line'}`} />
            <span className="w-28 shrink-0 text-xs tabular-nums text-muted">{x.nr}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{x.klant}</span>
            <span className="hidden text-sm tabular-nums text-ink sm:inline">{euro(x.cents, lang)}</span>
            {statusChip(x.status, lang, herinnerd)}
          </button>
        ))}
      </div>
      <div className="rounded-md bg-[#f6f6f4] p-5 text-[#141416]">
        <div className="text-[9px] font-semibold uppercase tracking-[0.3em]">Fieldworks Production</div>
        <div className="mt-2 text-2xl font-light">
          {lang === 'nl' ? 'Factuur' : 'Invoice'}
          <span className="text-[#00b89f]">.</span>
        </div>
        <div className="mt-3 flex justify-between text-xs text-[#5a5a62]">
          <span>{f.klant}</span>
          <span className="tabular-nums">{f.nr}</span>
        </div>
        <div className="mt-4 border-t border-[#141416]/80" />
        {f.regels.map(([r, c]) => (
          <div key={r.nl} className="flex justify-between border-b border-[#e2e2de] py-2 text-xs">
            <span>{r[lang]}</span>
            <span className="tabular-nums">{euro(c, lang)}</span>
          </div>
        ))}
        <div className="mt-3 flex justify-between text-sm font-semibold">
          <span>{lang === 'nl' ? 'Totaal' : 'Total'}</span>
          <span className="tabular-nums">{euro(f.cents, lang)}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {f.status === 'telaat' ? (
            herinnerd ? (
              <span className="text-xs text-[#00866f]">
                {lang === 'nl' ? 'Herinnering verstuurd, met betaallink.' : 'Reminder sent, with payment link.'}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setHerinnerd(true)}
                className="rounded bg-[#141416] px-3 py-1.5 text-xs text-white"
              >
                {lang === 'nl' ? 'Herinnering sturen' : 'Send reminder'}
              </button>
            )
          ) : f.status === 'betaald' ? (
            <span className="text-xs text-[#00866f]">{lang === 'nl' ? 'Betaald via iDEAL, vanzelf afgeboekt.' : 'Paid via iDEAL, booked automatically.'}</span>
          ) : f.status === 'incasso' ? (
            <span className="text-xs text-[#00866f]">
              {lang === 'nl' ? 'Maandelijkse incasso; staat vanzelf op betaald.' : 'Monthly direct debit; marks itself paid.'}
            </span>
          ) : f.status === 'concept' ? (
            <span className="text-xs text-[#5a5a62]">
              {lang === 'nl' ? 'Gaat op 1 november vanzelf de deur uit.' : 'Goes out automatically on 1 November.'}
            </span>
          ) : (
            <span className="rounded border border-[#141416]/20 px-3 py-1.5 text-xs">
              {lang === 'nl' ? 'Betaallink: iDEAL of creditcard' : 'Payment link: iDEAL or card'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- 3. Bank ---------- */

const Bank: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [antwoord, setAntwoord] = useState<null | 'zakelijk' | 'prive'>(null);
  const rijen: [string, string, number, ChipTone, T2][] = [
    ['12-10', 'Bakkerij De Vries', 60500, 'accent', { nl: 'Factuur 0042', en: 'Invoice 0042' }],
    ['11-10', 'Hostinger', -1399, 'plain', { nl: 'Software · regel', en: 'Software · rule' }],
    ['11-10', 'Shell', -6420, 'plain', { nl: 'Reiskosten · AI', en: 'Travel · AI' }],
    ['10-10', 'Wise → Rabobank', 50000, 'dim', { nl: 'Intern', en: 'Internal' }],
    ['09-10', 'Adobe', -7139, 'plain', { nl: 'Software · regel', en: 'Software · rule' }],
    ['08-10', 'Atelier Mos', 9500, 'accent', { nl: 'Incasso 0044', en: 'Debit 0044' }],
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          [{ nl: 'Deze maand', en: 'This month' }, '47'],
          [{ nl: 'Vanzelf geboekt', en: 'Booked automatically' }, '46'],
          [antwoord ? { nl: 'Door jou', en: 'By you' } : { nl: 'Vraag aan jou', en: 'Asked you' }, '1'],
        ].map(([l, v]) => (
          <Card key={(l as T2).nl}>
            <Label>{(l as T2)[lang]}</Label>
            <div className="mt-2 text-lg font-light text-ink">{v as string}</div>
          </Card>
        ))}
      </div>
      {!antwoord && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-accent/40 bg-surface p-4">
          <div className="text-sm text-ink">
            Albert Heijn · {euro(-2350, lang)}
            <span className="ml-2 text-muted">{lang === 'nl' ? 'zakelijk of privé?' : 'business or private?'}</span>
          </div>
          <div className="flex gap-2">
            <Knop primary onClick={() => setAntwoord('zakelijk')}>
              {lang === 'nl' ? 'Zakelijk' : 'Business'}
            </Knop>
            <Knop onClick={() => setAntwoord('prive')}>{lang === 'nl' ? 'Privé' : 'Private'}</Knop>
          </div>
        </div>
      )}
      <div className="divide-y divide-line rounded-md border border-line bg-surface">
        {antwoord && (
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="w-11 shrink-0 text-xs tabular-nums text-muted">12-10</span>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">Albert Heijn</span>
            <span className="text-sm tabular-nums text-ink">{euro(-2350, lang)}</span>
            <Chip tone="plain">
              {antwoord === 'zakelijk' ? (lang === 'nl' ? 'Lunch klant · jij' : 'Client lunch · you') : lang === 'nl' ? 'Privé · jij' : 'Private · you'}
            </Chip>
          </div>
        )}
        {rijen.map(([d, wie, c, tone, l]) => (
          <div key={d + wie} className="flex items-center gap-3 px-4 py-3">
            <span className="w-11 shrink-0 text-xs tabular-nums text-muted">{d}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{wie}</span>
            <span className={`text-sm tabular-nums ${c > 0 ? 'text-accent' : 'text-ink'}`}>{euro(c, lang)}</span>
            <Chip tone={tone}>{l[lang]}</Chip>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">
        {lang === 'nl'
          ? 'Volgorde: eigen overboeking → factuur → vaste regel → AI. Alleen bij twijfel krijg je een vraag.'
          : 'Order: own transfer → invoice → fixed rule → AI. Only when in doubt do you get a question.'}
      </p>
    </div>
  );
};

/* ---------- 4. Bonnetjes ---------- */

const Bonnen: React.FC<{ lang: Lang }> = ({ lang }) => {
  const rijen: [string, number, ChipTone, T2][] = [
    ['Hostinger', 1399, 'plain', { nl: 'Uit de mail', en: 'From email' }],
    ['Adobe', 7139, 'plain', { nl: 'Uit de mail', en: 'From email' }],
    ['Higgsfield', 2900, 'plain', { nl: 'PayPal-bon uit de mail', en: 'PayPal receipt from email' }],
    ['Shell', 6420, 'accent', { nl: 'Foto via Telegram', en: 'Photo via Telegram' }],
    ['Bol.com', 3495, 'warn', { nl: 'Ontbreekt, gevraagd', en: 'Missing, asked' }],
  ];
  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Label>{lang === 'nl' ? 'Kosten met bon, oktober' : 'Costs with receipt, October'}</Label>
          <div className="mt-2 text-lg font-light text-ink">4 / 5</div>
        </div>
        <p className="max-w-sm text-xs text-muted">
          {lang === 'nl'
            ? 'Bonnen van leveranciers en PayPal worden uit de mail gehaald en aan de juiste afschrijving gehangen. Papieren bon? Foto naar de Telegram-bot.'
            : 'Supplier and PayPal receipts are pulled from email and attached to the right payment. Paper receipt? Photo to the Telegram bot.'}
        </p>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {rijen.map(([wie, c, tone, l]) => (
          <div key={wie} className="rounded-md border border-line bg-surface p-3">
            <div className="flex h-20 items-center justify-center rounded border border-dashed border-line bg-bg">
              <div className="w-10 space-y-1">
                {[1, 0.7, 0.85, 0.5].map((w, i) => (
                  <div key={i} className="h-0.5 rounded bg-muted/40" style={{ width: `${w * 100}%` }} />
                ))}
              </div>
            </div>
            <div className="mt-3 text-sm text-ink">{wie}</div>
            <div className="text-xs tabular-nums text-muted">{euro(c, lang)}</div>
            <div className="mt-2">
              <Chip tone={tone}>{l[lang]}</Chip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- 5. Mail ---------- */

const Mail: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [open, setOpen] = useState(true);
  const [verstuurd, setVerstuurd] = useState(false);
  const rijen: [string, T2, ChipTone, T2][] = [
    ['Studio Noord', { nl: 'Kunnen we de launch een week vervroegen?', en: 'Can we move the launch up a week?' }, 'accent', { nl: verstuurd ? 'Beantwoord' : 'Concept klaar', en: verstuurd ? 'Replied' : 'Draft ready' }],
    ['Belastingdienst', { nl: 'Herinnering: aangifte inkomstenbelasting', en: 'Reminder: income tax return' }, 'warn', { nl: 'Belangrijk', en: 'Important' }],
    ['KPN', { nl: 'Je factuur van oktober', en: 'Your October bill' }, 'plain', { nl: 'Rekening · gekoppeld', en: 'Bill · matched' }],
    ['Figma', { nl: 'Nieuw in Figma deze maand', en: 'New in Figma this month' }, 'dim', { nl: 'Kan wachten', en: 'Can wait' }],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="divide-y divide-line rounded-md border border-line bg-surface">
        {rijen.map(([wie, onderwerp, tone, l], i) => (
          <button
            key={wie}
            type="button"
            onClick={() => i === 0 && setOpen(true)}
            className={`flex w-full flex-col gap-1 px-4 py-3 text-left ${i === 0 ? 'hover:bg-white/[0.02]' : 'cursor-default'} ${
              i === 0 && open ? 'bg-white/[0.03]' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink">{wie}</span>
              <Chip tone={tone}>{l[lang]}</Chip>
            </div>
            <span className="truncate text-xs text-muted">{onderwerp[lang]}</span>
          </button>
        ))}
      </div>
      {!open ? (
        <Card className="flex items-center justify-center text-sm text-muted">
          {lang === 'nl' ? 'Klik op Studio Noord voor het concept.' : 'Click Studio Noord for the draft.'}
        </Card>
      ) : (
      <Card>
        <Label>{lang === 'nl' ? 'Concept-antwoord aan Studio Noord' : 'Draft reply to Studio Noord'}</Label>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink">
          {lang === 'nl'
            ? 'Hoi Mila,\n\nDat kan: de video staat vrijdag klaar, dan heb je het weekend nog voor feedback. Ondertitels lever ik maandag.\n\nGroet,\nSierk'
            : 'Hi Mila,\n\nThat works: the video will be ready on Friday, so you still have the weekend for feedback. Subtitles follow on Monday.\n\nBest,\nSierk'}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {verstuurd ? (
            <span className="text-xs text-accent">{lang === 'nl' ? 'Verstuurd, na jouw ja.' : 'Sent, after your yes.'}</span>
          ) : (
            <>
              <Knop primary onClick={() => setVerstuurd(true)}>
                {lang === 'nl' ? 'Versturen' : 'Send'}
              </Knop>
              <Knop onClick={() => setOpen(false)}>{lang === 'nl' ? 'Niet nu' : 'Not now'}</Knop>
            </>
          )}
        </div>
      </Card>
      )}
    </div>
  );
};

/* ---------- 6. Assistent (Telegram) ---------- */

type Bericht = { van: 'ik' | 'bot'; tekst: string; knoppen?: { id: string; label: string }[] };

const Assistent: React.FC<{ lang: Lang }> = ({ lang }) => {
  const nl = lang === 'nl';
  const start: Bericht[] = [
    {
      van: 'bot',
      tekst: nl
        ? 'Goedemorgen. Vandaag: 10:00 call Studio Noord, 14:00 oplevering Bakkerij De Vries. 4 taken open. Gisteren 9 transacties geboekt, 1 vraag voor je.'
        : 'Good morning. Today: 10:00 call with Studio Noord, 14:00 handover for Bakkerij De Vries. 4 open tasks. Yesterday 9 transactions booked, 1 question for you.',
    },
  ];
  const [berichten, setBerichten] = useState<Bericht[]>(start);
  const [gebruikt, setGebruikt] = useState<string[]>([]);
  const lijst = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lijst.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [berichten]);

  const voeg = (b: Bericht[]) => setBerichten((x) => [...x.map((m) => ({ ...m, knoppen: undefined })), ...b]);

  const vragen: { id: string; label: string; antwoord: Bericht[] }[] = [
    {
      id: 'omzet',
      label: nl ? 'Wat heb ik dit kwartaal omgezet?' : 'What did I bill this quarter?',
      antwoord: [
        {
          van: 'bot',
          tekst: nl
            ? 'Q4 tot nu: € 2.150 omzet, € 284 kosten. Openstaand: € 2.290 (Studio Noord en Van Dijk Installatie).'
            : 'Q4 so far: €2,150 revenue, €284 costs. Outstanding: €2,290 (Studio Noord and Van Dijk Installatie).',
        },
      ],
    },
    {
      id: 'bon',
      label: nl ? 'Foto van een bonnetje' : 'Photo of a receipt',
      antwoord: [
        {
          van: 'bot',
          tekst: nl ? 'Bon van € 64,20, Shell, 11 okt. Bij welke uitgave hoort hij?' : 'Receipt for €64.20, Shell, 11 Oct. Which expense does it belong to?',
          knoppen: [
            { id: 'bon-shell', label: nl ? 'Shell · 11 okt · € 64,20' : 'Shell · 11 Oct · €64.20' },
            { id: 'bon-nieuw', label: nl ? 'Nieuwe kostenpost' : 'New expense' },
            { id: 'bon-weg', label: nl ? 'Weg' : 'Discard' },
          ],
        },
      ],
    },
    {
      id: 'taak',
      label: nl ? 'Zet morgen om 10 een taak: offerte Atelier Mos' : 'Task tomorrow at 10: quote for Atelier Mos',
      antwoord: [
        {
          van: 'bot',
          tekst: nl
            ? 'Staat erin: morgen 10:00 ‘Offerte Atelier Mos’. Ook in je agenda, met een herinnering een uur ervoor.'
            : 'Done: tomorrow 10:00 ‘Quote for Atelier Mos’. Also in your calendar, with a reminder an hour before.',
        },
      ],
    },
    {
      id: 'herinner',
      label: nl ? 'Stuur Van Dijk een herinnering' : 'Send Van Dijk a reminder',
      antwoord: [
        {
          van: 'bot',
          tekst: nl
            ? 'Herinnering voor FWP-2026-0041 (€ 840,00) staat klaar, met betaallink. Versturen?'
            : 'Reminder for FWP-2026-0041 (€840.00) is ready, with payment link. Send it?',
          knoppen: [
            { id: 'ja', label: nl ? 'Ja' : 'Yes' },
            { id: 'nee', label: nl ? 'Nee' : 'No' },
          ],
        },
      ],
    },
  ];

  const knopAntwoord: Record<string, string> = {
    'bon-shell': nl ? 'Gekoppeld aan Shell, 11 okt. Bon bewaard bij de kostenpost.' : 'Matched to Shell, 11 Oct. Receipt saved with the expense.',
    'bon-nieuw': nl ? 'Nieuwe kostenpost gemaakt: € 64,20, reiskosten.' : 'New expense created: €64.20, travel.',
    'bon-weg': nl ? 'Weggegooid.' : 'Discarded.',
    ja: nl ? 'Verstuurd vanaf je eigen adres. Ik meld het als er betaald is.' : 'Sent from your own address. I’ll let you know once it’s paid.',
    nee: nl ? 'Niet verstuurd. Hij blijft klaarstaan.' : 'Not sent. It stays ready.',
  };

  const vraag = (v: (typeof vragen)[number]) => {
    setGebruikt((g) => [...g, v.id]);
    voeg([{ van: 'ik', tekst: v.id === 'bon' ? (nl ? '[foto] bon.jpg' : '[photo] receipt.jpg') : v.label }, ...v.antwoord]);
  };
  const klik = (k: { id: string; label: string }) => voeg([{ van: 'ik', tekst: k.label }, { van: 'bot', tekst: knopAntwoord[k.id] }]);

  const open = vragen.filter((v) => !gebruikt.includes(v.id));

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-line bg-[#0e1621]">
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#17212b] px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-[#04110f]">A</div>
        <div>
          <div className="text-sm text-white">{nl ? 'Assistent' : 'Assistant'}</div>
          <div className="text-[11px] text-[#6c7883]">bot</div>
        </div>
      </div>
      <div ref={lijst} className="h-80 space-y-2 overflow-y-auto px-3 py-4">
        {berichten.map((b, i) => (
          <div key={i} className={`flex ${b.van === 'ik' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              <div
                className={`rounded-lg px-3 py-2 text-[13px] leading-snug text-white ${
                  b.van === 'ik' ? 'bg-[#2b5278]' : 'bg-[#182533]'
                }`}
              >
                {b.tekst}
              </div>
              {b.knoppen && (
                <div className="mt-1 grid gap-1">
                  {b.knoppen.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => klik(k)}
                      className="rounded-md bg-[#182533]/80 px-3 py-1.5 text-[12px] text-[#6ab3f3] transition-colors hover:bg-[#1f3044]"
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 bg-[#17212b] p-3">
        {open.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {open.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => vraag(v)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-left text-[12px] text-white/90 transition-colors hover:border-accent hover:text-accent"
              >
                {v.label}
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setBerichten(start);
              setGebruikt([]);
            }}
            className="text-[12px] text-[#6ab3f3]"
          >
            {nl ? 'Opnieuw' : 'Start over'}
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- het venster ---------- */

const BedrijfssysteemDemo: React.FC = () => {
  const { language } = useLanguage();
  const lang = language as Lang;
  const [tab, setTab] = useState<Tab>('overzicht');
  const reduce = useReducedMotion();

  const scherm: Record<Tab, React.ReactNode> = {
    overzicht: <Overzicht lang={lang} />,
    facturen: <Facturen lang={lang} />,
    bank: <Bank lang={lang} />,
    bonnen: <Bonnen lang={lang} />,
    mail: <Mail lang={lang} />,
    assistent: <Assistent lang={lang} />,
  };

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate text-xs text-muted">
          {lang === 'nl' ? 'demo · alle namen en bedragen zijn verzonnen' : 'demo · all names and amounts are made up'}
        </span>
      </div>
      <div className="flex items-center gap-6 border-b border-line px-4 sm:px-6">
        <span className="hidden shrink-0 py-4 text-sm text-ink sm:inline">
          uren<span className="text-accent">.</span>
        </span>
        <nav className="-mb-px flex gap-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }} aria-label="Demo">
          {tabs.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setTab(x.id)}
              className={`shrink-0 border-b py-4 text-sm transition-colors ${
                tab === x.id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {x.label[lang]}
            </button>
          ))}
        </nav>
      </div>
      <div className="min-h-[30rem] p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {scherm[tab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BedrijfssysteemDemo;
