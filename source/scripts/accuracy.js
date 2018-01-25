/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-01-25
  IDEA    Generate and modify pass-accuracy divs (boxes)
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'data',
], function ($, Data) {
  'use strict';

  var API, EL;
  var NOM = 'Accuracy';
  var C = console;
  // var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  // function getValue(ele) {
  //   return ele.data('value'); }

  function getColor(ele) {
    return ele.data('color');
  }

  // - - - - - - - - - - - - - - - - - -

  EL = {
    div: '.accuracy .limit',
    maj: '.accuracy .limit .major',
    min: '.accuracy .limit .minor',
  };
  API = Object.create({
    Data: Data,
    EL: EL,
    percent: function (num) {
      num = num || 0.5;
      num = num % 100;

      if (num <= 1) {
        num = num * 100;
      }
      num = num | 0;

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
      });
      ele.data('value', val); // store
    },
    setColor: function (ele, val) {
      ele.css({
        backgroundColor: val,
      });
      ele.data('color', val); // store
    },
    swapColor: function () {
      this.colors(getColor(EL.min), getColor(EL.maj));
    },
    colors: function (c1, c2) {
      var cs = Data.colors();
      c2 = '#999';
      this.setColor(EL.maj, c1 || cs[0]);
      this.setColor(EL.min, c2 || cs[1]);
    },
    load: function (num) {
      this.colors();
      this.percent(num);
    },
    init: function (num) {
      $.reify(EL);
      this.load(num);

      C.debug([NOM, API]);

      this.init = this.load;
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
