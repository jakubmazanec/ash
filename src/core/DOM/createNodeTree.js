import isAshTextNode from '../internal/isAshTextNode';
import setNodeProperties from './setNodeProperties';
import constants from '../internal/constants';

const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
const STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;

function walk(ashNodeTree) {
	var nodeTree;
	var child;
	var i;

	if (isAshTextNode(ashNodeTree)) {
		nodeTree = document.createTextNode(ashNodeTree.text);
		nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
		nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
		nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;

		return nodeTree;
	}

	// create element
	if (ashNodeTree.tagName == 'svg' || ashNodeTree.tagName == 'use') {
		nodeTree = document.createElementNS('http://www.w3.org/2000/svg', ashNodeTree.tagName);
	} else {
		nodeTree = document.createElement(ashNodeTree.tagName);
	}

	// set properties
	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
	nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;
	setNodeProperties(nodeTree, ashNodeTree.properties, true);
	//$(nodeTree).attr('index', nodeTree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('order', nodeTree[ORDER_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('levels', ashNodeTree.levels.join('.'));

	for (i = 0; i < ashNodeTree.children.length; i++) {
		child = walk(ashNodeTree.children[i]);

		if (child) {
			nodeTree.appendChild(child);
		}
	}

	return nodeTree;
}

// helper for creating dom nodeTree
function createNodeTree(ashNodeTree) {
	return walk(ashNodeTree);
}

module.exports = createNodeTree;
