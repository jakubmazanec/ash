import constants from '../internal/constants';
import parseAshNodeIndex from './parseAshNodeIndex';
import createNodeTree from './createNodeTree';
import setNodeProperties from './setNodeProperties';
import removeNodeProperties from './removeNodeProperties';
import findNode from './findNode';
import EventListener from '../class/EventListener';
import isElement from '../internal/isElement';

const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
const PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
const PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
const PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
const PATCH_ORDER = constants.PATCH_ORDER;
const PATCH_INSERT = constants.PATCH_INSERT;
const PATCH_REMOVE = constants.PATCH_REMOVE;
const LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var eventListener = new EventListener();

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

	for (let i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType == 1) {
			childLevels = parseAshNodeIndex(node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
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
	var parentLevels = parseAshNodeIndex(parentNode[INDEX_ATTRIBUTE_NAME]);
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
	for (let i = 0; i < reorderCache.length; i++) {
		for (let j = i + 1; j < reorderCache.length; j++) {
			if (reorderCache[j] === reorderCache[i]) {
				reorderCache.splice(j, 1);
				j--;
			}
		}
	}

	while (reorderCache.length > 0) {
		let children = [];

		for (let i = 0; i < reorderCache[0].childNodes.length; i++) {
			children[i] = reorderCache[0].childNodes[i];
		}

		// sort children
		children.sort(compareNodes);

		for (let i = 0; i < children.length; i++) {
			reorderCache[0].appendChild(children[i]);
		}

		// remove cache item
		reorderCache.shift();
	}
}

// apply patches to dom tree
function patchNodeTree(nodeTree/*, patches*/) {
	var patches = arguments[1];
	var node;
	var reindexCache = [];
	var reorderCache = [];

	// type check
	if (!isElement(nodeTree)) {
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
	for (let i = 0; i < patches.length; i++) {
		patches[i].sortOrder = '';

		// first we order patches by their levels without the last level
		for (let j = 0; j < patches[i].parsedIndex.length - 1; j++) {
			patches[i].sortOrder += zeroPadNumber(patches[i].parsedIndex[j], maxDigits);
		}

		// then the patch type is important
		if (patches[i].type === PATCH_ASH_NODE) {
			patches[i].sortOrder += zeroPadNumber(9, maxDigits);
		} else if (patches[i].type == PATCH_ASH_TEXT_NODE) {
			patches[i].sortOrder += zeroPadNumber(8, maxDigits);
		} else if (patches[i].type == PATCH_PROPERTIES) {
			patches[i].sortOrder += zeroPadNumber(7, maxDigits);
		} else if (patches[i].type == PATCH_REMOVE) {
			patches[i].sortOrder += zeroPadNumber(6, maxDigits);
		} else if (patches[i].type == PATCH_INSERT) {
			patches[i].sortOrder += zeroPadNumber(5, maxDigits);
		} else if (patches[i].type == PATCH_ORDER) {
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

	for (let i = patches.length - 1; i >= 0; i--)
	{
		if (patches[i].type === PATCH_INSERT) {
			levels = patches[i].parsedIndex.slice(0);

			while (levels.length >= 3) {
				levels.pop();
				index = levels.join(LEVEL_SEPARATOR);

				for (let j = i; j >= 0; j--) {
					if (patches[j].type === PATCH_ORDER && patches[j].newIndex == index) {
						// patches[i].origIndex = patches[i].index;
						// patches[i].origParsedIndex = patches[i].parsedIndex.slice(0);
						// patches[i].origParentIndex = patches[i].parentIndex;
						newParsedIndex = patches[i].parsedIndex.slice(0);

						for (let k = 0; k < patches[j].parsedIndex.length; k++) {
							newParsedIndex[k] = patches[j].parsedIndex[k];
						}

						patches[i].index = newParsedIndex.join(LEVEL_SEPARATOR);
						patches[i].parsedIndex = newParsedIndex.slice(0);
						newParsedIndex = parseAshNodeIndex(patches[i].parentIndex);

						for (let k = 0; k < patches[j].parsedIndex.length; k++) {
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

	for (let i = patches.length - 1; i >= 0; i--) {
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
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			node.parentNode.replaceChild(createNodeTree(patches[i].node), node);
		}

		if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			node.nodeValue = patches[i].text;
		}

		if (patches[i].type === PATCH_PROPERTIES) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			setNodeProperties(node, patches[i].propertiesToChange, false);
			removeNodeProperties(node, patches[i].propertiesToRemove);
		}

		if (patches[i].type === PATCH_REMOVE) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			// remove old events
			eventListener.removeEvents(patches[i].index, patches[i].stage);

			node.parentNode.removeChild(node);
		}

		if (patches[i].type === PATCH_INSERT) {
			node = findNode(nodeTree, patches[i].parentIndex);

			if (!node) {
				return false;
			}
			
			node.appendChild(createNodeTree(patches[i].node));

			reorderCache.push(node);
		}

		if (patches[i].type === PATCH_ORDER) {
			node = findNode(nodeTree, patches[i].index);

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

export default patchNodeTree;
