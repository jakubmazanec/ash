"use strict";

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

module.exports = timeout;