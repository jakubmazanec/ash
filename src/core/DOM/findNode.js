'use strict';

var parseAshNodeIndex = require('./parseAshNodeIndex');

function findNode(nodeTree, nodeIndex) {
	var parsedNodeIndex = parseAshNodeIndex(nodeIndex);
	var node = nodeTree;
	var i;

	if (!nodeTree) {
		throw new Error(nodeTree + ' cannot be falsy.');
	}

	if (parsedNodeIndex.length == 1) {
		return node;
	} else if (parsedNodeIndex.length) {
		for (i = 1; i < parsedNodeIndex.length; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[parsedNodeIndex[i]];
		}

		return node;
	}

	return false;
}

module.exports = findNode;