

let songs = [
    { Name: "First", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { Name: "Second", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { Name: "Third", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { Name: "Fourth", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { Name: "Fifth", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { Name: "Sixth", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { Name: "Seventh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { Name: "Eighth", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { Name: "Ninth", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { Name: "Tenth", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }

]

function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds; // Return is HH : MM : SS
}

let songSource = []
let dur = document.querySelector('.duration')
let currentdur = document.querySelector('.currentDuration')

// getting the song source list
songs.forEach((element) => {
    songSource.push('http://127.0.0.1:5500/' + element.filePath)
})



let songItems = Array.from(document.querySelectorAll('.songItem'))

let songName = document.querySelector('.songInfo').innerText

// Change cover and song name on clicking small play button
songItems.forEach((element, i) => {
    let cvr = element.querySelector('img')
    let title = element.querySelector('.title')

    cvr.src = songs[i].coverPath
    title.innerText = songs[i].Name
})


let audioBar = document.querySelector('.bottom input')

let audioElement = new Audio('songs/1.mp3')

let gif = document.querySelector('.songInfo img')


let masterPlay = document.querySelector('#masterPlay')

// controlling audiobar buttons
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime === 0) {

        gif.style.opacity = 1;
        dur.innerText = convertHMS(audioElement.duration);


        audioElement.play()
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")


    }
    else {
        gif.style.opacity = 0;
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')


    }

})

let songIndex = 0;


// Contolling Loop button
let loop = document.querySelector('.loop')

let loopOn = false

loop.addEventListener('click', () => {
    if (loopOn) {
        loopOn = false
        loop.style.backgroundColor = 'grey';
    }
    else {
        loopOn = true
        loop.style.backgroundColor = 'green';
    }
})


// updating song parameters and input bar based on current song time
audioElement.addEventListener('timeupdate', () => {

    let progress = ((audioElement.currentTime / audioElement.duration) * 100);
    currentdur.innerText = convertHMS(audioElement.currentTime)
    audioBar.value = progress

    if (loopOn) {
        if (progress === 100) {
            audioElement.currentTime = 0
            audioBar.value = 0
            audioElement.play()

        }
    }
    else {

        if (progress === 100) {



            let runningNow = audioElement.src

            let indexNow = songSource.indexOf(runningNow)
            if (indexNow < 9) {
                audioElement.src = songSource[indexNow + 1]

            }

            audioElement.currentTime = 0
            audioBar.value = 0
            audioElement.play()
            document.querySelector('.songInfo').innerText = songs[indexNow + 1].Name


        }

    }

})


//Contorlling audiobar value
audioBar.addEventListener('input', () => {

    let progressNow = audioBar.value;
    audioElement.currentTime = (progressNow / 100) * audioElement.duration
    audioBar.value = progressNow
})

let ind = Array.from(document.querySelectorAll('.songItemPlay'))


let makeAllPlays = () => {
    ind.forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })

}


// controlling each song item
ind.forEach((element, i) => {


    element.addEventListener('click', (e) => {

        let playedNow = e.target
        makeAllPlays();

        playedNow.classList.remove('fa-play-circle')
        playedNow.classList.add('fa-pause-circle')


        dur.innerText = convertHMS(audioElement.duration);
        songIndex = i


        audioElement.src = songs[i].filePath
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        document.querySelector('.songInfo').innerText = songs[i].Name

    })



})


// contolling next button
document.querySelector('#next').addEventListener('click', () => {
    if (songIndex === 9) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }

    dur.innerText = convertHMS(audioElement.duration);

    audioElement.src = songs[songIndex].filePath
    audioElement.currentTime = 0
    makeAllPlays()
    ind[songIndex].classList.remove('fa-play-circle')
    ind[songIndex].classList.add('fa-pause-circle')
    audioElement.play()
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
    document.querySelector('.songInfo').innerText = songs[songIndex].Name
    gif.style.opacity = 1



})

//controlling previous button
document.querySelector('#previous').addEventListener('click', () => {
    if (songIndex === 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1
    }

    dur.innerText = convertHMS(audioElement.duration);

    audioElement.src = songs[songIndex].filePath
    audioElement.currentTime = 0
    makeAllPlays()
    ind[songIndex].classList.remove('fa-play-circle')
    ind[songIndex].classList.add('fa-pause-circle')
    audioElement.play()
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
    document.querySelector('.songInfo').innerText = songs[songIndex].Name
    gif.style.opacity = 1



})

// playing and pausing song using space bar
document.onkeydown = function (e) {
    if (e.code === 'Space') {
        if (audioElement.paused) {
            audioElement.play()
            masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')


        }
        else {
            audioElement.pause()
            masterPlay.classList.remove('fa-pause-circle')
            masterPlay.classList.add('fa-play-circle')
        }
    }
};