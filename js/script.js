var fullscreenBtn = document.querySelector(".fullscreen");

fullscreenBtn.addEventListener("click", toggleFullScreen);
document.addEventListener('webkitfullscreenchange', changeBtnImage);
document.addEventListener('mozfullscreenchange', changeBtnImage);
document.addEventListener("MSFullscreenChange", changeBtnImage);
document.addEventListener('fullscreenchange', changeBtnImage);

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
