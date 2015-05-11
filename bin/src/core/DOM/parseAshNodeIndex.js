'use strict';

Object.defineProperty(exports, '__esModule', {
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