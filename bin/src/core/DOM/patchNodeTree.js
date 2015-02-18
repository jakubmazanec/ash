"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("../internal/constants"));

var parseAshNodeIndex = _interopRequire(require("./parseAshNodeIndex"));

var createNodeTree = _interopRequire(require("./createNodeTree"));

var setNodeProperties = _interopRequire(require("./setNodeProperties"));

var removeNodeProperties = _interopRequire(require("./removeNodeProperties"));

var findNode = _interopRequire(require("./findNode"));

var DOMEvents = _interopRequire(require("../class/DOMEvents"));

var sortBy = _interopRequire(require("../internal/sortBy"));

var forEach = _interopRequire(require("../internal/forEach"));

var pluck = _interopRequire(require("../internal/pluck"));

var flatten = _interopRequire(require("../internal/flatten"));

var max = _interopRequire(require("../internal/max"));

var padLeft = _interopRequire(require("../internal/padLeft"));

var isElement = _interopRequire(require("../internal/isElement"));

var uniq = _interopRequire(require("../internal/uniq"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
var PATCH_ORDER = constants.PATCH_ORDER;
var PATCH_INSERT = constants.PATCH_INSERT;
var PATCH_REMOVE = constants.PATCH_REMOVE;

var domEvents = new DOMEvents();

// apply patches to dom tree
function patchNodeTree(domTree, patches) {
	// type check
	if (!isElement(domTree)) {
		return false;
	}

	if (!patches.length) {
		return true;
	}

	//var __patches = [];
	var __patches = patches;
	var node;
	var i;
	var reindexCache = [];
	var reorderCache = [];
	var lastLevel;

	function reindexChildNodes(parentNode, order) {
		var parentLevels = parseAshNodeIndex(parentNode[INDEX_ATTRIBUTE_NAME]);
		var levelIndex = parentLevels.length - 1;

		function walk(node) {
			var childLevels;

			for (var _i = 0; _i < node.childNodes.length; _i++) {
				if (node.childNodes[_i].nodeType == 1) {
					childLevels = parseAshNodeIndex(node.childNodes[_i][INDEX_ATTRIBUTE_NAME]);
					childLevels[levelIndex] = order;

					node.childNodes[_i][INDEX_ATTRIBUTE_NAME] = childLevels.join(".");
					node.childNodes[_i][ORDER_ATTRIBUTE_NAME] = childLevels[childLevels.length - 1];
					//$(node.childNodes[i]).attr('index', node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
					//$(node.childNodes[i]).attr('order', node.childNodes[i][ORDER_ATTRIBUTE_NAME]);

					if (node.childNodes[_i].childNodes && node.childNodes[_i].childNodes.length) {
						walk(node.childNodes[_i]);
					}
				}
			}
		}

		walk(parentNode);
	}

	function flushCache() {
		var appendChild = function (item) {
			this.appendChild(item);
		};

		while (reindexCache.length > 0) {
			// reindex events
			//domEvents.reindexEvents(reindexCache[0].oldIndex, reindexCache[0].newOrder, reindexCache[0].stage);

			reindexCache[0].node[INDEX_ATTRIBUTE_NAME] = reindexCache[0].newIndex;
			reindexCache[0].node[ORDER_ATTRIBUTE_NAME] = reindexCache[0].newOrder;

			//$(reindexCache[0].node).attr('index', reindexCache[0].node[INDEX_ATTRIBUTE_NAME]);
			//$(reindexCache[0].node).attr('order', reindexCache[0].node[ORDER_ATTRIBUTE_NAME]);
			//$(reindexCache[0].node).attr('levels', virtualDOM.levels.join('.'));

			reindexChildNodes(reindexCache[0].node, reindexCache[0].newOrder);

			// clear the cache
			reindexCache.shift();
		}

		reorderCache = uniq(reorderCache, "node");

		while (reorderCache.length > 0) {
			var sortedChildren = sortBy(reorderCache[0].node.childNodes, ORDER_ATTRIBUTE_NAME);

			forEach(sortedChildren, appendChild, reorderCache[0].node);

			reorderCache.shift();
		}
	}

	for (i = 0; i < __patches.length; i++) {
		__patches[i].parsedIndex = parseAshNodeIndex(__patches[i].index);
	}

	var maxIndex = pluck(__patches, "parsedIndex");

	maxIndex = flatten(maxIndex);
	maxIndex = max(maxIndex);

	var maxDigits = maxIndex === 0 ? 1 : Math.floor(Math.log(Math.abs(Math.floor(maxIndex))) / Math.LN10) + 1;

	__patches = sortBy(__patches, function (patch) {
		var result = "";

		for (var i = 0; i < patch.parsedIndex.length - 1; i++) {
			result += padLeft(patch.parsedIndex[i], maxDigits, "0");
		}

		if (patch.type == PATCH_ASH_NODE) {
			result += padLeft(9, maxDigits, "0");
		} else if (patch.type == PATCH_ASH_TEXT_NODE) {
			result += padLeft(8, maxDigits, "0");
		} else if (patch.type == PATCH_PROPERTIES) {
			result += padLeft(7, maxDigits, "0");
		} else if (patch.type == PATCH_REMOVE) {
			result += padLeft(6, maxDigits, "0");
		} else if (patch.type == PATCH_INSERT) {
			result += padLeft(5, maxDigits, "0");
		} else if (patch.type == PATCH_ORDER) {
			result += padLeft(4, maxDigits, "0");
		} else {
			result += padLeft(0, maxDigits, "0");
		}

		result += padLeft(patch.parsedIndex[patch.parsedIndex.length - 1], maxDigits, "0");

		return parseInt(result, 10);
	});

	// now lets proof-check some...
	var newLevels;
	var j, k;
	var levels;
	var index;
	for (i = __patches.length - 1; i >= 0; i--) {
		if (__patches[i].type == PATCH_INSERT) {
			levels = __patches[i].parsedIndex.slice(0);

			//console.log('look for parents of patch', JSON.stringify(levels), __patches[i]);

			while (levels.length >= 3) {
				levels.pop();
				index = levels.join(".");

				//console.log('looking for patch with index', index);

				for (j = i; j >= 0; j--) {
					if (__patches[j].type == PATCH_ORDER && __patches[j].newIndex == index) {
						//console.log('*** FOUND!', j, __patches[j]);
						__patches[i].origIndex = __patches[i].index;
						__patches[i].origParsedIndex = __patches[i].parsedIndex.slice(0);
						__patches[i].origParentIndex = __patches[i].parentIndex;

						newLevels = __patches[i].parsedIndex.slice(0);

						for (k = 0; k < __patches[j].parsedIndex.length; k++) {
							newLevels[k] = __patches[j].parsedIndex[k];
						}

						__patches[i].index = newLevels.join(".");
						__patches[i].parsedIndex = newLevels.slice(0);

						newLevels = parseAshNodeIndex(__patches[i].parentIndex);

						for (k = 0; k < __patches[j].parsedIndex.length; k++) {
							newLevels[k] = __patches[j].parsedIndex[k];
						}

						__patches[i].parentIndex = newLevels.join(".");
					}
				}
			}
		}
	}

	// now iterate over patches...
	for (i = __patches.length - 1; i >= 0; i--) {
		if (!lastLevel) {
			lastLevel = __patches[i].parsedIndex.length;
		}

		if (lastLevel < __patches[i].parsedIndex.length) {
			// patching new level, must flush cache
			flushCache();
			lastLevel = __patches[i].parsedIndex.length;
		}

		if (__patches[i].type == PATCH_ASH_NODE) {
			// remove old events
			domEvents.removeEvents(__patches[i].index, __patches[i].stage);

			// replace node
			node = findNode(domTree, __patches[i].index);

			if (!node) {
				return false;
			}

			node.parentNode.replaceChild(createNodeTree(__patches[i].node), node);
		}

		if (__patches[i].type == PATCH_ASH_TEXT_NODE) {
			node = findNode(domTree, __patches[i].index);

			if (!node) {
				return false;
			}

			node.nodeValue = __patches[i].text;
		}

		if (__patches[i].type == PATCH_PROPERTIES) {
			node = findNode(domTree, __patches[i].index);

			if (!node) {
				return false;
			}

			setNodeProperties(node, __patches[i].propertiesToChange, false);
			removeNodeProperties(node, __patches[i].propertiesToRemove);
		}

		if (__patches[i].type == PATCH_REMOVE) {
			// remove old events
			domEvents.removeEvents(__patches[i].index, __patches[i].stage);

			node = findNode(domTree, __patches[i].index);

			if (!node) {
				return false;
			}

			node.parentNode.removeChild(node);
		}

		if (__patches[i].type == PATCH_INSERT) {
			node = findNode(domTree, __patches[i].parentIndex);

			if (!node) {
				return false;
			}

			node.appendChild(createNodeTree(__patches[i].node));

			reorderCache.push({
				node: node
			});
		}

		if (__patches[i].type == PATCH_ORDER) {
			if (typeof __patches[i].index !== "undefined") {


				// moving existing node
				node = findNode(domTree, __patches[i].index);

				if (!node) {
					return false;
				}

				domEvents.reindexEvents(__patches[i].index, __patches[i].order, __patches[i].stage);

				reindexCache.push({
					node: node,
					newIndex: __patches[i].newIndex,
					newOrder: __patches[i].order,
					oldIndex: __patches[i].index,
					stage: __patches[i].stage
				});
			} else {
				return false;
			}

			reorderCache.push({
				node: node.parentNode
			});
		}
	}

	flushCache();

	//if (__patches[0]) {
	domEvents.markEvents(__patches[0].stage);
	//}

	return true;
}

module.exports = patchNodeTree;