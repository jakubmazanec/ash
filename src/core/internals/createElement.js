import AshNode from '../classes/AshNode';
import AshElement from '../classes/AshElement';
import isAshElement from './isAshElement';
import constants from './constants';
import Component from '../classes/Component';



const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function iterate(iterable) {
	var result = [];

	if (typeof iterable.__iterator === 'function') {
		let iterator = iterable.__iterator();
		let iterationResult = iterator.next();

		while (!iterationResult.done) {
			result.push(iterationResult.value[1]);

			iterationResult = iterator.next();
		}
	} else if (typeof global.Symbol === 'function' && typeof iterable[global.Symbol.iterator]) {
		let iterator = iterable[global.Symbol.iterator]();
		let iterationResult = iterator.next();

		while (!iterationResult.done) {
			result.push(iterationResult.value);

			iterationResult = iterator.next();
		}
	}

	return result;
}

export default function createElement(tagName, props/*, children...*/) {
	var children = [];

	if (typeof tagName !== 'string' && typeof tagName === 'function' && Component.isAncestorOf(tagName)) {
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
		} else if (arguments[i] && typeof arguments[i].__iterator === 'function' || arguments[i] && typeof global.Symbol === 'function' && typeof arguments[i][global.Symbol.iterator]) {
			let iteratorResult = iterate(arguments[i]);

			for (let j = 0; j < iteratorResult.length; j++) {
				if (typeof iteratorResult[j] === 'string' || typeof iteratorResult === 'number') {
					children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, '' + iteratorResult[j]));
				} else if (isAshElement(iteratorResult[j])) {
					children.push(iteratorResult[j]);
				}
			}
		}
	}

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
}
