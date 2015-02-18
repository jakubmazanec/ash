"use strict";

function test() {
	if (global.setImmediate) {
		// we can only get here in IE10
		// which doesn't handel postMessage well
		return false;
	}
	return typeof global.MessageChannel !== "undefined";
}

function install(func) {
	var channel = new global.MessageChannel();
	channel.port1.onmessage = func;
	return function () {
		channel.port2.postMessage(0);
	};
}

var messageChannel = {
	test: test,
	install: install
};

module.exports = messageChannel;