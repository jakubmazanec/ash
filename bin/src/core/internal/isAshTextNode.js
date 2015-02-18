"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

function isAshTextNode(value) {
	return value && value.type == ASH_TEXT_NODE;
}

module.exports = isAshTextNode;