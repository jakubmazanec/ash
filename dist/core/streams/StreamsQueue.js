'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _streamMethods = require('./streamMethods');

var streamsQueue;

/*function findStreamDependencies(stream, dependenciesCache) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (let i = 0; i < stream.__listeners.length; i++) {
			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}

		dependenciesCache.push(stream);
	}
}*/

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
		key: 'length',
		get: function () {
			return this.streams.length;
		}
	}, {
		key: 'update',
		value: function update() {
			while (this.streams.length > 0) {
				(0, _streamMethods.updateStreamDependencies)(this.streams.shift());
				/*let dependenciesCache = [];
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
    		this.streams.shift();*/
			}
		}
	}]);

	return StreamsQueue;
})();

exports.default = StreamsQueue;
module.exports = exports.default;
/*updateStream, detachStreamDependencies*/