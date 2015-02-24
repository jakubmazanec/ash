import constants from '../internals/constants';
import parseAshNodeIndex from '../DOM/parseAshNodeIndex';
import isFunction from '../internals/isFunction';
import isMatching from '../internals/isMatching';

// constants references
const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;
const LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var eventListener;

// list of topics
var	topics = {};

class EventListener {
	constructor() {
		if (eventListener) {
			return eventListener;
		}

		eventListener = this;

		return eventListener;
	}

	addEvent(node, eventName, callback, isInserted) {
		if (!topics[eventName]) {
			topics[eventName] = [];

			global.document.addEventListener(eventName, this.callback.bind(this, eventName), true);
		}

		for (let i = 0; i < topics[eventName].length; i++) {
			if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
				topics[eventName][i].callback = callback;
				topics[eventName][i].isInserted = isInserted;

				return this;
			}
		}

		topics[eventName].push({
			index: node[INDEX_ATTRIBUTE_NAME],
			stage: node[STAGE_ATTRIBUTE_NAME],
			callback: callback,
			isInserted: isInserted,
			isReindexed: false
		});

		return this;
	}

	addEvents(node, events, isInserted) {
		for (let prop in events) {
			if (events.hasOwnProperty(prop)) {
				if (isFunction(events[prop])) {
					this.addEvent(node, prop, events[prop], isInserted);
				}
			}
		}

		return this;
	}

	removeEvent(node, eventName) {
		if (eventName && topics[eventName]) {
			for (let i = 0; i < topics[eventName].length; i++) {
				if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
					topics[eventName].splice(i, 1);

					return this;
				}
			}
		} else if (!eventName) {
			for (let prop in topics) {
				if (topics.hasOwnProperty(prop)) {
					for (let i = 0; i < topics[prop].length; i++) {
						if (topics[prop][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[prop][i].index == node[INDEX_ATTRIBUTE_NAME]) {
							topics[prop].splice(i, 1);

							return this;
						}
					}
				}
			}
		}

		return this;
	}

	// removes all events, that has index same or matching via _.isMatching
	// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
	// if eventName is specified, only events with that name are removed
	removeEvents(index, stage) {
		for (let prop in topics) {
			if (topics.hasOwnProperty(prop)) {
				for (let i = 0; i < topics[prop].length; i++) {
					if (stage == topics[prop][i].stage && isMatching(index.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted) {
						topics[prop].splice(i, 1);
						i--;
					}
				}
			}
		}

		return this;
	}

	reindexEvents(oldIndex, newOrder, stage) {
		for (let prop in topics) {
			if (topics.hasOwnProperty(prop)) {
				let levels;

				for (let i = 0; i < topics[prop].length; i++) {
					if (stage == topics[prop][i].stage && isMatching(oldIndex.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted && !topics[prop][i].isReindexed) {
						levels = parseAshNodeIndex(topics[prop][i].index);
						levels[parseAshNodeIndex(oldIndex).length - 1] = newOrder;
						topics[prop][i].index = levels.join(LEVEL_SEPARATOR);
						topics[prop][i].isReindexed = true;
					}
				}
			}
		}

		return this;
	}

	markEvents(stage) {
		for (let prop in topics) {
			if (topics.hasOwnProperty(prop)) {
				for (let i = 0; i < topics[prop].length; i++) {
					if (stage == topics[prop][i].stage) {
						topics[prop][i].isInserted = false;
						topics[prop][i].isReindexed = false;
					}
				}
			}
		}

		return this;
	}

	callback(eventName, eventObject) {
		var index = eventObject.target[INDEX_ATTRIBUTE_NAME];

		if (index) {
			let levels = parseAshNodeIndex(index);

			while (levels.length) {
				for (let i = 0; i < topics[eventName].length; i++) {
					if (topics[eventName][i].index == index && topics[eventName][i].stage == eventObject.target[STAGE_ATTRIBUTE_NAME]) {
						topics[eventName][i].callback(eventObject);
					}
				}

				levels.pop();
				index = levels.join(LEVEL_SEPARATOR);
			}
		}
	}
}

export default EventListener;
