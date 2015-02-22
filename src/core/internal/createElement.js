import AshNode from '../class/AshNode';
import AshElement from '../class/AshElement';
import isAshElement from './isAshElement';
import constants from './constants';

// constants references
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function createElement(tagName/*, props, children*/) {
	var props = arguments[1];
	var children = arguments[2];

	if (typeof tagName !== 'string' || !tagName.length) {
		return AshElement.bind(null, COMPONENT_ASH_ELEMENT, tagName);
	} else if (typeof tagName === 'string' && !tagName.length) {
		throw new Error(tagName + ' (tagName) must be non-empty string.');
	}

	// type check
	if (tagName && typeof props === 'undefined' && !children) {
		return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, null);
	}

	if (Array.isArray(props)) {
		children = props;
		props = null;
	}

	if (!Array.isArray(children)) {
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
		// check type of children
		for (let i = 0; i < children.length; i++) {
			if (typeof children[i] === 'string') {
				children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
			} else if (!children[i]) {
				children.splice(i, 1);
				i--;
			} else if (!isAshElement(children[i])) {
				children.splice(i, 1);
				i--;
			}
		}
	}

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
}

export default createElement;
