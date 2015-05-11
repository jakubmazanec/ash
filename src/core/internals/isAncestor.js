import isFunction from './isFunction';

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
function isAncestor(ancestor, value) {
	if (!isFunction(ancestor) || !isFunction(value) || ancestor === Function || value === Function) {
		return false;
	}

	if (ancestor === value) {
		return true;
	}

	if (ancestor === Function && value !== Object) {
		return true;
	} if (ancestor === Function && value === Object) {
		return false;
	}

	if (ancestor === Object && value === Function) {
		return true;
	} else if (ancestor === Object) {
		return true;
	}

	var prototype, lastPrototype;

	while (prototype !== ancestor) {
		lastPrototype = prototype;
		prototype = Object.getPrototypeOf(value);

		if (lastPrototype === prototype) {
			return false;
		}

		if (prototype === ancestor) {
			return true;
		} else if (prototype === Function || prototype === Object) {
			return false;
		}
	}

	return false;
}

export default isAncestor;
