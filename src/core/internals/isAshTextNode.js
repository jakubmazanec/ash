import constants from './constants';



const ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

export default function isAshTextNode(value) {
	return value && value.type === ASH_TEXT_NODE;
}
