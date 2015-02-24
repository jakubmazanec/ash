"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var parseAshNodeIndex = _interopRequire(require("./parseAshNodeIndex"));

var constants = _interopRequire(require("../internals/constants"));

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
		for (var i = 1, _length = parsedAshNodeIndex.length - 1; i < _length; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[parsedAshNodeIndex[i]];
		}
	}

	for (var i = 0, _length2 = node.childNodes.length; i < _length2; i++) {
		if (node.childNodes[i].nodeType == 1 && node.childNodes[i][INDEX_ATTRIBUTE_NAME] == nodeIndex) {
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType == 3 && i == parsedAshNodeIndex[parsedAshNodeIndex.length - 1]) {
			return node.childNodes[i];
		}
	}

	return false;
}

module.exports = findNode;