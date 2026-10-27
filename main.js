/* Construit la page à partir de data.js */
(function () {
  var S = window.SITE, $ = function (s) { return document.querySelector(s); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  var tags = function (a) { return a.map(function (t) { return '<li class="tag">' + esc(t) + '</li>'; }).join(""); };
  var ext = 'target="_blank" rel="noopener noreferrer"';

  $("#hero-content").innerHTML =
    '<p class="badge">' + esc(S.badge) + '</p><h1>' + esc(S.nom) + '</h1>' +
    '<p class="role">' + esc(S.titre) + '</p><p class="lead">' + esc(S.accroche) + '</p>' +
    '<div class="btns"><a class="btn primary" href="#projets">Voir mes projets</a>' +
    '<a class="btn" href="' + esc(S.cv) + '" download>Télécharger mon CV</a>' +
    '<a class="btn" href="#contact">Me contacter</a></div>';
  $("#apropos-text").textContent = S.apropos;

  $("#projets-list").innerHTML = S.projets.map(function (p) {
    var dispo = p.code.indexOf("[") === -1;
    var btn = dispo ? '<a class="btn small" href="' + esc(p.code) + '" ' + ext + '>Code source</a>'
                    : '<span class="btn small disabled" aria-disabled="true">Code source bientôt disponible</span>';
    return '<article class="card reveal"><img src="' + esc(p.image) + '" alt="' + esc(p.alt) + '" width="1200" height="600" loading="lazy">' +
      '<div class="card-body"><h3>' + esc(p.titre) + '</h3><p class="meta">' + esc(p.date) + ' — ' + esc(p.contexte) + '</p>' +
      '<p>' + esc(p.description) + '</p><ul class="tags">' + tags(p.tags) + '</ul>' + btn + '</div></article>';
  }).join("");

  $("#skills-list").innerHTML = S.competences.map(function (c) {
    return '<div class="card reveal skill"><h3>' + esc(c[0]) + '</h3><ul class="tags">' + tags(c[1]) + '</ul></div>';
  }).join("");

  $("#timeline").innerHTML = S.parcours.map(function (e) {
    return '<li class="reveal"><span class="date">' + esc(e.date) + '</span><h3>' + esc(e.titre) + '</h3><p class="meta">' + esc(e.lieu) + '</p>' +
      (e.detail ? '<p>' + esc(e.detail) + '</p>' : '') + '</li>';
  }).join("");
  $("#langues").innerHTML = S.langues.map(function (l) { return '<li><strong>' + esc(l[0]) + '</strong> : ' + esc(l[1]) + '</li>'; }).join("");

  $("#contact-title").textContent = S.contactTitre;
  $("#contact-links").innerHTML =
    '<a class="btn primary" href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a>' +
    '<a class="btn" href="' + esc(S.github) + '" ' + ext + '>GitHub</a>' +
    '<a class="btn" href="' + esc(S.linkedin) + '" ' + ext + '>LinkedIn</a>';
  $("#contact-info").textContent = S.localisation + (S.afficherTelephone ? " · " + S.telephone : "");
  $("#footer").innerHTML = '<p>© ' + new Date().getFullYear() + ' ' + esc(S.nom) + '</p><p><a href="' + esc(S.github) + '" ' + ext + '>GitHub</a> · <a href="' + esc(S.linkedin) + '" ' + ext + '>LinkedIn</a></p>';

  /* Menu mobile */
  var nav = $("#menu"), burger = $("#burger");
  burger.addEventListener("click", function () { var o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

  /* Mode sombre (mode clair par défaut, choix mémorisé) */
  var root = document.documentElement, tbtn = $("#theme");
  var set = function (m) { root.setAttribute("data-theme", m); tbtn.setAttribute("aria-pressed", m === "dark"); tbtn.textContent = m === "dark" ? "Mode clair" : "Mode sombre"; };
  var saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
  set(saved === "dark" ? "dark" : "light");
  tbtn.addEventListener("click", function () { var m = root.getAttribute("data-theme") === "dark" ? "light" : "dark"; set(m); try { localStorage.setItem("theme", m); } catch (e) {} });

  /* Apparition au défilement */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  } else { els.forEach(function (e) { e.classList.add("in"); }); }
})();
