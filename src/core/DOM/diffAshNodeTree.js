import constants from '../internal/constants';
import parseAshNodeIndex from './parseAshNodeIndex';

// constants references
const PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
const PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
const PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
const PATCH_ORDER = constants.PATCH_ORDER;
const PATCH_INSERT = constants.PATCH_INSERT;
const PATCH_REMOVE = constants.PATCH_REMOVE;
const LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function diffChildren(oldChildren, newChildren, patches) {
	if ((!oldChildren || !oldChildren.length) && (!newChildren || !newChildren.length)) {
		return patches;
	}

	// lets fill in keys, if needed; simple first-to-first correspondence
	var oldChildIndex = 0;
	var newChildIndex = 0;
	var lastKey = 0;
	var key = '__key:' + lastKey + '__';

	for (let i = 0, length = Math.max(oldChildren.length, newChildren.length); i < length; i++) {
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
	
	// keys are in; let's compare order of children
	var foundIndex;

	// first iterate over old children
	for (let i = 0; i < oldChildren.length; i++) {
		let isChildFound = false;

		for (let j = 0; j < newChildren.length; j++) {
			if (oldChildren[i].tempKey === newChildren[j].tempKey) {
				isChildFound = true;
				foundIndex = j;

				break;
			}
		}

		// node with matching key was found?
		if (isChildFound) {
			// is order same?
			if (i != foundIndex) {
				patches.push({
					type: PATCH_ORDER,
					newIndex: newChildren[foundIndex].index,
					index: oldChildren[i].index,
					parsedIndex: parseAshNodeIndex(oldChildren[i].index),
					stage: oldChildren[i].stage,
					order: foundIndex
				});

				for (let k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
					if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
						patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
					}
				}

			
			}

			// now walk inside those children...
			diffAshNodeTree(oldChildren[i], newChildren[foundIndex], patches);
		} else {
			// node is to be removed...
			patches.push({
				type: PATCH_REMOVE,
				index: oldChildren[i].index,
				parsedIndex: parseAshNodeIndex(oldChildren[i].index),
				stage: oldChildren[i].stage,
			});

			for (let k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
					patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
				}
			}
		}
	}

	// now iterate over new children; let's see, if there are any new...
	for (let j = 0; j < newChildren.length; j++) {
		let isChildFound = false;

		for (let i = 0; i < oldChildren.length; i++) {
			if (oldChildren[i].tempKey === newChildren[j].tempKey) {
				isChildFound = true;
				break;
			}
		}

		// new child was not found
		if (!isChildFound) {
			// create patch for insert
			patches.push({
				type: PATCH_INSERT,
				index: newChildren[j].index,
				parsedIndex: parseAshNodeIndex(newChildren[j].index),
				node: newChildren[j]
			});

			for (let k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
					patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
				}
			}

			let parentIndex = parseAshNodeIndex(newChildren[j].index);
			parentIndex.pop();
			patches[patches.length - 1].parentIndex = parentIndex.join(LEVEL_SEPARATOR);
		}
	}
	
	return patches;
}

function diffAshNodeTree(oldAshNode, newAshNode/*, patches*/) {
	// compare nodes
	var patches = Array.isArray(arguments[2]) ? arguments[2] : [];
	var differentProperties = false;
	var propertiesToChange = {};
	var propertiesToRemove = [];

	if (typeof patches.maxIndex === 'undefined') {
		patches.maxIndex = 0;
	}

	if (typeof patches.stage === 'undefined') {
		patches.stage = oldAshNode.stage;
	}

	// which propertie are different or new
	for (let newProperty in newAshNode.properties) {
		if (newAshNode.properties.hasOwnProperty(newProperty) && oldAshNode.properties && newAshNode.properties[newProperty] !== oldAshNode.properties[newProperty]) {
			if (typeof newAshNode.properties[newProperty] === 'object' && oldAshNode.properties[newProperty] && typeof oldAshNode.properties[newProperty] == 'object') {
				// which propertie are different or new
				for (let newSubproperty in newAshNode.properties[newProperty]) {
					if (newAshNode.properties[newProperty].hasOwnProperty(newSubproperty) && newAshNode.properties[newProperty][newSubproperty] !== oldAshNode.properties[newProperty][newSubproperty]) {
						propertiesToChange[newProperty] = propertiesToChange[newProperty] || {};
						propertiesToChange[newProperty][newSubproperty] = newAshNode.properties[newProperty][newSubproperty];

						differentProperties = true;
					}
				}

				// which properties are to be removed
				for (let oldSubproperty in oldAshNode.properties[newProperty]) {
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
	for (let oldProperty in oldAshNode.properties) {
		if (oldAshNode.properties.hasOwnProperty(oldProperty) && newAshNode.properties && typeof newAshNode.properties[oldProperty] === 'undefined') {
			differentProperties = true;
			propertiesToRemove.push(oldProperty);
		}
	}

	if (oldAshNode.type !== newAshNode.type || oldAshNode.tagName !== newAshNode.tagName) {
		patches.push({
			type: PATCH_ASH_NODE,
			index: oldAshNode.index,
			parsedIndex: parseAshNodeIndex(oldAshNode.index),
			stage: oldAshNode.stage,
			node: newAshNode
		});

		for (let k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
				patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
			}
		}

		// whole node must be replaced; no sense in finding other differences
		return patches;
	}

	if (oldAshNode.text !== newAshNode.text) {
		patches.push({
			type: PATCH_ASH_TEXT_NODE,
			index: oldAshNode.index,
			parsedIndex: parseAshNodeIndex(oldAshNode.index),
			text: newAshNode.text
		});

		for (let k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
				patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
			}
		}
	}
	
	if (differentProperties) {
		patches.push({
			type: PATCH_PROPERTIES,
			index: oldAshNode.index,
			parsedIndex: parseAshNodeIndex(oldAshNode.index),
			stage: oldAshNode.stage,
			propertiesToChange: propertiesToChange,
			propertiesToRemove: propertiesToRemove
		});

		for (let k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
				patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
			}
		}
	}

	// diff the children...
	patches = diffChildren(oldAshNode.children, newAshNode.children, patches);

	return patches;
}

export default diffAshNodeTree;
