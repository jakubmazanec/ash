"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property").default;

_Object$defineProperty(exports, "__esModule", {
	value: true
});

function test() {
	return true;
}

function install(t) {
	return function () {
		setTimeout(t, 0);
	};
}

var timeout = {
	test: test,
	install: install
};

exports.default = timeout;
module.exports = exports.default;