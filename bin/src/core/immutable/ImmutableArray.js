"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var isObject = _interopRequire(require("../internal/isObject"));

var isFinite = _interopRequire(require("../internal/isFinite"));

var constants = _interopRequire(require("../internal/constants"));

var ImmutableObject = _interopRequire(require("./ImmutableObject"));

var IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

var ImmutableArray = (function (Array) {
	function ImmutableArray() {
		_classCallCheck(this, ImmutableArray);

		var array;
		var clone = true;

		console.log("ImmutableArray constructor");

		if (arguments.length >= 2 && isObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].clone === false) {
			clone = false;
		}

		if (clone && arguments.length == 1 && Array.isArray(arguments[0])) {
			array = arguments[0].slice(0);
		} else if (!clone && arguments.length == 2 && Array.isArray(arguments[0])) {
			console.log("no clone!");
			array = arguments[0];
		} else {
			array = [];
			array.push.apply(array, arguments);
		}

		// deep immutability
		for (var i = 0, _length = array.length; i < _length; i++) {
			if (array[i] && array[i][IMMUTABLE_TAG]) {} else if (Array.isArray(array[i])) {
				array[i] = new ImmutableArray(array[i]);
			} else if (isObject(array[i])) {
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

	_inherits(ImmutableArray, Array);

	_prototypeProperties(ImmutableArray, null, {
		push: {
			value: function push() {
				console.log("ImmutableArray.push", arguments[0]);
				var array = this.slice(0);

				array.push.apply(array, arguments);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		pop: {
			value: function pop() {
				console.log("ImmutableArray.pop");
				var array = this.slice(0);

				array.pop();

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		sort: {
			value: function sort(compareFunction) {
				console.log("ImmutableArray.sort");
				var array = this.slice(0);

				array.sort(compareFunction);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		splice: {
			value: function splice() {
				console.log("ImmutableArray.splice");
				var array = this.slice(0);

				array.splice.apply(array, arguments);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		shift: {
			value: function shift() {
				console.log("ImmutableArray.shift");
				var array = this.slice(0);

				array.shift();

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		unshift: {
			value: function unshift() {
				console.log("ImmutableArray.unshift", arguments[0]);
				var array = this.slice(0);

				array.unshift.apply(array, arguments);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		reverse: {
			value: function reverse() {
				console.log("ImmutableArray.reverse");
				var array = this.slice(0);

				array.reverse();

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		set: {
			value: function set(index, value) {
				console.log("ImmutableArray.set");
				if (!(isFinite(index) && index >= 0)) {
					throw new Error(index + " (\"index\") must be non-negative finite number.");
				}

				var array = this.slice(0);

				array[index] = value;

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		}
	});

	return ImmutableArray;
})(Array);

module.exports = ImmutableArray;
// no action needed