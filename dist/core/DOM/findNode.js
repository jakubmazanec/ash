'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = findNode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;

function findNode(nodeTree, nodeId, ashNodeIndices) {
	var node = nodeTree;

	if (!nodeTree) {
		throw new Error(nodeTree + ' cannot be falsy.');
	}

	if (ashNodeIndices.length === 1) {
		return node;
	} else {
		for (var i = 1, _length = ashNodeIndices.length - 1; i < _length; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[ashNodeIndices[i]];
		}
	}

	for (var i = 0, _length2 = node.childNodes.length; i < _length2; i++) {
		if (node.childNodes[i].nodeType === 1 && node.childNodes[i][ID_ATTRIBUTE_NAME] === nodeId) {
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType === 3 && i === ashNodeIndices[ashNodeIndices.length - 1]) {
			return node.childNodes[i];
		}
	}

	return false;
}

module.exports = exports.default;