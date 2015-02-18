import isAshElement from '../internal/isAshElement';
import isString from '../internal/isString';
import isComponentAshElement from '../internal/isComponentAshElement';
import isAshNodeAshElement from '../internal/isAshNodeAshElement';
import constants from '../internal/constants';

const LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;
const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;

function walk(ashElement, index, owner, lastLevel) {
	var i;

	// type check
	if (!isComponentAshElement(owner)) {
		throw new Error(owner + ' must be a Component type AshElement Object');
	}

	if (isAshNodeAshElement(ashElement))
	{
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.level = lastLevel + LEVEL_SEPARATOR + index;
		ashElement.order = index;

		// set up owner & stage
		ashElement.owner = owner;
		ashElement.stage = owner.stage;

		for (i = 0; i < ashElement.children.length; i++)
		{
			if (ashElement.children[i])
			{
				// set up parent
				ashElement.children[i].parent = ashElement;

				// walk the child
				walk(ashElement.children[i], i, owner, ashElement.level);
			}
		}
	} else if (isComponentAshElement(ashElement))
	{
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.level = lastLevel + LEVEL_SEPARATOR + index;
		ashElement.order = index;

		// set up owner
		ashElement.owner = owner;
		ashElement.stage = owner.stage;

		// create child by rendering component
		ashElement.instance.onBeforeMount();
		ashElement.instance.__setLifecycle(LIFECYCLE_MOUNTING);
		ashElement.children[0] = ashElement.instance.__getRender();
		
		if (ashElement.children[0])
		{
			// set up parent
			ashElement.children[0].parent = ashElement;

			// walk the child
			walk(ashElement.children[0], 0, ashElement, ashElement.level);
		}
	}
}

function createAshElementTree(rootAshElement, stage, startingLevel) {
	// type check
	if (!isAshElement(rootAshElement)) {
		throw new Error(rootAshElement + ' must be a AshElement object.');
	}

	if (!stage) {
		throw new Error(stage + ' must be an object.');
	}

	startingLevel = isString(startingLevel) ? startingLevel : '0';

	var ashElementTree = rootAshElement;

	ashElementTree.stage = stage;
	ashElementTree.isRoot = true;

	if (isComponentAshElement(ashElementTree)) {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.level = startingLevel;
		ashElementTree.order = typeof ashElementTree.order === 'undefined' ? 0 : ashElementTree.order;

		// create child by rendering component
		ashElementTree.instance.onBeforeMount();
		ashElementTree.children[0] = ashElementTree.instance.__getRender();
		ashElementTree.instance.__setLifecycle(LIFECYCLE_MOUNTING);

		// set up a parent
		ashElementTree.children[0].parent = ashElementTree;

		// walk the child
		walk(ashElementTree.children[0], 0, ashElementTree, ashElementTree.level);
	} else {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.level = startingLevel;
		ashElementTree.order = typeof ashElementTree.order === 'undefined' ? 0 : ashElementTree.order;

		for (let i = 0; i < ashElementTree.children.length; i++) {
			// set up a parent
			ashElementTree.children[i].parent = ashElementTree;

			// walk the child
			walk(ashElementTree.children[i], i, ashElementTree.owner, ashElementTree.level);
		}
	}

	// return resulting descriptor tree
	return ashElementTree;
}

export default createAshElementTree;
