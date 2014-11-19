"use strict";

var _ = require("_");
var constants = require("../internal/constants");
var parseAshNodeIndex = require("./parseAshNodeIndex");

// constants references
var PATCH_NONE = constants.PATCH_NONE;
var PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
var PATCH_ORDER = constants.PATCH_ORDER;
var PATCH_INSERT = constants.PATCH_INSERT;
var PATCH_REMOVE = constants.PATCH_REMOVE;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function walk(oldAshNode, newAshNode /*, patches*/) {
  // compare nodes
  var patches = arguments[2] || [];
  var differentProperties = false;
  var propertiesToChange = {};
  var propertiesToRemove = [];
  var newProperty;
  var newSubproperty;
  var oldProperty;
  var oldSubproperty;


  // which propertie are different or new
  for (newProperty in newAshNode.properties) {
    if (newAshNode.properties.hasOwnProperty(newProperty) && oldAshNode.properties && newAshNode.properties[newProperty] !== oldAshNode.properties[newProperty]) {
      if (typeof newAshNode.properties[newProperty] === "object" && oldAshNode.properties[newProperty] && typeof oldAshNode.properties[newProperty] == "object") {
        // which propertie are different or new
        for (newSubproperty in newAshNode.properties[newProperty]) {
          if (newAshNode.properties[newProperty].hasOwnProperty(newSubproperty) && newAshNode.properties[newProperty][newSubproperty] !== oldAshNode.properties[newProperty][newSubproperty]) {
            propertiesToChange[newProperty] = propertiesToChange[newProperty] || {};
            propertiesToChange[newProperty][newSubproperty] = newAshNode.properties[newProperty][newSubproperty];

            differentProperties = true;
          }
        }

        // which properties are to be removed
        for (oldSubproperty in oldAshNode.properties[newProperty]) {
          if (oldAshNode.properties[newProperty].hasOwnProperty(oldSubproperty) && typeof newAshNode.properties[newProperty][oldSubproperty] === "undefined") {
            propertiesToRemove.push(newProperty + "." + oldSubproperty);

            differentProperties = true;
          }
        }
      } else {
        propertiesToChange[newProperty] = newAshNode.properties[newProperty];

        differentProperties = true;
      }
    }
  }

  // which properties are to be removed
  for (oldProperty in oldAshNode.properties) {
    if (oldAshNode.properties.hasOwnProperty(oldProperty) && newAshNode.properties && typeof newAshNode.properties[oldProperty] === "undefined") {
      differentProperties = true;
      propertiesToRemove.push(oldProperty);
    }
  }

  if (oldAshNode.type !== newAshNode.type || oldAshNode.tagName !== newAshNode.tagName) {
    patches.push({
      type: PATCH_ASH_NODE,
      index: oldAshNode.index,
      stage: oldAshNode.stage,
      node: newAshNode
    });

    // whole node must be replaced; no sense in finding other differences
    return patches;
  }

  if (oldAshNode.text !== newAshNode.text) {
    patches.push({
      type: PATCH_ASH_TEXT_NODE,
      index: oldAshNode.index,
      text: newAshNode.text
    });
  }

  if (differentProperties) {
    patches.push({
      type: PATCH_PROPERTIES,
      index: oldAshNode.index,
      stage: oldAshNode.stage,
      propertiesToChange: propertiesToChange,
      propertiesToRemove: propertiesToRemove
    });
  }

  // now let's check the children...
  patches = diffChildren(oldAshNode.children, newAshNode.children, patches);

  return patches;
}

function diffChildren(oldChildren, newChildren, patches) {
  if ((!oldChildren || !oldChildren.length) && (!newChildren || !newChildren.length)) {
    return patches;
  }

  // lets fill in keys, if needed; simple first-to-first correspondence
  var __length = Math.max(oldChildren.length, newChildren.length);
  var __a = 0;
  var __b = 0;
  var __keyCount = 0;
  var __key = "Key: " + __keyCount;
  var i;

  for (i = 0; i < __length; i++) {
    if (oldChildren[i] && oldChildren[i].key) {
      oldChildren[i].tempKey = oldChildren[i].key;
    }

    if (newChildren[i] && newChildren[i].key) {
      newChildren[i].tempKey = newChildren[i].key;
    }

    while (oldChildren[__a] && oldChildren[__a].key) {
      __a++;
    }

    while (newChildren[__b] && newChildren[__b].key) {
      __b++;
    }

    if (oldChildren[__a]) {
      oldChildren[__a].tempKey = __key;
    }

    if (newChildren[__b]) {
      newChildren[__b].tempKey = __key;
    }

    __keyCount++;
    __key = "Key: " + __keyCount;
    __a++;
    __b++;
  }

  // keys are in; let's compare order of children		
  var __found;
  var j;
  var patch;
  var __index;

  // first iterate over old children
  for (i = 0; i < oldChildren.length; i++) {
    __found = false;

    for (j = 0; j < newChildren.length; j++) {
      if (oldChildren[i].tempKey === newChildren[j].tempKey) {
        __found = true;

        break;
      }
    }

    // node with matching key was found?
    if (__found) {
      // is order same?
      if (i != j) {
        patches.push({
          type: PATCH_ORDER,
          newIndex: newChildren[j].index,
          index: oldChildren[i].index,
          stage: oldChildren[i].stage,
          order: j
        });
      }

      // now walk inside those children...
      walk(oldChildren[i], newChildren[j], patches);
    } else {
      // node is to be removed...
      patches.push({
        type: PATCH_REMOVE,
        index: oldChildren[i].index,
        stage: oldChildren[i].stage });
    }
  }

  // now iterate over new children; let's see, if there are any new...
  for (j = 0; j < newChildren.length; j++) {
    __found = false;

    for (i = 0; i < oldChildren.length; i++) {
      if (oldChildren[i].tempKey === newChildren[j].tempKey) {
        __found = true;
        break;
      }
    }

    // new child was not found
    if (!__found) {
      // create patch for insert
      patches.push({
        type: PATCH_INSERT,
        index: newChildren[j].index,
        node: newChildren[j]
      });

      __index = parseAshNodeIndex(newChildren[j].index);
      __index.pop();
      patches[patches.length - 1].parentIndex = __index.join(LEVEL_SEPARATOR);
    }
  }

  return patches;
}

// differences between trees
function diffAshNodeTree(oldAshNodeTree, newAshNodeTree) {
  return walk(oldAshNodeTree, newAshNodeTree);
}

module.exports = diffAshNodeTree;