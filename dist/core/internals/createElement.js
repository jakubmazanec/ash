'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createElement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesAshNode = require('../classes/AshNode');

var _classesAshNode2 = _interopRequireDefault(_classesAshNode);

var _classesAshElement = require('../classes/AshElement');

var _classesAshElement2 = _interopRequireDefault(_classesAshElement);

var _isAshElement = require('./isAshElement');

var _isAshElement2 = _interopRequireDefault(_isAshElement);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _classesComponent = require('../classes/Component');

var _classesComponent2 = _interopRequireDefault(_classesComponent);

var _internalsIsAncestor = require('../internals/isAncestor');

var _internalsIsAncestor2 = _interopRequireDefault(_internalsIsAncestor);

var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function createElement(tagName, props /*, children...*/) {
	var children = [];

	if (typeof tagName !== 'string' && typeof tagName === 'function' && (0, _internalsIsAncestor2.default)(_classesComponent2.default, tagName)) {
		return new _classesAshElement2.default(COMPONENT_ASH_ELEMENT, tagName, arguments[1]);
	} else if (typeof tagName === 'string' && !tagName.length) {
		throw new Error(tagName + ' (tagName) must be non-empty string or Component class.');
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, null);
	}

	for (var i = 2; i < arguments.length; i++) {
		if (typeof arguments[i] === 'string' || typeof arguments[i] === 'number') {
			children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, '' + arguments[i]));
		} else if ((0, _isAshElement2.default)(arguments[i])) {
			children.push(arguments[i]);
		} else if (Array.isArray(arguments[i])) {
			for (var j = 0; j < arguments[i].length; j++) {
				if (typeof arguments[i][j] === 'string' || typeof arguments[i] === 'number') {
					children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, '' + arguments[i][j]));
				} else if ((0, _isAshElement2.default)(arguments[i][j])) {
					children.push(arguments[i][j]);
				}
			}
		}
	}

	return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, props, children);
}

module.exports = exports.default;