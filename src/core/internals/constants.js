export default {
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
	INDEX_SEPARATOR: '.',
	ID_ATTRIBUTE_NAME: '__ash:id__',
	INDEX_ATTRIBUTE_NAME: '__ash:index__',
	STREAM_ID_ATTRIBUTE_NAME: '__ash:stream__',

	// render stram targets
	RENDER_STREAM_DOM_TARGET: 'DOM Target',
	RENDER_STREAM_STRING_TARGET: 'String Target',
};
