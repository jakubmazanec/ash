'use strict';

var _ = require('_');
var $ = require('jquery');

var Component = require('./core/class/Component');
var Renderer = require('./core/class/Renderer');
var createElement = require('./core/internal/createElement');
var createFactory = require('./core/internal/createFactory');

var ash = {};

var VERSION = '0.1.0';

_.assign(ash, {
	'Component': Component,
	'Renderer': Renderer,

	'e': createElement,
	'createFactory': createFactory
});

module.exports = ash;