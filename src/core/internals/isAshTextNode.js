import constants from './constants';

const ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

function isAshTextNode(value) {
	return value && value.type === ASH_TEXT_NODE;
}

export default isAshTextNode;
