/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Knob, Ui, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Circ = (function (U) {
    var name = 'Circ',
    self = Object.create(null);

    U.circ = {
        defs: {
            girth: 7,
            // 2 = full ... 200 = hairline
            granularity: 0,
        },
        div: '.possession',
        bar: null,
        add: function (sel) {
            var obj;

            sel = $(sel);
            obj = new Knob(sel[0], new Ui['P2']());
            sel.data('Knob', obj);

            return (this.svg = obj);
        },
        proto: function () {
            Ui.P2 = function () {};
            Ui.P2.prototype = Object.create(Ui.prototype);
            Ui.P2.prototype.createElement = function () {
                var arc;

                Ui.prototype.createElement.apply(this, arguments);

                this.addComponent(new Ui.Arc({
                    arcWidth: this.width / self.defs.girth,
                }));
                this.merge(this.options, {
                    arcWidth: this.width / self.defs.girth,
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

            paths.eq(0).css('fill', cs[0]);
            paths.eq(1).css('fill', cs[1]);
        },
        init: function (sel) {
            if (this.inited) {
                this.load();
            } else {
                this.inited = true;

                this.proto();
                this.add(sel);
                this.load();

                C.debug(name, self);
            }
        },
    };

    return (U.circ = $.extend(self, U.circ));

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
