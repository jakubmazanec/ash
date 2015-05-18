'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _StreamTransformer = require('./StreamTransformer');

var _StreamTransformer2 = _interopRequireDefault(_StreamTransformer);

var _StreamsQueue = require('./StreamsQueue');

var _StreamsQueue2 = _interopRequireDefault(_StreamsQueue);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _streamMethods = require('./streamMethods');

var streamsQueue = new _StreamsQueue2.default();

function _ref() {
	return true;
}

var Stream = (function () {
	function Stream() {
		var _ref3 = arguments[0] === undefined ? {} : arguments[0];

		var _ref3$isEndStream = _ref3.isEndStream;
		var isEndStream = _ref3$isEndStream === undefined ? false : _ref3$isEndStream;
		var value = _ref3.value;

		_classCallCheck(this, Stream);

		this.__initializeProperties();

		if (value !== undefined || typeof arguments[0] === 'object' && arguments[0].hasOwnProperty('value')) {
			this.value = value;
			this.hasValue = true;
		}

		// autobind push method
		// this.push = this.push.bind(this);

		this.isEndStream = !!isEndStream;

		if (!this.isEndStream) {
			this.end = new Stream({ isEndStream: true });
			this.end.__listeners.push(this);
		} else {
			this.fn = _ref;
		}
	}

	_createClass(Stream, [{
		key: 'toString',
		value: function toString() {
			return 'stream(' + this.value + ')';
		}
	}, {
		key: 'from',
		value: function from(fn) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (args.length) {
				if ((0, _internalsIsFunction2.default)(fn)) {
					this.fn = fn;
				}

				(0, _streamMethods.detachStreamDependencies)(this);

				for (var i = 0; i < args.length; i++) {
					if (args[i] instanceof Stream) {
						args[i].__listeners.push(this);
						this.__dependencies.push(args[i]);
					}
				}

				if (!this.isEndStream && this.__dependencies.length) {
					var endStreams = [];

					for (var i = 0; i < this.__dependencies.length; i++) {
						endStreams.push(this.__dependencies[i].end);
					}

					this.endsOn.apply(this, endStreams);
				}

				(0, _streamMethods.updateStream)(this);
				streamsQueue.update();
			}

			return this;
		}
	}, {
		key: 'subscribe',
		value: function subscribe(fn) {
			return Stream.from(fn, this);
		}
	}, {
		key: 'endsOn',
		value: function endsOn() {
			for (var _len2 = arguments.length, endStreams = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				endStreams[_key2] = arguments[_key2];
			}

			if (this.isEndStream) {
				return this;
			}

			var endStream = new Stream({ isEndStream: true });

			(0, _streamMethods.detachStreamDependencies)(this.end);
			endStream.from.apply(endStream, [null].concat(endStreams));
			endStream.__listeners.push(this.end);
			this.end.__dependencies.push(endStream);

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
			var _this = this;

			// handle a Promise...
			if (value && value.then && (0, _internalsIsFunction2.default)(value.then)) {
				value.then(function (result) {
					_this.push(result);
				});

				return this;
			}

			this.value = value;
			this.hasValue = true;

			if (!(0, _streamMethods.isInStream)(this)) {
				streamsQueue.push(this);

				if (!(0, _streamMethods.getInStream)()) {
					streamsQueue.update();
				}
			} else {
				for (var i = 0; i < this.__listeners.length; i++) {
					if (this.__listeners[i].end === this) {
						(0, _streamMethods.detachStreamDependencies)(this.__listeners[i]);
						(0, _streamMethods.detachStreamDependencies)(this.__listeners[i].end);
					} else {
						this.__listeners[i].__updatedDependencies.push(this);
					}
				}
			}

			return this;
		}
	}, {
		key: 'map',
		value: function map(fn) {
			var _this2 = this;

			return Stream.from(function (stream) {
				stream.push(fn(_this2.get()));
			}, this);
		}
	}, {
		key: 'ap',
		value: function ap(stream1) {
			var _this3 = this;

			return Stream.from(function (stream2) {
				stream2.push(_this3.get()(stream1.get()));
			}, this, stream1);
		}
	}, {
		key: 'reduce',
		value: function reduce(fn, acc) {
			var _this4 = this;

			var result = acc;
			var newStream = Stream.from(function () {
				result = fn(result, _this4.get());

				return result;
			}, this);

			if (!newStream.hasValue) {
				newStream.push(acc);
			}

			return newStream;
		}
	}, {
		key: 'immediate',
		value: function immediate() {
			if (this.__dependenciesMet === false) {
				this.__dependenciesMet = true;
				(0, _streamMethods.updateStream)(this);

				streamsQueue.update();
			}

			return this;
		}
	}, {
		key: '__initializeProperties',
		value: function __initializeProperties() {
			this.value = undefined;
			this.hasValue = false;
			this.end = undefined;
			this.fn = undefined;
			this.__queued = false;
			this.__listeners = [];
			this.__dependencies = [];
			this.__updatedDependencies = [];
			this.__dependenciesMet = false;
		}
	}], [{
		key: 'from',
		value: function from(fn) {
			var _ref2;

			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			return (_ref2 = new Stream()).from.apply(_ref2, [fn].concat(args));
		}
	}, {
		key: 'transduce',
		value: function transduce(xform, sourceStream) {
			var xformResult = xform(new _StreamTransformer2.default());

			return Stream.from(function (stream) {
				var result = xformResult['@@transducer/step'](undefined, sourceStream.get());

				if (result && result['@@transducer/reduced'] === true) {
					stream.end.push(true);

					return result['@@transducer/value'];
				}

				return result;
			}, sourceStream);
		}
	}, {
		key: 'isStream',
		value: function isStream(stream) {
			return stream instanceof Stream;
		}
	}, {
		key: 'merge',
		value: function merge(stream1, stream2) {
			return Stream.from(function (stream, changed) {
				return changed[0] ? changed[0].get() : stream1.hasValue ? stream1.get() : stream2.get();
			}, stream1, stream2).immediate().endsOn(stream1.end, stream2.end);
		}
	}]);

	return Stream;
})();

exports.default = Stream;
module.exports = exports.default;