/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';
  var W = window;
  var C = console;
  void($);

  var Utils = {
    delay: function (ms, fn) {
      if (!fn) {
        fn = ms;
        ms = 999;
      }
      W.setTimeout(fn, ms > 9 ? ms : 9);
    },
    hasdef: function (arg) {
      return (typeof arg !== 'undefined');
    },
    initBegin: function () {
      C.group('Utils loading');
    },
    initFinish: function () {
      C.groupEnd();
    },
  };

  Utils.initBegin();
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  /*
   Polyfills
   */

  // if (typeof W.Object.create !== 'function') {}

  return Utils;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
