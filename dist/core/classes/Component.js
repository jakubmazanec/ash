'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _get = require('babel-runtime/helpers/get').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _Object$getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names').default;

var _Object$getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMFindNode = require('../DOM/findNode');

var _DOMFindNode2 = _interopRequireDefault(_DOMFindNode);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var LIFECYCLE_UNMOUNTED = _internalsConstants2.default.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNINITIALIZED = _internalsConstants2.default.LIFECYCLE_UNINITIALIZED;

var Component = (function (_Observable) {
	function Component() {
		var _this = this;

		var props = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Component);

		_get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this);

		// autobind methods
		var prototype = Object.getPrototypeOf(this);

		_Object$getOwnPropertyNames(prototype).forEach(function (value) {
			var descriptor = _Object$getOwnPropertyDescriptor(prototype, value);

			if (!(descriptor && (typeof descriptor.get !== 'undefined' || typeof descriptor.set !== 'undefined')) && (0, _internalsIsFunction2.default)(_this[value]) && value !== 'constructor') {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props;
		this.state = this.state || {}; // FIXME: should be just this.state = {};

		this.__isDirty = false;
		this.__previousLifecycle = LIFECYCLE_UNINITIALIZED;
		this.__currentLifecycle = LIFECYCLE_UNMOUNTED;
	}

	_inherits(Component, _Observable);

	_createClass(Component, [{
		key: 'isDirty',
		get: function () {
			return this.__isDirty;
		},
		set: function (value) {
			this.__isDirty = !!value;

			if (this.__isDirty && this.__element.stage) {
				this.__element.stage.update(this);
			}
		}
	}, {
		key: '__lifecycle',
		get: function () {
			return this.__currentLifecycle;
		},
		set: function (nextLifecycle) {
			if (nextLifecycle !== LIFECYCLE_UNMOUNTED && nextLifecycle !== LIFECYCLE_MOUNTING && nextLifecycle !== LIFECYCLE_MOUNTED) {
				throw new Error('' + nextLifecycle + ' must be "' + LIFECYCLE_UNMOUNTED + '", "' + LIFECYCLE_MOUNTING + '" or "' + LIFECYCLE_MOUNTED + '". Also, this property is for internal use only. Do not change it!');
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
			if (this.isMounted && (0, _internalsIsAshNodeAshElement2.default)(this.__element.children[0])) {
				return (0, _DOMFindNode2.default)(this.__element.stage.getRootNode(), this.__element.children[0].instance.index);
			}

			return null;
		}
	}, {
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
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return Component;
})(_Observable3.default);

exports.default = Component;
module.exports = exports.default;