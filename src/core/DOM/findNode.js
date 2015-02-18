import parseAshNodeIndex from './parseAshNodeIndex';
import constants from '../internal/constants';

const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;

function findNode(nodeTree, nodeIndex) {
	var parsedAshNodeIndex = parseAshNodeIndex(nodeIndex);
	var node = nodeTree;
	var i;

	if (!nodeTree) {
		throw new Error(nodeTree + ' cannot be falsy.');
	}

	if (parsedAshNodeIndex.length == 1)
	{
		return node;
	} else
	{
		for (i = 1; i < parsedAshNodeIndex.length - 1; i++)
		{
			if (!node)
			{
				return false;
			}

			node = node.childNodes[parsedAshNodeIndex[i]];
		}
	}
	
	for (i = 0; i < node.childNodes.length; i++)
	{
		if (node.childNodes[i].nodeType == 1 && node.childNodes[i][INDEX_ATTRIBUTE_NAME] == nodeIndex)
		{
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType == 3 && i == parsedAshNodeIndex[parsedAshNodeIndex.length - 1])
		{
			return node.childNodes[i];
		}
	}

	return false;
}

export default findNode;
