/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['util', 'data', 'libs/knob', 'libs/ui'], function (U, Data, Knob, Ui) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  var name = 'possession',
    I = Object.create(null);

  U[name] = $.extend(I, {
    defs: {
      girth: 7,
      // 2 = full ... 200 = hairline
      granularity: 0,
    },
    div: '.possession',
    bar: null,
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
      this.div.find('.major h3').text(num + '%');
    },
    proto: function () {
      Ui.Donut = function () {};
      Ui.Donut.prototype = Object.create(Ui.prototype);
      Ui.Donut.prototype.createElement = function () {
        var arc;

        Ui.prototype.createElement.apply(this, arguments);

        this.addComponent(new Ui.Arc({
          arcWidth: this.width / I.defs.girth,
        }));
        this.merge(this.options, {
          arcWidth: this.width / I.defs.girth,
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
      this.div = $(this.div);
      paths = this.div.find('path');

      paths.eq(0).css('fill', cs[1]);
      paths.eq(1).css('fill', cs[0]);
    },
    init: function (sel, num) {
      if (this.inited) {
        this.load();
      } else {
        this.inited = true;

        this.proto();
        this.add(sel);
        this.load();
        this.set(num);

        C.debug([name, I]);
      }
    },
  });

});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
