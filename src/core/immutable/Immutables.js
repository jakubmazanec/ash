import isFinite from '../internal/isFinite';
import constants from '../internal/constants';
//import isObject from '../internal/isObject';
import isArray from '../internal/isArray';
import isFunction from '../internal/isFunction';
import isString from '../internal/isString';
import isImmutable from './isImmutable';
//import mergeOnto from './mergeOnto';

const IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

class ImmutableArray extends Array {
	constructor() {
		if (isImmutable(arguments[0])) {
			return arguments[0];
		}

		var array;
		var clone = true;

		//console.log('ImmutableArray constructor');

		if (arguments.length >= 2 && (arguments[arguments.length - 1] !== null && typeof arguments[arguments.length - 1] === 'object') && arguments[arguments.length - 1].clone === false) {
			clone = false;
		}

		if (clone && arguments.length == 1 && Array.isArray(arguments[0])) {
			array = arguments[0].slice(0);
		} else if (!clone && arguments.length == 2 && Array.isArray(arguments[0])) {
			//console.log('no clone!');
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
		//console.log('ImmutableArray.push', arguments[0]);
		var array = this.slice(0);

		array.push.apply(array, arguments);

		return new ImmutableArray(array, {clone: false});
	}

	pop() {
		//console.log('ImmutableArray.pop');
		var array = this.slice(0);

		array.pop();

		return new ImmutableArray(array, {clone: false});
	}

	sort(compareFunction) {
		//console.log('ImmutableArray.sort');
		var array = this.slice(0);

		array.sort(compareFunction);

		return new ImmutableArray(array, {clone: false});
	}

	splice() {
		//console.log('ImmutableArray.splice');
		var array = this.slice(0);

		array.splice.apply(array, arguments);

		return new ImmutableArray(array, {clone: false});
	}

	shift() {
		//console.log('ImmutableArray.shift');
		var array = this.slice(0);

		array.shift();

		return new ImmutableArray(array, {clone: false});
	}

	unshift() {
		//console.log('ImmutableArray.unshift', arguments[0]);
		var array = this.slice(0);

		array.unshift.apply(array, arguments);

		return new ImmutableArray(array, {clone: false});
	}

	reverse() {
		//console.log('ImmutableArray.reverse');
		var array = this.slice(0);

		array.reverse();

		return new ImmutableArray(array, {clone: false});
	}

	set(index, value) {
		//console.log('ImmutableArray.set');
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
		if (isImmutable(value)) {
			return value;
		}

		for (let key in value) {
			if (value.hasOwnProperty(key) && !isFunction(value[key])) {
				this[key] = value[key];

				if (this[key] && this[key][IMMUTABLE_TAG]) {
					// no action needed
				} else if (isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (this[key] !== null && typeof this[key] === 'object') {
					this[key] = new ImmutableObject(this[key]);
				}
			}
		}


		// deep immutability
		/*for (let key in this) {
			if (this.hasOwnProperty(key)) {
				if (isImmutable(this[key])) {
					// no action needed
				} else if (isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (isObject(this[key])) {
					this[key] = new ImmutableObject(this[key]);
				}
			}
		}*/

		// immutable tag
		Object.defineProperty(this, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the object
		Object.freeze(this);

		//console.log('ImmutableObject constructor done');

		return this;
	}

	set(key, value) {
		//console.log('ImmutableObject.set');

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

		clone[arguments[0]] = arguments[1];

		return new ImmutableObject(clone, {clone: false});
	}

	merge(source) {
		//var isDifferent;
		var hasChanged;
		var clone;

		//console.log('ImmutableObject.merge');

		if (!(source !== null && typeof source === 'object')) {
			throw new Error(source + ' ("source") must be an object.');
		}

		/*isDifferent = diff(this, value);

		if (!isDifferent) {
			console.log('same!');
			return this;
		}*/

		clone = {};

		//hasChanged = mergeOnto(clone, this, source);

		for (let prop in source) {
			if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
				if (source[prop] && source[prop][IMMUTABLE_TAG]) {
					if (source[prop] !== this[prop]) {
						clone[prop] = source[prop];
						hasChanged = true;
					}
				} else if (isArray(source[prop])) {
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
			//console.log('no change!');

			return this;
		}

		// clone rest of this object properties
		for (let prop in this) {
			if (this.hasOwnProperty(prop) && !isFunction(this[prop]) && typeof clone[prop] === 'undefined') {
				clone[prop] = this[prop];
			}
		}

		//console.log('clone = ', JSON.stringify(clone));

		return new ImmutableObject(clone, {clone: false});
	}
}

// would merging object onto target result in differences intarget?
/*function diff(target, source) {
	console.log('diffing...');

	for (let prop in source) {
		if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
			let isDifferent;

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
}*/



export {ImmutableArray, ImmutableObject};
