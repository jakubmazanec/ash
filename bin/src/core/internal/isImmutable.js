"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("../internal/constants"));

var IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}

module.exports = isImmutable;