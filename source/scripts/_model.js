/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Model and adjust data: for gui, and from ajax
  NOTE    ???
  TODO    ???

 */
define(['jquery',
], function ($) {
  'use strict';

  var API;
  var NOM = 'Model';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  const MIN = 0x55;
  const MAX = 0xFF - (MIN * 2);

  var util = {
    hex: function () {
      var num = Math.round(Math.random() * MAX);
      var hex = (num + MIN).toString(16);
      return ('00' + hex).slice(-2);
    },
    reverse: function(str) {
      return str.split('').reverse().join('');
    },
  };

  function inject(mod) {
    try {
      var num = parseInt(mod.match(/\d+/)[0]);
      API.addGame(num, require(mod));
    } catch (err) {
      if (W._dbug > 0) C.error(err.message);
    }
  }

  function randHex(norm) {
    var hex = util.hex() + util.hex() + util.hex();
    return '#' + (norm ? hex : util.reverse(hex));
  }

  function getRandoHexColorPair() {
    return [randHex(), randHex(1)];
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    init: null,
    //
    _: NOM,
    current: 0,
    defs: {
      speed: 333,
    },
    games: null,
    teams: null,
    addGame: function (num, data) { // opt num/push
      if (data) {
        this.games[num] = data;
      } else {
        this.games.push(num);
      }
    },
    getGame: function (num) {
      this.current = num || this.current;
      return this.games[this.current];
    },
    getWinner: function (num) {
      return this.getGame(num).match.teams[0];
    },
    getColors: function (num) {
      return this.teams[this.getWinner(num)].colors;
    },
    getTeam: function (nom) {
      return this.teams[nom];
    },
    readFrom: function (url, cb) {
      $('<tmp>').load(url + ' a', function () {
        var links = $(this).children().get();
        links = links.map(function (a) {
          return 'games/' + a.text.replace('.js', '');
        });

        require(links, function () {
          links.map(inject);
          if (typeof cb === 'function') cb();
        });
      });
    },
  });

  API.games = [];

  API.teams = Object.create({
    '?'           : { colors: getRandoHexColorPair(), grouping: 'X', flag: 'switzerland.png'   },
    Algeria       : { colors: getRandoHexColorPair(), grouping: 'H', flag: 'algeria.png'       },
    Argentina     : { colors: getRandoHexColorPair(), grouping: 'F', flag: 'argentina.png'     },
    Australia     : { colors: getRandoHexColorPair(), grouping: 'B', flag: 'australia.png'     },
    Belgium       : { colors: getRandoHexColorPair(), grouping: 'H', flag: 'belgium.png'       },
    Bosnia        : { colors: getRandoHexColorPair(), grouping: 'F', flag: 'bosnia.png'        },
    Brazil        : { colors: ['#289900', '#176844'], grouping: 'A', flag: 'brazil.png'        },
    Cameroon      : { colors: getRandoHexColorPair(), grouping: 'A', flag: 'cameroon.png'      },
    Chile         : { colors: getRandoHexColorPair(), grouping: 'B', flag: 'chile.png'         },
    Colombia      : { colors: getRandoHexColorPair(), grouping: 'C', flag: 'colombia.png'      },
    Costa_Rica    : { colors: getRandoHexColorPair(), grouping: 'D', flag: 'costa_rica.png'    },
    Croatia       : { colors: getRandoHexColorPair(), grouping: 'A', flag: 'croatia.png'       },
    Ecuador       : { colors: getRandoHexColorPair(), grouping: 'E', flag: 'ecuador.png'       },
    England       : { colors: getRandoHexColorPair(), grouping: 'D', flag: 'england.png'       },
    France        : { colors: getRandoHexColorPair(), grouping: 'E', flag: 'france.png'        },
    Germany       : { colors: getRandoHexColorPair(), grouping: 'G', flag: 'germany.png'       },
    Ghana         : { colors: getRandoHexColorPair(), grouping: 'G', flag: 'ghana.png'         },
    Greece        : { colors: getRandoHexColorPair(), grouping: 'C', flag: 'greece.png'        },
    Honduras      : { colors: getRandoHexColorPair(), grouping: 'E', flag: 'honduras.png'      },
    Iran          : { colors: getRandoHexColorPair(), grouping: 'F', flag: 'iran.png'          },
    Italy         : { colors: getRandoHexColorPair(), grouping: 'D', flag: 'italy.png'         },
    Ivory_Coast   : { colors: getRandoHexColorPair(), grouping: 'C', flag: 'ivory_coast.png'   },
    Japan         : { colors: getRandoHexColorPair(), grouping: 'C', flag: 'japan.png'         },
    Korea_Republic: { colors: getRandoHexColorPair(), grouping: 'H', flag: 'korea_republic.png'},
    Mexico        : { colors: ['#176844', '#fcc60a'], grouping: 'A', flag: 'mexico.png'        },
    Netherlands   : { colors: getRandoHexColorPair(), grouping: 'B', flag: 'netherlands.png'   },
    Nigeria       : { colors: getRandoHexColorPair(), grouping: 'F', flag: 'nigeria.png'       },
    Portugal      : { colors: getRandoHexColorPair(), grouping: 'G', flag: 'portugal.png'      },
    Russia        : { colors: getRandoHexColorPair(), grouping: 'H', flag: 'russia.png'        },
    Spain         : { colors: getRandoHexColorPair(), grouping: 'B', flag: 'spain.png'         },
    Switzerland   : { colors: getRandoHexColorPair(), grouping: 'E', flag: 'switzerland.png'   },
    Uruguay       : { colors: getRandoHexColorPair(), grouping: 'D', flag: 'uruguay.png'       },
    USA           : { colors: getRandoHexColorPair(), grouping: 'G', flag: 'usa.png'           },
  });

  API.funk = function (i = 1) {
    while (--i > -1) $('<div>').css({
      backgroundColor: randHex(),
      display: 'inline-block',
      height: '40px',
      width: '40px',
    }).prependTo('body');
  };
  return API;
});

/*



 */
