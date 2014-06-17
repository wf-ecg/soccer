/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Triball(goal, horz, vert) {
    this.goal = (Utils.def(goal) ? goal : Math.random() > 0.5);
    this.horz = (Utils.def(horz) ? horz : Math.random() * 100) % 101;
    this.vert = (Utils.def(vert) ? vert : Math.random() * 100) % 101;
}

var Face = (function (U) {
    var name = 'Face',
    self = Object.create(null);

    function Pc(n) {
        return (n | 0) + '%';
    }

    U.face = {
        defs: {
            target: 0,
            saves: 0,
            goals: 0,
            cache: $(),
        },
        data: null,
        div: '.faced',
        net: '.net',
        nums: '.nums span',
        addBall: function (tb) {
            var ball;

            tb = tb || [];

            if (tb.constructor !== Triball) {
                tb = new Triball(tb[0], tb[1], tb[2]);
            }

            ball = this.makeBall(tb.goal);
            this.updateNums();
            this.net.append(ball);
            U.dim.prox(ball);

            U.delay(function () {
                ball.posxy();
                ball.posxy(tb.horz, tb.vert);
            }, 0);

            this.cache = this.cache.add(ball);
        },
        makeBall: function (goal) {
            var ball = $('<div>').addClass('target');

            this.target++;
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
            this.nums.eq(0).text(this.target);
            this.nums.eq(1).text(this.saves);
            this.nums.eq(2).text(this.goals);
        },
        reset: function (data) {
            this.cache.remove();
            this.load(data || this.data);
        },
        load: function (arr) {
            this.data = arr;

            $.extend(this, this.defs);
            $.each(arr, function () {
                self.addBall(this);
            });
        },
        init: function (data) {
            if (this.inited) {
                this.reset(data);
            } else {
                this.inited = true;
                data = data || this.data;

                this.div = $(this.div).click(function () {
                    self.reset();
                });
                this.net = this.div.find(this.net);
                this.nums = this.div.find(this.nums);
                this.load(data);

                C.debug(name, self);
            }
        },
    };

    return (U.face = $.extend(self, U.face));

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



*/
