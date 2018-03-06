/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-01-25
  IDEA    Model and adjust data: for gui, and from ajax
  NOTE    ???
  TODO    ???

 */
define(['jquery', 'util',
], function ($, UT) {
  'use strict';

  var API;
  var NOM = 'Model';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  function inject(mod) {
    try {
      var num = parseInt(mod.match(/\d+/)[0]);
      API.addGame(num, require(mod));
    } catch (err) {
      if (W._dbug > 0) C.error(err.message);
    }
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    init: null,
    //
    _: NOM,
    UT: UT,
    current: 0,
    defs: {
      speed: 333,
    },
    games: [],
    teams: {},
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
    lookup: function (key) {
      return (this.dict[key] || key);
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

  API.dict = Object.create({
    error: '#c20000',
    gray: '#8f8f8f',
    mark: '#00ff00',
    red: '#bb0826',
    yellow: '#fcc60a',
    warning: '#fff200',
  });

  API.teams = Object.create({
    '?'           : { colors: ['#591721', '#273864'], grouping: 'X', flag: '?.png'             },
    Algeria       : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'algeria.png'       },
    Argentina     : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'argentina.png'     },
    Australia     : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'australia.png'     },
    Belgium       : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'belgium.png'       },
    Bosnia        : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'bosnia.png'        },
    Brazil        : { colors: ['#689b24', '#02277b'], grouping: 'A', flag: 'brazil.png'        },
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
    Mexico        : { colors: ['#176844', '#fcc60a'], grouping: 'A', flag: 'mexico.png'        },
    Netherlands   : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'netherlands.png'   },
    Nigeria       : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'nigeria.png'       },
    Portugal      : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'portugal.png'      },
    Russia        : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'russia.png'        },
    Spain         : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'spain.png'         },
    Switzerland   : { colors: ['#999999', '#999999'], grouping: 'E', flag: 'switzerland.png'   },
    Uruguay       : { colors: ['#999999', '#999999'], grouping: 'D', flag: 'uruguay.png'       },
    USA           : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'usa.png'           },
  });

  return API;
});

/*



 */
