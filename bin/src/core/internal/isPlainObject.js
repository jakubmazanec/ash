"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isNative = _interopRequire(require("./isNative"));

var shimIsPlainObject = _interopRequire(require("./shimIsPlainObject"));

/** `Object#toString` result references. */
var OBJECT_TAG = "[object Object]";

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!(value && Object.prototype.toString.call(value) == OBJECT_TAG)) {
    return false;
  }

  var valueOf = value.valueOf;
  var objProto = isNative(valueOf) && (objProto = Object.getPrototypeOf(valueOf)) && Object.getPrototypeOf(objProto);

  return objProto ? value == objProto || Object.getPrototypeOf(value) == objProto : shimIsPlainObject(value);
}

module.exports = isPlainObject;