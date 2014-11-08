'use strict';

var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var constants = require('../internal/constants');

var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;

function walkMountComponents(descriptor)
{
	var i;

	if (isAshNodeAshElement(descriptor))
	{
		for (i = 0; i < descriptor.children.length; i++)
		{
			if (descriptor.children[i])
			{
				// walk the child
				walkMountComponents(descriptor.children[i]);
			}
		}
	} else if (isComponentAshElement(descriptor))
	{
		if (descriptor.instance && descriptor.instance.__lifecycle == LIFECYCLE_MOUNTING)
		{
			descriptor.instance.mount();
		}

		// walk the child
		if (descriptor.children[0])
		{
			walkMountComponents(descriptor.children[0]);
		}
	}
}

function mountComponents(rootDescriptor)
{
	// type check
	if (!isComponentAshElement(rootDescriptor))
	{
		throw new Error(rootDescriptor + ' must be a Component type AshElement object.');
	}

	if (rootDescriptor.instance && rootDescriptor.instance.__lifecycle == LIFECYCLE_MOUNTING)
	{
		rootDescriptor.instance.mount();
	}

	if (rootDescriptor.children[0])
	{
		// walk the child
		walkMountComponents(rootDescriptor.children[0]);
	}

	// return resulting descriptor tree 
	return rootDescriptor;
}

module.exports = mountComponents;