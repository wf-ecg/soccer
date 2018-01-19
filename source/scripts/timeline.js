/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jqxtn', 'libs/util-dim', 'data',
], function ($, UT, Data) {
  'use strict';
  var NOM = 'Timeline';
  // var W = window;
  var C = console;
  C.debug(NOM, 'loaded');

  var EL = {
    cache: '',
    div: '.timeline .events',
    bar: '.timeline .events table',
    wrap: '.timeline .linewrap',
  };
  var API = Object.create(null);

  function Trivent(time, side, icon) {
    this.time = (time || 55) % 91;
    this.side = side || 'top';
    this.icon = icon || 'goal';
  }

  function _px(n) {
    return (n | 0) + 'px';
  }

  function _pc(n) {
    return (n | 0) + '%';
  }
  $.fn.centerize = function () {
    this.each(function () {
      UT.dim.prox(this);
    });
    return this;
  };

  $.extend(API, {
    EL: EL,
    h: 0,
    w: 0,
    data: null,
    addEvent: function (tv) { // trivent [time, icon, side]
      var icon, point, set, off, pol;
      tv = tv || [];

      if (tv.constructor !== Trivent) {
        tv = new Trivent(tv[0], tv[1], tv[2]);
      }
      off = API.h / 2;
      pol = (tv.side === 'top') ? -1 - off : off; // -1px fixer??
      point = $('<div>').addClass('trivent').attr('data-time', tv.time);
      icon = point.clone();
      set = icon.add(point);

      point.css({
        left: _pc(9),
        top: _px(pol + off),
      }).appendTo(EL.div).addClass('point');

      icon.css({
        backgroundColor: Data.lookup(tv.icon),
        color: tv.icon,
        left: _pc(9),
        top: _px(2 * pol + off),
      }).appendTo(EL.wrap).addClass(tv.icon);

      // new call stack
      UT.delay(0, function () {
        API.moveEvent(tv.time, set.centerize());
      });
      EL.cache = EL.cache.add(set);
    },
    moveEvent: function (time, eles) {
      eles.css({
        left: _pc(API.timeTpc(time)),
      });
    },
    measureBar: function () {
      API.w = EL.bar.outerWidth();
      API.h = EL.bar.outerHeight();
      API.m = API.w / 10; // figure 10% margins
      API.w -= API.m * 2; // inner cells
      return [API.w, API.h];
    },
    timeTpc: function (time) {
      //             factor in lead and tail
      return API.adjustpc(time / 90 * 100);
    },
    pxTpc: function (px) {
      px = px || 0;
      return (px / API.w * 100) | 0;
    },
    pcTpx: function (pc) {
      pc = pc || 100;
      return (API.w * pc / 100) | 0;
    },
    adjustpx: function (num) {
      num *= 0.8; // remove lead and tail (10%)
      num += API.m;
      return num;
    },
    adjustpc: function (num) {
      num *= 0.8; // remove lead and tail (10%)
      num += 10;
      return num;
    },
    reset: function (data) {
      EL.cache.remove();
      API.load(data || API.data);
    },
    load: function (arr) {
      API.data = arr;

      API.measureBar();

      $.each(arr, function () {
        API.addEvent(this);
      });
    },
    init: function (data) {
      data = data || API.data;
      $.reify(EL);
      EL.div.on('click', function () {
        API.reset();
      });
      API.load(data);

      C.debug([NOM, API]);

      API.init = API.reset;
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
