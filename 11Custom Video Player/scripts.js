const player = document.querySelector('.player');
const video = player.querySelector('video');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const playControl = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skips = player.querySelectorAll('button[data-skip]');

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', progressChange);
progress.addEventListener('click', timeChange);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousemove', (e) => mousedown && timeChange(e));
progress.addEventListener('mouseup', () => mousedown = false);
playControl.addEventListener('click', togglePlay);
sliders.forEach(slider => slider.addEventListener('input', sliderChange));
skips.forEach(skip => skip.addEventListener('click', backAndForward));

function togglePlay() {
    if (video.paused) {
        video.play();
        playControl.innerHTML = '❚❚';
    }
    else {
        video.pause();
        playControl.innerHTML = '►';
    }
}

function progressChange() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + '%'
}

function timeChange(e) {
    const nowTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = nowTime;
}

function sliderChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'volume') {
        video.volume = value;
    }
    else {
        video.playbackRate = value;
    }
}

function backAndForward() {
    video.currentTime += parseFloat(this.dataset.skip);
}

