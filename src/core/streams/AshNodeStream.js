import Stream from './Stream';
import Component from '../classes/Component';
import isComponentAshElement from '../internals/isComponentAshElement';
import createAshNodeTree from '../DOM/createAshNodeTree';
import createAshElementTree from '../DOM/createAshElementTree';
import updateComponentAshElement from '../DOM/updateComponentAshElement';


var streamId = 0;

export default class AshNodeStream extends Stream {
	id = streamId++;
	ashElementTree = null;
	isUpdating = false;
	isRendering = false;

	from(componentAshElement) {
		if (!isComponentAshElement(componentAshElement)) {
			throw new Error(`${componentAshElement} (componentAshElement) must be an Component AshElement object instance.`);
		}

		this.ashElementTree = createAshElementTree(componentAshElement, this);

		return super.from(createAshNodeTree(this.ashElementTree));
	}

	static from(componentAshElement) {
		return new AshNodeStream().from(componentAshElement);
	}

	push(arg) {
		
		if (arg instanceof Component && !this.isUpdating) {
			this.isUpdating = true;

			if (!this.isRendering) {
				this.isRendering = true;

				global.requestAnimationFrame(() => {
					updateComponentAshElement(arg.__element, this);
					super.push(createAshNodeTree(this.ashElementTree));

					this.isRendering = false;
				});
			}

			this.isUpdating = false;
		} else if (arg instanceof Component && this.isUpdating) {
			throw new Error('You cannot update components during previous update!');
		} else {
			super.push(arg);
		}

		return this;
	}
}
