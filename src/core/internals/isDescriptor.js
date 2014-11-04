'use strict';

var descriptorTypes = require('../constants/descriptorTypes');

var COMPONENT_DESCRIPTOR = descriptorTypes.COMPONENT_DESCRIPTOR;
var VIRTUAL_NODE_DESCRIPTOR = descriptorTypes.VIRTUAL_NODE_DESCRIPTOR;

function isDescriptor(value)
{
	return value && (value.type == COMPONENT_DESCRIPTOR || value.type == VIRTUAL_NODE_DESCRIPTOR);
}

module.exports = isDescriptor;