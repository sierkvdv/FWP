"""Zet de opgeslagen pagina's (raw/) om naar een statische, klikbare kloon in <uitmap>.
Scripts eruit, links naar elkaar, formulieren via demo.js, koppel-instructies van de bank weg.
Gebruik: python bouw.py <uitmap>"""
import json, os, re, shutil, sys
from bs4 import BeautifulSoup

HIER = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HIER, "raw")
UIT = sys.argv[1]
routes = json.load(open(os.path.join(RAW, "routes.json"), encoding="utf-8"))
routes["/"] = "index.html"
# Alleen de administratie: Projecten (Ableton-sync) en Bestanden horen niet in deze demo.
WEG = ("/admin/projecten", "/admin/bestanden")
for w in WEG:
    routes.pop(w, None)

if os.path.isdir(UIT):
    shutil.rmtree(UIT)
os.makedirs(os.path.join(UIT, "assets"))
for f in os.listdir(os.path.join(HIER, "assets")):
    shutil.copy(os.path.join(HIER, "assets", f), os.path.join(UIT, "assets", f))
css = open(os.path.join(UIT, "assets", "app.css"), encoding="utf-8").read()
css = css.replace("/_next/static/media/", "")
open(os.path.join(UIT, "assets", "app.css"), "w", encoding="utf-8").write(css)
shutil.copy(os.path.join(HIER, "demo.js"), os.path.join(UIT, "assets", "demo.js"))

BADGE = ('<div style="position:fixed;left:12px;bottom:76px;z-index:90;font-size:10px;letter-spacing:.2em;'
         'text-transform:uppercase;color:#7a7a86;background:#0a0a0c;border:1px solid #1c1c22;padding:4px 8px;'
         'border-radius:4px;pointer-events:none">Demo · verzonnen data</div>')


def doel(href):
    if not href.startswith("/"):
        return None
    pad, _, query = href.split("#")[0].partition("?")
    if pad in routes and not query:
        return routes[pad]
    if pad in routes and query and "jaar=" not in query:
        return routes[pad]
    return ""  # interne link die niet in de demo zit


for pad, naam in routes.items():
    if pad == "/":
        continue
    soup = BeautifulSoup(open(os.path.join(RAW, naam + ".raw"), encoding="utf-8").read(), "html.parser")
    for tag in soup.find_all(["script", "noscript", "nextjs-portal", "next-route-announcer"]):
        tag.decompose()
    for link in soup.find_all("link"):
        rel = " ".join(link.get("rel") or [])
        if "stylesheet" in rel:
            link["href"] = "assets/app.css"
            for a in ("data-precedence",):
                link.attrs.pop(a, None)
        else:
            link.decompose()
    head = soup.head
    head.append(soup.new_tag("meta", attrs={"name": "robots", "content": "noindex"}))
    for a in soup.find_all("a", href=True):
        if a["href"].split("?")[0] in WEG:
            (a.parent if a.parent.name == "li" else a).decompose()
            continue
        d = doel(a["href"])
        if d is None:
            a["target"] = "_blank"
            a["rel"] = "noopener"
        elif d:
            a["href"] = d
        else:
            a["href"] = "#"
            a["data-demo-uit"] = "1"
    for form in soup.find_all("form"):
        for attr in ("action", "method", "enctype", "encType"):
            form.attrs.pop(attr, None)
        for inp in form.find_all("input", attrs={"type": "hidden"}):
            if (inp.get("name") or "").startswith("$ACTION"):
                inp.decompose()
    for btn in soup.find_all("button"):
        btn.attrs.pop("formaction", None)
        btn.attrs.pop("formAction", None)
    if naam == "geld.html":  # koppel-instructies (alleen nodig bij het inrichten) weg
        for p in soup.find_all(string=re.compile(r"koppelen \(eenmalig", re.I)):
            kaart = p.find_parent(class_=re.compile(r"\bcard\b"))
            if kaart:
                kaart.decompose()
    soup.body.append(BeautifulSoup(BADGE, "html.parser"))
    s = soup.new_tag("script", src="assets/demo.js")
    soup.body.append(s)
    html = "<!doctype html>\n" + str(soup)
    for a, b in (("http://localhost:3004", "https://administratie.voorbeeld.nl"),
                 ("http://localhost:3005", "https://administratie.voorbeeld.nl"), ("uren.sierk.dev", "administratie.voorbeeld.nl"),
                 ("http%3A%2F%2Flocalhost%3A3004", "https%3A%2F%2Fadministratie.voorbeeld.nl"),
                 ("http%3A%2F%2Flocalhost%3A3005", "https%3A%2F%2Fadministratie.voorbeeld.nl")):
        html = html.replace(a, b)
    html = html.replace("repeat(7, minmax(0, 1fr))", "repeat(5, minmax(0, 1fr))")
    html = html.replace("Mollie is niet ingesteld, dus incasso kan nog niet.", "Geen lopende incasso voor deze klant.")
    open(os.path.join(UIT, naam), "w", encoding="utf-8").write(html)

print(len(routes) - 1, "pagina's ->", UIT)
