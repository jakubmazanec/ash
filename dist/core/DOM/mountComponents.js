'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = mountComponents;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;

function mountComponents(ashElement) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				mountComponents(ashElement.children[i]);
			}
		}
	} else if ((0, _internalsIsComponentAshElement2.default)(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle === LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

module.exports = exports.default;