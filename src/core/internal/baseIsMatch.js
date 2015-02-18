import baseIsEqual from './baseIsEqual';

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} source The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
	var length = props.length;
	var result;
	if (object === null) {
		return !length;
	}
	var index = -1,
			noCustomizer = !customizer;

	while (++index < length) {
		if ((noCustomizer && strictCompareFlags[index]) ? values[index] !== object[props[index]] : !Object.prototype.hasOwnProperty.call(object, props[index])) {
			return false;
		}
	}
	index = -1;
	while (++index < length) {
		var key = props[index];
		if (noCustomizer && strictCompareFlags[index]) {
			result = Object.prototype.hasOwnProperty.call(object, key);
		} else {
			var objValue = object[key],
					srcValue = values[index];

			result = customizer ? customizer(objValue, srcValue, key) : undefined;
			if (typeof result == 'undefined') {
				result = baseIsEqual(srcValue, objValue, customizer, true);
			}
		}
		if (!result) {
			return false;
		}
	}
	return true;
}

export default baseIsMatch;
