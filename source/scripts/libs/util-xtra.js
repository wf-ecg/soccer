/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'util_d'], function ($, U) {
  'use strict';
  // var W = window;
  var C = console;

  C.info('extending Utils w/Xtra');

  function _liftpic(pic, path) {
    // make dom img with path
    var clip = pic.parent();
    var div = clip.parent();
    var img = $('<img>');

    function _shifter() {
      var off = U.dim.getCenter(img);
      U.dim.centerMiddle(img, off, pic);
    }

    div.attr('title', 'Enlarge') //
      .addClass('raise') //
      .on('click', function () {
        img.toggle(333);
      });

    img.attr('src', path) //
      .addClass('raise') //
      .insertAfter(clip) //
      .load(_shifter);
  }

  U.tweakpath = function (pic, arr) { // pic'src'.swap[a, b]
    try {
      return $(pic).attr('src').replace(arr[0], arr[1]);
    } catch (E) {
      throw new Error('need an image object to process');
    }
  };

  U.addPicLifters = function (swap) {
    $('img.raise').remove();
    return $('.fill').each(function () {
      var me = $(this);

      try {
        _liftpic(me, U.tweakpath(me, swap));
      } catch (E) {
        throw 'no dice';
      }
    });
  };

  U.attributeTitles = function (sel) {
    return $(sel).each(function () {
      var me = $(this);
      me.attr('title', me.attr('alt'));
    });
  };

  U.picker = function (menu, games) {
    menu.empty();
    $.each(games, function (i, e) {
      if (!e) return;
      var opt = $('<option>').text('Game ' + i).val(i);
      menu.append(opt);
    });
  };

  return U;
});

/*



 */
