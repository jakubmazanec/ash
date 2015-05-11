'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;

function isComponentAshElement(value) {
	return value && value.type == COMPONENT_ASH_ELEMENT;
}

exports.default = isComponentAshElement;
module.exports = exports.default;