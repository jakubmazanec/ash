"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStreamsQueue = getStreamsQueue;
var streamsQueue = [];

streamsQueue.isUpdating = false;

function getStreamsQueue() {
	return streamsQueue;
}