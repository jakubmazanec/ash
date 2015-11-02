import support from './core/support';
import Component from './core/classes/Component';
import Stream from './core/classes/Stream';
import ViewStream from './core/classes/ViewStream';
import RenderStream from './core/classes/RenderStream';
import createElement from './core/internals/createElement';
import assign from './core/internals/assign';
import isAncestor from './core/internals/isAncestor';


/**
 * ash object
 */
var ash = {};

const VERSION = '0.1.0';

assign(ash, {
	VERSION,
	support,

	Component,
	Stream,
	ViewStream,
	RenderStream,

	createElement,

	isAncestor
});

export default ash;
