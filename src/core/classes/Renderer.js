import createNodeTree from '../DOM/createNodeTree';
import diffAshNodeTree from '../DOM/diffAshNodeTree';
import patchNodeTree from '../DOM/patchNodeTree';
import stringifyAshNodeTree from '../DOM/stringifyAshNodeTree';
import validateNodeTree from '../DOM/validateNodeTree';
import constants from '../internals/constants';
import isElement from '../internals/isElement';
import Stream from '../streams/Stream';
import AshNodeStream from '../streams/AshNodeStream';
import mountComponents from '../DOM/mountComponents';



const ID_ATTRIBUTE_NAME = constants.ID_ATTRIBUTE_NAME;

var renderer;

class Renderer {
	streams = [];

	constructor() {
		if (renderer) {
			return renderer;
		}

		renderer = this;
		renderer.render = ::renderer.render;

		return renderer;
	}

	addStream(ashNodeStream, node) {
		if (!(ashNodeStream instanceof AshNodeStream)) {
			throw new Error(`${ashNodeStream} (ashNodeStream) must be an AshNodeStream instance.`);
		}

		if (!isElement(node)) {
			throw new Error(`${node} (node) must be a DOM Element.`);
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
					mountComponents(ashNodeStream.ashElementTree);

					stream.isRendering = false;
				});
			}

			if (isNodeTreeValid && isNodeTreeValidated) {
				mountComponents(ashNodeStream.ashElementTree);
			}
		} else {
			let newAshNodeTree = ashNodeStream.get();
			let patches = diffAshNodeTree(stream.ashNodeTree, newAshNodeTree);
			let isSuccessful = patchNodeTree(stream.getRootNode(), patches);

			if (!isSuccessful) {
				throw new Error('Patching the DOM was unsuccesful!');
			}

			stream.ashNodeTree = newAshNodeTree;

			mountComponents(ashNodeStream.ashElementTree);
		}
	}
}

export default Renderer;
