# Eigenständige abschließende Browserprüfung

Ergebnis: bestanden. Geprüfter Abschnittseingang: `470e605bb6a1697afa11b79865d77cd7a2640524`; Arbeitsbereich anfangs sauber. Prüfung am 2026-11-04T01:07:57.990Z. Keine Produktdatei geändert; keine ursprünglichen /tmp-Dateien anderer Lanes verwendet.

## Umgebung und tatsächlicher Ablauf

Die Toolbasis wurde aus /run/workflow-ai/toolbase.json gelesen: Image sha256:e3fd159ed39ad93c28a417af9fb3494352aef69724fd20c93010335831e5efdf, sourceProvenance 20b8d6d7fe8904d59a78708b04f915944634e29a. Tatsächlich verifiziert: Node v24.22.2, npm 11.19.1, Playwright 1.56.1, echter generischer Chromium 141.0.7390.37 (Build 1194). Browser und Abhängigkeiten fehlten und wurden außerhalb versionierter Quellen installiert. Vollständiges ausführbares Installationsrezept: /workflowai-tooling/install.sh; Versions-/Zweckbeschreibung: /workflowai-tooling/requirements.json. Öffentliche npm-/Playwright-Downloads, keine Credentials.

1. App aus /workspace gestartet: `PORT=3327 node server.mjs`.
2. Eigenes Skript /workflowai-tooling/browser/review.cjs ausgeführt: `node /workflowai-tooling/browser/review.cjs`. Playwright startet das echte Chromium-Binary /root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome headless mit frischer Browserseite, ohne Request-Mocks oder Produktinjektionen. Navigation nach http://127.0.0.1:3327/, gewartet auf networkidle.
3. Sichtbaren Text von #count nach jedem Schritt gelesen und exakt mit dem erwarteten Wert verglichen. Buttons über page.click bedient; frische Tasten über page.keyboard.press (keydown/keyup), Großbuchstabe über Shift+i. Für explizite repeat-Prüfung document.dispatchEvent(new KeyboardEvent('keydown', {key, repeat:true, bubbles:true})) für beide Schreibweisen. Zusätzlich zweimal keyboard.down('i') vor keyboard.up('i') für echtes gehaltenes Tastensignal.
4. getComputedStyle am realen #count ausgelesen, echte Browser-HTTP-Antwortheader sowie geladene Stylesheets erfasst. pageerror, console.error und securitypolicyviolation überwacht. Die einzige Instrumentierung vor Navigation war der CSP-Ereignislistener; keine Funktions-/CSS-Änderung.

## Gemessene Schritte

| Aktion | Erwartet | Sichtbarer Wert |
| --- | ---: | ---: |
| Initialwert | 0 | 0 |
| Klick #increase | 1 | 1 |
| Klick #decrease | 0 | 0 |
| Klick #decrease | -1 | -1 |
| Klick #reset | 0 | 0 |
| Frischer Tastendruck i | 1 | 1 |
| Fremdtaste x | 1 | 1 |
| KeyboardEvent i repeat=true | 1 | 1 |
| KeyboardEvent I repeat=true | 1 | 1 |
| Separater frischer Tastendruck i | 2 | 2 |
| Separater frischer Tastendruck I | 3 | 3 |
| i keydown | 4 | 4 |
| Gehaltenes i: wiederholtes keydown | 4 | 4 |
| Neues i nach keyup | 5 | 5 |

Die dynamischen Buttons liegen unter main: increase/Increase, decrease/Decrease, reset/Reset. Alle fünf Beiträge sind im kombinierten Ergebnis wirksam.

## CSS und HTTP-CSP

Berechnete Farbe: `rgb(17, 100, 170)`; berechnetes font-weight: `700`. Wirksames externes Stylesheet: http://127.0.0.1:3327/styles.css; Anzahl inline style-Elemente: 0.

Browserantworten für /, /app.js und /styles.css jeweils HTTP 200 mit exakt diesem Content-Security-Policy-Header:

```text
default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'
```

Kein unsafe-inline. Externe CSS wird unter dieser unveränderten strengen Policy tatsächlich geladen und angewandt. Keine securitypolicyviolation und keine JavaScript-pageerror-Ereignisse. Eine transparente Nebenbeobachtung: Chromium fordert automatisch /favicon.ico an; dafür erscheint ein 404-Konsolenfehler (kein App-Asset und keine Auswirkung auf die geforderten Funktionen). Keine weiteren Konsolenfehler. Der erste automatisierte Durchlauf hatte diesen allgemeinen Ressourcenfehler noch als Fehler gewertet; der abschließende Durchlauf akzeptiert ausschließlich diese anhand ihrer URL identifizierte optionale Favicon-Meldung. Keine Browserantwort wurde verändert oder unterdrückt.

## Tatsächliches Browserprotokoll

```json
{
  "utc": "2026-11-04T01:07:57.990Z",
  "browser": "141.0.7390.37",
  "playwright": "1.56.1",
  "node": "v24.22.2",
  "url": "http://127.0.0.1:3327/",
  "steps": [
    {
      "action": "Initialwert",
      "expected": 0,
      "actual": "0"
    },
    {
      "action": "Klick #increase",
      "expected": 1,
      "actual": "1"
    },
    {
      "action": "Klick #decrease",
      "expected": 0,
      "actual": "0"
    },
    {
      "action": "Klick #decrease",
      "expected": -1,
      "actual": "-1"
    },
    {
      "action": "Klick #reset",
      "expected": 0,
      "actual": "0"
    },
    {
      "action": "Frischer Tastendruck i",
      "expected": 1,
      "actual": "1"
    },
    {
      "action": "Fremdtaste x",
      "expected": 1,
      "actual": "1"
    },
    {
      "action": "KeyboardEvent i repeat=true",
      "expected": 1,
      "actual": "1"
    },
    {
      "action": "KeyboardEvent I repeat=true",
      "expected": 1,
      "actual": "1"
    },
    {
      "action": "Separater frischer Tastendruck i",
      "expected": 2,
      "actual": "2"
    },
    {
      "action": "Separater frischer Tastendruck I",
      "expected": 3,
      "actual": "3"
    },
    {
      "action": "i keydown",
      "expected": 4,
      "actual": "4"
    },
    {
      "action": "Gehaltenes i: wiederholtes keydown",
      "expected": 4,
      "actual": "4"
    },
    {
      "action": "Neues i nach keyup",
      "expected": 5,
      "actual": "5"
    }
  ],
  "css": {
    "color": "rgb(17, 100, 170)",
    "fontWeight": "700"
  },
  "csp": "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'",
  "requests": [
    {
      "url": "http://127.0.0.1:3327/",
      "status": 200,
      "csp": "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'"
    },
    {
      "url": "http://127.0.0.1:3327/styles.css",
      "status": 200,
      "csp": "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'"
    },
    {
      "url": "http://127.0.0.1:3327/app.js",
      "status": 200,
      "csp": "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'"
    }
  ],
  "external": {
    "stylesheets": [
      "http://127.0.0.1:3327/styles.css"
    ],
    "inlineStyles": 0,
    "buttons": [
      {
        "id": "increase",
        "text": "Increase"
      },
      {
        "id": "decrease",
        "text": "Decrease"
      },
      {
        "id": "reset",
        "text": "Reset"
      }
    ],
    "violations": []
  },
  "errors": [
    {
      "text": "Failed to load resource: the server responded with a status of 404 (Not Found)",
      "url": "http://127.0.0.1:3327/favicon.ico"
    }
  ]
}
```
