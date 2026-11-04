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
