'use strict';

var _ = require('_');
var $ = require('jquery');

// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
var methodMap = {
	'create': 'POST',
	'update': 'PUT',
	'patch':  'PATCH',
	'delete': 'DELETE',
	'read':   'GET'
};

// Set the default implementation of `Backbone.ajax` to proxy through to `$`.
// Override this if you'd like to use a different library.
var ajax = function()
{
	return $.ajax.apply($, arguments);
};

// Override this function to change the manner in which Backbone persists
// models to the server. You will be passed the type of request, and the
// model in question. By default, makes a RESTful Ajax request
// to the model's `url()`. Some possible customizations could be:
//
// * Use `setTimeout` to batch rapid-fire updates into a single request.
// * Send up the models as XML instead of JSON.
// * Persist models via WebSockets instead of Ajax.
//
// Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
// as `POST`, with a `_method` parameter containing the true HTTP method,
// as well as all requests with the body as `application/x-www-form-urlencoded`
// instead of `application/json` with the model in a param named `model`.
// Useful when interfacing with server-side languages like **PHP** that make
// it difficult to read the body of `PUT` requests.
var sync = function (method, model, options)
{
	var type = methodMap[method];

	// Default options, unless specified.
	_.defaults(options || (options = {}));

	// Default JSON-request options.
	var params = {type: type, dataType: 'json'};

	// Ensure that we have a URL.
	if (!options.url) {
		params.url = _.result(model, 'url') || urlError();
	}

	// Ensure that we have the appropriate request data.
	if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
		params.contentType = 'application/json';
		params.data = JSON.stringify(options.attrs || model.toJSON(options));
	}

	// Don't process data on a non-GET request.
	if (params.type !== 'GET' && !options.emulateJSON) {
		params.processData = false;
	}

	// Pass along `textStatus` and `errorThrown` from jQuery.
	var error = options.error;
	options.error = function(xhr, textStatus, errorThrown) {
		options.textStatus = textStatus;
		options.errorThrown = errorThrown;
		if (error) error.apply(this, arguments);
	};

	// Make the request, allowing the user to override any Ajax options.
	var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	model.trigger('request', model, xhr, options);
	return xhr;
};

module.exports = sync;