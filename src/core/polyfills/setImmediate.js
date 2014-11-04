'use strict';

var messageChannel = require('./setImmediate/messageChannel');
var mutation = require('./setImmediate/mutation');
var nextTick = require('./setImmediate/nextTick');
var stateChange = require('./setImmediate/stateChange');
var timeout = require('./setImmediate/timeout');

var types = [
	nextTick,
	mutation,
	messageChannel,
	stateChange,
	timeout
];
var draining;
var queue = [];

function drainQueue()
{
	draining = true;
	var i, oldQueue;
	var len = queue.length;
	while (len) {
		oldQueue = queue;
		queue = [];
		i = -1;
		while (++i < len)
		{
			oldQueue[i]();
		}
		len = queue.length;
	}
	draining = false;
}

var scheduleDrain;
var i = -1;
var len = types.length;

while (++ i < len)
{
	if (types[i] && types[i].test && types[i].test())
	{
		scheduleDrain = types[i].install(drainQueue);
		break;
	}
}

function setImmediate(task)
{
	if (queue.push(task) === 1 && !draining)
	{
		scheduleDrain();
	}
}

window.setImmediate = setImmediate;

module.exports = setImmediate;