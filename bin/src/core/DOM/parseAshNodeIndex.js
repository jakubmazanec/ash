"use strict";

function parseAshNodeIndex(index) {
	return index.split(".").map(function (value) {
		return parseInt(value, 10);
	});
}

module.exports = parseAshNodeIndex;