'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ('value' in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _DOMCreateNodeTree = require('../DOM/createNodeTree');

var _DOMCreateNodeTree2 = _interopRequireDefault(_DOMCreateNodeTree);

var _DOMDiffAshNodeTree = require('../DOM/diffAshNodeTree');

var _DOMDiffAshNodeTree2 = _interopRequireDefault(_DOMDiffAshNodeTree);

var _DOMPatchNodeTree = require('../DOM/patchNodeTree');

var _DOMPatchNodeTree2 = _interopRequireDefault(_DOMPatchNodeTree);

var _DOMStringifyAshNodeTree = require('../DOM/stringifyAshNodeTree');

var _DOMStringifyAshNodeTree2 = _interopRequireDefault(_DOMStringifyAshNodeTree);

var _DOMValidateNodeTree = require('../DOM/validateNodeTree');

var _DOMValidateNodeTree2 = _interopRequireDefault(_DOMValidateNodeTree);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsElement = require('../internals/isElement');

var _internalsIsElement2 = _interopRequireDefault(_internalsIsElement);

var _Stream2 = require('./Stream');

var _Stream3 = _interopRequireDefault(_Stream2);

var _ViewStream = require('./ViewStream');

var _ViewStream2 = _interopRequireDefault(_ViewStream);

var _DOMMountComponents = require('../DOM/mountComponents');

var _DOMMountComponents2 = _interopRequireDefault(_DOMMountComponents);

var _internalsSetAnimationTimeout = require('../internals/setAnimationTimeout');

var _internalsSetAnimationTimeout2 = _interopRequireDefault(_internalsSetAnimationTimeout);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var RENDER_STREAM_DOM_TARGET = _internalsConstants2.default.RENDER_STREAM_DOM_TARGET;
var RENDER_STREAM_STRING_TARGET = _internalsConstants2.default.RENDER_STREAM_STRING_TARGET;

function render(viewStream, renderStream) {
	var _this = this;

	var _viewStream$get = viewStream.get();

	var ashElementTree = _viewStream$get.ashElementTree;
	var ashNodeTree = _viewStream$get.ashNodeTree;

	if (!renderStream.previousAshNodeTree) {
		var isNodeTreeValid = false;
		var isNodeTreeValidated = false;

		renderStream.previousAshNodeTree = ashNodeTree;

		// there are some element nodes?
		if (this.target === RENDER_STREAM_DOM_TARGET && renderStream.containerNode.childNodes.length) {
			isNodeTreeValidated = true;
			isNodeTreeValid = (0, _DOMValidateNodeTree2.default)(renderStream.containerNode.childNodes[0], ashNodeTree, viewStream.id);
		}

		// render to the Real DOM, if needed
		if (!isNodeTreeValid || !isNodeTreeValidated) {
			if (isNodeTreeValidated) {
				throw new Error('Existing html is invalid!');
			}

			// remove existing nodes
			if (this.target === RENDER_STREAM_DOM_TARGET) {
				while (renderStream.containerNode.firstChild) {
					renderStream.containerNode.removeChild(renderStream.containerNode.firstChild);
				}
			}

			(0, _internalsSetAnimationTimeout2.default)(function () {
				if (_this.target === RENDER_STREAM_DOM_TARGET) {
					var nodeTree = (0, _DOMCreateNodeTree2.default)(ashNodeTree);

					if (nodeTree) {
						renderStream.containerNode.appendChild(nodeTree);
					}
				}

				(0, _DOMMountComponents2.default)(ashElementTree);
			});
		}

		if (isNodeTreeValid && isNodeTreeValidated) {
			(0, _DOMMountComponents2.default)(ashElementTree);
		}
	} else {
		var patches = (0, _DOMDiffAshNodeTree2.default)(renderStream.previousAshNodeTree, ashNodeTree);

		if (this.target === RENDER_STREAM_DOM_TARGET) {
			var isSuccessful = (0, _DOMPatchNodeTree2.default)(renderStream.rootNode, patches);

			if (!isSuccessful) {
				throw new Error('Patching the DOM was unsuccesful!');
			}
		}

		renderStream.previousAshNodeTree = ashNodeTree;

		(0, _DOMMountComponents2.default)(ashElementTree);
	}
}

var RenderStream = (function (_Stream) {
	_inherits(RenderStream, _Stream);

	function RenderStream(viewStream, node) {
		_classCallCheck(this, RenderStream);

		_get(Object.getPrototypeOf(RenderStream.prototype), 'constructor', this).call(this);

		this.containerNode = null;
		this.previousAshNodeTree = null;
		this.target = RENDER_STREAM_DOM_TARGET;
		if (!(viewStream instanceof _ViewStream2.default)) {
			throw new Error(viewStream + ' (viewStream) must be an ViewStream instance.');
		}

		if (!(0, _internalsIsElement2.default)(node)) {
			this.target = RENDER_STREAM_STRING_TARGET;
		}

		this.fn = render;

		if (this.target === RENDER_STREAM_DOM_TARGET) {
			this.containerNode = node;

			// remove child nodes which are not element nodes
			for (var j = 0; j < this.containerNode.childNodes.length; j++) {
				if (this.containerNode.childNodes[j].nodeType !== 1) {
					this.containerNode.removeChild(this.containerNode.childNodes[j]);

					j--;
				}
			}
		}

		this.from(viewStream);

		return this;
	}

	_createClass(RenderStream, [{
		key: 'stringify',
		value: function stringify() {
			return (0, _DOMStringifyAshNodeTree2.default)(this.__dependencies[0].get().ashNodeTree);
		}
	}, {
		key: 'rootNode',
		get: function () {
			if (this.target === RENDER_STREAM_DOM_TARGET) {
				for (var i = 0; i < this.containerNode.childNodes.length; i++) {
					if (typeof this.containerNode.childNodes[i][ID_ATTRIBUTE_NAME] !== 'undefined') {
						return this.containerNode.childNodes[i];
					}
				}
			}

			return null;
		}
	}]);

	return RenderStream;
})(_Stream3.default);

exports.default = RenderStream;
module.exports = exports.default;