'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_TEXT_NODE = _constants2.default.ASH_TEXT_NODE;

function isAshTextNode(value) {
	return value && value.type === ASH_TEXT_NODE;
}

exports.default = isAshTextNode;
module.exports = exports.default;