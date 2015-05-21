'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function test() {
	return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
}

function install(handle) {
	return function () {

		// Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
		// into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
		var scriptEl = global.document.createElement('script');

		scriptEl.onreadystatechange = function () {
			handle();

			scriptEl.onreadystatechange = null;
			scriptEl.parentNode.removeChild(scriptEl);
			scriptEl = null;
		};

		global.document.documentElement.appendChild(scriptEl);

		return handle;
	};
}

var stateChange = {
	test: test,
	install: install
};

exports.default = stateChange;
module.exports = exports.default;