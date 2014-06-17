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
