'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createAshNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

// import isAshNode from '../internals/isAshNode';

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

/*function cloneAshNode(ashNodeAshElement) {
	if (isAshNode(ashNodeAshElement.instance)) {
		return {
			id: ashNodeAshElement.instance.id,
			index: ashNodeAshElement.instance.index,
			indices: ashNodeAshElement.instance.indices,
			type: ashNodeAshElement.instance.type,
			streamId: ashNodeAshElement.stream.id,
			tagName: ashNodeAshElement.instance.tagName,
			key: ashNodeAshElement.instance.key,
			properties: ashNodeAshElement.instance.properties,
			children: []
		};
	} else {
		return {
			id: ashNodeAshElement.instance.id,
			index: ashNodeAshElement.instance.index,
			indices: ashNodeAshElement.instance.indices,
			type: ashNodeAshElement.instance.type,
			streamId: ashNodeAshElement.stream.id,
			text: ashNodeAshElement.instance.text,
		};
	}
}

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentDirty, parentIndices) {
	if (isAshNodeAshElement(ashElement)) {
		// set up ordering properties
		ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
		ashElement.instance.index = index;
		ashElement.instance.indices = parentIndices.concat(index);

		// clone virtual node
		let clonedAshNode = cloneAshNode(ashElement);

		// is parent component dirty?
		clonedAshNode.isDirty = isParentDirty;

		// add child
		clonedAshNode.parent = ashNodeTree;
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (let i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		let isDirty = ashElement.isDirty;

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

export default function createAshNodeTree(componentAshElement) {
	// type check
	if (!isComponentAshElement(componentAshElement)) {
		throw new Error(componentAshElement + ' must be a Component Descriptor object.');
	}
	
	let ashElement = componentAshElement;
	let ashNodeTree;
	let isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!isAshNodeAshElement(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// set up ordering properties
	ashElement.instance.id = '0';
	ashElement.instance.index = 0;
	ashElement.instance.indices = [0];

	// set up ash node tree
	ashNodeTree = cloneAshNode(ashElement);
	ashNodeTree.parent = null;
	
	// is parent component dirty?
	ashNodeTree.isDirty = isDirty;

	// walk the children
	for (let i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}*/

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentComponentDirty, parentIndices) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		if (isParentComponentDirty) {
			ashElement.instantiate();

			// set up ordering properties
			ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
			ashElement.instance.index = index;
			ashElement.instance.indices = parentIndices.concat(index);
			ashElement.instance.streamId = ashElement.stream.id;

			// is parent component dirty?
			ashElement.instance.isDirty = isParentComponentDirty;

			// add child
			ashElement.instance.parent = ashNodeTree;

			ashNodeTree.children.push(ashElement.instance);
		} else {
			ashElement.instance.isDirty = isParentComponentDirty;

			if (ashNodeTree.children[ashElement.instance.index] !== ashElement.instance) {
				ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
			}
		}

		// walk the children
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentComponentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		var isDirty = ashElement.isDirty;

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

function createAshNodeTree(componentAshElement) {
	if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
		throw new Error('' + componentAshElement + ' (componentAshElement) must be a Component Ash Element object instance.');
	}

	var ashElement = componentAshElement;
	var ashNodeTree = undefined;
	var isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children which is ash node ash element
	while (!(0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// always re-instantiate element
	ashElement.instantiate();

	// set up ordering properties
	ashElement.instance.id = '0';
	ashElement.instance.index = 0;
	ashElement.instance.indices = [0];
	ashElement.instance.streamId = ashElement.stream.id;

	ashElement.instance.parent = null;

	// is parent component dirty?
	ashElement.instance.isDirty = isDirty;

	// set up ash node tree
	ashNodeTree = ashElement.instance;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}

module.exports = exports.default;