import isFinite from '../internals/isFinite';
import constants from '../internals/constants';
import isFunction from '../internals/isFunction';
import isString from '../internals/isString';

const IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

class ImmutableArray extends Array {
	constructor() {
		super();
		
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
		for (let i = 0, length = array.length; i < length; i++) {
			if (array[i] && array[i][IMMUTABLE_TAG]) {
				// no action needed
			} else if (Array.isArray(array[i])) {
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

	push() {
		var array = this.slice(0);

		array.push.apply(array, arguments);

		return new ImmutableArray(array, {clone: false});
	}

	pop() {
		var array = this.slice(0);

		array.pop();

		return new ImmutableArray(array, {clone: false});
	}

	sort(compareFunction) {
		var array = this.slice(0);

		array.sort(compareFunction);

		return new ImmutableArray(array, {clone: false});
	}

	splice() {
		var array = this.slice(0);

		array.splice.apply(array, arguments);

		return new ImmutableArray(array, {clone: false});
	}

	shift() {
		var array = this.slice(0);

		array.shift();

		return new ImmutableArray(array, {clone: false});
	}

	unshift() {
		var array = this.slice(0);

		array.unshift.apply(array, arguments);

		return new ImmutableArray(array, {clone: false});
	}

	reverse() {
		var array = this.slice(0);

		array.reverse();

		return new ImmutableArray(array, {clone: false});
	}

	set(index, value) {
		if (!(isFinite(index) && index >= 0)) {
			throw new Error(index + ' ("index") must be non-negative finite number.');
		}

		var array = this.slice(0);

		array[index] = value;

		return new ImmutableArray(array, {clone: false});
	}
}

class ImmutableObject {
	constructor(value, options) {
		if (value && value[IMMUTABLE_TAG]) {
			return value;
		}

		for (let key in value) {
			if (value.hasOwnProperty(key) && !isFunction(value[key])) {
				this[key] = value[key];

				if (this[key] && this[key][IMMUTABLE_TAG]) {
					// no action needed
				} else if (Array.isArray(this[key])) {
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

	set(key, value) {
		var clone;

		if (!isString(key)) {
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

		for (let prop in this) {
			if (this.hasOwnProperty(prop)) {
				clone[prop] = this[prop];
			}
		}

		clone[key] = value;

		return new ImmutableObject(clone);
	}

	remove(key) {
		var clone;

		if (!isString(key)) {
			throw new Error(key + ' ("key") must be a string.');
		}

		if (typeof this[key] === 'undefined') {
			return this;
		}

		// create copy
		clone = {};

		for (let prop in this) {
			if (this.hasOwnProperty(prop) && key !== prop) {
				clone[prop] = this[prop];
			}
		}

		return new ImmutableObject(clone);
	}

	merge(source) {
		var hasChanged;
		var clone;

		if (!(source !== null && typeof source === 'object')) {
			throw new Error(source + ' ("source") must be an object.');
		}

		clone = {};

		for (let prop in source) {
			if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
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
		for (let prop in this) {
			if (this.hasOwnProperty(prop) && !isFunction(this[prop]) && typeof clone[prop] === 'undefined') {
				clone[prop] = this[prop];
			}
		}

		return new ImmutableObject(clone);
	}
}

export {ImmutableArray, ImmutableObject};
