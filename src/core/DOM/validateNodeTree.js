import DOMEvents from '../class/DOMEvents';
import constants from '../internal/constants';

const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
const STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;

var domEvents = new DOMEvents();

function walkValidateNodeTree(nodeTree, ashNodeTree, stage, eventsCache) {
	//console.log('validating ', nodeTree, ashNodeTree, stage);

	if (nodeTree.tagName && nodeTree.tagName.toLowerCase() != ashNodeTree.tagName) {
		//console.log('!', nodeTree.tagName.toLowerCase(), ashNodeTree.tagName);

		return false;
	}

	if ((nodeTree.getAttribute && nodeTree.getAttribute(INDEX_ATTRIBUTE_NAME) != ashNodeTree.index) || (nodeTree.getAttribute && nodeTree.getAttribute(ORDER_ATTRIBUTE_NAME) != ashNodeTree.order)) {
		//console.log('!', nodeTree.getAttribute(INDEX_ATTRIBUTE_NAME), ashNodeTree.index);
		//console.log('!', nodeTree.getAttribute(INDEX_ATTRIBUTE_NAME), ashNodeTree.index);

		return false;
	}

	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
	nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;

	if (ashNodeTree.properties && ashNodeTree.properties.events && typeof ashNodeTree.properties.events == 'object') {
		eventsCache.push({
			events: ashNodeTree.properties.events,
			node: nodeTree
		});
	}

	if ((nodeTree.childNodes.length && (!ashNodeTree.children || !ashNodeTree.children.length)) || (!nodeTree.childNodes.length && (ashNodeTree.children && ashNodeTree.children.length)) || (ashNodeTree.children && nodeTree.childNodes.length != ashNodeTree.children.length)) {
		return false;
	}

	if (ashNodeTree.children && ashNodeTree.children.length) {
		for (let i = 0; i < ashNodeTree.children.length; i++) {
			if (!walkValidateNodeTree(nodeTree.childNodes[i], ashNodeTree.children[i], stage, eventsCache)) {
				return false;
			}
		}
	}

	return true;
}

function validateNodeTree(nodeTree, ashNodeTree, stage) {
	var eventsCache = [];
	var isValid = walkValidateNodeTree(nodeTree, ashNodeTree, stage, eventsCache);

	//console.log(isValid, eventsCache);

	if (isValid) {
		for (let i = 0; i < eventsCache.length; i++) {
			domEvents.addEvents(eventsCache[i].node, eventsCache[i].events);
		}
		
	}

	if (isValid) {
		for (let i = 0; i < eventsCache.length; i++) {
			domEvents.addEvents(eventsCache[i].node, eventsCache[i].events);
		}
	}

	return isValid;
}

export default validateNodeTree;
