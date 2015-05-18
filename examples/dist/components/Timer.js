'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _ash = require('../ash');

var _ash2 = _interopRequireDefault(_ash);

var _Display = require('./Display');

var _Display2 = _interopRequireDefault(_Display);

var Timer = (function (_ash$Component) {
	function Timer() {
		_classCallCheck(this, Timer);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = { timerClicks: 0 };
	}

	_inherits(Timer, _ash$Component);

	_createClass(Timer, [{
		key: 'tick',

		/* jshint ignore:end */

		value: function tick() {
			console.log('timer tick!');
			this.setState({ timerClicks: this.state.timerClicks + 1 });
		}
	}, {
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {}
	}, {
		key: 'onBeforeMount',
		value: function onBeforeMount() {}
	}, {
		key: 'render',

		/*shouldUpdate () {
  	return false;
  }*/

		value: function render() {
			return _ash2.default.e('div', null, [new _Display2.default({ timerClicks: this.state.timerClicks }), _ash2.default.e('button', {
				style: {
					color: this.state.timerClicks % 2 === 0 ? 'red' : 'blue'
				},
				events: {
					click: this.tick
				}
			}, '+')]);
		}
	}]);

	return Timer;
})(_ash2.default.Component);

exports.default = _ash2.default.createElement(Timer);
module.exports = exports.default;

/* jshint ignore:start */

//console.log('Timer onMount');
//this.interval = setInterval(this.tick, 1000);
//console.log(this.getDOMNode());

//console.log('Timer onUnmount');
//clearInterval(this.interval);

//console.log('Timer onBeforeMount');