'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _polyfillsImmediate = require('../polyfills/immediate');

var _polyfillsImmediate2 = _interopRequireDefault(_polyfillsImmediate);

var _internalsIsString = require('../internals/isString');

var _internalsIsString2 = _interopRequireDefault(_internalsIsString);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsObject = require('../internals/isObject');

var _internalsIsObject2 = _interopRequireDefault(_internalsIsObject);

var _internalsIsMatching = require('../internals/isMatching');

var _internalsIsMatching2 = _interopRequireDefault(_internalsIsMatching);

// Regular expressions used to split event name strings
var REGEX_TOPIC = /\s+/; // one or more space
var REGEX_CATEGORY = /\.|\//; // dot , or forward slash

var store = {};

var Observable = (function () {
	function Observable() {
		_classCallCheck(this, Observable);

		return this;
	}

	_createClass(Observable, [{
		key: 'observe',
		value: function observe() {
			var observable = this;
			var object = arguments[0];
			var events = arguments[1];
			var callback = arguments[2];
			var context = arguments[3];

			if ((0, _internalsIsString2.default)(object)) {
				// observed object is missing, `this` is used
				object = this;
				context = callback;
				callback = events;
				events = object;
				object = this;
			} else if ((0, _internalsIsFunction2.default)(object)) {
				// observed object is missing, `this` is used, and events string is missing, `'all'`' is used
				context = events;
				callback = object;
				events = 'all';
				object = this;
			} else if (!(0, _internalsIsObject2.default)(object)) {
				throw new Error(object + ' must be an object.');
			}

			// events string is missing, we will use 'all', and juggle the remaining arguments
			if ((0, _internalsIsFunction2.default)(events)) {
				context = callback;
				callback = events;
				events = 'all';
			}

			if (!(0, _internalsIsFunction2.default)(callback)) {
				throw new Error(callback + ' must be a function.');
			}

			if (typeof context !== 'undefined' && !(0, _internalsIsObject2.default)(context)) {
				throw new Error(context + ' must be an object.');
			}

			events = (0, _internalsIsString2.default)(events) ? events.trim().split(REGEX_TOPIC) : ['all'];

			for (var i = 0; i < events.length; i++) {
				if (!store[events[i]]) {
					store[events[i]] = {
						name: events[i],
						categories: events[i].split(REGEX_CATEGORY),
						observables: []
					};
				}

				store[events[i]].observables.push({
					observable: observable,
					observed: object,
					callback: callback,
					context: context || null
				});
			}

			return observable;
		}
	}, {
		key: 'unobserve',
		value: function unobserve() {
			var observable = this;
			var object = arguments[0];
			var events = arguments[1];
			var callback = arguments[2];
			var context = arguments[3];

			// events string is missing, we will use 'all', and juggle the remaining arguments
			if ((0, _internalsIsFunction2.default)(events)) {
				context = callback;
				callback = events;
				events = 'all';
			}

			events = (0, _internalsIsString2.default)(events) ? events.trim().split(REGEX_TOPIC) : ['all'];

			for (var i = 0; i < events.length; i++) {
				for (var key in store) {
					if (store.hasOwnProperty(key) && (store[key] === events[i] || events[i] === 'all')) {
						for (var j = 0; j < store[key].observables.length; j++) {
							// we can remove only this observable
							if (store[key].observables[j].observable === observable) {
								if ((!object || store[key].observables[j].observed === object) && (!callback || store[key].observables[j].callback === callback) && (!context || store[key].observables[j].context === context)) {
									// remove observable from the store
									store[key].observables.splice(j, 1);
								}
							}
						}
					}
				}
			}

			return observable;
		}
	}, {
		key: 'trigger',
		value: function trigger() {
			var observable = this;
			var events = (0, _internalsIsString2.default)(arguments[0]) ? arguments[0].trim().split(REGEX_TOPIC) : ['all'];
			var data = [];
			var useAsync = arguments.length > 1 && (0, _internalsIsObject2.default)(arguments[arguments.length - 1]) && arguments[arguments.length - 1].async === true ? true : false;
			var noEventArgument = arguments.length > 1 && (0, _internalsIsObject2.default)(arguments[arguments.length - 1]) && arguments[arguments.length - 1].noEventArgument === true ? true : false;
			var categories;

			for (var i = 1; i < (useAsync || noEventArgument ? arguments.length - 1 : arguments.length); i++) {
				data.push(arguments[i]);
			}

			function trigger() {
				for (var i = 0; i < events.length; i++) {
					categories = events[i].split(REGEX_CATEGORY);

					for (var j in store) {
						if (store.hasOwnProperty(j) && ((0, _internalsIsMatching2.default)(store[j].categories, categories) || store[j].name === 'all' || events[i] === 'all')) {
							for (var k = 0; k < store[j].observables.length; k++) {
								if (observable == store[j].observables[k].observed) {
									if (!noEventArgument) {
										data = [{ type: events[i] }].concat(data);
									}

									store[j].observables[k].callback.apply(store[j].observables[k].context || store[j].observables[k].observable, data);
								}
							}
						}
					}
				}
			}

			if (useAsync) {
				(0, _polyfillsImmediate2.default)(trigger);
			} else {
				trigger();
			}

			return observable;
		}
	}]);

	return Observable;
})();

exports.default = Observable;
module.exports = exports.default;
/*object, events, callback, context*/ /*object, events, callback, context*/ /*events, data, options.useAsync|options.noEventArgument*/