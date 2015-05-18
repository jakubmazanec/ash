'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isObjectLike = require('./isObjectLike');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

/** `Object#toString` result references. */
var STRING_TAG = '[object String]';

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
  return typeof value == 'string' || (0, _isObjectLike2.default)(value) && Object.prototype.toString.call(value) == STRING_TAG || false;
}

exports.default = isString;
module.exports = exports.default;