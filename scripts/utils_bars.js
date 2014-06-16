/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// shorthand
var Bars = (function (U) {
    var name = 'Bars',
    self = Object.create(null);

    /// glom onto a limit div
    U.bar = {
        div: null,
        glom: function (div) {
            div = $(div || '.accuracy .limit');
            this.div = div;
            this.maj = div.find('.major');
            this.min = div.find('.minor');
        },
        percent: function (num) {
            num = num || 0.5;
            num = num % 100;

            if (num <= 1) {
                num = num * 100;
            }
            num = num | 0;

            if (num < 50) {
                C.warn('normalize', num);
                num = 100 - num;
                this.swapColor();
            }
            this.setValue(this.maj, num); // mod major div
            this.setValue(this.min, 100 - num); // mod minor
        },
        setValue: function (ele, val) {
            if (val < 44) {
                ele.find('h3').text('');
            } else {
                ele.find('h3').text(val + '%');
            }
            ele.css({
                height: val + '%',
            });
            ele.data('value', val); // store
        },
        getValue: function (ele) {
            return ele.data('value');
        },
        setColor: function (ele, val) {
            ele.css({
                backgroundColor: val,
            });
            ele.data('color', val); // store
        },
        getColor: function (ele) {
            return ele.data('color');
        },
        swapColor: function () {
            this.colors(this.getColor(this.min), this.getColor(this.maj));
        },
        colors: function (c1, c2) {
            var cs = Data.colors();
            this.setColor(this.maj, c1 || cs[0]);
            this.setColor(this.min, c2 || cs[1]);
        },
        load: function (num) {
            self.colors();
            self.percent(num);
        },
        init: function (num) {
            if (this.inited) {
                this.load(num);
            } else {
                this.inited = true;
                self.glom();
                self.load(num);

                C.debug(name, self);
            }
        },
    };

    return (U.bar = $.extend(self, U.bar));

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
