'use strict';

var _ = require('_');
var AshElement = require('./AshElement');
var constants = require('../internal/constants');

// constants references
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;
var ASH_NODE = constants.ASH_NODE;
var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

class AshNode {
	constructor(tagName, properties) {
		if (typeof properties !== 'undefined')
		{
			this.type = ASH_NODE;
			this.tagName = tagName.toLowerCase();
			this.properties = properties || {};
			this.children = [];
			this.index = null;
			this.key = null;

			// find element's key
			if (this.properties.key)
			{
				this.key = this.properties.key;
				delete this.properties.key;
			}
		} else
		{
			this.type = ASH_TEXT_NODE;
			this.text = tagName;
			this.index = null;
		}
	}	
}

module.exports = AshNode;