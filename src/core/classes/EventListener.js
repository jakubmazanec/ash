import constants from '../internals/constants';
import parseAshNodeId from '../DOM/parseAshNodeId';
import isFunction from '../internals/isFunction';
import isMatching from '../internals/isMatching';


const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;
const STREAM_ID_ATTRIBUTE_NAME = constants.STREAM_ID_ATTRIBUTE_NAME;
const INDEX_SEPARATOR = constants.INDEX_SEPARATOR;

let	topics = {};
let eventListener;

export default class EventListener {
	constructor() {
		if (eventListener) {
			return eventListener;
		}

		eventListener = this;

		return eventListener;
	}

	addEvent(node, eventName, callback, isNewlyInserted) {
		if (!topics[eventName]) {
			topics[eventName] = [];

			global.document.addEventListener(eventName, this.callback.bind(this, eventName), true);
		}

		for (let i = 0; i < topics[eventName].length; i++) {
			if (topics[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
				topics[eventName][i].callback = callback;
				topics[eventName][i].isNewlyInserted = isNewlyInserted;

				return this;
			}
		}

		topics[eventName].push({
			id: node[ID_ATTRIBUTE_NAME],
			streamId: node[STREAM_ID_ATTRIBUTE_NAME],
			callback,
			isNewlyInserted,
			isReindexed: {}
		});

		return this;
	}

	addEvents(node, events, isNewlyInserted) {
		for (let eventName in events) {
			if (events.hasOwnProperty(eventName)) {
				if (isFunction(events[eventName])) {
					this.addEvent(node, eventName, events[eventName], isNewlyInserted);
				}
			}
		}

		return this;
	}

	removeEvent(node, eventName) {
		if (eventName && topics[eventName]) {
			for (let i = 0; i < topics[eventName].length; i++) {
				if (topics[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
					topics[eventName].splice(i, 1);

					return this;
				}
			}
		} else if (!eventName) {
			for (let topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (let i = 0; i < topics[topicName].length; i++) {
						if (topics[topicName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[topicName][i].id === node[ID_ATTRIBUTE_NAME]) {
							topics[topicName].splice(i, 1);

							return this;
						}
					}
				}
			}
		}

		return this;
	}

	// removes all events, that has id same or matching via isMatching()
	// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
	// if eventName is specified, only events with that name are removed
	removeEvents(id, streamId) {
		var splitId = id.split(INDEX_SEPARATOR);

		for (let topicName in topics) {
			if (topics.hasOwnProperty(topicName)) {
				for (let i = 0; i < topics[topicName].length; i++) {
					if (streamId === topics[topicName][i].streamId && isMatching(splitId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted) {
						topics[topicName].splice(i, 1);

						i--;
					}
				}
			}
		}

		return this;
	}

	reindexEvents(oldId, oldIndices, newIndex, streamId) {
		var splitOldId = oldId.split(INDEX_SEPARATOR);

		for (let topicName in topics) {
			if (topics.hasOwnProperty(topicName)) {
				for (let i = 0; i < topics[topicName].length; i++) {
					if (streamId === topics[topicName][i].streamId && isMatching(splitOldId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted && !topics[topicName][i].isReindexed[oldIndices.length - 1]) {
						let indices = parseAshNodeId(topics[topicName][i].id);

						indices[oldIndices.length - 1] = newIndex;
						topics[topicName][i].id = indices.join(INDEX_SEPARATOR);
						topics[topicName][i].isReindexed[oldIndices.length - 1] = true;
					}
				}
			}
		}

		return this;
	}

	markEvents(streamId) {
		for (let topicName in topics) {
			if (topics.hasOwnProperty(topicName)) {
				for (let i = 0; i < topics[topicName].length; i++) {
					if (streamId === topics[topicName][i].streamId) {
						topics[topicName][i].isNewlyInserted = false;
						topics[topicName][i].isReindexed = {};
					}
				}
			}
		}

		return this;
	}

	callback(eventName, eventObject) {
		var id = eventObject.target[ID_ATTRIBUTE_NAME];
		var streamId = eventObject.target[STREAM_ID_ATTRIBUTE_NAME];

		if (id) {
			let indices = parseAshNodeId(id);

			while (indices.length) {
				for (let i = 0; i < topics[eventName].length; i++) {
					if (topics[eventName][i].id === id && topics[eventName][i].streamId === streamId) {
						topics[eventName][i].callback(eventObject);
					}
				}

				indices.pop();

				id = indices.join(INDEX_SEPARATOR);
			}
		}
	}
}
