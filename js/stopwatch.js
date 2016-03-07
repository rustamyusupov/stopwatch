var stopWatch = (function() {
  'use strict';

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
    var hours, minutes, seconds, ms;
    var time = [];

    switch (true) {
      case (diff >= 36000000): //hours
        hours = Math.floor( diff / (60 * 60 * 1000) );
        time[0] = Math.floor( hours / 10 );

      case (diff >= 3600000): // hour
        hours = Math.floor( diff / (60 * 60 * 1000) );
        time[1] = hours % 10;
        diff = diff % (60 * 60 * 1000);

      case (diff >= 600000): // minutes
        minutes = Math.floor( diff / (60 * 1000) );
        time[2] = Math.floor( minutes / 10 );

      case (diff >= 60000): // minute
        minutes = Math.floor( diff / (60 * 1000) );
        time[3] = minutes % 10;
        diff = diff % (60 * 1000);

      case (diff >= 10000): // seconds
        seconds = Math.floor( diff / 1000 );
        time[4] = Math.floor( seconds / 10 );

      default: // second
        seconds = Math.floor( diff / 1000 );
        time[5] = seconds % 10;
        ms = Math.floor( (diff % 1000) / 10 );
        time[6] = Math.floor( ms / 10 );
        time[7] = ms % 10;
    }

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
