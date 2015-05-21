'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

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

var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;
var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;

var renderer;

function mountComponents(ashElement) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				mountComponents(ashElement.children[i]);
			}
		}
	} else if ((0, _internalsIsComponentAshElement2.default)(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle === LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

var Renderer = (function () {
	function Renderer() {
		_classCallCheck(this, Renderer);

		this.streams = [];

		if (renderer) {
			return renderer;
		}

		// save singleton
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	_createClass(Renderer, [{
		key: 'addStream',
		value: function addStream(ashNodeStream, node) {
			if (!(ashNodeStream instanceof _streamsAshNodeStream2.default)) {
				throw new Error('' + ashNodeStream + ' (ashNodeStream) must be an AshNodeStream instance.');
			}

			if (!(0, _internalsIsElement2.default)(node)) {
				throw new Error(node + ' must be a DOM Element.');
			}

			var renderStream = new _streamsStream2.default();

			renderStream.id = ashNodeStream.id;
			renderStream.node = node;
			renderStream.getRootNode = function () {
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
				throw new Error('' + ashNodeStream + ' (ashNodeStream) must be an AshNodeStream instance.');
			}

			return (0, _DOMStringifyAshNodeTree2.default)(ashNodeStream.get());
		}
	}, {
		key: 'render',
		value: function render(stream, changed, dependencies) {
			var ashNodeStream = dependencies[0];

			function _ref() {
				stream.node.appendChild((0, _DOMCreateNodeTree2.default)(stream.ashNodeTree));

				// mount components
				mountComponents(ashNodeStream.ashElementTree);

				stream.isRendering = false;
			}

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

					stream.isRendering = true;

					global.requestAnimationFrame(_ref);
				}if (isNodeTreeValid && isNodeTreeValidated) {
					// mount components
					mountComponents(ashNodeStream.ashElementTree);
				}
			} else {
				(function () {
					var newAshNodeTree = ashNodeStream.get();
					var patches = (0, _DOMDiffAshNodeTree2.default)(stream.ashNodeTree, newAshNodeTree);

					stream.ashNodeTree = newAshNodeTree;
					stream.isRendering = true;

					global.requestAnimationFrame(function () {
						var isSuccessful = (0, _DOMPatchNodeTree2.default)(stream.getRootNode(), patches);

						if (!isSuccessful) {
							throw new Error('Patching the DOM was unsuccesful!');
						}

						// mount components
						mountComponents(ashNodeStream.ashElementTree);

						stream.isRendering = false;
					});
				})();
			}
		}
	}]);

	return Renderer;
})();

exports.default = Renderer;
module.exports = exports.default;