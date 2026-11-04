# Fortlaufende Integration

## T1 – angenommen

Angebotener Kandidat: `d686fbb4-f8c1-4575-8799-90ec38e9a88e`.
Integrationsbasis: `20b8d6d7fe8904d59a78708b04f915944634e29a`.
Der Kandidat lag als gestagter Diff vor: ausschließlich `app.js` sowie
`proof/T1-implementer.json` und `proof/T1-reviewer.json`. Die Nachweise wurden
mit übernommen. Die tatsächliche Produktänderung enthält exakt
`const step = 1; // T1 decrement contract`, den dynamisch an `main` angehängten
Button `#decrease` mit Text `Decrease` und dessen Subtraktion um `step` samt
sichtbarer Aktualisierung. Increase bleibt erhalten. Dieser erste Beitrag
verursachte keinen Textkonflikt. Keine Produktkorrektur war erforderlich.

Eigene Prüfung im isolierten Integrationsbereich am 2026-11-04 um
00:58:21 UTC: Node v24.22.2, npm 11.19.1, Playwright 1.56.1,
echter Chromium 141.0.7390.37 (headless). Eigener Node-HTTPdienst aus
`/workspace/server.mjs` auf Port 3211; Browsernavigation auf
`http://127.0.0.1:3211/`. Mit `/tmp/integration-t1.cjs` tatsächlich Increase,
Decrease, Decrease geklickt: sichtbare Werte exakt `0 → 1 → 0 → -1`.
Buttontext `Decrease` und direkter Elternknoten `main` bestätigt; keine
`pageerror`-Ereignisse. Browser und eigener Dienst danach beendet.
`node --check app.js` und `git diff --cached --check` ebenfalls erfolgreich.

Toolbasis `/run/workflow-ai/toolbase.json` gelesen; sourceProvenance entspricht
der Integrationsbasis. Browsertooling ausschließlich außerhalb versionierter
Quellen unter `/workflowai-tooling/browser` installiert. Ausführbares vollständiges
Installationsrezept: `/workflowai-tooling/install.sh`; Versions-/Zweckbeschreibung:
`/workflowai-tooling/requirements.json`. Der ursprüngliche Lane-Marker und
Lane-Dienst sind hier nicht vorhanden und wurden nicht als Freigabebedingung
verwendet; die Lane-Nachweise dokumentieren deren damalige Prüfung.

Dies dokumentiert ausschließlich die Annahme von T1. T2–T5 sind in diesem
Integrationsschritt noch nicht angeboten. Der echte T1/T2-Textkonflikt,
der kombinierte T3/T4-Browserbefund vor/nach Reparatur sowie die abschließende
Browserprüfung aller fünf Beiträge bleiben für die jeweiligen späteren
Integrationsschritte offen; eine Gesamtfreigabe wird hier nicht behauptet.

## T2 – angenommen; tatsächlicher T1/T2-Textkonflikt gelöst

Angebotener Kandidat: `f77f49d8-a383-4960-94f5-35882809db02`,
Kandidaten-Commit `aa1e0059e24b0767f5b44127326c33c7ffdac450`.
Vorheriger Integrations-HEAD: `9025d4c`. Der bereits gestartete Git-Merge
hatte tatsächlich `UU app.js` und zwei Konfliktblöcke erzeugt. `git diff --cc`
und `git ls-files -u` wurden vor der Reparatur gelesen. Die drei Indexstufen
von app.js waren Basis `309db473f2180c1ce093e85c32421b6b57545758`,
T1 `c5f29561f442c759913ab35d93ff6b10069a0b28` und
T2 `af201f01f4fa5465dd04c18448e84f629d0e6196`.

Der erste echte Konflikt lautete:

```text
| <<<<<<< HEAD
const step = 1; // T1 decrement contract
| =======
const step = 1; // T2 reset contract
| >>>>>>> aa1e0059e24b0767f5b44127326c33c7ffdac450
```

Auflösung: eine gemeinsame Deklaration
`const step = 1; // T1 decrement contract; T2 reset contract`.
Der zweite Konflikt betraf die an derselben Stelle angehängten Buttonblöcke:
T1 Decrease gegen T2 Reset. Beide vollständigen Handler und beide
`main.append`-Aufrufe wurden nacheinander erhalten. Keine zusätzliche
Funktion entwickelt. Beide T2-JSON-Nachweise unverändert übernommen und
insbesondere den dokumentierten einmaligen `sleep 45` nach der erfolgreichen
Lane-Prüfung gelesen (00:52:26.546392321 bis 00:53:11.547401124 UTC).
Die Warteanforderung der Lane wurde bei der Integration nicht wiederholt.

Eigene reale Browserprüfung am 2026-11-04 um 00:59:40 UTC mit
`node /tmp/integration-t2.cjs`: Playwright 1.56.1, Chromium 141.0.7390.37,
eigener HTTPdienst auf Port 3211. Tatsächlich geklickt:
Increase, Decrease, Decrease, Reset, Increase, Increase, Reset, Reset.
Sichtbare Werte exakt `0 → 1 → 0 → -1 → 0 → 1 → 2 → 0 → 0`;
beide Buttons direkte Kinder von main mit korrekten Texten; keine
JavaScript-Seitenfehler. Browser und Dienst danach beendet.
`node --check app.js` und abschließendes `git diff --cached --check` erfolgreich.
Toolbasis und Node/npm-Versionen erneut geprüft; vorhandenes externes
Browsertooling wiederverwendet. Ein erster Versuch, das Reparaturskript mit
Python auszuführen, scheiterte an fehlendem Python; die Reparatur wurde
anschließend mit vorhandenem Node ausgeführt und danach erfolgreich geprüft.
T3–T5 bleiben in diesem Schritt noch offen.

## T3 – angenommen; Inline-Design wirksam

Angebotener Kandidat: `37e298eb-51bb-4ff9-9f4a-f552aca40e06`.
Vorheriger Integrations-HEAD: `fbbed6d`. Gestagter Kandidat enthält ausschließlich
eine zusätzliche Inline-style-Zeile in `index.html` sowie die beiden
T3-JSON-Nachweise. Ohne Textkonflikt übernommen, keine Produktkorrektur nötig.
`app.js` mit Increase, Decrease und Reset sowie `server.mjs` bleiben unverändert.
Die übernommenen Lane-Nachweise einschließlich Browserwerten wurden gelesen.

Eigene tatsächliche Prüfung des kombinierten T1–T3-Standes am
2026-11-04 um 01:00:36 UTC: `node /tmp/integration-t3.cjs`, eigener
HTTPdienst auf Port 3211, Playwright 1.56.1 und Chromium 141.0.7390.37.
Berechnete CSS-Werte für #count exakt Farbe `rgb(17, 100, 170)` und
Schriftgewicht `700`. Klickfolge Increase, Decrease, Decrease, Reset,
Increase, Increase, Reset, Reset ergab sichtbar
`0 → 1 → 0 → -1 → 0 → 1 → 2 → 0 → 0`. Beide dynamischen Buttons bleiben
direkte Kinder von main; keine JavaScript-Seitenfehler. Browser und eigener
Dienst anschließend beendet. `git diff --cached --check` erfolgreich.
Toolbase-Provenienz erneut gelesen, Node v24.22.2 und npm 11.19.1 bestätigt;
extern installiertes Browsertooling wiederverwendet.

T4 ist noch nicht angeboten: server.mjs enthält weiterhin nur content-type
und keine CSP. Das Inline-style-Element bleibt für die spätere unveränderte
T3/T4-Kombinationsprüfung erhalten. Eine vorgezogene externe CSS-Reparatur
wurde daher nicht vorgenommen. T4/T5 und die Gesamtprüfung bleiben offen.

## T4 – angenommen; realer T3/T4-Inhaltskonflikt geprüft und repariert

Kandidat: `2d394f44-3ab8-43d8-bbfb-83fc58247a00`.
Vorheriger Integrations-HEAD: `3a71abb`. Der gestagte Beitrag änderte
produktseitig ausschließlich server.mjs (CSP-Header), dazu die beiden
T4-JSON-Nachweise. Nachweise gelesen und unverändert übernommen.
`git status --short` zeigte keine unaufgelösten Dateien. T3 index.html und
T4 server.mjs waren ohne gegenseitigen Git-Textkonflikt gemeinsam vorhanden.

Vor jeder Produktreparatur wurde exakt dieser kombinierte Stand mit erhaltenem
T3-Inline-style-Element und unverändertem T4-Header tatsächlich im Browser
geprüft: `node /tmp/integration-t4.cjs before`, 2026-11-04T01:01:31.762Z.
Eigener frisch gestarteter HTTPdienst auf Port 3211, echter Chromium
141.0.7390.37 über Playwright 1.56.1. Berechnete Farbe `rgb(0, 0, 0)`,
Schriftgewicht `400`. Tatsächliche vollständige Browser-Konsolenmeldung:

```text
Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-7veE/PmB2GSmdAfTd8XWFZr3ENeB7aiaImq8KXZPOoM='), or a nonce ('nonce-...') is required to enable inline execution.
```

Ort: http://127.0.0.1:3211/, nullbasierte Zeile 2, Spalte 0.
Zusätzlich gemessenes securitypolicyviolation-Ereignis:
`effectiveDirective=style-src-elem`, `blockedURI=inline`, originalPolicy
identisch mit dem geforderten Header. Keine JavaScript-Seitenfehler.
Increase, Decrease, Decrease, Reset ergaben bereits vor Reparatur
`0 → 1 → 0 → -1 → 0`; der Fehler betraf die Darstellung.

Erforderliche Integrationsreparatur: unveränderten #count-Regelinhalt nach
`styles.css` verschoben, style-Element durch
`<link rel="stylesheet" href="/styles.css">` ersetzt und in server.mjs die
Route `/styles.css` mit MIME-Typ `text/css` ergänzt. app.js unverändert.
Keine CSP-Ausnahme, kein unsafe-inline, kein Hash oder Nonce ergänzt.

Erneute reale Browserprüfung: `node /tmp/integration-t4.cjs after`,
2026-11-04T01:01:43.483Z, neuer eigener Dienst auf Port 3211 und neue
Chromium-Sitzung. Berechnete Farbe nun `rgb(17, 100, 170)`, Gewicht `700`.
Browser hat /styles.css tatsächlich mit HTTP 200 geladen. Keine
Konsolenmeldungen, keine CSP-Verletzungen, keine JavaScript-Seitenfehler.
Dieselbe Klickfolge lieferte unverändert `0 → 1 → 0 → -1 → 0`.
Browser und eigene Dienste jeweils beendet.

HTTP vor Reparatur: / und /app.js jeweils 200 mit exakt geforderter CSP.
HTTP nach Reparatur: /, /app.js und /styles.css jeweils 200 mit exakt:

```text
default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'
```

/styles.css hatte `content-type: text/css; charset=utf-8`.
`node --check server.mjs`, `node --check app.js` und abschließendes
`git diff --cached --check` erfolgreich. Toolbase-Provenienz erneut gelesen
(Basis 20b8d6d7fe8904d59a78708b04f915944634e29a), Node v24.22.2 und npm
11.19.1 bestätigt. Vorhandenes externes Browsertooling samt ausführbarem
Rezept unter /workflowai-tooling wiederverwendet; keine Installation in
versionierten Quellen. Rohmessungen dieses Laufs außerdem unter
/tmp/integration-t4-before.json und /tmp/integration-t4-after.json;
wesentliche tatsächliche Ergebnisse dauerhaft hier dokumentiert.
Ein erster Node-Aufruf zum Anhängen dieses Berichts scheiterte an der
String-Syntax; der Bericht wurde anschließend per literalem Heredoc ergänzt.

T1–T4 sind gemeinsam funktionsfähig. T5 noch nicht angeboten; die
abschließende Fünferprüfung und der eigenständige Browserbericht folgen
in späteren Workflow-Schritten.

## T5 – angenommen; eigener kombinierter Browsernachweis aller fünf Beiträge

Kandidat `95dd6b91-5cd1-47f4-bf3a-c008482e4b05`, Kandidaten-Commit
`eddc57ccf75c2ebd44e9c9c8dc99a95bc39d0cdc`, vorheriger Integrations-HEAD
`d65cb5f`. Der begonnene Merge meldete tatsächlich `UU app.js`: die
bestehenden Decrease-/Reset-Blöcke standen im Konflikt mit dem am gleichen
Dateiende angehängten T5-keydown-Handler. Beide Seiten vollständig nacheinander
erhalten; die bereits aufgelöste gemeinsame step-Zeile bleibt unverändert.
T5 ruft für i/I ohne repeat den bestehenden Increase-Button-Klick auf.
Beide T5-JSON-Nachweise gelesen und unverändert übernommen. Keine weiteren
Produktänderungen; externe CSS und strenge CSP aus T4 erhalten.

Eigene tatsächliche Prüfung des vollständigen T1–T5-Produktstands am
2026-11-04T01:04:29.974Z: `node /tmp/integration-t5.cjs after`.
Frischer eigener Node-HTTPdienst auf Port 3211, Navigation im echten generischen
Chromium 141.0.7390.37 über Playwright 1.56.1 (headless, kein DOM-Mock).
Tatsächliche Klick-/Tastaturfolge:

| Aktion | Sichtbarer Zähler |
| --- | --- |
| Initial | 0 |
| Increase-Klick | 1 |
| Decrease-Klick | 0 |
| Decrease-Klick | -1 |
| Reset-Klick | 0 |
| Taste I | 1 |
| Taste i | 2 |
| Erstes keydown i | 3 |
| Zweites keydown bei gehaltener Taste i (repeat) | 3 |
| Explizites keydown I mit repeat=true im Browser | 3 |
| Andere Taste x | 3 |
| Taste I | 4 |

Für die letzte Taste wurde zusätzlich ein Browser-Listener am Increase-Button
angebracht: exakt ein Click-Ereignis gemessen, Delegation bestätigt.
Berechnete CSS-Farbe `rgb(17, 100, 170)`, Schriftgewicht `700`.
/styles.css wurde tatsächlich vom Browser mit 200 geladen. Keine
Konsolenmeldungen, keine JavaScript-Seitenfehler, keine
securitypolicyviolation-Ereignisse. HTTP /, /app.js und /styles.css jeweils 200
mit unverändert exakt folgendem Header:

```text
default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'
```

/styles.css liefert `text/css; charset=utf-8`. Browser und eigener Dienst nach
der Prüfung beendet. Toolbase-Provenienz erneut gelesen und Node v24.22.2 /
npm 11.19.1 bestätigt; vorhandenes externes Browsertooling wiederverwendet.
`node --check app.js` und `git diff --cached --check` erfolgreich.
Alle fünf angebotenen fachlichen Beiträge sind damit seriell integriert und
in Kombination tatsächlich selbst geprüft. Der separate Workflow-Browserprüfer
schreibt seinen eigenen Bericht erst im nachfolgenden Baustein; dieser Schritt
erzeugt ausschließlich den Integrationsnachweis und die T5-Annahme.
