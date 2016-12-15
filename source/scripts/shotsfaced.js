/*jslint es5:true, white:false */
/*globals C, D, W, $,
 Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (U) {
  var name = 'shotsfaced',
      I = Object.create(null);

  function Pc(n) {
    return (n | 0) + '%';
  }

  function Triball(goal, horz, vert) {
    var tobj = this;
    tobj.goal = goal;
    tobj.horz = horz;
    tobj.vert = vert;
  }

  U[name] = $.extend(I, {
    total: 0,
    saves: 0,
    goals: 0,
    cache: $(),
    data: null,
    div: '.shotsfaced',
    net: '.net',
    nums: '.nums span',
    addBall: function (tb) {
      var bdiv, bobj;

      if (typeof tb === 'number') {
        this.cache = $();
        this.total = tb;
        this.saves = 0;
        this.goals = 0;
      } else {
        if (tb.constructor !== Triball) {
          bobj = new Triball(tb[0], tb[1], tb[2]);
        }
        bdiv = this.makeBall(bobj.goal);
        this.net.append(bdiv);
        U.dim.prox(bdiv);

        U.delay(function () {
          bdiv.posxy(bobj.horz, bobj.vert);
        });
        this.cache = this.cache.add(bdiv);
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
        left: Pc(x | 0),
        top: Pc(y | 0),
      });
    },
    updateNums: function () {
      this.nums.eq(0).text(this.total);
      this.nums.eq(1).text(this.saves + this.goals);
      this.nums.eq(2).text(this.goals);
    },
    reset: function (data) {
      this.cache.remove();
      this.load(data || this.data);
    },
    load: function (arr) {
      this.data = arr;

      $.each(arr, function (i, e) {
        I.addBall(e);
      });
      this.updateNums();
    },
    init: function (data) {
      if (this.inited) {
        this.reset(data);
      } else {
        this.inited = true;
        data = data || this.data;

        this.div = $(this.div).click(function () {
          I.reset();
        });
        this.net = this.div.find(this.net);
        this.nums = this.div.find(this.nums);
        this.load(data);

        C.debug([name, I]);
      }
    },
  });

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
