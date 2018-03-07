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

  API = Object.create({
    setPercent: function (num) {
      var c1 = this.color1;
      var c2 = this.color2;

      if (num <= 1) num *= 100; // decimal to percent
      num = Math.round(num) % 100;

      this.setValue(EL.maj, num, c1, 'success');
      this.setValue(EL.min, 100 - num, c2, 'failure');
    },
    setValue: function (ele, num, color, tip) {
      ele.find('h3').text(num < 44 ? '' : num + '%');

      ele.css({
        backgroundColor: color,
        height: num + '%',
      }).attr('title', tip);
    },
    load: function (accuracy, tints) {
      this.init();

      this.color1 = tints[0];
      this.color2 = '#333';

      this.setPercent(accuracy);
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
