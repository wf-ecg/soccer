/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'libs/util-dim'], function ($, UT) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var EL = {
    cache: '',
    div: '.shotsfaced',
    net: '.net',
    nums: '.nums span',
  };
  var name = 'shotsfaced';
  var MY = Object.create(null);

  function _pc(n) {
    return (n | 0) + '%';
  }

  function Triball(goal, horz, vert) {
    var tobj = this;
    tobj.goal = goal;
    tobj.horz = horz;
    tobj.vert = vert;
  }

  $.extend(MY, {
    _EL: EL,
    total: 0,
    saves: 0,
    goals: 0,
    data: null,
    addBall: function (tb) {
      var bdiv, bobj;

      if (typeof tb === 'number') {
        EL.cache = $();
        MY.total = tb;
        MY.saves = 0;
        MY.goals = 0;
      } else {
        if (tb.constructor !== Triball) {
          bobj = new Triball(tb[0], tb[1], tb[2]);
        }
        bdiv = MY.makeBall(bobj.goal);
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

      ball.posxy = MY.positionXY;

      if (goal) {
        MY.goals++;
        ball.addClass('score');
      } else {
        MY.saves++;
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
      EL.nums.eq(0).text(MY.total);
      EL.nums.eq(1).text(MY.saves + MY.goals);
      EL.nums.eq(2).text(MY.goals);
    },
    reset: function (data) {
      EL.cache.remove();
      MY.load(data || MY.data);
    },
    load: function (arr) {
      MY.data = arr;

      $.each(arr, function (i, e) {
        MY.addBall(e);
      });
      MY.updateNums();
    },
    init: function (data) {
      if (MY.inited) {
        MY.reset(data);
      } else {
        MY.inited = true;
        data = data || MY.data;
        $.reify(EL);
        EL.div.on('click', function () {
          MY.reset();
        });
        MY.load(data);

        C.debug([name, MY]);
      }
    },
  });

  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
