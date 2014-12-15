'use strict!';

var _ = require('_');
var $ = require('jquery');
var constants = require('../internal/constants');
var parseAshNodeIndex = require('../DOM/parseAshNodeIndex');

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var domEvents;

// list of topics
var	topics = {};

class DOMEvents {
	constructor() {
		if (domEvents)
		{
			return domEvents;
		}

		if (!(this instanceof DOMEvents))
		{
			return new DOMEvents();
		}

		domEvents = this;

		return domEvents;
	}

	addEvent(node, eventName, callback, inserted) {
		var i;

		if (!topics[eventName])
		{
			topics[eventName] = [];

			$(document).on(eventName, this.callback.bind(this, eventName));
		}

		for (i = 0; i < topics[eventName].length; i++)
		{
			if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME])
			{
				topics[eventName][i].callback = callback;
				topics[eventName][i].inserted = inserted;

				return this;
			}
		}

		topics[eventName].push(
		{
			index: node[INDEX_ATTRIBUTE_NAME],
			stage: node[STAGE_ATTRIBUTE_NAME],
			callback: callback,
			inserted: inserted
		});

		return this;	
	}

	addEvents(node, events, inserted) {
		_.forOwn(events, function (callback, eventName) {
			if (_.isFunction(callback)) {
				this.addEvent(node, eventName, callback, inserted);
			}
		}, this);

		return this;
	}

	removeEvent(node, eventName) {
		var i;

		if (eventName && topics[eventName])
		{
			for (i = 0; i < topics[eventName].length; i++)
			{
				if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME])
				{
					topics[eventName].splice(i, 1);

					return this;
				}
			}
		} else if (!eventName)
		{
			_.forOwn(topics, function (value, key, object)
			{
				var i;

				for (i = 0; i < topics[key].length; i++)
				{
					if (topics[key][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[key][i].index == node[INDEX_ATTRIBUTE_NAME])
					{
						topics[key].splice(i, 1);

						return this;
					}
				}
			}, this);
		}

		return this;
	}

	// removes all events, that has indx same or matching via _.isMatching
	// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
	// if eventName is specified, only events with that name are removed
	removeEvents(index, stage) {
		//console.log('remove events!');
		_.forOwn(topics, function (value, key, object)
		{
			var i;

			/*if ((eventName && eventName == key) || !eventName)
			{*/
				for (i = 0; i < value.length; i++)
				{
					if (stage == value[i].stage && _.isMatching(index.split(LEVEL_SEPARATOR), value[i].index.split(LEVEL_SEPARATOR), true) && !value[i].inserted)
					{
						value.splice(i, 1);
						i--;
					}
				}
			/*}*/
		}, this);
	}

	reindexEvents(oldIndex, newOrder, stage) {
		_.forOwn(topics, function (value, key, object)
		{
			var i;
			var levels;

			for (i = 0; i < value.length; i++)
			{
				if (stage == value[i].stage && _.isMatching(oldIndex.split(LEVEL_SEPARATOR), value[i].index.split(LEVEL_SEPARATOR), true) && !value[i].inserted)
				{
					levels = parseAshNodeIndex(value[i].index);
					levels[parseAshNodeIndex(oldIndex).length - 1] = newOrder;
					value[i].index = levels.join(LEVEL_SEPARATOR);
				}
			}
		}, this);
	}

	markEvents(stage) {
		//console.log('marking events...');
		_.forOwn(topics, function (value, key, object)
		{
			var i;

			for (i = 0; i < value.length; i++)
			{

				if (stage == value[i].stage)
				{
					value[i].inserted = false;
				}
			}
		}, this);
	}

	callback(eventName, event) {
		var index = event.target[INDEX_ATTRIBUTE_NAME];
		var levels;
		var i;

		if (index)
		{
			levels = parseAshNodeIndex(index);

			while (levels.length)
			{
				for (i = 0; i < topics[eventName].length; i++)
				{
					if (topics[eventName][i].index == index && topics[eventName][i].stage == event.target[STAGE_ATTRIBUTE_NAME])
					{
						topics[eventName][i].callback(event);
					}
				}

				levels.pop();
				index = levels.join(LEVEL_SEPARATOR);
			}
		}
	}
}

module.exports = DOMEvents;