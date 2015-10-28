'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	_inherits(List, _ash$Component);

	function List() {
		_classCallCheck(this, List);

		_get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(List, [{
		key: 'shouldUpdate',
		value: function shouldUpdate(newProps) {
			// console.log('should list update?', this.props.list !== newProps.list || this.props.shadow !== newProps.shadow);
			// console.log('List shouldUpdate...', this.props.label, this.props.list !== newProps.list, this.props.shadow !== newProps.shadow);
			return this.props.list !== newProps.list || this.props.shadow !== newProps.shadow;
		}
	}, {
		key: 'render',
		value: function render() {
			return _ash2.default.e(
				'ul',
				{ style: {
						outline: this.props.shadow ? '1px solid red' : '1px solid blue'
					} },
				_ash2.default.e(
					'button',
					{ events: {
							click: this.props.changeShadow
						} },
					'!!!'
				),
				this.props.list.toArray().map(_ref)
			);
		}
	}]);

	return List;
})(_ash2.default.Component);

exports.default = List;
module.exports = exports.default;