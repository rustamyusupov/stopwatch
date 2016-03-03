var stopWatch = (function() {
  "use strict";

  var timerId;
  var startAt = 0;
  var stopAt = 0;
  var lapTime = 0;
  var state = false;

  var time = {
    h1: 0,
    h2: 0,
    m1: 0,
    m2: 0,
    s1: 0,
    s2: 0,
    ms1: 0,
    ms2: 0
  };

  var start = function(func) {
    startAt = startAt ? startAt : now();
    this.state = true;

    timerId = setInterval( function() {
      formatTime( now() - startAt + stopAt);

      func(time);
    }, 1 );
  };

  var stop = function() {
    stopAt = startAt ? stopAt + now() - startAt : stopAt;
    startAt = 0;
    this.state = false;

    clearInterval(timerId);
  };

  var reset = function() {
    startAt = stopAt = 0;

    this.stop();
  };

  var lap = function() {

  };

  var now = function() {
    return (new Date()).getTime();
  };

  var formatTime = function(diff) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var ms = 0;

    hours = Math.floor( diff / (60 * 60 * 1000) );
    time.h1 = Math.floor( hours / 10 );
    time.h2 = hours % 10;
    diff = diff % (60 * 60 * 1000);

    minutes = Math.floor( diff / (60 * 1000) );
    time.m1 = Math.floor( minutes / 10 );
    time.m2 = minutes % 10;
    diff = diff % (60 * 1000);

    seconds = Math.floor( diff / 1000 );
    time.s1 = Math.floor( seconds / 10 );
    time.s2 = seconds % 10;

    ms = Math.floor( (diff % 1000) / 10 );
    time.ms1 = Math.floor( ms / 10 );
    time.ms2 = ms % 10;
  };

  return {
    start: start,
    stop: stop,
    reset: reset,
    state: state
  }
})();
