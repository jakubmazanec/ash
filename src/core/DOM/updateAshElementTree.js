
import createAshElementTree from '../DOM/createAshElementTree';
import constants from '../internals/constants';


const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function unmountComponents(ashElement) {
	if (ashElement.type === COMPONENT_ASH_ELEMENT) {
		ashElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
	}

	for (let i = 0; i < ashElement.children.length; i++) {
		unmountComponents(ashElement.children[i]);
	}
}

function walkUpdateAshElementTree(oldAshElement, newAshElement, stream, isParentComponentDirty) {
	if (newAshElement === null) {
		if (oldAshElement) {
			// deleting old surplus children
			while (oldAshElement.parent.children.length) {
				if (oldAshElement.parent.children[oldAshElement.parent.children.length - 1].type === COMPONENT_ASH_ELEMENT) {
					unmountComponents(oldAshElement.parent.children[oldAshElement.parent.children.length - 1]);
				}

				oldAshElement.parent.children.pop();
			}
		}
	} else if (newAshElement.type === COMPONENT_ASH_ELEMENT && oldAshElement === null) {
		// the element tree is not complete
		createAshElementTree(newAshElement, stream);

		// new element must be added as a child
		newAshElement.parent.children[newAshElement.index] = newAshElement;
	} else if (newAshElement.type === COMPONENT_ASH_ELEMENT && oldAshElement.type === COMPONENT_ASH_ELEMENT && newAshElement.Spec === oldAshElement.Spec) {
		let newAshElementArgs = newAshElement.args != null ? newAshElement.args[0] : null;

		if (oldAshElement.isDirty || oldAshElement.instance.shouldUpdate(newAshElementArgs)) {
			oldAshElement.isDirty = true;
			
			// copy the new args to the old element
			oldAshElement.args = newAshElement.args;

			oldAshElement.instance.onBeforeReceiveProps(newAshElementArgs);
			
			oldAshElement.instance.props = newAshElementArgs;

			// create child for the new descriptor
			let render = oldAshElement.instance.render(oldAshElement.instance.props, oldAshElement.instance.state);

			// adding children to the queue
			if (render) {
				render.owner = oldAshElement;
				render.parent = oldAshElement;
				render.index = 0;

				if (oldAshElement.children[0]) {
					walkUpdateAshElementTree(oldAshElement.children[0], render, stream, true);
				} else {
					walkUpdateAshElementTree(null, render, stream, true);
				}
			} else if (oldAshElement.children[0]) {
				// deleting old surplus children
				if (oldAshElement.children[0].type === COMPONENT_ASH_ELEMENT) {
					unmountComponents(oldAshElement.children[0]);
				}
				
				oldAshElement.children.pop();
			}
		} else {
			walkUpdateAshElementTree(oldAshElement.children[0], oldAshElement.children[0], stream, false);
		}
	} else if (newAshElement.type === COMPONENT_ASH_ELEMENT && oldAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			newAshElement.owner = oldAshElement.owner;
			newAshElement.parent = oldAshElement.parent;
			newAshElement.index = oldAshElement.index;
			createAshElementTree(newAshElement, stream);

			// replace the old
			unmountComponents(oldAshElement);

			oldAshElement.parent.children[oldAshElement.index] = newAshElement;
		} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			newAshElement.owner = oldAshElement.owner;
			newAshElement.parent = oldAshElement.parent;
			newAshElement.index = oldAshElement.index;
			createAshElementTree(newAshElement, stream);

			// replace the old
			unmountComponents(oldAshElement);

			oldAshElement.parent.children[0] = newAshElement;
		}
	} else if (newAshElement.type === COMPONENT_ASH_ELEMENT && oldAshElement.type === ASH_NODE_ASH_ELEMENT) {
		if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			newAshElement.owner = oldAshElement.owner;
			newAshElement.parent = oldAshElement.parent;
			newAshElement.index = oldAshElement.index;
			createAshElementTree(newAshElement, stream);

			// replace the old
			oldAshElement.parent.children[oldAshElement.index] = newAshElement;
		} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			newAshElement.owner = oldAshElement.owner;
			newAshElement.parent = oldAshElement.parent;
			newAshElement.index = oldAshElement.index;
			createAshElementTree(newAshElement, stream);

			// replace the old
			oldAshElement.parent.children[0] = newAshElement;
		}
	} else if (newAshElement.type === ASH_NODE_ASH_ELEMENT && oldAshElement === null) {
		// newAshElement must be added as a child...
		if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			createAshElementTree(newAshElement, stream);
			
			// replace the old
			newAshElement.parent.children[0] = newAshElement;
		} else if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			createAshElementTree(newAshElement, stream);

			// replace the old
			newAshElement.parent.children[newAshElement.index] = newAshElement;
		}
	} else if (newAshElement.type === ASH_NODE_ASH_ELEMENT && oldAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			newAshElement.owner = oldAshElement.owner;
			newAshElement.parent = oldAshElement.parent;
			newAshElement.index = oldAshElement.index;

			createAshElementTree(newAshElement, stream);
			
			// replace the old
			unmountComponents(oldAshElement);

			oldAshElement.parent.children[0] = newAshElement;
		} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
			// now, the component descriptor's tree is not complete
			newAshElement.owner = oldAshElement.owner;
			newAshElement.parent = oldAshElement.parent;
			newAshElement.index = oldAshElement.index;

			createAshElementTree(newAshElement, stream);

			// replace the old
			unmountComponents(oldAshElement);

			oldAshElement.parent.children[oldAshElement.index] = newAshElement;
		}
	} else if (newAshElement.type === ASH_NODE_ASH_ELEMENT && oldAshElement.type === ASH_NODE_ASH_ELEMENT) {
		if (isParentComponentDirty) {
			oldAshElement.args = newAshElement.args;

			oldAshElement.instantiate();

			oldAshElement.stream = stream;
		}

		// adding children to the queue
		for (let i = 0; i < newAshElement.children.length; i++) {
			if (newAshElement.children[i] && oldAshElement.children[i]) {
				newAshElement.children[i].owner = oldAshElement.owner;
				newAshElement.children[i].parent = oldAshElement;
				newAshElement.children[i].index = i;

				walkUpdateAshElementTree(oldAshElement.children[i], newAshElement.children[i], stream, isParentComponentDirty);
			} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
				newAshElement.children[i].owner = oldAshElement.owner;
				newAshElement.children[i].parent = oldAshElement;
				newAshElement.children[i].index = i;

				walkUpdateAshElementTree(null, newAshElement.children[i], stream, isParentComponentDirty);
			}
		}

		// deleting old surplus children
		while (oldAshElement.children.length > newAshElement.children.length) {
			if (oldAshElement.children[oldAshElement.children.length - 1].type === COMPONENT_ASH_ELEMENT) {
				oldAshElement.children[oldAshElement.children.length - 1].instance.__lifecycle = LIFECYCLE_UNMOUNTED;
			}

			oldAshElement.children.pop();
		}
	}
}

export default function updateAshElementTree(componentAshElement, stream) {
	let newAshElement;
	let oldAshElement = componentAshElement.children[0] || null;

	if (componentAshElement.isDirty) {
		newAshElement = componentAshElement.instance.render(componentAshElement.instance.props, componentAshElement.instance.state);

		if (newAshElement) {
			newAshElement.owner = componentAshElement;
			newAshElement.parent = componentAshElement;
			newAshElement.index = 0;
		}
	} else {
		newAshElement = componentAshElement.children[0] || null;
	}

	walkUpdateAshElementTree(oldAshElement, newAshElement, stream, componentAshElement.isDirty);

	return componentAshElement;
}
