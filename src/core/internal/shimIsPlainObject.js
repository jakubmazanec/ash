import isObjectLike from './isObjectLike';

/** `Object#toString` result references. */
const OBJECT_TAG = '[object Object]';

/**
 * A fallback implementation of `_.isPlainObject` which checks if `value`
 * is an object created by the `Object` constructor or has a `[[Prototype]]`
 * of `null`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
	var Ctor;

	// Exit early for non `Object` objects.
	if (!(isObjectLike(value) && Object.prototype.toString.call(value) == OBJECT_TAG) ||
			(!Object.prototype.hasOwnProperty.call(value, 'constructor') &&
				(Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
		return false;
	}
	// IE < 9 iterates inherited properties before own properties. If the first
	// iterated property is an object's own property then there are no inherited
	// enumerable properties.
	var result;
	// In most environments an object's own properties are iterated before
	// its inherited properties. If the last iterated property is an object's
	// own property then there are no inherited enumerable properties.
	for (let prop in value) {
		result = prop;
	}
	return typeof result == 'undefined' || Object.prototype.hasOwnProperty.call(value, result);
}

export default shimIsPlainObject;
