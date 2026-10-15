/* Feste Zielfenster: Amazon und App öffnen im EIGENEN Fenster und nutzen beim nächsten Klick genau dieses wieder.
   Der Fenstername (target) allein reicht nicht, wenn die Zielseite window.name zurücksetzt. Deshalb wird zusätzlich das Fenster-Objekt gemerkt.
   Ohne Skript greift weiterhin href + target. */
(function () {
  var fenster = {};
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[target]");
    if (!a) return;
    var name = a.getAttribute("target");
    if (name !== "amazon-buch" && name !== "wmiw-app") return;
    var w = fenster[name];
    if (w && !w.closed) {
      try { w.location.href = a.href; w.focus(); e.preventDefault(); return; } catch (x) {}
    }
    var neu = window.open(a.href, name);
    if (neu) { fenster[name] = neu; e.preventDefault(); try { neu.focus(); } catch (x) {} }
  });
})();