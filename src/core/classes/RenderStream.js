import createNodeTree from '../DOM/createNodeTree';
import diffAshNodeTree from '../DOM/diffAshNodeTree';
import patchNodeTree from '../DOM/patchNodeTree';
import stringifyAshNodeTree from '../DOM/stringifyAshNodeTree';
import validateNodeTree from '../DOM/validateNodeTree';
import constants from '../internals/constants';
import isElement from '../internals/isElement';
import Stream from './Stream';
import ViewStream from './ViewStream';
import mountComponents from '../DOM/mountComponents';
import setAnimationTimeout from '../internals/setAnimationTimeout';


const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;
const RENDER_STREAM_DOM_TARGET = constants.RENDER_STREAM_DOM_TARGET;
const RENDER_STREAM_STRING_TARGET = constants.RENDER_STREAM_STRING_TARGET;

function render(viewStream, renderStream) {
	let {ashElementTree, ashNodeTree} = viewStream.get();

	if (!renderStream.previousAshNodeTree) {
		let isNodeTreeValid = false;
		let isNodeTreeValidated = false;

		renderStream.previousAshNodeTree = ashNodeTree;

		// there are some element nodes?
		if (this.target === RENDER_STREAM_DOM_TARGET && renderStream.containerNode.childNodes.length) {
			isNodeTreeValidated = true;
			isNodeTreeValid = validateNodeTree(renderStream.containerNode.childNodes[0], ashNodeTree, viewStream.id);
		}

		// render to the Real DOM, if needed
		if (!isNodeTreeValid || !isNodeTreeValidated) {
			if (isNodeTreeValidated) {
				throw new Error('Existing html is invalid!');
			}

			// remove existing nodes
			if (this.target === RENDER_STREAM_DOM_TARGET) {
				while (renderStream.containerNode.firstChild) {
					renderStream.containerNode.removeChild(renderStream.containerNode.firstChild);
				}
			}
			
			setAnimationTimeout(() => {
				if (this.target === RENDER_STREAM_DOM_TARGET) {
					let nodeTree = createNodeTree(ashNodeTree);

					if (nodeTree) {
						renderStream.containerNode.appendChild(nodeTree);
					}
				}
				
				mountComponents(ashElementTree);
			});
		}

		if (isNodeTreeValid && isNodeTreeValidated) {
			mountComponents(ashElementTree);
		}
	} else {
		let patches = diffAshNodeTree(renderStream.previousAshNodeTree, ashNodeTree);

		if (this.target === RENDER_STREAM_DOM_TARGET) {
			let isSuccessful = patchNodeTree(renderStream.rootNode, patches);

			if (!isSuccessful) {
				throw new Error('Patching the DOM was unsuccesful!');
			}
		}

		renderStream.previousAshNodeTree = ashNodeTree;

		mountComponents(ashElementTree);
	}
}

export default class RenderStream extends Stream {
	containerNode = null;
	previousAshNodeTree = null;
	target = RENDER_STREAM_DOM_TARGET;

	constructor(viewStream, node) {
		super();

		if (!(viewStream instanceof ViewStream)) {
			throw new Error(`${viewStream} (viewStream) must be an ViewStream instance.`);
		}

		if (!isElement(node)) {
			this.target = RENDER_STREAM_STRING_TARGET;
		}

		this.fn = render;

		if (this.target === RENDER_STREAM_DOM_TARGET) {
			this.containerNode = node;

			// remove child nodes which are not element nodes
			for (let j = 0; j < this.containerNode.childNodes.length; j++) {
				if (this.containerNode.childNodes[j].nodeType !== 1) {
					this.containerNode.removeChild(this.containerNode.childNodes[j]);

					j--;
				}
			}
		}

		this.from(viewStream);

		return this;
	}

	get rootNode() {
		if (this.target === RENDER_STREAM_DOM_TARGET) {
			for (let i = 0; i < this.containerNode.childNodes.length; i++) {
				if (typeof this.containerNode.childNodes[i][ID_ATTRIBUTE_NAME] !== 'undefined') {
					return this.containerNode.childNodes[i];
				}
			}
		}

		return null;
	}

	stringify() {
		return stringifyAshNodeTree(this.__dependencies[0].get().ashNodeTree);
	}
}
