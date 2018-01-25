/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jqxtn', 'libs/util-dim',
], function ($, UT) {
  'use strict';
  var NOM = 'Shotsfaced';
  // var W = window;
  var C = console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  function _pc(n) {
    return (n | 0) + '%';
  }

  function Triball(goal, horz, vert) {
    var tobj = this;
    tobj.goal = goal;
    tobj.horz = horz;
    tobj.vert = vert;
  }

  // - - - - - - - - - - - - - - - - - -

  var EL = {
    cache: '',
    div: '.shotsfaced',
    net: '.net',
    nums: '.nums span',
  };
  var API = Object.create({
    EL: EL,
    total: 0,
    saves: 0,
    goals: 0,
    data: null,
    addBall: function (tb) {
      var bdiv, bobj;

      if (typeof tb === 'number') {
        EL.cache = $();
        API.total = tb;
        API.saves = 0;
        API.goals = 0;
      } else {
        if (tb.constructor !== Triball) {
          bobj = new Triball(tb[0], tb[1], tb[2]);
        }
        bdiv = API.makeBall(bobj.goal);
        EL.net.append(bdiv);
        UT.dim.prox(bdiv);

        UT.delay(function () {
          bdiv.posxy(bobj.horz, bobj.vert);
        });
        EL.cache = EL.cache.add(bdiv);
      }
    },
    makeBall: function (goal) {
      var ball = $('<div>').addClass('target');

      ball.posxy = API.positionXY;

      if (goal) {
        API.goals++;
        ball.addClass('score');
      } else {
        API.saves++;
      }
      return ball;
    },
    positionXY: function (x, y) {
      var ball = this;

      x = UT.def(x) ? x : 50;
      y = UT.def(y) ? y : x;

      ball.css({
        left: _pc(x | 0),
        top: _pc(y | 0),
      });
    },
    updateNums: function () {
      EL.nums.eq(0).text(API.total);
      EL.nums.eq(1).text(API.saves + API.goals);
      EL.nums.eq(2).text(API.goals);
    },
    reset: function (data) {
      EL.cache.remove();
      API.load(data || API.data);
    },
    load: function (arr) {
      API.data = arr;

      $.each(arr, function (i, e) {
        API.addBall(e);
      });
      API.updateNums();
    },
    init: function (data) {
      data = data || API.data;
      $.reify(EL);
      EL.div.on('click', function () {
        API.reset();
      });
      API.load(data);

      C.debug([NOM, API]);

      API.init = API.reset;
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
