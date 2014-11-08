'use strict';

var constants = require('./constants');

var ASH_NODE = constants.ASH_NODE;

function isAshNode(value)
{
	return value && value.type == ASH_NODE;
}

module.exports = isAshNode;