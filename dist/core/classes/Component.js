'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMFindNode = require('../DOM/findNode');

var _DOMFindNode2 = _interopRequireDefault(_DOMFindNode);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsAncestor = require('../internals/isAncestor');

var _internalsIsAncestor2 = _interopRequireDefault(_internalsIsAncestor);

var _Stream = require('./Stream');

var _Stream2 = _interopRequireDefault(_Stream);

var LIFECYCLE_UNMOUNTED = _internalsConstants2.default.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNINITIALIZED = _internalsConstants2.default.LIFECYCLE_UNINITIALIZED;

var Component = (function () {
	function Component() {
		var _this = this,
		    _arguments = arguments;

		var props = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		_classCallCheck(this, Component);

		this.__element = null;
		this.__previousLifecycle = LIFECYCLE_UNINITIALIZED;
		this.__currentLifecycle = LIFECYCLE_UNMOUNTED;
		this.props = null;
		this.state = null;

		this.update = function () {
			if (_this.__element.stream) {
				_this.__element.isDirty = true;
				_this.__element.stream.push(true);

				// this.__element.stream.push(this);
			}

			if (_arguments[0] instanceof _Stream2.default) {
				return undefined;
			}

			return _this;
		};

		// autobind methods
		var prototype = Object.getPrototypeOf(this);

		Object.getOwnPropertyNames(prototype).forEach(function (value) {
			var descriptor = Object.getOwnPropertyDescriptor(prototype, value);

			// typeof must be used to avoid executing getter and setters
			if (!(descriptor && (typeof descriptor.get !== 'undefined' || typeof descriptor.set !== 'undefined')) && (0, _internalsIsFunction2.default)(_this[value]) && value !== 'constructor') {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props;

		// references to the component streams
		Object.getOwnPropertyNames(this.constructor).filter(function (value) {
			return value !== 'caller' && value !== 'callee' && value !== 'arguments';
		}).forEach(function (value) {
			if (_this.constructor[value] instanceof _Stream2.default && !_this[value]) {
				_this[value] = _this.constructor[value];
			}
		});
	}

	_createClass(Component, [{
		key: 'shouldUpdate',
		value: function shouldUpdate(newProps) {
			return this.props !== newProps;
		}
	}, {
		key: 'onBeforeMount',
		value: function onBeforeMount() {}
	}, {
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {}
	}, {
		key: 'onBeforeReceiveProps',
		value: function onBeforeReceiveProps() {}
	}, {
		key: 'onRender',
		value: function onRender() {}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}, {
		key: '__lifecycle',
		get: function () {
			return this.__currentLifecycle;
		},
		set: function (nextLifecycle) {
			if (nextLifecycle !== LIFECYCLE_UNMOUNTED && nextLifecycle !== LIFECYCLE_MOUNTING && nextLifecycle !== LIFECYCLE_MOUNTED) {
				throw new Error(nextLifecycle + ' must be "' + LIFECYCLE_UNMOUNTED + '", "' + LIFECYCLE_MOUNTING + '" or "' + LIFECYCLE_MOUNTED + '". Also, this property is for internal use only. Do not change it!');
			}

			this.__previousLifecycle = this.__currentLifecycle;
			this.__currentLifecycle = nextLifecycle;

			if (this.__previousLifecycle !== this.__currentLifecycle) {
				if (this.__currentLifecycle === LIFECYCLE_MOUNTING) {
					this.onBeforeMount();
				} else if (this.__currentLifecycle === LIFECYCLE_MOUNTED) {
					this.onMount();
				} else if (this.__currentLifecycle === LIFECYCLE_UNMOUNTED) {
					this.onUnmount();
				}
			}
		}
	}, {
		key: 'isMounted',
		get: function () {
			return this.__currentLifecycle === LIFECYCLE_MOUNTED;
		}
	}, {
		key: 'domNode',
		get: function () {
			if (this.isMounted && (0, _internalsIsAshNodeAshElement2.default)(this.__element.children[0]) && this.__element.stream.__listeners[0]) {
				var rootNode = this.__element.stream.__listeners[0].rootNode;

				if (rootNode) {
					return (0, _DOMFindNode2.default)(rootNode, this.__element.children[0].instance.id, this.__element.children[0].instance.indices);
				}
			}

			return null;
		}
	}], [{
		key: 'isAncestorOf',
		value: function isAncestorOf(value) {
			return (0, _internalsIsAncestor2.default)(Component, value);
		}
	}]);

	return Component;
})();

exports.default = Component;
module.exports = exports.default;