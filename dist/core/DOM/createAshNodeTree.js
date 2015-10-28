'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createAshNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentComponentDirty, parentIndices) {
	// console.log('>-- walkCreateAshNodeTree...', ashElement, index, parentIndices, 'parentDirty?', isParentComponentDirty, 'on', ashNodeTree.id, ashNodeTree.tagName);
	// debugger;
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// console.log('-', '<' + ashElement.args[0] + '>', ashElement.args[1]);
		if (isParentComponentDirty) {

			ashElement.instantiate();

			ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
			ashElement.instance.index = index;
			ashElement.instance.indices = parentIndices.concat(index);
			ashElement.instance.streamId = ashElement.stream.id;
			ashElement.instance.isDirty = true;
			ashElement.instance.parent = ashNodeTree;

			// console.log('instantiate!', ashElement.instance.index, ashNodeTree.oldChildren ? ashNodeTree.oldChildren.length : '-');

			ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
		} else {
			// console.log('just copy', ashElement.instance.index);
			ashElement.instance.isDirty = false;
			ashElement.instance.parent = ashNodeTree;

			if (ashNodeTree.oldChildren && ashElement.instance.index === 0) {
				// console.log('index is 0, there are oldChildren, so set oldChildren to null', 'on', ashNodeTree.id, ashNodeTree.tagName);
				ashNodeTree.oldChildren = null;
			}

			if (ashNodeTree.children[ashElement.instance.index] !== ashElement.instance) {
				ashNodeTree.children[ashElement.instance.index] = ashElement.instance;
			}
		}

		// walk the children
		// console.log('walk node children...', ashElement.instance.index, 'children length', ashElement.children.length);
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashElement.instance.index], ashElement.children[i], i, ashNodeTree.children[ashElement.instance.index].id, isParentComponentDirty, ashNodeTree.children[ashElement.instance.index].indices);
		}
	} else if (ashElement && ashElement.children[0]) {

		var isDirty = ashElement.isDirty;

		// console.log('* Component', ashElement.Spec.name, 'element dirty?', isDirty, 'old children?', ashNodeTree.oldChildren ? ashNodeTree.oldChildren.length : '-');

		if (index === 0 && !isParentComponentDirty) {
			// console.log('index 0!');
			if (isDirty) {
				// console.log('and dirty, so creating oldChildren', 'on', ashNodeTree.id, ashNodeTree.tagName);
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];
			} else {
				// console.log('not dirty, set oldChildren to null', 'on', ashNodeTree.id, ashNodeTree.tagName);
				ashNodeTree.oldChildren = null;
			}
		} else if (!isParentComponentDirty) {
			// console.log('index larger than zero!');
			if (isDirty && !ashNodeTree.oldChildren) {
				// console.log('and dirty with no old children -> creating oldChildren', 'on', ashNodeTree.id, ashNodeTree.tagName);
				// debugger;
				ashNodeTree.oldChildren = ashNodeTree.children;
				ashNodeTree.children = [];

				// copy not dirty already walked children
				for (var i = 0; i < index; i++) {
					ashNodeTree.children[i] = ashNodeTree.oldChildren[i];
				}
			}
		}

		ashElement.isDirty = false;

		// console.log('walk Component child...');
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

function createAshNodeTree(componentAshElement) {
	if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
		throw new Error(componentAshElement + ' (componentAshElement) must be a Component Ash Element object instance.');
	}

	// console.log('createAshNodeTree...', componentAshElement.Spec.name, componentAshElement);

	// debugger;

	var ashElement = componentAshElement;
	var ashNodeTree = undefined;
	var isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children which is ash node ash element
	while (!(0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// console.log('>--', 'parentDirty?', isDirty);

	if (isDirty) {
		ashElement.instantiate();

		ashElement.instance.id = '0';
		ashElement.instance.index = 0;
		ashElement.instance.indices = [0];
		ashElement.instance.streamId = ashElement.stream.id;
		ashElement.instance.isDirty = true;
		ashElement.instance.parent = null;

		// console.log('instantiate!', ashElement.instance.index);
	} else {
			ashElement.instance.id = '0';
			ashElement.instance.index = 0;
			ashElement.instance.indices = [0];
			ashElement.instance.streamId = ashElement.stream.id;
			ashElement.instance.isDirty = false;
			ashElement.instance.parent = null;

			// console.log('just copy', ashElement.instance.index);
		}

	ashNodeTree = ashElement.instance;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}

module.exports = exports.default;