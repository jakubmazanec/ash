import constants from './constants';



const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

export default function isAshElement(value) {
	return value && (value.type === COMPONENT_ASH_ELEMENT || value.type === ASH_NODE_ASH_ELEMENT);
}
