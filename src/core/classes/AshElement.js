import constants from '../internals/constants';

// constants references
const ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;
const COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

/**
 * AshElement
 */
class AshElement {
	constructor(type, Spec) {
		if (type !== COMPONENT_ASH_ELEMENT && type !== ASH_NODE_ASH_ELEMENT) {
			throw new Error(`${type} "type" must be "${COMPONENT_ASH_ELEMENT}" or "${ASH_NODE_ASH_ELEMENT}".`);
		}

		if (!Spec) {
			throw new Error(`${Spec} "Spec" must be specified.`);
		}

		if (type === COMPONENT_ASH_ELEMENT) {
			this.type = type;
			this.Spec = Spec;
			this.isDirty = true;

			if (arguments.length >= 3 && typeof arguments[2] !== 'undefined') {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			this.children = [];
		} else {
			this.type = ASH_NODE_ASH_ELEMENT;
			this.Spec = Spec;

			if (arguments.length >= 4 && typeof arguments[2] !== 'undefined' && typeof arguments[3] !== 'undefined') {
				this.args = [arguments[2], arguments[3]];
			} else if (arguments.length >= 3 && typeof arguments[2] !== 'undefined') {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			if (arguments.length >= 5 && arguments[4]) {
				this.children = arguments[4];
			} else {
				this.children = [];
			}
		}

		this.parent = null;
		this.owner = null;
	}

	instantiate() {
		if (this.type === COMPONENT_ASH_ELEMENT) {
			if (this.args) {
				this.instance = new this.Spec(this.args[0]);
			} else {
				this.instance = new this.Spec();
			}

			this.instance.__element = this;
		} else if (this.type === ASH_NODE_ASH_ELEMENT) {
			if (this.args) {
				this.instance = new this.Spec(this.args[0], this.args[1]);
			} else {
				this.instance = new this.Spec();
			}
		} else {
			throw new Error(`${this} is not an AshElement object.`);
		}

		return this.instance;
	}
}

export default AshElement;
