/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-01-25
  IDEA    Manage match-timeline eles: cards, goals
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'libs/util-dim', 'model',
], function ($, UT, Model) {
  'use strict';

  var API, EL;
  var NOM = 'Timeline';
  var C = console;
  // var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  $.fn.centerize = function () {
    this.each(function () {
      UT.dim.prox(this);
    });
    return this;
  };

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

  // function pxTpc(px) {
  //   px = px || 0;
  //   return (px / API.w * 100) | 0; }
  // function pcTpx(pc) {
  //   pc = pc || 100;
  //   return (API.w * pc / 100) | 0; }
  // function adjustpx(num) {
  //   num *= 0.8; // remove lead and tail (10%)
  //   num += API.m;
  //   return num; }

  function adjustpc(num) { // remove lead and tail (10%)
    return num * 0.8 + 10;
  }

  function timeTpc(time) { // factor in lead and tail
    return adjustpc(time / 90 * 100);
  }

  function moveEvent(time, eles) {
    eles.css({
      left: _pc(timeTpc(time)),
    });
  }

  // - - - - - - - - - - - - - - - - - -

  EL = {
    cache: '',
    div: '.timeline .events',
    bar: '.timeline .events table',
    wrap: '.timeline .linewrap',
  };
  API = Object.create({
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
      off = this.h / 2;
      pol = (tv.side === 'top') ? -1 - off : off; // -1px fixer??
      point = $('<div>').addClass('trivent').attr('data-time', tv.time);
      icon = point.clone();
      set = icon.add(point);

      point.css({
        left: _pc(9),
        top: _px(pol + off),
      }).appendTo(EL.div).addClass('point');

      icon.css({
        backgroundColor: Model.lookup(tv.icon),
        color: tv.icon,
        left: _pc(9),
        top: _px(2 * pol + off),
      }).appendTo(EL.wrap).addClass(tv.icon);

      // new call stack
      UT.delay(0, function () {
        moveEvent(tv.time, set.centerize());
      });
      EL.cache = EL.cache.add(set);
    },
    measureBar: function () {
      this.w = EL.bar.outerWidth();
      this.h = EL.bar.outerHeight();
      this.m = this.w / 10; // figure 10% margins
      this.w -= this.m * 2; // inner cells
      return [this.w, this.h];
    },
    reset: function (data) {
      EL.cache.remove();
      this.load(data || this.data);
    },
    load: function (arr) {
      this.data = arr;

      this.measureBar();

      $.each(arr, function () {
        API.addEvent(this);
      });
    },
    init: function (data) {
      data = data || this.data;
      $.reify(EL);
      EL.div.on('click', function () {
        API.reset();
      });
      this.load(data);

      C.debug([NOM, API]);

      this.init = this.reset;
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
