/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'data',
], function ($, Data) {
  'use strict';
  var NOM = 'Accuracy';
  var W = window;
  var C = console;
  C.debug(NOM, 'loaded');

  var EL = {
    div: '.accuracy .limit',
    maj: '.accuracy .limit .major',
    min: '.accuracy .limit .minor',
  };
  var API = Object.create(null);

  $.extend(API, {
    _EL: EL,
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
        API.swapColor();
      }
      API.setValue(EL.maj, num); // mod major div
      API.setValue(EL.min, 100 - num); // mod minor
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
    getValue: function (ele) {
      return ele.data('value');
    },
    setColor: function (ele, val) {
      ele.css({
        backgroundColor: val,
      });
      ele.data('color', val); // store
    },
    getColor: function (ele) {
      return ele.data('color');
    },
    swapColor: function () {
      API.colors(API.getColor(EL.min), API.getColor(EL.maj));
    },
    colors: function (c1, c2) {
      var cs = Data.colors();
      c2 = '#999';
      API.setColor(EL.maj, c1 || cs[0]);
      API.setColor(EL.min, c2 || cs[1]);
    },
    load: function (num) {
      API.colors();
      API.percent(num);
    },
    init: function (num) {
      if (API.inited) {
        API.load(num);
      } else {
        API.inited = true;
        $.reify(EL);
        API.load(num);

        C.debug([NOM, API]);
      }
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
