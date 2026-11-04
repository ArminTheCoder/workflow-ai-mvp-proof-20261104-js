# S2-Funktion – kurze unabhängige Prüfung

Ergebnis: bestanden. Vor Arbeitsbeginn mit `git rev-parse HEAD` erfasst:
`6d06d0a4b9bd9ee70ddcee4f20396601d4fd8718`, exakt der gemeinsame
Abschnittseingang. `git status --short` war leer. Keine Produktänderung;
ausschließlich dieser Bericht wird geschrieben, ohne Abhängigkeit von S2-CSP.

Tatsächlich vollständig gelesen mit
`cat app.js index.html styles.css server.mjs package.json proof/integration.md proof/final-browser-review.md`.
Außerdem `/run/workflow-ai/toolbase.json` gelesen (sourceProvenance
`20b8d6d7fe8904d59a78708b04f915944634e29a`). `node --version` ergab
v24.22.2, `git --version` 2.39.5. Keine Installation, kein neuer Browserlauf.

## Eigene jetzige Quellen- und Funktionsprüfung

Echte weitere Prüfkommandos: `node --check app.js`, `node --check server.mjs`
(beide Exit 0) und `node --input-type=module <<'NODE' … NODE` als einmaliger
Inline-Test mit Node-Bordmitteln `node:assert/strict`, `node:fs`, `node:vm`.
Dieser führte die unveränderte app.js in einem kleinen DOM-Ersatz mit
querySelector/createElement/addEventListener/append/click aus. Das ist ein
Handler-Test, kein Browser-/Layoutnachweis. Seine konkreten Assertions:

- Initial 0, Increase, Decrease, Decrease, Reset, frisches I ergeben exakt
  `0 → 1 → 0 → -1 → 0 → 1`; jeder Schritt liest output.textContent.
- x sowie i/I mit repeat=true lassen 1 unverändert. Anschließendes frisches
  i und I erzeugen genau zwei Aufrufe des vorhandenen Increase-click und Wert 3.
  Reset setzt danach wieder auf 0. Beide dynamischen Buttons haben die Texte
  Decrease/Reset und werden direkt an main angehängt.
- Gelesene HTML enthält den externen Link /styles.css und kein style-Element
  oder style-Attribut. CSS enthält #count mit rgb(17,100,170) und Gewicht 700.
  Serverquelle enthält /styles.css als text/css sowie exakt
  `default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'`,
  ohne unsafe-inline.

Der Inline-Test endete mit Exit 0 und Ausgabe:
`PASS: visible sequence 0 → 1 → 0 → -1 → 0 → 1; i/I delegation, foreign/repeat filter, buttons, Reset, external CSS and strict CSP source assertions`.
„visible sequence“ bezeichnet hier nur den textContent im DOM-Ersatz.
Quellenbefund: alle fünf Beiträge T1–T5 sind vorhanden, Increase bleibt erhalten;
die gemeinsame step-Zeile bewahrt beide T1/T2-Vertragskommentare. Die
Darstellung unter realer CSP wird durch die folgenden früheren Messungen belegt.

## Zuordnung der tatsächlich dokumentierten Browsernachweise

`proof/integration.md`, T2, dokumentiert den echten T1/T2-Textkonflikt und
Erhalt beider Handler. T4 dokumentiert die zuerst tatsächlich blockierte
Inline-CSS (schwarz/400, CSP-Verletzung) und danach die Reparatur durch externe
CSS samt Route bei unverändert strenger CSP (blau/700, HTTP 200).
Der dortige T5-Lauf vom 2026-11-04T01:04:29.974Z mit Chromium 141.0.7390.37
über Playwright 1.56.1 belegt insbesondere die sichtbare Folge
`0 → 1 → 0 → -1 → 0 → 1` mit abschließender Taste **I**. Ergänzend belegt er
kleines i, gehaltenes i, explizites I-repeat, Fremdtaste x und exakt einen
Increase-Click bei einem frischen I.

`proof/final-browser-review.md` ist die separate erfolgreiche finale
Chromium-Prüfung vom 2026-11-04T01:07:57.990Z am damaligen Eingang
`470e605bb6a1697afa11b79865d77cd7a2640524`. Sie dokumentiert dieselbe
Zahlenfolge mit abschließendem **i**, zusätzlich frisches I, beide expliziten
repeat-Schreibweisen, reales gehaltenes i, erneutes i nach keyup und x.
Berechnete Farbe rgb(17, 100, 170), Gewicht 700, tatsächlich geladenes externes
Stylesheet, null Inline-style-Elemente und die exakte strenge HTTP-CSP auf
/, /app.js und /styles.css sind dort gemessen. Keine pageerror- oder
CSP-Verletzungsereignisse. Einzig dokumentierter Konsolenfehler ist der
optionale automatische /favicon.ico-Aufruf mit 404; der erste Durchlauf
wertete ihn als Fehler, der erfolgreiche Schlusslauf akzeptierte ausschließlich
diese URL-identifizierte Nebenmeldung. Das ist kein verschwiegener Appfehler.

Diese Browserwerte sind gelesene frühere Messungen aus den genannten Quellen,
keine von mir erneut erhobenen Browserwerte. Zusammen mit dem eigenen
Quellen-/Handler-Test erfüllt der vollständig übernommene erste Abschnitt
den geforderten Stand; kein Mangel festgestellt.
