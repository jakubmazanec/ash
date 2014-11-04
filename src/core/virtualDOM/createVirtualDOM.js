'use strict';

var Descriptor = require('../classes/Descriptor');
var isComponentDescriptor = require('../internals/isComponentDescriptor');
var isVirtualNodeDescriptor = require('../internals/isVirtualNodeDescriptor');
var isVirtualNode = require('../internals/isVirtualNode');
var isVirtualTextNode = require('../internals/isVirtualTextNode');
var misc = require('../constants/misc');

var LEVEL_SEPARATOR = misc.LEVEL_SEPARATOR;
var INDEX_LEVEL_DIGITS = misc.INDEX_LEVEL_DIGITS;

function cloneVirtualNode(virtualNodeDescriptor)
{
	var clonedVirtualNode;

	if (isVirtualNode(virtualNodeDescriptor.instance))
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
	} else if (isVirtualTextNode(virtualNodeDescriptor.instance))
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

function walkCreateVirtualDOM(virtualNode, descriptor, index, parentIndex/*, parentLevels*/)
{
	//console.log('create vdom walk...', virtualNode, descriptor);
	var clonedVirtualNode;
	var i;

	if (isVirtualNodeDescriptor(descriptor))
	{
		// clone virtual node
		clonedVirtualNode = cloneVirtualNode(descriptor);

		// set up ordering properties
		//clonedVirtualNode.index = parentIndex + LEVEL_SEPARATOR + _.padLeft(index, INDEX_LEVEL_DIGITS, '0');
		descriptor.instance.index = clonedVirtualNode.index = parentIndex + LEVEL_SEPARATOR + index;
		descriptor.instance.order = clonedVirtualNode.order = index;
		//clonedVirtualNode.levels = parentLevels.slice(0);
		//clonedVirtualNode.levels.push(index);
		//descriptor.instance.levels = clonedVirtualNode.levels;

		// add child
		virtualNode.children.push(clonedVirtualNode);

		// walk the children
		for (i = 0; i < descriptor.children.length; i++)
		{
			walkCreateVirtualDOM(virtualNode.children[virtualNode.children.length - 1], descriptor.children[i], i, virtualNode.children[virtualNode.children.length - 1].index, virtualNode.children[virtualNode.children.length - 1].index2);
		}
	} else if (descriptor && descriptor.children[0])// if (isComponentDescriptor(descriptor))
	{
		walkCreateVirtualDOM(virtualNode, descriptor.children[0], index, parentIndex/*, parentLevels*/);
	}
}

function createVirtualDOM(rootComponentDescriptor)
{
	// type check
	if (!isComponentDescriptor(rootComponentDescriptor))
	{
		throw new Error(rootComponentDescriptor + ' must be a Component Descriptor object.');
	}
	
	var descriptor = rootComponentDescriptor;
	var virtualDOM;
	var i;

	// find first children Virtual Node descriptor
	while (!isVirtualNodeDescriptor(descriptor))
	{
		descriptor = descriptor.children[0];
	}

	// set up Virtual DOM
	virtualDOM = cloneVirtualNode(descriptor);

	// set up ordering properties
	//virtualDOM.index = _.padLeft('0', INDEX_LEVEL_DIGITS, '0');
	descriptor.instance.index = virtualDOM.index = '0';
	descriptor.instance.order = virtualDOM.order = 0;
	//virtualDOM.levels = [0];
	//descriptor.instance.levels = virtualDOM.levels;

	// walk the children
	for (i = 0; i < descriptor.children.length; i++)
	{
		walkCreateVirtualDOM(virtualDOM, descriptor.children[i], i, virtualDOM.index/*, virtualDOM.levels*/);
	}

	return virtualDOM;
}

module.exports = createVirtualDOM;