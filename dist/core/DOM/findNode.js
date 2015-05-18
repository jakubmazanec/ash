'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _parseAshNodeIndex = require('./parseAshNodeIndex');

var _parseAshNodeIndex2 = _interopRequireDefault(_parseAshNodeIndex);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;

function findNode(nodeTree, nodeIndex) {
	var parsedAshNodeIndex = (0, _parseAshNodeIndex2.default)(nodeIndex);
	var node = nodeTree;

	if (!nodeTree) {
		throw new Error(nodeTree + ' cannot be falsy.');
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

exports.default = findNode;
module.exports = exports.default;