"use strict";

var parseAshNodeIndex = require("./parseAshNodeIndex");

function findNode(nodeTree, nodeIndex) {
  var parsedAshNodeIndex = parseAshNodeIndex(nodeIndex);
  var node = nodeTree;
  var i;

  if (!nodeTree) {
    throw new Error(nodeTree + " cannot be falsy.");
  }

  if (parsedAshNodeIndex.length == 1) {
    return node;
  } else if (parsedAshNodeIndex.length) {
    for (i = 1; i < parsedAshNodeIndex.length; i++) {
      if (!node) {
        return false;
      }

      node = node.childNodes[parsedAshNodeIndex[i]];
    }

    return node;
  }

  return false;
}

module.exports = findNode;