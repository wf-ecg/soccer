/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define([], function () {
  'use strict';
  // var W = window;
  // var C = console;

  var Ui = function () {};

  Ui.prototype = {
    init: function (parentEl, options) {
      this.options = this.options || {};
      this.merge(this.options, options);
      this.width = options.width;
      this.height = options.height;
      this.createElement(parentEl);
      if (!this.components) {
        return;
      }
      this.components.forEach(function (component) {
        component.init(this.el.node, options);
      }.bind(this));
    },
    merge: function (dest, src) {
      var i;
      for (i in src) {
        if (src.hasOwnProperty(i)) {
          dest[i] = src[i];
        }
      }
      return dest;
    },
    addComponent: function (component) {
      this.components = this.components || [];
      this.components.push(component);
    },
    update: function (percent, value) {
      if (!this.components) {
        return;
      }
      this.components.forEach(function (component) {
        component.update(percent, value);
      });
    },
    createElement: function (parentEl) {
      this.el = new Ui.El(this.width, this.height);
      this.el.create('svg', {
        version: '1.2',
        baseProfile: 'tiny',
        width: this.width,
        height: this.height,
      });
      this.appendTo(parentEl);
    },
    appendTo: function (parent) {
      parent.appendChild(this.el.node);
    },
  };
  // - - - - - -
  Ui.Pointer = function (options) {
    this.options = options || {};
    if (!this.options.type && Ui.El[this.options.type]) {
      this.options.type = 'Triangle';
    }
  };
  Ui.Pointer.prototype = Object.create(Ui.prototype);
  Ui.Pointer.prototype.update = function (percent) {
    this.el.rotate( //
      this.options.angleoffset + percent * this.options.anglerange, //
      this.width / 2, //
      this.height / 2 //
    );
  };
  Ui.Pointer.prototype.createElement = function (parentEl) {
    if (!this.options.pointerHeight) {
      this.options.pointerHeight = this.height / 2;
    }
    if (this.options.type === 'Arc') {
      this.el = new Ui.El.Arc(this.options);
      this.el.setAngle(this.options.size);
    } else {
      this.el = new Ui.El[this.options.type]( //
        this.options.pointerWidth, //
        this.options.pointerHeight, //
        this.width / 2, //
        this.options.pointerHeight / 2 + this.options.offset //
      );
    }
    this.el.addClassName('pointer');
    this.appendTo(parentEl);
  };
  // - - - - - -
  Ui.Arc = function (options) {
    this.options = options || {};
  };
  Ui.Arc.prototype = Object.create(Ui.prototype);
  Ui.Arc.prototype.createElement = function (parentEl) {
    this.el = new Ui.El.Arc(this.options);
    this.appendTo(parentEl);
  };
  Ui.Arc.prototype.update = function (percent) {
    this.el.setAngle(percent * this.options.anglerange);
  };
  // - - - - - -
  Ui.Scale = function (options) {
    this.options = this.merge({
      steps: options.range / options.step,
      radius: this.width / 2,
      tickWidth: 1,
      tickHeight: 3,
    }, options);
    this.options.type = Ui.El[this.options.type || 'Rect'];
  };
  Ui.Scale.prototype = Object.create(Ui.prototype);
  Ui.Scale.prototype.createElement = function (parentEl) {
    var step, end, Shape, i, rect;

    this.el = new Ui.El(this.width, this.height);
    this.startAngle = this.options.angleoffset || 0;

    if (!this.options.radius) {
      this.options.radius = this.height / 2.5;
    }
    this.el.create('g');
    this.el.addClassName('scale');

    if (this.options.drawScale) {
      if (!this.options.labels) {
        step = this.options.anglerange / this.options.steps;
        end = this.options.steps + (this.options.anglerange === 360 ? 0 : 1);
        this.ticks = [];
        Shape = this.options.type;
        for (i = 0; i < end; i++) {
          rect = new Shape( //
            this.options.tickWidth, //
            this.options.tickHeight, //
            this.width / 2, //
            this.options.tickHeight / 2 //
          );

          rect.rotate(this.startAngle + i * step, this.width / 2, this.height / 2);
          this.el.append(rect);
          this.ticks.push(rect);
        }
      }
    }
    this.appendTo(parentEl);
    if (this.options.drawDial) {
      this.dial();
    }
  };
  Ui.Scale.prototype.dial = function () {
    var step, min, dialStep, end, i, text, label;

    step = this.options.anglerange / this.options.steps;
    min = this.options.min;
    dialStep = (this.options.max - min) / this.options.steps;
    end = this.options.steps + (this.options.anglerange === 360 ? 0 : 1);
    this.dials = [];

    if (!this.options.labels) {
      for (i = 0; i < end; i++) {
        text = new Ui.El.Text( //
          Math.abs(min + dialStep * i), //
          this.width / 2 - 2.5, //
          this.height / 2 - this.options.radius, //
          5, 5 //
        );

        this.el.append(text);
        text.rotate(this.startAngle + i * step, this.width / 2, this.height / 2);
        this.dials.push(text);
      }
    } else {
      step = this.options.anglerange / (this.options.labels.length - 1);
      for (i = 0; i < this.options.labels.length; i++) {
        label = this.options.labels[i];

        text = new Ui.El.Text( //
          label, //
          this.width / 2 - 2.5, //
          this.height / 2 - this.options.radius, //
          5, 5 //
        );

        this.el.append(text);
        text.rotate(this.startAngle + i * step, this.width / 2, this.height / 2);
        text.attr('text-anchor', 'middle');
        this.dials.push(text);
      }
    }

  };
  Ui.Scale.prototype.update = function (percent) {
    if (this.ticks) {
      if (this.activeStep) {
        this.activeStep.attr('class', '');
      }
      this.activeStep = this.ticks[Math.round(this.options.steps * percent)];
      this.activeStep.attr('class', 'active');
    }
    if (this.dials) {
      if (this.activeDial) {
        this.activeDial.attr('class', '');
      }
      this.activeDial = this.dials[Math.round(this.options.steps * percent)];
      if (this.activeDial) {
        this.activeDial.attr('class', 'active');
      }
    }
  };
  // - - - - - -
  Ui.Text = function () {};
  Ui.Text.prototype = Object.create(Ui.prototype);
  Ui.Text.prototype.createElement = function (parentEl) {
    this.parentEl = parentEl;
    this.el = new Ui.El.Text('', 0, this.height);
    this.appendTo(parentEl);
    this.el.center(parentEl);
  };
  Ui.Text.prototype.update = function (percent, value) {
    this.el.node.textContent = value;
    this.el.center(this.parentEl);
  };
  // - - - - - -
  Ui.El = function () {};
  Ui.El.prototype = {
    svgNS: 'http://www.w3.org/2000/svg',
    init: function (width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x || 0;
      this.y = y || 0;
      this.left = this.x - width / 2;
      this.right = this.x + width / 2;
      this.top = this.y - height / 2;
      this.bottom = this.y + height / 2;
    },
    create: function (type, attributes) {
      var key;

      this.node = document.createElementNS(this.svgNS, type);
      for (key in attributes) {
        this.attr(key, attributes[key]);
      }
    },
    rotate: function (angle, x, y) {
      this.attr( //
        'transform', //
        'rotate(' + angle + ' ' + (x || this.x) + ' ' + (y || this.y) + ')' //
      );
    },
    attr: function (attributeName, value) {
      if (value === null) {
        return this.node.getAttribute(attributeName) || '';
      }
      this.node.setAttribute(attributeName, value);
    },
    append: function (el) {
      this.node.appendChild(el.node);
    },
    addClassName: function (className) {
      this.attr('class', this.attr('class') + ' ' + className);
    },
  };
  // - - - - - -
  Ui.El.Triangle = function () {
    this.init.apply(this, arguments);
    this.create('polygon', {
      'points': this.left + ',' + //
        this.bottom + ' ' + //
        this.x + ',' + //
        this.top + ' ' + //
        this.right + ',' + //
        this.bottom, //
    });
  };
  Ui.El.Triangle.prototype = Object.create(Ui.El.prototype);
  // - - - - - -
  Ui.El.Rect = function () {
    this.init.apply(this, arguments);
    this.create('rect', {
      x: this.x - this.width / 2,
      y: this.y,
      width: this.width,
      height: this.height,
    });
  };
  Ui.El.Rect.prototype = Object.create(Ui.El.prototype);
  // - - - - - -
  Ui.El.Circle = function (radius, x, y) {
    if (arguments.length === 4) {
      x = arguments[2];
      y = arguments[3];
    }
    this.init(radius * 2, radius * 2, x, y);
    this.create('circle', {
      cx: this.x,
      cy: this.y,
      r: radius,
    });
  };
  Ui.El.Circle.prototype = Object.create(Ui.El.prototype);
  // - - - - - -
  Ui.El.Text = function (text, x, y, width, height) {
    this.create('text', {
      x: x,
      y: y,
      width: width,
      height: height,
    });
    this.node.textContent = text;
  };
  Ui.El.Text.prototype = Object.create(Ui.El.prototype);
  Ui.El.Text.prototype.center = function (element) {
    var width, height;

    width = element.getAttribute('width');
    height = element.getAttribute('height');
    this.attr('x', width / 2 - this.node.getBBox().width / 2);
    this.attr('y', height / 2 + this.node.getBBox().height / 4);
  };
  // - - - - - -
  Ui.El.Arc = function (options) {
    this.options = options;
    // when there are lables, do not shift the arc other wise
    // it will be 180 degree off compared to the labels
    this.options.angleoffset = (options.angleoffset || 0) - (this.options.labels ? 0 : 90);
    this.create('path');
  };
  Ui.El.Arc.prototype = Object.create(Ui.El.prototype);
  Ui.El.Arc.prototype.setAngle = function (angle) {
    this.attr('d', this.getCoords(angle));
  };
  Ui.El.Arc.prototype.getCoords = function (angle) {
    var startAngle, outerRadius, innerRadius, //
      startAngleDegree, endAngleDegree, center, //
      p1, p2, p3, p4, path, largeArcFlag;

    function pointOnCircle(radius, angle) {
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      };
    }
    startAngle = this.options.angleoffset;
    outerRadius = this.options.outerRadius || this.options.width / 2;
    innerRadius = this.options.innerRadius || this.options.width / 2 - this.options.arcWidth;

    // position the arc so that it's shifted half an angle backward
    // so that it's middle aligned when there're lables
    if (this.options.labels) {
      startAngle -= angle / 2;
    }
    startAngleDegree = Math.PI * startAngle / 180;
    endAngleDegree = Math.PI * (startAngle + angle) / 180;
    center = this.options.width / 2;

    p1 = pointOnCircle(outerRadius, endAngleDegree);
    p2 = pointOnCircle(outerRadius, startAngleDegree);
    p3 = pointOnCircle(innerRadius, startAngleDegree);
    p4 = pointOnCircle(innerRadius, endAngleDegree);

    path = 'M' + p1.x + ',' + p1.y;
    largeArcFlag = (angle < 180 ? 0 : 1);
    path += ' A' + outerRadius + ',' + outerRadius + ' 0 ' + largeArcFlag + ' 0 ' + p2.x + ',' + p2.y;
    path += 'L' + p3.x + ',' + p3.y;
    path += ' A' + innerRadius + ',' + innerRadius + ' 0 ' + largeArcFlag + ' 1 ' + p4.x + ',' + p4.y;
    path += 'L' + p1.x + ',' + p1.y;

    return path;
  };

  return Ui;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
