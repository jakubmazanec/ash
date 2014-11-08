'use strict';

var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var isAshNode = require('../internal/isAshNode');
var isAshTextNode = require('../internal/isAshTextNode');
var constants = require('../internal/constants');

var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function cloneVirtualNode(virtualNodeDescriptor)
{
	var clonedVirtualNode;

	if (isAshNode(virtualNodeDescriptor.instance))
	{
		clonedVirtualNode =
		{
			index: virtualNodeDescriptor.instance.index,
			stage: virtualNodeDescriptor.stage.id,
			tagName: virtualNodeDescriptor.instance.tagName,
			key: virtualNodeDescriptor.instance.key,
			properties: virtualNodeDescriptor.instance.properties,
			children: [],
			type: virtualNodeDescriptor.instance.type,
		};
	} else if (isAshTextNode(virtualNodeDescriptor.instance))
	{
		clonedVirtualNode =
		{
			type: virtualNodeDescriptor.instance.type,
			index: virtualNodeDescriptor.instance.index,
			stage: virtualNodeDescriptor.stage.id,
			text: virtualNodeDescriptor.instance.text
		};
	} else
	{
		throw new Error(virtualNodeDescriptor + ' must have property named "instance" containing Node or Text Node type Virtual Node object.');
	}

	return clonedVirtualNode;
}

function walkCreateVirtualDOM(virtualNode, descriptor, index, parentIndex)
{
	var clonedVirtualNode;
	var i;

	if (isAshNodeAshElement(descriptor))
	{
		// clone virtual node
		clonedVirtualNode = cloneVirtualNode(descriptor);

		// set up ordering properties
		descriptor.instance.index = clonedVirtualNode.index = parentIndex + LEVEL_SEPARATOR + index;
		descriptor.instance.order = clonedVirtualNode.order = index;

		// add child
		virtualNode.children.push(clonedVirtualNode);

		// walk the children
		for (i = 0; i < descriptor.children.length; i++)
		{
			walkCreateVirtualDOM(virtualNode.children[virtualNode.children.length - 1], descriptor.children[i], i, virtualNode.children[virtualNode.children.length - 1].index, virtualNode.children[virtualNode.children.length - 1].index2);
		}
	} else if (descriptor && descriptor.children[0])
	{
		walkCreateVirtualDOM(virtualNode, descriptor.children[0], index, parentIndex);
	}
}

function createAshDOM(rootComponentDescriptor)
{
	// type check
	if (!isComponentAshElement(rootComponentDescriptor))
	{
		throw new Error(rootComponentDescriptor + ' must be a Component Descriptor object.');
	}
	
	var descriptor = rootComponentDescriptor;
	var virtualDOM;
	var i;

	// find first children Virtual Node descriptor
	while (!isAshNodeAshElement(descriptor))
	{
		descriptor = descriptor.children[0];
	}

	// set up Virtual DOM
	virtualDOM = cloneVirtualNode(descriptor);

	// set up ordering properties
	descriptor.instance.index = virtualDOM.index = '0';
	descriptor.instance.order = virtualDOM.order = 0;

	// walk the children
	for (i = 0; i < descriptor.children.length; i++)
	{
		walkCreateVirtualDOM(virtualDOM, descriptor.children[i], i, virtualDOM.index);
	}

	return virtualDOM;
}

module.exports = createAshDOM;