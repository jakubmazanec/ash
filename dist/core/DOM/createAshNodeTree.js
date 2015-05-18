'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsIsAshNode = require('../internals/isAshNode');

var _internalsIsAshNode2 = _interopRequireDefault(_internalsIsAshNode);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var LEVEL_SEPARATOR = _internalsConstants2.default.LEVEL_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	if ((0, _internalsIsAshNode2.default)(ashNodeAshElement.instance)) {
		return {
			type: ashNodeAshElement.instance.type,
			index: ashNodeAshElement.instance.index,
			stage: ashNodeAshElement.stage.id,
			tagName: ashNodeAshElement.instance.tagName,
			key: ashNodeAshElement.instance.key,
			properties: ashNodeAshElement.instance.properties,
			children: []
		};
	} else {
		return {
			type: ashNodeAshElement.instance.type,
			index: ashNodeAshElement.instance.index,
			stage: ashNodeAshElement.stage.id,
			text: ashNodeAshElement.instance.text
		};
	}
}

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentIndex, isParentDirty) {
	var clonedAshNode;

	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// clone virtual node
		clonedAshNode = cloneAshNode(ashElement);

		// set up ordering properties
		ashElement.instance.index = clonedAshNode.index = parentIndex + LEVEL_SEPARATOR + index;
		ashElement.instance.order = clonedAshNode.order = index;

		// is parent component dirty?
		clonedAshNode.isDirty = isParentDirty;

		// add child
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].index, isParentDirty);
		}
	} else if (ashElement && ashElement.children[0]) {
		var isDirty = ashElement.isDirty;
		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentIndex, isDirty);
	}
}

function createAshNodeTree(componentAshElement) {
	// type check
	if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
		throw new Error(componentAshElement + ' must be a Component Descriptor object.');
	}

	var ashElement = componentAshElement;
	var ashNodeTree;
	var isDirty = ashElement.isDirty;
	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!(0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// set up ash node tree
	ashNodeTree = cloneAshNode(ashElement);

	// set up ordering properties
	ashElement.instance.index = ashNodeTree.index = '0';
	ashElement.instance.order = ashNodeTree.order = 0;

	// is parent component dirty?
	ashNodeTree.isDirty = isDirty;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.index, isDirty);
	}

	return ashNodeTree;
}

exports.default = createAshNodeTree;
module.exports = exports.default;