window.onload = function () {
  const canvas = document.querySelector('canvas');
  console.dir(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  console.dir(ctx)
  ctx.strokeStyle = '#bada55';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 1;

  let lastX = 0;
  let lastY = 0;
  let color = 0;
  let direction = true;

  canvas.addEventListener('mousedown', click);
  function click(event) {
    [lastX, lastY] = [event.offsetX, event.offsetY];
    canvas.addEventListener('mousemove', draw);
  }
  function draw(event) {
    ctx.strokeStyle = `hsl(${color},50%,50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
    color = (color + 1) % 360;
    if (direction) {
      ctx.lineWidth += 0.1;
      if (ctx.lineWidth > 49) { direction = false };
    }
    else {
      ctx.lineWidth -= 0.1;
      if (ctx.lineWidth <= 1) { direction = true };
    }
    console.log(ctx.lineWidth)
    canvas.addEventListener('mouseup', finish);
  }
  function finish() {
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', finish);
  }
};