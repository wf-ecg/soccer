/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'util',
], function ($, UT) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var MY;
  var NM = 'Data';

  function inject(mod) {
    try {
      var num = parseInt(mod.match(/\d+/)[0]);
      MY.addGame(num, require(mod));
    } catch (err) {
      C.debug(err.message);
    }
  }

  MY = {
    current: 0,
    defs: {
      speed: 333,
    },
    games: [],
    teams: {},
    addGame: function (num, data) { // opt num/push
      if (data) {
        MY.games[num] = data;
      } else {
        MY.games.push(num);
      }
    },
    game: function (num) {
      MY.current = UT.def(num) ? num : MY.current;
      return MY.games[MY.current];
    },
    winner: function (num) {
      return MY.game(num).match.teams[0];
    },
    colors: function (num) {
      return MY.teams[MY.winner(num)].colors;
    },
    team: function (nom) {
      return MY.teams[nom];
    },
    lookup: function (key) {
      return (MY.dict[key] || key);
    },
    readFrom: function (url, cb) {
      $('<tmp>').load(`${url} a`, function () {
        var links = $(this).children().get();
        links = links.map(a => `games/${a.text.replace('.js', '')}`);

        require(links, function () {
          links.map(inject);
          if (typeof cb === 'function') cb();
        });
      });
    },
  };

  MY.games = [];

  MY.dict = {
    error: '#c20000',
    gray: '#8f8f8f',
    mark: '#00ff00',
    red: '#bb0826',
    yellow: '#fcc60a',
    warning: '#fff200',
  };

  MY.teams = {
    '?'           : { colors: ['#c91721', '#176844'], grouping: 'X', flag: 'mexico.png'        },
    Algeria       : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'algeria.png'       },
    Argentina     : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'argentina.png'     },
    Australia     : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'australia.png'     },
    Belgium       : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'belgium.png'       },
    Bosnia        : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'bosnia.png'        },
    Brazil        : { colors: ['#289b24', '#02277b'], grouping: 'A', flag: 'brazil.png'        },
    Cameroon      : { colors: ['#289900', '#ffff00'], grouping: 'A', flag: 'cameroon.png'      },
    Chile         : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'chile.png'         },
    Colombia      : { colors: ['#999999', '#999999'], grouping: 'C', flag: 'colombia.png'      },
    Costa_Rica    : { colors: ['#999999', '#999999'], grouping: 'D', flag: 'costa_rica.png'    },
    Croatia       : { colors: ['#f91800', '#0a0f9b'], grouping: 'A', flag: 'croatia.png'       },
    Ecuador       : { colors: ['#999999', '#999999'], grouping: 'E', flag: 'ecuador.png'       },
    England       : { colors: ['#999999', '#999999'], grouping: 'D', flag: 'england.png'       },
    France        : { colors: ['#999999', '#999999'], grouping: 'E', flag: 'france.png'        },
    Germany       : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'germany.png'       },
    Ghana         : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'ghana.png'         },
    Greece        : { colors: ['#999999', '#999999'], grouping: 'C', flag: 'greece.png'        },
    Honduras      : { colors: ['#999999', '#999999'], grouping: 'E', flag: 'honduras.png'      },
    Iran          : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'iran.png'          },
    Italy         : { colors: ['#999999', '#999999'], grouping: 'D', flag: 'italy.png'         },
    Ivory_Coast   : { colors: ['#999999', '#999999'], grouping: 'C', flag: 'ivory_coast.png'   },
    Japan         : { colors: ['#999999', '#999999'], grouping: 'C', flag: 'japan.png'         },
    Korea_Republic: { colors: ['#999999', '#999999'], grouping: 'H', flag: 'korea_republic.png'},
    Mexico        : { colors: ['#176844', MY.dict.yellow], grouping: 'A', flag: 'mexico.png'        },
    Netherlands   : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'netherlands.png'   },
    Nigeria       : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'nigeria.png'       },
    Portugal      : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'portugal.png'      },
    Russia        : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'russia.png'        },
    Spain         : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'spain.png'         },
    Switzerland   : { colors: ['#999999', '#999999'], grouping: 'E', flag: 'switzerland.png'   },
    Uruguay       : { colors: ['#999999', '#999999'], grouping: 'D', flag: 'uruguay.png'       },
    USA           : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'usa.png'           },
  };

  W[NM] = MY;
  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
