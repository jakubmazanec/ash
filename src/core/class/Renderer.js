'use strict';

var _ = require('_');
var $ = require('jquery');

var createAshElementTree = require('../DOM/createAshElementTree');
var isAshNode = require('../internal/isAshNode');
var isAshTextNode = require('../internal/isAshTextNode');
var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var createAshNodeTree = require('../DOM/createAshNodeTree');
var createNodeTree = require('../DOM/createNodeTree');
var diffAshNodeTree = require('../DOM/diffAshNodeTree');
var patchNodeTree = require('../DOM/patchNodeTree');
var stringifyAshNodeTree = require('../DOM/stringifyAshNodeTree');
var validateNodeTree = require('../DOM/validateNodeTree');
var constants = require('../internal/constants');

var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;
var ASH_NODE = constants.ASH_NODE;
var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

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
			id: stageId,
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

	componentToString(componentAshElement) {
		var renderer = this;
		var stage;
		var html;

		// type check
		if (!isComponentAshElement(componentAshElement)) {
			throw new Error(componentAshElement + ' must be a Componenet Descriptor.');
		}

		stage = {
			isRendering: false,
			isDirty: true,

			node: null,
			ashNodeTree: null
		};

		// create Ash Element tree for the Component Ash Element
		stage.ashElementTree = createAshElementTree(componentAshElement, stage);

		// create Virtual DOM
		stage.ashNodeTree = createAshNodeTree(stage.ashElementTree);

		return stringifyAshNodeTree(stage.ashNodeTree);
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
		var validNodeTree;

		for (i = 0; i < renderer.stages.length; i++) {
			stage = renderer.stages[i];

			if (stage.isDirty && !stage.isRendering) {
				stage.isRendering = true;

				if (!renderer.stages[i].ashNodeTree) {
					validNodeTree = false;

					// remove child nodes which are not element nodes
					for (j = 0; j < stage.node.childNodes.length; j++) {
						if (stage.node.childNodes[j].nodeType != 1) {
							stage.node.removeChild(stage.node.childNodes[j]);
							j--;
						}
					}

					// create Virtual DOM
					stage.ashNodeTree = createAshNodeTree(stage.ashElementTree);

					// there are some element nodes?
					if (stage.node.childNodes.length) {
						validNodeTree = validateNodeTree(stage.node.childNodes[0], stage.ashNodeTree, stage);
					}

					// render to the Real DOM, if needed
					if (!validNodeTree)
					{
						console.log('existing html is invalid!');
						$(stage.node).empty();
						stage.node.appendChild(createNodeTree(stage.ashNodeTree));
					}

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
						}
					});

					// mount components
					mountComponents(stage.ashElementTree);
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

function walkUpdateComponentAshElement(oldAshElement, newAshElement) {
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

					walkUpdateComponentAshElement(oldAshElement.children[0], newAshElement.children[0]);
				} else if (newAshElement.children[0] && !oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].order = 0;

					walkUpdateComponentAshElement(null, newAshElement.children[0]);
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

					walkUpdateComponentAshElement(oldAshElement.children[i], newAshElement.children[i]);
				} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].order = i;

					walkUpdateComponentAshElement(null, newAshElement.children[i]);
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

function updateComponentAshElement(componentAshElement) {
	// type check
	if (componentAshElement.type != COMPONENT_ASH_ELEMENT) {
		throw new Error(componentAshElement + ' must be a Component type AshElement object.');
	}

	if (componentAshElement.instance.shouldUpdate()) {
		var render;

		render = componentAshElement.instance.__getRender();
		render.owner = componentAshElement;
		render.parent = componentAshElement;
		render.order = 0;

		walkUpdateComponentAshElement(componentAshElement.children[0], render);
	}
}

function walkMountComponents(ashElement)
{
	var i;

	if (isAshNodeAshElement(ashElement))
	{
		for (i = 0; i < ashElement.children.length; i++)
		{
			if (ashElement.children[i])
			{
				// walk the child
				walkMountComponents(ashElement.children[i]);
			}
		}
	} else if (isComponentAshElement(ashElement))
	{
		if (ashElement.instance && ashElement.instance.__lifecycle == LIFECYCLE_MOUNTING)
		{
			ashElement.instance.mount();
		}

		// walk the child
		if (ashElement.children[0])
		{
			walkMountComponents(ashElement.children[0]);
		}
	}
}

function mountComponents(componentAshElement)
{
	// type check
	if (!isComponentAshElement(componentAshElement))
	{
		throw new Error(componentAshElement + ' must be a Component type AshElement object.');
	}

	if (componentAshElement.instance && componentAshElement.instance.__lifecycle == LIFECYCLE_MOUNTING)
	{
		componentAshElement.instance.mount();
	}

	if (componentAshElement.children[0])
	{
		// walk the child
		walkMountComponents(componentAshElement.children[0]);
	}

	// return resulting componentAshElement tree 
	return componentAshElement;
}

module.exports = Renderer;