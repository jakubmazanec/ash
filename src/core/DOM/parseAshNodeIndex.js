'use strict';

var _ = require('_');

var __parseInt = _.unary(parseInt);

function parseAshNodeIndex(value)
{
	return _.map(value.split('.'), __parseInt);
}

module.exports = parseAshNodeIndex;