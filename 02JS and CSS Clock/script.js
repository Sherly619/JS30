window.onload = function () {
    let hour = document.querySelector('.hour-hand');
    let min = document.querySelector('.min-hand');
    let second = document.querySelector('.second-hand');
    const time = new Date();
    let secDeg = 6 * time.getSeconds();
    let minDeg = 6 * time.getMinutes();
    let hourDeg = 30 * (time.getHours() - 12);
    second.style.transform = `translateX(-100%) rotate(${secDeg - 270}deg)`;
    min.style.transform = `translateX(-100%) rotate(${minDeg - 270}deg)`;
    hour.style.transform = `translateX(-100%) rotate(${hourDeg - 270}deg)`;

    setInterval(function () {
        secDeg = secDeg + 6;
        second.style.transform = `translateX(-100%) rotate(${secDeg - 270}deg)`;
        if (secDeg === 360) {
            minDeg = minDeg + 6;
            min.style.transform = `translateX(-100%) rotate(${minDeg - 270}deg)`;
            secDeg = 0;
            if (minDeg === 360) {
                hourDeg = hourDeg + 30;
                hour.style.transform = `translateX(-100%) rotate(${hourDeg - 270}deg)`;
                minDeg = 0;
                if (hourDeg === 360) {
                    hourDeg = 0;
                }
            }
        }
    }, 1000);
};