'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _internalsIsFinite = require('../internals/isFinite');

var _internalsIsFinite2 = _interopRequireDefault(_internalsIsFinite);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsString = require('../internals/isString');

var _internalsIsString2 = _interopRequireDefault(_internalsIsString);

var IMMUTABLE_TAG = _internalsConstants2.default.IMMUTABLE_TAG;

var ImmutableArray = (function (_Array) {
	function ImmutableArray() {
		_classCallCheck(this, ImmutableArray);

		_get(Object.getPrototypeOf(ImmutableArray.prototype), 'constructor', this).call(this);

		if (arguments[0] && arguments[0][IMMUTABLE_TAG]) {
			return arguments[0];
		}

		var array;
		var clone = true;

		if (arguments.length >= 2 && (arguments[arguments.length - 1] !== null && typeof arguments[arguments.length - 1] === 'object') && arguments[arguments.length - 1].clone === false) {
			clone = false;
		}

		if (clone && arguments.length === 1 && Array.isArray(arguments[0])) {
			array = arguments[0].slice(0);
		} else if (!clone && arguments.length === 2 && Array.isArray(arguments[0])) {
			array = arguments[0];
		} else {
			array = [];
			array.push.apply(array, arguments);
		}

		// deep immutability
		for (var i = 0, _length = array.length; i < _length; i++) {
			if (array[i] && array[i][IMMUTABLE_TAG]) {} else if (Array.isArray(array[i])) {
				array[i] = new ImmutableArray(array[i]);
			} else if (array[i] !== null && typeof array[i] === 'object') {
				array[i] = new ImmutableObject(array[i]);
			}
		}

		// inject prototype
		array.__proto__ = ImmutableArray.prototype;

		// immutable tag
		Object.defineProperty(array, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the array
		Object.freeze(array);

		return array;
	}

	_inherits(ImmutableArray, _Array);

	_createClass(ImmutableArray, [{
		key: 'push',
		value: function push() {
			var array = this.slice(0);

			array.push.apply(array, arguments);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'pop',
		value: function pop() {
			var array = this.slice(0);

			array.pop();

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'sort',
		value: function sort(compareFunction) {
			var array = this.slice(0);

			array.sort(compareFunction);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'splice',
		value: function splice() {
			var array = this.slice(0);

			array.splice.apply(array, arguments);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'shift',
		value: function shift() {
			var array = this.slice(0);

			array.shift();

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'unshift',
		value: function unshift() {
			var array = this.slice(0);

			array.unshift.apply(array, arguments);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			var array = this.slice(0);

			array.reverse();

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'set',
		value: function set(index, value) {
			if (!(_internalsIsFinite2.default(index) && index >= 0)) {
				throw new Error(index + ' ("index") must be non-negative finite number.');
			}

			var array = this.slice(0);

			array[index] = value;

			return new ImmutableArray(array, { clone: false });
		}
	}]);

	return ImmutableArray;
})(Array);

var ImmutableObject = (function () {
	function ImmutableObject(value, options) {
		_classCallCheck(this, ImmutableObject);

		if (value && value[IMMUTABLE_TAG]) {
			return value;
		}

		for (var key in value) {
			if (value.hasOwnProperty(key) && !_internalsIsFunction2.default(value[key])) {
				this[key] = value[key];

				if (this[key] && this[key][IMMUTABLE_TAG]) {} else if (Array.isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (this[key] !== null && typeof this[key] === 'object') {
					this[key] = new ImmutableObject(this[key]);
				}
			}
		}

		// immutable tag
		Object.defineProperty(this, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the object
		Object.freeze(this);

		return this;
	}

	_createClass(ImmutableObject, [{
		key: 'set',
		value: function set(key, value) {
			var clone;

			if (!_internalsIsString2.default(key)) {
				throw new Error(key + ' ("key") must be a string.');
			}

			if (typeof value === 'undefined') {
				throw new Error(value + ' ("value") must be defined.');
			}

			if (this[key] === value) {
				return this;
			}

			// create copy
			clone = {};

			for (var prop in this) {
				if (this.hasOwnProperty(prop)) {
					clone[prop] = this[prop];
				}
			}

			clone[key] = value;

			return new ImmutableObject(clone);
		}
	}, {
		key: 'remove',
		value: function remove(key) {
			var clone;

			if (!_internalsIsString2.default(key)) {
				throw new Error(key + ' ("key") must be a string.');
			}

			if (typeof this[key] === 'undefined') {
				return this;
			}

			// create copy
			clone = {};

			for (var prop in this) {
				if (this.hasOwnProperty(prop) && key !== prop) {
					clone[prop] = this[prop];
				}
			}

			return new ImmutableObject(clone);
		}
	}, {
		key: 'merge',
		value: function merge(source) {
			var hasChanged;
			var clone;

			if (!(source !== null && typeof source === 'object')) {
				throw new Error(source + ' ("source") must be an object.');
			}

			clone = {};

			for (var prop in source) {
				if (source.hasOwnProperty(prop) && !_internalsIsFunction2.default(source[prop])) {
					if (source[prop] && source[prop][IMMUTABLE_TAG]) {
						if (source[prop] !== this[prop]) {
							clone[prop] = source[prop];
							hasChanged = true;
						}
					} else if (Array.isArray(source[prop])) {
						if (source[prop] !== this[prop]) {
							clone[prop] = source[prop];
							hasChanged = true;
						}
					} else if (source[prop] !== null && typeof source[prop] === 'object') {
						if (this[prop] && this[prop][IMMUTABLE_TAG]) {
							clone[prop] = this[prop].merge(source[prop]);
							hasChanged = true;
						} else {
							clone[prop] = source[prop];
							hasChanged = true;
						}
					} else {
						if (source[prop] !== this[prop]) {
							clone[prop] = source[prop];
							hasChanged = true;
						}
					}
				}
			}

			if (!hasChanged) {
				return this;
			}

			// clone rest of this object properties
			for (var prop in this) {
				if (this.hasOwnProperty(prop) && !_internalsIsFunction2.default(this[prop]) && typeof clone[prop] === 'undefined') {
					clone[prop] = this[prop];
				}
			}

			return new ImmutableObject(clone);
		}
	}]);

	return ImmutableObject;
})();

exports.ImmutableArray = ImmutableArray;
exports.ImmutableObject = ImmutableObject;

// no action needed

// no action needed