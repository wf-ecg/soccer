/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-28
  IDEA    Generate and modify ball-possession donut
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'model', 'dial',
], function ($, Model, Dial) {
  'use strict';

  var API, EL;
  var NOM = 'Possession';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  EL = Object.create({
    div: '.possession',
  });

  API = Object.create({
    Dial: Dial,
    Model: Model,
    //
    dial1: {},
    dial2: {},
    svg: null,
    add: function (sel) {
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
    set: function (sel, num) {
      var cs = Model.colors();
      var inv = 100 - num;

      EL.div.find('.major h3').text(num + '%');

      API.dial1.setColor(cs[0]).setInput(num);
      API.dial2.setColor(cs[1]).setInput(inv);
    },
    init: function (sel, num) {
      $.reify(EL);
      this.add(sel);
      this.set(sel, num);

      if (W._dbug > 1) C.debug([NOM, API]);

      this.init = this.set;
    },
  });

  API.EL = EL;
  return API;
});

/*



 */
