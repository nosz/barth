/* Nathalie Barth · Mutige Kinderherzen — gemeinsames Skript (Navigation, Mailtexte, PWA) */
"use strict";
const AMAZON = "https://www.amazon.de/Was-mache-ich-wenn-Situationen/dp/B0FKZ4T17T";
const $ = (s, r = document) => r.querySelector(s);

/* Menue (mobil) */
(() => {
  const b = $(".burger"), m = $("#menu"); if (!b || !m) return;
  const zu = () => { m.classList.remove("open"); b.setAttribute("aria-expanded", "false"); };
  b.addEventListener("click", () => { const o = m.classList.toggle("open"); b.setAttribute("aria-expanded", String(o)); });
  m.addEventListener("click", e => { if (e.target.closest("a")) zu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") zu(); });
})();

/* Kursanfragen: vorformulierte E-Mail pro Angebot */
const MAIL = "nathalie.barth@mutige-kinderherzen.de", ANREDE = "Liebe Nathalie,";
const BITTE_INFO = "Bitte schicke mir Informationen zu Terminen, Preisen und zur Anmeldung.";
const BITTE_KURS = "Bitte schicke mir die Teilnahmebedingungen inklusive Zahlungsmodalitäten.";
const ANGEBOTE = {
  gruppe:     { betreff: "Anfrage: Gruppentraining für Kinder", interesse: "Ich habe Interesse am Gruppentraining für Kinder.", bitte: BITTE_INFO, felder: ["Name", "Vorname und Alter des Kindes", "Wohnort", "Telefon (optional)"] },
  einzel:     { betreff: "Anfrage: Einzeltraining für Kinder", interesse: "Ich habe Interesse am Einzeltraining für mein Kind.", bitte: BITTE_INFO, felder: ["Name", "Vorname und Alter des Kindes", "Worum geht es aktuell?", "Telefon (optional)"] },
  workshop:   { betreff: "Anfrage: Workshop für Eltern und Pädagogen", interesse: "Ich habe Interesse an einem Workshop für Eltern und Pädagogen.", bitte: BITTE_INFO, felder: ["Name", "Einrichtung oder Gruppe (optional)", "Ungefähre Teilnehmerzahl", "Wunschzeitraum", "Telefon (optional)"] },
  wochenende: { betreff: "Anmeldung: Offener Wochenendkurs am 24. und 25.10.2026", interesse: "Ich habe Interesse am offenen Wochenendkurs für Kinder von 6 bis 11 Jahren am 24. und 25.10.2026 (jeweils 11 bis 13 Uhr, FSV Harburg) und möchte mein Kind anmelden.", bitte: BITTE_KURS, felder: ["Name", "Vorname und Alter des Kindes", "Telefon (optional)"] },
  montag:     { betreff: "Anfrage: Fortlaufender Kurs montags 16 bis 17 Uhr", interesse: "Ich habe Interesse am fortlaufenden Kurs montags von 16 bis 17 Uhr und möchte fragen, ob noch ein Platz frei ist.", bitte: BITTE_KURS, felder: ["Name", "Vorname und Alter des Kindes", "Gewünschter Einstieg", "Telefon (optional)"] },
  wochenende_neu: { betreff: "Anfrage: Nächster offener Wochenendkurs", interesse: "Ich habe Interesse am nächsten offenen Wochenendkurs für Kinder von 6 bis 11 Jahren und möchte nach dem nächsten Termin fragen.", bitte: BITTE_KURS, felder: ["Name", "Vorname und Alter des Kindes", "Telefon (optional)"] },
  kita:       { betreff: "Anfrage: Training für unsere Kita", interesse: "Ich habe Interesse an einem Training für Vorschulkinder (5 bis 7 Jahre) in unserer Kita.", bitte: BITTE_INFO, felder: ["Name und Funktion", "Kita und Ort", "Anzahl der Kinder", "Wunschzeitraum", "Telefon (optional)"] },
  schule:     { betreff: "Anfrage: Training für unsere Grundschule", interesse: "Ich habe Interesse an einem Training für Kinder der 1. bis 4. Klasse an unserer Grundschule.", bitte: BITTE_INFO, felder: ["Name und Funktion", "Schule und Ort", "Klasse(n) und Anzahl der Kinder", "Wunschzeitraum", "Telefon (optional)"] }
};function mailLink(a){
  const t = ANGEBOTE[a]; if (!t) return "mailto:" + MAIL;
  const text = [ANREDE, "", t.interesse, "", t.bitte, "", "Meine Angaben:", ...t.felder.map(f => f + ": "), "", "Vielen Dank und liebe Grüße"].join("\r\n");
  return "mailto:" + MAIL + "?subject=" + encodeURIComponent(t.betreff) + "&body=" + encodeURIComponent(text);
}
document.querySelectorAll("a[data-angebot]").forEach(a => { a.href = mailLink(a.dataset.angebot); });
/* Kurse: Ist der Termin vorbei, wechselt die Karte auf „Nächsten Termin anfragen“ */
(() => {
  const heute = new Date(); heute.setHours(0, 0, 0, 0);
  const tage = iso => Math.round((new Date(iso + "T00:00:00") - heute) / 86400000);
  document.querySelectorAll(".course[data-kurs-datum]").forEach(card => {
    if (tage(card.dataset.kursEnde || card.dataset.kursDatum) >= 0) return;
    const btn = card.querySelector("a[data-angebot]"), titel = card.querySelector(".badge");
    card.classList.add("gone"); if (titel) titel.textContent = "Termin ist vorbei";
    if (btn) { btn.dataset.angebot = "wochenende_neu"; btn.href = mailLink("wochenende_neu"); btn.textContent = "Nächsten Termin anfragen"; }
  });
})();
/* PWA: Service Worker, Update-Hinweis, Installation */
(() => {
  const upd = $("#upd"), upBtn = $("#upd-btn");
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(reg => {
        const zeig = w => { if (!upd || !w) return; upd.classList.add("show"); upBtn.onclick = () => w.postMessage("SKIP_WAITING"); };
        if (reg.waiting && navigator.serviceWorker.controller) zeig(reg.waiting);
        reg.addEventListener("updatefound", () => { const n = reg.installing; if (n) n.addEventListener("statechange", () => { if (n.state === "installed" && navigator.serviceWorker.controller) zeig(n); }); });
      }).catch(() => {});
      let neu = false; navigator.serviceWorker.addEventListener("controllerchange", () => { if (neu) return; neu = true; location.reload(); });
    });
  }
  const card = $("#install"), btn = $("#install-btn"), ios = $("#install-ios"); if (!card) return;
  let ev = null;
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); ev = e; if (!standalone) { card.classList.add("show"); btn.hidden = false; ios.hidden = true; } });
  if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent)) { card.classList.add("show"); btn.hidden = true; ios.hidden = false; }
  btn.addEventListener("click", async () => { if (!ev) return; ev.prompt(); await ev.userChoice.catch(() => {}); ev = null; card.classList.remove("show"); });
  window.addEventListener("appinstalled", () => card.classList.remove("show"));
})();
