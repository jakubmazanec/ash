'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immediateNextTick = require('./immediate/nextTick');

var _immediateNextTick2 = _interopRequireDefault(_immediateNextTick);

var _immediateMutationJs = require('./immediate/mutation.js');

var _immediateMutationJs2 = _interopRequireDefault(_immediateMutationJs);

var _immediateMessageChannel = require('./immediate/messageChannel');

var _immediateMessageChannel2 = _interopRequireDefault(_immediateMessageChannel);

var _immediateStateChange = require('./immediate/stateChange');

var _immediateStateChange2 = _interopRequireDefault(_immediateStateChange);

var _immediateTimeout = require('./immediate/timeout');

var _immediateTimeout2 = _interopRequireDefault(_immediateTimeout);

var types = [_immediateNextTick2.default, _immediateMutationJs2.default.js, _immediateMessageChannel2.default, _immediateStateChange2.default, _immediateTimeout2.default];
var queue = [];
var draining;

// named nextTick for less confusing stack traces
function next() {
	var oldQueue;
	var i = undefined;

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

for (var i = 0; i < types.length; i++) {
	if (types[i] && types[i].test && types[i].test()) {
		scheduleDrain = types[i].install(next);

		break;
	}
}

function immediate(task) {
	if (queue.push(task) === 1 && !draining) {
		scheduleDrain();
	}
}

exports.default = immediate;
module.exports = exports.default;