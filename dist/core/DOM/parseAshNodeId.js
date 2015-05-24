'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = parseAshNodeId;

function parseAshNodeId(id) {
	var result = id.split('.');

	for (var i = 0; i < result.length; i++) {
		result[i] |= 0;
	}

	return result;
}

module.exports = exports.default;