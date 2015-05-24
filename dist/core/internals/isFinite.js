'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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

exports.default = Number.isFinite || function (value) {
  return typeof value === 'number' && global.isFinite(value);
};

module.exports = exports.default;