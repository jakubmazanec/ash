'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

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