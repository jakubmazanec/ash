'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

function _ref(value, index) {
	return _ash2.default.e(
		'li',
		{ key: '' + index },
		'' + value
	);
}

var List = (function (_ash$Component) {
	function List() {
		_classCallCheck(this, List);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = { redOutline: false };
		this.name = 'List';
	}

	_inherits(List, _ash$Component);

	_createClass(List, [{
		key: 'render',
		value: function render() {
			return _ash2.default.e(
				'ul',
				{ style: {
						outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
					} },
				_ash2.default.e(
					'button',
					{ events: {
							click: this.changeOutline
						} },
					'!!!'
				),
				this.props.map(_ref)
			);
		}
	}, {
		key: 'changeOutline',
		value: function changeOutline() {
			this.state.redOutline = !this.state.redOutline;

			this.isDirty = true;
		}
	}, {
		key: 'onBeforeReceiveProps',
		value: function onBeforeReceiveProps() {}
	}]);

	return List;
})(_ash2.default.Component);

exports.default = List;
module.exports = exports.default;