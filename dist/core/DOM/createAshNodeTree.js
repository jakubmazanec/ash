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

var _internalsIsAshNode = require('../internals/isAshNode');

var _internalsIsAshNode2 = _interopRequireDefault(_internalsIsAshNode);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	if ((0, _internalsIsAshNode2.default)(ashNodeAshElement.instance)) {
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
			text: ashNodeAshElement.instance.text };
	}
}

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentDirty, parentIndices) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// set up ordering properties
		ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
		ashElement.instance.index = index;
		ashElement.instance.indices = parentIndices.concat(index);

		// clone virtual node
		var clonedAshNode = cloneAshNode(ashElement);

		// is parent component dirty?
		clonedAshNode.isDirty = isParentDirty;

		// add child
		clonedAshNode.parent = ashNodeTree;
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		var isDirty = ashElement.isDirty;

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

function createAshNodeTree(componentAshElement) {
	// type check
	if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
		throw new Error(componentAshElement + ' must be a Component Descriptor object.');
	}

	var ashElement = componentAshElement;
	var ashNodeTree = undefined;
	var isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!(0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
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
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}

module.exports = exports.default;