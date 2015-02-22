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

var Component = (function (Observable) {
	function Component(props) {
		var _this = this;

		_classCallCheck(this, Component);

		// autobind methods
		Object.getOwnPropertyNames(this.__proto__).forEach(function (value) {
			if (isFunction(_this[value]) && value !== "constructor") {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props || {};
		this.state = this.state || {};

		this.__isDirty = true;
		this.__lifecycle = LIFECYCLE_UNMOUNTED;
	}

	_inherits(Component, Observable);

	_prototypeProperties(Component, null, {
		isDirty: {
			get: function () {
				return this.__isDirty;
			},
			set: function (value) {
				this.__isDirty = !!value;

				if (this.__isDirty && this.element.stage) {
					this.element.stage.update();
				}
			},
			configurable: true
		},
		lifecycle: {
			get: function () {
				return this.__lifecycle;
			},
			set: function (value) {
				if (value != LIFECYCLE_UNMOUNTED && value != LIFECYCLE_MOUNTING && value != LIFECYCLE_MOUNTED) {
					throw new Error(value + " must be \"Unmounted\", \"Mounting\" or \"Mounted\".");
				}

				this.__lifecycle = value;
			},
			configurable: true
		},
		isMounted: {
			get: function () {
				return this.__lifecycle === LIFECYCLE_MOUNTED;
			},
			configurable: true
		},
		cachedRender: {
			get: function () {
				this.__cachedRender = this.render();
				this.isDirty = false;

				return this.__cachedRender;
			},
			configurable: true
		},
		domNode: {
			get: function () {
				if (this.isMounted && isAshNodeAshElement(this.__cachedRender)) {
					return findNode(this.element.stage.getRootNode(), this.__cachedRender.instance.index);
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