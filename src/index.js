'use strict';

var _ = require('_');
var $ = require('jquery');

var Observable = require('./core/class/Observable');
var Component = require('./core/class/Component');
var Renderer = require('./core/class/Renderer');
var Action = require('./core/class/Action');
var Store = require('./core/class/Store');

var createElement = require('./core/internal/createElement');
var createFactory = require('./core/internal/createFactory');

var ash = {};

var VERSION = '0.1.0';

_.assign(ash, {
	'Observable': Observable,
	'Component': Component,
	'Renderer': Renderer,
	'Action': Action,
	'Store': Store,

	'e': createElement,
	'createFactory': createFactory
});

module.exports = ash;