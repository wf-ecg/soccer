/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  revised 2017-11-21

  USE: as a singleton function
  - init with date to auto-zero debug level
  - value of function is the debug number
  - takes console method name + args
  - always debugs for localhosts

 */
define([], function () {
  'use strict';

  var W = window;

  // - - - - - - - - - - - - - - - - - -
  // DEFINE

  var loc = W.location.hostname === 'localhost';
  var bug = 0 + loc;

  var bases = 'debug info log warn'.split(' ');
  var xtras = 'group groupCollapsed groupEnd'.split(' ');
  var meths = bases.concat(xtras);

  function Dbug(lvl, etc) {
    // lvl is either a number threshold or a log type method name
    if (bug > 0 && etc) {
      etc = [].slice.call(arguments, 1);
      try {
        Dbug[lvl].apply(null, etc);
      } catch (err) {
        W.console.error(err);
      }
    } else {
      return isNaN(lvl) ? bug : (bug > lvl);
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  Dbug.valueOf = function () {
    return bug;
  };

  Dbug.festoon = function (obj, fn) {
    var e, i;
    for (i = 0; i < meths.length; i++) {
      e = meths[i];
      obj[e] = fn || W.console[e];
    }
    return obj;
  };

  Dbug.mute = function (obj) { // stop applying to console
    obj = obj || this;
    return this.festoon(obj, function ( /**/ ) {});
  };

  Dbug.silent = function () { // stop most of console
    Dbug.mute(this);
    Dbug.mute(W.console);
  };

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function init(date) {
    bug += Number(new Date(date) > new Date());
    return Dbug.festoon(Dbug);
  }

  return init;
});

/*

  // invasive console

*/
