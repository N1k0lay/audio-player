const audioPlayer = document.querySelector('#player__audio');
const audio = new Audio('./assets/audio/61%20-%20Travis%20Scott,HVME%20-%20Goosebumps%20-%20Remix.mp3');

audio.addEventListener('loadeddata', () => {
    audioPlayer.querySelector('.length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
});

const playBtn = document.querySelector('.toggle_play');
playBtn.addEventListener('click', () => {
    if(audio.paused) {
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        audio.play();
    } else {
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        audio.pause();
    }
})

const timeLine = audioPlayer.querySelector('.timeline');
timeLine.addEventListener('click', (e) => {
    const timeLineWidth = window.getComputedStyle(timeLine).width;
    audio.currentTime = e.offsetX / parseInt(timeLineWidth) * audio.duration;
})

setInterval(() => {
    const progressBar = audioPlayer.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    audioPlayer.querySelector('.current').textContent = getTimeCodeFromNum(audio.currentTime);
}, 500)


//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

