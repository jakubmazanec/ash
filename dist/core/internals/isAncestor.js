'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
exports.default = isAncestor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function isAncestor(ancestor, value) {
	if (!(0, _isFunction2.default)(ancestor) || !(0, _isFunction2.default)(value) || ancestor === Function || value === Function) {
		return false;
	}

	if (ancestor === value) {
		return true;
	}

	if (ancestor === Function && value !== Object) {
		return true;
	}if (ancestor === Function && value === Object) {
		return false;
	}

	if (ancestor === Object && value === Function) {
		return true;
	} else if (ancestor === Object) {
		return true;
	}

	var prototype = undefined,
	    lastPrototype = undefined;

	while (prototype !== ancestor) {
		lastPrototype = prototype;
		prototype = Object.getPrototypeOf(value);

		if (lastPrototype === prototype) {
			return false;
		}

		if (prototype === ancestor) {
			return true;
		} else if (prototype === Function || prototype === Object) {
			return false;
		}
	}

	return false;
}

module.exports = exports.default;