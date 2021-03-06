import constants from '../internals/constants';


const ASH_NODE = constants.ASH_NODE;
const ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

export default class AshNode {
	type = null;
	id = null;
	index = null;
	indices = null;
	parent = null;

	constructor(tagName, properties) {
		if (properties !== undefined) {
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

		return this;
	}
}
