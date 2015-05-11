'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
function isAncestor(ancestor, value) {
	if (!_isFunction2.default(ancestor) || !_isFunction2.default(value) || ancestor === Function || value === Function) {
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

	var prototype, lastPrototype;

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

exports.default = isAncestor;
module.exports = exports.default;