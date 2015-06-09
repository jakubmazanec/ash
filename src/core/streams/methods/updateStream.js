import isFunction from '../../internals/isFunction';
import {getInStream, setInStream} from '../inStream';
import {getStreamsQueue} from '../streamsQueue';


var streamsQueue = getStreamsQueue();

export default function updateStream(stream) {
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

	let inStream = getInStream();

	if (inStream) {
		streamsQueue.push(stream);

		return;
	}

	inStream = setInStream(stream);

	let newValue = isFunction(stream.fn) ? stream.fn(stream, stream.__updatedDependencies, stream.__dependencies) : undefined;

	if (newValue !== undefined) {
		stream.push(newValue);
	}

	inStream = setInStream(null);

	while (stream.__updatedDependencies.length) {
		stream.__updatedDependencies.shift();
	}
}
