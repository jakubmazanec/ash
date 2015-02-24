"use strict";

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf ash
 * @type Object
 */
var support = {};

(function (x) {

	/**
  * Detect if modern jabascript is supported.
  *
  * @memberOf ash.support
  * @type boolean
  */
	support.modernJavascript = typeof Object.getOwnPropertyNames && typeof Object.getPrototypeOf == "function" && typeof Object.defineProperties == "function" && typeof Object.freeze == "function" && typeof Object.freeze == "function" && typeof Function.prototype.bind == "function" && typeof Array.isArray == "function" && { __proto__: [] } instanceof Array && (global.history && global.history.pushState);

	/**
  * Detect if the DOM is supported.
  *
  * @memberOf ash.support
  * @type boolean
  */
	try {
		support.dom = global.document.createDocumentFragment().nodeType === 11 && typeof global.addEventListener === "function";
	} catch (error) {
		support.dom = false;
	}
})(0, 0);

// add supprted class to <html>
if (support.modernJavascript && support.dom) {
	global.document.documentElement.className = global.document.documentElement.className.replace(new RegExp("(^|\\b)" + "no-js".split(" ").join("|") + "(\\b|$)", "gi"), " ");
	global.document.documentElement.className += " js ash--supported";
	global.document.documentElement.className = global.document.documentElement.className.trim();
}

module.exports = support;