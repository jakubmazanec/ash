"use strict";

Object.defineProperty(exports, "__esModule", {
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