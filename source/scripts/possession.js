/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['data', 'libs/knob', 'libs/ui'], function (Data, Knob, Ui) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var EL = {
    div: '.possession',
  };
  var name = 'possession';
  var MY = Object.create(null);

  $.extend(MY, {
    _EL: EL,
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

      MY.svg = obj;
    },
    set: function (num) {
      MY.svg.changed(-100 / 5);
      MY.svg.changed(num / 5);
      EL.div.find('.major h3').text(num + '%');
    },
    proto: function () {
      Ui.Donut = function () {};
      Ui.Donut.prototype = Object.create(Ui.prototype);
      Ui.Donut.prototype.createElement = function () {
        var arc;

        Ui.prototype.createElement.apply(this, arguments);

        this.addComponent(new Ui.Arc({
          arcWidth: this.width / MY.defs.girth,
        }));
        this.merge(this.options, {
          arcWidth: this.width / MY.defs.girth,
        });

        arc = new Ui.El.Arc(this.options);
        arc.setAngle(this.options.anglerange);

        this.el.node.appendChild(arc.node);
        this.el.node.setAttribute('class', 'p2');
      };
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
      if (MY.inited) {
        MY.load();
      } else {
        MY.inited = true;

        MY.proto();
        MY.add(sel);
        MY.load();
        MY.set(num);

        C.debug([name, MY]);
      }
    },
  });

  return MY;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
