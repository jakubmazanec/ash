import {updateStream, detachStreamDependencies} from './streamMethods';



var streamsQueue;

function findStreamDependencies(stream, dependenciesCache) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (let i = 0; i < stream.__listeners.length; i++) {
			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}

		dependenciesCache.push(stream);
	}
}

class StreamsQueue {
	streams = [];

	constructor() {
		if (streamsQueue) {
			return streamsQueue;
		}
	}

	push(value) {
		this.streams.push(value);

		return this;
	}

	update() {
		while (this.streams.length > 0) {
			let dependenciesCache = [];

			for (let i = 0; i < this.streams[0].__listeners.length; i++) {
				if (this.streams[0].__listeners[i].end === this.streams[0]) {
					detachStreamDependencies(this.streams[0].__listeners[i]);
					detachStreamDependencies(this.streams[0].__listeners[i].end);
				} else {
					this.streams[0].__listeners[i].__updatedDependencies.push(this.streams[0]);

					findStreamDependencies(this.streams[0].__listeners[i], dependenciesCache);
				}
			}

			for (let i = dependenciesCache.length - 1; i >= 0; i--) {
				if (dependenciesCache[i].__updatedDependencies !== undefined && dependenciesCache[i].__updatedDependencies.length) {
					updateStream(dependenciesCache[i]);
				}

				dependenciesCache[i].__queued = false;
			}

			this.streams.shift();
		}
	}
}

export default StreamsQueue;
