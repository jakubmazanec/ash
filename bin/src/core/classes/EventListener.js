"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internals/constants"));

var parseAshNodeIndex = _interopRequire(require("../DOM/parseAshNodeIndex"));

var isFunction = _interopRequire(require("../internals/isFunction"));

var isMatching = _interopRequire(require("../internals/isMatching"));

// constants references
var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var eventListener;

// list of topics
var topics = {};

var EventListener = (function () {
	function EventListener() {
		_classCallCheck(this, EventListener);

		if (eventListener) {
			return eventListener;
		}

		eventListener = this;

		return eventListener;
	}

	_prototypeProperties(EventListener, null, {
		addEvent: {
			value: function addEvent(node, eventName, callback, isInserted) {
				if (!topics[eventName]) {
					topics[eventName] = [];

					global.document.addEventListener(eventName, this.callback.bind(this, eventName), true);
				}

				for (var i = 0; i < topics[eventName].length; i++) {
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
			},
			writable: true,
			configurable: true
		},
		addEvents: {
			value: function addEvents(node, events, isInserted) {
				for (var prop in events) {
					if (events.hasOwnProperty(prop)) {
						if (isFunction(events[prop])) {
							this.addEvent(node, prop, events[prop], isInserted);
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		removeEvent: {
			value: function removeEvent(node, eventName) {
				if (eventName && topics[eventName]) {
					for (var i = 0; i < topics[eventName].length; i++) {
						if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
							topics[eventName].splice(i, 1);

							return this;
						}
					}
				} else if (!eventName) {
					for (var prop in topics) {
						if (topics.hasOwnProperty(prop)) {
							for (var i = 0; i < topics[prop].length; i++) {
								if (topics[prop][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[prop][i].index == node[INDEX_ATTRIBUTE_NAME]) {
									topics[prop].splice(i, 1);

									return this;
								}
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		removeEvents: {

			// removes all events, that has index same or matching via _.isMatching
			// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
			// if eventName is specified, only events with that name are removed

			value: function removeEvents(index, stage) {
				for (var prop in topics) {
					if (topics.hasOwnProperty(prop)) {
						for (var i = 0; i < topics[prop].length; i++) {
							if (stage == topics[prop][i].stage && isMatching(index.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted) {
								topics[prop].splice(i, 1);
								i--;
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		reindexEvents: {
			value: function reindexEvents(oldIndex, newOrder, stage) {
				for (var prop in topics) {
					if (topics.hasOwnProperty(prop)) {
						var levels = undefined;

						for (var i = 0; i < topics[prop].length; i++) {
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
			},
			writable: true,
			configurable: true
		},
		markEvents: {
			value: function markEvents(stage) {
				for (var prop in topics) {
					if (topics.hasOwnProperty(prop)) {
						for (var i = 0; i < topics[prop].length; i++) {
							if (stage == topics[prop][i].stage) {
								topics[prop][i].isInserted = false;
								topics[prop][i].isReindexed = false;
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		callback: {
			value: function callback(eventName, eventObject) {
				var index = eventObject.target[INDEX_ATTRIBUTE_NAME];

				if (index) {
					var levels = parseAshNodeIndex(index);

					while (levels.length) {
						for (var i = 0; i < topics[eventName].length; i++) {
							if (topics[eventName][i].index == index && topics[eventName][i].stage == eventObject.target[STAGE_ATTRIBUTE_NAME]) {
								topics[eventName][i].callback(eventObject);
							}
						}

						levels.pop();
						index = levels.join(LEVEL_SEPARATOR);
					}
				}
			},
			writable: true,
			configurable: true
		}
	});

	return EventListener;
})();

module.exports = EventListener;