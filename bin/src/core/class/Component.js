"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var isAshNodeAshElement = _interopRequire(require("../internal/isAshNodeAshElement"));

var constants = _interopRequire(require("../internal/constants"));

var findNode = _interopRequire(require("../DOM/findNode"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNINITIALIZED = constants.LIFECYCLE_UNINITIALIZED;

var Component = (function (Observable) {
	function Component(props) {
		var _this = this;

		_classCallCheck(this, Component);

		// autobind methods
		Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(function (value) {
			if (isFunction(_this[value]) && value !== "constructor") {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props || {};
		this.state = this.state || {};

		this.__isDirty = false;
		this.__previousLifecycle = LIFECYCLE_UNINITIALIZED;
		this.__currentLifecycle = LIFECYCLE_UNMOUNTED;
	}

	_inherits(Component, Observable);

	_prototypeProperties(Component, null, {
		isDirty: {
			get: function () {
				return this.__isDirty;
			},
			set: function (value) {
				this.__isDirty = !!value;

				if (this.__isDirty && this.__element.stage) {
					this.__element.stage.update(this);
				}
			},
			configurable: true
		},
		__lifecycle: {
			get: function () {
				return this.__currentLifecycle;
			},
			set: function (nextLifecycle) {
				if (nextLifecycle !== LIFECYCLE_UNMOUNTED && nextLifecycle !== LIFECYCLE_MOUNTING && nextLifecycle !== LIFECYCLE_MOUNTED) {
					throw new Error("" + nextLifecycle + " must be \"" + LIFECYCLE_UNMOUNTED + "\", \"" + LIFECYCLE_MOUNTING + "\" or \"" + LIFECYCLE_MOUNTED + "\". Also, this property is for internal use only. Do not change it!");
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
			},
			configurable: true
		},
		isMounted: {
			get: function () {
				return this.__currentLifecycle === LIFECYCLE_MOUNTED;
			},
			configurable: true
		},
		cachedRender: {
			get: function () {
				this.__cachedRender = this.render();

				return this.__cachedRender;
			},
			configurable: true
		},
		domNode: {
			get: function () {
				if (this.isMounted && isAshNodeAshElement(this.__cachedRender)) {
					return findNode(this.__element.stage.getRootNode(), this.__cachedRender.instance.index);
				}

				return null;
			},
			configurable: true
		},
		shouldUpdate: {
			value: function shouldUpdate(newProps) {
				return this.props !== newProps;
			},
			writable: true,
			configurable: true
		},
		onBeforeMount: {
			value: function onBeforeMount() {},
			writable: true,
			configurable: true
		},
		onMount: {
			value: function onMount() {},
			writable: true,
			configurable: true
		},
		onUnmount: {
			value: function onUnmount() {},
			writable: true,
			configurable: true
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return null;
			},
			writable: true,
			configurable: true
		}
	});

	return Component;
})(Observable);

module.exports = Component;