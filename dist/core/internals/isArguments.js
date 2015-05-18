'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isLength = require('./isLength');

var _isLength2 = _interopRequireDefault(_isLength);

var _isObjectLike = require('./isObjectLike');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

/** `Object#toString` result references. */
var ARGS_TAG = '[object Arguments]';

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })();
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = (0, _isObjectLike2.default)(value) ? value.length : undefined;
  return (0, _isLength2.default)(length) && Object.prototype.toString.call(value) == ARGS_TAG || false;
}

exports.default = isArguments;
module.exports = exports.default;