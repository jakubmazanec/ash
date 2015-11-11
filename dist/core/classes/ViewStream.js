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

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _DOMCreateAshNodeTree = require('../DOM/createAshNodeTree');

var _DOMCreateAshNodeTree2 = _interopRequireDefault(_DOMCreateAshNodeTree);

var _DOMCreateAshElementTree = require('../DOM/createAshElementTree');

var _DOMCreateAshElementTree2 = _interopRequireDefault(_DOMCreateAshElementTree);

var _DOMUpdateAshElementTree = require('../DOM/updateAshElementTree');

var _DOMUpdateAshElementTree2 = _interopRequireDefault(_DOMUpdateAshElementTree);

var _internalsSetAnimationTimeout = require('../internals/setAnimationTimeout');

var _internalsSetAnimationTimeout2 = _interopRequireDefault(_internalsSetAnimationTimeout);

var streamId = 0;

var ViewStream = (function (_Stream) {
	_inherits(ViewStream, _Stream);

	function ViewStream(componentAshElement) {
		_classCallCheck(this, ViewStream);

		if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
			throw new Error(componentAshElement + ' (componentAshElement) must be an Component AshElement object instance.');
		}

		if (componentAshElement.stream instanceof ViewStream) {
			throw new Error(componentAshElement + ' (componentAshElement) was already passed to a view stream.');
		}

		_get(Object.getPrototypeOf(ViewStream.prototype), 'constructor', this).call(this);

		this.id = streamId++;
		this.isUpdating = false;
		this.isRendering = false;
		this.isUpdating = true;

		var ashElementTree = (0, _DOMCreateAshElementTree2.default)(componentAshElement, this);

		this.push({
			ashElementTree: ashElementTree,
			ashNodeTree: (0, _DOMCreateAshNodeTree2.default)(ashElementTree)
		});

		this.isUpdating = false;

		return this;
	}

	_createClass(ViewStream, [{
		key: 'push',
		value: function push(value) {
			var _this = this;

			if (this.hasValue) {
				if (this.isUpdating) {
					throw new Error('You cannot update components during previous update!');
				}

				this.isUpdating = true;

				// if there is already a scheduled update, we won't render twice
				if (!this.isRendering) {
					this.isRendering = true;

					(0, _internalsSetAnimationTimeout2.default)(function () {
						_get(Object.getPrototypeOf(ViewStream.prototype), 'push', _this).call(_this, {
							ashElementTree: (0, _DOMUpdateAshElementTree2.default)(_this.value.ashElementTree, _this),
							ashNodeTree: (0, _DOMCreateAshNodeTree2.default)(_this.value.ashElementTree)
						});

						_this.isRendering = false;
					});
				}

				this.isUpdating = false;
			} else {
				_get(Object.getPrototypeOf(ViewStream.prototype), 'push', this).call(this, value);
			}

			return this;
		}
	}]);

	return ViewStream;
})(_Stream3.default);

exports.default = ViewStream;
module.exports = exports.default;