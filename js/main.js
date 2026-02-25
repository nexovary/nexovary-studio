const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.querySelector('.contact-form');
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2800);
}

function validateField(field) {
  const value = field.value.trim();

  if (!value) {
    field.classList.add('field-error');
    return false;
  }

  if (field.name === 'contact' && value.length < 5) {
    field.classList.add('field-error');
    return false;
  }

  if (field.name === 'message' && value.length < 12) {
    field.classList.add('field-error');
    return false;
  }

  field.classList.remove('field-error');
  return true;
}

if (form) {
  const fields = form.querySelectorAll('input, textarea');

  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showToast('Проверьте поля формы: заполните все данные корректно.');
      return;
    }

    form.reset();
    fields.forEach((field) => field.classList.remove('field-error'));
    showToast('Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
  });
}
