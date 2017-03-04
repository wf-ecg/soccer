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
  var self = Object.create(null);

  $.extend(self, {
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
        self.swapColor();
      }
      self.setValue(EL.maj, num); // mod major div
      self.setValue(EL.min, 100 - num); // mod minor
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
      self.colors(self.getColor(EL.min), self.getColor(EL.maj));
    },
    colors: function (c1, c2) {
      var cs = Data.colors();
      c2 = '#999';
      self.setColor(EL.maj, c1 || cs[0]);
      self.setColor(EL.min, c2 || cs[1]);
    },
    load: function (num) {
      self.colors();
      self.percent(num);
    },
    init: function (num) {
      if (self.inited) {
        self.load(num);
      } else {
        self.inited = true;
        $.reify(EL);
        self.load(num);

        C.debug([name, self]);
      }
    },
  });

  return self;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
