import support from './core/support';

import {ImmutableArray, ImmutableObject} from './core/classes/Immutables';
import Observable from './core/classes/Observable';
import Component from './core/classes/Component';
import Renderer from './core/classes/Renderer';
import Action from './core/classes/Action';
import Store from './core/classes/Store';

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
	'VERSION': VERSION,
	'support': support,

	'ImmutableArray': ImmutableArray,
	'ImmutableObject': ImmutableObject,

	'Observable': Observable,
	'Component': Component,
	'Renderer': Renderer,
	'Action': Action,
	'Store': Store,

	'e': createElement,
	'createElement': createElement,

	'isImmutable': isImmutable,
	'isAncestor': isAncestor
});

// load variables from css
if (support.dom) {
	var jsonString = global.getComputedStyle(global.document.body, '::before').content;
	var removeQuotes = (s) => {
		return s.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
	};

	try {
		ash.sass = JSON.parse(removeQuotes(jsonString));
	} catch (error) {
		ash.sass = {};
	}
}

export default ash;
