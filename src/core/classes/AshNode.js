import constants from '../internals/constants';


const ASH_NODE = constants.ASH_NODE;
const ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

class AshNode {
	constructor(tagName, properties) {
		this.id = null;
		this.index = null;
		this.indices = null;
		this.parent = null;

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
	}
}

export default AshNode;
