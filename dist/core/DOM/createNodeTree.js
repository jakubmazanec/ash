'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsIsAshTextNode = require('../internals/isAshTextNode');

var _internalsIsAshTextNode2 = _interopRequireDefault(_internalsIsAshTextNode);

var _setNodeProperties = require('./setNodeProperties');

var _setNodeProperties2 = _interopRequireDefault(_setNodeProperties);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = _internalsConstants2.default.ORDER_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = _internalsConstants2.default.STAGE_ATTRIBUTE_NAME;

function createNodeTree(ashNodeTree) {
	var nodeTree;
	var child;

	if ((0, _internalsIsAshTextNode2.default)(ashNodeTree)) {
		nodeTree = global.document.createTextNode(ashNodeTree.text);
		nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
		nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
		nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;

		return nodeTree;
	}

	// create element
	if (ashNodeTree.tagName === 'svg' || ashNodeTree.tagName === 'use' || ashNodeTree.tagName === 'path' || ashNodeTree.tagName === 'circle' || ashNodeTree.tagName === 'text' || ashNodeTree.tagName === 'ellipse' || ashNodeTree.tagName === 'line' || ashNodeTree.tagName === 'polygon' || ashNodeTree.tagName === 'polyline' || ashNodeTree.tagName === 'rect' || ashNodeTree.tagName === 'g') {
		nodeTree = global.document.createElementNS('http://www.w3.org/2000/svg', ashNodeTree.tagName);
	} else {
		nodeTree = global.document.createElement(ashNodeTree.tagName);
	}

	// set properties
	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
	nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;
	(0, _setNodeProperties2.default)(nodeTree, ashNodeTree.properties, true);
	//$(nodeTree).attr('index', nodeTree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('order', nodeTree[ORDER_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);

	for (var i = 0; i < ashNodeTree.children.length; i++) {
		child = createNodeTree(ashNodeTree.children[i]);

		if (child) {
			nodeTree.appendChild(child);
		}
	}

	return nodeTree;
}

exports.default = createNodeTree;
module.exports = exports.default;