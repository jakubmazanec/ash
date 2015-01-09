'use strict';

var _ = require('_');
var Observable = require('./Observable');

var triggerOptions = {
	noEventArgument: true
};

class Store extends Observable {
	constructor() {
	}

	trigger(/*data*/) {
		var action = this;

		if (arguments.length == 5) {
			super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], triggerOptions);
		} else if (arguments.length == 4) {
			super('*', arguments[0], arguments[1], arguments[2], arguments[3], triggerOptions);
		} else if (arguments.length == 3) {
			super('*', arguments[0], arguments[1], arguments[2], triggerOptions);
		} else if (arguments.length == 2) {
			super('*', arguments[0], arguments[1], triggerOptions);
		} else if (arguments.length) {
			super('*', arguments[0], triggerOptions);
		} else {
			super('*', triggerOptions);
		}

		return action;
	}
}

module.exports = Store;