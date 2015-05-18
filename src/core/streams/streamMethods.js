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

	let newValue = isFunction(stream.fn) ? stream.fn(stream, stream.__updatedDependencies) : undefined;

	if (newValue !== undefined) {
		stream.push(newValue);
	}

	inStream = null;

	stream.__updatedDependencies = [];
}

export function detachStreamDependencies(stream) {
	for (let i = 0; i < stream.__dependencies.length; i++) {
		stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.indexOf(stream)] = stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.length - 1];
		stream.__dependencies[i].__listeners.pop();
	}

	stream.__dependencies = [];
}
