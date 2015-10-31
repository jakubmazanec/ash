'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isElement;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isObjectLike = require('./isObjectLike');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */

function isElement(value) {
  return value && value.nodeType === 1 && (0, _isObjectLike2.default)(value) && Object.prototype.toString.call(value).indexOf('Element') > -1 || false;
}

module.exports = exports.default;