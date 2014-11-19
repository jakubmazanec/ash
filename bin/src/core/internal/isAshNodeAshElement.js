"use strict";

var constants = require("./constants");

var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function isAshNodeAshElement(value) {
  return value && value.type == ASH_NODE_ASH_ELEMENT;
}

module.exports = isAshNodeAshElement;