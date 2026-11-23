document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = mainNav.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 2. Cursos Accordion Dropdowns
  const courseItems = document.querySelectorAll('.course-item');

  courseItems.forEach((item) => {
    const trigger = item.querySelector('.course-trigger');
    const panel = item.querySelector('.course-panel');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.toggle('active');
      trigger.setAttribute('aria-expanded', isActive);
      panel.style.maxHeight = isActive ? panel.scrollHeight + 'px' : null;
    });
  });

  // 3. Modal Handling (Voluntariado)
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  modals.forEach((modal) => {
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((modal) => closeModal(modal));
    }
  });

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  // 4. Voluntariado Form -> Send to WhatsApp (637 133 8240)
  const volunteerForm = document.getElementById('volunteerForm');
  volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('volName').value.trim();
    const phone = document.getElementById('volPhone').value.trim();
    const area = document.getElementById('volArea').value;

    const message = `Hola, me gustaría ser voluntario en Cruz Roja Caborca.%0A*Nombre:* ${encodeURIComponent(name)}%0A*Teléfono:* ${encodeURIComponent(phone)}%0A*Área de interés:* ${encodeURIComponent(area)}`;
    const whatsappURL = `https://wa.me/526371338240?text=${message}`;

    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    volunteerForm.reset();
    closeModal(document.getElementById('volunteerModal'));
  });
});