# S2-CSP: unabhängige kurze Prüfung

Ergebnis: bestanden. Vor Beginn mit `git rev-parse HEAD` erfasster vollständiger Ausgangscommit: `6d06d0a4b9bd9ee70ddcee4f20396601d4fd8718` (identisch mit dem zugewiesenen gemeinsamen Abschnittseingang). `git status --short` war leer. Ausschließlich dieser Bericht wurde neu geschrieben; keine Produktkorrektur und keine Abhängigkeit von S2-Funktion.

Tatsächlich vollständig gelesen mit `cat server.mjs index.html styles.css app.js package.json proof/integration.md proof/final-browser-review.md`: alle sieben genannten Dateien. Zusätzlich `/run/workflow-ai/toolbase.json` gelesen: sourceProvenance `20b8d6d7fe8904d59a78708b04f915944634e29a`; `node --version` ergab v24.22.2, `git --version` 2.39.5. Keine Installation erforderlich.

Eigene schlanke Prüfkommandos und Ergebnisse:

- `node --check server.mjs` und `node --check app.js`: Exit 0.
- `node --input-type=module <<'NODE' … NODE`: tatsächlich ausgeführter einmaliger Node-Test mit `node:assert/strict`, `readFileSync`, `spawn` und `fetch`. Quellenassertionen bestätigten den externen Link `/styles.css`, kein style-Element/Inline-style-Attribut, die #count-Regel mit rgb(17,100,170) und Gewicht 700 sowie Increase, dynamisches Decrease mit Subtraktion, dynamisches Reset mit Nullsetzung und i/I-Handler mit repeat-Sperre und Delegation an Increase.
- Dasselbe Node-Kommando startete einen eigenen `node server.mjs` mit `PORT=3439`, fragte `/`, `/app.js`, `/styles.css` ab und verglich jeweils Status 200, vollständigen Dateikörper, MIME-Typ samt `charset=utf-8` und exakten CSP-Header per Gleichheitsassertion. Alle drei erfolgreich; `/styles.css` liefert `text/css; charset=utf-8`. Der eigene Dienst wurde im finally-Block beendet. Dies war ein HTTP-/Quellentest, kein Browserlauf.
- `git diff 470e605bb6a1697afa11b79865d77cd7a2640524 HEAD -- app.js index.html server.mjs styles.css`: leer. Die Produktdateien entsprechen weiterhin dem im separaten Browserbericht tatsächlich geprüften Stand.

Die exakt bestätigte Policy lautet:

```text
default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'
```

`index.html` bindet `<link rel="stylesheet" href="/styles.css">` ein; `server.mjs` enthält die entsprechende CSS-Route. Keine unsafe-inline-Ausnahme, kein Nonce oder Hash. Alle fünf Beiträge sind in den Quellen vorhanden: T1 Decrease, T2 Reset, T3 blau/fett, T4 strenge CSP, T5 Tastatur.

Die tatsächlich gelesene Integrationsdokumentation weist den echten T1/T2-Textkonflikt mit `UU app.js`, Indexstufen und widersprechenden step-Zeilen nach. Die gemeinsame step-Zeile sowie beide vollständigen Buttonhandler sind im jetzigen app.js erhalten. T3 und T4 wurden ohne gegenseitigen Git-Textkonflikt kombiniert; der dokumentierte echte Chromium-Lauf vor Reparatur meldete blockiertes InlineCSS (`style-src-elem`, `blockedURI=inline`) und berechnete Schwarz/400. Nach Verschieben der Regel nach styles.css, externer Verknüpfung und ergänzter Route wurden Blau/700 und CSS-HTTP-200 gemessen; die CSP blieb unverändert streng.

Der eigenständige Bericht `proof/final-browser-review.md` dokumentiert einen echten Chromium-141.0.7390.37-Lauf am 2026-11-04T01:07:57.990Z: sichtbare Folge 0 → Increase 1 → Decrease 0 → Decrease -1 → Reset 0 → i 1 sowie weitere erfolgreiche I-, repeat- und Fremdtastenprüfungen. Dokumentierte berechnete Farbe: `rgb(17, 100, 170)`, Gewicht `700`; externes Stylesheet wirksam, null Inline-style-Elemente. `/`, `/app.js`, `/styles.css` jeweils HTTP 200 mit obiger exakter CSP; keine CSP-Verstöße und keine JavaScript-pageerror-Ereignisse. Die einzige Konsolenfehlermeldung betrifft den optionalen automatischen `/favicon.ico`-Abruf mit 404, keine CSP-Verletzung oder JavaScript-Ausnahme und kein Fehler eines geforderten App-Assets.

Diese Browserwerte sind frühere tatsächliche Messungen aus den gelesenen Nachweisen. Meine jetzige unabhängige Prüfung umfasst Dokumente, Quellen, Syntax und reale HTTP-Antworten; ich habe keinen neuen Browsernachweis erzeugt. Der vollständig integrierte und korrigierte erste Abschnitt erfüllt den geforderten Stand.
