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
