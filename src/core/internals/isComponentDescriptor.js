'use strict';

var descriptorTypes = require('../constants/descriptorTypes');

var COMPONENT_DESCRIPTOR = descriptorTypes.COMPONENT_DESCRIPTOR;

function isComponentDescriptor(value)
{
	return value && value.type == COMPONENT_DESCRIPTOR;
}

module.exports = isComponentDescriptor;