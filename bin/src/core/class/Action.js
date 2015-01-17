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

var _ = require("_");
var Observable = require("./Observable");

var triggerOptions = {
  noEventArgument: true
};

var Action = (function (Observable) {
  var Action = function Action() {
    Observable.apply(this, arguments);
  };

  _extends(Action, Observable);

  _classProps(Action, null, {
    trigger: {
      writable: true,
      value: function () {
        var action = this;

        if (typeof action.onTrigger === "function") {
          Observable.prototype.trigger.call(this, "*", action.onTrigger.apply(action, arguments), triggerOptions);
        } else {
          if (arguments.length == 10) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], triggerOptions);
          } else if (arguments.length == 9) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], triggerOptions);
          } else if (arguments.length == 8) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], triggerOptions);
          } else if (arguments.length == 7) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], triggerOptions);
          } else if (arguments.length == 6) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], triggerOptions);
          } else if (arguments.length == 5) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], triggerOptions);
          } else if (arguments.length == 4) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], arguments[3], triggerOptions);
          } else if (arguments.length == 3) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], arguments[2], triggerOptions);
          } else if (arguments.length == 2) {
            Observable.prototype.trigger.call(this, "*", arguments[0], arguments[1], triggerOptions);
          } else if (arguments.length) {
            Observable.prototype.trigger.call(this, "*", arguments[0], triggerOptions);
          } else {
            Observable.prototype.trigger.call(this, "*", triggerOptions);
          }
        }

        return action;
      }
    }
  });

  return Action;
})(Observable);

module.exports = Action;