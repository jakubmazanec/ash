'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _DOMCreateAshElementTree = require('../DOM/createAshElementTree');

var _DOMCreateAshElementTree2 = _interopRequireDefault(_DOMCreateAshElementTree);

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _DOMCreateAshNodeTree = require('../DOM/createAshNodeTree');

var _DOMCreateAshNodeTree2 = _interopRequireDefault(_DOMCreateAshNodeTree);

var _DOMCreateNodeTree = require('../DOM/createNodeTree');

var _DOMCreateNodeTree2 = _interopRequireDefault(_DOMCreateNodeTree);

var _DOMDiffAshNodeTree = require('../DOM/diffAshNodeTree');

var _DOMDiffAshNodeTree2 = _interopRequireDefault(_DOMDiffAshNodeTree);

var _DOMPatchNodeTree = require('../DOM/patchNodeTree');

var _DOMPatchNodeTree2 = _interopRequireDefault(_DOMPatchNodeTree);

var _DOMStringifyAshNodeTree = require('../DOM/stringifyAshNodeTree');

var _DOMStringifyAshNodeTree2 = _interopRequireDefault(_DOMStringifyAshNodeTree);

var _DOMValidateNodeTree = require('../DOM/validateNodeTree');

var _DOMValidateNodeTree2 = _interopRequireDefault(_DOMValidateNodeTree);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsElement = require('../internals/isElement');

var _internalsIsElement2 = _interopRequireDefault(_internalsIsElement);

var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNMOUNTED = _internalsConstants2.default.LIFECYCLE_UNMOUNTED;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var COMPONENT_ASH_ELEMENT = _internalsConstants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _internalsConstants2.default.ASH_NODE_ASH_ELEMENT;

var stageId = 0;
var renderer;

function walkUpdateComponentAshElement(oldAshElement, newAshElement, stage) {
	if (newAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement === null) {
			// old is null, new is component

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				newAshElement.parent.children[newAshElement.order] = newAshElement;
			} else if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

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
					if (oldAshElement.children[0].type === COMPONENT_ASH_ELEMENT) {
						oldAshElement.children[0].instance.__lifecycle = LIFECYCLE_UNMOUNTED;
					}

					oldAshElement.children.pop();
				}
			}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT) {
			// old is component, new is different component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

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
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

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
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			} else if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				newAshElement.parent.children[newAshElement.order] = newAshElement;
			}
		} else if (newAshElement.type === oldAshElement.type) {
			// old is virtual node, new is virtual node

			oldAshElement.args = newAshElement.args;
			oldAshElement.instantiate();

			// adding children to the queue
			for (var i = 0; i < newAshElement.children.length; i++) {
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
				newAshElement.order = oldAshElement.order;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stage);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			}
		}
	}
}

function updateComponentAshElement(componentAshElement, stage) {
	var render = componentAshElement.instance.render();
	render.owner = componentAshElement;
	render.parent = componentAshElement;
	render.order = 0;

	componentAshElement.isDirty = true;

	walkUpdateComponentAshElement(componentAshElement.children[0], render, stage);

	componentAshElement.instance.isDirty = false;
}

function mountComponents(ashElement) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// walk the child
				mountComponents(ashElement.children[i]);
			}
		}
	} else if ((0, _internalsIsComponentAshElement2.default)(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle === LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		// walk the child
		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

function getStageRootNode(stageId) {
	for (var i = 0; i < this.stages[stageId].node.childNodes.length; i++) {
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

var Renderer = (function () {
	function Renderer() {
		_classCallCheck(this, Renderer);

		this.stages = [];

		if (renderer) {
			return renderer;
		}

		// save singleton
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	_createClass(Renderer, [{
		key: 'addComponent',
		value: function addComponent(componentAshElement, node) {
			// type check
			if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
				throw new Error(componentAshElement + ' must be a Componenet Descriptor.');
			}

			if (!(0, _internalsIsElement2.default)(node)) {
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
			this.stages[stageId].ashElementTree = (0, _DOMCreateAshElementTree2.default)(componentAshElement, this.stages[stageId]);
			stageId++;

			// render
			this.render();

			return this;
		}
	}, {
		key: 'componentToString',
		value: function componentToString(componentAshElement) {
			// type check
			if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
				throw new Error(componentAshElement + ' must be a Componenet Descriptor.');
			}

			var stage = {
				isRendering: false,
				isDirty: true,
				node: null,
				ashNodeTree: null
			};

			// create Ash Element tree for the Component Ash Element
			stage.ashElementTree = (0, _DOMCreateAshElementTree2.default)(componentAshElement, stage);

			// create ash node tree
			stage.ashNodeTree = (0, _DOMCreateAshNodeTree2.default)(stage.ashElementTree);

			return (0, _DOMStringifyAshNodeTree2.default)(stage.ashNodeTree);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var isNodeTreeValid;
			var isNodeTreeValidated;
			var newAshNodeTree;
			var patches;

			var _loop = function (i) {
				if (_this.stages[i].isDirty /* && !this.stages[i].isRendering*/) {
					if (!_this.stages[i].ashNodeTree) {
						isNodeTreeValid = false;
						isNodeTreeValidated = false;

						// remove child nodes which are not element nodes
						for (var j = 0; j < _this.stages[i].node.childNodes.length; j++) {
							if (_this.stages[i].node.childNodes[j].nodeType !== 1) {
								_this.stages[i].node.removeChild(_this.stages[i].node.childNodes[j]);
								j--;
							}
						}

						// create ash node tree
						_this.stages[i].ashNodeTree = (0, _DOMCreateAshNodeTree2.default)(_this.stages[i].ashElementTree);

						// there are some element nodes?
						if (_this.stages[i].node.childNodes.length) {
							isNodeTreeValidated = true;
							isNodeTreeValid = (0, _DOMValidateNodeTree2.default)(_this.stages[i].node.childNodes[0], _this.stages[i].ashNodeTree, _this.stages[i]);
						}

						// render to the Real DOM, if needed
						if (!isNodeTreeValid || !isNodeTreeValidated) {
							if (isNodeTreeValidated) {
								console.warn('Existing html is invalid!');
							}

							while (_this.stages[i].node.firstChild) {
								_this.stages[i].node.removeChild(_this.stages[i].node.firstChild);
							}

							_this.stages[i].isRendering = true;

							global.requestAnimationFrame(function (timestamp) {
								_this.stages[i].node.appendChild((0, _DOMCreateNodeTree2.default)(_this.stages[i].ashNodeTree));

								// mount components
								mountComponents(_this.stages[i].ashElementTree);

								_this.stages[i].isRendering = false;
							});
						}if (isNodeTreeValid && isNodeTreeValidated) {
							// mount components
							mountComponents(_this.stages[i].ashElementTree);
						}
					} else {
						newAshNodeTree = (0, _DOMCreateAshNodeTree2.default)(_this.stages[i].ashElementTree);
						patches = (0, _DOMDiffAshNodeTree2.default)(_this.stages[i].ashNodeTree, newAshNodeTree);
						_this.stages[i].ashNodeTree = newAshNodeTree;

						_this.stages[i].isRendering = true;

						global.requestAnimationFrame(function (timestamp) {
							var isSuccessful = (0, _DOMPatchNodeTree2.default)(_this.stages[i].getRootNode(), patches);

							if (!isSuccessful) {
								throw new Error('Patching the DOM was unsuccesful!');
							}

							// mount components
							mountComponents(_this.stages[i].ashElementTree);

							_this.stages[i].isRendering = false;
						});
					}

					_this.stages[i].isDirty = false;
					_this.stages[i].isUpdating = false;
				}
			};

			for (var i = 0; i < this.stages.length; i++) {
				_loop(i);
			}

			return this;
		}
	}]);

	return Renderer;
})();

exports.default = Renderer;
module.exports = exports.default;