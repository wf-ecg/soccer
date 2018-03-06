/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'util'], function ($, UT) {
  'use strict';
  // var W = window;
  var C = console;

  C.info('extending Utils w/Dim');

  UT.dim = {
    arrWH: function (ele) { // size probe
      ele = $(ele);
      return [ele.width(), ele.height()];
    },
    mapDivide: function (arr, fact) { // array divide
      return $.map(arr, function (e) {
        return e / fact;
      });
    },
    getCenter: function (img) { // calc a quadrant
      img = $(img);
      return img ? this.mapDivide(this.arrWH(img), 2) : [0, 0];
    },
    getTRBL: function (tmp) { // css shorthand (trbl) expansion from xy
      var arr = tmp.concat();
      // from x,[ty[,r,b,l]]
      arr[0] = arr[0] || 0;
      arr[1] = arr[1] || arr[0];
      arr[2] = arr[2] || arr[0];
      return {
        t: arr[1],
        r: arr[2],
        b: arr[3] || arr[1],
        l: arr[4] || arr[2],
      };
    },
    // centerize by negating size
    centerMiddle: function (img, arr, pic) {
      var css, obj, rxy;
      img = $(img);
      obj = this.getTRBL(arr || this.getCenter(img));

      if (pic) {
        rxy = this.getCenter(pic); // relative to center of ?
      }
      css = {
        marginTop: -obj.t,
        marginRight: -obj.r,
        marginBottom: -obj.b,
        marginLeft: -obj.l,
        // set position relative to center
        left: rxy ? rxy[0] : null,
        top: rxy ? rxy[1] : null,
      };

      img.css(css);
    },
  };

  return UT;
});

/*



 */
