import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import isAshNode from '../internals/isAshNode';
import constants from '../internals/constants';

const INDEX_SEPARATOR = constants.INDEX_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	if (isAshNode(ashNodeAshElement.instance)) {
		return {
			id: ashNodeAshElement.instance.id,
			index: ashNodeAshElement.instance.index,
			indices: ashNodeAshElement.instance.indices,
			type: ashNodeAshElement.instance.type,
			streamId: ashNodeAshElement.stream.id,
			tagName: ashNodeAshElement.instance.tagName,
			key: ashNodeAshElement.instance.key,
			properties: ashNodeAshElement.instance.properties,
			children: []
		};
	} else {
		return {
			id: ashNodeAshElement.instance.id,
			index: ashNodeAshElement.instance.index,
			indices: ashNodeAshElement.instance.indices,
			type: ashNodeAshElement.instance.type,
			streamId: ashNodeAshElement.stream.id,
			text: ashNodeAshElement.instance.text,
		};
	}
}

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentDirty, parentIndices) {
	if (isAshNodeAshElement(ashElement)) {
		// set up ordering properties
		ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
		ashElement.instance.index = index;
		ashElement.instance.indices = parentIndices.concat(index);

		// clone virtual node
		let clonedAshNode = cloneAshNode(ashElement);

		// is parent component dirty?
		clonedAshNode.isDirty = isParentDirty;

		// add child
		clonedAshNode.parent = ashNodeTree;
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (let i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		let isDirty = ashElement.isDirty;

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

function createAshNodeTree(componentAshElement) {
	// type check
	if (!isComponentAshElement(componentAshElement)) {
		throw new Error(componentAshElement + ' must be a Component Descriptor object.');
	}
	
	let ashElement = componentAshElement;
	let ashNodeTree;
	let isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!isAshNodeAshElement(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// set up ordering properties
	ashElement.instance.id = '0';
	ashElement.instance.index = 0;
	ashElement.instance.indices = [0];

	// set up ash node tree
	ashNodeTree = cloneAshNode(ashElement);
	ashNodeTree.parent = null;
	
	// is parent component dirty?
	ashNodeTree.isDirty = isDirty;

	// walk the children
	for (let i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}

export default createAshNodeTree;
