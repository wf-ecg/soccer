/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';
  var Nom = 'Rankings';
  var W = window;
  var C = W._dbug;
  C('debug', Nom, 'loaded');

  var EL = {
    div: '.rankings table',
    rows: '.rankings table tr:not(:first-child)',
  };
  var MY = Object.create(null);
  var dat;

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
    init: function (data) {
      $.reify(EL);
      MY.set(data).fillup();

      C('debug', [Nom, MY]);
    },
  });

  W[Nom] = MY;
  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
