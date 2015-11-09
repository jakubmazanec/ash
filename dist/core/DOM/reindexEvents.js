'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = reindexEvents;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMParseAshNodeId = require('../DOM/parseAshNodeId');

var _DOMParseAshNodeId2 = _interopRequireDefault(_DOMParseAshNodeId);

var _internalsIsMatching = require('../internals/isMatching');

var _internalsIsMatching2 = _interopRequireDefault(_internalsIsMatching);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function reindexEvents(oldId, oldIndices, newIndex, streamId) {
	var splitOldId = oldId.split(INDEX_SEPARATOR);

	for (var topicName in _events2.default) {
		if (_events2.default.hasOwnProperty(topicName)) {
			for (var i = 0; i < _events2.default[topicName].length; i++) {
				if (streamId === _events2.default[topicName][i].streamId && (0, _internalsIsMatching2.default)(splitOldId, _events2.default[topicName][i].id.split(INDEX_SEPARATOR), true) && !_events2.default[topicName][i].isNewlyInserted && !_events2.default[topicName][i].isReindexed[oldIndices.length - 1]) {
					var indices = (0, _DOMParseAshNodeId2.default)(_events2.default[topicName][i].id);

					indices[oldIndices.length - 1] = newIndex;
					_events2.default[topicName][i].id = indices.join(INDEX_SEPARATOR);
					_events2.default[topicName][i].isReindexed[oldIndices.length - 1] = true;
				}
			}
		}
	}
}

module.exports = exports.default;