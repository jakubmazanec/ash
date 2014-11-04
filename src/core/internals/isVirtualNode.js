'use strict';

var virtualNodeTypes = require('../constants/virtualNodeTypes');

var VIRTUAL_NODE = virtualNodeTypes.VIRTUAL_NODE;

function isVirtualNode(value)
{
	return value && value.type == VIRTUAL_NODE;
}

module.exports = isVirtualNode;