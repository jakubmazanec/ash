'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = detachEvents;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsMatching = require('../internals/isMatching');

var _internalsIsMatching2 = _interopRequireDefault(_internalsIsMatching);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

// removes all events, that has id same or matching via isMatching()
// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
// if eventName is specified, only events with that name are removed

function detachEvents(id, streamId, eventName) {
	var splitId = id.split(INDEX_SEPARATOR);

	if (eventName && _events2.default[eventName]) {
		for (var i = 0; i < _events2.default[eventName].length; i++) {
			if (streamId === _events2.default[eventName][i].streamId && id === _events2.default[eventName][i].id) {
				_events2.default[eventName].splice(i, 1);

				return;
			}
		}
	} else if (!eventName) {
		// remove all events with id and ids that are matching it (ie. for 0.1 remove 0.1, 0.1.0, 0.1.1, etc.)
		for (var topicName in _events2.default) {
			if (_events2.default.hasOwnProperty(topicName)) {
				for (var i = 0; i < _events2.default[topicName].length; i++) {
					if (_events2.default[topicName][i].streamId && (0, _internalsIsMatching2.default)(splitId, _events2.default[topicName][i].id.split(INDEX_SEPARATOR), true) && !_events2.default[topicName][i].isNewlyInserted) {
						_events2.default[topicName].splice(i, 1);

						i--;
					}
				}
			}
		}
	}
}

module.exports = exports.default;