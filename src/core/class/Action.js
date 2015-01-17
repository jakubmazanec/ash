'use strict';

var _ = require('_');
var Observable = require('./Observable');

var triggerOptions = {
	noEventArgument: true
};

class Action extends Observable {
	trigger(/*data*/) {
		var action = this;

		if (typeof action.onTrigger === 'function') {
			super('*', action.onTrigger.apply(action, arguments), triggerOptions);
		} else {
			if (arguments.length == 10) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], triggerOptions);
			} else if (arguments.length == 9) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], triggerOptions);
			} else if (arguments.length == 8) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], triggerOptions);
			} else if (arguments.length == 7) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], triggerOptions);
			} else if (arguments.length == 6) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], triggerOptions);
			} else if (arguments.length == 5) {
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
		}

		return action;
	}
}

module.exports = Action;