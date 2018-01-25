/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-01-25
  IDEA    Fill group... table of stats
  NOTE    ???
  TODO    ???

 */
define(['jqxtn',
], function ($) {
  'use strict';

  var API, EL, _Data;
  var NOM = 'Rankings';
  var C = console;
  // var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -


  var _Data;

  // - - - - - - - - - - - - - - - - - -

  EL = {
    div: '.rankings table',
    rows: '.rankings table tr:not(:first-child)',
  };
  API = Object.create({
    EL: EL,
    set: function (data) {
      _Data = data;
      return API;
    },
    getCxy: function (c, r) {
      var tmp = EL.rows.eq(r);
      tmp = tmp.children().eq(c);
      return tmp;
    },
    get: function () {
      return _Data;
    },
    fillup: function () {
      var y = 0;
      $.each(_Data, function (i, row) {

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
