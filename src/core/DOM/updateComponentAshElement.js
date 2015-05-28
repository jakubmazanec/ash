
import createAshElementTree from '../DOM/createAshElementTree';
import constants from '../internals/constants';



const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function walkUpdateComponentAshElement(oldAshElement, newAshElement, stream) {
	if (newAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement === null) {
			// old is null, new is component

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[newAshElement.index] = newAshElement;
			} else if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT && newAshElement.Spec === oldAshElement.Spec) {
			// old is component, new is same component

			if (oldAshElement.instance.shouldUpdate(newAshElement.args ? newAshElement.args[0] : null)) {
				oldAshElement.isDirty = true;
				
				// copy the new to the old...
				oldAshElement.args = newAshElement.args;
				oldAshElement.instance.onBeforeReceiveProps(newAshElement.args ? newAshElement.args[0] : null);
				oldAshElement.instance.props = newAshElement.args ? newAshElement.args[0] : null;

				// create child for the new descriptor
				newAshElement.children[0] = oldAshElement.instance.render();

				// adding children to the queue
				if (newAshElement.children[0] && oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].index = 0;

					walkUpdateComponentAshElement(oldAshElement.children[0], newAshElement.children[0], stream);
				} else if (newAshElement.children[0] && !oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].index = 0;

					walkUpdateComponentAshElement(null, newAshElement.children[0], stream);
				}

				// deleting old surplus children
				if (!newAshElement.children[0] && oldAshElement.children[0]) {
					if (oldAshElement.children[0].type === COMPONENT_ASH_ELEMENT) {
						oldAshElement.children[0].instance.__lifecycle = LIFECYCLE_UNMOUNTED;
					}
					
					oldAshElement.children.pop();
				}
			}
		}	else if (oldAshElement.type === COMPONENT_ASH_ELEMENT) {
			// old is component, new is different component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				createAshElementTree(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				createAshElementTree(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			}
		} else {
			// old is virtual node, new is component

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
		}
	} else {
		if (oldAshElement === null) {
			// old is null, new is virtual node

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
		} else if (newAshElement.type === oldAshElement.type) {
			// old is virtual node, new is virtual node

			oldAshElement.args = newAshElement.args;
			oldAshElement.instantiate();

			// adding children to the queue
			for (let i = 0; i < newAshElement.children.length; i++) {
				if (newAshElement.children[i] && oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].index = i;

					walkUpdateComponentAshElement(oldAshElement.children[i], newAshElement.children[i], stream);
				} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].index = i;

					walkUpdateComponentAshElement(null, newAshElement.children[i], stream);
				}
			}

			// deleting old surplus children
			while (oldAshElement.children.length > newAshElement.children.length) {
				if (oldAshElement.children[oldAshElement.children.length - 1].type === COMPONENT_ASH_ELEMENT) {
					oldAshElement.children[oldAshElement.children.length - 1].instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				}

				oldAshElement.children.pop();
			}
		} else {
			// old is component, new is virtual node

			if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;

				createAshElementTree(newAshElement, stream);
				
				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;

				createAshElementTree(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			}
		}
	}
}

export default function updateComponentAshElement(componentAshElement, stream) {
	var render = componentAshElement.instance.render();

	render.owner = componentAshElement;
	render.parent = componentAshElement;
	render.index = 0;

	componentAshElement.isDirty = true;

	walkUpdateComponentAshElement(componentAshElement.children[0], render, stream);
}
