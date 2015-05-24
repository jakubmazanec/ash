import isLength from './isLength';
import isObjectLike from './isObjectLike';



/** `Object#toString` result references. */
const ARGS_TAG = '[object Arguments]';

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })();
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
export default function isArguments(value) {
	var length = isObjectLike(value) ? value.length : undefined;

	return isLength(length) && Object.prototype.toString.call(value) === ARGS_TAG || false;
}
