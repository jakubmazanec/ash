'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = isAshTextNode;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_TEXT_NODE = _constants2.default.ASH_TEXT_NODE;

function isAshTextNode(value) {
	return value && value.type === ASH_TEXT_NODE;
}

module.exports = exports.default;