fetch('./playlist.json')
    .then(response => response.json())
    .then(data => player(data));

function player(playList) {
    let activeSong = 0;
    const audioPlayer = document.querySelector('#player__audio');
    const audio = new Audio();
    audio.volume = .75;


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

    const prevBtn = document.querySelector('.toggle_play__container').querySelector('.prev');
    const nextBtn = document.querySelector('.toggle_play__container').querySelector('.next');

    prevBtn.addEventListener('click', () => {
        if (activeSong > 0) {
            activeSong -= 1;

        } else if (activeSong === 0) {
            activeSong = playList.length - 1
        }
        if(audio.paused) {
            render(playList[activeSong]);
            audio.pause();
        } else {
            render(playList[activeSong]);
            audio.play();
        }
    })

    nextBtn.addEventListener('click', () => {

        if (activeSong < playList.length - 1) {
            activeSong += 1;
        } else  if (activeSong === playList.length - 1) {
            activeSong = 0;
        }
        if(audio.paused) {
            render(playList[activeSong]);
            audio.pause();
        } else {
            render(playList[activeSong]);
            audio.play();
        }
    })


    const playBtn = document.querySelector('.toggle_play');
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            playBtn.querySelector('.play').classList.add('d_none')
            playBtn.querySelector('.pause').classList.remove('d_none')
            audio.play();
        } else {
            playBtn.querySelector('.play').classList.remove('d_none')
            playBtn.querySelector('.pause').classList.add('d_none')
            audio.pause();
        }
    })

    const volUpBtn = document.querySelector('.volume__button.up');
    const volDownBtn = document.querySelector('.volume__button.down');

    volUpBtn.addEventListener('click', () => {
        let volume = audio.volume * 100;
        if (volume !== 100) {
            volume += 5;
        }

        audio.volume = parseInt(volume) / 100;
        console.log(audio.volume)
    })
    volDownBtn.addEventListener('click', () => {
        let volume = audio.volume * 100;
        if (volume !== 0) {
            volume -= 5;
        }
        audio.volume = parseInt(volume) / 100;
        console.log(audio.volume)
    })


    const timeLine = audioPlayer.querySelector('.timeline');
    timeLine.addEventListener('click', (e) => {
        const timeLineWidth = window.getComputedStyle(timeLine).width;
        audio.currentTime = e.offsetX / parseInt(timeLineWidth) * audio.duration;
    })

    function render(song) {

        const playerInfoName = document.querySelector('.player__info__name');
        const playerInfoAuthor = document.querySelector('.player__info__author');
        const playerCover = document.querySelector('.player__cover').querySelector('img');
        const wallpaper = document.querySelector('.phone__wallpaper');

        playerInfoName.innerHTML = song.name;
        playerInfoAuthor.innerHTML = song.author;
        playerCover.src = song.cover;
        audio.src = song.src;
        audio.currentTime = 0;
        wallpaper.style.background = `url("${song.cover}")`


        audio.addEventListener('loadeddata', () => {
            audioPlayer.querySelector('.length').textContent = getTimeCodeFromNum(audio.duration);
        });

        setInterval(() => {
            const progressBar = audioPlayer.querySelector('.progress');
            progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
            audioPlayer.querySelector('.current').textContent = getTimeCodeFromNum(audio.currentTime);
        }, 50)

    }
    render(playList[0]);
}
