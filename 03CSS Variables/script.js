window.onload = function () {
  const inputs = document.querySelectorAll('input');
  // const img = document.querySelector('img');
  inputs.forEach(inp => inp.addEventListener('change', update));

  function update() {
    const updateName = this.name;
    const updateValue = this.value;
    const dataSizing = this.dataset.sizing;
    //   if (updateName === 'spacing') {
    //     img.style.padding = updateValue + 'px';
    //   }
    //   else if (updateName === 'blur') {
    //     img.style.filter = `blur(${updateValue}px)`;
    //   }
    //   else {
    //     img.style.backgroundColor = updateValue;
    //   }
    document.documentElement.style.setProperty(`--${updateName}`, updateValue + dataSizing);
  }
};