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
    return Math.round(n) + 'px';
  }

  function _pc(n) {
    return Math.round(n) + '%';
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

  function timeTpc(time) { // factor in lead and tail
    return time / 90 * 100;
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
    bar: '.timeline .time',
    wrap: '.timeline .linewrap',
  };
  API = Object.create({
    EL: EL,
    h: 0,
    w: 0,
    data: null,
    addEvent: function (tv) { // trivent [time, icon, side]
      var icon, point, set, mid, vrt;
      tv = tv || [];

      if (tv.constructor !== Trivent) {
        tv = new Trivent(tv[0], tv[1], tv[2]);
      }
      mid = this.h / 2;
      vrt = (tv.side === 'top' ? -mid : mid);
      point = $('<div>').addClass('trivent').attr('data-time', tv.time);
      icon = point.clone();
      set = icon.add(point);

      point.css({
        left: _pc(0),
        top: _px(1.2 * vrt + mid),
      }).appendTo(EL.div).addClass('point');

      icon.css({
        backgroundColor: Model.lookup(tv.icon),
        color: tv.icon,
        left: _pc(0),
        top: _px(2 * vrt + mid),
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
      // this.m = this.w / 10; // figure 10% margins
      // this.w -= this.m * 2; // inner cells
      return [this.w, this.h];
    },
    reset: function (data) {
      EL.cache.remove();
      this.load(data);
    },
    load: function (data) {
      this.data = data || this.data;

      this.measureBar();

      $.each(this.data, function () {
        API.addEvent(this);
      });
    },
    init: function (data) {
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
