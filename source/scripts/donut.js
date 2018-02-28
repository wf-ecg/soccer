/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-28
  IDEA    Generate donut ui (svg)
  NOTE    ???
  TODO    ???

 */
define(['libs/ui', 'libs/knob',
], function (Ui, Knob) {
  'use strict';

  var NOM = 'Donut';
  var C = console;
  // var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  function Donut(input, defs) {
    this.defs = defs;
    this.knob = new Knob(input, this);
  }
  Donut.prototype = Object.create(Ui.prototype);
  Donut.prototype.createElement = function () {
    var arc;

    Ui.prototype.createElement.apply(this, arguments);

    this.addComponent(new Ui.Arc({
      arcWidth: this.width / this.defs.girth,
    }));
    this.merge(this.options, {
      arcWidth: this.width / this.defs.girth,
    });

    arc = new Ui.El.Arc(this.options);
    arc.setAngle(this.options.anglerange);

    this.el.node.appendChild(arc.node);
    this.el.node.setAttribute('class', 'p2');
  };

  // - - - - - - - - - - - - - - - - - -

  return Donut;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*





 */
