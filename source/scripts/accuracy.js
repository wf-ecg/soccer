/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['data'], function (Data) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var EL = {
    div: '.accuracy .limit',
    maj: '.accuracy .limit .major',
    min: '.accuracy .limit .minor',
  };
  var name = 'accuracy';
  var MY = Object.create(null);

  $.extend(MY, {
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
        MY.swapColor();
      }
      MY.setValue(EL.maj, num); // mod major div
      MY.setValue(EL.min, 100 - num); // mod minor
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
      MY.colors(MY.getColor(EL.min), MY.getColor(EL.maj));
    },
    colors: function (c1, c2) {
      var cs = Data.colors();
      c2 = '#999';
      MY.setColor(EL.maj, c1 || cs[0]);
      MY.setColor(EL.min, c2 || cs[1]);
    },
    load: function (num) {
      MY.colors();
      MY.percent(num);
    },
    init: function (num) {
      if (MY.inited) {
        MY.load(num);
      } else {
        MY.inited = true;
        $.reify(EL);
        MY.load(num);

        C.debug([name, MY]);
      }
    },
  });

  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
