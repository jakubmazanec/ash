'use strict';

var constants = require('./constants');

var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

function isAshTextNode(value)
{
	return value && value.type == ASH_TEXT_NODE;
}

module.exports = isAshTextNode;