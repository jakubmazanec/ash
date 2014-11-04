'use strict';

var Descriptor = require('../classes/Descriptor');
var isDescriptor = require('../internals/isDescriptor');
var isComponentDescriptor = require('../internals/isComponentDescriptor');
var isVirtualNodeDescriptor = require('../internals/isVirtualNodeDescriptor');
var misc = require('../constants/misc');
var componentLifecycle = require('../constants/componentLifecycle');

var LEVEL_SEPARATOR = misc.LEVEL_SEPARATOR;
var UNMOUNTED = componentLifecycle.UNMOUNTED;
var MOUNTING = componentLifecycle.MOUNTING;
var MOUNTED = componentLifecycle.MOUNTED;

function walkMountComponents(descriptor)
{
	var i;

	if (isVirtualNodeDescriptor(descriptor))
	{
		for (i = 0; i < descriptor.children.length; i++)
		{
			if (descriptor.children[i])
			{
				// walk the child
				walkMountComponents(descriptor.children[i]);
			}
		}
	} else if (isComponentDescriptor(descriptor))
	{
		if (descriptor.instance && descriptor.instance.__lifecycle == MOUNTING)
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
	if (!isComponentDescriptor(rootDescriptor))
	{
		throw new Error(rootDescriptor + ' must be a Component type Descriptor object.');
	}

	if (rootDescriptor.instance && rootDescriptor.instance.__lifecycle == MOUNTING)
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