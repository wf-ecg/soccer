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

  var CF = {
    color: 'gray',
    value: 25,
    weight: 15,
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
  var EL = {
    svg: $('<svg viewBox="-50 -50 100 100"><circle r="1"></circle></svg>'),
    input: $('<input type="range" min="0" max="100" value="50" step="1">'),
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
      var ele = this;
      ele.removeEventListener('transitionend', UL.selfclean);
      ele.style.transform = '';
    },
    chromeclean: function () {
      var ele = this;
      ele.addEventListener('transitionend', UL.selfclean);
      ele.style.transform = 'translate3d(0, 0, 0)';
    },
    setOffset: function (data, val) {
      var vs = data.vals;

      vs.input = val || 0;
      vs.norm = UL.normalize(vs.input, vs.max);
      vs.output = UL.invert(vs.norm, vs.max);

      data.circle[0].style.strokeDashoffset = vs.output;
      // UL.chromeclean.bind(data.svg[0])(); // if redraws funny
    },
  };

  function _changeAmount(evt) {
    var data = $(this).data(NOM);
    var val = +data.input.val();

    if (evt.which === 0 || val === data.vals.last) return;
    data.vals.last = val;

    UL.setOffset(data, val);
  }

  function _changeStep(evt) {
    var data = $(this).data(NOM);
    var num = data.vals.step * (evt.shiftKey ? 10 : 1);

    data.input[0].step = num;
  }

  // - - - - - - - - - - - - - - - - - -

  var proto = {
    vals: {},
    setColor: function (str) {
      this.circle.css('stroke', str || 'transparent');
      return this;
    },
    setInput: function (num) {
      if (num) this.input.val(num);
      return this;
    },
    setWeight: function (num) {
      var data = this;
      var radius = 50 - num / 2;
      var circum = UL.calcmax(radius);

      data.vals.max = circum;
      data.circle.attr('r', radius);
      data.circle.css({
        strokeWidth: num,
        strokeDasharray: circum + ',' + circum,
      });

      return this;
    },
    update: function () {
      this.input.change();
      return this;
    },
    init: function (cf) {
      var data = this;

      data.svg = EL.svg.clone().data(NOM, data);
      data.input = EL.input.clone().data(NOM, data);
      data.circle = data.svg.find('circle');
      data.vals = {
        input: +data.input[0].value,
        last: 0,
        max: 0,
        norm: 0,
        output: 0,
        step: +data.input[0].step,
      };

      data.setInput(cf.value);
      data.setWeight(cf.weight);
      data.setColor(cf.color);

      data.input //
        .on('change mousemove', _changeAmount) //
        .on('keyup keydown', _changeStep);

      data.update(); // hack relies on event
      data.init = 'INITED';

      return data;
    },
  };

  // - - - - - - - - - - - - - - - - - -

  function construct(cf) {
    cf = (typeof cf === 'object') ? cf : {};
    cf = $.extend({}, CF, cf);

    var self = Object.create(proto);

    C.log(NOM, 'construct', self);

    return self.init(cf);
  }

  // - - - - - - - - - - - - - - - - - -

  EL.circle = EL.svg.find('circle');

  EL.circle.css(CF.defs.circle);
  EL.input.css(CF.defs.input);
  EL.svg.css(CF.defs.svg);

  return {
    UL: UL,
    make: construct,
  };
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*





 */
