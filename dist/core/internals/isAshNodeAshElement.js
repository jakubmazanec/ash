'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = isAshNodeAshElement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function isAshNodeAshElement(value) {
	return value && value.type === ASH_NODE_ASH_ELEMENT;
}

module.exports = exports.default;