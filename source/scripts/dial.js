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
    svg: $('<svg viewBox="-50 -50 100 100"><circle r="1"></circle></svg>'),
    input: $('<input type="range" min="0" max="100" value="50" step="1">'),
  };
  var CF = {
    lastval: +EL.input[0].value,
    stepbase: +EL.input[0].step,
    defs: {
      circle: {
        fill: 'transparent',
        stroke: 'gray',
        strokeDasharray: '100 100',
        strokeWidth: '1',
        transform: 'rotate(-90deg)',
        transition: 'all 0.2s',
      },
      input: {
        marginTop: '-3rem',
        opacity: 0.5,
        width: '100%',
      },
      svg: {
        opacity: 0.8,
        position: 'absolute',
      },
    },
  };
  var UL = {
    calcmax: function (r) {
      return Math.round(Math.PI * 2 * r);
    },
    invert: function (a, b) {
      return -b + a;
    },
    normalize: function (val, max) {
      return Math.round(val * (max / 100));
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

  function setDial(data, val) {
    val = {
      input: val || 0,
      max: data.maxValue,
    };
    val.norm = UL.normalize(val.input, val.max);
    val.output = UL.invert(val.norm, val.max);

    data.circle[0].style.strokeDashoffset = val.output;
    // UL.chromeclean.bind(data.svg[0])();
    data.setDial = val;
  }

  // - - - - - - - - - - - - - - - - - -

  function _changeAmount(evt) {
    var dial = $(this).data(NOM);
    var val = +dial.input.val();
    if (evt.which === 0 || val === this.lastval) return;
    this.lastval = val;
    setDial(dial, val);
  }

  var proto = {
    lastValue: 1,
    maxValue: 100,
    setColor: function (str) {
      this.circle.css('stroke', str || 'transparent');
      return this;
    },
    setValue: function (num) {
      if (num) this.input.val(num);
      this.input.change();
      return this;
    },
    setWeight: function (num) {
      var rad = 50 - num / 2;
      var cir = UL.calcmax(rad);
      this.maxValue = cir;
      this.circle.attr('r', rad);
      this.circle.css({
        strokeWidth: num,
        strokeDasharray: cir + ',' + cir,
      });
      return this.setValue();
    },
  };

  function make(color, value, weight) {
    var self = Object.create(proto);

    self.svg = EL.svg.clone();
    self.circle = self.svg.find('circle');
    self.input = EL.input.clone().data(NOM, self);
    self.setColor(color);
    self.setValue(value || 33);

    self.input //
      .on('change mousemove', _changeAmount) //
      .on('keyup keydown', UL.changestep);

    self.setWeight(weight || 15); // hack relies on event
    C.log(NOM, self);

    return self;
  }

  // - - - - - - - - - - - - - - - - - -

  EL.circle = EL.svg.find('circle');

  EL.circle.css(CF.defs.circle);
  EL.input.css(CF.defs.input);
  EL.svg.css(CF.defs.svg);

  return {
    UL: UL,
    make: make,
  };
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*





 */
