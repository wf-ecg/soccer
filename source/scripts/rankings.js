/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var EL = {
    div: '.rankings table',
    rows: '.rankings table tr:not(:first-child)',
  };
  var dat, name = 'rankings';
  var MY = Object.create(null);

  $.extend(MY, {
    _EL: EL,
    set: function (data) {
      dat = data;
      return MY;
    },
    getCxy: function (c, r) {
      var tmp = EL.rows.eq(r);
      tmp = tmp.children().eq(c);
      return tmp;
    },
    get: function () {
      return dat;
    },
    fillup: function () {
      var y = 0;
      $.each(dat, function (i, row) {

        MY.getCxy(0, y).find('img').attr({
          src: './images/flags/' + i.toLowerCase() + '.png',
          alt: i,
        });
        MY.getCxy(1, y).text(i);

        $.each(row, function (j, cell) {
          MY.getCxy(j + 2, y).text(cell);
        });

        y++;
      });
    },
    init: function (dat) {
      $.reify(EL);
      MY.set(dat).fillup();

      C.debug([name, MY]);
    },
  });

  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
