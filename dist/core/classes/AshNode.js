'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ASH_NODE = _internalsConstants2.default.ASH_NODE;
var ASH_TEXT_NODE = _internalsConstants2.default.ASH_TEXT_NODE;

var AshNode = function AshNode(tagName, properties) {
	_classCallCheck(this, AshNode);

	this.id = null;
	this.index = null;
	this.indices = null;
	this.parent = null;

	if (typeof properties !== 'undefined') {
		this.type = ASH_NODE;
		this.tagName = tagName.toLowerCase();
		this.properties = properties || {};
		this.key = null;
		this.children = [];

		// find element's key
		if (typeof this.properties.key === 'string' || typeof this.properties.key === 'number') {
			this.key = '' + this.properties.key;
		}
	} else {
		this.type = ASH_TEXT_NODE;
		this.text = tagName;
	}
};

exports.default = AshNode;
module.exports = exports.default;