import AshNode from '../classes/AshNode';
import AshElement from '../classes/AshElement';
import isAshElement from './isAshElement';
import constants from './constants';
import Component from '../classes/Component';
import isAncestor from '../internals/isAncestor';



const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

export default function createElement(tagName, props/*, children...*/) {
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

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
}
