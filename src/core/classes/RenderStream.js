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

function render(stream, changed, dependencies) {
	let viewStream = dependencies[0];
	let {ashElementTree, ashNodeTree} = viewStream.get();

	if (!stream.previousAshNodeTree) {
		let isNodeTreeValid = false;
		let isNodeTreeValidated = false;

		stream.previousAshNodeTree = ashNodeTree;

		// there are some element nodes?
		if (this.target === RENDER_STREAM_DOM_TARGET && stream.containerNode.childNodes.length) {
			isNodeTreeValidated = true;
			isNodeTreeValid = validateNodeTree(stream.containerNode.childNodes[0], ashNodeTree, viewStream.id);
		}

		// render to the Real DOM, if needed
		if (!isNodeTreeValid || !isNodeTreeValidated) {
			if (isNodeTreeValidated) {
				throw new Error('Existing html is invalid!');
			}

			// remove existing nodes
			if (this.target === RENDER_STREAM_DOM_TARGET) {
				while (stream.containerNode.firstChild) {
					stream.containerNode.removeChild(stream.containerNode.firstChild);
				}
			}
			
			setAnimationTimeout(() => {
				if (this.target === RENDER_STREAM_DOM_TARGET) {
					let nodeTree = createNodeTree(ashNodeTree);

					if (nodeTree) {
						stream.containerNode.appendChild(nodeTree);
					}
				}
				
				mountComponents(ashElementTree);
			});
		}

		if (isNodeTreeValid && isNodeTreeValidated) {
			mountComponents(ashElementTree);
		}
	} else {
		let patches = diffAshNodeTree(stream.previousAshNodeTree, ashNodeTree);

		if (this.target === RENDER_STREAM_DOM_TARGET) {
			let isSuccessful = patchNodeTree(stream.rootNode, patches);

			if (!isSuccessful) {
				throw new Error('Patching the DOM was unsuccesful!');
			}
		}

		stream.previousAshNodeTree = ashNodeTree;

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
