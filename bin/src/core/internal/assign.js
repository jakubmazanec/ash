"use strict";

function assign() {
	var sources = [];
	var target = arguments[0] || {};

	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] && typeof arguments[i] === "object") {
			sources.push(arguments[i]);
		}
	}

	if (!sources.length) {
		return target;
	}

	for (var i = 0; i < sources.length; i++) {
		for (var prop in sources[i]) {
			if (sources[i].hasOwnProperty(prop) && typeof sources[i][prop] !== "undefined" && sources[i][prop] !== null) {
				target[prop] = sources[i][prop];
			}
		}
	}

	return target;
}

module.exports = assign;
/*target, ...source*/