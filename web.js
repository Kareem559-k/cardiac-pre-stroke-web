// ===== Scroll Animation for Sections =====
const sections = document.querySelectorAll('.section');

function showSectionsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', showSectionsOnScroll);
showSectionsOnScroll();

// ===== Back to Top Button =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '⬆️';
backToTopBtn.id = 'backToTop';
document.body.appendChild(backToTopBtn);

backToTopBtn.style.position = 'fixed';
backToTopBtn.style.bottom = '30px';
backToTopBtn.style.right = '30px';
backToTopBtn.style.background = '#00e5ff';
backToTopBtn.style.color = '#1b1b1b';
backToTopBtn.style.border = 'none';
backToTopBtn.style.borderRadius = '50%';
backToTopBtn.style.width = '45px';
backToTopBtn.style.height = '45px';
backToTopBtn.style.fontSize = '1.4em';
backToTopBtn.style.cursor = 'pointer';
backToTopBtn.style.display = 'none';
backToTopBtn.style.boxShadow = '0 0 10px rgba(0,229,255,0.7)';
backToTopBtn.style.zIndex = '1000';
backToTopBtn.style.transition = 'background 0.3s ease';

backToTopBtn.addEventListener('mouseenter', () => {
  backToTopBtn.style.background = '#00bcd4';
});
backToTopBtn.addEventListener('mouseleave', () => {
  backToTopBtn.style.background = '#00e5ff';
});

// Show button when scrolling
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top smoothly
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
