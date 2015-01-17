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
	'VERSION': VERSION,
	'Observable': Observable,
	'Component': Component,
	'Renderer': Renderer,
	'Action': Action,
	'Store': Store,

	'e': createElement,
	'createFactory': createFactory,

/*	ajax: function (options) {
		return new Promise((resolve, reject) => {
			$.ajax(_.assign({}, options, {
				success(data) {
					resolve(data);
				},
				error(jqXHR, textStatus, errorThrown) {
					if (errorThrown) {
						reject(new Error(errorThrown));
					} else {
						reject(new Error(textStatus));
					}
				}
			}));
		});
	}*/
});

module.exports = ash;