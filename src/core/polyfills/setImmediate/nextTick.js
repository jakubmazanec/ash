'use strict';

module.exports =
{
	test: function () {
		// Don't get fooled by e.g. browserify environments.
		return typeof process !== 'undefined' && !process.browser;
	},

	install: function (func) {
		return function () {
			process.nextTick(func);
		};
	}
};