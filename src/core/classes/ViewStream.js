import Stream from './Stream';
import isComponentAshElement from '../internals/isComponentAshElement';
import createAshNodeTree from '../DOM/createAshNodeTree';
import createAshElementTree from '../DOM/createAshElementTree';
import updateComponentAshElement from '../DOM/updateComponentAshElement';


let streamId = 0;

export default class ViewStream extends Stream {
	id = streamId++;
	isUpdating = false;

	constructor(componentAshElement) {
		if (!isComponentAshElement(componentAshElement)) {
			throw new Error(`${componentAshElement} (componentAshElement) must be an Component AshElement object instance.`);
		}

		if (componentAshElement.stream instanceof ViewStream) {
			throw new Error(`${componentAshElement} (componentAshElement) was already passed to a view stream.`);
		}

		super();

		this.isUpdating = true;

		let ashElementTree = createAshElementTree(componentAshElement, this);

		this.push({
			ashElementTree,
			ashNodeTree: createAshNodeTree(ashElementTree)
		});

		this.isUpdating = false;

		return this;
	}

	push(value) {
		if (this.hasValue) {
			if (this.isUpdating) {
				throw new Error('You cannot update components during previous update!');
			}

			this.isUpdating = true;

			global.requestAnimationFrame(() => {
				super.push({
					ashElementTree: updateComponentAshElement(this.value.ashElementTree, this),
					ashNodeTree: createAshNodeTree(this.value.ashElementTree)
				});

				this.isUpdating = false;
			});
		} else {
			super.push(value);
		}

		return this;
	}
}
