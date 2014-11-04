'use strict';

var descriptorTypes = require('../constants/descriptorTypes');

var VIRTUAL_NODE_DESCRIPTOR = descriptorTypes.VIRTUAL_NODE_DESCRIPTOR;

function isVirtualNodeDescriptor(value)
{
	return value && value.type == VIRTUAL_NODE_DESCRIPTOR;
}

module.exports = isVirtualNodeDescriptor;