'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

// constants references
var ASH_NODE = _internalsConstants2.default.ASH_NODE;
var ASH_TEXT_NODE = _internalsConstants2.default.ASH_TEXT_NODE;

var AshNode = function AshNode(tagName, properties) {
	_classCallCheck(this, AshNode);

	if (typeof properties !== 'undefined') {
		this.type = ASH_NODE;
		this.tagName = tagName.toLowerCase();
		this.properties = properties || {};
		this.children = [];
		this.index = null;
		this.key = null;

		// find element's key
		if (this.properties.key) {
			this.key = this.properties.key;

			delete this.properties.key;
		}
	} else {
		this.type = ASH_TEXT_NODE;
		this.text = tagName;
		this.index = null;
	}
};

exports.default = AshNode;
module.exports = exports.default;