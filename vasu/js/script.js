'use strict';
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.getElementById('formStatus');
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      status.textContent = 'Please correct the highlighted fields.';
      status.className = 'mt-3 text-warning';
      return;
    }
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !subject || !message) {
      status.textContent = 'All fields are required.';
      status.className = 'mt-3 text-warning';
      return;
    }
    const body = `From: ${name} (${email})\n\n${message}`;
    // This demo opens the visitor's email client; it does not send messages from a server.
    window.location.href = `mailto:vasukiran864@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email application should open. Please send the prepared message there.';
    status.className = 'mt-3 text-info';
  });
}
