window.onload = function () {
  const keys = document.querySelectorAll('.key');
  const audios = document.getElementsByTagName('audio');

  window.onkeydown = hit;
  window.onkeyup = leave;

  function toggle(str, boo) {
    let tes = new RegExp(`\\b${str}\\b`, 'g');
    if (boo && !tes.test(this.className)) {
      this.classList.add(str);
    }
    else if (!boo && tes.test(this.className)) {
      this.classList.remove(str)
    }
  }

  function hit(event) {
    // console.log(event)
    const keyCo = event.keyCode;
    for (let i = 0; i < keys.length; i++) {
      if (keyCo === Number(keys[i].dataset.key)) {
        toggle.call(keys[i], 'playing', true);
        audios[i].currentTime = 0;
        audios[i].play();
      }
    }
  }
  function leave(event) {
    const keyCo = event.keyCode;
    for (let i = 0; i < keys.length; i++) {
      if (keyCo === Number(keys[i].dataset.key)) {
        toggle.call(keys[i], 'playing', false);
      }
    }
  }
};