/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isFunction = function (value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value === 'function' || false;
};

// Fallback for environments that return incorrect `typeof` operator results.
if (isFunction(/x/) || global.Uint8Array && !isFunction(global.Uint8Array)) {
  isFunction = function (value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in older versions of Chrome and Safari which return 'function' for regexes
    // and Safari 8 equivalents which return 'object' for typed array constructors.
    return Object.prototype.toString.call(value) === '[object Function]';
  };
}

exports.default = isFunction;
module.exports = exports.default;