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

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
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

var _streamsStream = require('../streams/Stream');

var _streamsStream2 = _interopRequireDefault(_streamsStream);

var _streamsAshNodeStream = require('../streams/AshNodeStream');

var _streamsAshNodeStream2 = _interopRequireDefault(_streamsAshNodeStream);

var _DOMMountComponents = require('../DOM/mountComponents');

var _DOMMountComponents2 = _interopRequireDefault(_DOMMountComponents);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;

var renderer;

var Renderer = (function () {
	function Renderer() {
		var _context;

		_classCallCheck(this, Renderer);

		this.streams = [];

		if (renderer) {
			return renderer;
		}

		renderer = this;
		renderer.render = (_context = renderer).render.bind(_context);

		return renderer;
	}

	_createClass(Renderer, [{
		key: 'addStream',
		value: function addStream(ashNodeStream, node) {
			if (!(ashNodeStream instanceof _streamsAshNodeStream2.default)) {
				throw new Error(ashNodeStream + ' (ashNodeStream) must be an AshNodeStream instance.');
			}

			if (!(0, _internalsIsElement2.default)(node)) {
				throw new Error(node + ' (node) must be a DOM Element.');
			}

			var renderStream = new _streamsStream2.default();

			renderStream.id = ashNodeStream.id;
			renderStream.node = node;
			renderStream.getRootNode = ashNodeStream.getRootNode = function () {
				for (var i = 0; i < node.childNodes.length; i++) {
					if (typeof node.childNodes[i][ID_ATTRIBUTE_NAME] !== 'undefined') {
						return node.childNodes[i];
					}
				}

				return null;
			};

			renderStream.from(this.render, ashNodeStream);
			this.streams.push(renderStream);

			return this;
		}
	}, {
		key: 'streamToString',
		value: function streamToString(ashNodeStream) {
			if (!(ashNodeStream instanceof _streamsAshNodeStream2.default)) {
				throw new Error(ashNodeStream + ' (ashNodeStream) must be an AshNodeStream instance.');
			}

			return (0, _DOMStringifyAshNodeTree2.default)(ashNodeStream.get());
		}
	}, {
		key: 'render',
		value: function render(stream, changed, dependencies) {
			var ashNodeStream = dependencies[0];

			if (!stream.ashNodeTree) {
				var isNodeTreeValid = false;
				var isNodeTreeValidated = false;

				// remove child nodes which are not element nodes
				for (var j = 0; j < stream.node.childNodes.length; j++) {
					if (stream.node.childNodes[j].nodeType !== 1) {
						stream.node.removeChild(stream.node.childNodes[j]);

						j--;
					}
				}

				// create ash node tree
				stream.ashNodeTree = ashNodeStream.get();

				// there are some element nodes?
				if (stream.node.childNodes.length) {
					isNodeTreeValidated = true;
					isNodeTreeValid = (0, _DOMValidateNodeTree2.default)(stream.node.childNodes[0], stream.ashNodeTree, stream.id);
				}

				// render to the Real DOM, if needed
				if (!isNodeTreeValid || !isNodeTreeValidated) {
					if (isNodeTreeValidated) {
						throw new Error('Existing html is invalid!');
					}

					while (stream.node.firstChild) {
						stream.node.removeChild(stream.node.firstChild);
					}

					global.requestAnimationFrame(function () {
						stream.node.appendChild((0, _DOMCreateNodeTree2.default)(stream.ashNodeTree));
						(0, _DOMMountComponents2.default)(ashNodeStream.ashElementTree);
					});
				}

				if (isNodeTreeValid && isNodeTreeValidated) {
					(0, _DOMMountComponents2.default)(ashNodeStream.ashElementTree);
				}
			} else {
				var newAshNodeTree = ashNodeStream.get();
				var patches = (0, _DOMDiffAshNodeTree2.default)(stream.ashNodeTree, newAshNodeTree);
				var isSuccessful = (0, _DOMPatchNodeTree2.default)(stream.getRootNode(), patches);

				if (!isSuccessful) {
					throw new Error('Patching the DOM was unsuccesful!');
				}

				stream.ashNodeTree = newAshNodeTree;

				(0, _DOMMountComponents2.default)(ashNodeStream.ashElementTree);
			}
		}
	}]);

	return Renderer;
})();

exports.default = Renderer;
module.exports = exports.default;