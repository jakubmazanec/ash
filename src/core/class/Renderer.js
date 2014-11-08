'use strict';

var _ = require('_');
var $ = require('jquery');

var Stage = require('./Stage');
var isComponentAshElement = require('../internal/isComponentAshElement');
var createAshDOM = require('../DOM/createAshDOM');
var createDOM = require('../DOM/createDOM');
var diffAshDOM = require('../DOM/diffAshDOM');
var patchDOM = require('../DOM/patchDOM');
var mountComponents = require('../DOM/mountComponents');

var renderer;

class Renderer {
	constructor() {
		if (renderer)
		{
			return renderer;
		}

		if (!(this instanceof Renderer))
		{
			return new Renderer();
		}
			
		this.stages = [];
		renderer = this;

		// render loop is always bound to renderer
		renderer.__render = renderer.__render.bind(renderer);

		return renderer;
	}

	registerComponent(componentDescriptor, domNode) {
		// type check
		if (!isComponentAshElement(componentDescriptor)) {
			throw new Error(componentDescriptor + ' must be a Componenet Descriptor.');
		}

		// type check
		if (!_.isElement(domNode)) {
			throw new Error(domNode + ' must be a DOM Element.');
		}

		// create new stage
		this.stages.push(new Stage(componentDescriptor, domNode));
		this.stages[this.stages.length - 1].renderer = this;

		this.__render();

		return this;
	}
	
	__render() {
		var renderer = this;
		var newVirtualDOM;
		var patches;
		var rerender;
		var i;
		var j;
		var stage;

		//console.log('rendering...', performance.now() - window.dispatcherTimestamp);

		//this.timestamp = performance.now();

		for (i = 0; i < this.stages.length; i++) {
			if (this.stages[i].__isDirty && !this.stages[i].__isRendering) {
				stage = this.stages[i];
				
				this.stages[i].__isRendering = true;

				if (!this.stages[i].virtualDOM) {
					$(stage.domNode).empty();

					// create Virtual DOM
					this.stages[i].virtualDOM = createAshDOM(this.stages[i].descriptorTree);



					// render to the Real DOM
					this.stages[i].domNode.appendChild(createDOM(this.stages[i].virtualDOM));

					// mount components
					mountComponents(this.stages[i].descriptorTree);
				} else {
					newVirtualDOM = createAshDOM(this.stages[i].descriptorTree);

					//console.log('creating vdom done in', performance.now() - renderer.timestamp, performance.now() - window.dispatcherTimestamp);


					patches = diffAshDOM(this.stages[i].virtualDOM, newVirtualDOM);

					//console.log('diffing done in', performance.now() - renderer.timestamp, performance.now() - window.dispatcherTimestamp);

					this.stages[i].virtualDOM = newVirtualDOM;

					//console.log('patches', patches);

					requestAnimationFrame(function () {
						
						rerender = !patchDOM(stage.getRootDOMNode(), patches);

						if (rerender) {
							console.warn('Patching the DOM was unsuccesful, rerendering everything.');
							$(stage.domNode).empty();
							stage.domNode.appendChild(createDOM(stage.virtualDOM));
						}

						//console.log('rendering done in ', performance.now() - renderer.timestamp, performance.now() - window.dispatcherTimestamp);
					});
					

					// mount components
					mountComponents(this.stages[i].descriptorTree);
				}

				this.stages[i].__isDirty = false;
				this.stages[i].__isRendering = false;
			}
		}

		

		// request animation frame 
		//requestAnimationFrame(this.__render);

		return this;
	}
}

module.exports = Renderer;