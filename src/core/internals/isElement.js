import isObjectLike from './isObjectLike';



/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
export default function isElement(value) {
	return value && value.nodeType === 1 && isObjectLike(value) && Object.prototype.toString.call(value).indexOf('Element') > -1 || false;
}
