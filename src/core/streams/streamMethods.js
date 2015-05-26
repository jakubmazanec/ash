import isFunction from '../internals/isFunction';


var inStream;

export function isInStream(stream) {
	return stream === inStream;
}

export function getInStream() {
	return inStream;
}

export function updateStream(stream) {
	if (stream.end && stream.end.value) {
		return;
	}

	if (!stream.__dependenciesMet) {
		stream.__dependenciesMet = true;

		for (let i = 0; i < stream.__dependencies.length; i++) {
			if (!stream.__dependencies[i].hasValue) {
				stream.__dependenciesMet = false;

				return;
			}
		}
	}

	inStream = stream;

	let newValue = isFunction(stream.fn) ? stream.fn(stream, stream.__updatedDependencies, stream.__dependencies) : undefined;

	if (newValue !== undefined) {
		stream.push(newValue);
	}

	inStream = null;

	// stream.__updatedDependencies = [];
	while (stream.__updatedDependencies.length) {
		stream.__updatedDependencies.shift();
	}
}

export function findStreamDependencies(stream, dependenciesCache) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (let i = 0; i < stream.__listeners.length; i++) {
			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}

		dependenciesCache.push(stream);
	}
}

export function updateStreamDependencies(stream) {
	let dependenciesCache = [];

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
}

export function detachStreamDependencies(stream) {
	for (let i = 0; i < stream.__dependencies.length; i++) {
		stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.indexOf(stream)] = stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.length - 1];
		stream.__dependencies[i].__listeners.pop();
	}

	stream.__dependencies = [];
}
