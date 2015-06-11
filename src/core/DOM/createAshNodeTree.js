import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import constants from '../internals/constants';


const INDEX_SEPARATOR = constants.INDEX_SEPARATOR;

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentComponentDirty, parentIndices) {
	// console.log('>-- walkCreateAshNodeTree...', index, parentIndices, 'parentDirty?', isParentComponentDirty, 'on', ashNodeTree.id, ashNodeTree.tagName);
	// debugger;
	if (isAshNodeAshElement(ashElement)) {
		// console.log('-', ashElement.args[0], ashElement.args[1]);
		if (isParentComponentDirty) {
			
			ashElement.instantiate();

			ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
			ashElement.instance.index = index;
			ashElement.instance.indices = parentIndices.concat(index);
			ashElement.instance.streamId = ashElement.stream.id;
			ashElement.instance.isDirty = true;
			ashElement.instance.parent = ashNodeTree;

			// console.log('instantiate!', ashElement.instance.index, ashNodeTree.children[ashElement.instance.index]);

			// ashNodeTree.children.push(ashElement.instance);
			ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
		} else {
			// console.log('just copy', ashElement.instance.index);
			ashElement.instance.isDirty = false;
			ashElement.instance.parent = ashNodeTree;

			if (ashNodeTree.children[ashElement.instance.index] !== ashElement.instance) {
				ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
			}
		}

		// walk the children
		// console.log('walk the node children...', ashElement.instance.index);
		for (let i = 0; i < ashElement.children.length; i++) {
			// walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentComponentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
			walkCreateAshNodeTree(ashNodeTree.children[ashElement.instance.index], ashElement.children[i], i, ashNodeTree.children[ashElement.instance.index].id, isParentComponentDirty, ashNodeTree.children[ashElement.instance.index].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		
		let isDirty = ashElement.isDirty;

		// console.log('* Component', ashElement.Spec, 'element dirty?', isDirty);

		/*if (isDirty) {
			// if (!ashNodeTree.oldChildren) {
			if (index === 0) {
				// console.log('creating oldChildren', 'on', ashNodeTree.id, ashNodeTree.tagName);
				// console.log('old children', ashNodeTree.children.length);
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];
			}
		} else {
			// console.log('not dirty, set oldChildren to null', 'on', ashNodeTree.id, ashNodeTree.tagName);
			ashNodeTree.oldChildren = null;
		}*/

		if (index === 0 && !isParentComponentDirty) {
			// console.log('index 0!');
			if (isDirty) {
				// console.log('and dirty, so creating oldChildren', 'on', ashNodeTree.id, ashNodeTree.tagName);
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];
			} else {
				// console.log('not dirty, set oldChildren to null', 'on', ashNodeTree.id, ashNodeTree.tagName);
				ashNodeTree.oldChildren = null;
			}
		} else if (!isParentComponentDirty) {
			// console.log('index larger than zero!');
			if (isDirty && !ashNodeTree.oldChildren) {
				// console.log('and dirty so no old children -> creating oldChildren', 'on', ashNodeTree.id, ashNodeTree.tagName);
				// debugger;
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];

				// copy not dirty already walked children
				for (let i = 0; i < index; i++) {
					ashNodeTree.children[i] = ashNodeTree.oldChildren[i];
				}
			}
		}

		ashElement.isDirty = false;

		// console.log('walk the Component chil...');
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

export default function createAshNodeTree(componentAshElement) {
	if (!isComponentAshElement(componentAshElement)) {
		throw new Error(`${componentAshElement} (componentAshElement) must be a Component Ash Element object instance.`);
	}

	// console.log('createAshNodeTree...');
	
	let ashElement = componentAshElement;
	let ashNodeTree;
	let isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children which is ash node ash element
	while (!isAshNodeAshElement(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// console.log('>--', 'parentDirty?', isDirty, 'on');

	if (isDirty) {
		ashElement.instantiate();

		ashElement.instance.id = '0';
		ashElement.instance.index = 0;
		ashElement.instance.indices = [0];
		ashElement.instance.streamId = ashElement.stream.id;
		ashElement.instance.isDirty = true;
		ashElement.instance.parent = null;

		// console.log('instantiate!', ashElement.instance.index);
	} else {
		ashElement.instance.id = '0';
		ashElement.instance.index = 0;
		ashElement.instance.indices = [0];
		ashElement.instance.streamId = ashElement.stream.id;
		ashElement.instance.isDirty = false;
		ashElement.instance.parent = null;

		// console.log('just copy', ashElement.instance.index);
	}

	ashNodeTree = ashElement.instance;
	

	// walk the children
	for (let i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}
