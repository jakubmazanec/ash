'use strict';

var _ = require('_');
var Construct = require('./Construct');
var Events = require('../singletons/Events');

var events = new Events();

var Action = Construct.extend(
{
	constructor: function (action)
	{
		if (_.isFunction(action))
		{
			this.action = action;
		}
	},

	/*getListeners: events.getListeners,
	hasListeners: events.hasListeners,
	listenTo: events.listenTo,
	listenToOnce: events.listenToOnce,
	off: events.off,
	on: events.on,
	once: events.once,
	stopListening: events.stopListening,
	trigger: events.triggerAsync,*/
	//trigger: events.trigger,

	trigger: function (/*payload*/)
	{
		var result;

		if (this.action)
		{
			/*result = this.spec.apply(this, arguments);

			// console.log('dispatching action...', this);
			// console.log('resulted action payload', result);

			if (_.isArray(result))
			{
				return events.trigger.apply(this, result);
			} else
			{
				return events.trigger.call(this, result);	
			}*/
			return events.trigger.call(this, this.action.apply(this, arguments));
		} else 
		{
			// console.log('dispatching action...', this);
			// console.log('action payload', arguments);

			return events.trigger.apply(this, arguments);	
		}
	}
},
{
	extendable: false
});

module.exports = Action;