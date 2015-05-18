'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _streamMethods = require('./streamMethods');

var streamsQueue;

function findStreamDependencies(stream, dependenciesCache) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (var i = 0; i < stream.__listeners.length; i++) {
			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}

		dependenciesCache.push(stream);
	}
}

var StreamsQueue = (function () {
	function StreamsQueue() {
		_classCallCheck(this, StreamsQueue);

		this.streams = [];

		if (streamsQueue) {
			return streamsQueue;
		}

		streamsQueue = this;

		return this;
	}

	_createClass(StreamsQueue, [{
		key: 'push',
		value: function push(value) {
			this.streams.push(value);

			return this;
		}
	}, {
		key: 'update',
		value: function update() {
			while (this.streams.length > 0) {
				var dependenciesCache = [];

				for (var i = 0; i < this.streams[0].__listeners.length; i++) {
					if (this.streams[0].__listeners[i].end === this.streams[0]) {
						(0, _streamMethods.detachStreamDependencies)(this.streams[0].__listeners[i]);
						(0, _streamMethods.detachStreamDependencies)(this.streams[0].__listeners[i].end);
					} else {
						this.streams[0].__listeners[i].__updatedDependencies.push(this.streams[0]);

						findStreamDependencies(this.streams[0].__listeners[i], dependenciesCache);
					}
				}

				for (var i = dependenciesCache.length - 1; i >= 0; i--) {
					if (dependenciesCache[i].__updatedDependencies !== undefined && dependenciesCache[i].__updatedDependencies.length) {
						(0, _streamMethods.updateStream)(dependenciesCache[i]);
					}

					dependenciesCache[i].__queued = false;
				}

				this.streams.shift();
			}
		}
	}]);

	return StreamsQueue;
})();

exports.default = StreamsQueue;
module.exports = exports.default;