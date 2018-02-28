/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-28
  IDEA    Generate (svg)
  NOTE    ???
  TODO    ???

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Dial';
  // var W = window;
  var C = console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var EL = {
    svg: $('<svg viewBox="-20 -20 40 40"><circle r="15.915"></circle></svg>'),
    input: $('<input type="range" min="0" max="100" value="50" step="1">'),
  };
  var CF = {
    lastval: +EL.input[0].value,
    stepbase: +EL.input[0].step,
    defs: {
      circle: {
        fill: 'transparent',
        stroke: 'red',
        strokeDasharray: '100 100',
        strokeWidth: '8',
        transform: 'rotate(-90deg)',
        transition: 'all 0.2s',
      },
      input: {
        position: 'absolute',
      },
      svg: {
        height: '100%',
      },
    },
  };
  var UL = {
    invert: function (a, b) {
      return -b + a;
    },
    normalize: function (val, max, off) {
      return Math.round(val * (100 / max) + (off || 0));
    },
    selfclean: function () {
      this.removeEventListener('transitionend', UL.selfclean);
      this.style.transform = '';
    },
    chromeclean: function () {
      this.addEventListener('transitionend', UL.selfclean);
      this.style.transform = 'translate3d(0, 0, 0)';
    },
    changestep: function (evt) {
      this.step = CF.stepbase * (evt.shiftKey ? 10 : 1);
    },
  };

  function setDial(data, val, max) {
    val = {
      input: val || 0,
      max: max || 100,
      off: 0,
    };
    val.norm = UL.normalize(val.input, val.max, val.off);
    val.output = UL.invert(val.norm, val.max + val.off);

    data.circle[0].style.strokeDashoffset = val.output;
    UL.chromeclean.bind(data.svg[0])();
    // C.log('setDial', val);
  }

  // - - - - - - - - - - - - - - - - - -

  function _changeAmount(evt) {
    var svg = $(this).data(NOM);
    var val = +svg.input.val();
    if (evt.which === 0 || val === CF.lastval) return;
    CF.lastval = val;
    setDial(svg, val);
  }

  function setColor(str) {
    this.circle.css('stroke', str || 'transparent');
    C.log(NOM, this, str);
  }

  function make() {
    var self = {};

    self.svg = EL.svg.clone();
    self.circle = self.svg.find('circle');
    self.input = EL.input.clone().data(NOM, self);

    self.input //
      .on('change mousemove', _changeAmount) //
      .on('keyup keydown', UL.changestep);

    self.setColor = setColor;

    C.log(NOM, self);
    return self;
  }

  // - - - - - - - - - - - - - - - - - -

  EL.circle = EL.svg.find('circle');

  EL.circle.css(CF.defs.circle);
  EL.input.css(CF.defs.input);
  EL.svg.css(CF.defs.svg);

  return {
    make: make,
  };
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*





 */
