"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isObjectLike = _interopRequire(require("./isObjectLike"));

/** `Object#toString` result references. */
var STRING_TAG = "[object String]";

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == "string" || isObjectLike(value) && Object.prototype.toString.call(value) == STRING_TAG || false;
}

module.exports = isString;