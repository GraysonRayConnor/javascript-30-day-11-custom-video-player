const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fsBtn = document.querySelector(".fullscreen-btn");



function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
console.log(this.dataset.skip);
video.currentTime += parseFloat(this.dataset.skip);
}



let isClicked = false;

function handleRangeUpdate(){
    //Click detection - only for use outside of Chrome
    if(!isClicked){
        return;
    }else{
        video[this.name] = this.value;
        console.log(this.value);
        console.log(this.name);
    }
}

function handleProgress(){
    console.log(video.currentTime);
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreenBtn(){
    video.requestFullscreen();
}



video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(skipBtn => skipBtn.addEventListener("click", skip));

//Works in Chrome
//ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

//Doesn't work in Chrome but does work in other browsers
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousedown", () => isClicked = true));
ranges.forEach(range => range.addEventListener("mouseup", () => isClicked = false));
ranges.forEach(range => range.addEventListener("mouseout", () => isClicked = false));

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => isClicked && scrub(e));
progress.addEventListener("mousedown", () => isClicked = true);
progress.addEventListener("mouseup", () => isClicked = false);
progress.addEventListener("mouseout", () => isClicked = false);

fsBtn.addEventListener("click", fullScreenBtn);


