import constants from './constants';



const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

export default function isAshNodeAshElement(value) {
	return value && value.type === ASH_NODE_ASH_ELEMENT;
}
