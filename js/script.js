'use strict';

var startBtn = document.querySelector('.start-btn');
var resetBnt = document.querySelector('.reset-btn');
var lapBtn = document.querySelector('.lap-btn');
// var fullscreenBtn = document.querySelector('.fullscreen');
var clockDigits = document.querySelectorAll('.stopwatch-clock .clock-digit');
var clockSeparators = document.querySelectorAll('.stopwatch-clock .clock-separator');
var clockDigitsList = document.querySelector('.stopwatch-list');

startBtn.addEventListener('click', startStopTimer);
resetBnt.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

function startStopTimer() {
  stopWatch.state ? stopWatch.stop() : stopWatch.start(setTime);

  tglStartStopCaption();
}

function resetTimer() {
  if (stopWatch.state) tglStartStopCaption();

  stopWatch.reset();

  hideElem(clockSeparators[0]);
  hideElem(clockSeparators[1]);

  for (var i = 0; i < clockDigits.length; i++) {
    if (i < 5) hideElem(clockDigits[i]);

    clockDigits[i].innerHTML = 0;
  }
}

function lapTimer() {
  var time = stopWatch.lap();

  addListItem(time);
}

function setTime(time) {
  for (var i = 0; i < time.length; i++) {
    if ( !(i in time) ) continue;

    if (1 in time) showElem(clockSeparators[0]);
    if (3 in time) showElem(clockSeparators[1]);

    showElem(clockDigits[i]);
    clockDigits[i].innerHTML = time[i];
  }
}

function showElem(element) {
  if ( !element.classList.contains('hidden') ) return;

  element.classList.remove('hidden');
}

function hideElem(element) {
  element.classList.add('hidden');
}

function tglStartStopCaption() {
  var dataCaption = startBtn.getAttribute('data-caption');

  startBtn.setAttribute('data-caption', startBtn.innerHTML);
  startBtn.innerHTML = dataCaption;
}

function addListItem(time) {
  var li = document.createElement('li');
  var html;

  html = '<div class="list-item">';

  switch (true) {
    case (0 in time):
      html += '<span class="clock-digit">' + time[0] + '</span>';
    case (1 in time):
      html += '<span class="clock-digit">' + time[1] + '</span>';
      html += '<span class="clock-separator">h</span>';
    case (2 in time):
      html += '<span class="clock-digit">' + time[2] + '</span>';
    case (3 in time):
      html += '<span class="clock-digit">' + time[3] + '</span>';
      html += '<span class="clock-separator">m</span>';
    case (4 in time):
      html += '<span class="clock-digit">' + time[4] + '</span>';
    default:
      html += '<span class="clock-digit">' + time[5] + '</span>';
      html += '<span class="clock-separator">s</span>'
      html += '<span class="clock-digit clock-digit-small">' + time[6] + '</span>';
      html += '<span class="clock-digit clock-digit-small">' + time[7] + '</span>';
      html += '</div>';
  }

  li.innerHTML = html;
  clockDigitsList.insertBefore(li, clockDigitsList.childNodes[0]);
}

//fullscreenBtn.addEventListener("click", toggleFullScreen);
//document.addEventListener('webkitfullscreenchange', tglFSBtnImg);
//document.addEventListener('mozfullscreenchange', tglFSBtnImg);
//document.addEventListener("MSFullscreenChange", tglFSBtnImg);
//document.addEventListener('fullscreenchange', tglFSBtnImg);
//
//function tglFSBtnImg() {
//  fullscreenBtn.classList.toggle("fullscreen-exit");
//}
//
//function toggleFullScreen() {
//  var docEl = document.documentElement;
//
//  if (!document.fullscreenElement &&
//      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
//    if (docEl.requestFullscreen) {
//      docEl.requestFullscreen();
//    } else if (docEl.msRequestFullscreen) {
//      docEl.msRequestFullscreen();
//    } else if (docEl.mozRequestFullScreen) {
//      docEl.mozRequestFullScreen();
//    } else if (docEl.webkitRequestFullscreen) {
//      docEl.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//    }
//  } else {
//    if (document.exitFullscreen) {
//      document.exitFullscreen();
//    } else if (document.msExitFullscreen) {
//      document.msExitFullscreen();
//    } else if (document.mozCancelFullScreen) {
//      document.mozCancelFullScreen();
//    } else if (document.webkitExitFullscreen) {
//      document.webkitExitFullscreen();
//    }
//  }
//}
