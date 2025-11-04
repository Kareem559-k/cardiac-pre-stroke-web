const sections = document.querySelectorAll('.section');

function showSectionsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) section.classList.add('visible');
  });
}
window.addEventListener('scroll', showSectionsOnScroll);
showSectionsOnScroll();

// Back to top button
const backToTop = document.createElement('button');
backToTop.textContent = '⬆️';
backToTop.id = 'backToTop';
document.body.appendChild(backToTop);

Object.assign(backToTop.style, {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  background: '#00e5ff',
  color: '#1b1b1b',
  border: 'none',
  borderRadius: '50%',
  width: '45px',
  height: '45px',
  fontSize: '1.4em',
  cursor: 'pointer',
  display: 'none',
  boxShadow: '0 0 10px rgba(0,229,255,0.7)',
  zIndex: '1000',
});

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
