/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'util'], function ($, UT) {
  'use strict';
  var W = window;
  var C = W._dbug;

  C('info', 'extending Utils w/Dim');

  UT.dim = {
    gxy: function (ele) { // size probe
      ele = $(ele);
      return [ele.width(), ele.height()];
    },
    difs: function (arr1, arr2) { // array subract
      return $.map(arr1, function (e, i) {
        return arr2[i] - e;
      });
    },
    frac: function (arr, fact) { // array divide
      return $.map(arr, function (e) {
        return e / fact;
      });
    },
    offs: function (ele, xy) { // element shifting
      ele.css({
        left: -xy[1],
        top: -xy[0],
      });
    },
    centxy: function (img) { // calc a quadarent
      img = $(img);
      return img ? this.frac(this.gxy(img), 2) : [0, 0];
    },
    fourxy: function (tmp) { // css shorthand (trbl) expansion from xy
      var arr = tmp.concat();
      // from x,[ty[,r,b,l]]
      arr[0] = arr[0] || 0;
      arr[1] = arr[1] || arr[0];
      arr[2] = arr[2] || arr[0];
      arr[3] = arr[3] || arr[1];
      arr[4] = arr[4] || arr[2];
      arr.shift(); // drop x
      return arr;
    },
    //   reduce/centralize boundary (reverse)
    prox: function (img, arr, pic) {
      var rxy;
      img = $(img);
      arr = this.fourxy(arr || this.centxy(img));

      if (pic) {
        rxy = this.centxy(pic); // relative to center of ?
      }

      img.css({
        marginTop: -arr[0],
        marginRight: -arr[1],
        marginBottom: -arr[2],
        marginLeft: -arr[3],
        //   set axis reletive to the reversed boundary
        left: rxy ? rxy[0] : null,
        top: rxy ? rxy[1] : null,
        // right: mid[1], bottom: mid[2],
      });
    },
  };

  return UT;
});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
