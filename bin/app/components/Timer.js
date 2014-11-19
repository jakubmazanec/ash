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
var Display = require("./Display");

var Timer = (function (ash) {
  var Timer = function Timer() {
    ash.Component.apply(this, arguments);
  };

  _extends(Timer, ash.Component);

  _classProps(Timer, null, {
    getInitialState: {
      writable: true,
      value: function () {
        return { timerClicks: 0 };
      }
    },
    autobind: {
      writable: true,
      value: function () {
        return ["tick"];
      }
    },
    tick: {
      writable: true,
      value: function () {
        console.log("timer tick!");
        this.setState({ timerClicks: this.state.timerClicks + 1 });
      }
    },
    onMount: {
      writable: true,
      value: function () {}
    },
    onUnmount: {
      writable: true,
      value: function () {}
    },
    onBeforeMount: {
      writable: true,
      value: function () {}
    },
    render: {
      writable: true,


      /*shouldUpdate () {
      	return false;
      }*/

      value: function () {
        return ash.e("div", null, [Display({ timerClicks: this.state.timerClicks }), ash.e("button", {
          style: {
            color: this.state.timerClicks % 2 === 0 ? "red" : "blue"
          },
          events: {
            click: this.tick
          }
        }, "+")]);
      }
    }
  });

  return Timer;
})(ash);

module.exports = ash.createFactory(Timer);