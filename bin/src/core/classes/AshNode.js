"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internals/constants"));

// constants references
var ASH_NODE = constants.ASH_NODE;
var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

var AshNode = function AshNode(tagName, properties) {
	_classCallCheck(this, AshNode);

	if (typeof properties !== "undefined") {
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

module.exports = AshNode;