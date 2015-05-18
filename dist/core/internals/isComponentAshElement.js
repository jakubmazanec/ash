'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;

function isComponentAshElement(value) {
	return value && value.type == COMPONENT_ASH_ELEMENT;
}

exports.default = isComponentAshElement;
module.exports = exports.default;