'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return value && typeof value == 'object' || false;
}

exports.default = isObjectLike;
module.exports = exports.default;