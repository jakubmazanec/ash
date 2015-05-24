'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.isInStream = isInStream;
exports.getInStream = getInStream;
exports.updateStream = updateStream;
exports.detachStreamDependencies = detachStreamDependencies;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var inStream;

function isInStream(stream) {
	return stream === inStream;
}

function getInStream() {
	return inStream;
}

function updateStream(stream) {
	if (stream.end && stream.end.value) {
		return;
	}

	if (!stream.__dependenciesMet) {
		stream.__dependenciesMet = true;

		for (var i = 0; i < stream.__dependencies.length; i++) {
			if (!stream.__dependencies[i].hasValue) {
				stream.__dependenciesMet = false;

				return;
			}
		}
	}

	inStream = stream;

	var newValue = (0, _internalsIsFunction2.default)(stream.fn) ? stream.fn(stream, stream.__updatedDependencies, stream.__dependencies) : undefined;

	if (newValue !== undefined) {
		stream.push(newValue);
	}

	inStream = null;

	stream.__updatedDependencies = [];
}

function detachStreamDependencies(stream) {
	for (var i = 0; i < stream.__dependencies.length; i++) {
		stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.indexOf(stream)] = stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.length - 1];
		stream.__dependencies[i].__listeners.pop();
	}

	stream.__dependencies = [];
}