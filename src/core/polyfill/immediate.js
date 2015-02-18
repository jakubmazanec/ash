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
while (++ i < len) {
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
