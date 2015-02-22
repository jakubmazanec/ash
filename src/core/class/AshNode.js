import constants from '../internal/constants';

// constants references
const ASH_NODE = constants.ASH_NODE;
const ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

class AshNode {
	constructor(tagName, properties) {
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
	}
}

export default AshNode;
