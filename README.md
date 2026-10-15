**🦁 Live ansehen: [https://www.mutige-kinderherzen.de/](https://www.mutige-kinderherzen.de/)**

[![Vorschau: Für einen starken Start ins Leben – Nathalie Barth, Buch „Was mache ich, wenn…?“](vorschau_natbarth.jpg)](https://www.mutige-kinderherzen.de/)

# NATBARTH: Webseite und App für Nathalie Barth

Moderne, motivierende Webseite für Nathalie Barth (Selbstbehauptungs- und Resilienztraining für Kinder, „Mutige Kinderherzen“) mit Kursen und Terminen direkt unter dem Einstieg, starkem Fokus auf den Ratgeber **„Was mache ich, wenn…?“** und der Lern-App **WAS MACHE ICH WENN APP**. Alles ist statisch (HTML, CSS, JS), läuft ohne Server-Code und ist als PWA installierbar. Stand: Version 1.0.38, 15.10.2026.

> **Veröffentlichung:** Die Seite ersetzt die alte Webseite unter `https://www.mutige-kinderherzen.de/` (Hosting bei IONOS, Frankfurt; per DNS, IP-Zuordnung, MX und SPF geprüft). Die absoluten Adressen für Link-Vorschau (`og:image`, `canonical`, JSON-LD) in `index.html` und `was-mache-ich-wenn-app/app.html` zeigen auf diese Domain. Eine Testadresse bei GitHub Pages dient **nur zum Testen** und darf nirgends in der Seite stehen; maßgeblich ist immer `https://www.mutige-kinderherzen.de/` (Link-Vorschau-Bilder erscheinen in Messengern erst dort). Alle anderen Verweise sind relativ. Dateinamen der alten Seite (`index.html`, `impressum.html`) bleiben gleich, die alten Anker (`#article04-1a` Kurse, `#list01-3` Fragen, `#form02-s` Anfrage) führen weiter an die passenden Stellen.

## Inhalt

| Datei / Ordner | Zweck |
|---|---|
| `index.html` | Startseite: Hero, **Kurse und Termine**, Mission, Buch, Angebote, App-Teaser, Über mich, FAQ, WhatsApp-Kanal, Kontakt |
| `impressum.html`, `datenschutz.html` | Rechtstexte, übernommen aus `quellen/impressum_text.txt` (Wortlaut unverändert, nur Layout und Silbentrennungs-Artefakte korrigiert) |
| `stil.css`, `seite.js` | gemeinsames Design (hell und dunkel) und Skript (Menü, Mailtexte, PWA) |
| `manifest.webmanifest`, `sw.js`, `icon-*.png`, `favicon.png`, `apple-touch-icon.png` | PWA der Webseite (Icons liegen bewusst im Hauptordner) |
| `vorschau_natbarth.jpg` | Link-Vorschau 1200 × 630 |
| `bilder/` | aufbereitete Fotos, Cover, Logo (aus `quellen/`) |
| `was-mache-ich-wenn-app/` | eigene PWA: `app.html`, `index.html` (leitet auf `app.html` weiter), Manifest, Service Worker, Icons, `vorschau_app.jpg` |
| `quellen/` | Ausgangsmaterial (unverändert) |

Die App ist erreichbar unter `…/was-mache-ich-wenn-app/app.html` (und `…/was-mache-ich-wenn-app/`). **Alle Dateien samt Unterordnern und Icons in die Wurzel des Webspace hochladen** (ohne `quellen/`, falls nicht gewünscht).

## Gestaltung und Ton

* **Farben** aus `quellen/farben_logo.png` und dem Cover gemessen: Indigo `#393193` (Schrift und Logo), Pink `#e5547b` (Cover, Pullover), Gold `#ffd21f` (Buchtitel), Hintergrund `#edefeb`. Für Text auf Pink kommt ein dunkleres `#c2255c`, damit der Kontrast stimmt.
* **Ton** aus `quellen/buch_info.docx` und der alten Webseite: Du-Ansprache, Ich-Form für Nathalie, warm, direkt, ermutigend („Alle Gefühle sind erlaubt, nur nicht jede Handlung“, „Du kannst es NOCH nicht“). Die App ist neutral und seriös formuliert.
* Keine externen Schriften, keine Tracker, keine Cookies. Persönliche Angaben aus dem Buch (Familiengeschichte) werden bewusst nicht verwendet.
* Bilder: Gesichter von Kindern sind in den Originalen bereits verdeckt und bleiben es.

## Kurse und Termine

Direkt unter dem Hero (Abschnitt `#kurse`), Quelle: `quellen/info_webseite_quelltext.txt` (Quelltext der alten Seite):

* **Offener Wochenendkurs** für Kinder von 6 bis 11 Jahren: Sa. 24.10. und So. 25.10.2026, jeweils 11 bis 13 Uhr, € 69,– inklusive Elterninfo, ab 4 teilnehmenden Kindern, FSV Harburg, Vinzenzweg 20, 21077 Hamburg.
* **Fortlaufender Kurs**, jederzeit einsteigen: montags 16 bis 17 Uhr, € 49,– pro Monat ab September 2026, kleine Gruppe, aktuell noch 3 freie Plätze.
* **Kitas** (5 bis 7 Jahre, max. 12 Kinder, z. B. 4 × 60 Minuten) und **Grundschulen** (Klasse 1 bis 4, z. B. 3 × 90 Minuten in einer Klasse).
* „So meldest du dein Kind an“ in 3 Schritten, sechs Fragen zur Anmeldung, „Das lernen Kinder“, „Für Eltern“, „Für Schulen und Kitas“, Konzept „Stark auch ohne Muckis“, Aus- und Weiterbildungen, Kontaktdaten und Instagram.
* **Anfrage-Dialog:** Jeder Kurs und jedes Angebot hat einen Button, der ein Fenster öffnet: Der Besucher trägt Angaben ein, die Nachricht (mit Datum und Ort, Bitte um Teilnahmebedingungen und Zahlungsmodalitäten) baut sich live auf und lässt sich anpassen. Gesendet wird per E-Mail-Programm, WhatsApp (0160 3148838), durch Kopieren des Textes oder per Anruf. Es werden keine Daten an Dritte übermittelt; ohne Dialog-Unterstützung des Browsers bleibt der normale E-Mail-Link. Adresse, Anrede, WhatsApp-Nummer und Texte stehen oben in `seite.js` (`MAIL`, `ANREDE`, `WHATSAPP`, `ANGEBOTE`). Die einzige E-Mail-Adresse auf der Seite (Kontakt, Anfragen, Impressum, Datenschutz) ist `nathalie.barth@mutige-kinderherzen.de`.
* Ist der Termin des Wochenendkurses vorbei (`data-kurs-datum` und `data-kurs-ende` in `index.html`), wechselt die Karte automatisch auf „Termin ist vorbei“ und „Nächsten Termin anfragen“.
* **Pflege:** Termine, Preise und freie Plätze stehen direkt im HTML (`#kurse`). Nach jeder Änderung die Version in `sw.js` erhöhen, damit Besucher den Update-Hinweis bekommen.
* **Elternstimmen** („Das sagen Eltern“, 3 Rückmeldungen mit Vorname und Initial wie auf der alten Webseite) und der persönliche Abschluss „Ich freue mich, dich und dein Kind kennenzulernen“ mit Anfrage-Button. An den Zitaten geändert: Tippfehler und Leerzeichen korrigiert („Selbsbewusstsein“, „Nathalie's“), „Löwen/innen“ zu „Löwen und Löwinnen“, und der Vorname des Kindes („Mila“) entfernt (Datenschutz für das Kind), dafür „Sie“.
* Bewusst nicht übernommen: unbelegte Statistik zu Mobbing („Die Fakten“) und die „7 Tipps“.

## Buch bestellen

Amazon-Link in der Navigation, im Hero, in der Buch-Sektion, und im Abschluss-Block. Dazu: konkrete Nutzenversprechen, Sätze aus dem Buch und FAQ. Es gibt keine erfundenen Bewertungen, Preise oder Verknappungs-Tricks.

## WAS MACHE ICH WENN APP

Lern-App nach dem Buch, seriös gestaltet: 7 Module (Gefühle, Wut und Traurigkeit, Schüchtern/Angst/Scham, Streit, Alltag, Schule und Veränderungen, Abschlussrunde), je mit Karten, Merksatz, Vertiefung, Kapitelverweis und 4 bis 6 Quizfragen. Dazu Merksatz des Tages, Sterne und Stand, Namens-Personalisierung (nachträglich änderbar), Teilnahmebestätigung pro Modul und Zertifikat nach allen sieben Modulen (PNG-Download und Druck), Hinweis „Hilfe finden“ mit Anlaufstellen, Offline-Betrieb, Update-Hinweis. Der Fortschritt bleibt nur im Browser des Geräts (`localStorage`).

## Link-Regeln (Pflicht, geprüft)

* **Fenster:** Alle Amazon-Links öffnen in einem neuen Tab mit dem festen Namen `amazon-buch`, alle Links zur App in einem Tab mit dem Namen `wmiw-app`. Ein erneuter Klick lädt dasselbe Fenster neu, statt jedes Mal ein weiteres zu öffnen. Dafür darf an diesen Links **kein** `rel="noopener"` oder `noreferrer` stehen (beides verhindert die Wiederverwendung). Alle anderen Links öffnen im gleichen Tab.
* **Ziele:** Amazon `https://www.amazon.de/Was-mache-ich-wenn-Situationen/dp/B0FKZ4T17T` (Titel der Zielseite geprüft), WhatsApp-Kanal, Instagram, `wa.me/491603148838`; eine Mail-Adresse und die Telefonnummern aus `quellen/link_vorgaben.json`.
* **Prüfung vor jeder Lieferung:** `links_pruefen_projekt.ps1` (Skill-Ordner `assets`) mit `quellen/link_vorgaben.json` und `-EigeneBasis https://www.mutige-kinderherzen.de/`, Ergebnis in `quellen/linktest_NATBARTH.md`; dazu der Browser-Test `testsuite_klickziele.js` (trifft ein Klick wirklich den jeweiligen Link, mehrere Breiten).
## Tests (15.10.2026, Version 1.0.38)

* UX-Suite U1 bis U10 (320, 360, 390 px, Querformat) für Startseite, Impressum, Datenschutz und App, jeweils hell und dunkel: alle bestanden.
* App-Ansichten (Überlauf, Schriftgröße, Kontrast, Tippziele, Ränder) für Start, Modul, Quiz, Ergebnis, Bestätigungen und Namensabfrage, hell und dunkel; alle 7 Module durchgespielt (Sterne, Persistenz, schlechtere Folgerunde ändert den besten Stand nicht), 40 Urkundenvarianten mit langen Namen und Sonderzeichen.
* Anfrage-Dialog: alle 8 Anfrage-Buttons, Live-Nachricht, Links für E-Mail-Programm, WhatsApp und Anruf, Kopieren (mit echtem Klick geprüft), Schließen per Button und Hintergrund, Fokus zurück; Layout bei 320, 375, 420 und 800 px, hell und dunkel.
* 73 interne Verweise per HTTP, alle Anker und Bilder vorhanden; alle Amazon-, WhatsApp-, Instagram- und Mail-Links geprüft; 7 Anfrage-Mails mit vollständigem Text; kein Link öffnet einen neuen Tab.
* Externe Ziele (HTTP 200): Amazon-Buchseite, WhatsApp-Kanal, wa.me, Instagram, EU-Streitschlichtung, e-recht24, IONOS.
* PWA: beide Service Worker, Caches, Manifeste, Icons; Webseite und App laden mit gestopptem Server offline, Name und Fortschritt bleiben erhalten.

## Offene Punkte vor der Veröffentlichung

1. **Termine und freie Plätze** („noch 3 freie Plätze“, Termin 24./25.10.2026) stammen aus dem Quelltext vom 15.10.2026. Bitte vor dem Upload mit Nathalie abgleichen.
2. **E-Mail-Adresse:** Auf Wunsch steht überall `nathalie.barth@mutige-kinderherzen.de`, auch im Impressum und in der Datenschutzerklärung (vorher dort die GMX-Adresse). Die Rechtstexte wurden dafür an dieser Stelle gegenüber der alten Seite geändert; bitte mit dem Rest der Rechtsprüfung (Punkt 3) abstimmen und sicherstellen, dass das Postfach erreichbar ist.
3. **Rechtstexte:** Impressum und Datenschutz stammen von der alten Webseite (IONOS, Analyse, Newsletter). Die neue Seite nutzt weder Analyse noch Newsletter; ob der Text und „§ 5 TMG“ (inzwischen DDG) aktuell passen, sollte die Geschäftsführung bzw. Rechtsberatung prüfen.
4. **Hilfe-Nummern** in der App (112, Elterntelefon 0800 111 0 550, Kinder- und Jugendtelefon 116 111, TelefonSeelsorge 0800 111 0 111 und 0800 111 0 222) bitte kurz gegen die Webseiten der Anbieter prüfen.
5. **Elternstimmen:** Bitte bestätigen, dass Jennifer D., Jeni W. und Yvonne J. der Veröffentlichung auch auf der neuen Seite zugestimmt haben bzw. zustimmen, und dass die kleinen Korrekturen an den Zitaten (siehe oben) in Ordnung sind.
6. Inhalte der App sind aus dem Buch abgeleitet. Nathalie sollte sie gegenlesen und freigeben.
7. **Weiterleitung beim Hoster (IONOS):** Am 15.10.2026 lieferten `http://` und die Adresse ohne `www` direkt die Seite aus, ohne Weiterleitung. Für den Browser sind das verschiedene Ursprünge (eigener Speicher, eigener Service Worker, eigene Installation). In der Domain-Verwaltung bitte dauerhafte Weiterleitungen (301) einrichten: `http` → `https` und `mutige-kinderherzen.de` → `www.mutige-kinderherzen.de`. Bis dahin leitet ein Skript am Anfang jeder Seite um. Prüfen mit `assets/live_pruefen.ps1` bzw. Abruf der vier Adressen.


## Änderungsprotokoll

- 1.0.38 (15.10.2026): Fehler behoben (Webseite 1.0.36, App 1.1.4): Knöpfe mit dem Attribut hidden (Installieren, So geht's) blieben sichtbar, weil die Knopf-Formatierung das Verstecken überschrieb. Jetzt gilt [hidden] immer. Dadurch zeigt die Installieren-Karte nur noch die passenden Knöpfe. Der reine Menühinweis der App (Android ohne Installationsangebot, nach Abbrechen) blendet sich nach 15 Sekunden selbst aus.
- 1.0.37 (15.10.2026): App 1.1.2 (Karte „Starte hier“ steht direkt unter dem Begrüßungsblock, noch vor der Namensabfrage): Orientierung vereinfacht: Auf der Startseite steht gleich oben eine Karte „Starte hier“ bzw. „Dein nächster Schritt“ mit einem großen Knopf; jedes Modul, die Namensabfrage, das Quiz und das Ergebnis zeigen eine Ablaufleiste „1 Lesen · 2 Quiz · 3 Bestätigung“ mit dem aktuellen Schritt; das Ergebnis führt mit dem ersten Knopf zum nächsten Schritt („Nächstes Modul“, bei Nichtbestehen „Quiz wiederholen“, bei allen geschafft „Zertifikat ansehen“).
- 1.0.36 (15.10.2026): App 1.1.0: Benutzerführung überarbeitet: Zurück-Leiste als Knopf mit Pfeil und Standort („Modul 3 von 7“) in Modul, Quiz, Namensabfrage und Bestätigungen. „Meine Bestätigungen“ ist jetzt eine Liste, die Bestätigung selbst öffnet auf einer eigenen Ansicht, ganz oben und ohne Scrollen (mit „Alle Bestätigungen“ zurück und Knöpfen zu den weiteren Bestätigungen). Ein Klick auf ein offenes Modul startet den Kurs (Hinweis „Starten →“), Fortschrittsbalken und „Weiterlernen“ oben, Zertifikat zeigt „Noch N Module offen“; im Modul unten „Vorheriges Modul“ und „Nächstes Modul“.
- 1.0.35 (15.10.2026): Webseite und App (App 1.0.9): Absicherung der Adresse: Aufrufe über http oder ohne www werden auf https://www.mutige-kinderherzen.de umgeleitet (Skript am Anfang jeder Seite; die richtige Lösung ist eine Weiterleitung beim Hoster, siehe Offene Punkte). Diagnose-Ansicht: Adresse mit ?diag=1 öffnen, zeigt Ursprung, Service Worker, Manifest, Icons und ob der Browser die Installation anbietet.
- 1.0.34 (15.10.2026): Abschlussbereich "Starke Kinder brauchen starke Begleiter" (rosa Kasten mit Buch-Knopf und Zur App) entfernt, auf Wunsch. Buch und App sind weiterhin im Kopf, im Buch-Bereich, im App-Bereich und im Fuß verlinkt.
- 1.0.33 (15.10.2026): Das Vorschaubild der App im Bereich App ist jetzt ein Link: Klick öffnet die App (gleiches benanntes Fenster wie der Knopf App öffnen).
- 1.0.32 (15.10.2026): Fußbereich überarbeitet: statt des dunklen Bands eine helle Karte im Stil der Kopfleiste mit Löwe, Name und Knöpfen, darunter eine ruhige Zeile mit Copyright, Impressum und Datenschutz.
- 1.0.31 (15.10.2026): Fußbereich der Webseite, des Impressums und des Datenschutzes neu gestaltet: dunkles Band mit Löwe, Name, Knöpfen (App, WhatsApp-Kanal, Instagram) und Impressum/Datenschutz darunter.
- 1.0.30 (15.10.2026): App 1.0.8: Fußbereich der App neu gestaltet: Buch-Karte mit Löwe, Kurztext und goldenem Knopf Buch bei Amazon ansehen; Webseite, Impressum und Datenschutz als Knöpfe; Version dezent daneben.
- 1.0.29 (15.10.2026): Installieren überarbeitet (Webseite und App 1.0.7): auf dem iPhone Knopf So geht's mit Schritt-für-Schritt-Anleitung, nach Abbrechen ein Hinweis auf das Browser-Menü, auf Android ohne Installationsangebot nach 4 Sekunden ein Menühinweis. Manifeste mit eindeutiger App-ID (/index.html und /was-mache-ich-wenn-app/app.html), entspricht der bisherigen Identität und verhindert Verwechslungen.
- 1.0.28 (15.10.2026): App 1.0.6: Klick auf „Name ändern“ / „Name eintragen“ scrollt das Namensfeld automatisch in den sichtbaren Bereich und setzt den Cursor hinein.
- 1.0.27 (15.10.2026): Neu: Teilen-Symbol in der Kopfzeile (Webseite und App; Teilen-Menü des Geräts, sonst Fenster mit WhatsApp, E-Mail, Link kopieren; geteilt wird immer die Adresse der Produktiv-Domain; neue Datei `teilen.js`). Klick auf Logo/Name oben links bringt auf der Startseite sanft nach oben. App 1.0.5: „Name ändern“ / „Name eintragen“ ist ein Button unter den drei Kacheln, „Lieber anonym bleiben“ ist ein Button. Kopfzeile auf schmalen Handys angepasst; auf Impressum und Datenschutz entfällt unter 560 px der Knopf „Zur Startseite“ (das Logo führt dorthin).
- 1.0.26 (15.10.2026): Amazon- und App-Links merken das Zielfenster zusätzlich im Skript (`fenster.js`, in der App inline); der zweite Klick nutzt dasselbe Fenster, auch wenn die Zielseite den Fensternamen zurücksetzt.
- 1.0.25 (15.10.2026): Feste untere Leiste auf dem Handy („Kurse und Termine“, „Buch bestellen“) entfernt; App-Links in Impressum und Datenschutz mit benanntem Fenster; in der App stehen wieder die Adressen der Produktiv-Domain.
- 1.0.23 und 1.0.24 (15.10.2026): Amazon- und App-Links öffnen in benannten Tabs (`amazon-buch`, `wmiw-app`), die bei jedem Klick wiederverwendet werden.
- 1.0.22 (15.10.2026): Anfrage-Dialog: Buttons „In Gmail öffnen“ und „In Outlook (Web) öffnen“ entfernt.
- 1.0.21 (15.10.2026): **Fehler behoben:** Ein unsichtbarer Klickbereich des Buttons „Jetzt anfragen“ lag über dem oberen Seitenbereich und fing die Klicks auf die Hero-Buttons ab (Amazon und App). Klickbereich der Karten jetzt nur noch bei den Angebots-Karten. Neuer Pflichttest „Klickziele“ (jeder Link, mehrere Breiten). Hero-Texte gekürzt. Keine `#`-Platzhalter-Links mehr.
- 1.0.20 (15.10.2026): Texte im Anfrage-Dialog und bei den Elternstimmen auf Ich-Form angeglichen; README bereinigt.
- 1.0.19 (15.10.2026): Produktiv-Adresse `https://www.mutige-kinderherzen.de/` in allen Vorschau-Tags; alte Ankernamen der bisherigen Seite bleiben gültig.
- 1.0.17 und 1.0.18 (15.10.2026): Anfrage-Dialog: Angaben eintragen, Nachricht live sehen, senden per E-Mail-Programm, WhatsApp (0160 3148838), Text kopieren oder anrufen; ohne Datenübermittlung an Dritte.
- 1.0.16 (15.10.2026): „Das sagen Eltern“ (3 Rückmeldungen), persönlicher Abschluss mit Anfrage-Button, „Über mich“ mit Nathalies Worten (Vision, „Heldenkraft“) statt der Buchtexte.
- 1.0.15 (15.10.2026): E-Mail-Adresse überall `nathalie.barth@mutige-kinderherzen.de` (auch Impressum und Datenschutz).
- 1.0.14 (15.10.2026): Hero: Erklärtext in den gelben Amazon-Button integriert; „App ausprobieren“ mit Hinweis „Die App zum Buch“.
- 1.0.13 (15.10.2026): Texte auf durchgängige Ich-Form gebracht, „Hilfegeber“ zu „Ratgeber“ (wie auf dem Cover).
- 1.0.12 (15.10.2026): Hinweis-Buttons „Noch 9 Tage bis zum Kurs“ und „Noch 3 freie Plätze“ entfernt; grauen Streifen hinter den Kurs-Etiketten behoben.
- 1.0.11 (15.10.2026): Abstände zwischen den Abschnitten verringert.
- 1.0.10 (15.10.2026): Hinweiszeile unter den Kurs-Fragen entfernt.
- 1.0.9 (15.10.2026): Zittern beim Darüberfahren über die Kurs-Karten behoben (Klickbereich der Buttons).
- 1.0.6 bis 1.0.8 (15.10.2026): Kurse mit Terminen aus der alten Webseite direkt unter dem Hero (statt des Drei-Karten-Blocks), Anmelde-Schritten und FAQ; Satz-Karten aus dem Buch neu gestaltet; Instagram, Ausbildungen und Kontakt ergänzt; Mailtexte je Kurs; Termin-Teaser im Hero wieder entfernt.
- 1.0.5 (15.10.2026): Abschnitt „WhatsApp-Kanal“ mit Beitritts-Aufruf (auch im Footer).
- 1.0.2 bis 1.0.4 (15.10.2026): Themenfinder „Wobei brauchst du gerade Hilfe?“, Kursinfos-Button und Link zur alten Webseite entfernt.
- 1.0.1 (14.10.2026): Kursanfragen per vorformulierter E-Mail.
- 1.0.0 (14.10.2026): Erstfassung (Webseite, Impressum, Datenschutz, PWA, WAS MACHE ICH WENN APP).
