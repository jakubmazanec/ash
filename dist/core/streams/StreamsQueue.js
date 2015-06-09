"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStreamsQueue = getStreamsQueue;
var streamsQueue = global.queue = [];

streamsQueue.isUpdating = false;

function getStreamsQueue() {
	return streamsQueue;
}