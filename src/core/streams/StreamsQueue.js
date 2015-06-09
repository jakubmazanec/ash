var streamsQueue = global.queue = [];

streamsQueue.isUpdating = false;

export function getStreamsQueue() {
	return streamsQueue;
}
