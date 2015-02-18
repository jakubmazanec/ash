"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isLength = _interopRequire(require("./isLength"));

var isObject = _interopRequire(require("./isObject"));

var values = _interopRequire(require("./values"));

/**
 * Converts `value` to an array-like object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array|Object} Returns the array-like object.
 */
function toIterable(value) {
	if (value === null) {
		return [];
	}
	if (!isLength(value.length)) {
		return values(value);
	}
	return isObject(value) ? value : Object(value);
}

module.exports = toIterable;