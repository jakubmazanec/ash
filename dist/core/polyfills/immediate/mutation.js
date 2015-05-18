'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

function test() {
	return Mutation;
}

function install(handle) {
	var called = 0;
	var observer = new Mutation(handle);
	var element = global.document.createTextNode('');

	observer.observe(element, {
		characterData: true
	});

	return function () {
		element.data = called = ++called % 2;
	};
}

var mutation = {
	test: test,
	install: install
};

exports.default = mutation;
module.exports = exports.default;