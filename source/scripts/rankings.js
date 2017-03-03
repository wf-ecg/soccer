/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  var dat, div, rows, name = 'rankings';
  var self = Object.create(null);

  div = $('.rankings table');
  rows = div.find('tr').not(':first-child');

  $.extend(self, {
    set: function (data) {
      dat = data;
      return self;
    },
    getCxy: function (c, r) {
      var tmp = rows.eq(r);
      tmp = tmp.children().eq(c);
      return tmp;
    },
    get: function () {
      return dat;
    },
    fillup: function () {
      var y = 0;
      $.each(dat, function (i, row) {

        self.getCxy(0, y).find('img').attr({
          src: './images/flags/' + i.toLowerCase() + '.png',
          alt: i,
        });
        self.getCxy(1, y).text(i);

        $.each(row, function (j, cell) {
          self.getCxy(j + 2, y).text(cell);
        });

        y++;
      });
    },
    init: function (dat) {
      this.set(dat).fillup();

      C.debug([name, self]);
    },
  });

  return self;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
