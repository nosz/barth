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
const MAIL = "nathalie.barth@mutige-kinderherzen.de", ANREDE = "Liebe Nathalie,", WHATSAPP = "491603148838";
const BITTE_INFO = "Bitte schicke mir Informationen zu Terminen, Preisen und zur Anmeldung.";
const BITTE_KURS = "Bitte schicke mir die Teilnahmebedingungen inklusive Zahlungsmodalitäten.";
const ANGEBOTE = {
  gruppe:     { betreff: "Anfrage: Gruppentraining für Kinder", interesse: "Ich habe Interesse am Gruppentraining für Kinder.", bitte: BITTE_INFO, felder: ["Name", "Vorname und Alter des Kindes", "Wohnort", "Telefon (optional)"] },
  einzel:     { betreff: "Anfrage: Einzeltraining für Kinder", interesse: "Ich habe Interesse am Einzeltraining für mein Kind.", bitte: BITTE_INFO, felder: ["Name", "Vorname und Alter des Kindes", "Worum geht es aktuell?", "Telefon (optional)"] },
  workshop:   { betreff: "Anfrage: Workshop für Eltern und Pädagogen", interesse: "Ich habe Interesse an einem Workshop für Eltern und Pädagogen.", bitte: BITTE_INFO, felder: ["Name", "Einrichtung oder Gruppe (optional)", "Ungefähre Teilnehmerzahl", "Wunschzeitraum", "Telefon (optional)"] },
  wochenende: { betreff: "Anmeldung: Offener Wochenendkurs am 24. und 25.10.2026", interesse: "Ich habe Interesse am offenen Wochenendkurs für Kinder von 6 bis 11 Jahren am 24. und 25.10.2026 (jeweils 11 bis 13 Uhr, FSV Harburg) und möchte mein Kind anmelden.", bitte: BITTE_KURS, felder: ["Name", "Vorname und Alter des Kindes", "Telefon (optional)"] },
  montag:     { betreff: "Anfrage: Fortlaufender Kurs montags 16 bis 17 Uhr", interesse: "Ich habe Interesse am fortlaufenden Kurs montags von 16 bis 17 Uhr und möchte fragen, ob noch ein Platz frei ist.", bitte: BITTE_KURS, felder: ["Name", "Vorname und Alter des Kindes", "Gewünschter Einstieg", "Telefon (optional)"] },
  kurs_allgemein: { betreff: "Anfrage: Kurse für mein Kind", interesse: "Ich habe Interesse an einem Kurs für mein Kind und möchte mich über die aktuellen Termine informieren.", bitte: BITTE_INFO, felder: ["Name", "Vorname und Alter des Kindes", "Wohnort", "Telefon (optional)"] },  wochenende_neu: { betreff: "Anfrage: Nächster offener Wochenendkurs", interesse: "Ich habe Interesse am nächsten offenen Wochenendkurs für Kinder von 6 bis 11 Jahren und möchte nach dem nächsten Termin fragen.", bitte: BITTE_KURS, felder: ["Name", "Vorname und Alter des Kindes", "Telefon (optional)"] },
  kita:       { betreff: "Anfrage: Training für unsere Kita", interesse: "Ich habe Interesse an einem Training für Vorschulkinder (5 bis 7 Jahre) in unserer Kita.", bitte: BITTE_INFO, felder: ["Name und Funktion", "Kita und Ort", "Anzahl der Kinder", "Wunschzeitraum", "Telefon (optional)"] },
  schule:     { betreff: "Anfrage: Training für unsere Grundschule", interesse: "Ich habe Interesse an einem Training für Kinder der 1. bis 4. Klasse an unserer Grundschule.", bitte: BITTE_INFO, felder: ["Name und Funktion", "Schule und Ort", "Klasse(n) und Anzahl der Kinder", "Wunschzeitraum", "Telefon (optional)"] }
};const TITEL = { gruppe: "Gruppentraining für Kinder", einzel: "Einzeltraining für Kinder", workshop: "Workshop für Eltern und Pädagogen", wochenende: "Offener Wochenendkurs", wochenende_neu: "Nächster offener Wochenendkurs", montag: "Fortlaufender Kurs am Montag", kita: "Training für Kitas", schule: "Training für Grundschulen", kurs_allgemein: "Kurse für dein Kind" };
function nachricht(a, werte) {
  const t = ANGEBOTE[a]; if (!t) return { betreff: "Anfrage", text: "" };
  const w = werte || [];
  const zeilen = [ANREDE, "", t.interesse, "", t.bitte, "", "Meine Angaben:", ...t.felder.map((f, i) => f + ": " + (w[i] || "")), "", "Vielen Dank und liebe Grüße"];
  if (w[0]) zeilen.push(w[0]);
  return { betreff: t.betreff, text: zeilen.join("\n") };
}
const crlf = s => s.replace(/\r?\n/g, "\r\n");
function mailLink(a, werte, textOverride) {
  const n = nachricht(a, werte), text = textOverride != null ? textOverride : n.text;
  return "mailto:" + MAIL + "?subject=" + encodeURIComponent(n.betreff) + "&body=" + encodeURIComponent(crlf(text));
}
document.querySelectorAll("a[data-angebot]").forEach(a => { a.href = mailLink(a.dataset.angebot); });

/* Anfrage-Dialog: Angaben eintragen, Nachricht live sehen, dann auf dem passenden Weg senden */
(() => {
  const dlg = $("#anfrage"); if (!dlg || typeof dlg.showModal !== "function") return;   // ohne Dialog-Unterstützung bleibt der normale E-Mail-Link
  let aktuell = "", ausloeser = null, textGeaendert = false;
  const feld = $("#anf-felder"), box = $("#anf-text"), status = $("#anf-status");
  $("#anf-addr").textContent = MAIL;
  const werte = () => [...feld.querySelectorAll("input")].map(i => i.value.trim());
  const zeigeStatus = (txt, gut) => { status.textContent = txt; status.classList.toggle("ok", !!gut); };
  const links = () => {
    const n = nachricht(aktuell, werte()), text = box.value;
    $("#anf-mail").href = mailLink(aktuell, null, text);
    $("#anf-wa").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text);
  };
  const aktualisiere = () => { if (!textGeaendert) box.value = nachricht(aktuell, werte()).text; links(); };
  const oeffne = (a, quelle) => {
    if (!ANGEBOTE[a]) return; aktuell = a; ausloeser = quelle; textGeaendert = false; zeigeStatus("");
    $("#anf-t").textContent = "Anfrage: " + (TITEL[a] || "Kurs");
    $("#anf-intro").textContent = "Trage deine Angaben ein (alles ist freiwillig). Unten siehst du die fertige Nachricht und wählst, wie du sie sendest.";
    feld.replaceChildren();
    ANGEBOTE[a].felder.forEach((f, i) => {
      const wrap = document.createElement("div"), lab = document.createElement("label"), inp = document.createElement("input");
      const id = "anf-f" + i; lab.setAttribute("for", id); lab.textContent = f; inp.id = id; inp.type = /^Telefon/.test(f) ? "tel" : "text";
      inp.autocomplete = /^Name/.test(f) ? "name" : /^Telefon/.test(f) ? "tel" : "off"; inp.maxLength = 80; inp.addEventListener("input", aktualisiere);
      wrap.append(lab, inp); feld.append(wrap);
    });
    box.value = nachricht(a, []).text; links(); dlg.showModal();
    const first = feld.querySelector("input"); if (first) first.focus();
  };
  document.querySelectorAll("a[data-angebot]").forEach(el => el.addEventListener("click", ev => { ev.preventDefault(); oeffne(el.dataset.angebot, el); }));
  box.addEventListener("input", () => { textGeaendert = true; links(); });
  $("#anf-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", ev => { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { if (ausloeser && ausloeser.focus) ausloeser.focus(); });
  $("#anf-mail").addEventListener("click", () => zeigeStatus("Dein E-Mail-Programm sollte sich jetzt öffnen. Öffnet sich nichts, nutze „Text und Adresse kopieren“ oder schreibe per WhatsApp.", true));
  $("#anf-wa").addEventListener("click", () => zeigeStatus("WhatsApp wird geöffnet. Die Nachricht ist schon eingetragen, du musst nur noch auf Senden tippen.", true));
  $("#anf-copy").addEventListener("click", async () => {
    const n = nachricht(aktuell, werte()), kopie = "An: " + MAIL + "\nBetreff: " + n.betreff + "\n\n" + box.value;
    let ok = false;
    try { await navigator.clipboard.writeText(kopie); ok = true; }
    catch (e) { const ta = document.createElement("textarea"); ta.value = kopie; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0"; dlg.append(ta); ta.select(); try { ok = document.execCommand("copy"); } catch (_) {} ta.remove(); }
    zeigeStatus(ok ? "Kopiert. Füge den Text in eine neue E-Mail an " + MAIL + " ein." : "Kopieren war nicht möglich. Markiere die Nachricht oben und kopiere sie von Hand.", ok);
  });
})();/* Kurse: Ist der Termin vorbei, wechselt die Karte auf „Nächsten Termin anfragen“ */
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
  const card = $("#install"), btn = $("#install-btn"), how = $("#install-how"), sub = $("#install-sub"); if (!card) return;
  let ev = null, fertig = false;
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /android/i.test(navigator.userAgent);
  const ORIG = sub.textContent;
  const MENU = "Öffne das Browser-Menü (⋮) und wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“.";
  const hinweis = txt => { sub.textContent = txt; btn.hidden = true; how.hidden = true; card.classList.add("show"); };
  const iosDialog = () => {
    const alt = $(".shdlg"); if (alt) alt.remove();
    const d = document.createElement("dialog"); d.className = "shdlg"; d.setAttribute("aria-labelledby", "iht");
    d.innerHTML = '<button type="button" class="shx" aria-label="Schließen">✕</button>' +
      '<p class="shh"><b id="iht">App auf dem iPhone installieren</b></p>' +
      '<ol class="instol"><li>Tippe in Safari auf das Teilen-Symbol des Browsers (Quadrat mit Pfeil nach oben, in der unteren oder oberen Leiste).</li>' +
      '<li>Scrolle im Menü und wähle „Zum Home-Bildschirm“.</li>' +
      '<li>Tippe oben rechts auf „Hinzufügen“. Danach startet die Seite wie eine App.</li></ol>' +
      '<p class="shh"><small>Hinweis: Gemeint ist das Teilen-Symbol von Safari, nicht das Symbol oben auf dieser Seite.</small></p>';
    d.querySelector(".shx").addEventListener("click", () => d.close());
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
    d.addEventListener("close", () => d.remove());
    document.body.appendChild(d); d.showModal();
  };
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); ev = e; if (!standalone && !fertig) { sub.textContent = ORIG; btn.hidden = false; how.hidden = true; card.classList.add("show"); } });
  if (!standalone && ios) { sub.textContent = "Auf dem iPhone geht das über das Teilen-Menü von Safari."; btn.hidden = true; how.hidden = false; card.classList.add("show"); }
  window.addEventListener("load", () => setTimeout(() => { if (!ev && android && !standalone && !fertig) hinweis(MENU); }, 4000));
  btn.addEventListener("click", async () => {
    if (!ev) return; const e = ev; ev = null; let res = null;
    try { await e.prompt(); res = await e.userChoice; } catch (x) {}
    if (res && res.outcome === "accepted") { fertig = true; card.classList.remove("show"); } else hinweis("Installation abgebrochen? " + MENU);
  });
  how.addEventListener("click", iosDialog);
  window.addEventListener("appinstalled", () => { fertig = true; card.classList.remove("show"); });
})();
