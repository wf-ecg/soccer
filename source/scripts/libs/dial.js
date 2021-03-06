/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-01
  IDEA    Generate dial object elements accessors (svg)
  NOTE    ???
  TODO    ???

 */
define(['jquery',
], function ($) {
  'use strict';

  var CF, EL, UT;
  var NOM = 'Dial';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  CF = Object.create({
    color: 'gray',
    flip: false,
    pitch: 0,
    radius: 50,
    value: 25,
    weight: 15,
    circle: {
      fill: 'transparent',
      stroke: 'gray',
      strokeDasharray: '100 100',
      strokeWidth: '1',
      transition: 'all 0.2s',
    },
    input: {
      top: '-1rem',
      opacity: 0.2,
      position: 'relative',
      width: '100%',
    },
    svg: {
      opacity: 1,
      position: 'absolute',
    },
  });

  EL = Object.create({
    svg: $('<svg viewBox="-50 -50 100 100"><circle r="1"><title></title></circle></svg>'),
    input: $('<input type="range" min="0" max="100" value="50" step="1">'),
  });

  UT = Object.create({
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
      ele.removeEventListener('transitionend', UT.selfclean);
      ele.style.transform = '';
    },
    chromeclean: function () {
      var ele = this;
      ele.addEventListener('transitionend', UT.selfclean);
      ele.style.transform = 'translate3d(0, 0, 0)';
    },
    setOffset: function (data, val) {
      var vs = data.vals;

      vs.input = val || 0;
      vs.norm = UT.normalize(vs.input, vs.max);
      vs.output = UT.invert(vs.norm, vs.max);

      data.circle[0].style.strokeDashoffset = vs.output;
      // UT.chromeclean.bind(data.svg[0])(); // if redraws funny
    },
  });

  // - - - - - - - - - - - - - - - - - -
  // HANDLERS

  var _changeAmount = function (evt) {
    var data = $(this).data(NOM);
    var val = +data.input.val();

    if (evt.which === 0 || val === data.vals.last) return;
    data.vals.last = val;

    UT.setOffset(data, val);
  };

  var _changeStep = function (evt) {
    var data = $(this).data(NOM);
    var num = data.vals.step * (evt.shiftKey ? 10 : 1);

    data.input[0].step = num;
  };

  // - - - - - - - - - - - - - - - - - -

  var proto = {
    vals: {},
    setColor: function (str) {
      this.circle.css('stroke', str || 'transparent');
      return this;
    },
    setTip: function (str) {
      this.svg.find('title').text(str);
      this.input.attr('title', str);
      return this;
    },
    setInput: function (num, max, min) {
      if (!max) {
        [num, max, min] = [100, num, 0];
      }
      this.input.attr({
        max: max,
        min: min,
      }).val(num).change();

      return this;
    },
    setTransform: function (flip, pitch) {
      var x = flip ? -1 : 1;
      var r = -90 + pitch * x;

      if ($('html').is('.msie')) {
        this.circle.attr({
          transform: `scale(${x}, 1) rotate(${r})`, // scale(-1, 1) rotate(-90)
        });
      } else {
        this.circle.css({
          transform: `scaleX(${x}) rotate(${r}deg)`, // 'scaleX(-1) rotate(-90deg)'
        });
      }
    },
    setWeight: function (num) {
      var data = this;
      var radius = (CF.radius - 1) - (num / 2); // -1px for breathing room
      var circum = UT.calcmax(radius);

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
      data.setTransform(cf.flip, cf.pitch);

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

    if (W._dbug > 2) C.log(NOM, 'construct', self);

    return self.init(cf);
  }

  // - - - - - - - - - - - - - - - - - -
  // INITS

  EL.circle = EL.svg.find('circle');
  EL.circle.css(CF.circle);
  EL.input.css(CF.input);
  EL.svg.css(CF.svg);

  return {
    EL: EL,
    UT: UT,
    make: construct,
  };
});

/*



 */
