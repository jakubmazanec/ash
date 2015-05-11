'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMParseAshNodeIndex = require('../DOM/parseAshNodeIndex');

var _DOMParseAshNodeIndex2 = _interopRequireDefault(_DOMParseAshNodeIndex);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsMatching = require('../internals/isMatching');

var _internalsIsMatching2 = _interopRequireDefault(_internalsIsMatching);

// constants references
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = _internalsConstants2.default.STAGE_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = _internalsConstants2.default.LEVEL_SEPARATOR;

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

	_createClass(EventListener, [{
		key: 'addEvent',
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
		}
	}, {
		key: 'addEvents',
		value: function addEvents(node, events, isInserted) {
			for (var prop in events) {
				if (events.hasOwnProperty(prop)) {
					if (_internalsIsFunction2.default(events[prop])) {
						this.addEvent(node, prop, events[prop], isInserted);
					}
				}
			}

			return this;
		}
	}, {
		key: 'removeEvent',
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
		}
	}, {
		key: 'removeEvents',

		// removes all events, that has index same or matching via _.isMatching
		// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
		// if eventName is specified, only events with that name are removed
		value: function removeEvents(index, stage) {
			for (var prop in topics) {
				if (topics.hasOwnProperty(prop)) {
					for (var i = 0; i < topics[prop].length; i++) {
						if (stage == topics[prop][i].stage && _internalsIsMatching2.default(index.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted) {
							topics[prop].splice(i, 1);
							i--;
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'reindexEvents',
		value: function reindexEvents(oldIndex, newOrder, stage) {
			for (var prop in topics) {
				if (topics.hasOwnProperty(prop)) {
					var levels = undefined;

					for (var i = 0; i < topics[prop].length; i++) {
						if (stage == topics[prop][i].stage && _internalsIsMatching2.default(oldIndex.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted && !topics[prop][i].isReindexed) {
							levels = _DOMParseAshNodeIndex2.default(topics[prop][i].index);
							levels[_DOMParseAshNodeIndex2.default(oldIndex).length - 1] = newOrder;
							topics[prop][i].index = levels.join(LEVEL_SEPARATOR);
							topics[prop][i].isReindexed = true;
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'markEvents',
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
		}
	}, {
		key: 'callback',
		value: function callback(eventName, eventObject) {
			var index = eventObject.target[INDEX_ATTRIBUTE_NAME];

			if (index) {
				var levels = _DOMParseAshNodeIndex2.default(index);

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
		}
	}]);

	return EventListener;
})();

exports.default = EventListener;
module.exports = exports.default;