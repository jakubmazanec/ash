"use strict";

function parseAshNodeIndex(index) {
	var result = index.split(".");

	for (var i = 0; i < result.length; i++) {
		result[i] = parseInt(result[i], 10);
	}

	return result;
}

module.exports = parseAshNodeIndex;