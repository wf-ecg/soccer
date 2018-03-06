/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-02
  IDEA    Fill group... table of stats
  NOTE    ???
  TODO    ???

 */
define(['jqxtn',
], function ($) {
  'use strict';

  var API, EL;
  var NOM = 'Rankings';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  function getCxy(c, r) {
    var tmp = EL.rows.eq(r);
    tmp = tmp.children().eq(c);
    return tmp;
  }

  function fillup(data) {
    var y = 0;
    $.each(data, function (i, row) {

      getCxy(0, y).find('img').attr({
        src: './images/flags/' + i.toLowerCase() + '.png',
        alt: i,
      });
      getCxy(1, y).text(i);

      $.each(row, function (j, cell) {
        getCxy(j + 2, y).text(cell);
      });

      y++;
    });
  }

  // - - - - - - - - - - - - - - - - - -

  EL = Object.create({
    div: '.the-rankings table',
    rows: '.the-rankings table tr:not(:first-child)',
  });

  API = Object.create({
    load: function (data) {
      this.init();

      fillup(data);
    },
    init: function () {
      this.init = $.noop;
      $.reify(EL);

      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
