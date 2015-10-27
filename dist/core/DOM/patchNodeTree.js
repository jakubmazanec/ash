'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = patchNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _parseAshNodeId = require('./parseAshNodeId');

var _parseAshNodeId2 = _interopRequireDefault(_parseAshNodeId);

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

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var PATCH_ASH_NODE = _internalsConstants2.default.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = _internalsConstants2.default.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = _internalsConstants2.default.PATCH_PROPERTIES;
var PATCH_ORDER = _internalsConstants2.default.PATCH_ORDER;
var PATCH_INSERT = _internalsConstants2.default.PATCH_INSERT;
var PATCH_REMOVE = _internalsConstants2.default.PATCH_REMOVE;
var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

var eventListener = new _classesEventListener2.default();

function zeroPadNumber(number, length) {
	var n = Math.pow(10, length);

	return number < n ? ('' + (n + number)).slice(1) : '' + number;
}

function comparePatches(a, b) {
	return a.sortOrder - b.sortOrder;
}

function compareNodes(a, b) {
	return a[INDEX_ATTRIBUTE_NAME] - b[INDEX_ATTRIBUTE_NAME];
}

function walkReindexChildNodes(node, level, newIndex) {
	var childIndices;

	for (var i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType === 1) {
			childIndices = (0, _parseAshNodeId2.default)(node.childNodes[i][ID_ATTRIBUTE_NAME]);
			childIndices[level] = newIndex;

			node.childNodes[i][ID_ATTRIBUTE_NAME] = childIndices.join(INDEX_SEPARATOR);
			node.childNodes[i][INDEX_ATTRIBUTE_NAME] = childIndices[childIndices.length - 1];
			//$(node.childNodes[i]).attr('nodeId', node.childNodes[i][ID_ATTRIBUTE_NAME]);
			//$(node.childNodes[i]).attr('index', node.childNodes[i][INDEX_ATTRIBUTE_NAME]);

			if (node.childNodes[i].childNodes && node.childNodes[i].childNodes.length) {
				walkReindexChildNodes(node.childNodes[i], level, newIndex);
			}
		}
	}
}

function reindexChildNodes(parentNode, newIndex) {
	var parentIndices = (0, _parseAshNodeId2.default)(parentNode[ID_ATTRIBUTE_NAME]);
	var level = parentIndices.length - 1;

	walkReindexChildNodes(parentNode, level, newIndex);
}

function flushCache(reindexCache, reorderCache) {
	while (reindexCache.length > 0) {
		reindexCache[0].node[ID_ATTRIBUTE_NAME] = reindexCache[0].newId;
		reindexCache[0].node[INDEX_ATTRIBUTE_NAME] = reindexCache[0].newIndex;

		//$(reindexCache[0].node).attr('nodeId', reindexCache[0].node[ID_ATTRIBUTE_NAME]);
		//$(reindexCache[0].node).attr('index', reindexCache[0].node[INDEX_ATTRIBUTE_NAME]);

		reindexChildNodes(reindexCache[0].node, reindexCache[0].newIndex);

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
	if (!(0, _internalsIsElement2.default)(nodeTree)) {
		throw new Error('Patching the DOM was unsuccesful!');
	}

	if (!patches.length) {
		return true;
	}

	// if there is non zero max index, compute number of its digits
	var maxDigits = patches.maxIndex > 0 ? Math.floor(Math.log(Math.abs(Math.floor(patches.maxIndex))) / Math.LN10) + 1 : 1;

	// compute sort order
	for (var i = 0; i < patches.length; i++) {
		patches[i].sortOrder = '';

		// first we order patches by their levels without the last level
		for (var j = 0; j < patches[i].indices.length - 1; j++) {
			patches[i].sortOrder += zeroPadNumber(patches[i].indices[j], maxDigits);
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
		patches[i].sortOrder += zeroPadNumber(patches[i].indices[patches[i].indices.length - 1], maxDigits);

		// convert to number;
		patches[i].sortOrder = parseInt(patches[i].sortOrder, 10);
	}

	// sort patches by their order
	patches.sort(comparePatches);

	// console.log('patches', patches);

	// now iterate over patches...
	var lastLevel = patches[patches.length - 1].indices.length;

	for (var i = patches.length - 1; i >= 0; i--) {
		if (lastLevel < patches[i].indices.length) {
			// patching new level, must flush cache
			flushCache(reindexCache, reorderCache);

			lastLevel = patches[i].indices.length;
		}

		if (patches[i].type === PATCH_ASH_NODE) {
			// console.log('applying patch', 'PATCH_ASH_NODE', patches[i]);

			// remove old events
			eventListener.removeEvents(patches[i].id, patches[i].streamId);

			// replace node
			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			// new node, but change the order and index - they must be from the node-to-be-removed, because patch for order is separate...
			var newNode = (0, _createNodeTree2.default)(patches[i].node);

			newNode[ID_ATTRIBUTE_NAME] = node[ID_ATTRIBUTE_NAME];
			newNode[INDEX_ATTRIBUTE_NAME] = node[INDEX_ATTRIBUTE_NAME];

			node.parentNode.replaceChild(newNode, node);
		} else if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			// console.log('applying patch', 'PATCH_ASH_TEXT_NODE', patches[i]);

			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			node.nodeValue = patches[i].text;
		} else if (patches[i].type === PATCH_PROPERTIES) {
			// console.log('applying patch', 'PATCH_PROPERTIES', patches[i]);

			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			(0, _setNodeProperties2.default)(node, patches[i].propertiesToChange, false);
			(0, _removeNodeProperties2.default)(node, patches[i].propertiesToRemove);
		} else if (patches[i].type === PATCH_REMOVE) {
			// console.log('applying patch', 'PATCH_REMOVE', patches[i]);

			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			// remove old events
			eventListener.removeEvents(patches[i].id, patches[i].streamId);

			node.parentNode.removeChild(node);
		} else if (patches[i].type === PATCH_INSERT) {
			// console.log('applying patch', 'PATCH_INSERT', patches[i]);

			node = (0, _findNode2.default)(nodeTree, patches[i].parentId, patches[i].parentIndices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			node.appendChild((0, _createNodeTree2.default)(patches[i].node));

			reorderCache.push(node);
		} else if (patches[i].type === PATCH_ORDER) {
			// console.log('applying patch', 'PATCH_ORDER', patches[i]);

			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			// reindex events
			eventListener.reindexEvents(patches[i].id, patches[i].indices, patches[i].index, patches[i].streamId);

			reindexCache.push({
				node: node,
				newId: patches[i].newId,
				newIndex: patches[i].index,
				streamId: patches[i].streamId
			});

			reorderCache.push(node.parentNode);
		}

		// debugger;
	}

	flushCache(reindexCache, reorderCache);

	eventListener.markEvents(patches.streamId);

	return true;
}

module.exports = exports.default;