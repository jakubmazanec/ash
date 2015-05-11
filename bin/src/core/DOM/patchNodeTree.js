'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _parseAshNodeIndex = require('./parseAshNodeIndex');

var _parseAshNodeIndex2 = _interopRequireDefault(_parseAshNodeIndex);

var _createNodeTree = require('./createNodeTree');

var _createNodeTree2 = _interopRequireDefault(_createNodeTree);

var _setNodeProperties = require('./setNodeProperties');

var _setNodeProperties2 = _interopRequireDefault(_setNodeProperties);

var _removeNodeProperties = require('./removeNodeProperties');

var _removeNodeProperties2 = _interopRequireDefault(_removeNodeProperties);

var _findNode = require('./findNode');

var _findNode2 = _interopRequireDefault(_findNode);

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var _internalsIsElement = require('../internals/isElement');

var _internalsIsElement2 = _interopRequireDefault(_internalsIsElement);

var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = _internalsConstants2.default.ORDER_ATTRIBUTE_NAME;
var PATCH_ASH_NODE = _internalsConstants2.default.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = _internalsConstants2.default.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = _internalsConstants2.default.PATCH_PROPERTIES;
var PATCH_ORDER = _internalsConstants2.default.PATCH_ORDER;
var PATCH_INSERT = _internalsConstants2.default.PATCH_INSERT;
var PATCH_REMOVE = _internalsConstants2.default.PATCH_REMOVE;
var LEVEL_SEPARATOR = _internalsConstants2.default.LEVEL_SEPARATOR;

var eventListener = new _classesEventListener2.default();

function zeroPadNumber(number, length) {
	var n = Math.pow(10, length);

	return number < n ? ('' + (n + number)).slice(1) : '' + number;
}

function comparePatches(a, b) {
	return a.sortOrder - b.sortOrder;
}

function compareNodes(a, b) {
	return a[ORDER_ATTRIBUTE_NAME] - b[ORDER_ATTRIBUTE_NAME];
}

function walkReindexChildNodes(node, levelIndex, order) {
	var childLevels;

	for (var i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType === 1) {
			childLevels = _parseAshNodeIndex2.default(node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
			childLevels[levelIndex] = order;

			node.childNodes[i][INDEX_ATTRIBUTE_NAME] = childLevels.join(LEVEL_SEPARATOR);
			node.childNodes[i][ORDER_ATTRIBUTE_NAME] = childLevels[childLevels.length - 1];
			//$(node.childNodes[i]).attr('index', node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
			//$(node.childNodes[i]).attr('order', node.childNodes[i][ORDER_ATTRIBUTE_NAME]);

			if (node.childNodes[i].childNodes && node.childNodes[i].childNodes.length) {
				walkReindexChildNodes(node.childNodes[i], levelIndex, order);
			}
		}
	}
}

function reindexChildNodes(parentNode, order) {
	var parentLevels = _parseAshNodeIndex2.default(parentNode[INDEX_ATTRIBUTE_NAME]);
	var levelIndex = parentLevels.length - 1;

	walkReindexChildNodes(parentNode, levelIndex, order);
}

function flushCache(reindexCache, reorderCache) {
	while (reindexCache.length > 0) {
		reindexCache[0].node[INDEX_ATTRIBUTE_NAME] = reindexCache[0].newIndex;
		reindexCache[0].node[ORDER_ATTRIBUTE_NAME] = reindexCache[0].newOrder;

		//$(reindexCache[0].node).attr('index', reindexCache[0].node[INDEX_ATTRIBUTE_NAME]);
		//$(reindexCache[0].node).attr('order', reindexCache[0].node[ORDER_ATTRIBUTE_NAME]);

		reindexChildNodes(reindexCache[0].node, reindexCache[0].newOrder);

		// clear the cache
		reindexCache.shift();
	}

	// remove un-unique nodes from reorder cache
	for (var i = 0; i < reorderCache.length; i++) {
		for (var j = i + 1; j < reorderCache.length; j++) {
			if (reorderCache[j] === reorderCache[i]) {
				reorderCache.splice(j, 1);
				j--;
			}
		}
	}

	while (reorderCache.length > 0) {
		var children = [];

		for (var i = 0; i < reorderCache[0].childNodes.length; i++) {
			children[i] = reorderCache[0].childNodes[i];
		}

		// sort children
		children.sort(compareNodes);

		for (var i = 0; i < children.length; i++) {
			reorderCache[0].appendChild(children[i]);
		}

		// remove cache item
		reorderCache.shift();
	}
}

// apply patches to dom tree
function patchNodeTree(nodeTree /*, patches*/) {
	var patches = arguments[1];
	var node;
	var reindexCache = [];
	var reorderCache = [];

	// type check
	if (!_internalsIsElement2.default(nodeTree)) {
		return false;
	}

	if (!patches.length) {
		return true;
	}

	// if there is non zero max index, compute number of its digits
	var maxDigits = 1;

	if (patches.maxIndex > 0) {
		maxDigits = Math.floor(Math.log(Math.abs(Math.floor(patches.maxIndex))) / Math.LN10) + 1;
	}

	// compute sort order
	for (var i = 0; i < patches.length; i++) {
		patches[i].sortOrder = '';

		// first we order patches by their levels without the last level
		for (var j = 0; j < patches[i].parsedIndex.length - 1; j++) {
			patches[i].sortOrder += zeroPadNumber(patches[i].parsedIndex[j], maxDigits);
		}

		// then the patch type is important
		if (patches[i].type === PATCH_ASH_NODE) {
			patches[i].sortOrder += zeroPadNumber(9, maxDigits);
		} else if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			patches[i].sortOrder += zeroPadNumber(8, maxDigits);
		} else if (patches[i].type === PATCH_PROPERTIES) {
			patches[i].sortOrder += zeroPadNumber(7, maxDigits);
		} else if (patches[i].type === PATCH_REMOVE) {
			patches[i].sortOrder += zeroPadNumber(6, maxDigits);
		} else if (patches[i].type === PATCH_INSERT) {
			patches[i].sortOrder += zeroPadNumber(5, maxDigits);
		} else if (patches[i].type === PATCH_ORDER) {
			patches[i].sortOrder += zeroPadNumber(4, maxDigits);
		} else {
			patches[i].sortOrder += zeroPadNumber(0, maxDigits);
		}

		// and now the last level
		patches[i].sortOrder += zeroPadNumber(patches[i].parsedIndex[patches[i].parsedIndex.length - 1], maxDigits);

		// convert to number;
		patches[i].sortOrder = parseInt(patches[i].sortOrder, 10);
	}

	// sort patches by their order
	patches.sort(comparePatches);

	// now lets proof-check some...
	var newParsedIndex;
	var levels;
	var index;

	for (var i = patches.length - 1; i >= 0; i--) {
		if (patches[i].type === PATCH_INSERT) {
			levels = patches[i].parsedIndex.slice(0);

			while (levels.length >= 3) {
				levels.pop();
				index = levels.join(LEVEL_SEPARATOR);

				for (var j = i; j >= 0; j--) {
					if (patches[j].type === PATCH_ORDER && patches[j].newIndex === index) {
						// patches[i].origIndex = patches[i].index;
						// patches[i].origParsedIndex = patches[i].parsedIndex.slice(0);
						// patches[i].origParentIndex = patches[i].parentIndex;
						newParsedIndex = patches[i].parsedIndex.slice(0);

						for (var k = 0; k < patches[j].parsedIndex.length; k++) {
							newParsedIndex[k] = patches[j].parsedIndex[k];
						}

						patches[i].index = newParsedIndex.join(LEVEL_SEPARATOR);
						patches[i].parsedIndex = newParsedIndex.slice(0);
						newParsedIndex = _parseAshNodeIndex2.default(patches[i].parentIndex);

						for (var k = 0; k < patches[j].parsedIndex.length; k++) {
							newParsedIndex[k] = patches[j].parsedIndex[k];
						}

						patches[i].parentIndex = newParsedIndex.join(LEVEL_SEPARATOR);
					}
				}
			}
		}
	}

	// now iterate over patches...
	var lastLevel;

	for (var i = patches.length - 1; i >= 0; i--) {
		if (!lastLevel) {
			lastLevel = patches[i].parsedIndex.length;
		}

		if (lastLevel < patches[i].parsedIndex.length) {
			// patching new level, must flush cache
			flushCache(reindexCache, reorderCache);
			lastLevel = patches[i].parsedIndex.length;
		}

		if (patches[i].type === PATCH_ASH_NODE) {
			// remove old events
			eventListener.removeEvents(patches[i].index, patches[i].stage);

			// replace node
			node = _findNode2.default(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			node.parentNode.replaceChild(_createNodeTree2.default(patches[i].node), node);
		}

		if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			node = _findNode2.default(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			node.nodeValue = patches[i].text;
		}

		if (patches[i].type === PATCH_PROPERTIES) {
			node = _findNode2.default(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			_setNodeProperties2.default(node, patches[i].propertiesToChange, false);
			_removeNodeProperties2.default(node, patches[i].propertiesToRemove);
		}

		if (patches[i].type === PATCH_REMOVE) {
			node = _findNode2.default(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			// remove old events
			eventListener.removeEvents(patches[i].index, patches[i].stage);

			node.parentNode.removeChild(node);
		}

		if (patches[i].type === PATCH_INSERT) {
			node = _findNode2.default(nodeTree, patches[i].parentIndex);

			if (!node) {
				return false;
			}

			node.appendChild(_createNodeTree2.default(patches[i].node));

			reorderCache.push(node);
		}

		if (patches[i].type === PATCH_ORDER) {
			node = _findNode2.default(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			// reindex events
			eventListener.reindexEvents(patches[i].index, patches[i].order, patches[i].stage);

			reindexCache.push({
				node: node,
				newIndex: patches[i].newIndex,
				newOrder: patches[i].order,
				oldIndex: patches[i].index,
				stage: patches[i].stage
			});

			reorderCache.push(node.parentNode);
		}
	}

	flushCache(reindexCache, reorderCache);

	eventListener.markEvents(patches.stage);

	return true;
}

exports.default = patchNodeTree;
module.exports = exports.default;