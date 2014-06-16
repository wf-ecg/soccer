/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var U = Utils;

U.tweakpath = function (pic, arr) { // pic'src'.swap[a, b]
    try {
        return $(pic).attr('src').replace(arr[0], arr[1]);
    } catch (E) {
        throw new Error('need an image object to process');
    }
};

$.fn.lifter = function () {

    this.each(function () {
        var me, swap, md;

        me = $(this);
        swap = 'sm,md';

        try {
            swap = swap.split(',');
            md = U.tweakpath(me, swap);
            U.liftpic(me, md);
        } catch (E) {
            md = 'no dice';
        }
    });
};

U.liftpic = function (pic1, path) {
    // make dom img with path
    var pic2;

    function _shifter() {
        var off = U.dim.centxy(pic2);
        U.dim.prox(pic2, off, pic1);
    }

    pic1.parent() //
    .attr('title', 'ENLARGE') //
    .addClass('float') //
    .click(function () {
        pic2.toggle(333);
    });

    pic2 = $('<img>') //
    .addClass('fill float') //
    .attr('src', path) //
    .insertAfter(pic1) //
    .load(_shifter);
};

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
            return tmp
        },
        get: function () {
            return dat;
        },
        fillup: function () {
            var y = 0;
            $.each(dat, function(i, row){

                self.getCxy(0, y).find('img').attr({
                    src: './images/flags/' + i.toLowerCase() + '.png',
                    alt: i,
                });
                self.getCxy(1, y).text(i);

                $.each(row, function(j, cell){
                    self.getCxy(j + 2, y).text(cell);
                });

                y++;
            });
        },
    };

    return self;
}());

U.picker = (function () {
    return {
        menu: function (menu, games) {
            $.each(games, function (i, e) {
                if (!e) return;
                var opt = $('<option>').text('Game ' + i).val(i);
                menu.append(opt);
            });
        },
    };
}());
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
