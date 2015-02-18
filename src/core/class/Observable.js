import immediate from '../polyfill/immediate';
import isString from '../internal/isString';
import isFunction from '../internal/isFunction';
import isObject from '../internal/isObject';
import isMatching from '../internal/isMatching';
import isPlainObject from '../internal/isPlainObject';

// Regular expressions used to split event name strings
const REGEX_TOPIC = /\s+/; // one or more space
const REGEX_CATEGORY = /\.|\//; // dot , or forward slash

var store = {};

class Observable {
	constructor() {
		return this;
	}

	observe(/*object, events, callback, context*/) {
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
			// observed object is missing, `this` is used, and events string is missing, `'*'`' is used
			context = events;
			callback = object;
			events = '*';
			object = this;
		} else if (!isObject(object)) {
			throw new Error(object + ' must be an object.');
		}

		// events string is missing, we will use '*', and juggle the remaining arguments
		if (isFunction(events)) {
			context = callback;
			callback = events;
			events = '*';
		}

		if (!isFunction(callback)) {
			throw new Error(callback + ' must be a function.');
		}

		if (typeof context !== 'undefined' && !isObject(context)) {
			throw new Error(context + ' must be an object.');
		}

		events = isString(events) ? events.trim().split(REGEX_TOPIC) : ['*'];

		for (let i = 0; i < events.length; i++) {
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

	unobserve(/*object, events, callback, context*/) {
		var observable = this;
		var object = arguments[0];
		var events = arguments[1];
		var callback = arguments[2];
		var context = arguments[3];

		// events string is missing, we will use '*', and juggle the remaining arguments
		if (isFunction(events)) {
			context = callback;
			callback = events;
			events = '*';
		}

		events = isString(events) ? events.trim().split(REGEX_TOPIC) : ['*'];

		for (let i = 0; i < events.length; i++) {
			for (let key in store) {
				if (store.hasOwnProperty(key) && (store[key] == events[i] || events[i] == '*')) {
					for (let j = 0; j < store[key].observables.length; j++) {
						// we can remove only this observable
						if (store[key].observables[j].observable == observable) {
							if ((!object || store[key].observables[j].observed == object) && (!callback || store[key].observables[j].callback == callback) && (!context || store[key].observables[j].context == context)) {
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

	trigger(/*events, data, options.useAsync|options.noEventArgument*/) {
		var observable = this;
		var events = isString(arguments[0]) ? arguments[0].trim().split(REGEX_TOPIC) : ['*'];
		var data = [];
		var useAsync = arguments.length > 1 && isPlainObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].async ? true : false;
		var noEventArgument = arguments.length > 1 && isPlainObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].noEventArgument ? true : false;
		var categories;

		for (let i = 1; i < (useAsync || noEventArgument ? arguments.length - 1 : arguments.length); i++) {
			data.push(arguments[i]);
		}

		function trigger() {
			for (let i = 0; i < events.length; i++) {
				categories = events[i].split(REGEX_CATEGORY);

				for (let j in store) {
					if (store.hasOwnProperty(j) && (isMatching(store[j].categories, categories) || store[j].name == '*' || events[i] == '*')) {
						for (let k = 0; k < store[j].observables.length; k++) {
							if (observable == store[j].observables[k].observed) {
								if (!noEventArgument) {
									data = [{type: events[i]}].concat(data);
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
	}
}

export default Observable;
