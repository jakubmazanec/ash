'use strict';

var AshElement = require('../class/AshElement');
var constants = require('../internal/constants');

// constants references
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

var createFactory = function (Component) {
	console.log(Component);
	var ComponentElementFactory = AshElement.bind(null, COMPONENT_ASH_ELEMENT, Component);

	ComponentElementFactory.spec = Component;

	return ComponentElementFactory;
};

module.exports = createFactory;