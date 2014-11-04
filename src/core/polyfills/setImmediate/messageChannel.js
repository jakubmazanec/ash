'use strict';

module.exports =
{
	test: function () {
		if (window.setImmediate) {
			// we can only get here in IE10
			// which doesn't handel postMessage well
			return false;
		}
		return typeof window.MessageChannel !== 'undefined';
	},

	install: function (func) {
		var channel = new window.MessageChannel();
		channel.port1.onmessage = func;
		return function () {
			channel.port2.postMessage(0);
		};
	}
};