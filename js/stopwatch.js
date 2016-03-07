var stopWatch = (function() {
  "use strict";

  var timerId;
  var startAt = 0;
  var stopAt = 0;
  var lapTime = 0;
  var state = false;

  var start = function(func) {
    // Last start time or not running
    startAt = startAt ? startAt : now();

    this.state = true;

    timerId = setInterval( function() {
      // Elapsed time from the start
      var time = formatTime( now() - startAt + stopAt );

      func(time);
    }, 1 );
  };

  var stop = function() {
    // Time on the clock
    stopAt = startAt ? stopAt + now() - startAt : stopAt;

    startAt = 0;
    this.state = false;

    clearInterval(timerId);
  };

  var reset = function() {
    startAt = stopAt = lapTime= 0;

    this.stop();
  };

  var lap = function() {
    //// Time on the clock
    //var clockTime = startAt ? stopAt + now() - startAt : stopAt;
    //
    //// Last lap time
    //var lastLap = clockTime - lapTime;
    //
    //// New lap
    //lapTime = clockTime;
    //
    //return formatTime( lastLap );

    // Time on the clock
    var clockTime = startAt ? stopAt + now() - startAt : stopAt;

    // Last lap time
    var lastLap = formatTime( clockTime - lapTime );

    // New lap
    lapTime = clockTime;

    return lastLap;
  };

  var now = function() {
    return (new Date()).getTime();
  };

  var formatTime = function(diff) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var ms = 0;
    var time = {};

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

    return time;
  };

  return {
    start: start,
    stop: stop,
    reset: reset,
    lap: lap,
    state: state
  }
})();
