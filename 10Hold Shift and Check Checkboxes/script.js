window.onload = function () {
  window.addEventListener('keydown', shift);
  window.addEventListener('keyup', unshift);
  const checkbox = document.querySelectorAll('input[type=checkbox]');
  let checkedIndex;
  let checkShift = false;
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].index = i;
    checkbox[i].addEventListener('click', onChange);
  }
  function onChange() {
    if (checkShift && checkedIndex) {
      for (let i = checkedIndex; i < this.index + 1; i++) {
        checkbox[i].checked = true;
      }
    }
    else {
      checkedIndex = this.index;
    }
  }
  function shift(e) {
    if (e.shiftKey) checkShift = true;
  }
  function unshift(e) {
    if (e.keyCode && e.keyCode === 16) {
      checkShift = false;
      return;
    };
  }
};