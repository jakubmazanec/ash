'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var IMMUTABLE_TAG = _internalsConstants2.default.IMMUTABLE_TAG;

function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}

exports.default = isImmutable;
module.exports = exports.default;