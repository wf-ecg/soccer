/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Fill group... table of stats
  NOTE    ???
  TODO    ???

 */
define(['jqxtn',
], function ($) {
  'use strict';

  var API, EL;
  var [NOM, C, W] = ['Rankings', console, window];
  C.debug(NOM, 'loaded');

  EL = Object.create({
    rows: '.the-rankings table tr',
  });

  // - - - - - - - - - - - - - - - - - -

  function getCell(r, c) {
    return EL.rows.eq(1 + r).children().eq(c);
  }

  function fillTable(data) {
    var rnum = 0;

    $.each(data, function (team, row) {
      getCell(rnum, 0).find('img').attr({
        src: './images/flags/' + team.toLowerCase() + '.png',
        alt: team,
      });
      getCell(rnum, 1).text(team);

      $.each(row, function (cnum, cell) {
        getCell(rnum, 2 + cnum).text(cell);
      });

      rnum++;
    });
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    load: function (data) {
      this.init();

      fillTable(data);
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
