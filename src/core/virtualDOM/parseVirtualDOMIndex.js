'use strict';

var _ = require('_');

var __parseInt = _.unary(parseInt);

function parseVirtualDOMIndex(value)
{
	return _.map(value.split('.'), __parseInt);
}

module.exports = parseVirtualDOMIndex;