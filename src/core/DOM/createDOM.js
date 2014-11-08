'use strict';

var isAshNode = require('../internal/isAshNode');
var isAshTextNode = require('../internal/isAshTextNode');
var setNodeProperties = require('./setNodeProperties');
var constants = require('../internal/constants');

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;

// helper for creating dom tree
function createDOM(virtualDOM)
{
	function walk(virtualDOM)
	{
		var tree;
		var child;
		var i;

		if (isAshTextNode(virtualDOM))
		{
			tree = document.createTextNode(virtualDOM.text);
			tree[INDEX_ATTRIBUTE_NAME] = virtualDOM.index;
			tree[ORDER_ATTRIBUTE_NAME] = virtualDOM.order;
			tree[STAGE_ATTRIBUTE_NAME] = virtualDOM.stage;

			return tree;
		}

		// create element
		if (virtualDOM.tagName == 'svg' || virtualDOM.tagName == 'use')
		{
			tree = document.createElementNS('http://www.w3.org/2000/svg', virtualDOM.tagName);
		} else
		{
			tree = document.createElement(virtualDOM.tagName);
		}

		// set properties
		tree[INDEX_ATTRIBUTE_NAME] = virtualDOM.index;
		tree[ORDER_ATTRIBUTE_NAME] = virtualDOM.order;
		tree[STAGE_ATTRIBUTE_NAME] = virtualDOM.stage;		
		setNodeProperties(tree, virtualDOM.properties);		
		//$(tree).attr('index', tree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + virtualDOM.key*/);
		//$(tree).attr('order', tree[ORDER_ATTRIBUTE_NAME]/* + ' - ' + virtualDOM.key*/);
		//$(tree).attr('levels', virtualDOM.levels.join('.'));

		for (i = 0; i < virtualDOM.children.length; i++)
		{
			child = walk(virtualDOM.children[i]);

			if (child)
			{
				tree.appendChild(child);
			}
		}

		return tree;
	}

	return walk(virtualDOM);
}

module.exports = createDOM;