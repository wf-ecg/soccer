/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Generate and modify pass-accuracy divs (boxes)
  NOTE    ???
  TODO    ???

 */
define(['jqxtn',
], function ($) {
  'use strict';

  var API, EL;
  var NOM = 'Accuracy';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  EL = Object.create({
    div: '.the-accuracy .limit',
    maj: '.the-accuracy .limit .major',
    min: '.the-accuracy .limit .minor',
  });

  // - - - - - - - - - - - - - - - - - -

  function getColor(ele) {
    return ele.data('color');
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    setPercent: function (num) {
      num = (num || 0.5);

      if (num <= 1) num = Math.abs(num * 100); // decimal to percent
      num = Math.round(num) % 100;

      if (num < 50) {
        C.warn('normalize', num);
        num = 100 - num;
        this.swapColor();
      }
      this.setValue(EL.maj, num); // mod major div
      this.setValue(EL.min, 100 - num); // mod minor
    },
    setValue: function (ele, val) {
      if (val < 44) {
        ele.find('h3').text('');
      } else {
        ele.find('h3').text(val + '%');
      }
      ele.css({
        height: val + '%',
      }).data('value', val); // store
    },
    setColor: function (ele, val) {
      ele.css({
        backgroundColor: val,
      }).data('color', val); // store
    },
    swapColor: function () {
      this.setColors(getColor(EL.min), getColor(EL.maj));
    },
    setColors: function (c1, c2) {
      // c2 = '#999';
      this.setColor(EL.maj, c1);
      this.setColor(EL.min, c2);
    },
    load: function (num, tints) {
      this.init();

      this.setColors(...tints);
      this.setPercent(num);
    },
    init: function () {
      this.init = $.noop;
      $.reify(EL);

      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
