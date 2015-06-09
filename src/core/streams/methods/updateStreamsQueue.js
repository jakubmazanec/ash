import updateStreamDependencies from './updateStreamDependencies';

export default function updateStreamsQueue(streamsQueue) {
	if (streamsQueue.isUpdating) {
		return;
	}

	streamsQueue.isUpdating = true;

	while (streamsQueue.length > 0) {
		updateStreamDependencies(streamsQueue.shift());
	}

	streamsQueue.isUpdating = false;
}
