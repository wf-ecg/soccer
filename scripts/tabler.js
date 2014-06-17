/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var U = Utils;

U.tabler = (function () {
    var dat, div, rows, self;

    div = $('.ranking table');
    rows = div.find('tr').not(':first-child');

    self = {
        set: function (data) {
            dat = data;
            C.info('Tabler', dat);
            return self;
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

                self.getCxy(0, y).find('img').attr({
                    src: './images/flags/' + i.toLowerCase() + '.png',
                    alt: i,
                });
                self.getCxy(1, y).text(i);

                $.each(row, function (j, cell) {
                    self.getCxy(j + 2, y).text(cell);
                });

                y++;
            });
        },
    };

    return self;
}());

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
