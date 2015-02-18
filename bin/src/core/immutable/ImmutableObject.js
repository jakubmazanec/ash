"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var isObject = _interopRequire(require("../internal/isObject"));

var isArray = _interopRequire(require("../internal/isArray"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var isString = _interopRequire(require("../internal/isString"));

var constants = _interopRequire(require("../internal/constants"));

var isImmutable = _interopRequire(require("./isImmutable"));

var ImmutableArray = _interopRequire(require("./ImmutableArray"));

var IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

var ImmutableObject = (function () {
	function ImmutableObject(value, options) {
		_classCallCheck(this, ImmutableObject);

		/*var object;
  var clone = true;*/

		console.log("ImmutableObject constructor");

		/*if (options && options.clone === false) {
  	clone = false;
  }
  		if (clone) {
  	object = {};*/

		for (var key in value) {
			if (value.hasOwnProperty(key) && !isFunction(value[key])) {
				this[key] = value[key];
			}
		}
		/*	} else {
  		console.log('no clone!');
  		object = value;
  	}*/

		// deep immutability
		for (var key in this) {
			if (this.hasOwnProperty(key)) {
				if (isImmutable(this[key])) {} else if (isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (isObject(this[key])) {
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

		console.log("ImmutableObject constructor done");

		return this;
	}

	_prototypeProperties(ImmutableObject, null, {
		set: {
			value: function set(key, value) {
				console.log("ImmutableObject.set");

				var clone;

				if (!isString(key)) {
					throw new Error(key + " (\"key\") must be a string.");
				}

				if (typeof value === "undefined") {
					throw new Error(value + " (\"value\") must be defined.");
				}

				if (this[key] === value) {
					return this;
				}

				// create copy
				clone = {};

				for (var prop in this) {
					if (this.hasOwnProperty(prop)) {
						object[prop] = this[prop];
					}
				}

				clone[arguments[0]] = arguments[1];

				return new ImmutableObject(clone, { clone: false });
			},
			writable: true,
			configurable: true
		},
		merge: {
			value: function merge(source) {
				var isDifferent;
				var hasChanged;
				var clone;

				console.log("ImmutableObject.merge");

				if (!isObject(source)) {
					throw new Error(source + " (\"source\") must be an object.");
				}

				/*isDifferent = diff(this, value);
    		if (!isDifferent) {
    	console.log('same!');
    	return this;
    }*/

				clone = {};

				hasChanged = mergeOnto(clone, this, source);

				/*for (let prop in source) {
    	if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
    		if (isImmutable(source[prop])) {
    			if (source[prop] !== this[prop]) {
    				clone[prop] = source[prop];
    				hasChanged = true;
    			}
    		} else if (isArray(source[prop])) {
    			if (source[prop] !== this[prop]) {
    				clone[prop] = source[prop];
    				hasChanged = true;
    			}
    		} else if (isObject(source[prop])) {
    				} else {
    			if (source[prop] !== this[prop]) {
    				clone[prop] = source[prop];
    				hasChanged = true;
    			}
    		}
    	}
    }*/

				if (!hasChanged) {
					console.log("no change!");

					return this;
				}

				// clone rest of this object properties
				for (var prop in this) {
					if (this.hasOwnProperty(prop) && !isFunction(this[prop]) && typeof clone[prop] === "undefined") {
						clone[prop] = this[prop];
					}
				}

				console.log("clone = ", JSON.stringify(clone));

				return new ImmutableObject(clone, { clone: false });
			},
			writable: true,
			configurable: true
		}
	});

	return ImmutableObject;
})();

// would merging object onto target result in differences intarget?
function diff(target, source) {
	console.log("diffing...");

	for (var prop in source) {
		if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
			var isDifferent = undefined;

			if (isImmutable(source[prop])) {
				isDifferent = source[prop] !== target[prop];
			} else if (isArray(source[prop])) {
				isDifferent = source[prop] !== target[prop];
			} else if (isObject(source[prop])) {
				isDifferent = diff(target[prop], source[prop]);
			} else {
				isDifferent = source[prop] !== target[prop];
			}

			if (isDifferent) {
				return true;
			}
		}
	}

	return false;
}

function mergeOnto(target, reference, source) {
	var hasChanged = false;

	console.log("mergeOnto... ", JSON.stringify(source), " -> ", JSON.stringify(reference));

	for (var prop in source) {
		if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
			console.log("source prop", prop);

			if (isImmutable(source[prop])) {
				console.log(prop, "is immutable");
				if (source[prop] !== reference[prop]) {
					target[prop] = source[prop];
					hasChanged = true;
				}
			} else if (isArray(source[prop])) {
				console.log(prop, "is array");
				if (source[prop] !== reference[prop]) {
					target[prop] = source[prop];
					hasChanged = true;
				}
			} else if (isObject(source[prop])) {
				console.log(prop, "is object");
				if (isImmutable(reference[prop])) {
					console.log("reference is immutable");
					target[prop] = reference[prop].merge(source[prop]);
					hasChanged = true;
				} /*else if (isObject(reference[prop])) {
      target[prop] = {};
      hasChanged = mergeOnto(target[prop], reference[prop], source[prop]);
      } */else {
					target[prop] = source[prop];
					hasChanged = true;
				}
			} else {
				console.log(prop, "is else");
				if (source[prop] !== reference[prop]) {
					target[prop] = source[prop];
					hasChanged = true;
				}
			}
		}
	}

	return hasChanged;
}

module.exports = ImmutableObject;
// no action needed