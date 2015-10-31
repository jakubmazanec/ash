'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = updateStreamDependencies;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _detachStreamDependencies = require('./detachStreamDependencies');

var _detachStreamDependencies2 = _interopRequireDefault(_detachStreamDependencies);

var _updateStream = require('./updateStream');

var _updateStream2 = _interopRequireDefault(_updateStream);

var _findStreamDependencies = require('./findStreamDependencies');

var _findStreamDependencies2 = _interopRequireDefault(_findStreamDependencies);

var _streamsQueue = require('../streamsQueue');

var streamsQueue = (0, _streamsQueue.getStreamsQueue)();

function updateStreamDependencies(stream) {
	var dependenciesCache = [];
	var isStreamsQueueUpdating = streamsQueue.isUpdating;

	streamsQueue.isUpdating = true;

	for (var i = 0; i < stream.__listeners.length; i++) {
		if (stream.__listeners[i].end === stream) {
			(0, _detachStreamDependencies2.default)(stream.__listeners[i]);
			(0, _detachStreamDependencies2.default)(stream.__listeners[i].end);
		} else {
			stream.__listeners[i].__updatedDependencies.push(stream);

			(0, _findStreamDependencies2.default)(stream.__listeners[i], dependenciesCache);
		}
	}

	for (var i = dependenciesCache.length - 1; i >= 0; i--) {
		if (dependenciesCache[i].__updatedDependencies !== undefined && dependenciesCache[i].__updatedDependencies.length) {
			(0, _updateStream2.default)(dependenciesCache[i]);
		}

		dependenciesCache[i].__queued = false;
	}

	streamsQueue.isUpdating = isStreamsQueueUpdating;

	if (!isStreamsQueueUpdating) {
		// TODO: should really be: updateStreamsQueue(streamsQueue), but circular dependencies (updateStreamDependencies)...
		streamsQueue.isUpdating = true;

		while (streamsQueue.length > 0) {
			updateStreamDependencies(streamsQueue.shift());
		}

		streamsQueue.isUpdating = false;
	}
}

module.exports = exports.default;