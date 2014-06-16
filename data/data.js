/*jslint es5:true, white:false */
/*globals C, D, W, $ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Data = {
    current: 1,
    game: function (num) {
        this.current = U.def(num) ? num : this.current;
        return this.games[this.current];
    },
    winner: function (num) {
        return this.game(num).match.teams[0];
    },
    colors: function (num) {
        return this.teams[this.winner(num)].colors;
    },
    team: function (nom) {
        return this.teams[nom];
    },
    lookup: function (key) {
        return (this.dict[key] || key);
    },
    defs: {
        speed: 333,
    },
    teams: {},
    games: [],
};

Data.dict = {
    error: '#c20000',
    gray: '#8f8f8f',
    mark: '#00ff00',
    red: '#bb0826',
    yellow: '#fcc60a',
    warning: '#fff200',
};

Data.addGame = function (num, data) { // opt num/push
    if (data) {
        this.games[num] = data;
        this.current = num;
    } else {
        this.games.push(num);
        this.current = this.games.length - 1;
    }
};

Data.teams = {
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
    Mexico        : { colors: ['#c91721', '#176844'], grouping: 'A', flag: 'mexico.png'        },
    Netherlands   : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'netherlands.png'   },
    Nigeria       : { colors: ['#999999', '#999999'], grouping: 'F', flag: 'nigeria.png'       },
    Portugal      : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'portugal.png'      },
    Russia        : { colors: ['#999999', '#999999'], grouping: 'H', flag: 'russia.png'        },
    Spain         : { colors: ['#999999', '#999999'], grouping: 'B', flag: 'spain.png'         },
    Switzerland   : { colors: ['#999999', '#999999'], grouping: 'E', flag: 'switzerland.png'   },
    Uruguay       : { colors: ['#999999', '#999999'], grouping: 'D', flag: 'uruguay.png'       },
    USA           : { colors: ['#999999', '#999999'], grouping: 'G', flag: 'usa.png'           },
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
