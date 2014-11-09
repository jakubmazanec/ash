'use strict';

var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var constants = require('../internal/constants');

var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;

function walk(ashElement)
{
	var i;

	if (isAshNodeAshElement(ashElement))
	{
		for (i = 0; i < ashElement.children.length; i++)
		{
			if (ashElement.children[i])
			{
				// walk the child
				walk(ashElement.children[i]);
			}
		}
	} else if (isComponentAshElement(ashElement))
	{
		if (ashElement.instance && ashElement.instance.__lifecycle == LIFECYCLE_MOUNTING)
		{
			ashElement.instance.mount();
		}

		// walk the child
		if (ashElement.children[0])
		{
			walk(ashElement.children[0]);
		}
	}
}

function mountComponents(componentAshElement)
{
	// type check
	if (!isComponentAshElement(componentAshElement))
	{
		throw new Error(componentAshElement + ' must be a Component type AshElement object.');
	}

	if (componentAshElement.instance && componentAshElement.instance.__lifecycle == LIFECYCLE_MOUNTING)
	{
		componentAshElement.instance.mount();
	}

	if (componentAshElement.children[0])
	{
		// walk the child
		walk(componentAshElement.children[0]);
	}

	// return resulting componentAshElement tree 
	return componentAshElement;
}

module.exports = mountComponents;