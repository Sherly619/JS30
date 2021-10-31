window.onload = function () {
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.value = false;
    panel.addEventListener('click', trans)
    panel.addEventListener('transitionend', transEnd);
  });
  function trans() {
    this.classList.toggle('open');
  }
  function transEnd(event) {
    const [flexStr, ,] = getComputedStyle(this).flex.split(' ');
    if (event.propertyName.includes('flex')) {
      this.value = !this.value;
      if (flexStr === '5') {
        this.value && this.classList.add('open-active');
        this.value = true;
      }
      else if (flexStr === '1') {
        this.value || this.classList.remove('open-active');
        this.value = false;
      }
    }
  }
};