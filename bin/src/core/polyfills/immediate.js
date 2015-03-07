"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var nextTick = _interopRequire(require("./immediate/nextTick"));

var mutation = _interopRequire(require("./immediate/mutation.js"));

var messageChannel = _interopRequire(require("./immediate/messageChannel"));

var stateChange = _interopRequire(require("./immediate/stateChange"));

var timeout = _interopRequire(require("./immediate/timeout"));

var types = [nextTick, mutation.js, messageChannel, stateChange, timeout];
var queue = [];
var draining;

// named nextTick for less confusing stack traces
function nextTick() {
	var oldQueue;
	var i;

	draining = true;

	while (queue.length) {
		oldQueue = queue;
		queue = [];
		i = -1;

		while (++i < queue.length) {
			oldQueue[i]();
		}
	}

	draining = false;
}

var scheduleDrain;
var i = -1;
var len = types.length;

while (++i < len) {
	if (types[i] && types[i].test && types[i].test()) {
		scheduleDrain = types[i].install(nextTick);

		break;
	}
}

function immediate(task) {
	if (queue.push(task) === 1 && !draining) {
		scheduleDrain();
	}
}

module.exports = immediate;