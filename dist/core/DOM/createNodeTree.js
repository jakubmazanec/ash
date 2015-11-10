'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsAshTextNode = require('../internals/isAshTextNode');

var _internalsIsAshTextNode2 = _interopRequireDefault(_internalsIsAshTextNode);

var _setNodeProperties = require('./setNodeProperties');

var _setNodeProperties2 = _interopRequireDefault(_setNodeProperties);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var STREAM_ID_ATTRIBUTE_NAME = _internalsConstants2.default.STREAM_ID_ATTRIBUTE_NAME;

function createNodeTree(ashNodeTree) {
	var nodeTree;
	var child;

	if (!ashNodeTree) {
		return null;
	}

	if ((0, _internalsIsAshTextNode2.default)(ashNodeTree)) {
		nodeTree = global.document.createTextNode(ashNodeTree.text);
		nodeTree[ID_ATTRIBUTE_NAME] = ashNodeTree.id;
		nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
		nodeTree[STREAM_ID_ATTRIBUTE_NAME] = ashNodeTree.streamId;

		return nodeTree;
	}

	// create element
	if (ashNodeTree.tagName === 'svg' || ashNodeTree.tagName === 'use' || ashNodeTree.tagName === 'path' || ashNodeTree.tagName === 'circle' || ashNodeTree.tagName === 'text' || ashNodeTree.tagName === 'ellipse' || ashNodeTree.tagName === 'line' || ashNodeTree.tagName === 'polygon' || ashNodeTree.tagName === 'polyline' || ashNodeTree.tagName === 'rect' || ashNodeTree.tagName === 'g') {
		nodeTree = global.document.createElementNS('http://www.w3.org/2000/svg', ashNodeTree.tagName);
	} else {
		nodeTree = global.document.createElement(ashNodeTree.tagName);
	}

	// set properties
	nodeTree[ID_ATTRIBUTE_NAME] = ashNodeTree.id;
	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[STREAM_ID_ATTRIBUTE_NAME] = ashNodeTree.streamId;

	(0, _setNodeProperties2.default)(nodeTree, ashNodeTree.properties, true);
	// $(nodeTree).attr('nodeId', nodeTree[ID_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('index', nodeTree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);

	for (var i = 0; i < ashNodeTree.children.length; i++) {
		child = createNodeTree(ashNodeTree.children[i]);

		if (child) {
			nodeTree.appendChild(child);
		}
	}

	return nodeTree;
}

module.exports = exports.default;