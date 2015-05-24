import constants from './constants';



const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

export default function isComponentAshElement(value) {
	return value && value.type === COMPONENT_ASH_ELEMENT;
}
