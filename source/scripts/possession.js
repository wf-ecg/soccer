/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-01-25
  IDEA    Generate and modify ball-possession svg (donut)
  NOTE    ???
  TODO    ???

 */
define(['jqxtn', 'data', 'libs/knob', 'libs/ui',
], function ($, Data, Knob, Ui) {
  'use strict';

  var API, EL;
  var NOM = 'Possession';
  var C = console;
  // var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  function proto() {
    Ui.Donut = function () {};
    Ui.Donut.prototype = Object.create(Ui.prototype);
    Ui.Donut.prototype.createElement = function () {
      var arc;

      Ui.prototype.createElement.apply(this, arguments);

      this.addComponent(new Ui.Arc({
        arcWidth: this.width / API.defs.girth,
      }));
      this.merge(this.options, {
        arcWidth: this.width / API.defs.girth,
      });

      arc = new Ui.El.Arc(this.options);
      arc.setAngle(this.options.anglerange);

      this.el.node.appendChild(arc.node);
      this.el.node.setAttribute('class', 'p2');
    };
  }

  // - - - - - - - - - - - - - - - - - -

  EL = {
    div: '.possession',
  };
  API = Object.create({
    EL: EL,
    defs: {
      girth: 7,
      // 2 = full ... 200 = hairline
      granularity: 0,
    },
    svg: null,
    add: function (sel) {
      var obj;

      sel = $(sel);
      obj = new Knob(sel[0], new Ui.Donut());
      sel.data('Knob', obj);

      this.svg = obj;
    },
    set: function (num) {
      this.svg.changed(-100 / 5);
      this.svg.changed(num / 5);
      EL.div.find('.major h3').text(num + '%');
    },
    load: function () {
      var cs, paths;

      cs = Data.colors();
      $.reify(EL);
      paths = EL.div.find('path');

      paths.eq(0).css('fill', cs[1]);
      paths.eq(1).css('fill', cs[0]);
    },
    init: function (sel, num) {
      proto();
      this.add(sel);
      this.load();
      this.set(num);

      C.debug([NOM, API]);

      this.init = this.load;
    },
  });

  return API;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*





 */
