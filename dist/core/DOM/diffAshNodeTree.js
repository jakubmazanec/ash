'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = diffAshNodeTree;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var PATCH_ASH_NODE = _internalsConstants2.default.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = _internalsConstants2.default.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = _internalsConstants2.default.PATCH_PROPERTIES;
var PATCH_ORDER = _internalsConstants2.default.PATCH_ORDER;
var PATCH_INSERT = _internalsConstants2.default.PATCH_INSERT;
var PATCH_REMOVE = _internalsConstants2.default.PATCH_REMOVE;

function diffChildren(oldChildren, newChildren, oldAshNode, newAshNode, patches) {
	var oldChildIndex = 0;
	var newChildIndex = 0;
	var key = 0;
	var isChildDirty = false;

	// lets fill in keys, if needed; simple first-to-first correspondence
	for (var i = 0, _length = Math.max(oldChildren.length, newChildren.length); i < _length; i++) {
		if (newChildren[i] && newChildren[i].isDirty) {
			isChildDirty = true;
		}

		if (oldChildren[i] && oldChildren[i].key) {
			oldChildren[i].__key = oldChildren[i].key;
		}

		if (newChildren[i] && newChildren[i].key) {
			newChildren[i].__key = newChildren[i].key;
		}

		while (oldChildren[oldChildIndex] && oldChildren[oldChildIndex].key) {
			oldChildIndex++;
		}

		while (newChildren[newChildIndex] && newChildren[newChildIndex].key) {
			newChildIndex++;
		}

		if (oldChildren[oldChildIndex]) {
			oldChildren[oldChildIndex].__key = key;
		}

		if (newChildren[newChildIndex]) {
			newChildren[newChildIndex].__key = key;
		}

		key++;
		oldChildIndex++;
		newChildIndex++;
	}

	// no children are dirty
	if (!isChildDirty && oldChildren.length === newChildren.length) {
		// console.log('no children dirty!');
		for (var i = 0; i < oldChildren.length; i++) {
			// now walk inside those children...
			walkDiffAshNodeTree(oldChildren[i], newChildren[i], patches);
		}

		return patches;
	}

	// keys are in; let's compare order of children
	var foundIndex = undefined;

	// first iterate over old children
	for (var i = 0; i < oldChildren.length; i++) {
		var isChildFound = false;

		for (var j = 0; j < newChildren.length; j++) {
			if (oldChildren[i].__key === newChildren[j].__key) {
				isChildFound = true;
				foundIndex = j;

				break;
			}
		}

		// node with matching key was found?
		if (isChildFound) {
			// is order same?
			if (i !== foundIndex) {
				patches.push({
					type: PATCH_ORDER,
					newId: newChildren[foundIndex].id,
					id: oldChildren[i].id,
					indices: oldChildren[i].indices,
					streamId: oldChildren[i].streamId,
					index: foundIndex
				});

				for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
					if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
						patches.maxIndex = patches[patches.length - 1].indices[k];
					}
				}
			}

			// now walk inside those children...
			walkDiffAshNodeTree(oldChildren[i], newChildren[foundIndex], patches);
		} else {
			// node is to be removed...
			patches.push({
				type: PATCH_REMOVE,
				id: oldChildren[i].id,
				indices: oldChildren[i].indices,
				streamId: oldChildren[i].streamId
			});

			for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
					patches.maxIndex = patches[patches.length - 1].indices[k];
				}
			}
		}
	}

	// now iterate over new children; let's see, if there are any new...
	for (var j = 0; j < newChildren.length; j++) {
		var isChildFound = false;

		for (var i = 0; i < oldChildren.length; i++) {
			if (oldChildren[i].__key === newChildren[j].__key) {
				isChildFound = true;

				break;
			}
		}

		// new child was not found
		if (!isChildFound) {
			patches.push({
				type: PATCH_INSERT,
				node: newChildren[j],
				id: newChildren[j].id,
				indices: newChildren[j].indices,
				parentId: oldAshNode.id,
				parentIndices: oldAshNode.indices
			});

			for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
					patches.maxIndex = patches[patches.length - 1].indices[k];
				}
			}
		}
	}

	return patches;
}

function walkDiffAshNodeTree(oldAshNode, newAshNode, patches) {
	var differentProperties = false;
	var propertiesToChange = {};
	var propertiesToRemove = [];

	if (newAshNode === null) {
		// node is to be removed...
		patches.push({
			type: PATCH_REMOVE,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			streamId: oldAshNode.streamId
		});

		return patches;
	}

	if (oldAshNode === newAshNode || !newAshNode.isDirty) {
		if (oldAshNode.oldChildren && oldAshNode.oldChildren.length) {
			diffChildren(oldAshNode.oldChildren, newAshNode.children, oldAshNode, newAshNode, patches);

			oldAshNode.oldChildren = newAshNode.oldChildren = null;
		} else if (oldAshNode.children && oldAshNode.children.length || newAshNode.children && newAshNode.children.length) {
			diffChildren(oldAshNode.children, newAshNode.children, oldAshNode, newAshNode, patches);
		}

		return patches;
	}

	// which propertie are different or new
	for (var newProperty in newAshNode.properties) {
		if (newAshNode.properties.hasOwnProperty(newProperty) && oldAshNode.properties && newAshNode.properties[newProperty] !== oldAshNode.properties[newProperty]) {
			if (typeof newAshNode.properties[newProperty] === 'object' && oldAshNode.properties[newProperty] && typeof oldAshNode.properties[newProperty] === 'object') {
				// which propertie are different or new
				for (var newSubproperty in newAshNode.properties[newProperty]) {
					if (newAshNode.properties[newProperty].hasOwnProperty(newSubproperty) && newAshNode.properties[newProperty][newSubproperty] !== oldAshNode.properties[newProperty][newSubproperty]) {
						propertiesToChange[newProperty] = propertiesToChange[newProperty] || {};
						propertiesToChange[newProperty][newSubproperty] = newAshNode.properties[newProperty][newSubproperty];
						differentProperties = true;
					}
				}

				// which properties are to be removed
				for (var oldSubproperty in oldAshNode.properties[newProperty]) {
					if (oldAshNode.properties[newProperty].hasOwnProperty(oldSubproperty) && typeof newAshNode.properties[newProperty][oldSubproperty] === 'undefined') {
						propertiesToRemove.push(newProperty + '.' + oldSubproperty);

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
	for (var oldProperty in oldAshNode.properties) {
		if (oldAshNode.properties.hasOwnProperty(oldProperty) && newAshNode.properties && typeof newAshNode.properties[oldProperty] === 'undefined') {
			differentProperties = true;
			propertiesToRemove.push(oldProperty);
		}
	}

	if (oldAshNode.type !== newAshNode.type || oldAshNode.tagName !== newAshNode.tagName) {
		patches.push({
			type: PATCH_ASH_NODE,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			streamId: oldAshNode.streamId,
			node: newAshNode
		});

		for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
				patches.maxIndex = patches[patches.length - 1].indices[k];
			}
		}

		// whole node must be replaced; no sense in finding other differences
		return patches;
	}

	if (oldAshNode.text !== newAshNode.text) {
		patches.push({
			type: PATCH_ASH_TEXT_NODE,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			text: newAshNode.text
		});

		for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
				patches.maxIndex = patches[patches.length - 1].indices[k];
			}
		}
	}

	if (differentProperties) {
		patches.push({
			type: PATCH_PROPERTIES,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			streamId: oldAshNode.streamId,
			propertiesToChange: propertiesToChange,
			propertiesToRemove: propertiesToRemove
		});

		for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
				patches.maxIndex = patches[patches.length - 1].indices[k];
			}
		}
	}

	// diff the children...
	if (oldAshNode.oldChildren && oldAshNode.oldChildren.length) {
		diffChildren(oldAshNode.oldChildren, newAshNode.children, oldAshNode, newAshNode, patches);

		oldAshNode.oldChildren = newAshNode.oldChildren = null; // we must delete old children, because in next diff they would be "old old children", and we dont want that
	} else if (oldAshNode.children && oldAshNode.children.length || newAshNode.children && newAshNode.children.length) {
			diffChildren(oldAshNode.children, newAshNode.children, oldAshNode, newAshNode, patches);
		}

	return patches;
}

/**
 * [diffAshNodeTree description]
 * @param  {[type]} oldAshNodeTree [description]
 * @param  {[type]} newAshNodeTree [description]
 * @return {[type]}                [description]
 */

function diffAshNodeTree(oldAshNodeTree, newAshNodeTree) {
	var patches = [];

	patches.maxIndex = 1;

	return walkDiffAshNodeTree(oldAshNodeTree, newAshNodeTree, patches);
}

module.exports = exports.default;