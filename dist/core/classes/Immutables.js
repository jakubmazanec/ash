'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _get = require('babel-runtime/helpers/get').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _Object$freeze = require('babel-runtime/core-js/object/freeze').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

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
		_Object$defineProperty(array, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the array
		_Object$freeze(array);

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
			if (!((0, _internalsIsFinite2.default)(index) && index >= 0)) {
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
			if (value.hasOwnProperty(key) && !(0, _internalsIsFunction2.default)(value[key])) {
				this[key] = value[key];

				if (this[key] && this[key][IMMUTABLE_TAG]) {} else if (Array.isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (this[key] !== null && typeof this[key] === 'object') {
					this[key] = new ImmutableObject(this[key]);
				}
			}
		}

		// immutable tag
		_Object$defineProperty(this, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the object
		_Object$freeze(this);

		return this;
	}

	_createClass(ImmutableObject, [{
		key: 'set',
		value: function set(key, value) {
			var clone;

			if (!(0, _internalsIsString2.default)(key)) {
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

			if (!(0, _internalsIsString2.default)(key)) {
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
				if (source.hasOwnProperty(prop) && !(0, _internalsIsFunction2.default)(source[prop])) {
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
				if (this.hasOwnProperty(prop) && !(0, _internalsIsFunction2.default)(this[prop]) && typeof clone[prop] === 'undefined') {
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