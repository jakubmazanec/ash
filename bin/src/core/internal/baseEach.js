"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var baseForOwn = _interopRequire(require("./baseForOwn"));

var isLength = _interopRequire(require("./isLength"));

var toObject = _interopRequire(require("./toObject"));

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
	var length = collection ? collection.length : 0;
	if (!isLength(length)) {
		return baseForOwn(collection, iteratee);
	}
	var index = -1,
	    iterable = toObject(collection);

	while (++index < length) {
		if (iteratee(iterable[index], index, iterable) === false) {
			break;
		}
	}
	return collection;
}

module.exports = baseEach;