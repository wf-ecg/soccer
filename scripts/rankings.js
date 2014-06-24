/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (U) {
    var dat, div, rows, name = 'rankings',
        I = Object.create(null);

    div = $('.rankings table');
    rows = div.find('tr').not(':first-child');

    U[name] = $.extend(I, {
        set: function (data) {
            dat = data;
            return I;
        },
        getCxy: function (c, r) {
            var tmp = rows.eq(r);
            tmp = tmp.children().eq(c);
            return tmp;
        },
        get: function () {
            return dat;
        },
        fillup: function () {
            var y = 0;
            $.each(dat, function (i, row) {

                I.getCxy(0, y).find('img').attr({
                    src: './images/flags/' + i.toLowerCase() + '.png',
                    alt: i,
                });
                I.getCxy(1, y).text(i);

                $.each(row, function (j, cell) {
                    I.getCxy(j + 2, y).text(cell);
                });

                y++;
            });
        },
        init: function (dat) {
            this.set(dat).fillup();

            C.debug([name, I]);
        },
    });

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
