/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';
  var W = window;
  var C = console;
  void($);

  function _stringify(k, v) {
    return (v && v.join && typeof v[1] !== 'object') ? v.join('|') : v;
  }

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
    stringify: function (obj) {
      return JSON.stringify(obj, _stringify, 4);
    },
    pct: function (n) {
      return Math.round(n || 0) + '%';
    },
    pix: function (n) {
      return Math.round(n || 0) + 'px';
    },
  };

  Utils.initBegin();

  /*
   Polyfills
   */

  // if (typeof W.Object.create !== 'function') {}

  return Utils;
});

/*



 */
