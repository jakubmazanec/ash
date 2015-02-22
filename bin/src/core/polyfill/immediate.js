"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var nextTick = _interopRequire(require("./immediate/nextTick"));

var mutation = _interopRequire(require("./immediate/mutation.js"));

var messageChannel = _interopRequire(require("./immediate/messageChannel"));

var stateChange = _interopRequire(require("./immediate/stateChange"));

var timeout = _interopRequire(require("./immediate/timeout"));

var types = [nextTick, mutation.js, messageChannel, stateChange, timeout];
var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
	draining = true;
	var i, oldQueue;
	var len = queue.length;
	while (len) {
		oldQueue = queue;
		queue = [];
		i = -1;
		while (++i < len) {
			oldQueue[i]();
		}
		len = queue.length;
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