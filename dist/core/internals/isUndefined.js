/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isUndefined;

function isUndefined(value) {
  return typeof value === 'undefined';
}

module.exports = exports.default;