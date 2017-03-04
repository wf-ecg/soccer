/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'libs/util-dim'], function ($, UT) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  C.info('extending Utils w/Xtra');

  UT.tweakpath = function (pic, arr) { // pic'src'.swap[a, b]
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
        md = UT.tweakpath(me, swap);
        UT.liftpic(me, md);
      } catch (E) {
        md = 'no dice';
      }
    });
  };

  UT.liftpic = function (pic1, path) {
    // make dom img with path
    var pic2;

    function _shifter() {
      var off = UT.dim.centxy(pic2);
      UT.dim.prox(pic2, off, pic1);
    }

    pic1.parent() //
      .attr('title', 'ENLARGE') //
      .addClass('raise') //
      .on('click', function () {
        pic2.toggle(333);
      });

    pic2 = $('<img>') //
      .addClass('fill raise') //
      .attr('src', path) //
      .insertAfter(pic1) //
      .load(_shifter);
  };

  UT.picker = (function () {
    return {
      menu: function (menu, games) {
        menu.empty();
        $.each(games, function (i, e) {
          if (!e) {
            return;
          }
          var opt = $('<option>').text('Game ' + i).val(i);
          menu.append(opt);
        });
      },
    };
  }());

  return UT;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
