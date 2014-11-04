'use strict';

var _ = require('_');
var Construct = require('./Construct');
var Events = require('../singletons/Events');

var events = new Events();

var Store = Construct.extend(
{
	constructor: function ()
	{
		this.initialize();

		/*this.actions = _.result(this, 'actions');

		var actions = _.keys(this.actions);
		var action;

		while (actions.length)
		{
			action = actions.pop();

			this.listenTo(this.actions[action], this[action]);
		}*/

		return this;
	},

	actions: {},

	getListeners: events.getListeners,
	hasListeners: events.hasListeners,
	//listenTo: events.listenTo,
	listenToOnce: events.listenToOnce,
	off: events.off,
	on: events.on,
	once: events.once,
	stopListening: events.stopListening,
	trigger: events.triggerAsync,

	listenTo: function (object, callback)
	{
		return events.listenTo.call(this, object, callback,
		{
			noEventArgument: true
		});
	},

	initialize: function ()	{},

	/**
	 * default action handler
	 */
	onAction: function ()
	{
		return true;
	}
});

module.exports = Store;