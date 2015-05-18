'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

function parseAshNodeIndex(index) {
	var result = index.split('.');

	for (var i = 0; i < result.length; i++) {
		result[i] = result[i] >> 0; // NOTE: faster than parseInt
	}

	return result;
}

exports.default = parseAshNodeIndex;
module.exports = exports.default;