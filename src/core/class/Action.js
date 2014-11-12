'use strict';

var _ = require('_');
var Observable = require('./Observable');

class Action extends Observable {
	trigger(/*data*/) {
		var action = this;

		if (typeof action.onTrigger === 'function') {
			super('*', action.onTrigger.apply(action, arguments), {noEventArgument: true});
		} else {
			if (arguments.length == 5) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], {noEventArgument: true});
			} else if (arguments.length == 4) {
				super('*', arguments[0], arguments[1], arguments[2], arguments[3], {noEventArgument: true});
			} else if (arguments.length == 3) {
				super('*', arguments[0], arguments[1], arguments[2], {noEventArgument: true});
			} else if (arguments.length == 2) {
				super('*', arguments[0], arguments[1], {noEventArgument: true});
			} else if (arguments.length) {
				super('*', arguments[0], {noEventArgument: true});
			} else {
				super('*', {noEventArgument: true});
			}
		}

		return action;
	}
}

/*var Action = Construct.extend(
{
	constructor: function (action)
	{
		if (_.isFunction(action))
		{
			this.action = action;
		}
	},

	trigger: function ()
	{
		var result;

		if (this.action)
		{
			return events.trigger.call(this, this.action.apply(this, arguments));
		} else 
		{
			return events.trigger.apply(this, arguments);	
		}
	}
},
{
	extendable: false
});*/

module.exports = Action;