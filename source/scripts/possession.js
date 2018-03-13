/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-06
  IDEA    Generate and modify ball-possession donut
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'util', 'libs/dial',
], function ($, U, Dial) {
  'use strict';

  var API, EL;
  var [NOM, C, W] = ['Possession', console, window];
  C.debug(NOM, 'loaded');

  EL = Object.create({
    div: '.the-possession',
  });

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    Dial: Dial,
    //
    dial1: {},
    dial2: {},
    svg: null,
    addDials: function (sel) {
      sel = $(sel);
      API.dial1 = Dial.make({
        flip: true,
        pitch: 30,
      });
      API.dial2 = Dial.make({
        control: true,
        pitch: 30,
      });

      sel.prepend(API.dial1.svg, API.dial2.svg);
      sel.parent().append(API.dial1.input, API.dial2.input);
    },
    load: function (sel, stats, tints) {
      this.init(sel);

      var {possession, teams} = stats;
      var times = [possession, 100 - possession];

      EL.div.find('.major h3').html(U.pct(times[0]));

      API.dial1.setColor(tints[0]).setTip(teams[0]).setInput(times[0]);
      API.dial2.setColor(tints[1]).setTip(teams[1]).setInput(times[1]);
    },
    init: function (sel) {
      this.init = $.noop;
      $.reify(EL);

      this.addDials(sel);
      if (W._dbug > 1) C.debug([NOM, API]);
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
