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

var Store = (function (Observable) {
  var Store = function Store() {};

  _extends(Store, Observable);

  _classProps(Store, null, {
    trigger: {
      writable: true,
      value: function () {
        var action = this;

        if (arguments.length == 5) {
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

        return action;
      }
    }
  });

  return Store;
})(Observable);

module.exports = Store;