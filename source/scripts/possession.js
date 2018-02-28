/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-28
  IDEA    Generate and modify ball-possession donut
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'model', 'donut', 'dial',
], function ($, Model, Donut, Dial) {
  'use strict';

  var API, EL;
  var NOM = 'Possession';
  var C = console;
  // var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  EL = {
    div: '.possession',
  };
  API = Object.create({
    EL: EL,
    Dial: Dial,
    Donut: Donut,
    Model: Model,
    //
    svg: null,
    add: function (sel) {
      var obj;

      sel = $(sel);
      obj = new Donut(sel[0], {
        girth: 7,
        // 2 = full ... 200 = hairline
        granularity: 0,
      });
      sel.data('DonutKnob', obj);

      this.svg = obj.knob;
    },
    set: function (num) {
      this.svg.changed(-100 / 5);
      this.svg.changed(num / 5);
      EL.div.find('.major h3').text(num + '%');
    },
    load: function () {
      var cs, paths;

      cs = Model.colors();
      $.reify(EL);
      paths = EL.div.find('path');

      paths.eq(0).css('fill', cs[1]);
      paths.eq(1).css('fill', cs[0]);
    },
    test: function () {
      var dial = Dial.make();

      EL.div.prev().prepend(dial.input, dial.svg);

      API.dial = dial;
    },
    init: function (sel, num) {
      this.add(sel);
      this.load();
      this.set(num);
      this.test();

      C.debug([NOM, API]);

      this.init = this.load;
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*





 */
