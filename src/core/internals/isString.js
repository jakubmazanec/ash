import isObjectLike from './isObjectLike';



/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
export default function isString(value) {
  return typeof value === 'string' || isObjectLike(value) && Object.prototype.toString.call(value) === '[object String]' || false;
}
