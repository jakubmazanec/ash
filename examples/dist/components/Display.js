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

var Display = (function (_ash$Component) {
	function Display() {
		_classCallCheck(this, Display);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = { displayClicks: 0 };
	}

	_inherits(Display, _ash$Component);

	_createClass(Display, [{
		key: 'render',

		/* jshint ignore:end */

		value: function render() {
			var message = 'Timer Clicks = ' + this.props.timerClicks + ' -- Display Click = ' + this.state.displayClicks;

			return _ash2.default.e('div', null, [message, _ash2.default.e('button', {
				className: 'big',
				style: {
					color: this.state.displayClicks % 2 === 0 ? 'red' : 'blue'
				},
				events: {
					click: this.tick
				}
			}, '+')]);
		}
	}, {
		key: 'tick',
		value: function tick() {
			console.log(this);
			//console.log(this.name + ' tick!');
			this.setState({ displayClicks: this.state.displayClicks + 1 });
		}
	}, {
		key: 'onBeforeReceiveProps',
		value: function onBeforeReceiveProps() {}
	}, {
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {}
	}]);

	return Display;
})(_ash2.default.Component);

exports.default = _ash2.default.createElement(Display);
module.exports = exports.default;

/* jshint ignore:start */

//console.log('display componentWillReceiveProps');

//console.log('display componentDidMount');
//debugger;
//this.interval = setInterval(this.tick, 500);
//console.log(this.getDOMNode());

//console.log('display componentWillUnmount');
//clearInterval(this.interval);