/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
export default function isObjectLike(value) {
	return value && typeof value === 'object' || false;
}
