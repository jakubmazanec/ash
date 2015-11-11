'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
	} else {
		return Array.from(arr);
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var trueFn = function () {
	return true;
};
var streamsToUpdate = [];
var inStream = undefined;
var flushing = false;
var order = [];
var nextOrderIndex = -1;

function findDependencies(stream) {
	if (stream.__isQueued === false) {
		stream.__isQueued = true;

		for (var i = 0; i < stream.__listeners.length; ++i) {
			findDependencies(stream.__listeners[i]);
		}

		order[++nextOrderIndex] = stream;
	}
}

function detachDependencies(stream) {
	for (var i = 0; i < stream.__dependencies.length; ++i) {
		stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.indexOf(stream)] = stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.length - 1];
		stream.__dependencies[i].__listeners.length--;
	}

	stream.__dependencies.length = 0;
}

function flushUpdate() {
	// flush update
	flushing = true;

	while (streamsToUpdate.length) {
		var stream = streamsToUpdate.shift();

		if (stream.__values.length > 0) {
			stream.value = stream.__values.shift();
		}

		updateDependencies(stream);
	}

	flushing = false;
}

function updateStream(stream) {
	stream.__dependenciesMet = true;

	for (var i = 0; i < stream.__dependencies.length; i++) {
		if (!stream.__dependencies[i].hasValue) {
			stream.__dependenciesMet = false;

			break;
		}
	}

	if (!stream.__dependenciesMet || stream.end && stream.end.value === true) {
		return;
	}

	if (inStream) {
		streamsToUpdate.push(stream);
	} else {
		inStream = stream;

		// let returnValue = stream.fn(stream, stream.__changedDependencies, stream.__dependencies);
		var returnValue = stream.fn.apply(stream, _toConsumableArray(stream.__dependencies).concat([stream, stream.__changedDependencies]));

		if (returnValue !== undefined) {
			stream.push(returnValue);
		}

		inStream = undefined;

		if (stream.__changedDependencies !== undefined) {
			stream.__changedDependencies = [];
		}

		stream.__shouldUpdate = false;

		if (flushing === false) {
			flushUpdate();
		}
	}
}

function updateDependencies(stream) {
	for (var i = 0; i < stream.__listeners.length; ++i) {
		if (stream.__listeners[i].end === stream) {
			if (stream.__listeners[i].__dependencies) {
				detachDependencies(stream.__listeners[i]);
			}

			if (stream.__listeners[i].end) {
				detachDependencies(stream.__listeners[i].end);
			}
		} else {
			if (stream.__listeners[i].__changedDependencies != null) {
				stream.__listeners[i].__changedDependencies.push(stream);
			}

			stream.__listeners[i].__shouldUpdate = true;

			findDependencies(stream.__listeners[i]);
		}
	}

	for (; nextOrderIndex >= 0; --nextOrderIndex) {
		if (order[nextOrderIndex].__shouldUpdate === true) {
			updateStream(order[nextOrderIndex]);
		}

		order[nextOrderIndex].__isQueued = false;
	}
}

var Stream = (function () {
	function Stream(fn) {
		for (var _len = arguments.length, dependencies = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			dependencies[_key - 1] = arguments[_key];
		}

		_classCallCheck(this, Stream);

		this.hasValue = false;
		this.value = undefined;
		this.__values = [];
		this.__listeners = [];
		this.__isQueued = false;
		this.end = null;
		this.fn = null;
		this.__dependencies = [];
		this.__dependenciesMet = false;
		this.__changedDependencies = null;
		this.__shouldUpdate = false;
		this.isEndStream = false;

		this.update = this.push = this.push.bind(this);

		if (fn === trueFn) {
			this.fn = fn;
			this.isEndStream = true;
		} else {
			this.end = new Stream(trueFn);
			this.end.__listeners.push(this);

			if (arguments.length >= 2 || (0, _internalsIsFunction2.default)(fn)) {
				if (!(0, _internalsIsFunction2.default)(fn)) {
					throw new Error(fn + ' (fn) must be a function!');
				}

				this.fn = fn;

				this.from.apply(this, dependencies);
			} else if (arguments.length === 1) {
				this.push(fn);
			}
		}

		return this;
	}

	_createClass(Stream, [{
		key: 'from',
		value: function from() /*...dependencies*/{
			detachDependencies(this);
			detachDependencies(this.end);

			var dependencies = [];
			var endStreams = [];

			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] instanceof Stream) {
					dependencies.push(arguments[i]);

					if (arguments[i].end) {
						endStreams.push(arguments[i].end);
					}
				}
			}

			if (dependencies.length) {
				// add listeners to stream
				this.__dependencies = dependencies;
				this.__changedDependencies = [];

				for (var i = 0; i < dependencies.length; ++i) {
					dependencies[i].__listeners.push(this);
				}

				// add listeners to end stream
				this.end.__dependencies = endStreams;

				for (var i = 0; i < endStreams.length; ++i) {
					endStreams[i].__listeners.push(this.end);
				}

				// update stream
				updateStream(this);
			}

			return this;
		}
	}, {
		key: 'get',
		value: function get() {
			return this.value;
		}
	}, {
		key: 'push',
		value: function push(value) {
			if (value !== undefined && value !== null && (0, _internalsIsFunction2.default)(value.then)) {
				value.then(this.push).catch(this.push);

				return this;
			}

			this.value = value;
			this.hasValue = true;

			if (!inStream) {
				flushing = true;

				updateDependencies(this);

				if (streamsToUpdate.length > 0) {
					flushUpdate();
				} else {
					flushing = false;
				}
			} else if (inStream === this) {
				// mark listeners
				for (var i = 0; i < this.__listeners.length; ++i) {
					if (this.__listeners[i].end !== this) {
						if (this.__listeners[i].__changedDependencies != null) {
							this.__listeners[i].__changedDependencies.push(this);
						}
						this.__listeners[i].__shouldUpdate = true;
					} else {
						if (this.__listeners[i].__dependencies) {
							detachDependencies(this.__listeners[i]);
						}

						if (this.__listeners[i].end) {
							detachDependencies(this.__listeners[i].end);
						}
					}
				}
			} else {
				this.__values.push(value);
				streamsToUpdate.push(this);
			}

			return this;
		}
	}, {
		key: 'endsOn',
		value: function endsOn(endStream) {
			detachDependencies(this.end);
			endStream.__listeners.push(this.end);
			this.end.__dependencies.push(endStream);

			return this;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return 'stream(' + this.value + ')';
		}
	}, {
		key: 'map',
		value: function map(fn) {
			return Stream.map(fn, this);
		}
	}, {
		key: 'on',
		value: function on(fn) {
			return Stream.on(fn, this);
		}
	}, {
		key: 'subscribe',
		value: function subscribe(fn) {
			return Stream.subscribe(fn, this);
		}
	}, {
		key: 'ap',
		value: function ap(stream) {
			return new Stream(function (dependency1, dependency2) {
				return dependency1.get()(dependency2.get());
			}, this, stream);
		}
	}], [{
		key: 'isStream',
		value: function isStream(stream) {
			return stream instanceof Stream;
		}
	}, {
		key: 'map',
		value: function map(fn, stream) {
			return new Stream(function (dependency, self) {
				self.push(fn(dependency.value));
			}, stream);
		}
	}, {
		key: 'on',
		value: function on(fn, stream) {
			return new Stream(function (dependency) {
				fn(dependency.value);
			}, stream);
		}
	}, {
		key: 'subscribe',
		value: function subscribe(fn, stream) {
			var omitFirstRun = stream.hasValue;
			var hasRun = false;

			return new Stream(function (dependency) {
				if (hasRun || !omitFirstRun && !hasRun) {
					fn(dependency.value);
				}

				hasRun = true;
			}, stream);
		}
	}]);

	return Stream;
})();

exports.default = Stream;
module.exports = exports.default;