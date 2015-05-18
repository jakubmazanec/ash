'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
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