'use strict';

var _ = require('_');
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

function createDescriptorTree(rootDescriptor, stage, startingId, startingLevel)
{
	function walk(descriptor, index, owner, lastLevel)
	{
		var i;

		// type check
		if (!isComponentDescriptor(owner))
		{
			throw new Error(owner + ' must be a Component type Descriptor Object');
		}

		if (isVirtualNodeDescriptor(descriptor))
		{
			// instantiate descriptor
			Descriptor.instantiate(descriptor);

			// set up ordering properties
			descriptor.level = lastLevel + LEVEL_SEPARATOR + index;
			descriptor.order = index;

			// set up owner & stage
			descriptor.owner = owner;
			descriptor.stage = stage;

			for (i = 0; i < descriptor.children.length; i++)
			{
				if (descriptor.children[i])
				{
					// set up parent
					descriptor.children[i].parent = descriptor;

					// walk the child
					walk(descriptor.children[i], i, owner, descriptor.level);
				}
			}
		} else if (isComponentDescriptor(descriptor))
		{
			// instantiate descriptor
			Descriptor.instantiate(descriptor);

			// set up ordering properties
			//descriptor.id = owner.id + LEVEL_SEPARATOR + index;
			descriptor.level = lastLevel + LEVEL_SEPARATOR + index;
			descriptor.order = index;

			// set up owner
			descriptor.owner = owner;
			descriptor.stage = stage;

			// create child by rendering component
			descriptor.instance.onBeforeMount();
			descriptor.instance.__setLifecycle(MOUNTING);
			descriptor.children[0] = descriptor.instance.__getRender();
			
			if (descriptor.children[0])
			{
				// set up parent
				descriptor.children[0].parent = descriptor;

				// walk the child
				walk(descriptor.children[0], 0, descriptor, descriptor.level);
			}
		}
	}

	// type check
	if (!isDescriptor(rootDescriptor))
	{
		throw new Error(rootDescriptor + ' must be a Descriptor object.');
	}

	//console.log('(createDescriptorTree)');

	//startingId = _.isString(startingId) ? startingId : '0';
	startingLevel = _.isString(startingLevel) ? startingLevel : '0';

	var descriptorTree = rootDescriptor;
	var i;

	descriptorTree.stage = stage;

	if (isComponentDescriptor(descriptorTree))
	{
		// instantiate descriptor
		Descriptor.instantiate(descriptorTree);

		// set up ordering properties
		//descriptorTree.id = startingId;
		descriptorTree.level = startingLevel;
		descriptorTree.order = typeof descriptorTree.order === 'undefined' ? 0 : descriptorTree.order;

		// create child by rendering component
		descriptorTree.instance.onBeforeMount();
		descriptorTree.children[0] = descriptorTree.instance.__getRender();
		descriptorTree.instance.__setLifecycle(MOUNTING);

		// set up a parent
		descriptorTree.children[0].parent = descriptorTree;


		// walk the child
		walk(descriptorTree.children[0], 0, descriptorTree, descriptorTree.level);
	} else
	{
		// instantiate descriptor
		Descriptor.instantiate(descriptorTree);

		// set up ordering properties
		descriptorTree.level = startingLevel;
		descriptorTree.order = typeof descriptorTree.order === 'undefined' ? 0 : descriptorTree.order;

		for (i = 0; i < descriptorTree.children.length; i++)
		{
			// set up a parent
			descriptorTree.children[i].parent = descriptorTree;

			// walk the child
			walk(descriptorTree.children[i], i, descriptorTree.owner, descriptorTree.level);
		}
	}

	// return resulting descriptor tree 
	return descriptorTree;
}

module.exports = createDescriptorTree;