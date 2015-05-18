'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _Number$isFinite = require('babel-runtime/core-js/number/is-finite').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isNative = require('./isNative');

var _isNative2 = _interopRequireDefault(_isNative);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = global.isFinite,
    nativeNumIsFinite = (0, _isNative2.default)(nativeNumIsFinite = _Number$isFinite) && nativeNumIsFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on ES `Number.isFinite`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(10);
 * // => true
 *
 * _.isFinite('10');
 * // => false
 *
 * _.isFinite(true);
 * // => false
 *
 * _.isFinite(Object(10));
 * // => false
 *
 * _.isFinite(Infinity);
 * // => false
 */
var isFinite = nativeNumIsFinite || function (value) {
  return typeof value == 'number' && nativeIsFinite(value);
};

exports.default = isFinite;
module.exports = exports.default;