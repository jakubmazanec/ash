'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = diffAshNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var PATCH_ASH_NODE = _internalsConstants2.default.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = _internalsConstants2.default.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = _internalsConstants2.default.PATCH_PROPERTIES;
var PATCH_ORDER = _internalsConstants2.default.PATCH_ORDER;
var PATCH_INSERT = _internalsConstants2.default.PATCH_INSERT;
var PATCH_REMOVE = _internalsConstants2.default.PATCH_REMOVE;

function diffChildren(oldChildren, newChildren, oldAshNode, newAshNode, patches) {
	// lets fill in keys, if needed; simple first-to-first correspondence
	var oldChildIndex = 0;
	var newChildIndex = 0;
	var lastKey = 0;
	var key = '__key:' + lastKey + '__';
	var isChildDirty = false;

	for (var i = 0, _length = Math.max(oldChildren.length, newChildren.length); i < _length; i++) {
		if (newChildren[i] && newChildren[i].isDirty) {
			isChildDirty = true;
		}

		if (oldChildren[i] && oldChildren[i].key) {
			oldChildren[i].tempKey = oldChildren[i].key;
		}

		if (newChildren[i] && newChildren[i].key) {
			newChildren[i].tempKey = newChildren[i].key;
		}

		while (oldChildren[oldChildIndex] && oldChildren[oldChildIndex].key) {
			oldChildIndex++;
		}

		while (newChildren[newChildIndex] && newChildren[newChildIndex].key) {
			newChildIndex++;
		}

		if (oldChildren[oldChildIndex]) {
			oldChildren[oldChildIndex].tempKey = key;
		}

		if (newChildren[newChildIndex]) {
			newChildren[newChildIndex].tempKey = key;
		}

		lastKey++;
		key = '__key:' + lastKey + '__';
		oldChildIndex++;
		newChildIndex++;
	}

	// no children are dirty
	if (!isChildDirty && oldChildren.length === newChildren.length) {
		for (var i = 0; i < oldChildren.length; i++) {
			// now walk inside those children...
			diffAshNodeTree(oldChildren[i], newChildren[i], patches);
		}

		return patches;
	}

	// keys are in; let's compare order of children
	var foundIndex = undefined;

	// first iterate over old children
	for (var i = 0; i < oldChildren.length; i++) {
		var isChildFound = false;

		for (var j = 0; j < newChildren.length; j++) {
			if (oldChildren[i].tempKey === newChildren[j].tempKey) {
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
			diffAshNodeTree(oldChildren[i], newChildren[foundIndex], patches);
		} else {
			// node is to be removed...
			patches.push({
				type: PATCH_REMOVE,
				id: oldChildren[i].id,
				indices: oldChildren[i].indices,
				streamId: oldChildren[i].streamId });

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
			if (oldChildren[i].tempKey === newChildren[j].tempKey) {
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
				// parentId: newChildren[j].parent.id,
				// parentIndices: newChildren[j].parent.indices,
				// parentId: oldChildren[0].parent.id,
				// parentIndices: oldChildren[0].parent.indices,
				parentId: oldAshNode.id,
				parentIndices: oldAshNode.indices });

			for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
					patches.maxIndex = patches[patches.length - 1].indices[k];
				}
			}

			// let parentIndex = newChildren[j].index2;
			// let parentIndices = newChildren[j].indices.slice(0, -1);

			// let parentIndex = parseAshNodeIndex(newChildren[j].index);
			// console.log(newChildren[j].index, JSON.stringify(parentIndex), JSON.stringify(newChildren[j].index2));

			// parentIndex.pop();
			// patches[patches.length - 1].parentIndices = parentIndices;
			// patches[patches.length - 1].parentId = parentIndices.join(INDEX_SEPARATOR);

			// console.log(newChildren[j].index, JSON.stringify(parentIndex), JSON.stringify(newChildren[j].index2));
		}
	}

	return patches;
}

function diffAshNodeTree(oldAshNode, newAshNode /*, patches*/) {
	// compare nodes
	var patches = Array.isArray(arguments[2]) ? arguments[2] : [];
	var differentProperties = false;
	var propertiesToChange = {};
	var propertiesToRemove = [];

	if (typeof patches.maxIndex === 'undefined') {
		patches.maxIndex = 1;
	}

	if (typeof patches.streamId === 'undefined') {
		patches.streamId = oldAshNode.streamId;
	}

	if (!newAshNode.isDirty) {
		// diff the children...
		if (!((!oldAshNode.children || !oldAshNode.children.length) && (!newAshNode.children || !newAshNode.children.length))) {
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
	if (!((!oldAshNode.children || !oldAshNode.children.length) && (!newAshNode.children || !newAshNode.children.length))) {
		diffChildren(oldAshNode.children, newAshNode.children, oldAshNode, newAshNode, patches);
	}

	return patches;
}

module.exports = exports.default;