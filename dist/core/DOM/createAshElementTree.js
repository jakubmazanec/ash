'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createAshElementTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsAshElement = require('../internals/isAshElement');

var _internalsIsAshElement2 = _interopRequireDefault(_internalsIsAshElement);

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;

function walkCreateAshElementTree(ashElement, owner, index) {
	// type check
	if (!(0, _internalsIsComponentAshElement2.default)(owner)) {
		throw new Error(owner + ' must be a Component type AshElement Object');
	}

	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.index = index;

		// set up owner & stream
		ashElement.owner = owner;
		ashElement.stream = owner.stream;

		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// set up parent
				ashElement.children[i].parent = ashElement;

				// walk the child
				walkCreateAshElementTree(ashElement.children[i], owner, i);
			}
		}
	} else if ((0, _internalsIsComponentAshElement2.default)(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.index = index;

		// set up owner
		ashElement.owner = owner;
		ashElement.stream = owner.stream;

		// create child by rendering component
		ashElement.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElement.children[0] = ashElement.instance.render(ashElement.instance.props, ashElement.instance.state);

		if (ashElement.children[0]) {
			// set up parent
			ashElement.children[0].parent = ashElement;

			// walk the child
			walkCreateAshElementTree(ashElement.children[0], ashElement, 0);
		}
	}
}

function createAshElementTree(ashElement, stream) {
	// type check
	if (!(0, _internalsIsAshElement2.default)(ashElement)) {
		throw new Error(ashElement + ' (ashElement) must be an AshElement object instance.');
	}

	if (!stream) {
		throw new Error(stream + ' (stream) must be a Stream object instance.');
	}

	var ashElementTree = ashElement;

	ashElementTree.stream = stream;
	ashElementTree.isRoot = true;

	if ((0, _internalsIsComponentAshElement2.default)(ashElementTree)) {
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.index = typeof ashElementTree.index === 'undefined' ? 0 : ashElementTree.index;

		// create child by rendering component
		ashElementTree.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElementTree.children[0] = ashElementTree.instance.render();

		// set up a parent
		if (ashElementTree.children[0]) {
			ashElementTree.children[0].parent = ashElementTree;
		}

		// walk the child
		walkCreateAshElementTree(ashElementTree.children[0], ashElementTree, 0);
	} else {
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.index = typeof ashElementTree.index === 'undefined' ? 0 : ashElementTree.index;

		for (var i = 0; i < ashElementTree.children.length; i++) {
			// set up a parent
			ashElementTree.children[i].parent = ashElementTree;

			// walk the child
			walkCreateAshElementTree(ashElementTree.children[i], ashElementTree.owner, i);
		}
	}

	// return resulting ash element tree
	return ashElementTree;
}

module.exports = exports.default;