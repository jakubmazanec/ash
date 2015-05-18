'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _get = require('babel-runtime/helpers/get').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var TRIGGER_OPTIONS = {
	noEventArgument: true
};

var Action = (function (_Observable) {
	function Action() {
		_classCallCheck(this, Action);

		if (_Observable != null) {
			_Observable.apply(this, arguments);
		}
	}

	_inherits(Action, _Observable);

	_createClass(Action, [{
		key: 'trigger',
		value: function trigger() {
			if (typeof this.onTrigger === 'function') {
				_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', this.onTrigger.apply(this, arguments), TRIGGER_OPTIONS);
			} else {
				if (arguments.length == 10) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
				} else if (arguments.length == 9) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
				} else if (arguments.length == 8) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
				} else if (arguments.length == 7) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
				} else if (arguments.length == 6) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
				} else if (arguments.length == 5) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
				} else if (arguments.length == 4) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
				} else if (arguments.length == 3) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
				} else if (arguments.length == 2) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], TRIGGER_OPTIONS);
				} else if (arguments.length) {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', arguments[0], TRIGGER_OPTIONS);
				} else {
					_get(Object.getPrototypeOf(Action.prototype), 'trigger', this).call(this, 'all', TRIGGER_OPTIONS);
				}
			}

			return this;
		}
	}]);

	return Action;
})(_Observable3.default);

exports.default = Action;
module.exports = exports.default;
/*data*/