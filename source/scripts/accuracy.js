/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['data'], function (Data) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  var name = 'accuracy';
  var self = Object.create(null);

  $.extend(self, {
    div: '.accuracy .limit',
    maj: '.major',
    min: '.minor',
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
      self.setValue(self.maj, num); // mod major div
      self.setValue(self.min, 100 - num); // mod minor
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
      self.colors(self.getColor(self.min), self.getColor(self.maj));
    },
    colors: function (c1, c2) {
      var cs = Data.colors();
      c2 = '#999';
      self.setColor(self.maj, c1 || cs[0]);
      self.setColor(self.min, c2 || cs[1]);
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
        self.div = $(self.div);
        self.maj = self.div.find(self.maj);
        self.min = self.div.find(self.min);
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
