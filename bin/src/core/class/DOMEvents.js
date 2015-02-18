"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internal/constants"));

var parseAshNodeIndex = _interopRequire(require("../DOM/parseAshNodeIndex"));

var forOwn = _interopRequire(require("../internal/forOwn"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var isMatching = _interopRequire(require("../internal/isMatching"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var domEvents;

// list of topics
var topics = global.domEvents = {};

var DOMEvents = (function () {
	function DOMEvents() {
		_classCallCheck(this, DOMEvents);

		if (domEvents) {
			return domEvents;
		}

		if (!(this instanceof DOMEvents)) {
			return new DOMEvents();
		}

		domEvents = this;

		return domEvents;
	}

	_prototypeProperties(DOMEvents, null, {
		addEvent: {
			value: function addEvent(node, eventName, callback, inserted) {
				var i;

				if (!topics[eventName]) {
					topics[eventName] = [];

					//$(document).on(eventName, this.callback.bind(this, eventName));
					document.addEventListener(eventName, this.callback.bind(this, eventName), true);
				}

				for (i = 0; i < topics[eventName].length; i++) {
					if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
						topics[eventName][i].callback = callback;
						topics[eventName][i].inserted = inserted;

						return this;
					}
				}

				topics[eventName].push({
					index: node[INDEX_ATTRIBUTE_NAME],
					stage: node[STAGE_ATTRIBUTE_NAME],
					callback: callback,
					inserted: inserted,
					reindexed: false
				});

				return this;
			},
			writable: true,
			configurable: true
		},
		addEvents: {
			value: function addEvents(node, events, inserted) {
				forOwn(events, function (callback, eventName) {
					if (isFunction(callback)) {
						this.addEvent(node, eventName, callback, inserted);
					}
				}, this);

				return this;
			},
			writable: true,
			configurable: true
		},
		removeEvent: {
			value: function removeEvent(node, eventName) {
				var i;

				if (eventName && topics[eventName]) {
					for (i = 0; i < topics[eventName].length; i++) {
						if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
							topics[eventName].splice(i, 1);

							return this;
						}
					}
				} else if (!eventName) {
					forOwn(topics, function (value, key, object) {
						var i;

						for (i = 0; i < topics[key].length; i++) {
							if (topics[key][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[key][i].index == node[INDEX_ATTRIBUTE_NAME]) {
								topics[key].splice(i, 1);

								return this;
							}
						}
					}, this);
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		removeEvents: {

			// removes all events, that has indx same or matching via _.isMatching
			// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
			// if eventName is specified, only events with that name are removed
			value: function removeEvents(index, stage) {
				//console.log('remove events!');
				forOwn(topics, function (value, key, object) {
					var i;

					/*if ((eventName && eventName == key) || !eventName)
     {*/
					for (i = 0; i < value.length; i++) {
						if (stage == value[i].stage && isMatching(index.split(LEVEL_SEPARATOR), value[i].index.split(LEVEL_SEPARATOR), true) && !value[i].inserted) {
							value.splice(i, 1);
							i--;
						}
					}
					/*}*/
				}, this);
			},
			writable: true,
			configurable: true
		},
		reindexEvents: {
			value: function reindexEvents(oldIndex, newOrder, stage) {
				forOwn(topics, function (value, key, object) {
					var i;
					var levels;

					for (i = 0; i < value.length; i++) {
						if (stage == value[i].stage && isMatching(oldIndex.split(LEVEL_SEPARATOR), value[i].index.split(LEVEL_SEPARATOR), true) && !value[i].inserted && !value[i].reindexed) {
							levels = parseAshNodeIndex(value[i].index);
							levels[parseAshNodeIndex(oldIndex).length - 1] = newOrder;
							value[i].index = levels.join(LEVEL_SEPARATOR);
							value[i].reindexed = true;
						}
					}
				}, this);
			},
			writable: true,
			configurable: true
		},
		markEvents: {
			value: function markEvents(stage) {
				//console.log('marking events...');
				forOwn(topics, function (value, key, object) {
					var i;

					for (i = 0; i < value.length; i++) {
						if (stage == value[i].stage) {
							value[i].inserted = false;
							value[i].reindexed = false;
						}
					}
				}, this);
			},
			writable: true,
			configurable: true
		},
		callback: {
			value: function callback(eventName, event) {
				var index = event.target[INDEX_ATTRIBUTE_NAME];
				var levels;
				var i;

				if (index) {
					levels = parseAshNodeIndex(index);

					while (levels.length) {
						for (i = 0; i < topics[eventName].length; i++) {
							if (topics[eventName][i].index == index && topics[eventName][i].stage == event.target[STAGE_ATTRIBUTE_NAME]) {
								topics[eventName][i].callback(event);
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

	return DOMEvents;
})();

module.exports = DOMEvents;