/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Manage match-timeline eles: cards, goals
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'libs/util-dim',
], function ($, UT) {
  'use strict';

  var API, EL;
  var NOM = 'Timeline';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  EL = Object.create({
    line: '.the-timeline .time',
    evts: '.the-timeline .events',
    wrap: '.the-timeline .linewrap',
  });

  // - - - - - - - - - - - - - - - - - -

  function centerize(sel) {
    return $(sel).each(function () {
      UT.dim.centerMiddle(this);
    });
  }

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

  function timePercent(time) {
    return time / 90 * 100;
  }

  function moveEvent(time, eles) {
    eles.css({
      left: _pc(timePercent(time)),
    });
  }

  function addTriv(top, type) {
    var div = $('<div>').addClass('trivent ' + type);
    div.css({
      left: _pc(0),
      top: _px(top),
    });
    return div.appendTo(EL.evts);
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    h: 0,
    w: 0,
    data: null,
    addEvent: function (obj) { // trivent [time, icon, side]
      var triv, point, duo;
      var mid = this.h / 2;
      var vrt = (obj.side === 'top' ? -mid : mid);

      // add first for z-index
      point = addTriv(1.2 * vrt + mid, 'point');
      triv = addTriv(2 * vrt + mid, obj.icon);
      duo = triv.add(point);

      // new call stack
      UT.delay(0, function () {
        moveEvent(obj.time, centerize(duo));
      });
    },
    measureBar: function () {
      this.w = EL.line.outerWidth();
      this.h = EL.line.outerHeight();
    },
    load: function (data) {
      this.init();

      EL.evts.empty();

      this.data = Array.isArray(data) ? data : this.data;

      $.each(this.data, function () {
        API.addEvent(new Trivent(...this));
      });
    },
    init: function () {
      this.init = $.noop;
      $.reify(EL);

      this.measureBar();
      EL.evts.on('click', API.load.bind(API));
      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
