'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsIsAshElement = require('../internals/isAshElement');

var _internalsIsAshElement2 = _interopRequireDefault(_internalsIsAshElement);

//import isString from '../internals/isString';

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

//const LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;
var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;

function walkCreateAshElementTree(ashElement, owner, order) {
	// type check
	if (!(0, _internalsIsComponentAshElement2.default)(owner)) {
		throw new Error(owner + ' must be a Component type AshElement Object');
	}

	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.order = order;

		// set up owner & stage
		ashElement.owner = owner;
		ashElement.stage = owner.stage;

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
		ashElement.order = order;

		// set up owner
		ashElement.owner = owner;
		ashElement.stage = owner.stage;

		// create child by rendering component
		ashElement.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElement.children[0] = ashElement.instance.render();

		if (ashElement.children[0]) {
			// set up parent
			ashElement.children[0].parent = ashElement;

			// walk the child
			walkCreateAshElementTree(ashElement.children[0], ashElement, 0);
		}
	}
}

function createAshElementTree(rootAshElement, stage /*, startingLevel*/) {
	// type check
	if (!(0, _internalsIsAshElement2.default)(rootAshElement)) {
		throw new Error(rootAshElement + ' must be a AshElement object.');
	}

	if (!stage) {
		throw new Error(stage + ' must be an object.');
	}

	var ashElementTree = rootAshElement;

	ashElementTree.stage = stage;
	ashElementTree.isRoot = true;

	if ((0, _internalsIsComponentAshElement2.default)(ashElementTree)) {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.order = typeof ashElementTree.order === 'undefined' ? 0 : ashElementTree.order;

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
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.order = typeof ashElementTree.order === 'undefined' ? 0 : ashElementTree.order;

		for (var i = 0; i < ashElementTree.children.length; i++) {
			// set up a parent
			ashElementTree.children[i].parent = ashElementTree;

			// walk the child
			walkCreateAshElementTree(ashElementTree.children[i], ashElementTree.owner, i);
		}
	}

	// return resulting descriptor tree
	return ashElementTree;
}

exports.default = createAshElementTree;
module.exports = exports.default;