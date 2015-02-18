"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var bindCallback = _interopRequire(require("./bindCallback"));

var isIterateeCall = _interopRequire(require("./isIterateeCall"));

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
	return function () {
		var length = arguments.length,
		    object = arguments[0];
		var customizer;

		if (length < 2 || object === null) {
			return object;
		}
		if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
			length = 2;
		}
		// Juggle arguments.
		if (length > 3 && typeof arguments[length - 2] == "function") {
			customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
		} else if (length > 2 && typeof arguments[length - 1] == "function") {
			customizer = arguments[--length];
		}
		var index = 0;
		while (++index < length) {
			var source = arguments[index];
			if (source) {
				assigner(object, source, customizer);
			}
		}
		return object;
	};
}

module.exports = createAssigner;