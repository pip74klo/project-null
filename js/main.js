window.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player'),
        playBtn = document.querySelector('.play'),
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next'),
        audio = document.querySelector('.audio'),
        progressContainer = document.querySelector('.progress__container'),
        progress = document.querySelector('.progress'),
        title = document.querySelector('.song'),
        cover = document.querySelector('.cover__img'),
        imgSrc = document.querySelector('.img__src');

// Название песен
const songs = ['Ambient', 'Cream', 'Desolate']

// Песня по умаочанию
let songIndex = 0

// Init
function loadSong(song) {
  title.innerHTML = song
  audio.src = `audio/${song}.mp3`
  cover.src = `img/cover${songIndex + 1}.webp`
}

loadSong(songs[songIndex]);

//play 
function playSong() {
  player.classList.add('play');
  cover.classList.add('active');
  imgSrc.src = 'img/pause.svg';
  audio.play()
};

//pause
function pauseSong() {
  player.classList.remove('play');
  cover.classList.remove('active');
  imgSrc.src = 'img/play.svg';
  audio.pause()
};

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next song

function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);

// Prev song

function prevSong() {
  songIndex--
  
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);

// Progress bar
function updateProgress(event) {
  const{duration, currentTime} = event.srcElement
  const progressPercent = (currentTime/duration) * 100
  progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress);

// Set progress
function setProgress(event) {
  const width = this.clientWidth
  const clickX = event.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)

// autoplay 
audio.addEventListener('ended', nextSong)
})