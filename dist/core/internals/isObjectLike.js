/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isObjectLike;

function isObjectLike(value) {
  return value && typeof value === 'object' || false;
}

module.exports = exports.default;