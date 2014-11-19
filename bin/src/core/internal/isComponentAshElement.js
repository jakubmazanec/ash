"use strict";

var constants = require("./constants");

var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

function isComponentAshElement(value) {
  return value && value.type == COMPONENT_ASH_ELEMENT;
}

module.exports = isComponentAshElement;