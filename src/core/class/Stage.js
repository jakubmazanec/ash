'use strict';

var _ = require('_');

var AshElement = require('./AshElement');
var createAshElementTree = require('../DOM/createAshElementTree');
var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var constants = require('../internal/constants');

// constants references
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;
var INDEX_ATTRIBUTE = constants.INDEX_ATTRIBUTE_NAME;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

var id = 0;

class Stage {
	constructor(componentDescriptor, domNode) {
		this.id = id;
		id++;

		// set up stage state
		this.__isRendering = false;
		this.__isDirty = true;

		// set up components
		componentDescriptor.stage = this;
		this.descriptorTree = createAshElementTree(componentDescriptor, this);
		this.descriptorTree.isRoot = true;

		// set up DOM root
		this.domNode = domNode;

		// set up Virtual DOM
		this.virtualDOM = null;

		// set up events
		this.events = {};
	}

	getRootDOMNode() {
		var i;

		for (i = 0; i < this.domNode.childNodes.length; i++) {
			if (typeof this.domNode.childNodes[i][INDEX_ATTRIBUTE] !== 'undefined') {
				return this.domNode.childNodes[i];
			}
		}

		return null;
	}

	update() {
		var stage = this;

		function updateDescriptor(dirtyComponentDescriptor) {
			function traverseDescriptors(oldRoot, newRoot) {
				var oldQueue = [oldRoot];
				var newQueue = [newRoot];
				var oldDescriptor;
				var newDescriptor;
				var i;

				while (newQueue.length > 0) {
					newDescriptor = newQueue.shift();
					oldDescriptor = oldQueue.shift();

					// compare nodes...
					if (newDescriptor.type == COMPONENT_ASH_ELEMENT) {
						if (oldDescriptor === null) {
							// old is null, new is component

							// newDescriptor must be added as a child...							
							if (newDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								createAshElementTree(newDescriptor, stage, newDescriptor.owner.id, newDescriptor.level);

								// replace the old
								newDescriptor.parent.children[newDescriptor.order] = newDescriptor;
							} else if (newDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								createAshElementTree(newDescriptor, stage, newDescriptor.id, newDescriptor.level);

								// replace the old
								newDescriptor.parent.children[0] = newDescriptor;
							} else {
								throw new Error(newDescriptor.parent + ' must be a AshElement object.');
							}
						} else if (oldDescriptor.type == COMPONENT_ASH_ELEMENT && newDescriptor.spec == oldDescriptor.spec) {
							// old is component, new is same component

							if (oldDescriptor.instance.shouldUpdate(newDescriptor.args[0])) {
								// copy the new to the old...
								oldDescriptor.args = newDescriptor.args;
								oldDescriptor.instance.onBeforeReceiveProps(newDescriptor.args[0]);
								oldDescriptor.instance.props = newDescriptor.args[0];

								// create child for the new descriptor
								newDescriptor.children[0] = oldDescriptor.instance.__getRender();

								// adding children to the queue
								if (newDescriptor.children[0] && oldDescriptor.children[0]) {
									newDescriptor.children[0].owner = oldDescriptor;
									newDescriptor.children[0].parent = oldDescriptor;
									newDescriptor.children[0].order = 0;

									newQueue.push(newDescriptor.children[0]);
									oldQueue.push(oldDescriptor.children[0]);
								} else if (newDescriptor.children[0] && !oldDescriptor.children[0]) {
									newDescriptor.children[0].owner = oldDescriptor;
									newDescriptor.children[0].parent = oldDescriptor;
									newDescriptor.children[0].order = 0;

									newQueue.push(newDescriptor.children[0]);
									oldQueue.push(null);
								}

								// deleting old surplus children
								if (!newDescriptor.children[0] && oldDescriptor.children[0]) {
									if (oldDescriptor.children[0].type == COMPONENT_ASH_ELEMENT) {
										oldDescriptor.children[0].instance.unmount();
									}
									
									oldDescriptor.children.pop();
								}
							}
						}	else if (oldDescriptor.type == COMPONENT_ASH_ELEMENT) {
							// old is component, new is different component

							if (oldDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								newDescriptor.owner = oldDescriptor.owner;
								newDescriptor.parent = oldDescriptor.parent;
								newDescriptor.order = oldDescriptor.order;
								createAshElementTree(newDescriptor, stage, oldDescriptor.owner.id, oldDescriptor.level);

								// replace the old
								oldDescriptor.instance.unmount();
								oldDescriptor.parent.children[oldDescriptor.order] = newDescriptor;
							} else if (oldDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								newDescriptor.owner = oldDescriptor.owner;
								newDescriptor.parent = oldDescriptor.parent;
								newDescriptor.order = oldDescriptor.order;
								createAshElementTree(newDescriptor, stage, oldDescriptor.id, oldDescriptor.level);

								// replace the old
								oldDescriptor.instance.unmount();
								oldDescriptor.parent.children[0] = newDescriptor;
							} else {
								throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
							}
						} else {
							// old is virtual node, new is component

							if (oldDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								newDescriptor.owner = oldDescriptor.owner;
								newDescriptor.parent = oldDescriptor.parent;
								newDescriptor.order = oldDescriptor.order;
								createAshElementTree(newDescriptor, stage, oldDescriptor.owner.id, oldDescriptor.level);

								// replace the old
								oldDescriptor.parent.children[oldDescriptor.order] = newDescriptor;
							} else if (oldDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								newDescriptor.owner = oldDescriptor.owner;
								newDescriptor.parent = oldDescriptor.parent;
								newDescriptor.order = oldDescriptor.order;
								createAshElementTree(newDescriptor, stage, oldDescriptor.id, oldDescriptor.level);

								// replace the old
								oldDescriptor.parent.children[0] = newDescriptor;
							} else {
								throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
							}
						}
					} else {
						if (oldDescriptor === null) {
							// old is null, new is virtual node

							// newDescriptor must be added as a child...							
							if (newDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								createAshElementTree(newDescriptor, stage, newDescriptor.id, newDescriptor.level);
								
								// replace the old
								newDescriptor.parent.children[0] = newDescriptor;
							} else if (newDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								createAshElementTree(newDescriptor, stage, newDescriptor.owner.id, newDescriptor.level);

								// replace the old
								newDescriptor.parent.children[newDescriptor.order] = newDescriptor;
							} else {
								throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
							}
						} else if (newDescriptor.type == oldDescriptor.type) {
							// old is virtual node, new is virtual node

							oldDescriptor.args = newDescriptor.args;
							oldDescriptor.instantiate();

							// adding children to the queue
							for (i = 0; i < newDescriptor.children.length; i++) {
								if (newDescriptor.children[i] && oldDescriptor.children[i]) {
									newDescriptor.children[i].owner = oldDescriptor.owner;
									newDescriptor.children[i].parent = oldDescriptor;
									newDescriptor.children[i].order = i;

									newQueue.push(newDescriptor.children[i]);
									oldQueue.push(oldDescriptor.children[i]);
								} else if (newDescriptor.children[i] && !oldDescriptor.children[i]) {
									newDescriptor.children[i].owner = oldDescriptor.owner;
									newDescriptor.children[i].parent = oldDescriptor;
									newDescriptor.children[i].order = i;

									newQueue.push(newDescriptor.children[i]);
									oldQueue.push(null);
								}
							}

							// deleting old surplus children
							while (oldDescriptor.children.length > newDescriptor.children.length) {
								if (oldDescriptor.children[oldDescriptor.children.length - 1].type == COMPONENT_ASH_ELEMENT) {
									oldDescriptor.children[oldDescriptor.children.length - 1].instance.unmount();
								}

								oldDescriptor.children.pop();
							}
						} else {
							// old is component, new is virtual node

							if (oldDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								newDescriptor.owner = oldDescriptor.owner;
								newDescriptor.parent = oldDescriptor.parent;
								newDescriptor.order = oldDescriptor.order;
								createAshElementTree(newDescriptor, stage, oldDescriptor.id, oldDescriptor.level);
								
								// replace the old
								oldDescriptor.instance.unmount();
								oldDescriptor.parent.children[0] = newDescriptor;
							} else if (oldDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
								// now, the component descriptor's tree is not complete
								newDescriptor.owner = oldDescriptor.owner;
								newDescriptor.parent = oldDescriptor.parent;
								newDescriptor.order = oldDescriptor.order;
								createAshElementTree(newDescriptor, stage, oldDescriptor.owner.id, oldDescriptor.level);

								// replace the old
								oldDescriptor.instance.unmount();
								oldDescriptor.parent.children[oldDescriptor.order] = newDescriptor;
							} else {
								throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
							}
						}
					}
				}
			}

			function walk(oldDescriptor, newDescriptor) {
				var i;
				
				if (newDescriptor.type == COMPONENT_ASH_ELEMENT) {
					if (oldDescriptor === null) {
						// old is null, new is component

						// newDescriptor must be added as a child...							
						if (newDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							createAshElementTree(newDescriptor, stage, newDescriptor.owner.id, newDescriptor.level);

							// replace the old
							newDescriptor.parent.children[newDescriptor.order] = newDescriptor;
						} else if (newDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							createAshElementTree(newDescriptor, stage, newDescriptor.id, newDescriptor.level);

							// replace the old
							newDescriptor.parent.children[0] = newDescriptor;
						} else {
							throw new Error(newDescriptor.parent + ' must be a AshElement object.');
						}
					} else if (oldDescriptor.type == COMPONENT_ASH_ELEMENT && newDescriptor.spec == oldDescriptor.spec) {
						// old is component, new is same component

						if (oldDescriptor.instance.shouldUpdate(newDescriptor.args[0])) {
							// copy the new to the old...
							oldDescriptor.args = newDescriptor.args;
							oldDescriptor.instance.onBeforeReceiveProps(newDescriptor.args[0]);
							oldDescriptor.instance.props = newDescriptor.args[0];

							// create child for the new descriptor
							newDescriptor.children[0] = oldDescriptor.instance.__getRender();

							// adding children to the queue
							if (newDescriptor.children[0] && oldDescriptor.children[0]) {
								newDescriptor.children[0].owner = oldDescriptor;
								newDescriptor.children[0].parent = oldDescriptor;
								newDescriptor.children[0].order = 0;

								walk(oldDescriptor.children[0], newDescriptor.children[0]);
							} else if (newDescriptor.children[0] && !oldDescriptor.children[0]) {
								newDescriptor.children[0].owner = oldDescriptor;
								newDescriptor.children[0].parent = oldDescriptor;
								newDescriptor.children[0].order = 0;

								walk(null, newDescriptor.children[0]);
							}

							// deleting old surplus children
							if (!newDescriptor.children[0] && oldDescriptor.children[0])
							{
								if (oldDescriptor.children[0].type == COMPONENT_ASH_ELEMENT)
								{
									oldDescriptor.children[0].instance.unmount();
								}
								
								oldDescriptor.children.pop();
							}
						}
					}	else if (oldDescriptor.type == COMPONENT_ASH_ELEMENT) {
						// old is component, new is different component

						if (oldDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							newDescriptor.owner = oldDescriptor.owner;
							newDescriptor.parent = oldDescriptor.parent;
							newDescriptor.order = oldDescriptor.order;
							createAshElementTree(newDescriptor, stage, oldDescriptor.owner.id, oldDescriptor.level);

							// replace the old
							oldDescriptor.instance.unmount();
							oldDescriptor.parent.children[oldDescriptor.order] = newDescriptor;
						} else if (oldDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							newDescriptor.owner = oldDescriptor.owner;
							newDescriptor.parent = oldDescriptor.parent;
							newDescriptor.order = oldDescriptor.order;
							createAshElementTree(newDescriptor, stage, oldDescriptor.id, oldDescriptor.level);

							// replace the old
							oldDescriptor.instance.unmount();
							oldDescriptor.parent.children[0] = newDescriptor;
						} else {
							throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
						}
					} else {
						// old is virtual node, new is component

						if (oldDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							newDescriptor.owner = oldDescriptor.owner;
							newDescriptor.parent = oldDescriptor.parent;
							newDescriptor.order = oldDescriptor.order;
							createAshElementTree(newDescriptor, stage, oldDescriptor.owner.id, oldDescriptor.level);

							// replace the old
							oldDescriptor.parent.children[oldDescriptor.order] = newDescriptor;
						} else if (oldDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							newDescriptor.owner = oldDescriptor.owner;
							newDescriptor.parent = oldDescriptor.parent;
							newDescriptor.order = oldDescriptor.order;
							createAshElementTree(newDescriptor, stage, oldDescriptor.id, oldDescriptor.level);

							// replace the old
							oldDescriptor.parent.children[0] = newDescriptor;
						} else {
							throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
						}
					}
				} else {
					if (oldDescriptor === null) {
						// old is null, new is virtual node

						// newDescriptor must be added as a child...							
						if (newDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							createAshElementTree(newDescriptor, stage, newDescriptor.id, newDescriptor.level);
							
							// replace the old
							newDescriptor.parent.children[0] = newDescriptor;
						} else if (newDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							createAshElementTree(newDescriptor, stage, newDescriptor.owner.id, newDescriptor.level);

							// replace the old
							newDescriptor.parent.children[newDescriptor.order] = newDescriptor;
						} else {
							throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
						}
					} else if (newDescriptor.type == oldDescriptor.type) {
						// old is virtual node, new is virtual node

						oldDescriptor.args = newDescriptor.args;
						oldDescriptor.instantiate();

						// adding children to the queue
						for (i = 0; i < newDescriptor.children.length; i++) {
							if (newDescriptor.children[i] && oldDescriptor.children[i]) {
								newDescriptor.children[i].owner = oldDescriptor.owner;
								newDescriptor.children[i].parent = oldDescriptor;
								newDescriptor.children[i].order = i;

								walk(oldDescriptor.children[i], newDescriptor.children[i]);
							} else if (newDescriptor.children[i] && !oldDescriptor.children[i]) {
								newDescriptor.children[i].owner = oldDescriptor.owner;
								newDescriptor.children[i].parent = oldDescriptor;
								newDescriptor.children[i].order = i;

								walk(null, newDescriptor.children[i]);
							}
						}

						// deleting old surplus children
						while (oldDescriptor.children.length > newDescriptor.children.length) {
							if (oldDescriptor.children[oldDescriptor.children.length - 1].type == COMPONENT_ASH_ELEMENT) {
								oldDescriptor.children[oldDescriptor.children.length - 1].instance.unmount();
							}

							oldDescriptor.children.pop();
						}
					} else {
						// old is component, new is virtual node

						if (oldDescriptor.parent.type == COMPONENT_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							newDescriptor.owner = oldDescriptor.owner;
							newDescriptor.parent = oldDescriptor.parent;
							newDescriptor.order = oldDescriptor.order;
							createAshElementTree(newDescriptor, stage, oldDescriptor.id, oldDescriptor.level);
							
							// replace the old
							oldDescriptor.instance.unmount();
							oldDescriptor.parent.children[0] = newDescriptor;
						} else if (oldDescriptor.parent.type == ASH_NODE_ASH_ELEMENT) {
							// now, the component descriptor's tree is not complete
							newDescriptor.owner = oldDescriptor.owner;
							newDescriptor.parent = oldDescriptor.parent;
							newDescriptor.order = oldDescriptor.order;
							createAshElementTree(newDescriptor, stage, oldDescriptor.owner.id, oldDescriptor.level);

							// replace the old
							oldDescriptor.instance.unmount();
							oldDescriptor.parent.children[oldDescriptor.order] = newDescriptor;
						} else {
							throw new Error(oldDescriptor.parent + ' must be a AshElement object.');
						}
					}
				}
			}

			// type check
			if (dirtyComponentDescriptor.type != COMPONENT_ASH_ELEMENT) {
				throw new Error(dirtyComponentDescriptor + ' must be a Component type AshElement object.');
			}

			if (dirtyComponentDescriptor.instance.shouldUpdate()) {
				var newRender;

				newRender = dirtyComponentDescriptor.instance.__getRender();
				newRender.owner = dirtyComponentDescriptor;
				newRender.parent = dirtyComponentDescriptor;
				newRender.order = 0;

				//traverseDescriptors(dirtyComponentDescriptor.children[0], newRender);
				walk(dirtyComponentDescriptor.children[0], newRender);
			}
		}
		
		function findDirtyDescriptor(descriptor) {
			if (descriptor.type == ASH_NODE_ASH_ELEMENT) {
				var i;

				for (i = 0; i < descriptor.children.length; i++) {
					// walk the child
					findDirtyDescriptor(descriptor.children[i]);
				}
			} else if (descriptor.type == COMPONENT_ASH_ELEMENT) {
				if (descriptor.instance.isDirty() && descriptor.instance.shouldUpdate(null)) {
					// descriptor is dirty, let's update
					updateDescriptor(descriptor);
				} else {
					// walk the child
					findDirtyDescriptor(descriptor.children[0]);
				}
			}
		}

		//console.log('stage update', performance.now() - window.dispatcherTimestamp);

		// find descriptors that should be updated
		findDirtyDescriptor(stage.descriptorTree);

		// set stage to dirty, so Renderer can rerender the DOM
		stage.__isDirty = true;
		stage.renderer.__render();

		return stage;
	}
}

module.exports = Stage;