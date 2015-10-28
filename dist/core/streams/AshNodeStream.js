'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Stream2 = require('./Stream');

var _Stream3 = _interopRequireDefault(_Stream2);

var _classesComponent = require('../classes/Component');

var _classesComponent2 = _interopRequireDefault(_classesComponent);

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _DOMCreateAshNodeTree = require('../DOM/createAshNodeTree');

var _DOMCreateAshNodeTree2 = _interopRequireDefault(_DOMCreateAshNodeTree);

var _DOMCreateAshElementTree = require('../DOM/createAshElementTree');

var _DOMCreateAshElementTree2 = _interopRequireDefault(_DOMCreateAshElementTree);

var _DOMUpdateComponentAshElement = require('../DOM/updateComponentAshElement');

var _DOMUpdateComponentAshElement2 = _interopRequireDefault(_DOMUpdateComponentAshElement);

var streamId = 0;

var AshNodeStream = (function (_Stream) {
	_inherits(AshNodeStream, _Stream);

	function AshNodeStream() {
		_classCallCheck(this, AshNodeStream);

		_get(Object.getPrototypeOf(AshNodeStream.prototype), 'constructor', this).apply(this, arguments);

		this.id = streamId++;
		this.ashElementTree = null;
		this.isUpdating = false;
		this.isRendering = false;
	}

	_createClass(AshNodeStream, [{
		key: 'from',
		value: function from(componentAshElement) {
			if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
				throw new Error(componentAshElement + ' (componentAshElement) must be an Component AshElement object instance.');
			}

			this.ashElementTree = (0, _DOMCreateAshElementTree2.default)(componentAshElement, this);

			return _get(Object.getPrototypeOf(AshNodeStream.prototype), 'from', this).call(this, (0, _DOMCreateAshNodeTree2.default)(this.ashElementTree));
		}
	}, {
		key: 'push',
		value: function push(arg) {
			var _this = this;

			if (arg instanceof _classesComponent2.default && !this.isUpdating) {
				this.isUpdating = true;
				arg.__element.isDirty = true;

				// console.log('push...', arg.__element.Spec.name, arg.__element.isDirty);

				if (!this.isRendering) {
					this.isRendering = true;

					global.requestAnimationFrame(function () {
						// updateComponentAshElement(arg.__element, this);
						(0, _DOMUpdateComponentAshElement2.default)(_this.ashElementTree, _this);
						_get(Object.getPrototypeOf(AshNodeStream.prototype), 'push', _this).call(_this, (0, _DOMCreateAshNodeTree2.default)(_this.ashElementTree));

						_this.isRendering = false;
					});
				}

				this.isUpdating = false;
			} else if (arg instanceof _classesComponent2.default && this.isUpdating) {
				throw new Error('You cannot update components during previous update!');
			} else {
				// console.log('push...', arg);
				_get(Object.getPrototypeOf(AshNodeStream.prototype), 'push', this).call(this, arg);
			}

			return this;
		}
	}], [{
		key: 'from',
		value: function from(componentAshElement) {
			return new AshNodeStream().from(componentAshElement);
		}
	}]);

	return AshNodeStream;
})(_Stream3.default);

exports.default = AshNodeStream;
module.exports = exports.default;