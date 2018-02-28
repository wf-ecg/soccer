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
      var dial1 = Dial.make('blue', 50);
      var dial2 = Dial.make('red', 33);
      var foo = EL.div.find('div').first();

      foo.prepend(dial1.svg, dial2.svg);
      foo.append(dial1.input, dial2.input);

      dial2.circle.css({
        transform: 'scaleX(-1) rotate(-90deg)',
      });

      API.dial1 = dial1;
      API.dial2 = dial2;
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
