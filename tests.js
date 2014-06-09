/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// shorthand
var U = Utils;

var Test = $.Callbacks();

function dla(fn) {
    Test.add( Utils.delay(fn) );
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function kicker() {
    U.pre('fire tests');
    Test.fire();
}

dla(function () {
    U.pre('test', 1);
    dla(function () {
        U.pre('test', 2);
        dla(function () {
            U.pre('test', 3);
        });
    });
});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(function () {
    U.put();
    kicker();
});

/*


*/
