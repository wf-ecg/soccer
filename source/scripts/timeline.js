/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'libs/util-dim', 'data'], function ($, UT, Data) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var EL = {
    cache: '',
    div: '.timeline .events',
    bar: '.timeline .events table',
    wrap: '.timeline .linewrap',
  };
  var name = 'timeline';
  var MY = Object.create(null);

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

  $.extend(MY, {
    _EL: EL,
    h: 0,
    w: 0,
    data: null,
    addEvent: function (tv) { // trivent [time, icon, side]
      var icon, point, set, off, pol;
      tv = tv || [];

      if (tv.constructor !== Trivent) {
        tv = new Trivent(tv[0], tv[1], tv[2]);
      }
      off = MY.h / 2;
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
        MY.moveEvent(tv.time, set.centerize());
      });
      EL.cache = EL.cache.add(set);
    },
    moveEvent: function (time, eles) {
      eles.css({
        left: _pc(MY.timeTpc(time)),
      });
    },
    measureBar: function () {
      MY.w = EL.bar.outerWidth();
      MY.h = EL.bar.outerHeight();
      MY.m = MY.w / 10; // figure 10% margins
      MY.w -= MY.m * 2; // inner cells
      return [MY.w, MY.h];
    },
    timeTpc: function (time) {
      //             factor in lead and tail
      return MY.adjustpc(time / 90 * 100);
    },
    pxTpc: function (px) {
      px = px || 0;
      return (px / MY.w * 100) | 0;
    },
    pcTpx: function (pc) {
      pc = pc || 100;
      return (MY.w * pc / 100) | 0;
    },
    adjustpx: function (num) {
      num *= 0.8; // remove lead and tail (10%)
      num += MY.m;
      return num;
    },
    adjustpc: function (num) {
      num *= 0.8; // remove lead and tail (10%)
      num += 10;
      return num;
    },
    reset: function (data) {
      EL.cache.remove();
      MY.load(data || MY.data);
    },
    load: function (arr) {
      MY.data = arr;

      MY.measureBar();

      $.each(arr, function () {
        MY.addEvent(this);
      });
    },
    init: function (data) {
      if (MY.inited) {
        MY.reset(data);
      } else {
        MY.inited = true;
        data = data || MY.data;
        $.reify(EL);
        EL.div.on('click', function () {
          MY.reset();
        });
        MY.load(data);

        C.debug([name, MY]);
      }
    },
  });

  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
