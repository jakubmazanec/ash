'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = updateStreamsQueue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _updateStreamDependencies = require('./updateStreamDependencies');

var _updateStreamDependencies2 = _interopRequireDefault(_updateStreamDependencies);

function updateStreamsQueue(streamsQueue) {
	if (streamsQueue.isUpdating) {
		return;
	}

	streamsQueue.isUpdating = true;

	while (streamsQueue.length > 0) {
		(0, _updateStreamDependencies2.default)(streamsQueue.shift());
	}

	streamsQueue.isUpdating = false;
}

module.exports = exports.default;