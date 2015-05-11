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