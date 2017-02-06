/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define([], function () {
  'use strict';

  var W = (W && W.window || window);
  // var C = (W.C || W.console || {});

  var Knob;

  Knob = function (input, ui) {
    var container, evt, evts, settings;

    container = document.createElement('div');
    container.setAttribute('tabindex', 0);
    input.parentNode.replaceChild(container, input);
    input.style.cssText = 'position: absolute; top: -10000px';
    input.setAttribute('tabindex', -1);
    container.appendChild(input);

    settings = this.settings = this._getSettings(input);

    this.value = input.value = settings.min + settings.range / 2;
    this.input = input;
    this.min = settings.min;

    this.ui = ui;
    input.addEventListener('change', this.changed.bind(this), false);

    evts = {
      // use as static display
      //    keydown: this._handleKeyEvents.bind(this),
      //    mousewheel: this._handleWheelEvents.bind(this),
      //    DOMMouseScroll: this._handleWheelEvents.bind(this),
      //    touchstart: this._handleMove.bind(this, 'touchmove', 'touchend'),
      //    mousedown: this._handleMove.bind(this, 'mousemove', 'mouseup')
    };

    for (evt in evts) {
      container.addEventListener(evt, evts[evt], false);
    }

    container.style.cssText = 'position: relative;' + //
        'width:' + settings.width + 'px;' + //
        'height:' + settings.height + 'px;';

    ui.init(container, settings);
    this.container = container;
    this.changed(0);

  };
  Knob.prototype = {
    _handleKeyEvents: function (e) {
      var f, keycode;

      keycode = e.keyCode;

      if (keycode >= 37 && keycode <= 40) {
        e.preventDefault();
        f = 1 + e.shiftKey * 9;
        this.changed({
          37: -1,
          38: 1,
          39: 1,
          40: -1
        }[keycode] * f);
      }
    },
    _handleWheelEvents: function (e) {
      var deltaX, deltaY, val;

      e.preventDefault();
      deltaX = (e.detail * -1 || e.wheelDeltaX);
      deltaY = (e.detail * -1 || e.wheelDeltaY);
      val = deltaX > 0 || deltaY > 0 ? 1 : deltaX < 0 || deltaY < 0 ? -1 : 0;
      this.changed(val);
    },
    _handleMove: function (onMove, onEnd) {
      this.centerX = this.container.offsetLeft + this.settings.width / 2;
      this.centerY = this.container.offsetTop + this.settings.height / 2;
      var fnc = this._updateWhileMoving.bind(this);
      var body = document.body;
      body.addEventListener(onMove, fnc, false);
      body.addEventListener(onEnd, function () {
        body.removeEventListener(onMove, fnc, false);
      }, false);
    },
    _updateWhileMoving: function (event) {
      var e, x, y, deg, percent, range, value, step;

      event.preventDefault();
      e = event.changedTouches ? event.changedTouches[0] : event;
      x = this.centerX - e.pageX;
      y = this.centerY - e.pageY;
      deg = Math.atan2(-y, -x) * 180 / Math.PI + 90 - this.settings.angleoffset;

      if (deg < 0) {
        deg += 360;
      }
      deg = deg % 360;
      if (deg <= this.settings.anglerange) {
        percent = Math.max(Math.min(1, deg / this.settings.anglerange), 0);
      } else {
        percent = +(deg - this.settings.anglerange < (360 - this.settings.anglerange) / 2);
      }
      range = this.settings.range;
      value = this.min + range * percent;

      step = (this.settings.max - this.min) / range;
      this.value = this.input.value = Math.round(value / step) * step;
      this.ui.update(percent, this.value);
    },
    changed: function (direction) {
      this.input.value = this.limit(parseFloat(this.input.value) + direction * (this.input.step || 1));
      this.value = this.input.value;
      this.ui.update(this._valueToPercent(), this.value);
    },
    _valueToPercent: function () {
      return this.value !== null ? 100 / this.settings.range * (this.value - this.min) / 100 : this.min;
    },
    limit: function (value) {
      return Math.min(Math.max(this.settings.min, value), this.settings.max);
    },
    _getSettings: function (input) {
      var labels, settings, data, i;

      if (input.dataset.labels) {
        labels = input.dataset.labels.split(',');
      }
      settings = {
        max: labels ? labels.length - 1 : parseFloat(input.max),
        min: labels ? 0 : parseFloat(input.min),
        step: parseFloat(input.step) || 1,
        angleoffset: 0,
        anglerange: 360,
        labels: labels
      };
      settings.range = settings.max - settings.min;
      data = input.dataset;

      for (i in data) {
        if (data.hasOwnProperty(i) && i !== 'labels') {
          var value = +data[i];
          settings[i] = isNaN(value) ? data[i] : value;
        }
      }
      return settings;
    }
  };

  return Knob;
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
