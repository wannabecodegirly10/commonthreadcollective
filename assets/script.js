// Booth Collective — shared site scripts
document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () { siteNav.classList.toggle('open'); });
    siteNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { siteNav.classList.remove('open'); });
    });
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Inquiry form (front-end only for now — wire to a real service later)
  var submitBtn = document.getElementById('submitBtn');
  var formMsg = document.getElementById('formMsg');
  if (submitBtn && formMsg) {
    function handleSubmit() {
      var name = (document.getElementById('f-name').value || '').trim();
      var email = (document.getElementById('f-email').value || '').trim();
      var type = document.getElementById('f-type').value;
      var msg = (document.getElementById('f-msg').value || '').trim();
      if (!name || !email || !type || !msg) {
        formMsg.textContent = 'Please fill out your name, email, event type, and a short message.';
        formMsg.className = 'form-msg err'; return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.className = 'form-msg err'; return;
      }
      // TODO: replace this block with a real submission (e.g. Formspree, Netlify Forms, or your API).
      formMsg.textContent = 'Thank you, ' + name + "! Your inquiry has been captured. We'll be in touch soon.";
      formMsg.className = 'form-msg ok';
      ['f-name','f-email','f-type','f-date','f-msg'].forEach(function (id) {
        var el = document.getElementById(id); if (el) el.value = '';
      });
    }
    submitBtn.addEventListener('click', handleSubmit);
  }
});
