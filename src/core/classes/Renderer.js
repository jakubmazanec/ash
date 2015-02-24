import createAshElementTree from '../DOM/createAshElementTree';
import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import createAshNodeTree from '../DOM/createAshNodeTree';
import createNodeTree from '../DOM/createNodeTree';
import diffAshNodeTree from '../DOM/diffAshNodeTree';
import patchNodeTree from '../DOM/patchNodeTree';
import stringifyAshNodeTree from '../DOM/stringifyAshNodeTree';
import validateNodeTree from '../DOM/validateNodeTree';
import constants from '../internals/constants';
import isElement from '../internals/isElement';

const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

var stageId = 0;
var renderer;

function walkUpdateComponentAshElement(oldAshElement, newAshElement, stage) {
	if (newAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement === null) {
			// old is null, new is component

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.owner.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[newAshElement.order] = newAshElement;
			} else if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT && newAshElement.spec === oldAshElement.spec) {
			// old is component, new is same component

			if (oldAshElement.instance.shouldUpdate(newAshElement.args[0])) {
				// copy the new to the old...
				oldAshElement.args = newAshElement.args;
				oldAshElement.instance.onBeforeReceiveProps(newAshElement.args[0]);
				oldAshElement.instance.props = newAshElement.args[0];

				// create child for the new descriptor
				newAshElement.children[0] = oldAshElement.instance.cachedRender;

				// adding children to the queue
				if (newAshElement.children[0] && oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].order = 0;

					walkUpdateComponentAshElement(oldAshElement.children[0], newAshElement.children[0], stage);
				} else if (newAshElement.children[0] && !oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].order = 0;

					walkUpdateComponentAshElement(null, newAshElement.children[0], stage);
				}

				// deleting old surplus children
				if (!newAshElement.children[0] && oldAshElement.children[0]) {
					if (oldAshElement.children[0].type == COMPONENT_ASH_ELEMENT) {
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
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			} else if (oldAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);

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
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

				// replace the old
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			} else if (oldAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);

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
				createAshElementTree(newAshElement, stage, newAshElement.id, newAshElement.level);
				
				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			} else if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.owner.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[newAshElement.order] = newAshElement;
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
					newAshElement.children[i].order = i;

					walkUpdateComponentAshElement(oldAshElement.children[i], newAshElement.children[i], stage);
				} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].order = i;

					walkUpdateComponentAshElement(null, newAshElement.children[i], stage);
				}
			}

			// deleting old surplus children
			while (oldAshElement.children.length > newAshElement.children.length) {
				if (oldAshElement.children[oldAshElement.children.length - 1].type == COMPONENT_ASH_ELEMENT) {
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
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);
				
				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			}
		}
	}
}

function updateComponentAshElement(componentAshElement, stage) {
	var render = componentAshElement.instance.cachedRender;
	render.owner = componentAshElement;
	render.parent = componentAshElement;
	render.order = 0;

	componentAshElement.isDirty = true;

	walkUpdateComponentAshElement(componentAshElement.children[0], render, stage);

	componentAshElement.instance.isDirty = false;
}

function mountComponents(ashElement) {
	if (isAshNodeAshElement(ashElement)) {
		for (let i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// walk the child
				mountComponents(ashElement.children[i]);
			}
		}
	} else if (isComponentAshElement(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle == LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		// walk the child
		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

function getStageRootNode(stageId) {
	for (let i = 0; i < this.stages[stageId].node.childNodes.length; i++) {
		if (typeof this.stages[stageId].node.childNodes[i][INDEX_ATTRIBUTE_NAME] !== 'undefined') {
			return this.stages[stageId].node.childNodes[i];
		}
	}

	return null;
}

function updateStage(stageId, component) {
	if (this.stages[stageId] && !this.stages[stageId].isUpdating) {
		this.stages[stageId].isUpdating = true;

		// find descriptors that should be updated
		updateComponentAshElement(component.__element, this.stages[stageId]);

		// set stage to dirty, so Renderer can rerender the DOM
		this.stages[stageId].isDirty = true;
		this.render();
	} else if (this.stages[stageId] && this.stages[stageId].isUpdating) {
		throw new Error('You cannot update components during previous update!');
	}
}

class Renderer {
	/* jshint ignore:start */
	stages = [];
	/* jshint ignore:end */

	constructor() {
		if (renderer) {
			return renderer;
		}

		// save singleton
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	addComponent(componentAshElement, node) {
		// type check
		if (!isComponentAshElement(componentAshElement)) {
			throw new Error(componentAshElement + ' must be a Componenet Descriptor.');
		}

		if (!isElement(node)) {
			throw new Error(node + ' must be a DOM Element.');
		}

		this.stages.push({
			id: stageId,
			isRendering: false,
			isDirty: true,
			isUpdating: true,

			node: node,
			ashNodeTree: null,
			ashElementTree: null,

			getRootNode: getStageRootNode.bind(this, stageId),
			update: updateStage.bind(this, stageId)
		});

		// create Ash Element tree for the Component Ash Element
		this.stages[stageId].ashElementTree = createAshElementTree(componentAshElement, this.stages[stageId]);
		stageId++;

		// render
		this.render();

		return this;
	}

	componentToString(componentAshElement) {
		// type check
		if (!isComponentAshElement(componentAshElement)) {
			throw new Error(componentAshElement + ' must be a Componenet Descriptor.');
		}

		let stage = {
			isRendering: false,
			isDirty: true,
			node: null,
			ashNodeTree: null
		};

		// create Ash Element tree for the Component Ash Element
		stage.ashElementTree = createAshElementTree(componentAshElement, stage);

		// create ash node tree
		stage.ashNodeTree = createAshNodeTree(stage.ashElementTree);

		return stringifyAshNodeTree(stage.ashNodeTree);
	}
	
	render() {
		var isNodeTreeValid;
		var isNodeTreeValidated;
		var newAshNodeTree;
		var patches;

		for (let i = 0; i < this.stages.length; i++) {
			if (this.stages[i].isDirty/* && !this.stages[i].isRendering*/) {
				if (!this.stages[i].ashNodeTree) {
					isNodeTreeValid = false;
					isNodeTreeValidated = false;

					// remove child nodes which are not element nodes
					for (let j = 0; j < this.stages[i].node.childNodes.length; j++) {
						if (this.stages[i].node.childNodes[j].nodeType != 1) {
							this.stages[i].node.removeChild(this.stages[i].node.childNodes[j]);
							j--;
						}
					}

					// create ash node tree
					this.stages[i].ashNodeTree = createAshNodeTree(this.stages[i].ashElementTree);

					// there are some element nodes?
					if (this.stages[i].node.childNodes.length) {
						isNodeTreeValidated = true;
						isNodeTreeValid = validateNodeTree(this.stages[i].node.childNodes[0], this.stages[i].ashNodeTree, this.stages[i]);
					}

					// render to the Real DOM, if needed
					if (!isNodeTreeValid || !isNodeTreeValidated) {
						if (isNodeTreeValidated) {
							console.warn('Existing html is invalid!');
						}

						while (this.stages[i].node.firstChild) {
							this.stages[i].node.removeChild(this.stages[i].node.firstChild);
						}

						this.stages[i].isRendering = true;

						global.requestAnimationFrame((timestamp) => {
							this.stages[i].node.appendChild(createNodeTree(this.stages[i].ashNodeTree));

							// mount components
							mountComponents(this.stages[i].ashElementTree);

							this.stages[i].isRendering = false;
						});
					} if (isNodeTreeValid && isNodeTreeValidated) {
						// mount components
						mountComponents(this.stages[i].ashElementTree);
					}
				} else {
					newAshNodeTree = createAshNodeTree(this.stages[i].ashElementTree);
					patches = diffAshNodeTree(this.stages[i].ashNodeTree, newAshNodeTree);
					this.stages[i].ashNodeTree = newAshNodeTree;

					this.stages[i].isRendering = true;

					global.requestAnimationFrame((timestamp) => {
						var isSuccessful = patchNodeTree(this.stages[i].getRootNode(), patches);

						if (!isSuccessful) {
							throw new Error('Patching the DOM was unsuccesful!');
						}

						// mount components
						mountComponents(this.stages[i].ashElementTree);
						
						this.stages[i].isRendering = false;
					});
				}

				this.stages[i].isDirty = false;
				this.stages[i].isUpdating = false;
			}
		}

		return this;
	}
}

export default Renderer;