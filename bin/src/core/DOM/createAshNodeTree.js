"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isComponentAshElement = _interopRequire(require("../internals/isComponentAshElement"));

var isAshNodeAshElement = _interopRequire(require("../internals/isAshNodeAshElement"));

var isAshNode = _interopRequire(require("../internals/isAshNode"));

var constants = _interopRequire(require("../internals/constants"));

var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	if (isAshNode(ashNodeAshElement.instance)) {
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

	if (isAshNodeAshElement(ashElement)) {
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
	if (!isComponentAshElement(componentAshElement)) {
		throw new Error(componentAshElement + " must be a Component Descriptor object.");
	}

	var ashElement = componentAshElement;
	var ashNodeTree;
	var isDirty = ashElement.isDirty;
	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!isAshNodeAshElement(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// set up ash node tree
	ashNodeTree = cloneAshNode(ashElement);

	// set up ordering properties
	ashElement.instance.index = ashNodeTree.index = "0";
	ashElement.instance.order = ashNodeTree.order = 0;

	// is parent component dirty?
	ashNodeTree.isDirty = isDirty;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.index, isDirty);
	}

	return ashNodeTree;
}

module.exports = createAshNodeTree;