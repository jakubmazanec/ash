'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _Object$getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names').default;

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties').default;

var _Object$freeze = require('babel-runtime/core-js/object/freeze').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf ash
 * @type Object
 */
var support = {};

(function () {

	/**
  * Detect if modern javascript is supported.
  *
  * @memberOf ash.support
  * @type boolean
  */
	support.modernJavascript = typeof _Object$getOwnPropertyNames && typeof Object.getPrototypeOf === 'function' && typeof _Object$defineProperties === 'function' && typeof _Object$freeze === 'function' && typeof _Object$freeze === 'function' && typeof Function.prototype.bind === 'function' && typeof Array.isArray === 'function' && { __proto__: [] } instanceof Array;

	/**
  */

	support.browser = global.history && global.history.pushState && global.requestAnimationFrame && global.getComputedStyle;

	/**
  * Detect if the DOM is supported.
  *
  * @memberOf ash.support
  * @type boolean
  */
	try {
		support.dom = global.document.createDocumentFragment().nodeType === 11 && typeof global.addEventListener === 'function';
	} catch (error) {
		support.dom = false;
	}
})(0, 0);

// add supported class to <html>
if (support.modernJavascript && support.browser && support.dom) {
	global.document.documentElement.className = global.document.documentElement.className.replace(new RegExp('(^|\\b)' + 'no-js'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	global.document.documentElement.className += ' js ash--supported';
	global.document.documentElement.className = global.document.documentElement.className.trim();
}

if (!support.modernJavascript) {
	throw new Error('Unsupported javascript engine.');
}

exports.default = support;
module.exports = exports.default;