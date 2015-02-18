"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var ASH_NODE = constants.ASH_NODE;

function isAshNode(value) {
	return value && value.type == ASH_NODE;
}

module.exports = isAshNode;