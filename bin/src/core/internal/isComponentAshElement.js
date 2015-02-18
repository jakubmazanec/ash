"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

function isComponentAshElement(value) {
	return value && value.type == COMPONENT_ASH_ELEMENT;
}

module.exports = isComponentAshElement;