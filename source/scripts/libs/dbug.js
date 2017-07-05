/*global define, window, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  revised 2017-07-05

  USE: as a singleton function
  - init with date to auto-zero debug level
  - value of function is the debug number
  - takes console method name + args
  - always debugs for localhosts
  - override available thru reduceBy()

 */
define([], function () {
  'use strict';

  var W = window;

  // - - - - - - - - - - - - - - - - - -
  // DEFINE
  var loc = W.location.hostname === 'localhost';
  var bug = 0 + loc;

  function Dbug(lvl, etc) {
    etc = [].slice.call(arguments, 1);
    if (bug > 0 && etc.length) {
      try {
        W.console[lvl].apply(W.console, etc);
      } catch (err) {
        W.alert(err);
      }
    } else {
      return isNaN(lvl) ? bug : (bug > lvl);
    }
  }
  Dbug.valueOf = function () {
    return bug;
  };
  Dbug.reduceBy = function (num) {
    return bug -= (Number(num) || 1);
  };

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT
  function init(date) {
    bug += Number(new Date(date) > new Date());
    return Dbug;
  }

  return init;
});
/*



*/
