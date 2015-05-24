'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = isImmutable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var IMMUTABLE_TAG = _internalsConstants2.default.IMMUTABLE_TAG;

function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}

module.exports = exports.default;