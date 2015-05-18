'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = _internalsConstants2.default.ORDER_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = _internalsConstants2.default.STAGE_ATTRIBUTE_NAME;

var eventListener = new _classesEventListener2.default();

function walkValidateNodeTree(nodeTree, ashNodeTree, stage, eventsCache) {
	if (nodeTree.tagName && nodeTree.tagName.toLowerCase() !== ashNodeTree.tagName) {
		return false;
	}

	if (nodeTree.getAttribute && nodeTree.getAttribute(INDEX_ATTRIBUTE_NAME) != ashNodeTree.index || nodeTree.getAttribute && nodeTree.getAttribute(ORDER_ATTRIBUTE_NAME) != ashNodeTree.order) {
		return false;
	}

	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
	nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;

	if (ashNodeTree.properties && ashNodeTree.properties.events && typeof ashNodeTree.properties.events === 'object') {
		eventsCache.push({
			events: ashNodeTree.properties.events,
			node: nodeTree
		});
	}

	if (nodeTree.childNodes.length && (!ashNodeTree.children || !ashNodeTree.children.length) || !nodeTree.childNodes.length && (ashNodeTree.children && ashNodeTree.children.length) || ashNodeTree.children && nodeTree.childNodes.length != ashNodeTree.children.length) {
		return false;
	}

	if (ashNodeTree.children && ashNodeTree.children.length) {
		for (var i = 0; i < ashNodeTree.children.length; i++) {
			if (!walkValidateNodeTree(nodeTree.childNodes[i], ashNodeTree.children[i], stage, eventsCache)) {
				return false;
			}
		}
	}

	return true;
}

function validateNodeTree(nodeTree, ashNodeTree, stage) {
	var eventsCache = [];
	var isNodeTreeValid = walkValidateNodeTree(nodeTree, ashNodeTree, stage, eventsCache);

	if (isNodeTreeValid) {
		for (var i = 0; i < eventsCache.length; i++) {
			eventListener.addEvents(eventsCache[i].node, eventsCache[i].events);
		}
	}

	return isNodeTreeValid;
}

exports.default = validateNodeTree;
module.exports = exports.default;