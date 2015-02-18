"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isArguments = _interopRequire(require("./isArguments"));

var isArray = _interopRequire(require("./isArray"));

var isIndex = _interopRequire(require("./isIndex"));

var isLength = _interopRequire(require("./isLength"));

var isObject = _interopRequire(require("./isObject"));

var support = _interopRequire(require("../support"));

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
	if (object === null) {
		return [];
	}
	if (!isObject(object)) {
		object = Object(object);
	}
	var length = object.length;
	length = length && isLength(length) && (isArray(object) || support.nonEnumArgs && isArguments(object)) && length || 0;

	var Ctor = object.constructor,
	    index = -1,
	    isProto = typeof Ctor == "function" && Ctor.prototype == object,
	    result = Array(length),
	    skipIndexes = length > 0;

	while (++index < length) {
		result[index] = index + "";
	}
	for (var key in object) {
		if (!(skipIndexes && isIndex(key, length)) && !(key == "constructor" && (isProto || !Object.prototype.hasOwnProperty.call(object, key)))) {
			result.push(key);
		}
	}
	return result;
}

module.exports = keysIn;