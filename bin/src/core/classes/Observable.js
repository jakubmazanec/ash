"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var immediate = _interopRequire(require("../polyfills/immediate"));

var isString = _interopRequire(require("../internals/isString"));

var isFunction = _interopRequire(require("../internals/isFunction"));

var isObject = _interopRequire(require("../internals/isObject"));

var isMatching = _interopRequire(require("../internals/isMatching"));

// Regular expressions used to split event name strings
var REGEX_TOPIC = /\s+/; // one or more space
var REGEX_CATEGORY = /\.|\//; // dot , or forward slash

var store = {};

var Observable = (function () {
	function Observable() {
		_classCallCheck(this, Observable);

		return this;
	}

	_prototypeProperties(Observable, null, {
		observe: {
			value: function observe() {
				var observable = this;
				var object = arguments[0];
				var events = arguments[1];
				var callback = arguments[2];
				var context = arguments[3];

				if (isString(object)) {
					// observed object is missing, `this` is used
					object = this;
					context = callback;
					callback = events;
					events = object;
					object = this;
				} else if (isFunction(object)) {
					// observed object is missing, `this` is used, and events string is missing, `'all'`' is used
					context = events;
					callback = object;
					events = "all";
					object = this;
				} else if (!isObject(object)) {
					throw new Error(object + " must be an object.");
				}

				// events string is missing, we will use 'all', and juggle the remaining arguments
				if (isFunction(events)) {
					context = callback;
					callback = events;
					events = "all";
				}

				if (!isFunction(callback)) {
					throw new Error(callback + " must be a function.");
				}

				if (typeof context !== "undefined" && !isObject(context)) {
					throw new Error(context + " must be an object.");
				}

				events = isString(events) ? events.trim().split(REGEX_TOPIC) : ["all"];

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
			},
			writable: true,
			configurable: true
		},
		unobserve: {
			value: function unobserve() {
				var observable = this;
				var object = arguments[0];
				var events = arguments[1];
				var callback = arguments[2];
				var context = arguments[3];

				// events string is missing, we will use 'all', and juggle the remaining arguments
				if (isFunction(events)) {
					context = callback;
					callback = events;
					events = "all";
				}

				events = isString(events) ? events.trim().split(REGEX_TOPIC) : ["all"];

				for (var i = 0; i < events.length; i++) {
					for (var key in store) {
						if (store.hasOwnProperty(key) && (store[key] === events[i] || events[i] === "all")) {
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
			},
			writable: true,
			configurable: true
		},
		trigger: {
			value: function trigger() {
				var observable = this;
				var events = isString(arguments[0]) ? arguments[0].trim().split(REGEX_TOPIC) : ["all"];
				var data = [];
				var useAsync = arguments.length > 1 && isObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].async === true ? true : false;
				var noEventArgument = arguments.length > 1 && isObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].noEventArgument === true ? true : false;
				var categories;

				for (var i = 1; i < (useAsync || noEventArgument ? arguments.length - 1 : arguments.length); i++) {
					data.push(arguments[i]);
				}

				function trigger() {
					for (var i = 0; i < events.length; i++) {
						categories = events[i].split(REGEX_CATEGORY);

						for (var j in store) {
							if (store.hasOwnProperty(j) && (isMatching(store[j].categories, categories) || store[j].name === "all" || events[i] === "all")) {
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
					immediate(trigger);
				} else {
					trigger();
				}

				return observable;
			},
			writable: true,
			configurable: true
		}
	});

	return Observable;
})();

module.exports = Observable;
/*object, events, callback, context*/ /*object, events, callback, context*/ /*events, data, options.useAsync|options.noEventArgument*/