'use strict';

var _ = require('_');
var $ = require('jquery');

var createAshElementTree = require('../DOM/createAshElementTree');
var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var createAshNodeTree = require('../DOM/createAshNodeTree');
var createNodeTree = require('../DOM/createNodeTree');
var diffAshNodeTree = require('../DOM/diffAshNodeTree');
var patchNodeTree = require('../DOM/patchNodeTree');
var mountComponents = require('../DOM/mountComponents');
var constants = require('../internal/constants');

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

var stageId = 0;
var renderer;

class Renderer {
	constructor() {
		if (renderer) {
			return renderer;
		}

		if (!(this instanceof Renderer)) {
			return new Renderer();
		}

		// save singleton
		renderer = this;
		
		renderer.stages = [];

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	addComponent(componentAshElement, node) {
		var renderer = this;
		var stage;

		// type check
		if (!isComponentAshElement(componentAshElement)) {
			throw new Error(componentAshElement + ' must be a Componenet Descriptor.');
		}

		if (!_.isElement(node)) {
			throw new Error(node + ' must be a DOM Element.');
		}

		stage = {
			isRendering: false,
			isDirty: true,

			node: node,
			ashNodeTree: null,

			getRootDOMNode: renderer.getRootDOMNode.bind(renderer, stageId),
			update: renderer.update.bind(renderer, stageId)
		};

		// create Ash Element tree for the Component Ash Element
		stage.ashElementTree = createAshElementTree(componentAshElement, stage);

		// push the stages
		renderer.stages.push(stage);
		stageId++;

		// render
		this.render();

		return renderer;
	}

	getRootDOMNode(stageId) {
		var i;

		for (i = 0; i < this.stages[stageId].node.childNodes.length; i++) {
			if (typeof this.stages[stageId].node.childNodes[i][INDEX_ATTRIBUTE_NAME] !== 'undefined') {
				return this.stages[stageId].node.childNodes[i];
			}
		}

		return null;
	}

	update(stageId) {
		var renderer = this;
		var stage = renderer.stages[stageId];		

		// find descriptors that should be updated
		findDirtyComponent(stage.ashElementTree);

		// set stage to dirty, so Renderer can rerender the DOM
		stage.isDirty = true;
		renderer.render();

		return renderer;
	}
	
	render() {
		var renderer = this;
		var newAshNodeTree;
		var patches;
		var rerender;
		var i;
		var j;
		var stage;

		for (i = 0; i < renderer.stages.length; i++) {
			stage = renderer.stages[i];

			if (stage.isDirty && !stage.isRendering) {
				stage.isRendering = true;

				if (!renderer.stages[i].ashNodeTree) {
					$(stage.node).empty();

					// create Virtual DOM
					stage.ashNodeTree = createAshNodeTree(stage.ashElementTree);

					// render to the Real DOM
					stage.node.appendChild(createNodeTree(stage.ashNodeTree));

					// mount components
					mountComponents(renderer.stages[i].ashElementTree);
				} else {
					newAshNodeTree = createAshNodeTree(stage.ashElementTree);
					patches = diffAshNodeTree(stage.ashNodeTree, newAshNodeTree);
					stage.ashNodeTree = newAshNodeTree;

					requestAnimationFrame(function () {						
						rerender = !patchNodeTree(stage.getRootDOMNode(), patches);

						if (rerender) {
							throw new Error('Patching the DOM was unsuccesful!');
							//$(stage.node).empty();
							//stage.node.appendChild(createNodeTree(stage.ashNodeTree));
						}
					});

					// mount components
					mountComponents(renderer.stages[i].ashElementTree);
				}

				stage.isDirty = false;
				stage.isRendering = false;
			}
		}

		return renderer;
	}
}

function findDirtyComponent(ashElement) {
	if (ashElement.type == ASH_NODE_ASH_ELEMENT) {
		var i;

		for (i = 0; i < ashElement.children.length; i++) {
			// walk the child
			findDirtyComponent(ashElement.children[i]);
		}
	} else if (ashElement.type == COMPONENT_ASH_ELEMENT) {
		if (ashElement.instance.isDirty() && ashElement.instance.shouldUpdate(null)) {
			// descriptor is dirty, let's update
			updateComponentAshElement(ashElement);
		} else {
			// walk the child
			findDirtyComponent(ashElement.children[0]);
		}
	}
}

function updateComponentAshElement(componentAshElement) {
	function walk(oldAshElement, newAshElement) {
		var i;
		
		if (newAshElement.type == COMPONENT_ASH_ELEMENT) {
			if (oldAshElement === null) {
				// old is null, new is component

				// newAshElement must be added as a child...							
				if (newAshElement.parent.type == ASH_NODE_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					createAshElementTree(newAshElement, stage, newAshElement.owner.id, newAshElement.level);

					// replace the old
					newAshElement.parent.children[newAshElement.order] = newAshElement;
				} else if (newAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					createAshElementTree(newAshElement, stage, newAshElement.id, newAshElement.level);

					// replace the old
					newAshElement.parent.children[0] = newAshElement;
				} else {
					throw new Error(newAshElement.parent + ' must be a AshElement object.');
				}
			} else if (oldAshElement.type == COMPONENT_ASH_ELEMENT && newAshElement.spec == oldAshElement.spec) {
				// old is component, new is same component

				if (oldAshElement.instance.shouldUpdate(newAshElement.args[0])) {
					// copy the new to the old...
					oldAshElement.args = newAshElement.args;
					oldAshElement.instance.onBeforeReceiveProps(newAshElement.args[0]);
					oldAshElement.instance.props = newAshElement.args[0];

					// create child for the new descriptor
					newAshElement.children[0] = oldAshElement.instance.__getRender();

					// adding children to the queue
					if (newAshElement.children[0] && oldAshElement.children[0]) {
						newAshElement.children[0].owner = oldAshElement;
						newAshElement.children[0].parent = oldAshElement;
						newAshElement.children[0].order = 0;

						walk(oldAshElement.children[0], newAshElement.children[0]);
					} else if (newAshElement.children[0] && !oldAshElement.children[0]) {
						newAshElement.children[0].owner = oldAshElement;
						newAshElement.children[0].parent = oldAshElement;
						newAshElement.children[0].order = 0;

						walk(null, newAshElement.children[0]);
					}

					// deleting old surplus children
					if (!newAshElement.children[0] && oldAshElement.children[0])
					{
						if (oldAshElement.children[0].type == COMPONENT_ASH_ELEMENT)
						{
							oldAshElement.children[0].instance.unmount();
						}
						
						oldAshElement.children.pop();
					}
				}
			}	else if (oldAshElement.type == COMPONENT_ASH_ELEMENT) {
				// old is component, new is different component

				if (oldAshElement.parent.type == ASH_NODE_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					newAshElement.owner = oldAshElement.owner;
					newAshElement.parent = oldAshElement.parent;
					newAshElement.order = oldAshElement.order;
					createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

					// replace the old
					oldAshElement.instance.unmount();
					oldAshElement.parent.children[oldAshElement.order] = newAshElement;
				} else if (oldAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					newAshElement.owner = oldAshElement.owner;
					newAshElement.parent = oldAshElement.parent;
					newAshElement.order = oldAshElement.order;
					createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);

					// replace the old
					oldAshElement.instance.unmount();
					oldAshElement.parent.children[0] = newAshElement;
				} else {
					throw new Error(oldAshElement.parent + ' must be a AshElement object.');
				}
			} else {
				// old is virtual node, new is component

				if (oldAshElement.parent.type == ASH_NODE_ASH_ELEMENT) {
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
				} else {
					throw new Error(oldAshElement.parent + ' must be a AshElement object.');
				}
			}
		} else {
			if (oldAshElement === null) {
				// old is null, new is virtual node

				// newAshElement must be added as a child...							
				if (newAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					createAshElementTree(newAshElement, stage, newAshElement.id, newAshElement.level);
					
					// replace the old
					newAshElement.parent.children[0] = newAshElement;
				} else if (newAshElement.parent.type == ASH_NODE_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					createAshElementTree(newAshElement, stage, newAshElement.owner.id, newAshElement.level);

					// replace the old
					newAshElement.parent.children[newAshElement.order] = newAshElement;
				} else {
					throw new Error(oldAshElement.parent + ' must be a AshElement object.');
				}
			} else if (newAshElement.type == oldAshElement.type) {
				// old is virtual node, new is virtual node

				oldAshElement.args = newAshElement.args;
				oldAshElement.instantiate();

				// adding children to the queue
				for (i = 0; i < newAshElement.children.length; i++) {
					if (newAshElement.children[i] && oldAshElement.children[i]) {
						newAshElement.children[i].owner = oldAshElement.owner;
						newAshElement.children[i].parent = oldAshElement;
						newAshElement.children[i].order = i;

						walk(oldAshElement.children[i], newAshElement.children[i]);
					} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
						newAshElement.children[i].owner = oldAshElement.owner;
						newAshElement.children[i].parent = oldAshElement;
						newAshElement.children[i].order = i;

						walk(null, newAshElement.children[i]);
					}
				}

				// deleting old surplus children
				while (oldAshElement.children.length > newAshElement.children.length) {
					if (oldAshElement.children[oldAshElement.children.length - 1].type == COMPONENT_ASH_ELEMENT) {
						oldAshElement.children[oldAshElement.children.length - 1].instance.unmount();
					}

					oldAshElement.children.pop();
				}
			} else {
				// old is component, new is virtual node

				if (oldAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					newAshElement.owner = oldAshElement.owner;
					newAshElement.parent = oldAshElement.parent;
					newAshElement.order = oldAshElement.order;
					createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);
					
					// replace the old
					oldAshElement.instance.unmount();
					oldAshElement.parent.children[0] = newAshElement;
				} else if (oldAshElement.parent.type == ASH_NODE_ASH_ELEMENT) {
					// now, the component descriptor's tree is not complete
					newAshElement.owner = oldAshElement.owner;
					newAshElement.parent = oldAshElement.parent;
					newAshElement.order = oldAshElement.order;
					createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

					// replace the old
					oldAshElement.instance.unmount();
					oldAshElement.parent.children[oldAshElement.order] = newAshElement;
				} else {
					throw new Error(oldAshElement.parent + ' must be a AshElement object.');
				}
			}
		}
	}

	// type check
	if (componentAshElement.type != COMPONENT_ASH_ELEMENT) {
		throw new Error(componentAshElement + ' must be a Component type AshElement object.');
	}

	if (componentAshElement.instance.shouldUpdate()) {
		var newRender;

		newRender = componentAshElement.instance.__getRender();
		newRender.owner = componentAshElement;
		newRender.parent = componentAshElement;
		newRender.order = 0;

		walk(componentAshElement.children[0], newRender);
	}
}





















/*class Renderer {
	constructor() {
		if (renderer)
		{
			return renderer;
		}

		if (!(this instanceof Renderer))
		{
			return new Renderer();
		}
			
		this.stages = [];
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	registerComponent(componentDescriptor, node) {
		// type check
		if (!isComponentAshElement(componentDescriptor)) {
			throw new Error(componentDescriptor + ' must be a Componenet Descriptor.');
		}

		// type check
		if (!_.isElement(node)) {
			throw new Error(node + ' must be a DOM Element.');
		}

		// create new stage
		this.stages.push(new Stage(componentDescriptor, node));
		this.stages[this.stages.length - 1].renderer = this;

		this.render();

		return this;
	}
	
	render() {
		var renderer = this;
		var newAshNodeTree;
		var patches;
		var rerender;
		var i;
		var j;
		var stage;

		for (i = 0; i < this.stages.length; i++) {
			if (this.stages[i].__isDirty && !this.stages[i].__isRendering) {
				stage = this.stages[i];
				
				this.stages[i].__isRendering = true;

				if (!this.stages[i].ashNodeTree) {
					$(stage.node).empty();

					// create Virtual DOM
					this.stages[i].ashNodeTree = createAshNodeTree(this.stages[i].ashElementTree);

					// render to the Real DOM
					this.stages[i].node.appendChild(createNodeTree(this.stages[i].ashNodeTree));

					// mount components
					mountComponents(this.stages[i].ashElementTree);
				} else {
					newAshNodeTree = createAshNodeTree(this.stages[i].ashElementTree);
					patches = diffAshNodeTree(this.stages[i].ashNodeTree, newAshNodeTree);
					this.stages[i].ashNodeTree = newAshNodeTree;

					requestAnimationFrame(function () {						
						rerender = !patchNodeTree(stage.getRootDOMNode(), patches);

						if (rerender) {
							throw new Error('Patching the DOM was unsuccesful!');
							//$(stage.node).empty();
							//stage.node.appendChild(createNodeTree(stage.ashNodeTree));
						}
					});

					// mount components
					mountComponents(this.stages[i].ashElementTree);
				}

				this.stages[i].__isDirty = false;
				this.stages[i].__isRendering = false;
			}
		}

		return this;
	}
}*/

module.exports = Renderer;