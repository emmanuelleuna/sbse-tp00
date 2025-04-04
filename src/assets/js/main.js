function windowScroll() {
  var t = document.getElementById("navbar");
  t &&
    (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop
      ? t.classList.add("nav-sticky")
      : t.classList.remove("nav-sticky"));
}
window.addEventListener("scroll", function (t) {
  t.preventDefault(), windowScroll();
});
var counters = document.querySelectorAll(".counters"),
  speed = 200;
function menuActivation() {
  var t = (t =
    "/" == location.pathname
      ? "index.html"
      : location.pathname.substring(1)).substring(t.lastIndexOf("/") + 1);
  if ("" !== t)
    for (
      var e, n = document.querySelectorAll(".nav-item a"), o = 0, a = n.length;
      o < a;
      o++
    )
      -1 !== n[o].getAttribute("href").indexOf(t) &&
        ((e =
          n[o].parentElement.parentElement.parentElement.firstElementChild) &&
          e.classList.add("active"),
        n[o].classList.add("active"));
}
counters.forEach(function (n) {
  function o() {
    var t = +n.getAttribute("theme-counter"),
      e = +n.innerText;
    e < t
      ? ((n.innerText = Math.ceil(e + t / speed)), setTimeout(o, 1))
      : (n.innerText = t);
  }
  o();
}),
  menuActivation();
var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  ),
  tooltipList = tooltipTriggerList.map(function (t) {
    return new bootstrap.Tooltip(t);
  }),
  dataTheme = document.getElementById("dataTheme");
dataTheme.addEventListener("click", function () {
  var t = document.body;
  t.getAttribute("data-bs-theme")
    ? t.removeAttribute("data-bs-theme")
    : t.setAttribute("data-bs-theme", "dark");
});
