"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var baseIsMatch = _interopRequire(require("./baseIsMatch"));

var isStrictComparable = _interopRequire(require("./isStrictComparable"));

var keys = _interopRequire(require("./keys"));

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which supports specifying whether
 * `source` should be cloned.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
	var props = keys(source),
	    length = props.length;

	if (length == 1) {
		var key = props[0],
		    value = source[key];

		if (isStrictComparable(value)) {
			return function (object) {
				return object != null && value === object[key] && hasOwnProperty.call(object, key);
			};
		}
	}
	var values = Array(length),
	    strictCompareFlags = Array(length);

	while (length--) {
		value = source[props[length]];
		values[length] = value;
		strictCompareFlags[length] = isStrictComparable(value);
	}
	return function (object) {
		return baseIsMatch(object, props, values, strictCompareFlags);
	};
}

module.exports = baseMatches;