'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = isAshNode;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_NODE = _constants2.default.ASH_NODE;

function isAshNode(value) {
	return value && value.type === ASH_NODE;
}

module.exports = exports.default;