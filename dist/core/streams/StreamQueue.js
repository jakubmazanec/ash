'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _streamsMethods = require('./streamsMethods');

var streamsQueue;

function findDependencies(order, stream) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (var i = 0; i < stream.__listeners.length; i++) {
			findDependencies(order, stream.__listeners[i]);
		}

		order.push(stream);
	}
}

var StreamsQueue = (function () {
	function StreamsQueue() {
		_classCallCheck(this, StreamsQueue);

		this.streams = [];

		if (streamsQueue) {
			return streamsQueue;
		}
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
				var dependencies = [];

				for (var i = 0; i < this.streams[0].__listeners.length; i++) {
					if (this.streams[0].__listeners[i].end === this.streams[0]) {
						var _context;

						// this.streams[0].__listeners[i].endStream();
						(_context = this.streams[0].__listeners[i], _streamsMethods.detachStreamDependencies).call(_context);
						(_context = this.streams[0].__listeners[i].end, _streamsMethods.detachStreamDependencies).call(_context);
					} else {
						this.streams[0].__listeners[i].__updatedDependencies.push(this.streams[0]);

						findDependencies(dependencies, this.streams[0].__listeners[i]);
					}
				}

				for (var i = dependencies.length - 1; i >= 0; --i) {
					if (dependencies[i].__updatedDependencies.length > 0) {
						var _context2;

						(_context2 = dependencies[i], _streamsMethods.updateStream).call(_context2);
					}

					dependencies[i].__queued = false;
				}

				this.streams.shift();
			}
		}
	}]);

	return StreamsQueue;
})();

exports.default = StreamsQueue;
module.exports = exports.default;