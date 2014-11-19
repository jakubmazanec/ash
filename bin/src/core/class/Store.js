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

var Store = (function (Observable) {
  var Store = function Store() {};

  _extends(Store, Observable);

  return Store;
})(Observable);

module.exports = Store;