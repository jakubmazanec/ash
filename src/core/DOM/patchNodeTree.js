import constants from '../internals/constants';
import parseAshNodeId from './parseAshNodeId';
import createNodeTree from './createNodeTree';
import setNodeProperties from './setNodeProperties';
import removeNodeProperties from './removeNodeProperties';
import findNode from './findNode';
import EventListener from '../classes/EventListener';
import isElement from '../internals/isElement';



const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;
const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
const PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
const PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
const PATCH_ORDER = constants.PATCH_ORDER;
const PATCH_INSERT = constants.PATCH_INSERT;
const PATCH_REMOVE = constants.PATCH_REMOVE;
const INDEX_SEPARATOR = constants.INDEX_SEPARATOR;

var eventListener = new EventListener();

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

	for (let i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType === 1) {
			childIndices = parseAshNodeId(node.childNodes[i][ID_ATTRIBUTE_NAME]);
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
	var parentIndices = parseAshNodeId(parentNode[ID_ATTRIBUTE_NAME]);
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
export default function patchNodeTree(nodeTree/*, patches*/) {
	var patches = arguments[1];
	var node;
	var reindexCache = [];
	var reorderCache = [];

	// type check
	if (!isElement(nodeTree)) {
		throw new Error('Patching the DOM was unsuccesful!');
	}

	if (!patches.length) {
		return true;
	}

	// if there is non zero max index, compute number of its digits
	let maxDigits = patches.maxIndex > 0 ? Math.floor(Math.log(Math.abs(Math.floor(patches.maxIndex))) / Math.LN10) + 1 : 1;

	// compute sort order
	for (let i = 0; i < patches.length; i++) {
		patches[i].sortOrder = '';

		// first we order patches by their levels without the last level
		for (let j = 0; j < patches[i].indices.length - 1; j++) {
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
	let lastLevel = patches[patches.length - 1].indices.length;

	for (let i = patches.length - 1; i >= 0; i--) {
		if (lastLevel < patches[i].indices.length) {
			// patching new level, must flush cache
			flushCache(reindexCache, reorderCache);

			lastLevel = patches[i].indices.length;
		}

		if (patches[i].type === PATCH_ASH_NODE) {
			// remove old events
			eventListener.removeEvents(patches[i].id, patches[i].streamId);

			// replace node
			node = findNode(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			node.parentNode.replaceChild(createNodeTree(patches[i].node), node);
		} else if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			node = findNode(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			node.nodeValue = patches[i].text;
		} else if (patches[i].type === PATCH_PROPERTIES) {
			node = findNode(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			setNodeProperties(node, patches[i].propertiesToChange, false);
			removeNodeProperties(node, patches[i].propertiesToRemove);
		} else if (patches[i].type === PATCH_REMOVE) {
			node = findNode(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			// remove old events
			eventListener.removeEvents(patches[i].id, patches[i].streamId);

			node.parentNode.removeChild(node);
		} else if (patches[i].type === PATCH_INSERT) {
			node = findNode(nodeTree, patches[i].parentId, patches[i].parentIndices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}
			
			node.appendChild(createNodeTree(patches[i].node));

			reorderCache.push(node);
		} else if (patches[i].type === PATCH_ORDER) {
			node = findNode(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			// reindex events
			eventListener.reindexEvents(patches[i].id, patches[i].indices, patches[i].index, patches[i].streamId);

			reindexCache.push({
				node,
				newId: patches[i].newId,
				newIndex: patches[i].index,
				streamId: patches[i].streamId
			});

			reorderCache.push(node.parentNode);
		}
	}

	flushCache(reindexCache, reorderCache);

	eventListener.markEvents(patches.streamId);

	return true;
}
