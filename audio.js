let allMusic = [
    {
        name: "All About You",
        artist: "2pac",
        img: "2pac",
        src: "All About U",
    },

    {
        name: "Only God Can Judge Me",
        artist: "2pac",
        img: "2pac",
        src: "OnlyGodCanJudgeMe",
    },

    {
        name: "Better Days",
        artist: "2pac",
        img: "2pac",
        src: "Better Dayz",
    },

    {
        name: "Hit Them Up",
        artist: "2pac",
        img: "2pac",
        src: "hit em up",
    },

    {
        name: "Never Call U Bitch Again",
        artist: "2pac ft. Jay Sean",
        img: "2pac",
        src: "Never Call You Bitch",
    },

    {
        name: "How Life Change",
        artist: "T.I",
        img: "TI",
        src: "t.i.-how_life_changed_ft._mitchellel_and_scarface",
    },

    {
        name: "Wonderful Life",
        artist: "T.I ft Akon",
        img: "TI",
        src: "Wonderful Life Ft Akon",
    },

    {
        name: "Never Love Again",
        artist: "Eminem",
        img: "eminenm",
        src: "Never Love Again",
    },

    {
        name: "Little Engine",
        artist: "Eminem",
        img: "eminenm",
        src: "Little Engine",
    },

    {
        name: "Almost Famous",
        artist: "Eminem",
        img: "eminenm",
        src: "Almost Famous",
    },

    {
        name: "Not Afraid",
        artist: "Eminem",
        img: "eminenm",
        src: "emeniem_not_afraid",
    },


    {
        name: "Till I Collapse",
        artist: "Eminem",
        img: "eminenm",
        src: "Till I Collapse",
    },

    {
        name: "No Regrets",
        artist: "Eminem ft Don Toliver",
        img: "eminenm",
        src: "No Regrets",
    },

    {
        name: "Darkness",
        artist: "Eminem",
        img: "eminenm",
        src: "Darkness",
    },

    {
        name: "Freedom",
        artist: "Akon",
        img: "akon1",
        src: "akon_freedom",
    },

    {
        name: "The Rain",
        artist: "Akon",
        img: "akon1",
        src: "Akon_The_Rain",
    },

    {
        name: "We Dont Care",
        artist: "Akon",
        img: "akon1",
        src: "Akon_We_Dont_Care",
    },

    {
        name: "Xtantastic",
        artist: "B.O.B Ft. Young Thug",
        img: "bob",
        src: "Xantastic Ft Young Thug",
    },

    {
        name: "So Good",
        artist: "B.O.B",
        img: "bob",
        src: "B_O_B_So_Good",
    },

    {
        name: "That's What I Like",
        artist: "Bruno Mars",
        img: "brunomars",
        src: "That’s What I Like",
    },

    {
        name: "Poetic Justice",
        artist: "Kendrick Lamar ft Drake",
        img: "lamar-k",
        src: "Kendrick Lamar ft Drake, Poetic Justice",
    },

    {
        name: "GOD",
        artist: "Kendrick Lamar",
        img: "lamar-k",
        src: "GOD",
    },
]

// Add Tags and Elements
const container = document.querySelector(".container");
const musicImg = document.querySelector(".img-area img");
const musicName = document.querySelector(".song-details .name");
const musicArtist = document.querySelector(".song-details .artist");
const mainAudio = document.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".play-pause");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const progressBar = document.querySelector(".progress-bar");
const progressArea = document.querySelector(".progress-area");
const musicList = document.querySelector(".music-list");
const moreMusicBtn = document.querySelector("#more-music");
const closeMoreMusicBtn = document.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingSong();
})

// Load Music Function 
function loadMusic(indexNumb) {
    musicName.innerText = allMusic [indexNumb - 1].name;
    musicArtist.innerText = allMusic [indexNumb - 1].artist;
    musicImg.src = `image/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//Play Music Function
function playMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play()
}

// Pause Music Function (assuming you have one)
function pauseMusic() {
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause();
}

//Next Music function
function nextMusic(){
    musicIndex++; //increment of music index by 1
    //To keep repeating the songs after the last song on the list finished playing
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

//Prev Music function
function prevMusic(){
    musicIndex--; //increment of music index by 1
    //To less the songs after the last song on the list finished playing
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

//Play or Pause Music Button Event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = container.classList.contains("paused");
    
    isMusicPaused ? pauseMusic() : playMusic();
})

//Next music button
nextBtn.addEventListener("click", ()=>{
    nextMusic();
})

//Prev music button
prevBtn.addEventListener("click", ()=>{
    prevMusic();
})

//width of the music with current time
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = container.querySelector(".current-time");
    let musicDuration = container.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", ()=>{

        //update song total duration
        let mainAddDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAddDuration / 60);
        let totalSec = Math.floor(mainAddDuration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }

        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //update playing song current duration
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})

//update playing sing current width on according to the progress bar
progressArea.addEventListener("click", (e)=>{
    const progressWidth = progressArea.clientWidth;
    const clickedOffSetX = e.offsetX;
    const songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidth) * songDuration;
    playMusic();
})

//Change loop, shuffle, repeat icon 
const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one"
            repeatBtn.setAttribute("title", "song looped");
            break;

        case "repeat_one":
                repeatBtn.innerText = "shuffle"
                repeatBtn.setAttribute("title", "playback shufffled");
                break;

        case "shuffle":
                    repeatBtn.innerText = "repeat"
                    repeatBtn.setAttribute("title", "playlist looped");
                    break;
    
        default:
            break;
    }
})

// to make the above icon work
mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            nextMusic();
            break;

        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;

        case "shuffle":
            let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randomIndex = Math.floor((Math.random() * allMusic)+1);
            }
            while (musicIndex == randomIndex);
            musicIndex= randomIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
})

//show music list and close it
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

closeMoreMusicBtn.addEventListener("click", () => {
    moreMusicBtn.click();
});


const ulTag = container.querySelector("ul");

    for (let i = 0; i < allMusic.length; i++) {
        let liTag = `<li li-index="${i + 1}">
            <div class="row">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
        </div>
            <audio class="${allMusic[i].src}" id="audio" src="songs/${allMusic[i].src}.mp3"></audio>
            <span id="${allMusic[i].src}" class="audio-duration">1:45</span>
        </li>`;
        
        ulTag.insertAdjacentHTML("beforeend", liTag);

        const liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
        const liAudioTag = document.querySelector(`.audio-duration`);
    
        liAudioTag.addEventListener('loadeddata', ()=>{
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
    
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            }
    
            liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
            liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        });
    }
//Playing Particular Songs Click
const allLiTags = ulTag.querySelectorAll("li");

function playingSong() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration");

        // Remove playing class from all other li
        if (allLiTags[j].getAttribute("playing")) {
            allLiTags[j].classList.remove("playing");

            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        // Assuming musicIndex is a variable defined somewhere in your code
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "playing";
        }

        // Use addEventListener to handle click events instead of setting onclick attribute
        allLiTags[j].addEventListener("click", function() {
            clicked(this);
        });
    }
}

        //Click songs on Li
    function clicked(element) {
        
        let getLiIndex = element.getAttribute("li-index");
        musicIndex = getLiIndex;
        loadMusic(musicIndex)
        playMusic();
        playingSong();
    }