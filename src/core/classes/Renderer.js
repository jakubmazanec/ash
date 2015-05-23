import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import createNodeTree from '../DOM/createNodeTree';
import diffAshNodeTree from '../DOM/diffAshNodeTree';
import patchNodeTree from '../DOM/patchNodeTree';
import stringifyAshNodeTree from '../DOM/stringifyAshNodeTree';
import validateNodeTree from '../DOM/validateNodeTree';
import constants from '../internals/constants';
import isElement from '../internals/isElement';
import Stream from '../streams/Stream';
import AshNodeStream from '../streams/AshNodeStream';


const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;

var renderer;

function mountComponents(ashElement) {
	if (isAshNodeAshElement(ashElement)) {
		for (let i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				mountComponents(ashElement.children[i]);
			}
		}
	} else if (isComponentAshElement(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle === LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

class Renderer {
	streams = [];

	constructor() {
		if (renderer) {
			return renderer;
		}

		// save singleton
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = ::renderer.render;

		return renderer;
	}

	addStream(ashNodeStream, node) {
		if (!(ashNodeStream instanceof AshNodeStream)) {
			throw new Error(`${ashNodeStream} (ashNodeStream) must be an AshNodeStream instance.`);
		}

		if (!isElement(node)) {
			throw new Error(node + ' must be a DOM Element.');
		}

		let renderStream = new Stream();

		renderStream.id = ashNodeStream.id;
		renderStream.node = node;
		renderStream.getRootNode = ashNodeStream.getRootNode = () => {
			for (let i = 0; i < node.childNodes.length; i++) {
				if (typeof node.childNodes[i][ID_ATTRIBUTE_NAME] !== 'undefined') {
					return node.childNodes[i];
				}
			}

			return null;
		};

		renderStream.from(this.render, ashNodeStream);

		this.streams.push(renderStream);

		return this;
	}

	streamToString(ashNodeStream) {
		if (!(ashNodeStream instanceof AshNodeStream)) {
			throw new Error(`${ashNodeStream} (ashNodeStream) must be an AshNodeStream instance.`);
		}

		return stringifyAshNodeTree(ashNodeStream.get());
	}

	render(stream, changed, dependencies) {
		var ashNodeStream = dependencies[0];

		if (!stream.ashNodeTree) {
			let isNodeTreeValid = false;
			let isNodeTreeValidated = false;

			// remove child nodes which are not element nodes
			for (let j = 0; j < stream.node.childNodes.length; j++) {
				if (stream.node.childNodes[j].nodeType !== 1) {
					stream.node.removeChild(stream.node.childNodes[j]);

					j--;
				}
			}

			// create ash node tree
			stream.ashNodeTree = ashNodeStream.get();

			// there are some element nodes?
			if (stream.node.childNodes.length) {
				isNodeTreeValidated = true;
				isNodeTreeValid = validateNodeTree(stream.node.childNodes[0], stream.ashNodeTree, stream.id);
			}

			// render to the Real DOM, if needed
			if (!isNodeTreeValid || !isNodeTreeValidated) {
				if (isNodeTreeValidated) {
					throw new Error('Existing html is invalid!');
				}



				while (stream.node.firstChild) {
					stream.node.removeChild(stream.node.firstChild);
				}

				stream.isRendering = true;

				global.requestAnimationFrame(() => {
					stream.node.appendChild(createNodeTree(stream.ashNodeTree));

					// mount components
					mountComponents(ashNodeStream.ashElementTree);

					stream.isRendering = false;
				});
			} if (isNodeTreeValid && isNodeTreeValidated) {
				// mount components
				mountComponents(ashNodeStream.ashElementTree);
			}
		} else {
			let newAshNodeTree = ashNodeStream.get();
			let patches = diffAshNodeTree(stream.ashNodeTree, newAshNodeTree);

			stream.ashNodeTree = newAshNodeTree;
			stream.isRendering = true;

			global.requestAnimationFrame(() => {
				var isSuccessful = patchNodeTree(stream.getRootNode(), patches);

				if (!isSuccessful) {
					throw new Error('Patching the DOM was unsuccesful!');
				}

				// mount components
				mountComponents(ashNodeStream.ashElementTree);
				
				stream.isRendering = false;
			});
		}
	}
}

export default Renderer;
