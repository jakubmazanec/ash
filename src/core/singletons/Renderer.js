'use strict';

var _ = require('_');
var $ = require('jquery');
var Construct = require('../classes/Construct');
var Stage = require('../classes/Stage');
var isComponentDescriptor = require('../internals/isComponentDescriptor');
var createVirtualDOM = require('../virtualDOM/createVirtualDOM');
var renderVirtualDOM = require('../virtualDOM/renderVirtualDOM');
var diffVirtualDOMs = require('../virtualDOM/diffVirtualDOMs');
var patchVirtualDOM = require('../virtualDOM/patchVirtualDOM');
var mountComponents = require('../virtualDOM/mountComponents');

var renderer;

var Renderer = Construct.extend(
{
	constructor: function ()
	{
		if (renderer)
		{
			return renderer;
		}

		if (!(this instanceof Renderer))
		{
			return new Renderer();
		}
			
		this.__stages = [];
		renderer = this;

		// render loop is always bound to renderer
		renderer.__render = renderer.__render.bind(renderer);

		return renderer;
	},

	registerComponent: function (componentDescriptor, domNode)
	{
		// type check
		if (!isComponentDescriptor(componentDescriptor))
		{
			throw new Error(componentDescriptor + ' must be a Componenet Descriptor.');
		}

		// type check
		if (!_.isElement(domNode))
		{
			throw new Error(domNode + ' must be a DOM Element.');
		}

		// create new stage
		this.__stages.push(new Stage(componentDescriptor, domNode));
		this.__stages[this.__stages.length - 1].renderer = this;

		this.__render();

		return this;
	},
	
	__render: function ()
	{
		var renderer = this;
		var newVirtualDOM;
		var patches;
		var rerender;
		var i;
		var j;
		var stage;

		//console.log('rendering...', performance.now() - window.dispatcherTimestamp);

		//this.timestamp = performance.now();

		for (i = 0; i < this.__stages.length; i++)
		{
			if (this.__stages[i].__isDirty && !this.__stages[i].__isRendering)
			{
				stage = this.__stages[i];
				
				this.__stages[i].__isRendering = true;

				if (!this.__stages[i].virtualDOM)
				{
					$(stage.domNode).empty();

					// create Virtual DOM
					this.__stages[i].virtualDOM = createVirtualDOM(this.__stages[i].descriptorTree);



					// render to the Real DOM
					this.__stages[i].domNode.appendChild(renderVirtualDOM(this.__stages[i].virtualDOM));

					// mount components
					mountComponents(this.__stages[i].descriptorTree);
				} else
				{
					newVirtualDOM = createVirtualDOM(this.__stages[i].descriptorTree);

					//console.log('creating vdom done in', performance.now() - renderer.timestamp, performance.now() - window.dispatcherTimestamp);


					patches = diffVirtualDOMs(this.__stages[i].virtualDOM, newVirtualDOM);

					//console.log('diffing done in', performance.now() - renderer.timestamp, performance.now() - window.dispatcherTimestamp);

					this.__stages[i].virtualDOM = newVirtualDOM;

					//console.log('patches', patches);

					requestAnimationFrame(function ()
					{
						
						rerender = !patchVirtualDOM(stage.getRootDOMNode(), patches);

						if (rerender)
						{
							console.warn('Patching the DOM was unsuccesful, rerendering everything.');
							$(stage.domNode).empty();
							stage.domNode.appendChild(renderVirtualDOM(stage.virtualDOM));
						}

						//console.log('rendering done in ', performance.now() - renderer.timestamp, performance.now() - window.dispatcherTimestamp);
					});
					

					// mount components
					mountComponents(this.__stages[i].descriptorTree);
				}

				this.__stages[i].__isDirty = false;
				this.__stages[i].__isRendering = false;
			}
		}

		

		// request animation frame 
		//requestAnimationFrame(this.__render);

		return this;
	}
});

module.exports = Renderer;