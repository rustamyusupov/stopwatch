var startBtn = document.querySelector(".start-btn");
var resetBnt = document.querySelector(".reset-btn");
var lapBtn = document.querySelector(".lap-btn");
var fullscreenBtn = document.querySelector(".fullscreen");

startBtn.addEventListener("click", startStopTimer);
resetBnt.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTime);
fullscreenBtn.addEventListener("click", toggleFullScreen);
document.addEventListener('webkitfullscreenchange', changeBtnImage);
document.addEventListener('mozfullscreenchange', changeBtnImage);
document.addEventListener("MSFullscreenChange", changeBtnImage);
document.addEventListener('fullscreenchange', changeBtnImage);

function showHideElem(element) {
  element.classList.toggle("hidden");
}

function changeBtnImage() {
  fullscreenBtn.classList.toggle("fullscreen-exit");
}

function toggleFullScreen() {
  var docEl = document.documentElement;

  if (!document.fullscreenElement &&
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


function toggleStartStop() {
  var dataCaption = startBtn.getAttribute("data-caption");

  startBtn.setAttribute("data-caption", startBtn.innerHTML);
  startBtn.innerHTML = dataCaption;
}

var clockDigit = document.querySelector(".stopwatch-clock .clock-digit");
var clockDigitList = document.querySelector(".stopwatch-list .clock-digit");

function startStopTimer() {
  if (stopWatch.state) {
    stopWatch.stop();
  } else {
    stopWatch.start(setTime);
  }

  toggleStartStop();
}

function resetTimer() {

  // if not paused
  if (stopWatch.state) {
    toggleStartStop();
  }

  stopWatch.reset();
  clockDigit.innerHTML = "00:00:00";
  clockDigitList.innerHTML = "00:00:00";
}

function lapTime() {
  var clockDigitList = document.querySelector(".stopwatch-list .clock-digit");
  var time = stopWatch.lap();
  clockDigitList.innerHTML = time.m1 + "" + time.m2 + ":" + time.s1 + "" + time.s2 + ":" + time.ms1 + "" + time.ms2;
}

function setTime(time) {
  clockDigit.innerHTML = time.m1 + "" + time.m2 + ":" + time.s1 + "" + time.s2 + ":" + time.ms1 + "" + time.ms2;
}
