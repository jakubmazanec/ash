import isAshTextNode from '../internals/isAshTextNode';
import setNodeProperties from './setNodeProperties';
import constants from '../internals/constants';

const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;
const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const STREAM_ID_ATTRIBUTE_NAME = constants.STREAM_ID_ATTRIBUTE_NAME;

export default function createNodeTree(ashNodeTree) {
	var nodeTree;
	var child;

	if (!ashNodeTree) {
		return null;
	}

	if (isAshTextNode(ashNodeTree)) {
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
	
	setNodeProperties(nodeTree, ashNodeTree.properties, true);
	// $(nodeTree).attr('nodeId', nodeTree[ID_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('index', nodeTree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);

	for (let i = 0; i < ashNodeTree.children.length; i++) {
		child = createNodeTree(ashNodeTree.children[i]);

		if (child) {
			nodeTree.appendChild(child);
		}
	}

	return nodeTree;
}
