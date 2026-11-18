// 1. Highlight the current page in the navbar
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(a => {
  if (a.getAttribute('href') === here) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
});
// 2. Footer year
document.querySelectorAll('.year').forEach(y => y.textContent = new Date().getFullYear());
// 3. Fade sections in as they scroll into view
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// 4. Contact form: validate, then open the visitor's email app with the message filled in
const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  form.classList.add('was-validated');
  if (!form.checkValidity()) return;
  const f = new FormData(form);
  location.href = 'mailto:balakamohit@gmail.com?subject=' + encodeURIComponent(f.get('subject')) +
    '&body=' + encodeURIComponent(`From: ${f.get('name')} (${f.get('email')})\n\n${f.get('message')}`);
  document.querySelector('#status').textContent = 'Your email app should open with the message ready to send.';
});
