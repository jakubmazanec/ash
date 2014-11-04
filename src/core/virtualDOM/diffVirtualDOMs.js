'use strict';

var _ = require('_');
var patchTypes = require('../constants/patchTypes');
var parseVirtualDOMIndex = require('./parseVirtualDOMIndex');
var isVirtualTextNode = require('../internals/isVirtualTextNode');
var misc = require('../constants/misc');

// shortcuts
var PATCH_NONE = patchTypes.PATCH_NONE;
var PATCH_VNODE = patchTypes.PATCH_VNODE;
var PATCH_TEXT = patchTypes.PATCH_TEXT;
var PATCH_PROPERTIES = patchTypes.PATCH_PROPERTIES;
var PATCH_ORDER = patchTypes.PATCH_ORDER;
var PATCH_INSERT = patchTypes.PATCH_INSERT;
var PATCH_REMOVE = patchTypes.PATCH_REMOVE;

var INDEX_LEVEL_DIGITS = misc.INDEX_LEVEL_DIGITS;

var pad = _.unary(_.partialRight(_.padLeft, INDEX_LEVEL_DIGITS, '0'));

function joinParsedIndex(parsedIndex)
{
	//return _(parsedIndex).map(pad).join('.');
	return parsedIndex.join('.');
}

function walkDiffVirtualDOMs(oldVirtualNode, newVirtualNode, patches)
{
	// compare nodes
	var differentProperties = false;
	var propertiesToChange = {};
	var propertiesToRemove = [];
	var newProperty;
	var newSubproperty;
	var oldProperty;
	var oldSubproperty;

	// which propertie are different or new
	for (newProperty in newVirtualNode.properties)
	{
		if (newVirtualNode.properties.hasOwnProperty(newProperty) && newVirtualNode.properties[newProperty] !== oldVirtualNode.properties[newProperty])
		{
			if (typeof newVirtualNode.properties[newProperty] === 'object' && oldVirtualNode.properties[newProperty] && typeof oldVirtualNode.properties[newProperty] == 'object')
			{
				// which propertie are different or new
				for (newSubproperty in newVirtualNode.properties[newProperty])
				{
					if (newVirtualNode.properties[newProperty].hasOwnProperty(newSubproperty) && newVirtualNode.properties[newProperty][newSubproperty] !== oldVirtualNode.properties[newProperty][newSubproperty])
					{
						propertiesToChange[newProperty] = propertiesToChange[newProperty] || {};
						propertiesToChange[newProperty][newSubproperty] = newVirtualNode.properties[newProperty][newSubproperty];

						differentProperties = true;
					}
				}

				// which properties are to be removed
				for (oldSubproperty in oldVirtualNode.properties[newProperty])
				{
					if (oldVirtualNode.properties[newProperty].hasOwnProperty(oldSubproperty) && typeof newVirtualNode.properties[newProperty][oldSubproperty] === 'undefined')
					{
						propertiesToRemove.push(newProperty + '.' + oldSubproperty);

						differentProperties = true;
					}
				}

			} else
			{
				propertiesToChange[newProperty] = newVirtualNode.properties[newProperty];

				differentProperties = true;
			}
		}
	}

	// which properties are to be removed
	for (oldProperty in oldVirtualNode.properties)
	{
		if (oldVirtualNode.properties.hasOwnProperty(oldProperty) && typeof newVirtualNode.properties[oldProperty] === 'undefined')
		{
			differentProperties = true;
			propertiesToRemove.push(oldProperty);
		}
	}

	if (oldVirtualNode.type !== newVirtualNode.type || oldVirtualNode.tagName !== newVirtualNode.tagName)
	{
		patches.push(
		{
			type: PATCH_VNODE,
			index: oldVirtualNode.index,
			stage: oldVirtualNode.stage,
			node: newVirtualNode
		});

		// whole node must be replaced; no sense in finding other differences
		return patches;
	}

	if (oldVirtualNode.text !== newVirtualNode.text)
	{
		patches.push(
		{
			type: PATCH_TEXT,
			index: oldVirtualNode.index,
			text: newVirtualNode.text
		});
	}
	
	if (differentProperties)
	{
		patches.push(
		{
			type: PATCH_PROPERTIES,
			index: oldVirtualNode.index,
			stage: oldVirtualNode.stage,
			propertiesToChange: propertiesToChange,
			propertiesToRemove: propertiesToRemove
		});
	}

	// now let's check the children...
	patches = diffChildren(oldVirtualNode.children, newVirtualNode.children, patches);

	return patches;
}

function diffChildren(oldChildren, newChildren, patches)
{
	if ((!oldChildren || !oldChildren.length) && (!newChildren || !newChildren.length))
	{
		return patches;
	}

	// lets fill in keys, if needed; simple first-to-first correspondence
	var __length = Math.max(oldChildren.length, newChildren.length);
	var __a = 0;
	var __b = 0;
	var __keyCount = 0;
	var __key = 'Key: ' + __keyCount;
	var i;

	for (i = 0; i < __length; i++)
	{
		if (oldChildren[i] && oldChildren[i].key)
		{
			oldChildren[i].tempKey = oldChildren[i].key;
		}

		if (newChildren[i] && newChildren[i].key)
		{
			newChildren[i].tempKey = newChildren[i].key;
		}

		while (oldChildren[__a] && oldChildren[__a].key)
		{
			__a++;
		}

		while (newChildren[__b] && newChildren[__b].key)
		{
			__b++;
		}

		if (oldChildren[__a])
		{
			oldChildren[__a].tempKey = __key;
		}

		if (newChildren[__b])
		{
			newChildren[__b].tempKey = __key;
		}

		__keyCount++;
		__key = 'Key: ' + __keyCount;
		__a++;
		__b++;
	}
	
	// keys are in; let's compare order of children		
	var __found;
	var j;
	var patch;
	var __index;

	// first iterate over old children
	for (i = 0; i < oldChildren.length; i++)
	{
		__found = false;

		for (j = 0; j < newChildren.length; j++)
		{
			if (oldChildren[i].tempKey === newChildren[j].tempKey)
			{
				__found = true;

				break;
			}
		}

		// node with matching key was found?
		if (__found)
		{
			// is order same?
			if (i != j)
			{
				patches.push(
				{
					type: PATCH_ORDER,
					newIndex: newChildren[j].index,
					index: oldChildren[i].index,
					stage: oldChildren[i].stage,
					order: j
				});
			}

			// now walk inside those children...
			walkDiffVirtualDOMs(oldChildren[i], newChildren[j], patches);
		} else
		{
			// node is to be removed...
			patches.push(
			{
				type: PATCH_REMOVE,
				index: oldChildren[i].index,
				stage: oldChildren[i].stage,
			});
		}
	}

	// now iterate over new children; let's see, if there are any new...
	for (j = 0; j < newChildren.length; j++)
	{
		__found = false;

		for (i = 0; i < oldChildren.length; i++)
		{
			if (oldChildren[i].tempKey === newChildren[j].tempKey)
			{
				__found = true;
				break;
			}
		}

		// new child was not found
		if (!__found)
		{
			// create patch for insert
			patches.push(
			{
				type: PATCH_INSERT,
				index: newChildren[j].index,
				node: newChildren[j]
			});

			__index = parseVirtualDOMIndex(newChildren[j].index);
			__index.pop();
			patches[patches.length - 1].parentIndex = joinParsedIndex(__index);
		}
	}
	
	return patches;
}

// differences between trees
function diffVirtualDOMs(oldVirtualDOM, newVirtualDOM)
{
	return walkDiffVirtualDOMs(oldVirtualDOM, newVirtualDOM, []);
}

module.exports = diffVirtualDOMs;