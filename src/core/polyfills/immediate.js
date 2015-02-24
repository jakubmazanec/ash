import nextTick from './immediate/nextTick';
import mutation from './immediate/mutation.js';
import messageChannel from './immediate/messageChannel';
import stateChange from './immediate/stateChange';
import timeout from './immediate/timeout';

var types = [
	nextTick,
	mutation.js,
	messageChannel,
	stateChange,
	timeout
];
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

export default immediate;
