import constants from '../internals/constants';



const ASH_NODE = constants.ASH_NODE;
const ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

class AshNode {
	constructor(tagName, properties) {
		if (typeof properties !== 'undefined') {
			this.type = ASH_NODE;
			this.tagName = tagName.toLowerCase();
			this.properties = properties || {};
			// this.parent = null;
			// this.children = [];
			this.id = null;
			this.index = null;
			this.indices = null;
			this.key = null;

			// find element's key
			if (this.properties.key) {
				this.key = this.properties.key;
				
				delete this.properties.key;
			}
		} else {
			this.type = ASH_TEXT_NODE;
			this.text = tagName;
			// this.parent = null;
			this.id = null;
			this.index = null;
			this.indices = null;
		}
	}
}

export default AshNode;
