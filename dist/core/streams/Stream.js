'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _StreamTransformer = require('./StreamTransformer');

var _StreamTransformer2 = _interopRequireDefault(_StreamTransformer);

var _streamsQueue = require('./streamsQueue');

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _inStream = require('./inStream');

var _methodsDetachStreamDependencies = require('./methods/detachStreamDependencies');

var _methodsDetachStreamDependencies2 = _interopRequireDefault(_methodsDetachStreamDependencies);

var _methodsUpdateStream = require('./methods/updateStream');

var _methodsUpdateStream2 = _interopRequireDefault(_methodsUpdateStream);

var _methodsUpdateStreamDependencies = require('./methods/updateStreamDependencies');

var _methodsUpdateStreamDependencies2 = _interopRequireDefault(_methodsUpdateStreamDependencies);

var _methodsUpdateStreamsQueue = require('./methods/updateStreamsQueue');

var _methodsUpdateStreamsQueue2 = _interopRequireDefault(_methodsUpdateStreamsQueue);

var streamsQueue = (0, _streamsQueue.getStreamsQueue)();

function _ref() {
	return true;
}

var Stream = (function () {
	function Stream() {
		var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref2$isEndStream = _ref2.isEndStream;
		var isEndStream = _ref2$isEndStream === undefined ? false : _ref2$isEndStream;
		var value = _ref2.value;
		var transformFn = _ref2.transformFn;

		_classCallCheck(this, Stream);

		this.value = undefined;
		this.hasValue = false;
		this.end = undefined;
		this.fn = undefined;
		this.transformFn = null;
		this.isEndStream = false;
		this.__queued = false;
		this.__listeners = [];
		this.__dependencies = [];
		this.__updatedDependencies = [];
		this.__dependenciesMet = false;

		if (value !== undefined || typeof arguments[0] === 'object' && arguments[0].hasOwnProperty('value')) {
			this.value = value;
			this.hasValue = true;
		}

		// autobind push method as update method
		this.update = this.push.bind(this);

		if (!isEndStream) {
			this.end = new Stream({ isEndStream: true });

			this.end.__listeners.push(this);
		} else {
			this.isEndStream = true;
			this.fn = _ref;
		}

		if ((0, _internalsIsFunction2.default)(transformFn)) {
			this.transformFn = transformFn;
		}
	}

	_createClass(Stream, [{
		key: 'get',
		value: function get() {
			return this.value;
		}
	}, {
		key: 'push',
		value: function push() {
			var _this = this;

			if (arguments[0] && arguments[0].then && (0, _internalsIsFunction2.default)(arguments[0].then)) {
				// handle a Promise...
				arguments[0].then(function (result) {
					_this.push(result);
				}, function (error) {
					_this.push(error);
				});

				return this;
			}

			this.value = this.transformFn ? this.transformFn.apply(this, arguments) : arguments[0];
			this.hasValue = true;

			var inStream = (0, _inStream.getInStream)();

			if (!inStream) {
				(0, _methodsUpdateStreamDependencies2.default)(this);
				(0, _methodsUpdateStreamsQueue2.default)(streamsQueue);
			} else if (inStream === this) {
				for (var i = 0; i < this.__listeners.length; i++) {
					if (this.__listeners[i].end !== this) {
						this.__listeners[i].__updatedDependencies.push(this);
					} else {
						(0, _methodsDetachStreamDependencies2.default)(this.__listeners[i]);
						(0, _methodsDetachStreamDependencies2.default)(this.__listeners[i].end);
					}
				}
			} else {
				streamsQueue.push(this);
			}

			return this;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return 'stream(' + this.value + ')';
		}
	}, {
		key: 'from',
		value: function from(arg) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (args.length || (0, _internalsIsFunction2.default)(arg) || arg instanceof Stream) {
				(0, _methodsDetachStreamDependencies2.default)(this);

				if ((0, _internalsIsFunction2.default)(arg)) {
					this.fn = arg;
				} else if (arg instanceof Stream) {
					arg.__listeners.push(this);
					this.__dependencies.push(arg);
				}

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

				if (this.__dependencies.length) {
					(0, _methodsUpdateStream2.default)(this);
					(0, _methodsUpdateStreamsQueue2.default)(streamsQueue);
				}
			} else if (Array.isArray(arg)) {
				for (var i = 0; i < arg.length; i++) {
					this.push(arg[i]);
				}
			} else if (arg && arg.then && (0, _internalsIsFunction2.default)(arg.then)) {
				this.push(arg);
			} else {
				this.push(arg);
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
			if (this.isEndStream) {
				return this;
			}

			var endStream = new Stream({ isEndStream: true });

			(0, _methodsDetachStreamDependencies2.default)(this.end);

			for (var _len2 = arguments.length, endStreams = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				endStreams[_key2] = arguments[_key2];
			}

			endStream.from.apply(endStream, [null].concat(endStreams));
			endStream.__listeners.push(this.end);
			this.end.__dependencies.push(endStream);

			return this;
		}
	}, {
		key: 'immediate',
		value: function immediate() {
			if (this.__dependenciesMet === false) {
				this.__dependenciesMet = true;

				(0, _methodsUpdateStream2.default)(this);
				(0, _methodsUpdateStreamsQueue2.default)(streamsQueue);
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
		value: function ap(stream) {
			var _this3 = this;

			return Stream.from(function (self) {
				self.push(_this3.get()(stream.get()));
			}, this, stream);
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
		key: 'merge',
		value: function merge(otherStream) {
			var _this5 = this;

			return Stream.from(function (self, changed) {
				return changed[0] ? changed[0].get() : _this5.hasValue ? _this5.get() : otherStream.get();
			}, this, otherStream).immediate().endsOn(this.end, otherStream.end);
		}
	}], [{
		key: 'isStream',
		value: function isStream(stream) {
			return stream instanceof Stream;
		}
	}, {
		key: 'from',
		value: function from(fn) {
			var _ref3;

			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			return (_ref3 = new Stream()).from.apply(_ref3, [fn].concat(args));
		}
	}, {
		key: 'map',
		value: function map(fn, stream) {
			return stream.map(fn);
		}
	}, {
		key: 'ap',
		value: function ap(stream1, stream2) {
			return stream1.ap(stream2);
		}
	}, {
		key: 'reduce',
		value: function reduce(fn, acc, stream) {
			return stream.reduce(fn, acc);
		}
	}, {
		key: 'merge',
		value: function merge(stream1, stream2) {
			return stream1.merge(stream2);
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
	}]);

	return Stream;
})();

exports.default = Stream;
module.exports = exports.default;