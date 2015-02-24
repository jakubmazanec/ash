import isFunction from './isFunction';

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
function isAncestor(ancestor, value) {
	if (!isFunction(ancestor) || !isFunction(value) || ancestor === Function) {
		return false;
	}

	var prototype;

	while (prototype !== value) {
		prototype = Object.getPrototypeOf(value);

		if (prototype === ancestor) {
			return true;
		} else if (prototype === Function) {
			return false;
		}
	}

	return false;
}

export default isAncestor;
