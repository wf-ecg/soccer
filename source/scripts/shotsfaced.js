/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'libs/util-dim'], function ($, U) {
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
  var self = Object.create(null);

  function _pc(n) {
    return (n | 0) + '%';
  }

  function Triball(goal, horz, vert) {
    var tobj = this;
    tobj.goal = goal;
    tobj.horz = horz;
    tobj.vert = vert;
  }

  $.extend(self, {
    _EL: EL,
    total: 0,
    saves: 0,
    goals: 0,
    data: null,
    addBall: function (tb) {
      var bdiv, bobj;

      if (typeof tb === 'number') {
        EL.cache = $();
        self.total = tb;
        self.saves = 0;
        self.goals = 0;
      } else {
        if (tb.constructor !== Triball) {
          bobj = new Triball(tb[0], tb[1], tb[2]);
        }
        bdiv = self.makeBall(bobj.goal);
        EL.net.append(bdiv);
        U.dim.prox(bdiv);

        U.delay(function () {
          bdiv.posxy(bobj.horz, bobj.vert);
        });
        EL.cache = EL.cache.add(bdiv);
      }
    },
    makeBall: function (goal) {
      var ball = $('<div>').addClass('target');

      ball.posxy = self.positionXY;

      if (goal) {
        self.goals++;
        ball.addClass('score');
      } else {
        self.saves++;
      }
      return ball;
    },
    positionXY: function (x, y) {
      var ball = this;

      x = U.def(x) ? x : 50;
      y = U.def(y) ? y : x;

      ball.css({
        left: _pc(x | 0),
        top: _pc(y | 0),
      });
    },
    updateNums: function () {
      EL.nums.eq(0).text(self.total);
      EL.nums.eq(1).text(self.saves + self.goals);
      EL.nums.eq(2).text(self.goals);
    },
    reset: function (data) {
      EL.cache.remove();
      self.load(data || self.data);
    },
    load: function (arr) {
      self.data = arr;

      $.each(arr, function (i, e) {
        self.addBall(e);
      });
      self.updateNums();
    },
    init: function (data) {
      if (self.inited) {
        self.reset(data);
      } else {
        self.inited = true;
        data = data || self.data;
        $.reify(EL);
        EL.div.on('click', function () {
          self.reset();
        });
        self.load(data);

        C.debug([name, self]);
      }
    },
  });

  return self;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
