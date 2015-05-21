// import parseAshNodeIndex from './parseAshNodeIndex';
import constants from '../internals/constants';

const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;

export default function findNode(nodeTree, nodeId, ashNodeIndices) {
	// var ashNodeIndices = parseAshNodeIndex(nodeId);
	var node = nodeTree;

	if (!nodeTree) {
		throw new Error(nodeTree + ' cannot be falsy.');
	}

	if (ashNodeIndices.length === 1) {
		return node;
	} else {
		for (let i = 1, length = ashNodeIndices.length - 1; i < length; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[ashNodeIndices[i]];
		}
	}
	
	for (let i = 0, length = node.childNodes.length; i < length; i++) {
		if (node.childNodes[i].nodeType === 1 && node.childNodes[i][ID_ATTRIBUTE_NAME] === nodeId) {
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType === 3 && i === ashNodeIndices[ashNodeIndices.length - 1]) {
			return node.childNodes[i];
		}
	}

	return false;
}
