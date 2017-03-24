/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -
  // AUTOMATE
  $.reify = function (obj) { // replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      if (typeof sel === 'object') {
        sel = sel.selector;
      }
      (obj[i] = $(sel)).selector = sel;
    });
  };

  // - - - - - - - - - - - - - - - - - -
  // PUBSUBS
  var Q = $.pubsubs = $({});

  $.publish = function () { // o.trigger.bind(o)
    Q.trigger.apply(Q, arguments);
  };
  $.subscribe = function () { // o.on.bind(o)
    Q.on.apply(Q, arguments);
  };
  $.unsubscribe = function () { // o.off.bind(o)
    Q.off.apply(Q, arguments);
  };
  $.fn.mediate = function (event, limit, topic) {
    return this.on(event, _.debounce(function (evt) {
      $.publish(topic, evt);
    }, limit));
  };

  // NEW
  // add namespace to event names
  $.jqns = function (evs, ns) {
    var arr = (evs || '').split(' ');

    arr = arr.map(function (str) {
      return str + '.' + ns;
    });

    return arr.join(' ');
  };

  $.fn.activate = function (bool) {
    var ele = $(this);
    if (bool) {
      ele.removeClass('inactive');
    } else {
      ele.addClass('inactive');
    }
  };

  $.adaDebug = function () {
    $('body').on('focus', '*', function (evt) {
      evt.stopPropagation();
      C.debug('$.adaDebug', this);
    });
  };

  // - - - - - - - - - - - - - - - - - -
  // WATCHERS
  $.watchHash = function () {
    function trackHash() {
      var MY = trackHash,
        hash = W.location.hash.slice(1),
        prev = MY.previous;
      if (prev !== hash) {
        $('html').removeClass(prev).addClass(hash);
        MY.previous = hash;
      }
      return MY;
    }
    $(W).on('hashchange', trackHash());
  };
  $.watchInputDevice = function () {
    var body = $('body');
    body.on('keydown', _.debounce(function () {
      body.removeClass('mouse').addClass('keyboard');
    }, 333)).on('mouseover', function () { // `mousemove` has side effects on windows browsers
      body.removeClass('keyboard').addClass('mouse');
    });
  };
  $.watchResize = function (fn, ns) {
    ns = 'resize.' + (ns || 'Util');
    $(W).off(ns);
    if (fn) {
      fn();
      $(W).on(ns, fn);
    }
  };
  $.swallowBackspace = function () {
    $(W.document).on('keydown', function (evt) {
      var ele = $(evt.target || evt.srcElement);
      if (evt.keyCode === 8 && !ele.is('input,[contenteditable="true"],textarea')) {
        evt.preventDefault();
      }
    });
  };
  $.markAgent = function () {
    var ua = W.navigator.userAgent;

    $.watchResize(function () {
      if (ua.match(/mobi/i) ||
        $(W).width() < 768) { // simulate
        $('html').addClass('mobi');
      } else {
        $('html').removeClass('mobi');
      }
      if (ua.match(/chrome/i)) {
        $('html').addClass('chrome');
      } else if (ua.match(/safari/i)) {
        $('html').addClass('safari');
      } else if (ua.match(/firefox/i)) {
        $('html').addClass('firefox');
      } else if (ua.match(/trident/i)) {
        $('html').addClass('trident');
      }
    }, 'markAgent');
  };

  // ETC

  $.altTitles = function () {
    $('*').each(function () {
      var me = $(this);
      me.attr('title', me.attr('alt'));
    });
  };

  $.fn.constantEvent = function (evn1, evn2, fn, ms) {

    return this.each(function () {
      var me = $(this),
        time;

      me.on(evn1, function () {
        if (!time) {
          time = W.setInterval(fn, ms || 33);
        }
      }).on(evn2, function () {
        W.clearInterval(time);
        time = null;
      });

      return function () {
        W.clearInterval(time);
      };
    });

  };

  $.fn.stretchTo = function (wid) {
    wid = (typeof wid === 'string' ? wid : 0);
    return this.each(function () {
      var me = $(this),
        dd = me.data();

      me.memwidth().css({
        display: 'inline-block',
        width: dd.memwidth,
        /*explicitly set width*/
      }).stop().animate({
        width: wid,
      }, 333, function () {
        me.addClass('stretch').css({
          display: wid ? '' : 'none',
        });
      });
    });
  };

  $.fn.unstretch = function () {
    return this.each(function () {
      var me = $(this),
        dd = me.data();

      me.css({
        display: 'inline-block',
      }).stop().animate({
          width: dd.memwidth,
        }, //
        333,
        function () {
          me.removeClass('stretch').css({
            display: '',
            width: dd.memwidth,
          });
        });
    });
  };

  $.fn.readwidths = function (num) {
    var str;

    if (typeof num === 'string') {
      if (num === 'equal') {
        str = 100 / this.length + '%';
      } else if (num === 'overflo') {
        str = 100 / (this.length - 1) + '%';
      } else if (num === 'initial') {
        str = 'initial';
      }
    }

    return this.each(function () {
      var me = $(this),
        dd = me.data();

      me.css({
        width: str || dd['width' + num],
      });
    });
  };

  $.pubEscape = function () {
    $(W).on('keyup', function (evt) {
      if (evt.keyCode === 27) {
        $.publish('escape.Key');
      }
    });
  };

  $.inlineSvgs = function () {
    $('img.svg').each($.fn.inlineSvg);
  };
  $.fn.inlineSvg = function () {
    var $I = $(this),
      $S, size;
    size = { // force msie to respect size
      height: $I.css('height'),
      width: $I.css('width'),
    };
    $.get($I.attr('src'), function (data) {
      $S = $(data).find('svg').attr({
        id: $I.attr('id'),
        class: $I.attr('class'),
        style: ($I.attr('style') || '').replace('color', 'fill'),
        focusable: $I.attr('focusable'), // for msie 11
        'xmlns:a': null, // for validator.w3.org
      });
      // svg scales if the viewport is set
      if (!$S.attr('viewBox') && $S.attr('height') && $S.attr('width')) {
        $S.attr('viewBox', '0 0 ' + $S.attr('height') + ' ' + $S.attr('width'));
      }
      if ($I.attr('height') || $I.attr('width')) {
        $S.css(size);
      }
      $I.wrap('<span class="replaced-svg">').replaceWith($S);
      $S.css('visibility', 'visible');
    }, 'xml');
  };

  $.fn.finishLoading = function () {
    var me = $(this).removeClass('loading');

    W.setTimeout(function () {
      me.removeClass('loaded');
    }, 3e3);

    return me.addClass('loaded');
  };

  return $;
});
/*



 */
