"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isLength = _interopRequire(require("./isLength"));

var isObjectLike = _interopRequire(require("./isObjectLike"));

/** `Object#toString` result references. */
var ARGS_TAG = "[object Arguments]";

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })();
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return isLength(length) && Object.prototype.toString.call(value) == ARGS_TAG || false;
}

module.exports = isArguments;