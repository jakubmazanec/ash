'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
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