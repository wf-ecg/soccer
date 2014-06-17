/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Pass = (function (U) {
    var name = 'Pass',
        self = Object.create(null),
        I;

    U.pass = {
        div: '.accuracy .limit',
        maj: '.major',
        min: '.minor',
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
                I.swapColor();
            }
            I.setValue(I.maj, num); // mod major div
            I.setValue(I.min, 100 - num); // mod minor
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
            I.colors(I.getColor(I.min), I.getColor(I.maj));
        },
        colors: function (c1, c2) {
            var cs = Data.colors();

            I.setColor(I.maj, c1 || cs[0]);
            I.setColor(I.min, c2 || cs[1]);
        },
        load: function (num) {
            I.colors();
            I.percent(num);
        },
        init: function (num) {
            if (I.inited) {
                I.load(num);
            } else {
                I.inited = true;
                I.div = $(I.div);
                I.maj = I.div.find(I.maj);
                I.min = I.div.find(I.min);
                I.load(num);

                C.debug(name, self);
            }
        },
    };

    return (I = U.pass = $.extend(self, U.pass));

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
