/* Nathalie Barth · Mutige Kinderherzen — Teilen-Symbol in der Kopfzeile und Klick auf das Logo (nach oben)
   Geteilt wird immer die Adresse der Produktiv-Domain. Ohne Skript bleibt die Seite voll nutzbar. */
(function () {
  "use strict";
  var BASIS = "https://www.mutige-kinderherzen.de/";
  var TEXT = "Mutige Kinderherzen: Selbstbehauptung und Resilienz für Kinder, mit dem Ratgeber „Was mache ich, wenn…?“ von Nathalie Barth.";
  var BETREFF = "Mutige Kinderherzen: Nathalie Barth";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var seite = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var istStart = seite === "index.html" || seite === "";
  var URL_TEILEN = BASIS;   // auch von Impressum und Datenschutz aus wird die Startseite geteilt

  var nav = $(".nav");
  if (!nav) return;

  /* Logo und Name: auf der Startseite sanft nach oben, sonst zur Startseite (Link bleibt) */
  var brand = $(".brand", nav);
  if (brand && istStart) {
    brand.addEventListener("click", function (e) {
      if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      var ruhig = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: ruhig ? "auto" : "smooth" });
      try { if (location.hash) history.replaceState(null, "", location.pathname + location.search); } catch (x) {}
      var m = $("main"); if (m) { if (!m.hasAttribute("tabindex")) m.setAttribute("tabindex", "-1"); m.focus({ preventScroll: true }); }
    });
  }

  /* Teilen-Symbol */
  var b = document.createElement("button");
  b.type = "button"; b.className = "sharebtn"; b.setAttribute("aria-label", "Seite teilen"); b.title = "Seite teilen";
  b.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg>';
  var burger = $(".burger", nav); nav.insertBefore(b, burger || null);

  function melde(text, ms) {
    var alt = $(".sharesnack"); if (alt) alt.remove();
    var s = document.createElement("div"); s.className = "sharesnack"; s.setAttribute("role", "status"); s.textContent = text;
    document.body.appendChild(s); setTimeout(function () { s.remove(); }, ms || 3000);
  }
  function kopieren() {
    var ok = function () { melde("Link kopiert"); };
    var fallback = function () {
      var ta = document.createElement("textarea"); ta.value = URL_TEILEN; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;left:-9999px";
      document.body.appendChild(ta); ta.select(); var g = false; try { g = document.execCommand("copy"); } catch (x) {} ta.remove();
      if (g) ok(); else melde("Kopieren nicht möglich. Link bitte markieren und kopieren: " + URL_TEILEN, 7000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(URL_TEILEN).then(ok, fallback); else fallback();
  }
  function oeffne() {
    if (navigator.share) { navigator.share({ title: BETREFF, text: TEXT, url: URL_TEILEN }).catch(function () {}); return; }
    var alt = $(".shdlg"); if (alt) alt.remove();
    var d = document.createElement("dialog"); d.className = "shdlg"; d.setAttribute("aria-labelledby", "sht");
    var x = encodeURIComponent;
    d.innerHTML = '<button type="button" class="shx" aria-label="Schließen">✕</button>' +
      '<p class="shh"><b id="sht">Seite teilen</b><span>Schick den Link an Freunde, Familie oder Kolleginnen und Kollegen.</span></p>' +
      '<div class="shrow">' +
      '<a class="shopt" href="https://wa.me/?text=' + x(TEXT + " " + URL_TEILEN) + '" target="_blank" rel="noopener noreferrer">WhatsApp</a>' +
      '<a class="shopt" href="mailto:?subject=' + x(BETREFF) + '&body=' + x(TEXT + "\r\n\r\n" + URL_TEILEN) + '">E-Mail</a>' +
      '<button type="button" class="shopt shcopy">Link kopieren</button></div>';
    d.querySelector(".shx").addEventListener("click", function () { d.close(); });
    d.querySelector(".shcopy").addEventListener("click", kopieren);
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    d.addEventListener("close", function () { d.remove(); });
    document.body.appendChild(d); d.showModal();
  }
  b.addEventListener("click", oeffne);
})();