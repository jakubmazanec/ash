import AshElement from '../class/AshElement';
import constants from './constants';

// constants references
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

var createFactory = function (Component) {
	var ComponentElementFactory = AshElement.bind(null, COMPONENT_ASH_ELEMENT, Component);

	ComponentElementFactory.spec = Component;

	return ComponentElementFactory;
};

export default createFactory;
