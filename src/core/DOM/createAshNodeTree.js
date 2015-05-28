import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import constants from '../internals/constants';


const INDEX_SEPARATOR = constants.INDEX_SEPARATOR;

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentComponentDirty, parentIndices) {
	if (isAshNodeAshElement(ashElement)) {
		if (isParentComponentDirty) {
			ashElement.instantiate();

			ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
			ashElement.instance.index = index;
			ashElement.instance.indices = parentIndices.concat(index);
			ashElement.instance.streamId = ashElement.stream.id;
			ashElement.instance.isDirty = isParentComponentDirty;
			ashElement.instance.parent = ashNodeTree;

			ashNodeTree.children.push(ashElement.instance);
		} else {
			ashElement.instance.isDirty = isParentComponentDirty;

			if (ashNodeTree.children[ashElement.instance.index] !== ashElement.instance) {
				ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
			}
		}

		// walk the children
		for (let i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentComponentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		let isDirty = ashElement.isDirty;

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

export default function createAshNodeTree(componentAshElement) {
	if (!isComponentAshElement(componentAshElement)) {
		throw new Error(`${componentAshElement} (componentAshElement) must be a Component Ash Element object instance.`);
	}
	
	let ashElement = componentAshElement;
	let ashNodeTree;
	let isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children which is ash node ash element
	while (!isAshNodeAshElement(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// always re-instantiate element
	ashElement.instantiate();

	ashElement.instance.id = '0';
	ashElement.instance.index = 0;
	ashElement.instance.indices = [0];
	ashElement.instance.streamId = ashElement.stream.id;
	ashElement.instance.isDirty = isDirty;
	ashElement.instance.parent = null;

	ashNodeTree = ashElement.instance;

	// walk the children
	for (let i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}
