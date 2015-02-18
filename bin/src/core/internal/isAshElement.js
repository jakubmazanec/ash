"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function isAshElement(value) {
	return value && (value.type == COMPONENT_ASH_ELEMENT || value.type == ASH_NODE_ASH_ELEMENT);
}

module.exports = isAshElement;