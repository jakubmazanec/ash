'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = attachEvents;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _DOMParseAshNodeId = require('../DOM/parseAshNodeId');

var _DOMParseAshNodeId2 = _interopRequireDefault(_DOMParseAshNodeId);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var STREAM_ID_ATTRIBUTE_NAME = _internalsConstants2.default.STREAM_ID_ATTRIBUTE_NAME;
var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function eventHandler(eventName, event) {
	var id = event.target[ID_ATTRIBUTE_NAME];
	var streamId = event.target[STREAM_ID_ATTRIBUTE_NAME];

	if (id) {
		var indices = (0, _DOMParseAshNodeId2.default)(id);

		while (indices.length) {
			for (var i = 0; i < _events2.default[eventName].length; i++) {
				if (_events2.default[eventName][i].id === id && _events2.default[eventName][i].streamId === streamId) {
					_events2.default[eventName][i].callback(event);
				}
			}

			indices.pop();

			id = indices.join(INDEX_SEPARATOR);
		}
	}
}

function attachEvents(node, events, isNewlyInserted) {
	for (var eventName in events) {
		if (events.hasOwnProperty(eventName) && (0, _internalsIsFunction2.default)(events[eventName])) {
			if (!_events2.default[eventName]) {
				_events2.default[eventName] = [];

				global.document.addEventListener(eventName, eventHandler.bind(this, eventName), true);
			}

			for (var i = 0; i < _events2.default[eventName].length; i++) {
				if (_events2.default[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && _events2.default[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
					_events2.default[eventName][i].callback = events[eventName];
					_events2.default[eventName][i].isNewlyInserted = !!isNewlyInserted;

					return;
				}
			}

			// push new event
			_events2.default[eventName].push({
				id: node[ID_ATTRIBUTE_NAME],
				streamId: node[STREAM_ID_ATTRIBUTE_NAME],
				callback: events[eventName],
				isNewlyInserted: !!isNewlyInserted,
				isReindexed: {}
			});
		}
	}
}

module.exports = exports.default;