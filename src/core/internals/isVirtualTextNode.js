'use strict';

var virtualNodeTypes = require('../constants/virtualNodeTypes');

var VIRTUAL_TEXT_NODE = virtualNodeTypes.VIRTUAL_TEXT_NODE;

function isVirtualTextNode(value)
{
	return value && value.type == VIRTUAL_TEXT_NODE;
}

module.exports = isVirtualTextNode;