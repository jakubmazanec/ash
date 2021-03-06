'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createAshNodeTree;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentComponentDirty, parentIndices) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		if (isParentComponentDirty) {

			ashElement.instantiate();

			ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
			ashElement.instance.index = index;
			ashElement.instance.indices = parentIndices.concat(index);
			ashElement.instance.streamId = ashElement.stream.id;
			ashElement.instance.isDirty = true;
			ashElement.instance.parent = ashNodeTree;

			ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
		} else {
			ashElement.instance.isDirty = false;
			ashElement.instance.parent = ashNodeTree;

			if (ashNodeTree.oldChildren && ashElement.instance.index === 0) {
				ashNodeTree.oldChildren = null;
			}

			if (ashNodeTree.children[ashElement.instance.index] !== ashElement.instance) {
				ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
			}
		}

		// walk the children
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashElement.instance.index], ashElement.children[i], i, ashNodeTree.children[ashElement.instance.index].id, isParentComponentDirty, ashNodeTree.children[ashElement.instance.index].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		var isDirty = ashElement.isDirty;

		if (index === 0 && !isParentComponentDirty) {
			if (isDirty) {
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];
			} else {
				ashNodeTree.oldChildren = null;
			}
		} else if (!isParentComponentDirty) {
			if (isDirty && !ashNodeTree.oldChildren) {
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];

				// copy not dirty already walked children
				for (var i = 0; i < index; i++) {
					ashNodeTree.children[i] = ashNodeTree.oldChildren[i];
				}
			}
		}

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

function createAshNodeTree(componentAshElement) {
	if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
		throw new Error(componentAshElement + ' (componentAshElement) must be a Component Ash Element object instance.');
	}

	var ashElement = componentAshElement;
	var ashNodeTree = undefined;
	var isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children which is ash node ash element
	while (!(0, _internalsIsAshNodeAshElement2.default)(ashElement) && ashElement && ashElement.children && ashElement.children.length) {
		ashElement = ashElement.children[0];
	}

	if (!ashElement || (0, _internalsIsComponentAshElement2.default)(ashElement) && !ashElement.children.length) {
		return null;
	}

	if (isDirty) {
		ashElement.instantiate();

		ashElement.instance.isDirty = true;
	} else {
		ashElement.instance.isDirty = false;
	}

	ashElement.instance.id = '0';
	ashElement.instance.index = 0;
	ashElement.instance.indices = [0];
	ashElement.instance.streamId = ashElement.stream.id;
	ashElement.instance.parent = null;
	ashNodeTree = ashElement.instance;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}

module.exports = exports.default;