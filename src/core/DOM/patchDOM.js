'use strict';

var _ = require('_');
var constants = require('../internal/constants');
var parseAshNodeIndex = require('./parseAshNodeIndex');
var createDOM = require('./createDOM');
var setNodeProperties = require('../dom/setNodeProperties');
var removeNodeProperties = require('../dom/removeNodeProperties');
var findNode = require('../dom/findNode');
var DOMEvents = require('../class/DOMEvents');

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var PATCH_NONE = constants.PATCH_NONE;
var PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
var PATCH_ORDER = constants.PATCH_ORDER;
var PATCH_INSERT = constants.PATCH_INSERT;
var PATCH_REMOVE = constants.PATCH_REMOVE;

var domEvents = new DOMEvents();

// apply patches to dom tree
function patch(domTree, patches)
{
	// type check
	if (!_.isElement(domTree))
	{
		return false;
	}

	//var __patches = [];
	var __patches = patches;
	var node;
	var index;
	var position;
	var i;
	var j;
	var reindexCache = [];
	var reorderCache = [];
	var lastLevel;

	function reindexChildNodes(parentNode, order)
	{
		var parentLevels = parseAshNodeIndex(parentNode[INDEX_ATTRIBUTE_NAME]);
		var levelIndex = parentLevels.length - 1;

		function walk(node)
		{
			var childLevels;
			var i;

			for (i = 0; i < node.childNodes.length; i++)
			{
				childLevels = parseAshNodeIndex(node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
				childLevels[levelIndex] = order;

				node.childNodes[i][INDEX_ATTRIBUTE_NAME] = childLevels.join('.');
				//node.childNodes[i][ORDER_ATTRIBUTE_NAME] = order;

				//$(node.childNodes[i]).attr('index', node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
				//$(node.childNodes[i]).attr('order', node.childNodes[i][ORDER_ATTRIBUTE_NAME]);

				if (node.childNodes[i].childNodes && node.childNodes[i].childNodes.length)
				{
					walk(node.childNodes[i]);
				}
			} 
		}

		//console.log('reindexing children of ', parentNode);
		//console.log('parent levels', parentLevels);

		walk(parentNode);
	}

	function flushCache()
	{

		var appendChild = function (item)
		{
			this.appendChild(item);
		};

		while (reindexCache.length > 0)
		{
			// reindex events
			domEvents.reindexEvents(reindexCache[0].oldIndex, reindexCache[0].newOrder, reindexCache[0].stage);

			reindexCache[0].node[INDEX_ATTRIBUTE_NAME] = reindexCache[0].newIndex;
			reindexCache[0].node[ORDER_ATTRIBUTE_NAME] = reindexCache[0].newOrder;

			//$(reindexCache[0].node).attr('index', reindexCache[0].node[INDEX_ATTRIBUTE_NAME]);
			//$(reindexCache[0].node).attr('order', reindexCache[0].node[ORDER_ATTRIBUTE_NAME]);
			//$(reindexCache[0].node).attr('levels', virtualDOM.levels.join('.'));

			reindexChildNodes(reindexCache[0].node, reindexCache[0].newOrder);




			// clear the cache
			reindexCache.shift();
		}

		reorderCache = _.uniq(reorderCache, 'node');

		while (reorderCache.length > 0)
		{
			_.sortBy(reorderCache[0].node.childNodes, ORDER_ATTRIBUTE_NAME).forEach(appendChild, reorderCache[0].node);

			reorderCache.shift();
		}
	}

	for (i = 0; i < __patches.length; i++)
	{
		__patches[i].parsedIndex = parseAshNodeIndex(__patches[i].index);
	}

	/*for (i = 0; i < __patches.length; i++)
	{
		if (__patches[i].type == PATCH_REMOVE)
		{
			for (j = 0; j < __patches.length; j++)
			{
				if (i != j && __patches[j].type == PATCH_REMOVE)
				{
					
				}
			}
		}
	}*/

	var maxIndex = _(__patches).pluck('parsedIndex').flatten().max();

	var maxDigits = maxIndex === 0 ? 1 : Math.floor(Math.log(Math.abs(Math.floor(maxIndex))) / Math.LN10) + 1;
	
	__patches = _.sortBy(__patches, function (patch)
	{
		var result = '';

		for (var i = 0; i < patch.parsedIndex.length - 1; i++)
		{
			result += _.padLeft(patch.parsedIndex[i], maxDigits);
		}

		if (patch.type == PATCH_ASH_NODE)
		{
			result += _.padLeft(9, maxDigits);
		} else if (patch.type == PATCH_ASH_TEXT_NODE)
		{
			result += _.padLeft(8, maxDigits);
		} else if (patch.type == PATCH_PROPERTIES)
		{
			result += _.padLeft(7, maxDigits);
		} else if (patch.type == PATCH_REMOVE)
		{
			result += _.padLeft(6, maxDigits);
		} else if (patch.type == PATCH_INSERT)
		{
			result += _.padLeft(5, maxDigits);
		} else if (patch.type == PATCH_ORDER)
		{
			result += _.padLeft(4, maxDigits);
		} else
		{
			result += _.padLeft(0, maxDigits);
		}

		result += _.padLeft(patch.parsedIndex[patch.parsedIndex.length - 1], maxDigits);

		return parseInt(result, 10);
	});
	
	//console.log('sorted patches (length: ' + __patches.length);
	//console.log(__patches);

	//console.log('now lets delete some...');	

	// now iterate over patches...
	//for (i = 0; i < __patches.length; i++)
	for (i = __patches.length - 1; i >= 0; i--)
	{
		if (!lastLevel)
		{
			lastLevel = __patches[i].parsedIndex.length;
		}
		
		if (lastLevel < __patches[i].parsedIndex.length)
		{
			//console.log('on no, patching new level! must flush cache!');
			flushCache();
			lastLevel = __patches[i].parsedIndex.length;
		}

		if (__patches[i].type == PATCH_ASH_NODE)
		{
			/*console.log('applying this vnode patch');
			console.log(__patches[i]);*/

			// remove old events
			//console.log('removing old events', __patches[i].index);
			domEvents.removeEvents(__patches[i].index, __patches[i].stage);

			// replace node
			node = findNode(domTree, __patches[i].index);
			if (!node)
			{
				return false;
			}
			node.parentNode.replaceChild(createDOM(__patches[i].node), node);
		}

		if (__patches[i].type == PATCH_ASH_TEXT_NODE)
		{
			/*console.log('applying this text patch');
			console.log(__patches[i]);*/

			node = findNode(domTree, __patches[i].index);
			if (!node)
			{
				return false;
			}
			node.nodeValue = __patches[i].text;
		}

		if (__patches[i].type == PATCH_PROPERTIES)
		{
			/*console.log('applying this properties patch');
			console.log(__patches[i]);*/

			node = findNode(domTree, __patches[i].index);
			if (!node)
			{
				return false;
			}

			setNodeProperties(node, __patches[i].propertiesToChange);
			removeNodeProperties(node, __patches[i].propertiesToRemove);
		}

		if (__patches[i].type == PATCH_REMOVE)
		{
			/*console.log('applying this remove patch');
			console.log(__patches[i]);*/

			// remove old events
			//console.log('removing old events', __patches[i].index);
			domEvents.removeEvents(__patches[i].index, __patches[i].stage);

			node = findNode(domTree, __patches[i].index);
			if (!node)
			{
				return false;
			}
			//console.log(node);
			//$(node).remove();
			node.parentNode.removeChild(node);
		}

		if (__patches[i].type == PATCH_INSERT)
		{
			//console.log('applying this insert patch');
			//console.log(__patches[i]);

			/*index = utils.parseAshNodeIndex(__patches[i].index);
			position = index[index.length - 1];*/

			node = findNode(domTree, __patches[i].parentIndex);
			if (!node)
			{
				return false;
			}
			
			node.appendChild(createDOM(__patches[i].node));

			reorderCache.push(
			{
				node: node
			});
		}

		if (__patches[i].type == PATCH_ORDER)
		{
			console.log('applying this order patch');

			console.log(__patches[i]);

			if (typeof __patches[i].index !== 'undefined')
			{
				//console.log('on existing node...');
				// moving existing node
				node = findNode(domTree, __patches[i].index);
				if (!node)
				{
					return false;
				}

				reindexCache.push(
				{
					node: node,
					newIndex: __patches[i].newIndex,
					newOrder: __patches[i].order,
					oldIndex: __patches[i].index,
					stage: __patches[i].stage
				});
			} else
			{
				return false;
			}

			reorderCache.push(
			{
				node: node.parentNode
			});
		}
	}


	flushCache();

	return true;
}

module.exports = patch;