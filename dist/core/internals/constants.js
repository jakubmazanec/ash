'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var constants = {
	// component lifecycle
	LIFECYCLE_UNMOUNTED: 'Unmounted',
	LIFECYCLE_MOUNTING: 'Mounting',
	LIFECYCLE_MOUNTED: 'Mounted',
	LIFECYCLE_UNINITIALIZED: 'Uninitialized',

	// patch types
	PATCH_NONE: 'Patch None',
	PATCH_ASH_NODE: 'Patch Ash Node',
	PATCH_ASH_TEXT_NODE: 'Patch Ash Text Node',
	PATCH_PROPERTIES: 'Patch Properties',
	PATCH_ORDER: 'Patch Order',
	PATCH_INSERT: 'Patch Insert',
	PATCH_REMOVE: 'Patch Remove',

	// descriptor types
	COMPONENT_ASH_ELEMENT: 'Component Ash Element',
	ASH_NODE_ASH_ELEMENT: 'Ash Node Ash Element',

	// virtual node types
	ASH_NODE: 'Ash Node',
	ASH_TEXT_NODE: 'Ash Text Node',

	// misc
	LEVEL_SEPARATOR: '.',
	INDEX_ATTRIBUTE_NAME: '__ash:index__',
	ORDER_ATTRIBUTE_NAME: '__ash:order__',
	STAGE_ATTRIBUTE_NAME: '__ash:stage__',

	IMMUTABLE_TAG: '__ash:immutable__'
};

exports.default = constants;
module.exports = exports.default;