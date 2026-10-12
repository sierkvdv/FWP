// Vult uren_demo met verzonnen data voor de klikbare kloon op fwp.one. Gebruik:
//   DATABASE_URL=...uren_demo node seed.cjs   (vanuit de uren-map, zodat @prisma/client gevonden wordt)
const { createRequire } = require("module");
const req = createRequire(process.cwd() + "/package.json");
const { PrismaClient } = req("@prisma/client");
const db = new PrismaClient();

const d = (s) => new Date(s + "T00:00:00.000Z");
const t = (s, hm = "10:00") => new Date(`${s}T${hm}:00.000+02:00`);
const tok = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

async function main() {
  if (!process.env.DATABASE_URL.includes("uren_demo")) throw new Error("alleen uren_demo");
  for (const m of ["transactie", "bankRekening", "timeEntry", "invoiceLine", "invoice", "expense", "subscription",
    "project", "shareFile", "share", "client", "settings"]) await db[m].deleteMany();

  await db.settings.create({ data: { id: 1, website: "fwp.one", addressLine1: "Voorbeeldstraat 1",
    addressLine2: "1000 AA Amsterdam", kvk: "12345678", iban: "NL00 DEMO 0123 4567 89", nextInvoiceNumber: 45 } });

  const klant = async (name, company, email, color, rate, extra = {}) =>
    db.client.create({ data: { name, company, email, color, hourlyRateCents: rate, showRates: true, portalToken: tok(), ...extra } });
  const vries = await klant("Bakkerij De Vries", "Bakkerij De Vries B.V.", "info@bakkerijdevries.example", "#f2b84b", 9500);
  const noord = await klant("Studio Noord", "Studio Noord", "mila@studionoord.example", "#7c9cff", 11000);
  const dijk = await klant("Van Dijk Installatie", "Van Dijk Installatie", "administratie@vandijk.example", "#ff8a7a", 8500);
  const mos = await klant("Atelier Mos", "Atelier Mos", "hallo@ateliermos.example", "#8fd694", 9500,
    { monthlyFeeCents: 9500, autoInvoice: true });

  const proj = async (c, name) => db.project.create({ data: { clientId: c.id, name } });
  const webshop = await proj(vries, "Webshop");
  const bestel = await proj(vries, "Bestelpagina");
  const campagne = await proj(noord, "Campagnevideo najaar");
  const offerte = await proj(dijk, "Offertetool");
  const onderhoud = await proj(mos, "Onderhoud website");

  // ---- facturen 2026 ----
  const fac = async (nr, c, issue, due, status, lines, extra = {}) => {
    const total = lines.reduce((s, l) => s + l[1], 0);
    return db.invoice.create({ data: {
      number: nr ? `FWP-2026-${nr}` : null, clientId: c.id, status, issueDate: d(issue), dueDate: d(due),
      vatMode: "kor", vatRate: 0, subtotalCents: total, vatCents: 0, totalCents: total, emailTo: c.email,
      sentAt: status !== "concept" ? t(issue, "09:00") : null, paidAt: status === "betaald" ? t(extra.betaald || issue, "11:00") : null,
      payUrl: status !== "concept" ? "https://fwp.one" : null,
      remindedAt: extra.herinnerd ? t(extra.herinnerd, "09:00") : null, autoPeriod: extra.periode || null,
      lines: { create: lines.map(([description, amountCents, minutes, unitCents], i) =>
        ({ description, amountCents, minutes: minutes || null, unitCents: unitCents || null, sortOrder: i })) },
    } });
  };
  await fac("0030", noord, "2026-01-20", "2026-02-03", "betaald", [["Merkfilm, 60 sec", 220000]], { betaald: "2026-01-29" });
  await fac("0031", vries, "2026-02-16", "2026-03-02", "betaald", [["Webshop, fase 1", 142500]], { betaald: "2026-02-25" });
  await fac("0032", dijk, "2026-03-18", "2026-04-01", "betaald", [["Huisstijl en website", 187000]], { betaald: "2026-03-30" });
  await fac("0033", noord, "2026-04-22", "2026-05-06", "betaald", [["Social video's, 6 stuks", 264000]], { betaald: "2026-05-04" });
  await fac("0034", vries, "2026-05-19", "2026-06-02", "betaald", [["Webshop, fase 2", 95000]], { betaald: "2026-05-28" });
  await fac("0035", dijk, "2026-06-23", "2026-07-07", "betaald", [["Onderhoud en hosting, half jaar", 110500]], { betaald: "2026-07-03" });
  await fac("0036", noord, "2026-07-21", "2026-08-04", "betaald", [["Zomercampagne, montage", 198000]], { betaald: "2026-07-31" });
  await fac("0037", vries, "2026-08-18", "2026-09-01", "betaald", [["Productfoto's en webshop-updates", 114000]], { betaald: "2026-08-27" });
  await fac("0038", mos, "2026-08-01", "2026-08-15", "betaald", [["Onderhoud website — augustus", 9500]], { betaald: "2026-08-01", periode: "2026-08" });
  await fac("0039", mos, "2026-09-01", "2026-09-15", "betaald", [["Onderhoud website — september", 9500]], { betaald: "2026-09-01", periode: "2026-09" });
  const f40 = await fac("0040", noord, "2026-09-21", "2026-10-05", "betaald",
    [["Campagnevideo najaar — montage, 13 uur à € 110", 143000, 780, 11000]], { betaald: "2026-09-28" });
  const f41 = await fac("0041", dijk, "2026-09-20", "2026-10-04", "verzonden", [["Offertetool, fase 1", 84000]], { herinnerd: "2026-10-06" });
  const f42 = await fac("0042", vries, "2026-10-02", "2026-10-16", "betaald",
    [["Bestelpagina, 6 uur à € 95", 57000, 360, 9500]], { betaald: "2026-10-09" });
  const f43 = await fac("0043", noord, "2026-10-05", "2026-10-19", "verzonden",
    [["Campagnevideo najaar, 2 versies", 120000], ["Ondertitels NL/EN", 25000]]);
  const f44 = await fac("0044", mos, "2026-10-01", "2026-10-15", "betaald", [["Onderhoud website — oktober", 9500]], { betaald: "2026-10-01", periode: "2026-10" });

  // ---- uren ----
  const uur = (c, p, date, minutes, description, extra = {}) =>
    db.timeEntry.create({ data: { clientId: c.id, projectId: p ? p.id : null, date: d(date), minutes, description, ...extra } });
  for (const [date, m, s] of [["2026-09-14", 240, "Ruwe montage"], ["2026-09-15", 180, "Kleurcorrectie"],
    ["2026-09-17", 210, "Muziek en geluid"], ["2026-09-18", 150, "Feedbackronde verwerken"]])
    await uur(noord, campagne, date, m, s, { invoiced: true, invoiceId: f40.id });
  for (const [date, m, s] of [["2026-09-29", 150, "Bestelformulier bouwen"], ["2026-09-30", 120, "Betaling koppelen (iDEAL)"],
    ["2026-10-01", 90, "Testen en livezetten"]])
    await uur(vries, bestel, date, m, s, { invoiced: true, invoiceId: f42.id });
  await uur(vries, webshop, "2026-10-05", 90, "Nieuwe productcategorie");
  await uur(vries, webshop, "2026-10-07", 75, "Kortingscodes");
  await uur(vries, webshop, "2026-10-09", 45, "Mailtemplate bestelling");
  await uur(noord, campagne, "2026-10-08", 120, "Versie 2: kortere edit");
  await uur(dijk, offerte, "2026-10-06", 90, "Fase 2: pdf-offerte");
  await uur(mos, onderhoud, "2026-10-07", 30, "Updates en back-up", { billable: false });
  await uur(vries, webshop, "2026-10-12", 45, "Productfoto's plaatsen");
  await uur(noord, campagne, "2026-10-12", 30, "Overleg launchdatum");

  // ---- kosten: abonnementen + losse posten ----
  const host = await db.subscription.create({ data: { supplier: "Hostinger", description: "VPS", category: "software", amountCents: 1399, startMonth: "2026-01" } });
  const adobe = await db.subscription.create({ data: { supplier: "Adobe", description: "Creative Cloud", category: "software", amountCents: 7139, startMonth: "2026-01" } });
  const kostAbo = {};
  for (let m = 1; m <= 10; m++) {
    const mm = String(m).padStart(2, "0");
    kostAbo["host" + mm] = await db.expense.create({ data: { date: d(`2026-${mm}-01`), supplier: "Hostinger", description: "VPS", category: "software", amountCents: 1399, subscriptionId: host.id, periodKey: `2026-${mm}` } });
    kostAbo["adobe" + mm] = await db.expense.create({ data: { date: d(`2026-${mm}-05`), supplier: "Adobe", description: "Creative Cloud", category: "software", amountCents: 7139, subscriptionId: adobe.id, periodKey: `2026-${mm}` } });
  }
  const kost = (date, supplier, description, category, amountCents) =>
    db.expense.create({ data: { date: d(date), supplier, description, category, amountCents, receiptUrl: "#" } });
  await kost("2026-03-12", "Coolblue", "Monitor 27 inch", "hardware", 32900);
  await kost("2026-04-08", "LinkedIn", "Advertenties april", "marketing", 5000);
  await kost("2026-05-20", "Thomann", "Microfoon", "hardware", 18900);
  const kHiggs = await kost("2026-09-28", "Higgsfield", "Credits (via PayPal)", "tokens", 2900);
  const kBol = await kost("2026-10-03", "Bol.com", "Notitieboeken en kabels", "kantoor", 3495);
  const kNs = await kost("2026-10-06", "NS", "Treinreis klant", "reizen", 1840);
  const kShell = await kost("2026-10-11", "Shell", "Tanken, rit naar klant", "reizen", 6420);

  // ---- bank ----
  const rabo = await db.bankRekening.create({ data: { id: "rabo:demo", bron: "rabo", naam: "Rabobank zakelijk", valuta: "EUR", saldoCents: 642180, laatsteSyncAt: t("2026-10-12", "12:07") } });
  const wise = await db.bankRekening.create({ data: { id: "wise:demo", bron: "wise", naam: "Wise EUR", valuta: "EUR", saldoCents: 128440, laatsteSyncAt: t("2026-10-12", "12:07") } });
  let n = 0;
  const tx = (rek, date, bedrag, tegenpartij, omschrijving, extra = {}) =>
    db.transactie.create({ data: { rekeningId: rek.id, externId: `demo-${++n}`, datum: d(date), tijd: t(date, "09:30"),
      bedragCents: bedrag, valuta: "EUR", eurCents: bedrag, tegenpartij, omschrijving, status: "klaar", ...extra } });
  await tx(rabo, "2026-09-01", -7139, "Adobe Systems", "Creative Cloud", { categorie: "kosten:software", besluitDoor: "regel", expenseId: kostAbo.adobe09.id });
  await tx(wise, "2026-09-01", -1399, "Hostinger", "VPS", { categorie: "kosten:software", besluitDoor: "regel", expenseId: kostAbo.host09.id });
  await tx(rabo, "2026-09-01", 9500, "Atelier Mos", "FWP-2026-0039", { categorie: "omzet", besluitDoor: "bank" });
  await tx(rabo, "2026-09-12", -4120, "Jumbo", "Boodschappen", { categorie: "prive", besluitDoor: "regel" });
  await tx(rabo, "2026-09-28", 143000, "Studio Noord", "FWP-2026-0040", { categorie: "omzet", besluitDoor: "bank", invoiceId: f40.id });
  await tx(rabo, "2026-09-28", -2900, "PayPal Europe", "Higgsfield", { categorie: "kosten:tokens", besluitDoor: "regel", expenseId: kHiggs.id });
  await tx(rabo, "2026-10-01", 9500, "Atelier Mos", "FWP-2026-0044", { categorie: "omzet", besluitDoor: "bank", invoiceId: f44.id });
  await tx(wise, "2026-10-01", -1399, "Hostinger", "VPS", { categorie: "kosten:software", besluitDoor: "regel", expenseId: kostAbo.host10.id });
  await tx(rabo, "2026-10-03", -3495, "Bol.com", "Bestelling 4021", { categorie: "kosten:kantoor", besluitDoor: "regel", expenseId: kBol.id });
  await tx(rabo, "2026-10-05", -7139, "Adobe Systems", "Creative Cloud", { categorie: "kosten:software", besluitDoor: "regel", expenseId: kostAbo.adobe10.id });
  await tx(rabo, "2026-10-06", -1840, "NS Reizigers", "Treinkaartje", { categorie: "kosten:reizen", besluitDoor: "ai", expenseId: kNs.id });
  await tx(rabo, "2026-10-07", -799, "Kruidvat", "Pinbetaling", { categorie: "prive", besluitDoor: "ai" });
  await tx(wise, "2026-10-08", -50000, "Sierk van der Velde", "Naar Rabobank", { categorie: "intern", besluitDoor: "regel" });
  await tx(rabo, "2026-10-08", 50000, "Sierk van der Velde", "Van Wise", { categorie: "intern", besluitDoor: "regel" });
  await tx(rabo, "2026-10-09", 57000, "Bakkerij De Vries B.V.", "FWP-2026-0042", { categorie: "omzet", besluitDoor: "bank", invoiceId: f42.id });
  await tx(rabo, "2026-10-11", -6420, "Shell", "Tankstation A2", { categorie: "kosten:reizen", besluitDoor: "ai", expenseId: kShell.id });
  await tx(rabo, "2026-10-12", -2350, "Albert Heijn", "Pinbetaling", { status: "gevraagd", gevraagdOp: t("2026-10-12", "10:07") });

  // ---- bestanden ----
  const deel = async (label, files) => db.share.create({ data: { token: tok(), label, expiresAt: d("2026-11-30"),
    files: { create: files.map(([filename, size, mime, downloads]) => ({ filename, size: BigInt(size), mime, downloads })) } } });
  await deel("Studio Noord — campagnevideo v2", [["noord-campagne-v2.mp4", 1874000000, "video/mp4", 3], ["noord-campagne-v2-ondertitels.srt", 4200, "text/plain", 2]]);
  await deel("Bakkerij De Vries — productfoto's", [["brood-01.jpg", 4100000, "image/jpeg", 1], ["brood-02.jpg", 3900000, "image/jpeg", 1], ["taart-01.jpg", 4400000, "image/jpeg", 0]]);

  console.log("klaar:", { klanten: await db.client.count(), facturen: await db.invoice.count(), uren: await db.timeEntry.count(),
    kosten: await db.expense.count(), transacties: await db.transactie.count() });
}
main().finally(() => db.$disconnect());
