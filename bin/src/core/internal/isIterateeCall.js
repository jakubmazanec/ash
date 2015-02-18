"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isIndex = _interopRequire(require("./isIndex"));

var isLength = _interopRequire(require("./isLength"));

var isObject = _interopRequire(require("./isObject"));

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  var prereq;
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number") {
    var length = object.length;
    prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == "string" && index in object;
  }
  return prereq && object[index] === value;
}

module.exports = isIterateeCall;