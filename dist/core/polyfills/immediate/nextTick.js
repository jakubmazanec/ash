"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property").default;

_Object$defineProperty(exports, "__esModule", {
	value: true
});

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

exports.default = nextTick;
module.exports = exports.default;