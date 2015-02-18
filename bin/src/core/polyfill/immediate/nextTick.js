"use strict";

function test() {
	// Don't get fooled by e.g. browserify environments.
	return process && !process.browser;
}

function install(func) {
	return function () {
		process.nextTick(func);
	};
}

var nextTick = {
	test: test,
	install: install
};

module.exports = nextTick;