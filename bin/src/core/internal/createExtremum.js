"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var baseCallback = _interopRequire(require("./baseCallback"));

var charAtCallback = _interopRequire(require("./charAtCallback"));

var extremumBy = _interopRequire(require("./extremumBy"));

var isArray = _interopRequire(require("./isArray"));

var isIterateeCall = _interopRequire(require("./isIterateeCall"));

var isString = _interopRequire(require("./isString"));

var toIterable = _interopRequire(require("./toIterable"));

/**
 * Creates a function that gets the extremum value of a collection.
 *
 * @private
 * @param {Function} arrayFunc The function to get the extremum value from an array.
 * @param {boolean} [isMin] Specify returning the minimum, instead of the maximum,
 *  extremum value.
 * @returns {Function} Returns the new extremum function.
 */
function createExtremum(arrayFunc, isMin) {
	return function (collection, iteratee, thisArg) {
		if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
			iteratee = null;
		}
		var noIteratee = iteratee === null;

		iteratee = noIteratee ? iteratee : baseCallback(iteratee, thisArg, 3);
		if (noIteratee) {
			var isArr = isArray(collection);
			if (!isArr && isString(collection)) {
				iteratee = charAtCallback;
			} else {
				return arrayFunc(isArr ? collection : toIterable(collection));
			}
		}
		return extremumBy(collection, iteratee, isMin);
	};
}

module.exports = createExtremum;