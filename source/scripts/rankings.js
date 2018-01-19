/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jqxtn'], function ($) {
  'use strict';
  var NOM = 'Rankings';
  var W = window;
  var C = console;
  C.debug(NOM, 'loaded');

  var EL = {
    div: '.rankings table',
    rows: '.rankings table tr:not(:first-child)',
  };
  var API = Object.create(null);
  var Dat;

  $.extend(API, {
    EL: EL,
    set: function (data) {
      Dat = data;
      return API;
    },
    getCxy: function (c, r) {
      var tmp = EL.rows.eq(r);
      tmp = tmp.children().eq(c);
      return tmp;
    },
    get: function () {
      return Dat;
    },
    fillup: function () {
      var y = 0;
      $.each(Dat, function (i, row) {

        API.getCxy(0, y).find('img').attr({
          src: './images/flags/' + i.toLowerCase() + '.png',
          alt: i,
        });
        API.getCxy(1, y).text(i);

        $.each(row, function (j, cell) {
          API.getCxy(j + 2, y).text(cell);
        });

        y++;
      });
    },
    init: function (data) {
      $.reify(EL);
      API.set(data).fillup();

      C.debug([NOM, API]);
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
