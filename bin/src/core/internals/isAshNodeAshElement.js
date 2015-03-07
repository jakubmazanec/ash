"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("./constants"));

var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function isAshNodeAshElement(value) {
	return value && value.type === ASH_NODE_ASH_ELEMENT;
}

module.exports = isAshNodeAshElement;