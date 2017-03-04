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
        this.total = tb;
        this.saves = 0;
        this.goals = 0;
      } else {
        if (tb.constructor !== Triball) {
          bobj = new Triball(tb[0], tb[1], tb[2]);
        }
        bdiv = this.makeBall(bobj.goal);
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

      ball.posxy = this.positionXY;

      if (goal) {
        this.goals++;
        ball.addClass('score');
      } else {
        this.saves++;
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
      EL.nums.eq(0).text(this.total);
      EL.nums.eq(1).text(this.saves + this.goals);
      EL.nums.eq(2).text(this.goals);
    },
    reset: function (data) {
      EL.cache.remove();
      this.load(data || this.data);
    },
    load: function (arr) {
      this.data = arr;

      $.each(arr, function (i, e) {
        self.addBall(e);
      });
      this.updateNums();
    },
    init: function (data) {
      if (this.inited) {
        this.reset(data);
      } else {
        this.inited = true;
        data = data || this.data;
        $.reify(EL);
        EL.div.click(function () {
          self.reset();
        });
        this.load(data);

        C.debug([name, self]);
      }
    },
  });

  return self;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
