"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = findStreamDependencies;

function findStreamDependencies(stream, dependenciesCache) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (var i = 0; i < stream.__listeners.length; i++) {
			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}

		dependenciesCache.push(stream);
	}
}

module.exports = exports.default;