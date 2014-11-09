'use strict';

var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var isAshNode = require('../internal/isAshNode');
var isAshTextNode = require('../internal/isAshTextNode');
var constants = require('../internal/constants');

var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	var clonedAshNode;

	if (isAshNode(ashNodeAshElement.instance)) {
		clonedAshNode = {
			type: ashNodeAshElement.instance.type,
			index: ashNodeAshElement.instance.index,
			stage: ashNodeAshElement.stage.id,
			tagName: ashNodeAshElement.instance.tagName,
			key: ashNodeAshElement.instance.key,
			properties: ashNodeAshElement.instance.properties,
			children: []			
		};
	} else if (isAshTextNode(ashNodeAshElement.instance)) {
		clonedAshNode = {
			type: ashNodeAshElement.instance.type,
			index: ashNodeAshElement.instance.index,
			stage: ashNodeAshElement.stage.id,
			text: ashNodeAshElement.instance.text
		};
	} else {
		throw new Error(ashNodeAshElement + ' must have property named "instance" containing Ash Node or Ash Text Node object.');
	}

	return clonedAshNode;
}

function walk(ashNodeTree, ashElement, index, parentIndex) {
	var clonedAshNode;
	var i;

	if (isAshNodeAshElement(ashElement)) {
		// clone virtual node
		clonedAshNode = cloneAshNode(ashElement);

		// set up ordering properties
		ashElement.instance.index = clonedAshNode.index = parentIndex + LEVEL_SEPARATOR + index;
		ashElement.instance.order = clonedAshNode.order = index;

		// add child
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (i = 0; i < ashElement.children.length; i++) {
			walk(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].index);
		}
	} else if (ashElement && ashElement.children[0]) {
		walk(ashNodeTree, ashElement.children[0], index, parentIndex);
	}
}

function createAshDOM(componentAshElement)
{
	// type check
	if (!isComponentAshElement(componentAshElement))
	{
		throw new Error(componentAshElement + ' must be a Component Descriptor object.');
	}
	
	var ashElement = componentAshElement;
	var ashNodeTree;
	var i;

	// find first children Virtual Node ashElement
	while (!isAshNodeAshElement(ashElement))
	{
		ashElement = ashElement.children[0];
	}

	// set up Virtual DOM
	ashNodeTree = cloneAshNode(ashElement);

	// set up ordering properties
	ashElement.instance.index = ashNodeTree.index = '0';
	ashElement.instance.order = ashNodeTree.order = 0;

	// walk the children
	for (i = 0; i < ashElement.children.length; i++)
	{
		walk(ashNodeTree, ashElement.children[i], i, ashNodeTree.index);
	}

	return ashNodeTree;
}

module.exports = createAshDOM;