"use strict";

var AshNode = require("../class/AshNode");
var AshElement = require("../class/AshElement");
var isAshElement = require("../internal/isAshElement");
var constants = require("../internal/constants");

// constants references
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

var createElement = function (tagName /*, props, children*/) {
  var props = arguments[1];
  var children = arguments[2];
  var i;

  // type check
  if (tagName && typeof props === "undefined" && !children) {
    return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, null);
  }

  if (Array.isArray(props)) {
    children = props;
    props = null;
  } /* else if (typeof children === 'string') {
    children = [children];
    }*/

  if (!Array.isArray(children)) {
    children = [];

    // children are not in an array, iterate over arguments...
    for (i = 2; i < arguments.length; i++) {
      if (typeof arguments[i] === "string") {
        children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
      } else if (isAshElement(arguments[i])) {
        children.push(arguments[i]);
      }
    }
  } else {
    // check type of children
    for (i = 0; i < children.length; i++) {
      if (typeof children[i] === "string") {
        children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
      } else if (!children[i]) {
        children.splice(i, 1);
        i--;
      } else if (!isAshElement(children[i])) {
        //throw new Error(children[i] + ' must be a AshElement object.');
        children.splice(i, 1);
        i--;
      }
    }
  }

  return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
};

module.exports = createElement;