**🦁 Live ansehen: [https://nosz.github.io/natbarth/](https://nosz.github.io/natbarth/)**

[![Vorschau: Für einen starken Start ins Leben – Nathalie Barth, Buch „Was mache ich, wenn…?“](vorschau_natbarth.jpg)](https://nosz.github.io/natbarth/)

# NATBARTH: Webseite und App für Nathalie Barth

Moderne, motivierende Webseite für Nathalie Barth (Selbstbehauptungs- und Resilienztraining für Kinder, „Mutige Kinderherzen“) mit starkem Fokus auf den Ratgeber **„Was mache ich, wenn…?“** und der Lern-App **WAS MACHE ICH WENN APP**. Alles ist statisch (HTML, CSS, JS), läuft ohne Server-Code und ist als PWA installierbar. Stand: Version 1.0.1, 14.10.2026.

> **Veröffentlichung (Annahme):** Der Zielort ist noch nicht genannt. Angenommen ist `https://nosz.github.io/natbarth/`. Die absoluten Adressen für Link-Vorschau (`og:image`, `canonical`) stehen in `index.html`, `was-mache-ich-wenn-app/app.html` und im JSON-LD. Bei einer anderen Adresse dort `https://nosz.github.io/natbarth/` ersetzen. Alle anderen Verweise sind relativ.

## Inhalt

| Datei / Ordner | Zweck |
|---|---|
| `index.html` | Startseite: Hero, Mission, Buch (mit Themenfinder), Angebote mit E-Mail-Anfrage, App-Teaser, Über mich, FAQ, Kontakt |
| `impressum.html`, `datenschutz.html` | Rechtstexte, übernommen aus `quellen/impressum_text.txt` (Wortlaut unverändert, nur Layout und Silbentrennungs-Artefakte korrigiert) |
| `stil.css`, `seite.js` | gemeinsames Design (hell und dunkel) und Skript (Menü, Themenfinder, Mailtexte, PWA) |
| `manifest.webmanifest`, `sw.js`, `icon-*.png`, `favicon.png`, `apple-touch-icon.png` | PWA der Webseite (Icons liegen bewusst im Hauptordner) |
| `vorschau_natbarth.jpg` | Link-Vorschau 1200 × 630 |
| `bilder/` | aufbereitete Fotos, Cover, Löwe, Logo (aus `quellen/`) |
| `was-mache-ich-wenn-app/` | eigene PWA: `app.html`, `index.html` (leitet auf `app.html` weiter), Manifest, Service Worker, Icons, `vorschau_app.jpg` |
| `quellen/` | Ausgangsmaterial (unverändert) |

Die App ist erreichbar unter `…/was-mache-ich-wenn-app/app.html` (und `…/was-mache-ich-wenn-app/`).

## Gestaltung und Ton

* **Farben** aus `quellen/farben_logo.png` und dem Cover gemessen: Indigo `#393193` (Schrift und Logo), Pink `#e5547b` (Cover, Pullover), Gold `#ffd21f` (Buchtitel), Hintergrund `#edefeb`. Für Text auf Pink kommt ein dunkleres `#c2255c`, damit der Kontrast stimmt.
* **Ton** aus `quellen/buch_info.docx`: Du-Ansprache, warm, direkt, ermutigend, ohne Belehrung („Alle Gefühle sind erlaubt, nur nicht jede Handlung“, „Du kannst es NOCH nicht“).
* Keine externen Schriften, keine Tracker, keine Cookies (DSGVO-freundlich). Persönliche Angaben aus dem Buch (Familiengeschichte) werden bewusst nicht verwendet.
* Bilder: Gesichter von Kindern sind in den Originalen bereits verdeckt und bleiben es. Alt-Texte beschreiben keine Personen.

## Buch bestellen (Anreize)

Amazon-Link in der Navigation, im Hero, in der Buch-Sektion, im Themenfinder, als feste Leiste am unteren Rand auf dem Handy und im Abschluss-Block. Dazu: konkrete Nutzenversprechen, Sätze aus dem Buch, FAQ und ein Themenfinder mit 28 Alltagssituationen und je einem Vorgeschmack („Die vollständige Antwort findest du im Buch“). Es gibt keine erfundenen Bewertungen, Preise oder Verknappungs-Tricks.

## Kursanfragen per E-Mail

Jedes Angebot (Gruppentraining, Einzeltraining, Workshops, Wochenendkurs, Montagskurs, Kita und Schule) ist ein Klick auf eine vorbereitete E-Mail an `nathalie.barth@gmx.net`: Betreff „Anfrage: …“, Anrede, ein Satz wie „Ich habe Interesse am Gruppentraining für Kinder.“, Bitte um Termine, Preise und Anmeldung, dazu Felder für die Angaben. Texte und Anrede („Liebe Nathalie,“) stehen oben in `seite.js` (`ANGEBOTE`, `ANREDE`).

## WAS MACHE ICH WENN APP

Lern-App nach dem Buch, seriös gestaltet: 7 Module (Gefühle, Wut und Traurigkeit, Schüchtern/Angst/Scham, Streit, Alltag, Schule und Veränderungen, Abschlussrunde), je mit Karten, Merksatz, Vertiefung, Kapitelverweis und 4 bis 6 Quizfragen. Dazu Merksatz des Tages, Sterne und Stand, Namens-Personalisierung (nachträglich änderbar), Teilnahmebestätigung pro Modul und Zertifikat nach allen sieben Modulen (PNG-Download und Druck), Hinweis „Hilfe finden“ mit Anlaufstellen, Offline-Betrieb, Update-Hinweis. Der Fortschritt bleibt nur im Browser des Geräts (`localStorage`).

## Tests (14.10.2026)

* Alle internen Verweise (99 in den Quelltexten, 60 per HTTP) ohne Fehler; Anker und Bilder vorhanden.
* UX-Suite U1 bis U10 bei 320, 360, 390 px und Querformat: Startseite, Impressum, Datenschutz und App, jeweils hell und dunkel.
* App: Ansichtsprüfung (Überlauf, Schriftgröße, Kontrast, Tippziele, Ränder) für Start, Modul, Quiz offen und beantwortet, Ergebnis, Bestätigungen, Namensabfrage bei 375 und 320 px; Sternelogik, Persistenz, 48 Urkundenvarianten (inklusive extrem langer Namen und Sonderzeichen), PNG-Export.
* PWA: beide Service Worker, Caches, Manifeste, Icons; Webseite und App laden mit gestopptem Server offline, Fortschritt bleibt erhalten.
* Externe Links geprüft (HTTP 200): Amazon-Buchseite, EU-Streitschlichtung, e-recht24, IONOS. `mutige-kinderherzen.de` ist in der Entwicklungsumgebung gesperrt und wurde nicht geprüft.

## Offene Punkte vor der Veröffentlichung

1. **Inhalte der alten Webseite** konnten nur zusammengefasst übernommen werden (Angebote, Altersgruppen, Hinweis auf Anfrage). Bitte Kursarten, Altersangaben (6 bis 11, 5 bis 7, Klassen 1 bis 4) und Texte gegenprüfen. Preise und Termine stehen bewusst nicht auf der Seite.
2. **Rechtstexte:** Impressum und Datenschutz stammen von der alten Webseite (IONOS, Analyse, Newsletter). Die neue Seite nutzt weder Analyse noch Newsletter; ob der Text und „§ 5 TMG“ (inzwischen DDG) aktuell passen, sollte die Geschäftsführung bzw. Rechtsberatung prüfen.
3. **Hilfe-Nummern** in der App (112, Elterntelefon 0800 111 0 550, Kinder- und Jugendtelefon 116 111, TelefonSeelsorge 0800 111 0 111 und 0800 111 0 222) bitte vor Veröffentlichung kurz gegen die Webseiten der Anbieter prüfen.
4. Inhalte und Formulierungen der App sind aus dem Buch abgeleitet. Nathalie sollte sie gegenlesen und freigeben.
5. Zieladresse (siehe Annahme oben) bestätigen.

## Änderungsprotokoll

- 1.0.1 (14.10.2026): Kursanfragen per vorformulierter E-Mail für alle Angebote.
- 1.0.0 (14.10.2026): Erstfassung (Webseite, Impressum, Datenschutz, PWA, WAS MACHE ICH WENN APP).
