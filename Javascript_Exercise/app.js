// BMI Calculation

function calculateBmi() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  if (weight > 0 && height > 0) {
    let bmi = weight / (((height / 100) * height) / 100);
    document.getElementById("bmi").value = bmi;

    if (bmi < 18.5) {
      document.getElementById("result").value = "You are too thin.";
    }
    if (bmi > 18.5 && bmi < 24.9) {
      document.getElementById("result").value = "You are healthy.";
    }
    if (bmi > 25) {
      document.getElementById("result").value = "You are overweight.";
    }
  } else {
    alert("Please enter something first!");
  }
}

function resetBtn() {
  document.getElementById("reset").reset();
}

// BMI Calculation

// password

const pswInput = document.getElementById("psw");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

pswInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
};

pswInput.onblur = function () {
  document.getElementById("message").style.display = "none";
};

pswInput.onkeyup = function () {
  const lowerCaseLetters = /[a-z]/g;
  if (pswInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  const upperCaseLetters = /[A-Z]/g;
  if (pswInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  const numbers = /[0-9]/g;
  if (pswInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (pswInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};
//  password

// repassword

function validate() {
  const x = document.getElementById("psw");
  const y = document.getElementById("repsw");
  if (x.value == y.value) return;
  else alert("password not same");
}

// repassword

// Count Down Timer

const countDownDate = new Date("Aug 2, 2024 23:59:00").getTime();

const x = setInterval(function () {
  const now = new Date().getTime();

  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML =
    days +
    " days , " +
    hours +
    " h , " +
    minutes +
    " m , " +
    seconds +
    " s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

// Count Down Timer

// music player

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

//index for songs
let index;

//initially loop=true
let loop = true;

const songsList = [
  {
    name: "Hame Raftand",
    link: "./music/RezaBahram_HameRaftand.mp3",
    artist: "Reza Bahram",
    image:
      "https://upmusics.com/wp-content/uploads/2024/01/Hame-Raftand-Cover-Final.jpg",
  },
  {
    name: "Del",
    link: "./music/RezBahram_Del.mp3",
    artist: "Reza Bahram",
    image:
      "https://music-fa.com/wp-content/uploads/2019/12/photo_2019-12-04_08-07-46.jpg",
  },
  {
    name: "To",
    link: "./music/Erfan Tahmasbi - To (320).mp3",
    artist: "Erfan Tahmasbi",
    image:
      "https://music-fa.com/wp-content/uploads/2023/04/Erfan-Tahmasbi-Del-Az-Man-Music-fa.com_.jpg",
  },
];

let events = {
  mouse: {
    click: "click",
  },
  touch: {
    click: "touchstart",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Format time
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//set song
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
};

//play song
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//repeat button
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("repeat off");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("repeat on");
  }
});

//Next song
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);

    playAudio();
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    console.log(randIndex);
    setSong(randIndex);
    playAudio();
  }
};

//pause song
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//previous song
const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

//next song when current song ends
audio.onended = () => {
  nextSong();
};

//Shuffle songs
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("shuffle off");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("shuffle on");
  }
});

//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

//prev button
prevButton.addEventListener("click", previousSong);

//if user clicks on progress bar
isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  //set width to progress
  currentProgress.style.width = progress * 100 + "%";

  //set time
  audio.currentTime = progress * audio.duration;

  //play
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

//update progress every second
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});

//update time
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//Creates playlist
const initializePlaylist = () => {
  for (let i in songsList) {
    playlistSongs.innerHTML += `<li class='playlistSong' onclick='setSong(${i})'>
            <div class="playlist-image-container">
                <img src="${songsList[i].image}"/>
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>`;
  }
};

//display playlist
playlistButton.addEventListener("click", () => {
  playlistContainer.classList.remove("hide");
});

//hide playlist
closeButton.addEventListener("click", () => {
  playlistContainer.classList.add("hide");
});

window.onload = () => {
  //initially first song
  index = 0;
  setSong(index);
  //create playlist
  initializePlaylist();
};

// music player
