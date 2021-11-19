const nav = document.getElementById('main');
const navTop = nav.offsetTop;
const logo = nav.querySelector('.logo');

function handleScroll() {
  if (window.scrollY >= navTop) {
    nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
    logo.style.maxWidth = '500px';
  }
  else {
    nav.style.boxShadow = '';
    logo.style.maxWidth = '';
  }
}
window.addEventListener('scroll', handleScroll);