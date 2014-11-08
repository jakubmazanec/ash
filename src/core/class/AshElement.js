'use strict';

var constants = require('../internal/constants');

// constants references
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

/**
 * AshElement
 */
class AshElement {
	constructor(type, spec) {
		if (type != COMPONENT_ASH_ELEMENT && type != ASH_NODE_ASH_ELEMENT)
		{
			throw new Error(type + 'must be ' + COMPONENT_ASH_ELEMENT + ' or ' + ASH_NODE_ASH_ELEMENT + '.');
		}

		if (!spec)
		{
			throw new Error(spec + 'must be specified.');	
		}

		if (!(this instanceof AshElement))
		{
			if (arguments.length >= 5) {
				return new AshElement(type, spec, arguments[2], arguments[3], arguments[4]);
			} else if (arguments.length >= 4) {
				return new AshElement(type, spec, arguments[2], arguments[3]);
			} else if (arguments.length >= 3) {
				return new AshElement(type, spec, arguments[2]);
			} else
			{
				return new AshElement(type, spec);
			}			
		}

		if (type == COMPONENT_ASH_ELEMENT)
		{
			this.type = type;
			this.spec = spec;

			if (arguments.length >= 3 && typeof arguments[2] !== 'undefined') {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			this.children = [];
		} else
		{
			this.type = ASH_NODE_ASH_ELEMENT;
			this.spec = spec;

			if (arguments.length >= 4 && typeof arguments[2] !== 'undefined' && typeof arguments[3] !== 'undefined') {
				this.args = [arguments[2], arguments[3]];
			} else if (arguments.length >= 3 && typeof arguments[2] !== 'undefined') {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			if (arguments.length >= 5 && arguments[4])
			{
				this.children = arguments[4];
			} else
			{
				this.children = [];
			}
		}

		this.parent = null;
		this.owner = null;
	}

	instantiate() {
		if (this.type == COMPONENT_ASH_ELEMENT)
		{
			if (this.args) {
				this.instance = new this.spec(this.args[0]);
			} else {
				this.instance = new this.spec();
			}			
		} else if (this.type == ASH_NODE_ASH_ELEMENT)
		{
			if (this.args) {
				this.instance = new this.spec(this.args[0], this.args[1]);
			} else {
				this.instance = new this.spec();
			}
		} else
		{
			throw new Error(this + ' is not a AshElement object.');
		}

		this.instance.element = this;

		return this.instance;
	}
}

module.exports = AshElement;