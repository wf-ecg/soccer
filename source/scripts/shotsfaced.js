/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Paint hits/misses eles over net graphic
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'libs/util-dim',
], function ($, UT) {
  'use strict';

  var API, EL;
  var NOM = 'Shotsfaced';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  EL = Object.create({
    cache: '',
    div: '.the-shots',
    net: '.net',
    nums: '.nums span',
  });

  // - - - - - - - - - - - - - - - - - -

  function Pc(n) {
    return Math.round(n) + '%';
  }

  var _positionXY = function (x, y) {
    var ball = this;

    x = UT.hasdef(x) ? x : 50;
    y = UT.hasdef(y) ? y : x;

    ball.css({
      left: Pc(x),
      top: Pc(y),
    });
  };

  function MakeBall(goal) {
    var ball = $('<div>').addClass('target');

    ball.posxy = _positionXY;

    if (goal) {
      API.goals++;
      ball.addClass('score');
    } else {
      API.saves++;
    }
    return ball;
  }

  function Triball(goal, horz, vert) {
    var tobj = this;
    tobj.goal = goal;
    tobj.horz = horz;
    tobj.vert = vert;
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    total: 0,
    saves: 0,
    goals: 0,
    data: null,
    addBall: function (tb) {
      var bdiv, bobj;

      if (typeof tb === 'number') {
        EL.cache = $();
        this.total = tb;
        this.saves = 0;
        this.goals = 0;
      } else {
        if (tb.constructor !== Triball) {
          bobj = new Triball(tb[0], tb[1], tb[2]);
        }
        bdiv = MakeBall(bobj.goal);
        EL.net.append(bdiv);
        UT.dim.centerMiddle(bdiv);

        UT.delay(function () {
          bdiv.posxy(bobj.horz, bobj.vert);
        });
        EL.cache = EL.cache.add(bdiv);
      }
    },
    updateNums: function () {
      EL.nums.eq(0).text(this.total);
      EL.nums.eq(1).text(this.saves + this.goals);
      EL.nums.eq(2).text(this.goals);
    },
    load: function (data) {
      this.init();

      EL.cache.remove();
      this.data = Array.isArray(data) ? data : this.data;

      $.each(this.data, function (i, e) {
        API.addBall(e);
      });

      this.updateNums();
    },
    init: function () {
      this.init = $.noop;
      $.reify(EL);

      EL.div.on('click', API.load.bind(API));
      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
