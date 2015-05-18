'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

// constants references
var ASH_NODE_ASH_ELEMENT = _internalsConstants2.default.ASH_NODE_ASH_ELEMENT;
var COMPONENT_ASH_ELEMENT = _internalsConstants2.default.COMPONENT_ASH_ELEMENT;

/**
 * AshElement
 */

var AshElement = (function () {
	function AshElement(type, Spec) {
		_classCallCheck(this, AshElement);

		if (type !== COMPONENT_ASH_ELEMENT && type !== ASH_NODE_ASH_ELEMENT) {
			throw new Error('' + type + ' "type" must be "' + COMPONENT_ASH_ELEMENT + '" or "' + ASH_NODE_ASH_ELEMENT + '".');
		}

		if (!Spec) {
			throw new Error('' + Spec + ' "Spec" must be specified.');
		}

		if (type === COMPONENT_ASH_ELEMENT) {
			this.type = type;
			this.Spec = Spec;
			this.isDirty = true;

			if (arguments.length >= 3 && typeof arguments[2] !== 'undefined') {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			this.children = [];
		} else {
			this.type = ASH_NODE_ASH_ELEMENT;
			this.Spec = Spec;

			if (arguments.length >= 4 && typeof arguments[2] !== 'undefined' && typeof arguments[3] !== 'undefined') {
				this.args = [arguments[2], arguments[3]];
			} else if (arguments.length >= 3 && typeof arguments[2] !== 'undefined') {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			if (arguments.length >= 5 && arguments[4]) {
				this.children = arguments[4];
			} else {
				this.children = [];
			}
		}

		this.parent = null;
		this.owner = null;
	}

	_createClass(AshElement, [{
		key: 'instantiate',
		value: function instantiate() {
			if (this.type === COMPONENT_ASH_ELEMENT) {
				if (this.args) {
					this.instance = new this.Spec(this.args[0]);
				} else {
					this.instance = new this.Spec();
				}

				this.instance.__element = this;
			} else if (this.type === ASH_NODE_ASH_ELEMENT) {
				if (this.args) {
					this.instance = new this.Spec(this.args[0], this.args[1]);
				} else {
					this.instance = new this.Spec();
				}
			} else {
				throw new Error('' + this + ' is not an AshElement object.');
			}

			return this.instance;
		}
	}]);

	return AshElement;
})();

exports.default = AshElement;
module.exports = exports.default;