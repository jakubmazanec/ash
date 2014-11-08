'use strict';

var _ = require('_');
var isAshElement = require('../internal/isAshElement');
var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var constants = require('../internal/constants');

var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;

function createAshElementTree(rootDescriptor, stage, startingId, startingLevel)
{
	function walk(descriptor, index, owner, lastLevel)
	{
		var i;

		// type check
		if (!isComponentAshElement(owner))
		{
			throw new Error(owner + ' must be a Component type AshElement Object');
		}

		if (isAshNodeAshElement(descriptor))
		{
			// instantiate descriptor
			descriptor.instantiate();

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
		} else if (isComponentAshElement(descriptor))
		{
			// instantiate descriptor
			descriptor.instantiate();

			// set up ordering properties
			descriptor.level = lastLevel + LEVEL_SEPARATOR + index;
			descriptor.order = index;

			// set up owner
			descriptor.owner = owner;
			descriptor.stage = stage;

			// create child by rendering component
			descriptor.instance.onBeforeMount();
			descriptor.instance.__setLifecycle(LIFECYCLE_MOUNTING);
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
	if (!isAshElement(rootDescriptor))
	{
		throw new Error(rootDescriptor + ' must be a AshElement object.');
	}

	startingLevel = _.isString(startingLevel) ? startingLevel : '0';

	var descriptorTree = rootDescriptor;
	var i;

	descriptorTree.stage = stage;

	if (isComponentAshElement(descriptorTree))
	{
		// instantiate descriptor
		descriptorTree.instantiate();

		// set up ordering properties
		descriptorTree.level = startingLevel;
		descriptorTree.order = typeof descriptorTree.order === 'undefined' ? 0 : descriptorTree.order;

		// create child by rendering component
		descriptorTree.instance.onBeforeMount();
		descriptorTree.children[0] = descriptorTree.instance.__getRender();
		descriptorTree.instance.__setLifecycle(LIFECYCLE_MOUNTING);

		// set up a parent
		descriptorTree.children[0].parent = descriptorTree;


		// walk the child
		walk(descriptorTree.children[0], 0, descriptorTree, descriptorTree.level);
	} else
	{
		// instantiate descriptor
		descriptorTree.instantiate();

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

module.exports = createAshElementTree;