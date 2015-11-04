'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMParseAshNodeId = require('../DOM/parseAshNodeId');

var _DOMParseAshNodeId2 = _interopRequireDefault(_DOMParseAshNodeId);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsMatching = require('../internals/isMatching');

var _internalsIsMatching2 = _interopRequireDefault(_internalsIsMatching);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var STREAM_ID_ATTRIBUTE_NAME = _internalsConstants2.default.STREAM_ID_ATTRIBUTE_NAME;
var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

var topics = {};
var eventListener = undefined;

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
		value: function addEvent(node, eventName, callback, isNewlyInserted) {
			if (!topics[eventName]) {
				topics[eventName] = [];

				global.document.addEventListener(eventName, this.callback.bind(this, eventName), true);
			}

			for (var i = 0; i < topics[eventName].length; i++) {
				if (topics[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
					topics[eventName][i].callback = callback;
					topics[eventName][i].isNewlyInserted = isNewlyInserted;

					return this;
				}
			}

			topics[eventName].push({
				id: node[ID_ATTRIBUTE_NAME],
				streamId: node[STREAM_ID_ATTRIBUTE_NAME],
				callback: callback,
				isNewlyInserted: isNewlyInserted,
				isReindexed: {}
			});

			return this;
		}
	}, {
		key: 'addEvents',
		value: function addEvents(node, events, isNewlyInserted) {
			for (var eventName in events) {
				if (events.hasOwnProperty(eventName)) {
					if ((0, _internalsIsFunction2.default)(events[eventName])) {
						this.addEvent(node, eventName, events[eventName], isNewlyInserted);
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
					if (topics[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
						topics[eventName].splice(i, 1);

						return this;
					}
				}
			} else if (!eventName) {
				for (var topicName in topics) {
					if (topics.hasOwnProperty(topicName)) {
						for (var i = 0; i < topics[topicName].length; i++) {
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
	}, {
		key: 'removeEvents',
		value: function removeEvents(id, streamId) {
			var splitId = id.split(INDEX_SEPARATOR);

			for (var topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (var i = 0; i < topics[topicName].length; i++) {
						if (streamId === topics[topicName][i].streamId && (0, _internalsIsMatching2.default)(splitId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted) {
							topics[topicName].splice(i, 1);

							i--;
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'reindexEvents',
		value: function reindexEvents(oldId, oldIndices, newIndex, streamId) {
			var splitOldId = oldId.split(INDEX_SEPARATOR);

			for (var topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (var i = 0; i < topics[topicName].length; i++) {
						if (streamId === topics[topicName][i].streamId && (0, _internalsIsMatching2.default)(splitOldId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted && !topics[topicName][i].isReindexed[oldIndices.length - 1]) {
							var indices = (0, _DOMParseAshNodeId2.default)(topics[topicName][i].id);

							indices[oldIndices.length - 1] = newIndex;
							topics[topicName][i].id = indices.join(INDEX_SEPARATOR);
							topics[topicName][i].isReindexed[oldIndices.length - 1] = true;
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'markEvents',
		value: function markEvents(streamId) {
			for (var topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (var i = 0; i < topics[topicName].length; i++) {
						if (streamId === topics[topicName][i].streamId) {
							topics[topicName][i].isNewlyInserted = false;
							topics[topicName][i].isReindexed = {};
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'callback',
		value: function callback(eventName, eventObject) {
			var id = eventObject.target[ID_ATTRIBUTE_NAME];
			var streamId = eventObject.target[STREAM_ID_ATTRIBUTE_NAME];

			if (id) {
				var indices = (0, _DOMParseAshNodeId2.default)(id);

				while (indices.length) {
					for (var i = 0; i < topics[eventName].length; i++) {
						if (topics[eventName][i].id === id && topics[eventName][i].streamId === streamId) {
							topics[eventName][i].callback(eventObject);
						}
					}

					indices.pop();

					id = indices.join(INDEX_SEPARATOR);
				}
			}
		}
	}]);

	return EventListener;
})();

exports.default = EventListener;
module.exports = exports.default;