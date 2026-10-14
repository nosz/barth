/* Nathalie Barth · Mutige Kinderherzen — gemeinsames Skript (Navigation, Themenfinder, PWA) */
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

/* Themenfinder: Kapitel aus dem Buch mit einem Satz Vorgeschmack */
const THEMEN = [
  ["Mein Kind ist schüchtern", "Schüchtern? Nö – dein Kind braucht einfach Sicherheit. Wenn du auf die Stärken schaust und dein Kind nicht verändern willst, wächst sein Selbstvertrauen."],
  ["Mein Kind ist wütend", "Hinter jeder Wut steckt eine Traurigkeit. Wut darf raus – am besten körperlich. Und der Satz „Beruhige dich doch endlich“ hilft in diesem Moment nicht."],
  ["Mein Kind ist traurig", "Jedes Gefühl darf sein. Ein einfacher Dialog mit der Traurigkeit zeigt deinem Kind: Ich werde gesehen und ernst genommen."],
  ["Mein Kind schämt sich", "Scham heißt: „Etwas stimmt nicht mit mir.“ Ein Satz, den ihr gemeinsam übt, baut einen sicheren Hafen – egal, was passiert."],
  ["Streit unter Geschwistern", "Die wichtigste Frage lautet: „Braucht ihr Hilfe?“ Danach geht es um Pause, Zuhören und die Bedürfnisse aller Kinder."],
  ["Mein Kind setzt sich unter Druck", "Aus „Ich kann das nicht“ wird „Ich kann das NOCH nicht“. So nimmst du Druck raus, ohne die Anstrengung kleinzureden."],
  ["Mein Kind hat Angst", "Angst oder Unsicherheit? Der Unterschied verändert, wie du reagierst – und wie dein Kind Mut aufbauen kann."],
  ["Mein Kind will nicht mit mir sprechen", "Lass dein Kind erst ankommen. Ein Zeichen vereinbaren, Raum geben, nicht persönlich nehmen: So wächst Vertrauen."],
  ["Mein Kind hat jemanden gehauen", "Erst du: durchatmen. Dann verstehen, was passiert ist, und gemeinsam eine Lösung finden – ohne Gedankenspirale."],
  ["Ich habe mein Kind angeschrien", "Schon gut, dass du es bemerkt hast. Selbstvorwürfe helfen niemandem. Was stattdessen stärkt, steht im Buch."],
  ["Immer wieder Machtkämpfe im Alltag", "Weniger Machtkampf durch mehr Verbindung: kleine Entscheidungen teilen, Kraftquellen für dich finden, Haltung prüfen."],
  ["Mein Kind will nicht lernen", "Spielerisch statt Druck: kurze Lerneinheiten, Bewegung, kreative Ideen. Verbindung entsteht dabei ganz nebenbei."],
  ["Mein Kind darf nicht mitspielen", "Im Gespräch bleiben, kein Mitleid, Ideen sammeln: Was kannst du stattdessen tun? Und wann die Lehrkraft dazugehört."],
  ["Mein Kind hat keine Freunde", "Schau zuerst bei dir: Ist es dein Gefühl oder das deines Kindes? Dann gemeinsam überlegen, was guttut."],
  ["Mein Kind ist unfreundlich zu mir", "Nicht persönlich nehmen, nachfragen, Vorbild bleiben – und trotzdem klar sagen, was dir wichtig ist."],
  ["Mein Partner hat andere Vorstellungen", "Du kannst nur dich selbst verändern. Dein Vorbild wirkt – und kleine Schritte in deine Richtung verdienen Wertschätzung."],
  ["Meine Eltern haben andere Vorstellungen", "Aussagen „übersetzen“, Bedürfnisse erkennen und als Schutzschild deines Kindes freundlich Grenzen setzen."],
  ["Mein Kind will nicht zur Schule", "Gefühle bestätigen, Gründe erfragen, Vorfreude planen. Und wann mehr dahintersteckt und genauer hingeschaut werden sollte."],
  ["Mein Kind schwänzt die Schule", "Ursachen verstehen statt Bockigkeit unterstellen: fünf Tipps und der Hinweis, wann Hilfe von außen sinnvoll ist."],
  ["Mein Kind lügt mich an", "Eine Lüge ist oft ein Wunsch: „Du wünschst dir, die Hausaufgaben wären schon fertig.“ So bleibt ihr verbunden."],
  ["In der Familie gibt es einen Todesfall", "Schweigen ist für Kinder das Schwerste. Offene Gespräche, ein Erinnerungsplatz und ein Brief können helfen."],
  ["Trennung oder Scheidung", "Ein „Neustart“ für alle: ehrlich erklären, die Liebe zum Kind betonen und für Stabilität sorgen."],
  ["Nachwuchs kommt, mein Kind ist eifersüchtig", "Sicherheit zuerst, Gefühle ernst nehmen und die Wut „raushüpfen“ – statt Bestrafung für Eifersucht."],
  ["Mein Kind wird negativ beeinflusst", "Sonnenblumenfreunde oder Unkrautfreunde? Dein Kind lernt zu spüren, wer ihm guttut – und entscheidet selbst."],
  ["Mein Kind ist enttäuscht", "Enttäuschung ernst nehmen und fragen: Was kann ich beeinflussen, was nicht? Daraus wächst Resilienz."],
  ["Mein Kind trödelt ständig", "Routinen, gemeinsam Zeit einplanen, Geduld: Dein Kind trödelt nicht mit böser Absicht."],
  ["Mein Kind hat Angst im Dunkeln", "Fünf Ideen von schwachem Nachtlicht bis „Dunkelparty“ am Tag, damit die Nacht ihren Schrecken verliert."],
  ["Mein Kind ist unordentlich", "Ist es dein Gefühl oder seins? Vereinbarungen und gemeinsames Aufräumen statt Vorwürfe stärken die Beziehung."]
];
(() => {
  const feld = $("#finder-q"), liste = $("#finder-chips"), box = $("#finder-answer"); if (!feld || !liste || !box) return;
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
  let aktiv = -1;
  const zeigeAntwort = i => {
    aktiv = i; const t = THEMEN[i];
    box.replaceChildren();
    const h = document.createElement("h4"); h.textContent = t[0];
    const p = document.createElement("p"); p.textContent = t[1] + " Die vollständige Antwort mit Beispielen und Formulierungen findest du im Buch.";
    const a = document.createElement("a"); a.className = "btn gold sm"; a.href = AMAZON; a.textContent = "Im Buch nachlesen: bei Amazon ansehen";
    box.append(h, p, a);
    [...liste.querySelectorAll("button")].forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
  };
  const zeichne = () => {
    const q = norm(feld.value.trim()); liste.replaceChildren(); let n = 0;
    THEMEN.forEach((t, i) => {
      if (q && !norm(t[0] + " " + t[1]).includes(q)) return;
      const li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; b.dataset.i = i; b.textContent = t[0]; b.setAttribute("aria-pressed", String(i === aktiv));
      b.addEventListener("click", () => zeigeAntwort(i)); li.append(b); liste.append(li); n++;
    });
    $("#finder-none").hidden = n !== 0;
  };
  feld.addEventListener("input", zeichne); zeichne();
})();

/* Kursanfragen: vorformulierte E-Mail pro Angebot */
const MAIL = "nathalie.barth@gmx.net", ANREDE = "Liebe Nathalie,";
const ANGEBOTE = {
  gruppe:     { betreff: "Anfrage: Gruppentraining für Kinder", interesse: "Ich habe Interesse am Gruppentraining für Kinder.", felder: ["Name", "Alter und Vorname des Kindes", "Wohnort", "Telefon (optional)"] },
  einzel:     { betreff: "Anfrage: Einzeltraining für Kinder", interesse: "Ich habe Interesse am Einzeltraining für mein Kind.", felder: ["Name", "Alter und Vorname des Kindes", "Worum geht es aktuell?", "Telefon (optional)"] },
  workshop:   { betreff: "Anfrage: Workshop für Eltern und Pädagogen", interesse: "Ich habe Interesse an einem Workshop für Eltern und Pädagogen.", felder: ["Name", "Einrichtung oder Gruppe (optional)", "Ungefähre Teilnehmerzahl", "Wunschzeitraum", "Telefon (optional)"] },
  wochenende: { betreff: "Anfrage: Offener Wochenendkurs für Kinder", interesse: "Ich habe Interesse am offenen Wochenendkurs für Kinder (6 bis 11 Jahre).", felder: ["Name", "Alter und Vorname des Kindes", "Wunschtermin", "Telefon (optional)"] },
  montag:     { betreff: "Anfrage: Fortlaufender Kurs am Montag", interesse: "Ich habe Interesse am fortlaufenden Kurs am Montag.", felder: ["Name", "Alter und Vorname des Kindes", "Wohnort", "Telefon (optional)"] },
  kita:       { betreff: "Anfrage: Programm für Kita oder Schule", interesse: "Ich habe Interesse an einem Programm für unsere Kita beziehungsweise Schule.", felder: ["Name und Funktion", "Einrichtung und Ort", "Altersgruppe oder Klassenstufe", "Wunschzeitraum", "Telefon (optional)"] }
};
function mailLink(a){
  const t = ANGEBOTE[a]; if (!t) return "mailto:" + MAIL;
  const text = [ANREDE, "", t.interesse, "", "Bitte schicke mir Informationen zu Terminen, Preisen und zur Anmeldung.", "", "Meine Angaben:", ...t.felder.map(f => f + ": "), "", "Vielen Dank und liebe Grüße"].join("\r\n");
  return "mailto:" + MAIL + "?subject=" + encodeURIComponent(t.betreff) + "&body=" + encodeURIComponent(text);
}
document.querySelectorAll("a[data-angebot]").forEach(a => { a.href = mailLink(a.dataset.angebot); });
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
