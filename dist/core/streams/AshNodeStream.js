'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Stream2 = require('./Stream');

var _Stream3 = _interopRequireDefault(_Stream2);

var _classesComponent = require('../classes/Component');

var _classesComponent2 = _interopRequireDefault(_classesComponent);

var _DOMCreateAshElementTree = require('../DOM/createAshElementTree');

var _DOMCreateAshElementTree2 = _interopRequireDefault(_DOMCreateAshElementTree);

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _DOMCreateAshNodeTree = require('../DOM/createAshNodeTree');

var _DOMCreateAshNodeTree2 = _interopRequireDefault(_DOMCreateAshNodeTree);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var LIFECYCLE_UNMOUNTED = _internalsConstants2.default.LIFECYCLE_UNMOUNTED;
var COMPONENT_ASH_ELEMENT = _internalsConstants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _internalsConstants2.default.ASH_NODE_ASH_ELEMENT;

var streamId = 0;

function walkUpdateComponentAshElement(oldAshElement, newAshElement, stream) {
	if (newAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement === null) {
			// old is null, new is component

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[newAshElement.index] = newAshElement;
			} else if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

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
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT) {
			// old is component, new is different component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

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
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

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
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			} else if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[newAshElement.index] = newAshElement;
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
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			}
		}
	}
}

function updateComponentAshElement(componentAshElement, stream) {
	var render = componentAshElement.instance.render();

	render.owner = componentAshElement;
	render.parent = componentAshElement;
	render.index = 0;

	componentAshElement.isDirty = true;

	walkUpdateComponentAshElement(componentAshElement.children[0], render, stream);

	componentAshElement.instance.isDirty = false;
}

var AshNodeStream = (function (_Stream) {
	function AshNodeStream() {
		_classCallCheck(this, AshNodeStream);

		if (_Stream != null) {
			_Stream.apply(this, arguments);
		}

		this.id = streamId++;
		this.ashElementTree = null;
		this.isUpdating = false;
	}

	_inherits(AshNodeStream, _Stream);

	_createClass(AshNodeStream, [{
		key: 'from',
		value: function from(componentAshElement) {
			if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
				throw new Error('' + componentAshElement + ' (componentAshElement) must be an Compoent ashElement object instance.');
			}

			this.ashElementTree = (0, _DOMCreateAshElementTree2.default)(componentAshElement, this);

			return _get(Object.getPrototypeOf(AshNodeStream.prototype), 'from', this).call(this, (0, _DOMCreateAshNodeTree2.default)(this.ashElementTree));
		}
	}, {
		key: 'push',
		value: function push(arg) {
			if (arg instanceof _classesComponent2.default && !this.isUpdating) {
				this.isUpdating = true;

				updateComponentAshElement(arg.__element, this);
				_get(Object.getPrototypeOf(AshNodeStream.prototype), 'push', this).call(this, (0, _DOMCreateAshNodeTree2.default)(this.ashElementTree));

				this.isUpdating = false;
			} else if (arg instanceof _classesComponent2.default && this.isUpdating) {
				throw new Error('You cannot update components during previous update!');
			} else {
				_get(Object.getPrototypeOf(AshNodeStream.prototype), 'push', this).call(this, arg);
			}

			return this;
		}
	}], [{
		key: 'from',
		value: function from(componentAshElement) {
			return new AshNodeStream().from(componentAshElement);
		}
	}]);

	return AshNodeStream;
})(_Stream3.default);

exports.default = AshNodeStream;
module.exports = exports.default;