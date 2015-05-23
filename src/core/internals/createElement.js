import AshNode from '../classes/AshNode';
import AshElement from '../classes/AshElement';
import isAshElement from './isAshElement';
import constants from './constants';
import Component from '../classes/Component';
import isAncestor from '../internals/isAncestor';

// constants references
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function createElement(tagName, props/*, children...*/) {
	var children = [];

	if (typeof tagName !== 'string' && typeof tagName === 'function' && isAncestor(Component, tagName)) {
		return new AshElement(COMPONENT_ASH_ELEMENT, tagName, arguments[1]);
	} else if (typeof tagName === 'string' && !tagName.length) {
		throw new Error(tagName + ' (tagName) must be non-empty string or Component class.');
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, null);
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

	for (let i = 2; i < arguments.length; i++) {
		if (typeof arguments[i] === 'string' || typeof arguments[i] === 'number') {
			children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, '' + arguments[i]));
		} else if (isAshElement(arguments[i])) {
			children.push(arguments[i]);
		} else if (Array.isArray(arguments[i])) {
			for (let j = 0; j < arguments[i].length; j++) {
				if (typeof arguments[i][j] === 'string' || typeof arguments[i] === 'number') {
					children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, '' + arguments[i][j]));
				} else if (isAshElement(arguments[i][j])) {
					children.push(arguments[i][j]);
				}
			}
		}
	}

	/*if (!Array.isArray(arguments[2])) {
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
		children = arguments[2];

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

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
}

export default createElement;
