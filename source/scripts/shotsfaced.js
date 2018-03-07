/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Paint hits/misses eles over net graphic
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'util_d',
], function ($, U) {
  'use strict';

  var API, EL;
  var NOM = 'Shotsfaced';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  EL = Object.create({
    div: '.the-shots',
    net: '.net',
    nums: '.nums span',
  });

  // - - - - - - - - - - - - - - - - - -

  function _posxy() {
    this.ele.css({
      left: this.x,
      top: this.y,
    });
  }

  function makeBdiv(goal) {
    var div = $('<div>').addClass('target');
    var cls, tip;

    if (goal) {
      API.goals++; tip = 'Goal'; cls = 'score';
    } else {
      API.saves++; tip = 'Blocked'; cls = '';
    }
    return div.addClass(cls).attr('title', tip);
  }

  function Triball(goal, horz, vert) {
    var bdiv = makeBdiv(goal);

    this.ele = bdiv;
    this.x = U.pct(U.hasdef(horz) ? horz : 50);
    this.y = U.pct(U.hasdef(vert) ? vert : horz);

    EL.net.append(bdiv);
    U.dim.centerMiddle(bdiv);
  }

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    total: 0,
    saves: 0,
    goals: 0,
    data: null,
    addBall: function (tb) {
      var ball;

      if (typeof tb === 'number') {
        this.total = tb; // head value of shots array
      } else {
        ball = new Triball(tb[0], tb[1], tb[2]);
        // allow next frame to be css transition
        U.delay(_posxy.bind(ball));
      }
    },
    resetNet: function () {
      EL.net.find('.target').remove();
      this.total = 0;
      this.saves = 0;
      this.goals = 0;
    },
    updateNums: function () {
      EL.nums.eq(0).text(this.total);
      EL.nums.eq(1).text(this.saves + this.goals);
      EL.nums.eq(2).text(this.goals);
    },
    load: function (data) {
      this.init();

      this.resetNet();
      this.data = Array.isArray(data) ? data : this.data;

      $.each(this.data, function (i, e) {
        API.addBall(e);
      });

      this.updateNums();
    },
    init: function () {
      this.init = $.noop;
      $.reify(EL);

      // EL.div.on('click', API.load.bind(API));
      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
