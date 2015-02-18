"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var AshNode = _interopRequire(require("../class/AshNode"));

var AshElement = _interopRequire(require("../class/AshElement"));

var isAshElement = _interopRequire(require("./isAshElement"));

var constants = _interopRequire(require("./constants"));

// constants references
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

var createElement = function (tagName /*, props, children*/) {
	var props = arguments[1];
	var children = arguments[2];
	var i;

	if (typeof tagName !== "string" || !tagName.length) {
		throw new Error(tagName + " (tagName parameter) must be a nonempty string.");
	}

	// type check
	if (tagName && typeof props === "undefined" && !children) {
		return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, null);
	}

	if (Array.isArray(props)) {
		children = props;
		props = null;
	} /* else if (typeof children === 'string') {
   children = [children];
   }*/

	if (!Array.isArray(children)) {
		children = [];

		// children are not in an array, iterate over arguments...
		for (i = 2; i < arguments.length; i++) {
			if (typeof arguments[i] === "string") {
				children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
			} else if (isAshElement(arguments[i])) {
				children.push(arguments[i]);
			}
		}
	} else {
		// check type of children
		for (i = 0; i < children.length; i++) {
			if (typeof children[i] === "string") {
				children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
			} else if (!children[i]) {
				children.splice(i, 1);
				i--;
			} else if (!isAshElement(children[i])) {
				//throw new Error(children[i] + ' must be a AshElement object.');
				children.splice(i, 1);
				i--;
			}
		}
	}

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
};

module.exports = createElement;