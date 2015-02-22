"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var parseAshNodeIndex = _interopRequire(require("./parseAshNodeIndex"));

var constants = _interopRequire(require("../internal/constants"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;

function findNode(nodeTree, nodeIndex) {
	var parsedAshNodeIndex = parseAshNodeIndex(nodeIndex);
	var node = nodeTree;

	if (!nodeTree) {
		throw new Error(nodeTree + " cannot be falsy.");
	}

	if (parsedAshNodeIndex.length == 1) {
		return node;
	} else {
		for (var i = 1; i < parsedAshNodeIndex.length - 1; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[parsedAshNodeIndex[i]];
		}
	}

	for (var i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType == 1 && node.childNodes[i][INDEX_ATTRIBUTE_NAME] == nodeIndex) {
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType == 3 && i == parsedAshNodeIndex[parsedAshNodeIndex.length - 1]) {
			return node.childNodes[i];
		}
	}

	return false;
}

module.exports = findNode;