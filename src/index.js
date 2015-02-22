import Observable from './core/class/Observable';
import Component from './core/class/Component';
import Renderer from './core/class/Renderer';
import Action from './core/class/Action';
import Store from './core/class/Store';

import createElement from './core/internal/createElement';

import {ImmutableArray, ImmutableObject} from './core/immutable/Immutables';

import assign from './core/internal/assign';

var ash = {};

const VERSION = '0.1.0';

assign(ash, {
	VERSION,
	Observable,
	Component,
	Renderer,
	Action,
	Store,

	'e': createElement,
	createElement,

	ImmutableArray,
	ImmutableObject
});

export default ash;
