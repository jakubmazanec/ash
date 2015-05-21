import isAshElement from '../internals/isAshElement';
import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import constants from '../internals/constants';



const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;

function walkCreateAshElementTree(ashElement, owner, index) {
	// type check
	if (!isComponentAshElement(owner)) {
		throw new Error(owner + ' must be a Component type AshElement Object');
	}

	if (isAshNodeAshElement(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.index = index;

		// set up owner & stream
		ashElement.owner = owner;
		ashElement.stream = owner.stream;

		for (let i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// set up parent
				ashElement.children[i].parent = ashElement;

				// walk the child
				walkCreateAshElementTree(ashElement.children[i], owner, i);
			}
		}
	} else if (isComponentAshElement(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.index = index;

		// set up owner
		ashElement.owner = owner;
		ashElement.stream = owner.stream;

		// create child by rendering component
		ashElement.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElement.children[0] = ashElement.instance.render();
		
		if (ashElement.children[0]) {
			// set up parent
			ashElement.children[0].parent = ashElement;

			// walk the child
			walkCreateAshElementTree(ashElement.children[0], ashElement, 0);
		}
	}
}

export default function createAshElementTree(rootAshElement, stream/*, startingLevel*/) {
	// type check
	if (!isAshElement(rootAshElement)) {
		throw new Error(rootAshElement + ' must be a AshElement object.');
	}

	if (!stream) {
		throw new Error(stream + ' must be an object.');
	}

	let ashElementTree = rootAshElement;

	ashElementTree.stream = stream;
	ashElementTree.isRoot = true;

	if (isComponentAshElement(ashElementTree)) {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.index = typeof ashElementTree.index === 'undefined' ? 0 : ashElementTree.index;

		// create child by rendering component
		ashElementTree.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElementTree.children[0] = ashElementTree.instance.render();

		// set up a parent
		if (ashElementTree.children[0]) {
			ashElementTree.children[0].parent = ashElementTree;
		}

		// walk the child
		walkCreateAshElementTree(ashElementTree.children[0], ashElementTree, 0);
	} else {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.index = typeof ashElementTree.index === 'undefined' ? 0 : ashElementTree.index;

		for (let i = 0; i < ashElementTree.children.length; i++) {
			// set up a parent
			ashElementTree.children[i].parent = ashElementTree;

			// walk the child
			walkCreateAshElementTree(ashElementTree.children[i], ashElementTree.owner, i);
		}
	}

	// return resulting descriptor tree
	return ashElementTree;
}
