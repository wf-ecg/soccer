/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Manage match-timeline eles: cards, goals
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'libs/util-dim',
], function ($, U) {
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
      U.dim.centerMiddle(this);
    });
  }

  function timePercent(time) {
    return U.pct(time / 90 * 100);
  }

  function _moveEvent() {
    this.eles.css({
      left: this.time,
    });
  }

  function makeTdiv(top, type) {
    var div = $('<div>').addClass('trivent ' + type);

    return div.css({
      left: U.pct(0),
      top: U.pix(top),
    }).appendTo(EL.evts);
  }

  function Trivent(time, side, icon) {
    var mid = API.h / 2;
    var vrt = (side === 'top' ? -mid : mid);
    var idiv, pdiv;

    time = (time || 55) % 91;
    side = side || 'top';
    icon = icon || 'goal';

    // add first for z-index
    pdiv = makeTdiv(1.2 * vrt + mid, 'point');
    idiv = makeTdiv(2 * vrt + mid, icon);

    this.time = timePercent(time);
    this.eles = idiv.add(pdiv);

    centerize(this.eles);
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    h: 0,
    w: 0,
    data: null,
    addEvent: function (data) { // [time, side, icon]
      var obj = new Trivent(...data);

      // allow next frame to be css transition
      U.delay(0, _moveEvent.bind(obj));
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
        API.addEvent(this);
      });
    },
    init: function () {
      this.init = $.noop;
      $.reify(EL);

      this.measureBar();
      // EL.evts.on('click', API.load.bind(API));
      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
