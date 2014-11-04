'use strict';

var isVirtualNode = require('../internals/isVirtualNode');
var isVirtualTextNode = require('../internals/isVirtualTextNode');
var setDOMNodeProperties = require('../dom/setDOMNodeProperties');
var misc = require('../constants/misc');

var INDEX_ATTRIBUTE = misc.INDEX_ATTRIBUTE;
var ORDER_ATTRIBUTE = misc.ORDER_ATTRIBUTE;
var STAGE_ATTRIBUTE = misc.STAGE_ATTRIBUTE;

// helper for creating dom tree
function renderVirtualDOM(virtualDOM)
{
	function walk(virtualDOM)
	{
		var tree;
		var child;
		var i;

		if (isVirtualTextNode(virtualDOM))
		{
			tree = document.createTextNode(virtualDOM.text);
			tree[INDEX_ATTRIBUTE] = virtualDOM.index;
			tree[ORDER_ATTRIBUTE] = virtualDOM.order;
			tree[STAGE_ATTRIBUTE] = virtualDOM.stage;

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
		tree[INDEX_ATTRIBUTE] = virtualDOM.index;
		tree[ORDER_ATTRIBUTE] = virtualDOM.order;
		tree[STAGE_ATTRIBUTE] = virtualDOM.stage;		
		setDOMNodeProperties(tree, virtualDOM.properties);		
		//$(tree).attr('index', tree[INDEX_ATTRIBUTE]/* + ' - ' + virtualDOM.key*/);
		//$(tree).attr('order', tree[ORDER_ATTRIBUTE]/* + ' - ' + virtualDOM.key*/);
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

module.exports = renderVirtualDOM;