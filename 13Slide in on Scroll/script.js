function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const imgs = document.querySelectorAll('img');

window.addEventListener('scroll', checkSlide);
function checkSlide() {
  const scrollHeight = window.scrollY + window.innerHeight;
  imgs.forEach(img => {
    const imgHalf = img.offsetTop + (img.height / 2);
    const imgHide = img.offsetTop + img.height;
    if (scrollHeight >= imgHalf && window.scrollY <= imgHide) {
      img.classList.add('active');
    }
    else {
      img.classList.remove('active');
    }
  })
}
