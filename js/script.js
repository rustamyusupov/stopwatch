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



function resetTimer() {
  clearInterval(timerId);
}

function lapTime() {

}

function changeBtnCaption() {
  var dataCaption = startBtn.getAttribute("data-caption");

  if (dataCaption != startBtn.innerHTML) {
    startBtn.setAttribute("data-caption", startBtn.innerHTML);
    startBtn.innerHTML = dataCaption;
  } else {
    startBtn.setAttribute("data-caption", startBtn.innerHTML);
    startBtn.innerHTML = dataCaption;
  }
}

function showHideElem(element) {
  element.classList.toggle("hidden");
}

function changeBtnImage() {
  fullscreenBtn.classList.toggle("fullscreen-exit");
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
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



var clockDigit = document.querySelector(".stopwatch-clock .clock-digit");
var startTime;
var timerId;

function startStopTimer() {
  // changeBtnCaption();

  startTime = now();
  timerId = setInterval(setTime, 1);
}


function setTime() {

  clockDigit.innerHTML = formatTime( now() - startTime );
}

function now() {
  return (new Date()).getTime();
}

function formatTime(time) {
  var hours = minutes = seconds = ms = 0;
  var h1 = h2 = m1 = m2 = s1 = s2 = 0;

  hours = Math.floor( time / (60 * 60 * 1000) );
  h1 = Math.floor( hours / 10 );
  h2 = hours % 10;
  time = time % (60 * 60 * 1000);

  minutes = Math.floor( time / (60 * 1000) );
  m1 = Math.floor( minutes / 10 );
  m2 = minutes % 10;
  time = time % (60 * 1000);

  seconds = Math.floor( time / 1000 );
  s1 = Math.floor( seconds / 10 );
  s2 = seconds % 10;

  ms = Math.floor( (time % 1000) / 10 );

	return s1 + "" + s2 + ":" + ms;
}
