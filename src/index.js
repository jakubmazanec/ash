import support from './core/support';

import Component from './core/classes/Component';
import Renderer from './core/classes/Renderer';
import Stream from './core/streams/Stream';
import AshNodeStream from './core/streams/AshNodeStream';

import createElement from './core/internals/createElement';

import assign from './core/internals/assign';
import isImmutable from './core/internals/isImmutable';
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
	Renderer,
	Stream,
	AshNodeStream,

	e: createElement,
	createElement,

	isAncestor
});

export default ash;
