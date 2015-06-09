import detachStreamDependencies from './detachStreamDependencies';
import updateStream from './updateStream';
import findStreamDependencies from './findStreamDependencies';
import {getStreamsQueue} from '../streamsQueue';


var streamsQueue = getStreamsQueue();

export default function updateStreamDependencies(stream) {
	var dependenciesCache = [];
	var isStreamsQueueUpdating = streamsQueue.isUpdating;

	streamsQueue.isUpdating = true;

	for (let i = 0; i < stream.__listeners.length; i++) {
		if (stream.__listeners[i].end === stream) {
			detachStreamDependencies(stream.__listeners[i]);
			detachStreamDependencies(stream.__listeners[i].end);
		} else {
			stream.__listeners[i].__updatedDependencies.push(stream);

			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}
	}

	for (let i = dependenciesCache.length - 1; i >= 0; i--) {
		if (dependenciesCache[i].__updatedDependencies !== undefined && dependenciesCache[i].__updatedDependencies.length) {
			updateStream(dependenciesCache[i]);
		}

		dependenciesCache[i].__queued = false;
	}

	streamsQueue.isUpdating = isStreamsQueueUpdating;

	if (!isStreamsQueueUpdating) {
		// TODO: should really be: updateStreamsQueue(streamsQueue), but circular dependencies...
		streamsQueue.isUpdating = true;

		while (streamsQueue.length > 0) {
			updateStreamDependencies(streamsQueue.shift());
		}

		streamsQueue.isUpdating = false;
	}
}
