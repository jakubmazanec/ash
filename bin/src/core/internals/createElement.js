'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

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

// constants references
var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function createElement(tagName /*, props, children*/) {
	var props;
	var children;

	if (typeof tagName !== 'string' && typeof tagName === 'function' && _internalsIsAncestor2.default(_classesComponent2.default, tagName)) {
		return new _classesAshElement2.default(COMPONENT_ASH_ELEMENT, tagName, arguments[1]);
	} else if (typeof tagName === 'string' && !tagName.length) {
		throw new Error(tagName + ' (tagName) must be non-empty string or Component class.');
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, null);
	}

	/*if (Array.isArray(arguments[1])) {
 	children = arguments[1];
 	props = null;
 } else {
 	props = arguments[1];
 }
 
 if (!children && !Array.isArray(arguments[2])) {
 	children = [];
 
 	// children are not in an array, iterate over arguments...
 	for (let i = 2; i < arguments.length; i++) {
 		if (typeof arguments[i] === 'string') {
 			children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
 		} else if (isAshElement(arguments[i])) {
 			children.push(arguments[i]);
 		}
 	}
 } else {
 	children = children || arguments[2];
 
 	// check type of children
 	for (let i = 0; i < children.length; i++) {
 		if (typeof children[i] === 'string') {
 			children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
 		} else if (!isAshElement(children[i])) {
 			//children[i] = null;
 			children.splice(i, 1);
 			i--;
 		}
 	}
 }*/

	if (typeof arguments[1] !== 'object') {
		props = null;
	} else {
		props = arguments[1];
	}

	if (!Array.isArray(arguments[2])) {
		children = [];

		// children are not in an array, iterate over arguments...
		for (var i = 2; i < arguments.length; i++) {
			if (typeof arguments[i] === 'string') {
				children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, arguments[i]));
			} else if (_isAshElement2.default(arguments[i])) {
				children.push(arguments[i]);
			}
		}
	} else {
		children = arguments[2];

		// check type of children
		for (var i = 0; i < children.length; i++) {
			if (typeof children[i] === 'string') {
				children[i] = new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, children[i]);
			} else if (!_isAshElement2.default(children[i])) {
				//children[i] = null;
				children.splice(i, 1);
				i--;
			}
		}
	}

	return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, props, children);
}

exports.default = createElement;
module.exports = exports.default;