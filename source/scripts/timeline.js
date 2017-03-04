/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'libs/util-dim', 'data'], function ($, U, Data) {
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
  var self = Object.create(null);

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
      U.dim.prox(this);
    });
    return this;
  };

  $.extend(self, {
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
      off = self.h / 2;
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
      U.delay(0, function () {
        self.moveEvent(tv.time, set.centerize());
      });
      EL.cache = EL.cache.add(set);
    },
    moveEvent: function (time, eles) {
      eles.css({
        left: _pc(self.timeTpc(time)),
      });
    },
    measureBar: function () {
      self.w = EL.bar.outerWidth();
      self.h = EL.bar.outerHeight();
      self.m = self.w / 10; // figure 10% margins
      self.w -= self.m * 2; // inner cells
      return [self.w, self.h];
    },
    timeTpc: function (time) {
      //             factor in lead and tail
      return self.adjustpc(time / 90 * 100);
    },
    pxTpc: function (px) {
      px = px || 0;
      return (px / self.w * 100) | 0;
    },
    pcTpx: function (pc) {
      pc = pc || 100;
      return (self.w * pc / 100) | 0;
    },
    adjustpx: function (num) {
      num *= 0.8; // remove lead and tail (10%)
      num += self.m;
      return num;
    },
    adjustpc: function (num) {
      num *= 0.8; // remove lead and tail (10%)
      num += 10;
      return num;
    },
    reset: function (data) {
      EL.cache.remove();
      self.load(data || self.data);
    },
    load: function (arr) {
      self.data = arr;

      self.measureBar();

      $.each(arr, function () {
        self.addEvent(this);
      });
    },
    init: function (data) {
      if (self.inited) {
        self.reset(data);
      } else {
        self.inited = true;
        data = data || self.data;
        $.reify(EL);
        EL.div.on('click', function () {
          self.reset();
        });
        self.load(data);

        C.debug([name, self]);
      }
    },
  });

  return self;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
