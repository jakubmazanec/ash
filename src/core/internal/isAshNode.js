import constants from './constants';

const ASH_NODE = constants.ASH_NODE;

function isAshNode(value) {
	return value && value.type == ASH_NODE;
}

export default isAshNode;
