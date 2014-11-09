'use strict';

/** Used to detect if a method is native */
var regexNative = new RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/toString| for [^\]]+/g, '.*?') + '$');

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value)
{
	return typeof value == 'function' && regexNative.test(value);
}

module.exports = isNative;