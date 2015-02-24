"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var AshNode = _interopRequire(require("../class/AshNode"));

var AshElement = _interopRequire(require("../class/AshElement"));

var isAshElement = _interopRequire(require("./isAshElement"));

var constants = _interopRequire(require("./constants"));

var Component = _interopRequire(require("../class/Component"));

var isAncestor = _interopRequire(require("../internal/isAncestor"));

// constants references
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function createElement(tagName /*, props, children*/) {
	var props;
	var children;

	if (typeof tagName !== "string" && typeof tagName === "function" && isAncestor(Component, tagName)) {
		return AshElement.bind(null, COMPONENT_ASH_ELEMENT, tagName);
	} else if (typeof tagName === "string" && !tagName.length) {
		throw new Error(tagName + " (tagName) must be non-empty string or Component class.");
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, null);
	}

	if (Array.isArray(arguments[1])) {
		children = arguments[1];
		props = null;
	} else {
		props = arguments[1];
	}

	if (!children && !Array.isArray(arguments[2])) {
		children = [];

		// children are not in an array, iterate over arguments...
		for (var i = 2; i < arguments.length; i++) {
			if (typeof arguments[i] === "string") {
				children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
			} else if (isAshElement(arguments[i])) {
				children.push(arguments[i]);
			}
		}
	} else {
		children = children || arguments[2];

		// check type of children
		for (var i = 0; i < children.length; i++) {
			if (typeof children[i] === "string") {
				children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
			} else if (!isAshElement(children[i])) {
				//children[i] = null;
				children.splice(i, 1);
				i--;
			}
		}
	}

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
}

module.exports = createElement;