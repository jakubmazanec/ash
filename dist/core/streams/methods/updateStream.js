'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = updateStream;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsFunction = require('../../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _inStream = require('../inStream');

var _streamsQueue = require('../streamsQueue');

var streamsQueue = (0, _streamsQueue.getStreamsQueue)();

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

	var inStream = (0, _inStream.getInStream)();

	if (inStream) {
		streamsQueue.push(stream);

		return;
	}

	inStream = (0, _inStream.setInStream)(stream);

	var newValue = (0, _internalsIsFunction2.default)(stream.fn) ? stream.fn(stream, stream.__updatedDependencies, stream.__dependencies) : undefined;

	if (newValue !== undefined) {
		stream.push(newValue);
	}

	inStream = (0, _inStream.setInStream)(null);

	while (stream.__updatedDependencies.length) {
		stream.__updatedDependencies.shift();
	}
}

module.exports = exports.default;