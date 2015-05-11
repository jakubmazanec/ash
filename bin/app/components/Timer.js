'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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