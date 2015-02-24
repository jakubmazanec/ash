"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isFunction = _interopRequire(require("./isFunction"));

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
function isAncestor(ancestor, value) {
	if (!isFunction(ancestor) || !isFunction(value) || ancestor === Function) {
		return false;
	}

	var prototype;

	while (prototype !== value) {
		prototype = Object.getPrototypeOf(value);

		if (prototype === ancestor) {
			return true;
		} else if (prototype === Function) {
			return false;
		}
	}

	return false;
}

module.exports = isAncestor;