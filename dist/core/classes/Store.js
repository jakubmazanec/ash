'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _get = require('babel-runtime/helpers/get').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var TRIGGER_OPTIONS = {
	noEventArgument: true
};

var Store = (function (_Observable) {
	function Store() {
		_classCallCheck(this, Store);

		if (_Observable != null) {
			_Observable.apply(this, arguments);
		}
	}

	_inherits(Store, _Observable);

	_createClass(Store, [{
		key: 'trigger',
		value: function trigger() {
			if (arguments.length === 10) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
			} else if (arguments.length === 9) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
			} else if (arguments.length === 8) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
			} else if (arguments.length === 7) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
			} else if (arguments.length === 6) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
			} else if (arguments.length === 5) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
			} else if (arguments.length === 4) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
			} else if (arguments.length === 3) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
			} else if (arguments.length === 2) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], arguments[1], TRIGGER_OPTIONS);
			} else if (arguments.length) {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', arguments[0], TRIGGER_OPTIONS);
			} else {
				_get(Object.getPrototypeOf(Store.prototype), 'trigger', this).call(this, 'all', TRIGGER_OPTIONS);
			}

			return this;
		}
	}]);

	return Store;
})(_Observable3.default);

module.exports = Store;
/*data*/