var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

"use strict";

var ash = require("../ash");

var Display = (function (ash) {
  var Display = function Display() {
    ash.Component.apply(this, arguments);
  };

  _extends(Display, ash.Component);

  _classProps(Display, null, {
    getInitialState: {
      writable: true,
      value: function () {
        return { displayClicks: 0 };
      }
    },
    autobind: {
      writable: true,
      value: function () {
        return ["tick"];
      }
    },
    render: {
      writable: true,
      value: function () {
        var message = "Timer Clicks = " + this.props.timerClicks + " -- Display Click = " + this.state.displayClicks;

        return ash.e("div", null, [message, ash.e("button", {
          style: {
            color: this.state.displayClicks % 2 === 0 ? "red" : "blue"
          },
          events: {
            click: this.tick
          }
        }, "+")]);
      }
    },
    tick: {
      writable: true,
      value: function () {
        //console.log(this.name + ' tick!');
        this.setState({ displayClicks: this.state.displayClicks + 1 });
      }
    },
    onBeforeReceiveProps: {
      writable: true,
      value: function () {}
    },
    onMount: {
      writable: true,
      value: function () {}
    },
    onUnmount: {
      writable: true,
      value: function () {}
    }
  });

  return Display;
})(ash);

module.exports = ash.createFactory(Display);