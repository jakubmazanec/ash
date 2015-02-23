(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// import $ from 'jquery';

var _ = _interopRequire(require("_"));

var ash = _interopRequire(require("./ash"));

// import Display from './components/Display';
// import Timer from './components/Timer';

// global.$ = $;
global._ = _;
global.ash = ash;

var Renderer = global.Renderer = new ash.Renderer();

// Renderer.addComponent(new Timer(), $('.page')[0]);

var AppComponent = (function (_ash$Component) {
	function AppComponent() {
		this.name = "App";
		this.state = new ash.ImmutableObject({
			list1: new ash.ImmutableArray(),
			list2: new ash.ImmutableArray(),
			redShadow: true
		});

		_classCallCheck(this, AppComponent);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}
	}

	_inherits(AppComponent, _ash$Component);

	_prototypeProperties(AppComponent, null, {
		render: {
			/* jshint ignore:end */

			value: function render() {
				return ash.e("div", null, ash.e("div", {
					style: {
						boxShadow: this.state.redShadow ? "2px 2px 5px red" : "2px 2px 5px blue"
					}
				}, ash.e("button", {
					events: { click: this.addToList1 }
				}, "+ list 1"), ash.e("button", {
					events: { click: this.addToList2 }
				}, "+ list 2"), ash.e("button", {
					events: { click: this.clearList1 }
				}, "+ clear 1"), ash.e("button", {
					events: { click: this.clearList2 }
				}, "+ clear 2"), ash.e("button", {
					events: { click: this.changeShadow }
				}, "!!!")), new List(this.state.list1), //);
				new List(this.state.list2));
			},
			writable: true,
			configurable: true
		},
		changeShadow: {
			value: function changeShadow() {
				this.state = this.state.set("redShadow", !this.state.redShadow);
				this.isDirty = true;
			},
			writable: true,
			configurable: true
		},
		addToList1: {
			value: function addToList1() {
				var items = [];

				for (var i = 0; i < 1000; i++) {
					items.push(Math.random().toFixed(1));
				}

				this.state = this.state.merge({ list1: this.state.list1.concat(items) });
				// this.state.list1 = this.state.list1.concat(items);

				this.isDirty = true;
			},
			writable: true,
			configurable: true
		},
		addToList2: {
			value: function addToList2() {
				var items = [];

				for (var i = 0; i < 1000; i++) {
					items.push(Math.random().toFixed(1));
				}

				this.state = this.state.merge({ list2: this.state.list2.concat(items) });
				// this.state.list2 = this.state.list2.concat(items);

				this.isDirty = true;
			},
			writable: true,
			configurable: true
		},
		clearList1: {
			value: function clearList1() {
				this.state = this.state.merge({ list1: [] });
				// this.state.list1 = [];
				this.isDirty = true;
			},
			writable: true,
			configurable: true
		},
		clearList2: {
			value: function clearList2() {
				this.state = this.state.merge({ list2: [] });
				// this.state.list2 = [];
				this.isDirty = true;
			},
			writable: true,
			configurable: true
		}
	});

	return AppComponent;
})(ash.Component);

var App = ash.createElement(AppComponent);

var ListComponent = (function (_ash$Component2) {
	function ListComponent() {
		this.name = "List";
		this.state = { redOutline: false };

		_classCallCheck(this, ListComponent);

		if (_ash$Component2 != null) {
			_ash$Component2.apply(this, arguments);
		}
	}

	_inherits(ListComponent, _ash$Component2);

	_prototypeProperties(ListComponent, null, {
		render: {
			/* jshint ignore:end */

			value: function render() {
				var items = [ash.e("button", {
					events: { click: this.changeOutline }
				}, "!!!")];

				for (var i = 0; i < this.props.length; i++) {
					items.push(ash.e("li", null, /*{key: i + ''}*/this.props[i] + ""));
				}

				return ash.e("ul", { style: { outline: this.state.redOutline ? "1px solid red" : "1px solid blue" } }, items);
			},
			writable: true,
			configurable: true
		},
		changeOutline: {
			value: function changeOutline() {
				this.state.redOutline = !this.state.redOutline;

				this.isDirty = true;
			},
			writable: true,
			configurable: true
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {},
			writable: true,
			configurable: true
		}
	});

	return ListComponent;
})(ash.Component);

var List = ash.createElement(ListComponent);

Renderer.addComponent(new App(), global.document.querySelector(".page"));

function assign() {
	var sources = [];
	var target = arguments[0] || {};

	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] && typeof arguments[i] === "object") {
			sources.push(arguments[i]);
		}
	}

	if (!sources.length) {
		return target;
	}

	for (var i = 0; i < sources.length; i++) {
		for (var prop in sources[i]) {
			if (sources[i].hasOwnProperty(prop) && typeof sources[i].prop !== "undefined" && sources[i].prop !== null) {
				target[prop] = sources[i][prop];
			}
		}
	}
}

global.assign = assign;

/*class AppComponent extends React.Component {
	state = {
		list1: [],
		list2: []
	};

	render() {
		return React.createElement('div', null,
			React.createElement('div', null,
				React.createElement('button', {
					onClick: this.addToList1.bind(this)
				}, '+ list 1'),
				React.createElement('button', {
					onClick: this.addToList2.bind(this)
				}, '+ list 2')),
			React.createElement(ListComponent, {list: this.state.list1}),
			React.createElement(ListComponent, {list: this.state.list2}));
	}

	addToList1() {
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.setState({list1: this.state.list1.concat(items)});
	}

	addToList2() {
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.setState({list2: this.state.list2.concat(items)});
	}
}


class ListComponent extends React.Component {
	render() {
		var items = [];

		if (this.props.list) {
			for (let i = 0; i < this.props.list.length; i++) {
				items.push(React.createElement('li', null, this.props.list[i] + ''));
			}
		}

		return React.createElement('ul', null, items);
	}
}

React.render(React.createElement(AppComponent, null), $('.page')[0]);*/

// benchmark
// var start;
// var end;
// var total1 = 0;
// var total2 = 0;
// var total3 = 0;
// var total4 = 0;
// var total5 = 0;
// var total6 = 0;

// var object = {a: 1, b: 2};

// var coll = icepick.freeze(object);
// var imobj = new ash.ImmutableObject(object);

// const TEST_STRESS = 100;
// const TEST_REPEAT = 10;

// for (let j = 0; j < TEST_REPEAT; j++) {
// 	start = global.performance.now();
// 	for (let i = 0; i < TEST_STRESS; i++) {
// 		coll = icepick.assoc(coll, 'new' + i, i);
// 	}
// 	end = global.performance.now();
// 	total1 += (end - start);

// 	start = global.performance.now();
// 	for (let i = 0; i < TEST_STRESS; i++) {
// 		imobj = imobj.set('new' + i, i);
// 	}
// 	end = global.performance.now();
// 	total2 += (end - start);

// start = global.performance.now();
// for (let i = 0; i < TEST_STRESS; i++) {
// 	zeroPadNumber2(12345, 10, '0');
// }
// end = global.performance.now();
// total3 += (end - start);
// }

// console.log('icepick', total1 / TEST_REPEAT);
// console.log('ImmutableObject', total2 / TEST_REPEAT);
// console.log('_.padLeft', total3 / TEST_REPEAT);

// var map1 = new ash.ImmutableArray(1, 2);
// var map2 = map1.push(3);
// var map3 = map2.reverse();
// var map4 = new ash.ImmutableArray(map1, 4, 5);
// var map5 = map1.push(map3);
// var map6 = new ash.ImmutableArray([[10, 20], [30, 40]]);
// var map7 = map1.set(3, 'oi!');

// var hash1 = new ash.ImmutableObject({foo: 1, bar: 2});
// var hash2 = hash1.set('pax', {qux: 'oi!'});
// var hash3 = hash1.set('foo', 1);
// var hash4 = hash1.set('foo', '1');
// var hash5 = new ash.ImmutableObject({
// 	foo: 1,
// 	bar: {
// 		pax: 'oi!',
// 		qux: true,
// 		norf: null,
// 		baz: {
// 			foo: () => {},
// 			bar: undefined
// 		}
// 	}
// });

// var hash6 = hash5.merge({
// 	/*bar: {
// 		baz: {
// 			foo: () => {},
// 			bar: undefined
// 		}
// 	}*/
// 	bar: {
// 		pax: false
// 	}
// });

// var hash7 = new ash.ImmutableObject({
// 	orig: 'so so!'
// });

// var hash8 = hash5.merge({imm: [1, 2, hash7]});

// console.log('map1', JSON.stringify(map1), map1, map1['__ash:immutable__']);
// console.log('map2', JSON.stringify(map2), map2);
// console.log('map3', JSON.stringify(map3), map3);
// console.log('map4', JSON.stringify(map4), map4, map4[0] === map1);
// console.log('map5', JSON.stringify(map5), map5, map5[2] === map3);
// console.log('map6', JSON.stringify(map6), map6);
// console.log('map7', JSON.stringify(map7), map7);

// console.log('hash1', JSON.stringify(hash1), hash1);
// console.log('hash2', JSON.stringify(hash2), hash2);
// console.log('hash3', JSON.stringify(hash3), hash3, hash3 === hash1);
// console.log('hash4', JSON.stringify(hash4), hash4, hash4 === hash1);
// console.log('hash5', JSON.stringify(hash5), hash5);
// console.log('hash6', JSON.stringify(hash6), hash6, hash6 === hash5);
// console.log('hash7', JSON.stringify(hash7), hash7);
// console.log('hash8', JSON.stringify(hash8), hash8, hash8.imm[2] === hash7);

/*$(document).on('click', 'a', function (event) {
	event.preventDefault();


});

var $buttons = $('.ash-button--flat').eq(0);
var progress = 0;

var makeProgress = function () {
	console.log(progress);

	progress += Math.random();

	if (progress > 100) progress = 0;

	$buttons.removeClass (function (index, css) {
			return (css.match (/(^|\s)progress-\S+/g) || []).join(' ');
	});

	$buttons.addClass('progress-' + Math.floor(progress));

	requestAnimationFrame(makeProgress);
};*/

//requestAnimationFrame(makeProgress);

//Renderer.addComponent(timer(), $('.page-content')[0]);

/*class FooComponent extends ash.Component {
	render() {
		return ash.e('div', {
			style: {
				'border-top': '1px solid red',
				'font-size': '24px'
			},
			'checked': true,
			'value': 42,
			'data-foo': '<This is Foo!>'
		}, [
			ash.e('b', null, 'This is Foo!')
		]);
	}
}

var fooComponent = ash.createFactory(FooComponent);*/

//html = Renderer.componentToString(fooComponent());
//html = Renderer.componentToString(Timer());

//console.log(html);

//$('.page').html('<br>');

/**
 * todo
 */

/*var TodoStore = require('./todo/TodoStore');
var TodoApp = require('./todo/components/TodoApp');*/

/*var router = global.router = new ash.Router();
router.add('*all', 'not found');
router.on('all', function ()
{
	console.log('router triggered something', arguments);
});
router.start();*/

// global.TodoStore = TodoStore;
// var todoApp = global.todoApp = new TodoApp();

// TodoStore.create('foo');
// TodoStore.create('bar');
// TodoStore.create('baz');
// // TodoStore.create('qux');

// TodoStore.todos['todo-1'].complete = true;

// Renderer.registerComponent(todoApp, $('.page-content')[0]);

/* jshint ignore:start */

/*state = {
	list1: [],
	list2: [],
	redShadow: true
};*/

/* jshint ignore:start */
/*target, ...source*/
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ash":2,"_":146}],2:[function(require,module,exports){
"use strict";

var ash = require("../src/index");

module.exports = ash;
},{"../src/index":47}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isAshElement = _interopRequire(require("../internal/isAshElement"));

var isString = _interopRequire(require("../internal/isString"));

var isComponentAshElement = _interopRequire(require("../internal/isComponentAshElement"));

var isAshNodeAshElement = _interopRequire(require("../internal/isAshNodeAshElement"));

var constants = _interopRequire(require("../internal/constants"));

var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;

function walkCreateAshElementTree(ashElement, index, owner, lastLevel) {
	// type check
	if (!isComponentAshElement(owner)) {
		throw new Error(owner + " must be a Component type AshElement Object");
	}

	if (isAshNodeAshElement(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.level = lastLevel + LEVEL_SEPARATOR + index;
		ashElement.order = index;

		// set up owner & stage
		ashElement.owner = owner;
		ashElement.stage = owner.stage;

		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// set up parent
				ashElement.children[i].parent = ashElement;

				// walk the child
				walkCreateAshElementTree(ashElement.children[i], i, owner, ashElement.level);
			}
		}
	} else if (isComponentAshElement(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.level = lastLevel + LEVEL_SEPARATOR + index;
		ashElement.order = index;

		// set up owner
		ashElement.owner = owner;
		ashElement.stage = owner.stage;

		// create child by rendering component
		ashElement.instance.onBeforeMount();
		ashElement.instance.lifecycle = LIFECYCLE_MOUNTING;
		ashElement.children[0] = ashElement.instance.cachedRender;

		if (ashElement.children[0]) {
			// set up parent
			ashElement.children[0].parent = ashElement;

			// walk the child
			walkCreateAshElementTree(ashElement.children[0], 0, ashElement, ashElement.level);
		}
	}
}

function createAshElementTree(rootAshElement, stage, startingLevel) {
	// type check
	if (!isAshElement(rootAshElement)) {
		throw new Error(rootAshElement + " must be a AshElement object.");
	}

	if (!stage) {
		throw new Error(stage + " must be an object.");
	}

	startingLevel = isString(startingLevel) ? startingLevel : "0";

	var ashElementTree = rootAshElement;

	ashElementTree.stage = stage;
	ashElementTree.isRoot = true;

	if (isComponentAshElement(ashElementTree)) {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.level = startingLevel;
		ashElementTree.order = typeof ashElementTree.order === "undefined" ? 0 : ashElementTree.order;

		// create child by rendering component
		ashElementTree.instance.onBeforeMount();
		ashElementTree.children[0] = ashElementTree.instance.cachedRender;
		ashElementTree.instance.lifecycle = LIFECYCLE_MOUNTING;

		// set up a parent
		ashElementTree.children[0].parent = ashElementTree;

		// walk the child
		walkCreateAshElementTree(ashElementTree.children[0], 0, ashElementTree, ashElementTree.level);
	} else {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.level = startingLevel;
		ashElementTree.order = typeof ashElementTree.order === "undefined" ? 0 : ashElementTree.order;

		for (var i = 0; i < ashElementTree.children.length; i++) {
			// set up a parent
			ashElementTree.children[i].parent = ashElementTree;

			// walk the child
			walkCreateAshElementTree(ashElementTree.children[i], i, ashElementTree.owner, ashElementTree.level);
		}
	}

	// return resulting descriptor tree
	return ashElementTree;
}

module.exports = createAshElementTree;
},{"../internal/constants":25,"../internal/isAshElement":28,"../internal/isAshNodeAshElement":30,"../internal/isComponentAshElement":32,"../internal/isString":40}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isComponentAshElement = _interopRequire(require("../internal/isComponentAshElement"));

var isAshNodeAshElement = _interopRequire(require("../internal/isAshNodeAshElement"));

var isAshNode = _interopRequire(require("../internal/isAshNode"));

var constants = _interopRequire(require("../internal/constants"));

var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	if (isAshNode(ashNodeAshElement.instance)) {
		return {
			type: ashNodeAshElement.instance.type,
			index: ashNodeAshElement.instance.index,
			stage: ashNodeAshElement.stage.id,
			tagName: ashNodeAshElement.instance.tagName,
			key: ashNodeAshElement.instance.key,
			properties: ashNodeAshElement.instance.properties,
			children: []
		};
	} else {
		return {
			type: ashNodeAshElement.instance.type,
			index: ashNodeAshElement.instance.index,
			stage: ashNodeAshElement.stage.id,
			text: ashNodeAshElement.instance.text
		};
	}
}

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentIndex, isParentDirty) {
	var clonedAshNode;

	if (isAshNodeAshElement(ashElement)) {
		// clone virtual node
		clonedAshNode = cloneAshNode(ashElement);

		// set up ordering properties
		ashElement.instance.index = clonedAshNode.index = parentIndex + LEVEL_SEPARATOR + index;
		ashElement.instance.order = clonedAshNode.order = index;

		// is parent component dirty?
		clonedAshNode.isDirty = isParentDirty;

		// add child
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].index, isParentDirty);
		}
	} else if (ashElement && ashElement.children[0]) {
		var isDirty = ashElement.isDirty;
		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentIndex, isDirty);
	}
}

function createAshNodeTree(componentAshElement) {
	// type check
	if (!isComponentAshElement(componentAshElement)) {
		throw new Error(componentAshElement + " must be a Component Descriptor object.");
	}

	var ashElement = componentAshElement;
	var ashNodeTree;
	var isDirty = ashElement.isDirty;
	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!isAshNodeAshElement(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// set up ash node tree
	ashNodeTree = cloneAshNode(ashElement);

	// set up ordering properties
	ashElement.instance.index = ashNodeTree.index = "0";
	ashElement.instance.order = ashNodeTree.order = 0;

	// is parent component dirty?
	ashNodeTree.isDirty = isDirty;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.index, isDirty);
	}

	return ashNodeTree;
}

module.exports = createAshNodeTree;
},{"../internal/constants":25,"../internal/isAshNode":29,"../internal/isAshNodeAshElement":30,"../internal/isComponentAshElement":32}],5:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isAshTextNode = _interopRequire(require("../internal/isAshTextNode"));

var setNodeProperties = _interopRequire(require("./setNodeProperties"));

var constants = _interopRequire(require("../internal/constants"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;

function createNodeTree(ashNodeTree) {
	var nodeTree;
	var child;

	if (isAshTextNode(ashNodeTree)) {
		nodeTree = global.document.createTextNode(ashNodeTree.text);
		nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
		nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
		nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;

		return nodeTree;
	}

	// create element
	if (ashNodeTree.tagName == "svg" || ashNodeTree.tagName == "use") {
		nodeTree = global.document.createElementNS("http://www.w3.org/2000/svg", ashNodeTree.tagName);
	} else {
		nodeTree = global.document.createElement(ashNodeTree.tagName);
	}

	// set properties
	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
	nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;
	setNodeProperties(nodeTree, ashNodeTree.properties, true);
	//$(nodeTree).attr('index', nodeTree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('order', nodeTree[ORDER_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);

	for (var i = 0; i < ashNodeTree.children.length; i++) {
		child = createNodeTree(ashNodeTree.children[i]);

		if (child) {
			nodeTree.appendChild(child);
		}
	}

	return nodeTree;
}

module.exports = createNodeTree;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/constants":25,"../internal/isAshTextNode":31,"./setNodeProperties":11}],6:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("../internal/constants"));

var parseAshNodeIndex = _interopRequire(require("./parseAshNodeIndex"));

// constants references
var PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
var PATCH_ORDER = constants.PATCH_ORDER;
var PATCH_INSERT = constants.PATCH_INSERT;
var PATCH_REMOVE = constants.PATCH_REMOVE;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function diffChildren(oldChildren, newChildren, patches) {
	// lets fill in keys, if needed; simple first-to-first correspondence
	var oldChildIndex = 0;
	var newChildIndex = 0;
	var lastKey = 0;
	var key = "__key:" + lastKey + "__";
	var isChildDirty = false;

	for (var i = 0, _length = Math.max(oldChildren.length, newChildren.length); i < _length; i++) {
		if (newChildren[i] && newChildren[i].isDirty) {
			isChildDirty = true;
		}

		if (oldChildren[i] && oldChildren[i].key) {
			oldChildren[i].tempKey = oldChildren[i].key;
		}

		if (newChildren[i] && newChildren[i].key) {
			newChildren[i].tempKey = newChildren[i].key;
		}

		while (oldChildren[oldChildIndex] && oldChildren[oldChildIndex].key) {
			oldChildIndex++;
		}

		while (newChildren[newChildIndex] && newChildren[newChildIndex].key) {
			newChildIndex++;
		}

		if (oldChildren[oldChildIndex]) {
			oldChildren[oldChildIndex].tempKey = key;
		}

		if (newChildren[newChildIndex]) {
			newChildren[newChildIndex].tempKey = key;
		}

		lastKey++;
		key = "__key:" + lastKey + "__";
		oldChildIndex++;
		newChildIndex++;
	}

	// no children are dirty
	if (!isChildDirty && oldChildren.length === newChildren.length) {
		for (var i = 0; i < oldChildren.length; i++) {
			// now walk inside those children...
			diffAshNodeTree(oldChildren[i], newChildren[i], patches);
		}

		return patches;
	}

	// keys are in; let's compare order of children
	var foundIndex;

	// first iterate over old children
	for (var i = 0; i < oldChildren.length; i++) {
		var isChildFound = false;

		for (var j = 0; j < newChildren.length; j++) {
			if (oldChildren[i].tempKey === newChildren[j].tempKey) {
				isChildFound = true;
				foundIndex = j;

				break;
			}
		}

		// node with matching key was found?
		if (isChildFound) {
			// is order same?
			if (i != foundIndex) {
				patches.push({
					type: PATCH_ORDER,
					newIndex: newChildren[foundIndex].index,
					index: oldChildren[i].index,
					parsedIndex: parseAshNodeIndex(oldChildren[i].index),
					stage: oldChildren[i].stage,
					order: foundIndex
				});

				for (var k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
					if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
						patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
					}
				}
			}

			// now walk inside those children...
			diffAshNodeTree(oldChildren[i], newChildren[foundIndex], patches);
		} else {
			// node is to be removed...
			patches.push({
				type: PATCH_REMOVE,
				index: oldChildren[i].index,
				parsedIndex: parseAshNodeIndex(oldChildren[i].index),
				stage: oldChildren[i].stage });

			for (var k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
					patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
				}
			}
		}
	}

	// now iterate over new children; let's see, if there are any new...
	for (var j = 0; j < newChildren.length; j++) {
		var isChildFound = false;

		for (var i = 0; i < oldChildren.length; i++) {
			if (oldChildren[i].tempKey === newChildren[j].tempKey) {
				isChildFound = true;
				break;
			}
		}

		// new child was not found
		if (!isChildFound) {
			patches.push({
				type: PATCH_INSERT,
				index: newChildren[j].index,
				parsedIndex: parseAshNodeIndex(newChildren[j].index),
				node: newChildren[j]
			});

			for (var k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
					patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
				}
			}

			var parentIndex = parseAshNodeIndex(newChildren[j].index);
			parentIndex.pop();
			patches[patches.length - 1].parentIndex = parentIndex.join(LEVEL_SEPARATOR);
		}
	}

	return patches;
}

function diffAshNodeTree(oldAshNode, newAshNode /*, patches*/) {
	// compare nodes
	var patches = Array.isArray(arguments[2]) ? arguments[2] : [];
	var differentProperties = false;
	var propertiesToChange = {};
	var propertiesToRemove = [];

	if (typeof patches.maxIndex === "undefined") {
		patches.maxIndex = 0;
	}

	if (typeof patches.stage === "undefined") {
		patches.stage = oldAshNode.stage;
	}

	if (!newAshNode.isDirty) {
		// diff the children...
		if (!((!oldAshNode.children || !oldAshNode.children.length) && (!newAshNode.children || !newAshNode.children.length))) {
			diffChildren(oldAshNode.children, newAshNode.children, patches);
		}

		return patches;
	}

	// which propertie are different or new
	for (var newProperty in newAshNode.properties) {
		if (newAshNode.properties.hasOwnProperty(newProperty) && oldAshNode.properties && newAshNode.properties[newProperty] !== oldAshNode.properties[newProperty]) {
			if (typeof newAshNode.properties[newProperty] === "object" && oldAshNode.properties[newProperty] && typeof oldAshNode.properties[newProperty] == "object") {
				// which propertie are different or new
				for (var newSubproperty in newAshNode.properties[newProperty]) {
					if (newAshNode.properties[newProperty].hasOwnProperty(newSubproperty) && newAshNode.properties[newProperty][newSubproperty] !== oldAshNode.properties[newProperty][newSubproperty]) {
						propertiesToChange[newProperty] = propertiesToChange[newProperty] || {};
						propertiesToChange[newProperty][newSubproperty] = newAshNode.properties[newProperty][newSubproperty];

						differentProperties = true;
					}
				}

				// which properties are to be removed
				for (var oldSubproperty in oldAshNode.properties[newProperty]) {
					if (oldAshNode.properties[newProperty].hasOwnProperty(oldSubproperty) && typeof newAshNode.properties[newProperty][oldSubproperty] === "undefined") {
						propertiesToRemove.push(newProperty + "." + oldSubproperty);

						differentProperties = true;
					}
				}
			} else {
				propertiesToChange[newProperty] = newAshNode.properties[newProperty];

				differentProperties = true;
			}
		}
	}

	// which properties are to be removed
	for (var oldProperty in oldAshNode.properties) {
		if (oldAshNode.properties.hasOwnProperty(oldProperty) && newAshNode.properties && typeof newAshNode.properties[oldProperty] === "undefined") {
			differentProperties = true;
			propertiesToRemove.push(oldProperty);
		}
	}

	if (oldAshNode.type !== newAshNode.type || oldAshNode.tagName !== newAshNode.tagName) {
		patches.push({
			type: PATCH_ASH_NODE,
			index: oldAshNode.index,
			parsedIndex: parseAshNodeIndex(oldAshNode.index),
			stage: oldAshNode.stage,
			node: newAshNode
		});

		for (var k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
				patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
			}
		}

		// whole node must be replaced; no sense in finding other differences
		return patches;
	}

	if (oldAshNode.text !== newAshNode.text) {
		patches.push({
			type: PATCH_ASH_TEXT_NODE,
			index: oldAshNode.index,
			parsedIndex: parseAshNodeIndex(oldAshNode.index),
			text: newAshNode.text
		});

		for (var k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
				patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
			}
		}
	}

	if (differentProperties) {
		patches.push({
			type: PATCH_PROPERTIES,
			index: oldAshNode.index,
			parsedIndex: parseAshNodeIndex(oldAshNode.index),
			stage: oldAshNode.stage,
			propertiesToChange: propertiesToChange,
			propertiesToRemove: propertiesToRemove
		});

		for (var k = 0; k < patches[patches.length - 1].parsedIndex.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].parsedIndex[k]) {
				patches.maxIndex = patches[patches.length - 1].parsedIndex[k];
			}
		}
	}

	// diff the children...
	if (!((!oldAshNode.children || !oldAshNode.children.length) && (!newAshNode.children || !newAshNode.children.length))) {
		diffChildren(oldAshNode.children, newAshNode.children, patches);
	}

	return patches;
}

module.exports = diffAshNodeTree;
},{"../internal/constants":25,"./parseAshNodeIndex":8}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var parseAshNodeIndex = _interopRequire(require("./parseAshNodeIndex"));

var constants = _interopRequire(require("../internal/constants"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;

function findNode(nodeTree, nodeIndex) {
	var parsedAshNodeIndex = parseAshNodeIndex(nodeIndex);
	var node = nodeTree;

	if (!nodeTree) {
		throw new Error(nodeTree + " cannot be falsy.");
	}

	if (parsedAshNodeIndex.length == 1) {
		return node;
	} else {
		for (var i = 1, _length = parsedAshNodeIndex.length - 1; i < _length; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[parsedAshNodeIndex[i]];
		}
	}

	for (var i = 0, _length2 = node.childNodes.length; i < _length2; i++) {
		if (node.childNodes[i].nodeType == 1 && node.childNodes[i][INDEX_ATTRIBUTE_NAME] == nodeIndex) {
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType == 3 && i == parsedAshNodeIndex[parsedAshNodeIndex.length - 1]) {
			return node.childNodes[i];
		}
	}

	return false;
}

module.exports = findNode;
},{"../internal/constants":25,"./parseAshNodeIndex":8}],8:[function(require,module,exports){
"use strict";

function parseAshNodeIndex(index) {
	var result = index.split(".");

	for (var i = 0; i < result.length; i++) {
		result[i] = parseInt(result[i], 10);
	}

	return result;
}

module.exports = parseAshNodeIndex;
},{}],9:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("../internal/constants"));

var parseAshNodeIndex = _interopRequire(require("./parseAshNodeIndex"));

var createNodeTree = _interopRequire(require("./createNodeTree"));

var setNodeProperties = _interopRequire(require("./setNodeProperties"));

var removeNodeProperties = _interopRequire(require("./removeNodeProperties"));

var findNode = _interopRequire(require("./findNode"));

var EventListener = _interopRequire(require("../class/EventListener"));

var isElement = _interopRequire(require("../internal/isElement"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var PATCH_ASH_NODE = constants.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = constants.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = constants.PATCH_PROPERTIES;
var PATCH_ORDER = constants.PATCH_ORDER;
var PATCH_INSERT = constants.PATCH_INSERT;
var PATCH_REMOVE = constants.PATCH_REMOVE;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var eventListener = new EventListener();

function zeroPadNumber(number, length) {
	var n = Math.pow(10, length);

	return number < n ? ("" + (n + number)).slice(1) : "" + number;
}

function comparePatches(a, b) {
	return a.sortOrder - b.sortOrder;
}

function compareNodes(a, b) {
	return a[ORDER_ATTRIBUTE_NAME] - b[ORDER_ATTRIBUTE_NAME];
}

function walkReindexChildNodes(node, levelIndex, order) {
	var childLevels;

	for (var i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType == 1) {
			childLevels = parseAshNodeIndex(node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
			childLevels[levelIndex] = order;

			node.childNodes[i][INDEX_ATTRIBUTE_NAME] = childLevels.join(LEVEL_SEPARATOR);
			node.childNodes[i][ORDER_ATTRIBUTE_NAME] = childLevels[childLevels.length - 1];
			//$(node.childNodes[i]).attr('index', node.childNodes[i][INDEX_ATTRIBUTE_NAME]);
			//$(node.childNodes[i]).attr('order', node.childNodes[i][ORDER_ATTRIBUTE_NAME]);

			if (node.childNodes[i].childNodes && node.childNodes[i].childNodes.length) {
				walkReindexChildNodes(node.childNodes[i], levelIndex, order);
			}
		}
	}
}

function reindexChildNodes(parentNode, order) {
	var parentLevels = parseAshNodeIndex(parentNode[INDEX_ATTRIBUTE_NAME]);
	var levelIndex = parentLevels.length - 1;

	walkReindexChildNodes(parentNode, levelIndex, order);
}

function flushCache(reindexCache, reorderCache) {
	while (reindexCache.length > 0) {
		reindexCache[0].node[INDEX_ATTRIBUTE_NAME] = reindexCache[0].newIndex;
		reindexCache[0].node[ORDER_ATTRIBUTE_NAME] = reindexCache[0].newOrder;

		//$(reindexCache[0].node).attr('index', reindexCache[0].node[INDEX_ATTRIBUTE_NAME]);
		//$(reindexCache[0].node).attr('order', reindexCache[0].node[ORDER_ATTRIBUTE_NAME]);

		reindexChildNodes(reindexCache[0].node, reindexCache[0].newOrder);

		// clear the cache
		reindexCache.shift();
	}

	// remove un-unique nodes from reorder cache
	for (var i = 0; i < reorderCache.length; i++) {
		for (var j = i + 1; j < reorderCache.length; j++) {
			if (reorderCache[j] === reorderCache[i]) {
				reorderCache.splice(j, 1);
				j--;
			}
		}
	}

	while (reorderCache.length > 0) {
		var children = [];

		for (var i = 0; i < reorderCache[0].childNodes.length; i++) {
			children[i] = reorderCache[0].childNodes[i];
		}

		// sort children
		children.sort(compareNodes);

		for (var i = 0; i < children.length; i++) {
			reorderCache[0].appendChild(children[i]);
		}

		// remove cache item
		reorderCache.shift();
	}
}

// apply patches to dom tree
function patchNodeTree(nodeTree /*, patches*/) {
	var patches = arguments[1];
	var node;
	var reindexCache = [];
	var reorderCache = [];

	// type check
	if (!isElement(nodeTree)) {
		return false;
	}

	if (!patches.length) {
		return true;
	}

	// if there is non zero max index, compute number of its digits
	var maxDigits = 1;

	if (patches.maxIndex > 0) {
		maxDigits = Math.floor(Math.log(Math.abs(Math.floor(patches.maxIndex))) / Math.LN10) + 1;
	}

	// compute sort order
	for (var i = 0; i < patches.length; i++) {
		patches[i].sortOrder = "";

		// first we order patches by their levels without the last level
		for (var j = 0; j < patches[i].parsedIndex.length - 1; j++) {
			patches[i].sortOrder += zeroPadNumber(patches[i].parsedIndex[j], maxDigits);
		}

		// then the patch type is important
		if (patches[i].type === PATCH_ASH_NODE) {
			patches[i].sortOrder += zeroPadNumber(9, maxDigits);
		} else if (patches[i].type == PATCH_ASH_TEXT_NODE) {
			patches[i].sortOrder += zeroPadNumber(8, maxDigits);
		} else if (patches[i].type == PATCH_PROPERTIES) {
			patches[i].sortOrder += zeroPadNumber(7, maxDigits);
		} else if (patches[i].type == PATCH_REMOVE) {
			patches[i].sortOrder += zeroPadNumber(6, maxDigits);
		} else if (patches[i].type == PATCH_INSERT) {
			patches[i].sortOrder += zeroPadNumber(5, maxDigits);
		} else if (patches[i].type == PATCH_ORDER) {
			patches[i].sortOrder += zeroPadNumber(4, maxDigits);
		} else {
			patches[i].sortOrder += zeroPadNumber(0, maxDigits);
		}

		// and now the last level
		patches[i].sortOrder += zeroPadNumber(patches[i].parsedIndex[patches[i].parsedIndex.length - 1], maxDigits);

		// convert to number;
		patches[i].sortOrder = parseInt(patches[i].sortOrder, 10);
	}

	// sort patches by their order
	patches.sort(comparePatches);

	// now lets proof-check some...
	var newParsedIndex;
	var levels;
	var index;

	for (var i = patches.length - 1; i >= 0; i--) {
		if (patches[i].type === PATCH_INSERT) {
			levels = patches[i].parsedIndex.slice(0);

			while (levels.length >= 3) {
				levels.pop();
				index = levels.join(LEVEL_SEPARATOR);

				for (var j = i; j >= 0; j--) {
					if (patches[j].type === PATCH_ORDER && patches[j].newIndex == index) {
						// patches[i].origIndex = patches[i].index;
						// patches[i].origParsedIndex = patches[i].parsedIndex.slice(0);
						// patches[i].origParentIndex = patches[i].parentIndex;
						newParsedIndex = patches[i].parsedIndex.slice(0);

						for (var k = 0; k < patches[j].parsedIndex.length; k++) {
							newParsedIndex[k] = patches[j].parsedIndex[k];
						}

						patches[i].index = newParsedIndex.join(LEVEL_SEPARATOR);
						patches[i].parsedIndex = newParsedIndex.slice(0);
						newParsedIndex = parseAshNodeIndex(patches[i].parentIndex);

						for (var k = 0; k < patches[j].parsedIndex.length; k++) {
							newParsedIndex[k] = patches[j].parsedIndex[k];
						}

						patches[i].parentIndex = newParsedIndex.join(LEVEL_SEPARATOR);
					}
				}
			}
		}
	}

	// now iterate over patches...
	var lastLevel;

	for (var i = patches.length - 1; i >= 0; i--) {
		if (!lastLevel) {
			lastLevel = patches[i].parsedIndex.length;
		}

		if (lastLevel < patches[i].parsedIndex.length) {
			// patching new level, must flush cache
			flushCache(reindexCache, reorderCache);
			lastLevel = patches[i].parsedIndex.length;
		}

		if (patches[i].type === PATCH_ASH_NODE) {
			// remove old events
			eventListener.removeEvents(patches[i].index, patches[i].stage);

			// replace node
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			node.parentNode.replaceChild(createNodeTree(patches[i].node), node);
		}

		if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			node.nodeValue = patches[i].text;
		}

		if (patches[i].type === PATCH_PROPERTIES) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			setNodeProperties(node, patches[i].propertiesToChange, false);
			removeNodeProperties(node, patches[i].propertiesToRemove);
		}

		if (patches[i].type === PATCH_REMOVE) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			// remove old events
			eventListener.removeEvents(patches[i].index, patches[i].stage);

			node.parentNode.removeChild(node);
		}

		if (patches[i].type === PATCH_INSERT) {
			node = findNode(nodeTree, patches[i].parentIndex);

			if (!node) {
				return false;
			}

			node.appendChild(createNodeTree(patches[i].node));

			reorderCache.push(node);
		}

		if (patches[i].type === PATCH_ORDER) {
			node = findNode(nodeTree, patches[i].index);

			if (!node) {
				return false;
			}

			// reindex events
			eventListener.reindexEvents(patches[i].index, patches[i].order, patches[i].stage);

			reindexCache.push({
				node: node,
				newIndex: patches[i].newIndex,
				newOrder: patches[i].order,
				oldIndex: patches[i].index,
				stage: patches[i].stage
			});

			reorderCache.push(node.parentNode);
		}
	}

	flushCache(reindexCache, reorderCache);

	eventListener.markEvents(patches.stage);

	return true;
}

module.exports = patchNodeTree;
},{"../class/EventListener":18,"../internal/constants":25,"../internal/isElement":33,"./createNodeTree":5,"./findNode":7,"./parseAshNodeIndex":8,"./removeNodeProperties":10,"./setNodeProperties":11}],10:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var EventListener = _interopRequire(require("../class/EventListener"));

var eventListener = new EventListener();

function removeNodeProperties(node, properties) {
	for (var i = 0; i < properties.length; i++) {
		var props = properties[i].split(".");

		if (props.length == 1) {
			if (props[0] == "style") {
				node.removeAttribute("style");
			} else if (props[0] == "events") {} else if (props[0] == "className" || props[0] == "class") {
				node.className = "";
			} else {
				if (props[0].substring(0, 6) == "xlink:") {
					node.removeAttributeNS("http://www.w3.org/1999/xlink", props[0].substring(6));
				} else if (props[0].substring(0, 4) == "xml:") {
					node.removeAttributeNS("http://www.w3.org/2000/svg", props[0].substring(4));
				} else {
					node.removeAttribute(props[0]);
				}
			}
		} else if (props.length == 2) {
			if (props[0] == "style") {
				node.style[props[1]] = "";
			} else if (props[0] == "events") {
				eventListener.removeEvent(node, props[1]);
			}
		}
	}
}

module.exports = removeNodeProperties;
},{"../class/EventListener":18}],11:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isObject = _interopRequire(require("../internal/isObject"));

var EventListener = _interopRequire(require("../class/EventListener"));

var eventListener = new EventListener();

function setNodeProperties(node, properties, inserted) {
	for (var prop in properties) {
		if (properties.hasOwnProperty(prop)) {
			if (prop == "style" && isObject(properties[prop])) {
				for (var style in properties[prop]) {
					if (properties[prop].hasOwnProperty(style)) {
						node.style[style] = properties[prop][style];
					}
				}
			} else if (prop === "events" && isObject(properties[prop])) {
				eventListener.addEvents(node, properties[prop], inserted);
			} else if (prop === "className" || prop === "class") {
				node.className = properties[prop];
			} else if (!isObject(properties[prop])) {
				if (prop.substring(0, 6) == "xlink:") {
					node.setAttributeNS("http://www.w3.org/1999/xlink", prop.substring(6), properties[prop]);
				} else if (prop.substring(0, 4) == "xml:") {
					node.setAttributeNS("http://www.w3.org/2000/svg", prop.substring(4), properties[prop]);
				} else {
					if (prop == "checked") {
						node.checked = !!properties[prop];
						if (node.checked) {
							node.setAttribute("checked", "checked");
						} else {
							node.removeAttribute("checked");
						}
					} else if (prop == "value") {
						node.value = properties[prop];
						node.setAttribute(prop, properties[prop]);
					} else {
						node.setAttribute(prop, properties[prop]);
					}
				}
			}
		}
	}

	return node;
}

module.exports = setNodeProperties;
},{"../class/EventListener":18,"../internal/isObject":38}],12:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isAshNode = _interopRequire(require("../internal/isAshNode"));

var constants = _interopRequire(require("../internal/constants"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function escapeAttributeValue(s, preserveCR) {
	preserveCR = preserveCR ? "&#13;" : "\n";
	return ("" + s).replace(/&/g, "&amp;") /* This MUST be the 1st replacement. */
	.replace(/'/g, "&apos;") /* The 4 other predefined entities, required. */
	.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
	/*
 You may add other replacements here for HTML only
 (but it's not necessary).
 Or for XML, only if the named entities are defined in its DTD.
 */
	.replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
	.replace(/[\r\n]/g, preserveCR);
}

function walkStringifyAshNodeTree(ashNodeTree, index /*, parentIndex*/) {
	var html = "";
	var openingTag = "<";
	var closingTag = "";
	var content = "";
	var parentIndex = arguments[2];
	var i, key1, key2;

	if (isAshNode(ashNodeTree)) {
		openingTag += ashNodeTree.tagName;
		closingTag = "</" + ashNodeTree.tagName + ">";

		if (parentIndex) {
			openingTag += " " + INDEX_ATTRIBUTE_NAME + "=\"" + parentIndex + LEVEL_SEPARATOR + index + "\"";
			openingTag += " " + ORDER_ATTRIBUTE_NAME + "=\"" + index + "\"";
			parentIndex = parentIndex + LEVEL_SEPARATOR + index;
		} else {
			openingTag += " " + INDEX_ATTRIBUTE_NAME + "=\"" + index + "\"";
			openingTag += " " + ORDER_ATTRIBUTE_NAME + "=\"" + index + "\"";
			parentIndex = "" + index;
		}

		if (ashNodeTree.properties) {
			for (key1 in ashNodeTree.properties) {
				if (ashNodeTree.properties.hasOwnProperty(key1) && key1 != "events") {
					if (key1 == "style") {
						openingTag += " style=\"";

						// add style definitions
						for (key2 in ashNodeTree.properties.style) {
							if (ashNodeTree.properties.style.hasOwnProperty(key2)) {
								if (typeof ashNodeTree.properties.style[key2] === "string") {
									openingTag += key2 + ":" + ashNodeTree.properties.style[key2] + ";";
								} else {}
							}
						}

						openingTag += "\"";
					} else {
						if (typeof ashNodeTree.properties[key1] === "string") {
							if (key1.toLowerCase() == "classname") {
								openingTag += " class=\"" + escapeAttributeValue(ashNodeTree.properties[key1]) + "\"";
							} else {
								openingTag += " " + key1 + "=\"" + escapeAttributeValue(ashNodeTree.properties[key1]) + "\"";
							}
						} else if (typeof ashNodeTree.properties[key1] === "boolean") {
							openingTag += " " + key1;
						} else if (typeof ashNodeTree.properties[key1] === "number") {
							openingTag += " " + key1 + "=\"" + ashNodeTree.properties[key1] + "\"";
						}
					}
				}
			}
		}

		openingTag += ">";

		if (ashNodeTree.children && ashNodeTree.children.length) {
			for (i = 0; i < ashNodeTree.children.length; i++) {
				content += walkStringifyAshNodeTree(ashNodeTree.children[i], i, parentIndex);
			}
		}

		html = openingTag + content + closingTag;
	} else {
		html = ashNodeTree.text;
	}

	return html;
}

function stringifyAshNodeTree(ashNodeTree) {
	return walkStringifyAshNodeTree(ashNodeTree, 0, "");
}

module.exports = stringifyAshNodeTree;
/* Forces the conversion to string. */

// TODO
},{"../internal/constants":25,"../internal/isAshNode":29}],13:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var EventListener = _interopRequire(require("../class/EventListener"));

var constants = _interopRequire(require("../internal/constants"));

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;

var eventListener = new EventListener();

function walkValidateNodeTree(nodeTree, ashNodeTree, stage, eventsCache) {
	if (nodeTree.tagName && nodeTree.tagName.toLowerCase() !== ashNodeTree.tagName) {
		return false;
	}

	if (nodeTree.getAttribute && nodeTree.getAttribute(INDEX_ATTRIBUTE_NAME) != ashNodeTree.index || nodeTree.getAttribute && nodeTree.getAttribute(ORDER_ATTRIBUTE_NAME) != ashNodeTree.order) {
		return false;
	}

	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[ORDER_ATTRIBUTE_NAME] = ashNodeTree.order;
	nodeTree[STAGE_ATTRIBUTE_NAME] = ashNodeTree.stage;

	if (ashNodeTree.properties && ashNodeTree.properties.events && typeof ashNodeTree.properties.events === "object") {
		eventsCache.push({
			events: ashNodeTree.properties.events,
			node: nodeTree
		});
	}

	if (nodeTree.childNodes.length && (!ashNodeTree.children || !ashNodeTree.children.length) || !nodeTree.childNodes.length && (ashNodeTree.children && ashNodeTree.children.length) || ashNodeTree.children && nodeTree.childNodes.length != ashNodeTree.children.length) {
		return false;
	}

	if (ashNodeTree.children && ashNodeTree.children.length) {
		for (var i = 0; i < ashNodeTree.children.length; i++) {
			if (!walkValidateNodeTree(nodeTree.childNodes[i], ashNodeTree.children[i], stage, eventsCache)) {
				return false;
			}
		}
	}

	return true;
}

function validateNodeTree(nodeTree, ashNodeTree, stage) {
	var eventsCache = [];
	var isNodeTreeValid = walkValidateNodeTree(nodeTree, ashNodeTree, stage, eventsCache);

	if (isNodeTreeValid) {
		for (var i = 0; i < eventsCache.length; i++) {
			eventListener.addEvents(eventsCache[i].node, eventsCache[i].events);
		}
	}

	return isNodeTreeValid;
}

module.exports = validateNodeTree;
},{"../class/EventListener":18,"../internal/constants":25}],14:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var TRIGGER_OPTIONS = {
	noEventArgument: true
};

var Action = (function (Observable) {
	function Action() {
		_classCallCheck(this, Action);

		if (Observable != null) {
			Observable.apply(this, arguments);
		}
	}

	_inherits(Action, Observable);

	_prototypeProperties(Action, null, {
		trigger: {
			value: function trigger() {
				if (typeof this.onTrigger === "function") {
					_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", this.onTrigger.apply(this, arguments), TRIGGER_OPTIONS);
				} else {
					if (arguments.length == 10) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
					} else if (arguments.length == 9) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
					} else if (arguments.length == 8) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
					} else if (arguments.length == 7) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
					} else if (arguments.length == 6) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
					} else if (arguments.length == 5) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
					} else if (arguments.length == 4) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
					} else if (arguments.length == 3) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
					} else if (arguments.length == 2) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], TRIGGER_OPTIONS);
					} else if (arguments.length) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], TRIGGER_OPTIONS);
					} else {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", TRIGGER_OPTIONS);
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		}
	});

	return Action;
})(Observable);

module.exports = Action;
/*data*/
},{"./Observable":19}],15:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internal/constants"));

// constants references
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

/**
 * AshElement
 */

var AshElement = (function () {
	function AshElement(type, spec) {
		_classCallCheck(this, AshElement);

		if (type != COMPONENT_ASH_ELEMENT && type != ASH_NODE_ASH_ELEMENT) {
			throw new Error(type + "must be " + COMPONENT_ASH_ELEMENT + " or " + ASH_NODE_ASH_ELEMENT + ".");
		}

		if (!spec) {
			throw new Error(spec + "must be specified.");
		}

		if (!(this instanceof AshElement)) {
			if (arguments.length >= 5) {
				return new AshElement(type, spec, arguments[2], arguments[3], arguments[4]);
			} else if (arguments.length >= 4) {
				return new AshElement(type, spec, arguments[2], arguments[3]);
			} else if (arguments.length >= 3) {
				return new AshElement(type, spec, arguments[2]);
			} else {
				return new AshElement(type, spec);
			}
		}

		if (type == COMPONENT_ASH_ELEMENT) {
			this.type = type;
			this.spec = spec;
			this.isDirty = true;

			if (arguments.length >= 3 && typeof arguments[2] !== "undefined") {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			this.children = [];
		} else {
			this.type = ASH_NODE_ASH_ELEMENT;
			this.spec = spec;

			if (arguments.length >= 4 && typeof arguments[2] !== "undefined" && typeof arguments[3] !== "undefined") {
				this.args = [arguments[2], arguments[3]];
			} else if (arguments.length >= 3 && typeof arguments[2] !== "undefined") {
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

	_prototypeProperties(AshElement, null, {
		instantiate: {
			value: function instantiate() {
				if (this.type == COMPONENT_ASH_ELEMENT) {
					if (this.args) {
						this.instance = new this.spec(this.args[0]);
					} else {
						this.instance = new this.spec();
					}

					this.instance.__element = this;
				} else if (this.type == ASH_NODE_ASH_ELEMENT) {
					if (this.args) {
						this.instance = new this.spec(this.args[0], this.args[1]);
					} else {
						this.instance = new this.spec();
					}
				} else {
					throw new Error(this + " is not a AshElement object.");
				}

				return this.instance;
			},
			writable: true,
			configurable: true
		}
	});

	return AshElement;
})();

module.exports = AshElement;
},{"../internal/constants":25}],16:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internal/constants"));

// constants references
var ASH_NODE = constants.ASH_NODE;
var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

var AshNode = function AshNode(tagName, properties) {
	_classCallCheck(this, AshNode);

	if (typeof properties !== "undefined") {
		this.type = ASH_NODE;
		this.tagName = tagName.toLowerCase();
		this.properties = properties || {};
		this.children = [];
		this.index = null;
		this.key = null;

		// find element's key
		if (this.properties.key) {
			this.key = this.properties.key;

			delete this.properties.key;
		}
	} else {
		this.type = ASH_TEXT_NODE;
		this.text = tagName;
		this.index = null;
	}
};

module.exports = AshNode;
},{"../internal/constants":25}],17:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var isAshNodeAshElement = _interopRequire(require("../internal/isAshNodeAshElement"));

var constants = _interopRequire(require("../internal/constants"));

var findNode = _interopRequire(require("../DOM/findNode"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

var Component = (function (Observable) {
	function Component(props) {
		var _this = this;

		_classCallCheck(this, Component);

		// autobind methods
		Object.getOwnPropertyNames(this.__proto__).forEach(function (value) {
			if (isFunction(_this[value]) && value !== "constructor") {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props || {};
		this.state = this.state || {};

		this.__isDirty = false;
		this.__lifecycle = LIFECYCLE_UNMOUNTED;
	}

	_inherits(Component, Observable);

	_prototypeProperties(Component, null, {
		isDirty: {
			get: function () {
				return this.__isDirty;
			},
			set: function (value) {
				this.__isDirty = !!value;

				if (this.__isDirty && this.__element.stage) {
					this.__element.stage.update(this);
				}
			},
			configurable: true
		},
		lifecycle: {
			get: function () {
				return this.__lifecycle;
			},
			set: function (value) {
				if (value != LIFECYCLE_UNMOUNTED && value != LIFECYCLE_MOUNTING && value != LIFECYCLE_MOUNTED) {
					throw new Error(value + " must be \"Unmounted\", \"Mounting\" or \"Mounted\".");
				}

				this.__lifecycle = value;
			},
			configurable: true
		},
		isMounted: {
			get: function () {
				return this.__lifecycle === LIFECYCLE_MOUNTED;
			},
			configurable: true
		},
		cachedRender: {
			get: function () {
				this.__cachedRender = this.render();

				return this.__cachedRender;
			},
			configurable: true
		},
		domNode: {
			get: function () {
				if (this.isMounted && isAshNodeAshElement(this.__cachedRender)) {
					return findNode(this.__element.stage.getRootNode(), this.__cachedRender.instance.index);
				}

				return null;
			},
			configurable: true
		},
		shouldUpdate: {
			value: function shouldUpdate(newProps) {
				return this.props !== newProps;
			},
			writable: true,
			configurable: true
		},
		onBeforeMount: {
			value: function onBeforeMount() {},
			writable: true,
			configurable: true
		},
		onMount: {
			value: function onMount() {},
			writable: true,
			configurable: true
		},
		onUnmount: {
			value: function onUnmount() {},
			writable: true,
			configurable: true
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return null;
			},
			writable: true,
			configurable: true
		}
	});

	return Component;
})(Observable);

module.exports = Component;
},{"../DOM/findNode":7,"../internal/constants":25,"../internal/isAshNodeAshElement":30,"../internal/isFunction":35,"./Observable":19}],18:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internal/constants"));

var parseAshNodeIndex = _interopRequire(require("../DOM/parseAshNodeIndex"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var isMatching = _interopRequire(require("../internal/isMatching"));

// constants references
var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var STAGE_ATTRIBUTE_NAME = constants.STAGE_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

var eventListener;

// list of topics
var topics = {};

var EventListener = (function () {
	function EventListener() {
		_classCallCheck(this, EventListener);

		if (eventListener) {
			return eventListener;
		}

		eventListener = this;

		return eventListener;
	}

	_prototypeProperties(EventListener, null, {
		addEvent: {
			value: function addEvent(node, eventName, callback, isInserted) {
				if (!topics[eventName]) {
					topics[eventName] = [];

					global.document.addEventListener(eventName, this.callback.bind(this, eventName), true);
				}

				for (var i = 0; i < topics[eventName].length; i++) {
					if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
						topics[eventName][i].callback = callback;
						topics[eventName][i].isInserted = isInserted;

						return this;
					}
				}

				topics[eventName].push({
					index: node[INDEX_ATTRIBUTE_NAME],
					stage: node[STAGE_ATTRIBUTE_NAME],
					callback: callback,
					isInserted: isInserted,
					isReindexed: false
				});

				return this;
			},
			writable: true,
			configurable: true
		},
		addEvents: {
			value: function addEvents(node, events, isInserted) {
				for (var prop in events) {
					if (events.hasOwnProperty(prop)) {
						if (isFunction(events[prop])) {
							this.addEvent(node, prop, events[prop], isInserted);
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		removeEvent: {
			value: function removeEvent(node, eventName) {
				if (eventName && topics[eventName]) {
					for (var i = 0; i < topics[eventName].length; i++) {
						if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[eventName][i].index == node[INDEX_ATTRIBUTE_NAME]) {
							topics[eventName].splice(i, 1);

							return this;
						}
					}
				} else if (!eventName) {
					for (var prop in topics) {
						if (topics.hasOwnProperty(prop)) {
							for (var i = 0; i < topics[prop].length; i++) {
								if (topics[prop][i].stage == node[STAGE_ATTRIBUTE_NAME] && topics[prop][i].index == node[INDEX_ATTRIBUTE_NAME]) {
									topics[prop].splice(i, 1);

									return this;
								}
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		removeEvents: {

			// removes all events, that has index same or matching via _.isMatching
			// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
			// if eventName is specified, only events with that name are removed

			value: function removeEvents(index, stage) {
				for (var prop in topics) {
					if (topics.hasOwnProperty(prop)) {
						for (var i = 0; i < topics[prop].length; i++) {
							if (stage == topics[prop][i].stage && isMatching(index.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted) {
								topics[prop].splice(i, 1);
								i--;
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		reindexEvents: {
			value: function reindexEvents(oldIndex, newOrder, stage) {
				for (var prop in topics) {
					if (topics.hasOwnProperty(prop)) {
						var levels = undefined;

						for (var i = 0; i < topics[prop].length; i++) {
							if (stage == topics[prop][i].stage && isMatching(oldIndex.split(LEVEL_SEPARATOR), topics[prop][i].index.split(LEVEL_SEPARATOR), true) && !topics[prop][i].isInserted && !topics[prop][i].isReindexed) {
								levels = parseAshNodeIndex(topics[prop][i].index);
								levels[parseAshNodeIndex(oldIndex).length - 1] = newOrder;
								topics[prop][i].index = levels.join(LEVEL_SEPARATOR);
								topics[prop][i].isReindexed = true;
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		markEvents: {
			value: function markEvents(stage) {
				for (var prop in topics) {
					if (topics.hasOwnProperty(prop)) {
						for (var i = 0; i < topics[prop].length; i++) {
							if (stage == topics[prop][i].stage) {
								topics[prop][i].isInserted = false;
								topics[prop][i].isReindexed = false;
							}
						}
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		callback: {
			value: function callback(eventName, eventObject) {
				var index = eventObject.target[INDEX_ATTRIBUTE_NAME];

				if (index) {
					var levels = parseAshNodeIndex(index);

					while (levels.length) {
						for (var i = 0; i < topics[eventName].length; i++) {
							if (topics[eventName][i].index == index && topics[eventName][i].stage == eventObject.target[STAGE_ATTRIBUTE_NAME]) {
								topics[eventName][i].callback(eventObject);
							}
						}

						levels.pop();
						index = levels.join(LEVEL_SEPARATOR);
					}
				}
			},
			writable: true,
			configurable: true
		}
	});

	return EventListener;
})();

module.exports = EventListener;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../DOM/parseAshNodeIndex":8,"../internal/constants":25,"../internal/isFunction":35,"../internal/isMatching":36}],19:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var immediate = _interopRequire(require("../polyfill/immediate"));

var isString = _interopRequire(require("../internal/isString"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var isObject = _interopRequire(require("../internal/isObject"));

var isMatching = _interopRequire(require("../internal/isMatching"));

// Regular expressions used to split event name strings
var REGEX_TOPIC = /\s+/; // one or more space
var REGEX_CATEGORY = /\.|\//; // dot , or forward slash

var store = {};

var Observable = (function () {
	function Observable() {
		_classCallCheck(this, Observable);

		return this;
	}

	_prototypeProperties(Observable, null, {
		observe: {
			value: function observe() {
				var observable = this;
				var object = arguments[0];
				var events = arguments[1];
				var callback = arguments[2];
				var context = arguments[3];

				if (isString(object)) {
					// observed object is missing, `this` is used
					object = this;
					context = callback;
					callback = events;
					events = object;
					object = this;
				} else if (isFunction(object)) {
					// observed object is missing, `this` is used, and events string is missing, `'all'`' is used
					context = events;
					callback = object;
					events = "all";
					object = this;
				} else if (!isObject(object)) {
					throw new Error(object + " must be an object.");
				}

				// events string is missing, we will use 'all', and juggle the remaining arguments
				if (isFunction(events)) {
					context = callback;
					callback = events;
					events = "all";
				}

				if (!isFunction(callback)) {
					throw new Error(callback + " must be a function.");
				}

				if (typeof context !== "undefined" && !isObject(context)) {
					throw new Error(context + " must be an object.");
				}

				events = isString(events) ? events.trim().split(REGEX_TOPIC) : ["all"];

				for (var i = 0; i < events.length; i++) {
					if (!store[events[i]]) {
						store[events[i]] = {
							name: events[i],
							categories: events[i].split(REGEX_CATEGORY),
							observables: []
						};
					}

					store[events[i]].observables.push({
						observable: observable,
						observed: object,
						callback: callback,
						context: context || null
					});
				}

				return observable;
			},
			writable: true,
			configurable: true
		},
		unobserve: {
			value: function unobserve() {
				var observable = this;
				var object = arguments[0];
				var events = arguments[1];
				var callback = arguments[2];
				var context = arguments[3];

				// events string is missing, we will use 'all', and juggle the remaining arguments
				if (isFunction(events)) {
					context = callback;
					callback = events;
					events = "all";
				}

				events = isString(events) ? events.trim().split(REGEX_TOPIC) : ["all"];

				for (var i = 0; i < events.length; i++) {
					for (var key in store) {
						if (store.hasOwnProperty(key) && (store[key] === events[i] || events[i] === "all")) {
							for (var j = 0; j < store[key].observables.length; j++) {
								// we can remove only this observable
								if (store[key].observables[j].observable === observable) {
									if ((!object || store[key].observables[j].observed === object) && (!callback || store[key].observables[j].callback === callback) && (!context || store[key].observables[j].context === context)) {
										// remove observable from the store
										store[key].observables.splice(j, 1);
									}
								}
							}
						}
					}
				}

				return observable;
			},
			writable: true,
			configurable: true
		},
		trigger: {
			value: function trigger() {
				var observable = this;
				var events = isString(arguments[0]) ? arguments[0].trim().split(REGEX_TOPIC) : ["all"];
				var data = [];
				var useAsync = arguments.length > 1 && isObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].async === true ? true : false;
				var noEventArgument = arguments.length > 1 && isObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].noEventArgument === true ? true : false;
				var categories;

				for (var i = 1; i < (useAsync || noEventArgument ? arguments.length - 1 : arguments.length); i++) {
					data.push(arguments[i]);
				}

				function trigger() {
					for (var i = 0; i < events.length; i++) {
						categories = events[i].split(REGEX_CATEGORY);

						for (var j in store) {
							if (store.hasOwnProperty(j) && (isMatching(store[j].categories, categories) || store[j].name === "all" || events[i] === "all")) {
								for (var k = 0; k < store[j].observables.length; k++) {
									if (observable == store[j].observables[k].observed) {
										if (!noEventArgument) {
											data = [{ type: events[i] }].concat(data);
										}

										store[j].observables[k].callback.apply(store[j].observables[k].context || store[j].observables[k].observable, data);
									}
								}
							}
						}
					}
				}

				if (useAsync) {
					immediate(trigger);
				} else {
					trigger();
				}

				return observable;
			},
			writable: true,
			configurable: true
		}
	});

	return Observable;
})();

module.exports = Observable;
/*object, events, callback, context*/ /*object, events, callback, context*/ /*events, data, options.useAsync|options.noEventArgument*/
},{"../internal/isFunction":35,"../internal/isMatching":36,"../internal/isObject":38,"../internal/isString":40,"../polyfill/immediate":41}],20:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var createAshElementTree = _interopRequire(require("../DOM/createAshElementTree"));

var isComponentAshElement = _interopRequire(require("../internal/isComponentAshElement"));

var isAshNodeAshElement = _interopRequire(require("../internal/isAshNodeAshElement"));

var createAshNodeTree = _interopRequire(require("../DOM/createAshNodeTree"));

var createNodeTree = _interopRequire(require("../DOM/createNodeTree"));

var diffAshNodeTree = _interopRequire(require("../DOM/diffAshNodeTree"));

var patchNodeTree = _interopRequire(require("../DOM/patchNodeTree"));

var stringifyAshNodeTree = _interopRequire(require("../DOM/stringifyAshNodeTree"));

var validateNodeTree = _interopRequire(require("../DOM/validateNodeTree"));

var constants = _interopRequire(require("../internal/constants"));

var isElement = _interopRequire(require("../internal/isElement"));

var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

var stageId = 0;
var renderer;

function walkUpdateComponentAshElement(oldAshElement, newAshElement, stage) {
	if (newAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement === null) {
			// old is null, new is component

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.owner.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[newAshElement.order] = newAshElement;
			} else if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT && newAshElement.spec === oldAshElement.spec) {
			// old is component, new is same component

			if (oldAshElement.instance.shouldUpdate(newAshElement.args[0])) {
				// copy the new to the old...
				oldAshElement.args = newAshElement.args;
				oldAshElement.instance.onBeforeReceiveProps(newAshElement.args[0]);
				oldAshElement.instance.props = newAshElement.args[0];

				// create child for the new descriptor
				newAshElement.children[0] = oldAshElement.instance.cachedRender;

				// adding children to the queue
				if (newAshElement.children[0] && oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].order = 0;

					walkUpdateComponentAshElement(oldAshElement.children[0], newAshElement.children[0], stage);
				} else if (newAshElement.children[0] && !oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].order = 0;

					walkUpdateComponentAshElement(null, newAshElement.children[0], stage);
				}

				// deleting old surplus children
				if (!newAshElement.children[0] && oldAshElement.children[0]) {
					if (oldAshElement.children[0].type == COMPONENT_ASH_ELEMENT) {
						oldAshElement.children[0].instance.lifecycle = LIFECYCLE_UNMOUNTED;
						oldAshElement.children[0].instance.onUnmount();
					}

					oldAshElement.children.pop();
				}
			} else {}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT) {
			// old is component, new is different component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

				// replace the old
				oldAshElement.instance.lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.instance.onUnmount();
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			} else if (oldAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);

				// replace the old
				oldAshElement.instance.lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.instance.onUnmount();
				oldAshElement.parent.children[0] = newAshElement;
			}
		} else {
			// old is virtual node, new is component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

				// replace the old
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			} else if (oldAshElement.parent.type == COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);

				// replace the old
				oldAshElement.parent.children[0] = newAshElement;
			}
		}
	} else {
		if (oldAshElement === null) {
			// old is null, new is virtual node

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			} else if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				createAshElementTree(newAshElement, stage, newAshElement.owner.id, newAshElement.level);

				// replace the old
				newAshElement.parent.children[newAshElement.order] = newAshElement;
			}
		} else if (newAshElement.type === oldAshElement.type) {
			// old is virtual node, new is virtual node

			oldAshElement.args = newAshElement.args;
			oldAshElement.instantiate();

			// adding children to the queue
			for (var i = 0; i < newAshElement.children.length; i++) {
				if (newAshElement.children[i] && oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].order = i;

					walkUpdateComponentAshElement(oldAshElement.children[i], newAshElement.children[i], stage);
				} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].order = i;

					walkUpdateComponentAshElement(null, newAshElement.children[i], stage);
				}
			}

			// deleting old surplus children
			while (oldAshElement.children.length > newAshElement.children.length) {
				if (oldAshElement.children[oldAshElement.children.length - 1].type == COMPONENT_ASH_ELEMENT) {
					oldAshElement.children[oldAshElement.children.length - 1].instance.lifecycle = LIFECYCLE_UNMOUNTED;
					oldAshElement.children[oldAshElement.children.length - 1].instance.onUnmount();
				}

				oldAshElement.children.pop();
			}
		} else {
			// old is component, new is virtual node

			if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.id, oldAshElement.level);

				// replace the old
				oldAshElement.instance.lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.instance.onUnmount();
				oldAshElement.parent.children[0] = newAshElement;
			} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.order = oldAshElement.order;
				createAshElementTree(newAshElement, stage, oldAshElement.owner.id, oldAshElement.level);

				// replace the old
				oldAshElement.instance.lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.instance.onUnmount();
				oldAshElement.parent.children[oldAshElement.order] = newAshElement;
			}
		}
	}
}

function updateComponentAshElement(componentAshElement, stage) {
	var render = componentAshElement.instance.cachedRender;
	render.owner = componentAshElement;
	render.parent = componentAshElement;
	render.order = 0;

	componentAshElement.isDirty = true;

	walkUpdateComponentAshElement(componentAshElement.children[0], render, stage);

	componentAshElement.instance.isDirty = false;
}

function mountComponents(ashElement) {
	if (isAshNodeAshElement(ashElement)) {
		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// walk the child
				mountComponents(ashElement.children[i]);
			}
		}
	} else if (isComponentAshElement(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle == LIFECYCLE_MOUNTING) {
			ashElement.instance.lifecycle = LIFECYCLE_MOUNTED;
			ashElement.instance.onMount();
		}

		// walk the child
		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

function getStageRootNode(stageId) {
	for (var i = 0; i < this.stages[stageId].node.childNodes.length; i++) {
		if (typeof this.stages[stageId].node.childNodes[i][INDEX_ATTRIBUTE_NAME] !== "undefined") {
			return this.stages[stageId].node.childNodes[i];
		}
	}

	return null;
}

function updateStage(stageId, component) {
	if (this.stages[stageId] && !this.stages[stageId].isUpdating) {
		this.stages[stageId].isUpdating = true;

		// find descriptors that should be updated
		updateComponentAshElement(component.__element, this.stages[stageId]);

		// set stage to dirty, so Renderer can rerender the DOM
		this.stages[stageId].isDirty = true;
		this.render();
	} else if (this.stages[stageId] && this.stages[stageId].isUpdating) {
		throw new Error("You cannot update components during previous update!");
	}
}

var Renderer = (function () {
	/* jshint ignore:end */

	function Renderer() {
		this.stages = [];

		_classCallCheck(this, Renderer);

		if (renderer) {
			return renderer;
		}

		// save singleton
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	_prototypeProperties(Renderer, null, {
		addComponent: {
			value: function addComponent(componentAshElement, node) {
				// type check
				if (!isComponentAshElement(componentAshElement)) {
					throw new Error(componentAshElement + " must be a Componenet Descriptor.");
				}

				if (!isElement(node)) {
					throw new Error(node + " must be a DOM Element.");
				}

				this.stages.push({
					id: stageId,
					isRendering: false,
					isDirty: true,
					isUpdating: true,

					node: node,
					ashNodeTree: null,
					ashElementTree: null,

					getRootNode: getStageRootNode.bind(this, stageId),
					update: updateStage.bind(this, stageId)
				});

				// create Ash Element tree for the Component Ash Element
				this.stages[stageId].ashElementTree = createAshElementTree(componentAshElement, this.stages[stageId]);
				stageId++;

				// render
				this.render();

				return this;
			},
			writable: true,
			configurable: true
		},
		componentToString: {
			value: function componentToString(componentAshElement) {
				// type check
				if (!isComponentAshElement(componentAshElement)) {
					throw new Error(componentAshElement + " must be a Componenet Descriptor.");
				}

				var stage = {
					isRendering: false,
					isDirty: true,
					node: null,
					ashNodeTree: null
				};

				// create Ash Element tree for the Component Ash Element
				stage.ashElementTree = createAshElementTree(componentAshElement, stage);

				// create ash node tree
				stage.ashNodeTree = createAshNodeTree(stage.ashElementTree);

				return stringifyAshNodeTree(stage.ashNodeTree);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _this = this;

				var isNodeTreeValid;
				var isNodeTreeValidated;
				var newAshNodeTree;
				var patches;

				for (var i = 0; i < this.stages.length; i++) {
					(function (i) {
						if (_this.stages[i].isDirty /* && !this.stages[i].isRendering*/) {
							if (!_this.stages[i].ashNodeTree) {
								isNodeTreeValid = false;
								isNodeTreeValidated = false;

								// remove child nodes which are not element nodes
								for (var j = 0; j < _this.stages[i].node.childNodes.length; j++) {
									if (_this.stages[i].node.childNodes[j].nodeType != 1) {
										_this.stages[i].node.removeChild(_this.stages[i].node.childNodes[j]);
										j--;
									}
								}

								// create ash node tree
								_this.stages[i].ashNodeTree = createAshNodeTree(_this.stages[i].ashElementTree);

								// there are some element nodes?
								if (_this.stages[i].node.childNodes.length) {
									isNodeTreeValidated = true;
									isNodeTreeValid = validateNodeTree(_this.stages[i].node.childNodes[0], _this.stages[i].ashNodeTree, _this.stages[i]);
								}

								// render to the Real DOM, if needed
								if (!isNodeTreeValid || !isNodeTreeValidated) {
									if (isNodeTreeValidated) {
										console.warn("Existing html is invalid!");
									}

									while (_this.stages[i].node.firstChild) {
										_this.stages[i].node.removeChild(_this.stages[i].node.firstChild);
									}

									_this.stages[i].isRendering = true;

									global.requestAnimationFrame(function (timestamp) {
										_this.stages[i].node.appendChild(createNodeTree(_this.stages[i].ashNodeTree));

										// mount components
										mountComponents(_this.stages[i].ashElementTree);

										_this.stages[i].isRendering = false;
									});
								}
							} else {
								newAshNodeTree = createAshNodeTree(_this.stages[i].ashElementTree);
								patches = diffAshNodeTree(_this.stages[i].ashNodeTree, newAshNodeTree);
								_this.stages[i].ashNodeTree = newAshNodeTree;

								_this.stages[i].isRendering = true;

								global.requestAnimationFrame(function (timestamp) {
									var isSuccessful = patchNodeTree(_this.stages[i].getRootNode(), patches);

									if (!isSuccessful) {
										throw new Error("Patching the DOM was unsuccesful!");
									}

									// mount components
									mountComponents(_this.stages[i].ashElementTree);

									_this.stages[i].isRendering = false;
								});
							}

							_this.stages[i].isDirty = false;
							_this.stages[i].isUpdating = false;
						}
					})(i);
				}

				return this;
			},
			writable: true,
			configurable: true
		}
	});

	return Renderer;
})();

module.exports = Renderer;

/* jshint ignore:start */
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../DOM/createAshElementTree":3,"../DOM/createAshNodeTree":4,"../DOM/createNodeTree":5,"../DOM/diffAshNodeTree":6,"../DOM/patchNodeTree":9,"../DOM/stringifyAshNodeTree":12,"../DOM/validateNodeTree":13,"../internal/constants":25,"../internal/isAshNodeAshElement":30,"../internal/isComponentAshElement":32,"../internal/isElement":33}],21:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var TRIGGER_OPTIONS = {
	noEventArgument: true
};

var Store = (function (Observable) {
	function Store() {
		_classCallCheck(this, Store);

		if (Observable != null) {
			Observable.apply(this, arguments);
		}
	}

	_inherits(Store, Observable);

	_prototypeProperties(Store, null, {
		trigger: {
			value: function trigger() {
				if (arguments.length == 10) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
				} else if (arguments.length == 9) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
				} else if (arguments.length == 8) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
				} else if (arguments.length == 7) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
				} else if (arguments.length == 6) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
				} else if (arguments.length == 5) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
				} else if (arguments.length == 4) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
				} else if (arguments.length == 3) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
				} else if (arguments.length == 2) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], TRIGGER_OPTIONS);
				} else if (arguments.length) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], TRIGGER_OPTIONS);
				} else {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", TRIGGER_OPTIONS);
				}

				return this;
			},
			writable: true,
			configurable: true
		}
	});

	return Store;
})(Observable);

module.exports = Store;
/*data*/
},{"./Observable":19}],22:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var isFinite = _interopRequire(require("../internal/isFinite"));

var constants = _interopRequire(require("../internal/constants"));

var isArray = _interopRequire(require("../internal/isArray"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var isString = _interopRequire(require("../internal/isString"));

var isImmutable = _interopRequire(require("./isImmutable"));

var IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

var ImmutableArray = (function (Array) {
	function ImmutableArray() {
		_classCallCheck(this, ImmutableArray);

		if (isImmutable(arguments[0])) {
			return arguments[0];
		}

		var array;
		var clone = true;

		if (arguments.length >= 2 && (arguments[arguments.length - 1] !== null && typeof arguments[arguments.length - 1] === "object") && arguments[arguments.length - 1].clone === false) {
			clone = false;
		}

		if (clone && arguments.length == 1 && Array.isArray(arguments[0])) {
			array = arguments[0].slice(0);
		} else if (!clone && arguments.length == 2 && Array.isArray(arguments[0])) {
			array = arguments[0];
		} else {
			array = [];
			array.push.apply(array, arguments);
		}

		// deep immutability
		for (var i = 0, _length = array.length; i < _length; i++) {
			if (array[i] && array[i][IMMUTABLE_TAG]) {} else if (Array.isArray(array[i])) {
				array[i] = new ImmutableArray(array[i]);
			} else if (array[i] !== null && typeof array[i] === "object") {
				array[i] = new ImmutableObject(array[i]);
			}
		}

		// inject prototype
		array.__proto__ = ImmutableArray.prototype;

		// immutable tag
		Object.defineProperty(array, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the array
		Object.freeze(array);

		return array;
	}

	_inherits(ImmutableArray, Array);

	_prototypeProperties(ImmutableArray, null, {
		push: {
			value: function push() {
				var array = this.slice(0);

				array.push.apply(array, arguments);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		pop: {
			value: function pop() {
				var array = this.slice(0);

				array.pop();

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		sort: {
			value: function sort(compareFunction) {
				var array = this.slice(0);

				array.sort(compareFunction);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		splice: {
			value: function splice() {
				var array = this.slice(0);

				array.splice.apply(array, arguments);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		shift: {
			value: function shift() {
				var array = this.slice(0);

				array.shift();

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		unshift: {
			value: function unshift() {
				var array = this.slice(0);

				array.unshift.apply(array, arguments);

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		reverse: {
			value: function reverse() {
				var array = this.slice(0);

				array.reverse();

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		},
		set: {
			value: function set(index, value) {
				if (!(isFinite(index) && index >= 0)) {
					throw new Error(index + " (\"index\") must be non-negative finite number.");
				}

				var array = this.slice(0);

				array[index] = value;

				return new ImmutableArray(array, { clone: false });
			},
			writable: true,
			configurable: true
		}
	});

	return ImmutableArray;
})(Array);

var ImmutableObject = (function () {
	function ImmutableObject(value, options) {
		_classCallCheck(this, ImmutableObject);

		if (isImmutable(value)) {
			return value;
		}

		for (var key in value) {
			if (value.hasOwnProperty(key) && !isFunction(value[key])) {
				this[key] = value[key];

				if (this[key] && this[key][IMMUTABLE_TAG]) {} else if (isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (this[key] !== null && typeof this[key] === "object") {
					this[key] = new ImmutableObject(this[key]);
				}
			}
		}

		// immutable tag
		Object.defineProperty(this, IMMUTABLE_TAG, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: true
		});

		// freeze the object
		Object.freeze(this);

		return this;
	}

	_prototypeProperties(ImmutableObject, null, {
		set: {
			value: function set(key, value) {
				var clone;

				if (!isString(key)) {
					throw new Error(key + " (\"key\") must be a string.");
				}

				if (typeof value === "undefined") {
					throw new Error(value + " (\"value\") must be defined.");
				}

				if (this[key] === value) {
					return this;
				}

				// create copy
				clone = {};

				for (var prop in this) {
					if (this.hasOwnProperty(prop)) {
						clone[prop] = this[prop];
					}
				}

				clone[key] = value;

				return new ImmutableObject(clone);
			},
			writable: true,
			configurable: true
		},
		remove: {
			value: function remove(key) {
				var clone;

				if (!isString(key)) {
					throw new Error(key + " (\"key\") must be a string.");
				}

				if (typeof this[key] === "undefined") {
					return this;
				}

				// create copy
				clone = {};

				for (var prop in this) {
					if (this.hasOwnProperty(prop) && key !== prop) {
						clone[prop] = this[prop];
					}
				}

				return new ImmutableObject(clone);
			},
			writable: true,
			configurable: true
		},
		merge: {
			value: function merge(source) {
				var hasChanged;
				var clone;

				if (!(source !== null && typeof source === "object")) {
					throw new Error(source + " (\"source\") must be an object.");
				}

				clone = {};

				for (var prop in source) {
					if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
						if (source[prop] && source[prop][IMMUTABLE_TAG]) {
							if (source[prop] !== this[prop]) {
								clone[prop] = source[prop];
								hasChanged = true;
							}
						} else if (isArray(source[prop])) {
							if (source[prop] !== this[prop]) {
								clone[prop] = source[prop];
								hasChanged = true;
							}
						} else if (source[prop] !== null && typeof source[prop] === "object") {
							if (this[prop] && this[prop][IMMUTABLE_TAG]) {
								clone[prop] = this[prop].merge(source[prop]);
								hasChanged = true;
							} else {
								clone[prop] = source[prop];
								hasChanged = true;
							}
						} else {
							if (source[prop] !== this[prop]) {
								clone[prop] = source[prop];
								hasChanged = true;
							}
						}
					}
				}

				if (!hasChanged) {
					return this;
				}

				// clone rest of this object properties
				for (var prop in this) {
					if (this.hasOwnProperty(prop) && !isFunction(this[prop]) && typeof clone[prop] === "undefined") {
						clone[prop] = this[prop];
					}
				}

				return new ImmutableObject(clone);
			},
			writable: true,
			configurable: true
		}
	});

	return ImmutableObject;
})();

exports.ImmutableArray = ImmutableArray;
exports.ImmutableObject = ImmutableObject;
Object.defineProperty(exports, "__esModule", {
	value: true
});

// no action needed

// no action needed
},{"../internal/constants":25,"../internal/isArray":27,"../internal/isFinite":34,"../internal/isFunction":35,"../internal/isString":40,"./isImmutable":23}],23:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("../internal/constants"));

var IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}

module.exports = isImmutable;
},{"../internal/constants":25}],24:[function(require,module,exports){
"use strict";

function assign() {
	var sources = [];
	var target = arguments[0] || {};

	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] && typeof arguments[i] === "object") {
			sources.push(arguments[i]);
		}
	}

	if (!sources.length) {
		return target;
	}

	for (var i = 0; i < sources.length; i++) {
		for (var prop in sources[i]) {
			if (sources[i].hasOwnProperty(prop) && typeof sources[i][prop] !== "undefined" && sources[i][prop] !== null) {
				target[prop] = sources[i][prop];
			}
		}
	}

	return target;
}

module.exports = assign;
/*target, ...source*/
},{}],25:[function(require,module,exports){
"use strict";

var constants = {
	// component lifecycle
	LIFECYCLE_UNMOUNTED: "Unmounted",
	LIFECYCLE_MOUNTING: "Mounting",
	LIFECYCLE_MOUNTED: "Mounted",

	// patch types
	PATCH_NONE: "Patch None",
	PATCH_ASH_NODE: "Patch Ash Node",
	PATCH_ASH_TEXT_NODE: "Patch Ash Text Node",
	PATCH_PROPERTIES: "Patch Properties",
	PATCH_ORDER: "Patch Order",
	PATCH_INSERT: "Patch Insert",
	PATCH_REMOVE: "Patch Remove",

	// descriptor types
	COMPONENT_ASH_ELEMENT: "Component Ash Element",
	ASH_NODE_ASH_ELEMENT: "Ash Node Ash Element",

	// virtual node types
	ASH_NODE: "Ash Node",
	ASH_TEXT_NODE: "Ash Text Node",

	// misc
	LEVEL_SEPARATOR: ".",
	INDEX_ATTRIBUTE_NAME: "__ash:index__",
	ORDER_ATTRIBUTE_NAME: "__ash:order__",
	STAGE_ATTRIBUTE_NAME: "__ash:stage__",

	IMMUTABLE_TAG: "__ash:immutable__"
};

module.exports = constants;
},{}],26:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var AshNode = _interopRequire(require("../class/AshNode"));

var AshElement = _interopRequire(require("../class/AshElement"));

var isAshElement = _interopRequire(require("./isAshElement"));

var constants = _interopRequire(require("./constants"));

// constants references
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function createElement(tagName /*, props, children*/) {
	var props;
	var children;

	if (typeof tagName !== "string") {
		return AshElement.bind(null, COMPONENT_ASH_ELEMENT, tagName);
	} else if (typeof tagName === "string" && !tagName.length) {
		throw new Error(tagName + " (tagName) must be non-empty string or Component class.");
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, null);
	}

	if (Array.isArray(arguments[1])) {
		children = arguments[1];
		props = null;
	} else {
		props = arguments[1];
	}

	if (!children && !Array.isArray(arguments[2])) {
		children = [];

		// children are not in an array, iterate over arguments...
		for (var i = 2; i < arguments.length; i++) {
			if (typeof arguments[i] === "string") {
				children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
			} else if (isAshElement(arguments[i])) {
				children.push(arguments[i]);
			}
		}
	} else {
		children = children || arguments[2];

		// check type of children
		for (var i = 0; i < children.length; i++) {
			if (typeof children[i] === "string") {
				children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
			} else if (!isAshElement(children[i])) {
				//children[i] = null;
				children.splice(i, 1);
				i--;
			}
		}
	}

	return new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, tagName, props, children);
}

module.exports = createElement;
},{"../class/AshElement":15,"../class/AshNode":16,"./constants":25,"./isAshElement":28}],27:[function(require,module,exports){
"use strict";

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * (function() { return _.isArray(arguments); })();
 * // => false
 */

module.exports = Array.isArray;
},{}],28:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function isAshElement(value) {
	return value && (value.type === COMPONENT_ASH_ELEMENT || value.type === ASH_NODE_ASH_ELEMENT);
}

module.exports = isAshElement;
},{"./constants":25}],29:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var ASH_NODE = constants.ASH_NODE;

function isAshNode(value) {
	return value && value.type === ASH_NODE;
}

module.exports = isAshNode;
},{"./constants":25}],30:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;

function isAshNodeAshElement(value) {
	return value && value.type === ASH_NODE_ASH_ELEMENT;
}

module.exports = isAshNodeAshElement;
},{"./constants":25}],31:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var ASH_TEXT_NODE = constants.ASH_TEXT_NODE;

function isAshTextNode(value) {
	return value && value.type === ASH_TEXT_NODE;
}

module.exports = isAshTextNode;
},{"./constants":25}],32:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var constants = _interopRequire(require("./constants"));

var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

function isComponentAshElement(value) {
	return value && value.type == COMPONENT_ASH_ELEMENT;
}

module.exports = isComponentAshElement;
},{"./constants":25}],33:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isObjectLike = _interopRequire(require("./isObjectLike"));

/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return value && value.nodeType === 1 && isObjectLike(value) && Object.prototype.toString.call(value).indexOf("Element") > -1 || false;
}

module.exports = isElement;
},{"./isObjectLike":39}],34:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isNative = _interopRequire(require("./isNative"));

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = global.isFinite,
    nativeNumIsFinite = isNative(nativeNumIsFinite = Number.isFinite) && nativeNumIsFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on ES `Number.isFinite`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(10);
 * // => true
 *
 * _.isFinite('10');
 * // => false
 *
 * _.isFinite(true);
 * // => false
 *
 * _.isFinite(Object(10));
 * // => false
 *
 * _.isFinite(Infinity);
 * // => false
 */
var isFinite = nativeNumIsFinite || function (value) {
  return typeof value == "number" && nativeIsFinite(value);
};

module.exports = isFinite;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./isNative":37}],35:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isNative = _interopRequire(require("./isNative"));

/** `Object#toString` result references. */
var funcTag = "[object Function]";

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = function (value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == "function" || false;
};

// Fallback for environments that return incorrect `typeof` operator results.
if (isFunction(/x/) || Uint8Array && !isFunction(Uint8Array)) {
  isFunction = function (value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in older versions of Chrome and Safari which return 'function' for regexes
    // and Safari 8 equivalents which return 'object' for typed array constructors.
    return objToString.call(value) == funcTag;
  };
}

module.exports = isFunction;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./isNative":37}],36:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isArray = _interopRequire(require("./isArray"));

/**
 * Checks if the chains of ; i.e all categories from the template chain must be present in the second chain, and in the same order.
 * Strict comparison (===) is used.
 * if strict options is used, the order must be precisely the same
 *
 * @method
 * @memberof ash
 * @param {array} chain1 The chain to check against.
 * @param {array} chain2 The chain being checked.
 * @returns {boolean} Returns true if the second chain matches the first, else false.
 *
 * @example
 * ash.isMatching([1, 2, 3], [1, 2, 3]); // -> true
 * ash.isMatching([1, 2, 3], [1, 2, 3, 4, 5]); // -> true
 * ash.isMatching([1, 2, 3], [1, 4, 2, 5, 3]); // -> true
 * ash.isMatching([1, 2, 3], [1, 2]); // -> false
 * ash.isMatching([1, 2, 3], [1, 3, 2]); // -> false
 * ash.isMatching([1, 2, 3], [1, 4, 2, 5, 3], true); // -> false
 * ash.isMatching([1, 2, 3], [1, 2, 3, 5, 5], true); // -> true
 */
function isMatching(chain1, chain2, options) {
	if (!isArray(chain1) || !isArray(chain2)) {
		return false;
	} // if

	var indexes = [];

	if (options === true || options && options.strict) {
		for (var i = 0; i < chain1.length; i++) {
			if (chain1[i] !== chain2[i]) {
				return false;
			}
		}

		return true;
	} else {
		for (var i = 0; i < chain1.length; i++) {
			for (var j = 0; j < chain2.length; j++) {
				if (chain1[i] === chain2[j]) {
					indexes.push(j);
					break;
				} // if

				if (j == chain2.length - 1) {
					return false; // item from chain1 is not in chain2, therefore there is no match
				} // if
			} // for
		} // for

		for (var i = 0; i < indexes.length - 1; i++) {
			if (indexes[i] >= indexes[i + 1]) {
				// indexes are't ordered, therefore there is no match
				return false;
			}
		} // for
	}

	return true;
} // isMatching

module.exports = isMatching;
},{"./isArray":27}],37:[function(require,module,exports){
"use strict";

/** Used to detect if a method is native */
var regexNative = new RegExp("^" + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$");

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == "function" && regexNative.test(value);
}

module.exports = isNative;
},{}],38:[function(require,module,exports){
"use strict";

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == "function" || value && type == "object" || false;
}

module.exports = isObject;
},{}],39:[function(require,module,exports){
"use strict";

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return value && typeof value == "object" || false;
}

module.exports = isObjectLike;
},{}],40:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isObjectLike = _interopRequire(require("./isObjectLike"));

/** `Object#toString` result references. */
var STRING_TAG = "[object String]";

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == "string" || isObjectLike(value) && Object.prototype.toString.call(value) == STRING_TAG || false;
}

module.exports = isString;
},{"./isObjectLike":39}],41:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var nextTick = _interopRequire(require("./immediate/nextTick"));

var mutation = _interopRequire(require("./immediate/mutation.js"));

var messageChannel = _interopRequire(require("./immediate/messageChannel"));

var stateChange = _interopRequire(require("./immediate/stateChange"));

var timeout = _interopRequire(require("./immediate/timeout"));

var types = [nextTick, mutation.js, messageChannel, stateChange, timeout];
var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
	draining = true;
	var i, oldQueue;
	var len = queue.length;
	while (len) {
		oldQueue = queue;
		queue = [];
		i = -1;
		while (++i < len) {
			oldQueue[i]();
		}
		len = queue.length;
	}
	draining = false;
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++i < len) {
	if (types[i] && types[i].test && types[i].test()) {
		scheduleDrain = types[i].install(nextTick);
		break;
	}
}

function immediate(task) {
	if (queue.push(task) === 1 && !draining) {
		scheduleDrain();
	}
}

module.exports = immediate;
},{"./immediate/messageChannel":42,"./immediate/mutation.js":43,"./immediate/nextTick":44,"./immediate/stateChange":45,"./immediate/timeout":46}],42:[function(require,module,exports){
(function (global){
"use strict";

function test() {
	if (global.setImmediate) {
		// we can only get here in IE10
		// which doesn't handel postMessage well
		return false;
	}
	return typeof global.MessageChannel !== "undefined";
}

function install(func) {
	var channel = new global.MessageChannel();
	channel.port1.onmessage = func;
	return function () {
		channel.port2.postMessage(0);
	};
}

var messageChannel = {
	test: test,
	install: install
};

module.exports = messageChannel;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
(function (global){
"use strict";

//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

function test() {
	return Mutation;
}

function install(handle) {
	var called = 0;
	var observer = new Mutation(handle);
	var element = global.document.createTextNode("");
	observer.observe(element, {
		characterData: true
	});
	return function () {
		element.data = called = ++called % 2;
	};
}

var mutation = {
	test: test,
	install: install
};

module.exports = mutation;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
(function (process){
"use strict";

function test() {
	// Don't get fooled by e.g. browserify environments.
	return process && !process.browser;
}

function install(func) {
	return function () {
		process.nextTick(func);
	};
}

var nextTick = {
	test: test,
	install: install
};

module.exports = nextTick;
}).call(this,require('_process'))
},{"_process":309}],45:[function(require,module,exports){
(function (global){
"use strict";

function test() {
	return "document" in global && "onreadystatechange" in global.document.createElement("script");
}

function install(handle) {
	return function () {

		// Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
		// into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
		var scriptEl = global.document.createElement("script");
		scriptEl.onreadystatechange = function () {
			handle();

			scriptEl.onreadystatechange = null;
			scriptEl.parentNode.removeChild(scriptEl);
			scriptEl = null;
		};
		global.document.documentElement.appendChild(scriptEl);

		return handle;
	};
}

var stateChange = {
	test: test,
	install: install
};

module.exports = stateChange;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],46:[function(require,module,exports){
"use strict";

function test() {
	return true;
}

function install(t) {
	return function () {
		setTimeout(t, 0);
	};
}

var timeout = {
	test: test,
	install: install
};

module.exports = timeout;
},{}],47:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var Observable = _interopRequire(require("./core/class/Observable"));

var Component = _interopRequire(require("./core/class/Component"));

var Renderer = _interopRequire(require("./core/class/Renderer"));

var Action = _interopRequire(require("./core/class/Action"));

var Store = _interopRequire(require("./core/class/Store"));

var createElement = _interopRequire(require("./core/internal/createElement"));

var _coreImmutableImmutables = require("./core/immutable/Immutables");

var ImmutableArray = _coreImmutableImmutables.ImmutableArray;
var ImmutableObject = _coreImmutableImmutables.ImmutableObject;

var assign = _interopRequire(require("./core/internal/assign"));

var ash = {};

var VERSION = "0.1.0";

assign(ash, {
	VERSION: VERSION,
	Observable: Observable,
	Component: Component,
	Renderer: Renderer,
	Action: Action,
	Store: Store,

	"e": createElement,
	createElement: createElement,

	ImmutableArray: ImmutableArray,
	ImmutableObject: ImmutableObject
});

module.exports = ash;
},{"./core/class/Action":14,"./core/class/Component":17,"./core/class/Observable":19,"./core/class/Renderer":20,"./core/class/Store":21,"./core/immutable/Immutables":22,"./core/internal/assign":24,"./core/internal/createElement":26}],48:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'chunk': require('./array/chunk'),
  'compact': require('./array/compact'),
  'difference': require('./array/difference'),
  'drop': require('./array/drop'),
  'dropRight': require('./array/dropRight'),
  'dropRightWhile': require('./array/dropRightWhile'),
  'dropWhile': require('./array/dropWhile'),
  'findIndex': require('./array/findIndex'),
  'findLastIndex': require('./array/findLastIndex'),
  'first': require('./array/first'),
  'flatten': require('./array/flatten'),
  'flattenDeep': require('./array/flattenDeep'),
  'head': require('./array/first'),
  'indexOf': require('./array/indexOf'),
  'initial': require('./array/initial'),
  'intersection': require('./array/intersection'),
  'last': require('./array/last'),
  'lastIndexOf': require('./array/lastIndexOf'),
  'object': require('./array/zipObject'),
  'pull': require('./array/pull'),
  'pullAt': require('./array/pullAt'),
  'remove': require('./array/remove'),
  'rest': require('./array/rest'),
  'slice': require('./array/slice'),
  'sortedIndex': require('./array/sortedIndex'),
  'sortedLastIndex': require('./array/sortedLastIndex'),
  'tail': require('./array/rest'),
  'take': require('./array/take'),
  'takeRight': require('./array/takeRight'),
  'takeRightWhile': require('./array/takeRightWhile'),
  'takeWhile': require('./array/takeWhile'),
  'union': require('./array/union'),
  'uniq': require('./array/uniq'),
  'unique': require('./array/uniq'),
  'unzip': require('./array/unzip'),
  'without': require('./array/without'),
  'xor': require('./array/xor'),
  'zip': require('./array/zip'),
  'zipObject': require('./array/zipObject'),
  'isMatching': require('./array/isMatching')
};

},{"./array/chunk":49,"./array/compact":50,"./array/difference":51,"./array/drop":52,"./array/dropRight":53,"./array/dropRightWhile":54,"./array/dropWhile":55,"./array/findIndex":56,"./array/findLastIndex":57,"./array/first":58,"./array/flatten":59,"./array/flattenDeep":60,"./array/indexOf":61,"./array/initial":62,"./array/intersection":63,"./array/isMatching":64,"./array/last":65,"./array/lastIndexOf":66,"./array/pull":67,"./array/pullAt":68,"./array/remove":69,"./array/rest":70,"./array/slice":71,"./array/sortedIndex":72,"./array/sortedLastIndex":73,"./array/take":74,"./array/takeRight":75,"./array/takeRightWhile":76,"./array/takeWhile":77,"./array/union":78,"./array/uniq":79,"./array/unzip":80,"./array/without":81,"./array/xor":82,"./array/zip":83,"./array/zipObject":84}],49:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `collection` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to process.
 * @param {numer} [size=1] The length of each chunk.
 * @returns {Array} Returns the new array containing chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size) {
  var index = 0,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  size = typeof size == 'undefined' ? 1 : nativeMax(+size || 1, 1);
  while (index < length) {
    result[++resIndex] = slice(array, index, (index += size));
  }
  return result;
}

module.exports = chunk;

},{"./slice":71}],50:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are all falsey.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = compact;

},{}],51:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseDifference = require('../internal/baseDifference'),
    baseFlatten = require('../internal/baseFlatten'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array excluding all values of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The arrays of values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.difference([1, 2, 3], [5, 2, 10]);
 * // => [1, 3]
 */
function difference() {
  var index = -1,
      length = arguments.length;

  while (++index < length) {
    var value = arguments[index];
    if (isArray(value) || isArguments(value)) {
      break;
    }
  }
  return baseDifference(arguments[index], baseFlatten(arguments, false, true, ++index));
}

module.exports = difference;

},{"../internal/baseDifference":158,"../internal/baseFlatten":163,"../lang/isArguments":221,"../lang/isArray":222}],52:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.drop([1, 2, 3], 1);
 * // => [2, 3]
 *
 * _.drop([1, 2, 3], 2);
 * // => [3]
 *
 * _.drop([1, 2, 3], 5);
 * // => []
 *
 * _.drop([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function drop(array, n, guard) {
  n = (n == null || guard) ? 1 : n;
  return slice(array, n < 0 ? 0 : n);
}

module.exports = drop;

},{"./slice":71}],53:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRight([1, 2, 3], 1);
 * // => [1, 2]
 *
 * _.dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * _.dropRight([1, 2, 3], 5);
 * // => []
 *
 * _.dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function dropRight(array, n, guard) {
  var length = array ? array.length : 0;
  n = (n == null || guard) ? 1 : n;
  n = length - (n || 0);
  return slice(array, 0, n < 0 ? 0 : n);
}

module.exports = dropRight;

},{"./slice":71}],54:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    slice = require('./slice');

/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until the predicate returns falsey. The predicate is
 * bound to `thisArg` and invoked with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per element.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRightWhile([1, 2, 3], function(n) { return n > 1; });
 * // => [1]
 *
 * var characters = [
 *   { 'name': 'barney',  'employer': 'slate' },
 *   { 'name': 'fred',    'employer': 'slate', 'blocked': true },
 *   { 'name': 'pebbles', 'employer': 'na',    'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.pluck(_.dropRightWhile(characters, 'blocked'), 'name');
 * // => ['barney']
 *
 * // using "_.where" callback shorthand
 * _.pluck(_.dropRightWhile(characters, { 'employer': 'na' }), 'name');
 * // => ['barney', 'fred']
 */
function dropRightWhile(array, predicate, thisArg) {
  var length = array ? array.length : 0,
      index = length;

  predicate = baseCallback(predicate, thisArg, 3);
  while (index-- && predicate(array[index], index, array)) {}
  return slice(array, 0, index + 1);
}

module.exports = dropRightWhile;

},{"../internal/baseCallback":153,"./slice":71}],55:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    slice = require('./slice');

/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until the predicate returns falsey. The predicate is
 * bound to `thisArg` and invoked with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per element.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropWhile([1, 2, 3], function(n) { return n < 3; });
 * // => [3]
 *
 * var characters = [
 *   { 'name': 'barney',  'employer': 'slate', 'blocked': true },
 *   { 'name': 'fred',    'employer': 'slate' },
 *   { 'name': 'pebbles', 'employer': 'na',    'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.pluck(_.dropWhile(characters, 'blocked'), 'name');
 * // => ['fred', 'pebbles']
 *
 * // using "_.where" callback shorthand
 * _.pluck(_.dropWhile(characters, { 'employer': 'slate' }), 'name');
 * // => ['pebbles']
 */
function dropWhile(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length && predicate(array[index], index, array)) {}
  return slice(array, index);
}

module.exports = dropWhile;

},{"../internal/baseCallback":153,"./slice":71}],56:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/**
 * This method is like `_.find` except that it returns the index of the first
 * element the predicate returns truthy for, instead of the element itself.
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36 },
 *   { 'name': 'fred',    'age': 40, 'blocked': true },
 *   { 'name': 'pebbles', 'age': 1 }
 * ];
 *
 * _.findIndex(characters, function(chr) {
 *   return chr.age < 20;
 * });
 * // => 2
 *
 * // using "_.where" callback shorthand
 * _.findIndex(characters, { 'age': 36 });
 * // => 0
 *
 * // using "_.pluck" callback shorthand
 * _.findIndex(characters, 'blocked');
 * // => 1
 */
function findIndex(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = findIndex;

},{"../internal/baseCallback":153}],57:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36, 'blocked': true },
 *   { 'name': 'fred',    'age': 40 },
 *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
 * ];
 *
 * _.findLastIndex(characters, function(chr) {
 *   return chr.age > 30;
 * });
 * // => 1
 *
 * // using "_.where" callback shorthand
 * _.findLastIndex(characters, { 'age': 36 });
 * // => 0
 *
 * // using "_.pluck" callback shorthand
 * _.findLastIndex(characters, 'blocked');
 * // => 2
 */
function findLastIndex(array, predicate, thisArg) {
  var length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (length--) {
    if (predicate(array[length], length, array)) {
      return length;
    }
  }
  return -1;
}

module.exports = findLastIndex;

},{"../internal/baseCallback":153}],58:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @alias head
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.first([1, 2, 3]);
 * // => 1
 *
 * _.first([]);
 * // => undefined
 */
function first(array) {
  return array ? array[0] : undefined;
}

module.exports = first;

},{}],59:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFlatten = require('../internal/baseFlatten');

/**
 * Flattens a nested array. If `isDeep` is `true` the array is recursively
 * flattened, otherwise it is only flattened a single level.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep=false] Specify a deep flatten.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2], [3, [[4]]]]);
 * // => [1, 2, 3, [[4]]];
 *
 * // using `isDeep`
 * _.flatten([1, [2], [3, [[4]]]], true);
 * // => [1, 2, 3, 4];
 */
function flatten(array, isDeep, guard) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  // enables use as a callback for functions like `_.map`
  var type = typeof isDeep;
  if ((type == 'number' || type == 'string') && guard && guard[isDeep] === array) {
    isDeep = false;
  }
  return baseFlatten(array, isDeep);
}

module.exports = flatten;

},{"../internal/baseFlatten":163}],60:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFlatten = require('../internal/baseFlatten');

/**
 * Recursively flattens a nested array.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to recursively flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2], [3, [[4]]]]);
 * // => [1, 2, 3, 4];
 */
function flattenDeep(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, true) : [];
}

module.exports = flattenDeep;

},{"../internal/baseFlatten":163}],61:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('../internal/baseIndexOf'),
    sortedIndex = require('./sortedIndex');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using `SameValueZero` for equality comparisons. If `fromIndex` is negative,
 * it is used as the offset from the end of the collection. If `array` is
 * sorted providing `true` for `fromIndex` performs a faster binary search.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {boolean|number} [fromIndex=0] The index to search from or `true`
 *  to perform a binary search on a sorted array.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 3, 1, 2, 3], 2);
 * // => 1
 *
 * // using `fromIndex`
 * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
 * // => 4
 *
 * // performing a binary search
 * _.indexOf([4, 4, 5, 5, 6, 6], 5, true);
 * // => 2
 */
function indexOf(array, value, fromIndex) {
  var length = array ? array.length : 0;

  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  } else if (fromIndex) {
    var index = sortedIndex(array, value);
    return (length && array[index] === value) ? index : -1;
  }
  return baseIndexOf(array, value, fromIndex);
}

module.exports = indexOf;

},{"../internal/baseIndexOf":170,"./sortedIndex":72}],62:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/**
 * Gets all but the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.initial([1, 2, 3]);
 * // => [1, 2]
 */
function initial(array) {
  var length = array ? array.length : 0;
  return slice(array, 0, length ? length - 1 : 0);
}

module.exports = initial;

},{"./slice":71}],63:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('../internal/baseIndexOf'),
    cacheIndexOf = require('../internal/cacheIndexOf'),
    createCache = require('../internal/createCache'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of unique values present in all provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 *
 * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
 * // => [1, 2]
 */
function intersection() {
  var args = [],
      argsIndex = -1,
      argsLength = arguments.length,
      caches = [],
      indexOf = baseIndexOf,
      prereq = createCache;

  while (++argsIndex < argsLength) {
    var value = arguments[argsIndex];
    if (isArray(value) || isArguments(value)) {
      args.push(value);
      caches.push(prereq && value.length >= 120 &&
        createCache(argsIndex && value));
    }
  }
  argsLength = args.length;
  var array = args[0],
      index = -1,
      length = array ? array.length : 0,
      result = [],
      seen = caches[0];

  outer:
  while (++index < length) {
    value = array[index];
    if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value)) < 0) {
      argsIndex = argsLength;
      while (--argsIndex) {
        var cache = caches[argsIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(value);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = intersection;

},{"../internal/baseIndexOf":170,"../internal/cacheIndexOf":182,"../internal/createCache":191,"../lang/isArguments":221,"../lang/isArray":222}],64:[function(require,module,exports){

'use strict';

var isArray = require('../lang/isArray');

/**	
 * Checks if the chains of ; i.e all categories from the template chain must be present in the second chain, and in the same order.
 * Strict comparison (===) is used.
 * if strict options is used, the order must be precisely the same
 *
 * @method
 * @memberof ash
 * @param {array} chain1 The chain to check against.
 * @param {array} chain2 The chain being checked.
 * @returns {boolean} Returns true if the second chain matches the first, else false.
 *
 * @example
 * ash.isMatching([1, 2, 3], [1, 2, 3]); // -> true
 * ash.isMatching([1, 2, 3], [1, 2, 3, 4, 5]); // -> true
 * ash.isMatching([1, 2, 3], [1, 4, 2, 5, 3]); // -> true
 * ash.isMatching([1, 2, 3], [1, 2]); // -> false
 * ash.isMatching([1, 2, 3], [1, 3, 2]); // -> false
 * ash.isMatching([1, 2, 3], [1, 4, 2, 5, 3], true); // -> false
 * ash.isMatching([1, 2, 3], [1, 2, 3, 5, 5], true); // -> true
 */
function isMatching(chain1, chain2, options)
{
	if (!isArray(chain1) || !isArray(chain2))
	{
		return false;
	} // if

	var i, j;
	var indexes = [];



	if (options === true || (options && options.strict))
	{
		for (i = 0; i < chain1.length; i++)
		{
			if (chain1[i] !== chain2[i])
			{
				return false
			}
		}

		return true;	
	} else
	{
		for (i = 0; i < chain1.length; i++)
		{
			for (j = 0; j < chain2.length; j++)
			{
				if (chain1[i] === chain2[j])
				{
					indexes.push(j);
					break;
				} // if

				if (j == chain2.length - 1)
				{
					return false; // item from chain1 is not in chain2, therefore there is no match
				} // if
			} // for
		} // for

		for (i = 0; i < indexes.length - 1; i++)
		{
			if (indexes[i] >= indexes[i + 1]) return false; // indexes are't ordered, therefore there is no match
		} // for
	}

	return true;
} // isMatching

module.exports = isMatching;
},{"../lang/isArray":222}],65:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],66:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var sortedLastIndex = require('./sortedLastIndex');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {boolean|number} [fromIndex=array.length-1] The index to search from
 *  or `true` to perform a binary search on a sorted array.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
 * // => 4
 *
 * // using `fromIndex`
 * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
 * // => 1
 *
 * // performing a binary search
 * _.lastIndexOf([4, 4, 5, 5, 6, 6], 5, true);
 * // => 3
 */
function lastIndexOf(array, value, fromIndex) {
  var length = array ? array.length : 0,
      index = length;

  if (typeof fromIndex == 'number') {
    index = (fromIndex < 0 ? nativeMax(index + fromIndex, 0) : nativeMin(fromIndex || 0, index - 1)) + 1;
  } else if (fromIndex) {
    index = sortedLastIndex(array, value) - 1;
    return (length && array[index] === value) ? index : -1;
  }
  var isReflexive = value === value;
  while (index--) {
    var other = array[index];
    if ((isReflexive ? other === value : other !== other)) {
      return index;
    }
  }
  return -1;
}

module.exports = lastIndexOf;

},{"./sortedLastIndex":73}],67:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('../internal/baseIndexOf');

/** Used for native method references */
var arrayProto = Array.prototype;

/** Native method references */
var splice = arrayProto.splice;

/**
 * Removes all provided values from `array` using `SameValueZero` for equality
 * comparisons.
 *
 * **Notes:**
 *  - Unlike `_.without`, this method mutates `array`.
 *  - `SameValueZero` is like strict equality, e.g. `===`, except that `NaN` matches `NaN`.
 *    See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 *    for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3, 1, 2, 3];
 * _.pull(array, 2, 3);
 * console.log(array);
 * // => [1, 1]
 */
function pull() {
  var array = arguments[0],
      index = 0,
      indexOf = baseIndexOf,
      length = arguments.length;

  while (++index < length) {
    var fromIndex = 0,
        value = arguments[index];

    while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
      splice.call(array, fromIndex, 1);
    }
  }
  return array;
}

module.exports = pull;

},{"../internal/baseIndexOf":170}],68:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseAt = require('../internal/baseAt'),
    baseCompareAscending = require('../internal/baseCompareAscending'),
    baseFlatten = require('../internal/baseFlatten');

/** Used for native method references */
var arrayProto = Array.prototype;

/** Native method references */
var splice = arrayProto.splice;

/**
 * The base implementation of `_.pullAt` without support for individual
 * index arguments.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 */
function basePullAt(array, indexes) {
  var length = indexes.length,
      result = baseAt(array, indexes);

  indexes.sort(baseCompareAscending);
  while (length--) {
    var index = parseFloat(indexes[length]);
    if (index != previous && index > -1 && index % 1 == 0) {
      var previous = index;
      splice.call(array, index, 1);
    }
  }
  return result;
}

/**
 * Removes elements from `array` corresponding to the specified indexes and
 * returns an array of the removed elements. Indexes may be specified as an
 * array of indexes or as individual arguments.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove,
 *  specified as individual indexes or arrays of indexes.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [5, 10, 15, 20];
 * var evens = _.pullAt(array, [1, 3]);
 *
 * console.log(array);
 * // => [5, 15]
 *
 * console.log(evens);
 * // => [10, 20]
 */
function pullAt(array) {
  return basePullAt(array, baseFlatten(arguments, false, false, 1));
}

module.exports = pullAt;

},{"../internal/baseAt":152,"../internal/baseCompareAscending":155,"../internal/baseFlatten":163}],69:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/** Used for native method references */
var arrayProto = Array.prototype;

/** Native method references */
var splice = arrayProto.splice;

/**
 * Removes all elements from `array` that the predicate returns truthy for
 * and returns an array of the removed elements. The predicate is bound to
 * `thisArg` and invoked with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) { return n % 2 == 0; });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */
function remove(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0,
      result = [];

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result.push(value);
      splice.call(array, index--, 1);
      length--;
    }
  }
  return result;
}

module.exports = remove;

},{"../internal/baseCallback":153}],70:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @alias tail
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.rest([1, 2, 3]);
 * // => [2, 3]
 */
function rest(array) {
  return slice(array, 1);
}

module.exports = rest;

},{"./slice":71}],71:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSlice = require('../internal/baseSlice');

/**
 * Slices `array` from the `start` index up to, but not including, the `end` index.
 *
 * **Note:** This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start index.
 * @param {number} [end=array.length] The end index.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  var index = -1,
      length = array ? array.length : 0;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  if (end && end == length && !start) {
    return baseSlice(array);
  }
  length = start > end ? 0 : (end - start);

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = slice;

},{"../internal/baseSlice":177}],72:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseSortedIndex = require('../internal/baseSortedIndex'),
    identity = require('../utility/identity');

/**
 * Uses a binary search to determine the lowest index at which a value should
 * be inserted into a given sorted array in order to maintain the sort order
 * of the array. If an iteratee function is provided it is invoked for `value`
 * and each element of `array` to compute their sort ranking. The iteratee
 * function is bound to `thisArg` and invoked with one argument; (value).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedIndex([30, 50], 40);
 * // => 1
 *
 * _.sortedIndex([4, 4, 5, 5, 6, 6], 5);
 * // => 2
 *
 * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
 *
 * // using an iteratee function
 * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
 *   return this.data[word];
 * }, dict);
 * // => 1
 *
 * // using "_.pluck" callback shorthand
 * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
 * // => 1
 */
function sortedIndex(array, value, iteratee, thisArg) {
  iteratee = iteratee == null ? identity : baseCallback(iteratee, thisArg, 1);
  return baseSortedIndex(array, value, iteratee);
}

module.exports = sortedIndex;

},{"../internal/baseCallback":153,"../internal/baseSortedIndex":178,"../utility/identity":295}],73:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseSortedIndex = require('../internal/baseSortedIndex'),
    identity = require('../utility/identity');

/**
 * This method is like `_.sortedIndex` except that it returns the highest
 * index at which a value should be inserted into a given sorted array in
 * order to maintain the sort order of the array.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedLastIndex([4, 4, 5, 5, 6, 6], 5);
 * // => 4
 */
function sortedLastIndex(array, value, iteratee, thisArg) {
  iteratee = iteratee == null ? identity : baseCallback(iteratee, thisArg, 1);
  return baseSortedIndex(array, value, iteratee, true);
}

module.exports = sortedLastIndex;

},{"../internal/baseCallback":153,"../internal/baseSortedIndex":178,"../utility/identity":295}],74:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/**
 * Creates a slice of `array` with `n` elements taken from the beginning.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.take([1, 2, 3], 1);
 * // => [1]
 *
 * _.take([1, 2, 3], 2);
 * // => [1, 2]
 *
 * _.take([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * _.take([1, 2, 3], 0);
 * // => []
 */
function take(array, n, guard) {
  n = (n == null || guard) ? 1 : n;
  return slice(array, 0, n < 0 ? 0 : n);
}

module.exports = take;

},{"./slice":71}],75:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeRight([1, 2, 3], 1);
 * // => [3]
 *
 * _.takeRight([1, 2, 3], 2);
 * // => [2, 3]
 *
 * _.takeRight([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * _.takeRight([1, 2, 3], 0);
 * // => []
 */
function takeRight(array, n, guard) {
  var length = array ? array.length : 0;
  n = (n == null || guard) ? 1 : n;
  n = length - (n || 0);
  return slice(array, n < 0 ? 0 : n);
}

module.exports = takeRight;

},{"./slice":71}],76:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    slice = require('./slice');

/**
 * Creates a slice of `array` with elements taken from the end. Elements are
 * taken until the predicate returns falsey. The predicate is bound to `thisArg`
 * and invoked with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per element.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeRightWhile([1, 2, 3], function(n) { return n > 1; });
 * // => [2, 3]
 *
 * var characters = [
 *   { 'name': 'barney',  'employer': 'slate' },
 *   { 'name': 'fred',    'employer': 'slate', 'blocked': true },
 *   { 'name': 'pebbles', 'employer': 'na',    'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.pluck(_.takeRightWhile(characters, 'blocked'), 'name');
 * // => ['fred', 'pebbles']
 *
 * // using "_.where" callback shorthand
 * _.pluck(_.takeRightWhile(characters, { 'employer': 'na' }), 'name');
 * // => ['pebbles']
 */
function takeRightWhile(array, predicate, thisArg) {
  var length = array ? array.length : 0,
      index = length;

  predicate = baseCallback(predicate, thisArg, 3);
  while (index-- && predicate(array[index], index, array)) {}
  return slice(array, index + 1);
}

module.exports = takeRightWhile;

},{"../internal/baseCallback":153,"./slice":71}],77:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    slice = require('./slice');

/**
 * Creates a slice of `array` with elements taken from the beginning. Elements
 * are taken until the predicate returns falsey. The predicate is bound to
 * `thisArg` and invoked with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per element.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeWhile([1, 2, 3], function(n) { return n < 3; });
 * // => [1, 2]
 *
 * var characters = [
 *   { 'name': 'barney',  'employer': 'slate', 'blocked': true },
 *   { 'name': 'fred',    'employer': 'slate' },
 *   { 'name': 'pebbles', 'employer': 'na',    'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.pluck(_.takeWhile(characters, 'blocked'), 'name');
 * // => ['barney']
 *
 * // using "_.where" callback shorthand
 * _.pluck(_.takeWhile(characters, { 'employer': 'slate' }), 'name');
 * // => ['barney', 'fred']
 */
function takeWhile(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length && predicate(array[index], index, array)) {}
  return slice(array, 0, index);
}

module.exports = takeWhile;

},{"../internal/baseCallback":153,"./slice":71}],78:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFlatten = require('../internal/baseFlatten'),
    baseUniq = require('../internal/baseUniq');

/**
 * Creates an array of unique values, in order, of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
 * // => [1, 2, 3, 5, 4]
 */
function union() {
  return baseUniq(baseFlatten(arguments, false, true));
}

module.exports = union;

},{"../internal/baseFlatten":163,"../internal/baseUniq":179}],79:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseIndexOf = require('../internal/baseIndexOf'),
    baseUniq = require('../internal/baseUniq');

/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

/**
 * Creates a duplicate-value-free version of an array using `SameValueZero`
 * for equality comparisons. Providing `true` for `isSorted` performs a faster
 * search algorithm for sorted arrays. If an iteratee function is provided it
 * is invoked for each value in the array to generate the criterion by which
 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, array).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted=false] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 *  If a property name or object is provided it is used to create a "_.pluck"
 *  or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([1, 2, 1]);
 * // => [1, 2]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) { return this.floor(n); }, Math);
 * // => [1, 2.5]
 *
 * // using "_.pluck" callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  // juggle arguments
  var type = typeof isSorted;
  if (type != 'boolean' && isSorted != null) {
    thisArg = iteratee;
    iteratee = isSorted;
    isSorted = false;

    // enables use as a callback for functions like `_.map`
    if ((type == 'number' || type == 'string') && thisArg && thisArg[iteratee] === array) {
      iteratee = null;
    }
  }
  if (iteratee != null) {
    iteratee = baseCallback(iteratee, thisArg, 3);
  }
  return (isSorted && baseIndexOf == baseIndexOf)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"../internal/baseCallback":153,"../internal/baseIndexOf":170,"../internal/baseUniq":179}],80:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isObject = require('../lang/isObject'),
    max = require('../collection/max'),
    pluck = require('../collection/pluck');

/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre `_.zip`
 * configuration.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
 * // => [['fred', 30, true], ['barney', 40, false]]
 *
 * _.unzip(zipped);
 * // => [['fred', 'barney'], [30, 40], [true, false]]
 */
function unzip(array) {
  var index = -1,
      length = isObject(length = max(array, 'length')) && length.length || 0,
      result = Array(length);

  while (++index < length) {
    result[index] = pluck(array, index);
  }
  return result;
}

module.exports = unzip;

},{"../collection/max":108,"../collection/pluck":111,"../lang/isObject":238}],81:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseDifference = require('../internal/baseDifference'),
    slice = require('./slice');

/**
 * Creates an array excluding all provided values using `SameValueZero` for
 * equality comparisons.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to filter.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
 * // => [2, 3, 4]
 */
function without(array) {
  return baseDifference(array, slice(arguments, 1));
}

module.exports = without;

},{"../internal/baseDifference":158,"./slice":71}],82:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseDifference = require('../internal/baseDifference'),
    baseUniq = require('../internal/baseUniq'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array that is the symmetric difference of the provided arrays.
 * See [Wikipedia](http://en.wikipedia.org/wiki/Symmetric_difference) for
 * more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of values.
 * @example
 *
 * _.xor([1, 2, 3], [5, 2, 1, 4]);
 * // => [3, 5, 4]
 *
 * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
 * // => [1, 4, 5]
 */
function xor() {
  var index = -1,
      length = arguments.length;

  while (++index < length) {
    var array = arguments[index];
    if (isArray(array) || isArguments(array)) {
      var result = result
        ? baseDifference(result, array).concat(baseDifference(array, result))
        : array;
    }
  }
  return result ? baseUniq(result) : [];
}

module.exports = xor;

},{"../internal/baseDifference":158,"../internal/baseUniq":179,"../lang/isArguments":221,"../lang/isArray":222}],83:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var unzip = require('./unzip');

/**
 * Creates an array of grouped elements, the first of which contains the first
 * elements of the given arrays, the second of which contains the second elements
 * of the given arrays, and so on.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zip(['fred', 'barney'], [30, 40], [true, false]);
 * // => [['fred', 30, true], ['barney', 40, false]]
 */
function zip() {
  var length = arguments.length,
      array = Array(length);

  while (length--) {
    array[length] = arguments[length];
  }
  return unzip(array);
}

module.exports = zip;

},{"./unzip":80}],84:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArray = require('../lang/isArray');

/**
 * Creates an object composed from arrays of property names and values. Provide
 * either a single two dimensional array, e.g. `[[key1, value1], [key2, value2]]`
 * or two arrays, one of property names and one of corresponding values.
 *
 * @static
 * @memberOf _
 * @alias object
 * @category Array
 * @param {Array} props The array of property names.
 * @param {Array} [vals=[]] The array of property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObject(['fred', 'barney'], [30, 40]);
 * // => { 'fred': 30, 'barney': 40 }
 */
function zipObject(props, vals) {
  var index = -1,
      length = props ? props.length : 0,
      result = {};

  if (!vals && length && !isArray(props[0])) {
    vals = [];
  }
  while (++index < length) {
    var key = props[index];
    if (vals) {
      result[key] = vals[index];
    } else if (key) {
      result[key[0]] = key[1];
    }
  }
  return result;
}

module.exports = zipObject;

},{"../lang/isArray":222}],85:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'chain': require('./chain/chain'),
  'lodash': require('./chain/lodash'),
  'tap': require('./chain/tap'),
  'toJSON': require('./chain/wrapperValueOf'),
  'value': require('./chain/wrapperValueOf'),
  'wrapperChain': require('./chain/wrapperChain'),
  'wrapperToString': require('./chain/wrapperToString'),
  'wrapperValueOf': require('./chain/wrapperValueOf')
};

},{"./chain/chain":86,"./chain/lodash":87,"./chain/tap":88,"./chain/wrapperChain":89,"./chain/wrapperToString":90,"./chain/wrapperValueOf":91}],86:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var lodash = require('./lodash');

/**
 * Creates a `lodash` object that wraps `value` with explicit method
 * chaining enabled.
 *
 * @static
 * @memberOf _
 * @category Chain
 * @param {*} value The value to wrap.
 * @returns {Object} Returns the new wrapper object.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36 },
 *   { 'name': 'fred',    'age': 40 },
 *   { 'name': 'pebbles', 'age': 1 }
 * ];
 *
 * var youngest = _.chain(characters)
 *     .sortBy('age')
 *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
 *     .first()
 *     .value();
 * // => 'pebbles is 1'
 */
function chain(value) {
  var result = lodash(value);
  result.__chain__ = true;
  return result;
}

module.exports = chain;

},{"./lodash":87}],87:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArray = require('../lang/isArray'),
    lodashWrapper = require('../internal/lodashWrapper');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps the given value to enable intuitive
 * method chaining.
 *
 * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
 * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
 * and `unshift`
 *
 * Chaining is supported in custom builds as long as the `value` method is
 * implicitly or explicitly included in the build.
 *
 * The chainable wrapper functions are:
 * `after`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`, `callback`,
 * `chain`, `chunk`, `compact`, `concat`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defer`, `delay`, `difference`, `drop`,
 * `dropRight`, `dropRightWhile`, `dropWhile`, `filter`, `flatten`, `flattenDeep`,
 * `flow`, `flowRight`, `forEach`, `forEachRight`, `forIn`, `forInRight`,
 * `forOwn`, `forOwnRight`, `functions`, `groupBy`, `indexBy`, `initial`,
 * `intersection`, `invert`, `invoke`, `keys`, `keysIn`, `map`, `mapValues`,
 * `matches`, `memoize`, `merge`, `mixin`, `negate`, `noop`, `omit`, `once`,
 * `pairs`, `partial`, `partialRight`, `partition`, `pick`, `pluck`, `property`,
 * `pull`, `pullAt`, `push`, `range`, `reject`, `remove`, `rest`, `reverse`,
 * `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `times`, `toArray`,
 * `transform`, `union`, `uniq`, `unshift`, `unzip`, `values`, `valuesIn`,
 * `where`, `without`, `wrap`, `xor`, `zip`, and `zipObject`
 *
 * The non-chainable wrapper functions are:
 * `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `contains`,
 * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
 * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
 * `identity`, `indexOf`, `isArguments`, `isArray`, `isBoolean`, isDate`,
 * `isElement`, `isEmpty`, `isEqual`, `isError`, `isFinite`, `isFunction`,
 * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
 * `isRegExp`, `isString`, `isUndefined`, `join`, `kebabCase`, `last`,
 * `lastIndexOf`, `max`, `min`, `noConflict`, `now`, `pad`, `padLeft`,
 * `padRight`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `repeat`,
 * `result`, `runInContext`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
 * `sortedLastIndex`, `startsWith`, `template`, `trim`, `trimLeft`, `trimRight`,
 * `trunc`, `unescape`, `uniqueId`, and `value`
 *
 * The wrapper function `sample` will return a wrapped value when `n` is
 * provided, otherwise it will return an unwrapped value.
 *
 * Explicit chaining can be enabled by using the `_.chain` method.
 *
 * @name _
 * @constructor
 * @category Chain
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns a `lodash` instance.
 * @example
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // returns an unwrapped value
 * wrapped.reduce(function(sum, n) { return sum + n; });
 * // => 6
 *
 * // returns a wrapped value
 * var squares = wrapped.map(function(n) { return n * n; });
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (value && typeof value == 'object') {
    if (value instanceof lodashWrapper) {
      return value;
    }
    if (!isArray(value) && hasOwnProperty.call(value, '__wrapped__')) {
      value = value.__wrapped__;
    }
  }
  return new lodashWrapper(value);
}

// ensure `new lodashWrapper` is an instance of `lodash`
lodashWrapper.prototype = lodash.prototype;

module.exports = lodash;

},{"../internal/lodashWrapper":205,"../lang/isArray":222}],88:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method invokes `interceptor` and returns `value`. The interceptor is
 * bound to `thisArg` and invoked with one argument; (value). The purpose of
 * this method is to "tap into" a method chain in order to perform operations
 * on intermediate results within the chain.
 *
 * @static
 * @memberOf _
 * @category Chain
 * @param {*} value The value to provide to `interceptor`.
 * @param {Function} interceptor The function to invoke.
 * @param {*} [thisArg] The `this` binding of `interceptor`.
 * @returns {*} Returns `value`.
 * @example
 *
 * _([1, 2, 3, 4])
 *  .tap(function(array) { array.pop(); })
 *  .reverse()
 *  .value();
 * // => [3, 2, 1]
 */
function tap(value, interceptor, thisArg) {
  interceptor.call(thisArg, value);
  return value;
}

module.exports = tap;

},{}],89:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Enables explicit method chaining on the wrapper object.
 *
 * @name chain
 * @memberOf _
 * @category Chain
 * @returns {*} Returns the wrapper object.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // without explicit chaining
 * _(characters).first();
 * // => { 'name': 'barney', 'age': 36 }
 *
 * // with explicit chaining
 * _(characters).chain()
 *   .first()
 *   .pick('age')
 *   .value();
 * // => { 'age': 36 }
 */
function wrapperChain() {
  this.__chain__ = true;
  return this;
}

module.exports = wrapperChain;

},{}],90:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Produces the result of coercing the wrapped value to a string.
 *
 * @name toString
 * @memberOf _
 * @category Chain
 * @returns {string} Returns the coerced string value.
 * @example
 *
 * _([1, 2, 3]).toString();
 * // => '1,2,3'
 */
function wrapperToString() {
  return String(this.__wrapped__);
}

module.exports = wrapperToString;

},{}],91:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Extracts the wrapped value.
 *
 * @name valueOf
 * @memberOf _
 * @alias toJSON, value
 * @category Chain
 * @returns {*} Returns the wrapped value.
 * @example
 *
 * _([1, 2, 3]).valueOf();
 * // => [1, 2, 3]
 */
function wrapperValueOf() {
  return this.__wrapped__;
}

module.exports = wrapperValueOf;

},{}],92:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'all': require('./collection/every'),
  'any': require('./collection/some'),
  'at': require('./collection/at'),
  'collect': require('./collection/map'),
  'contains': require('./collection/contains'),
  'countBy': require('./collection/countBy'),
  'detect': require('./collection/find'),
  'each': require('./collection/forEach'),
  'eachRight': require('./collection/forEachRight'),
  'every': require('./collection/every'),
  'filter': require('./collection/filter'),
  'find': require('./collection/find'),
  'findLast': require('./collection/findLast'),
  'findWhere': require('./collection/findWhere'),
  'foldl': require('./collection/reduce'),
  'foldr': require('./collection/reduceRight'),
  'forEach': require('./collection/forEach'),
  'forEachRight': require('./collection/forEachRight'),
  'groupBy': require('./collection/groupBy'),
  'include': require('./collection/contains'),
  'indexBy': require('./collection/indexBy'),
  'inject': require('./collection/reduce'),
  'invoke': require('./collection/invoke'),
  'map': require('./collection/map'),
  'max': require('./collection/max'),
  'min': require('./collection/min'),
  'partition': require('./collection/partition'),
  'pluck': require('./collection/pluck'),
  'reduce': require('./collection/reduce'),
  'reduceRight': require('./collection/reduceRight'),
  'reject': require('./collection/reject'),
  'sample': require('./collection/sample'),
  'select': require('./collection/filter'),
  'shuffle': require('./collection/shuffle'),
  'size': require('./collection/size'),
  'some': require('./collection/some'),
  'sortBy': require('./collection/sortBy'),
  'toArray': require('./collection/toArray'),
  'where': require('./collection/where'),
  'clear': require('./collection/clear')
};

},{"./collection/at":93,"./collection/clear":94,"./collection/contains":95,"./collection/countBy":96,"./collection/every":97,"./collection/filter":98,"./collection/find":99,"./collection/findLast":100,"./collection/findWhere":101,"./collection/forEach":102,"./collection/forEachRight":103,"./collection/groupBy":104,"./collection/indexBy":105,"./collection/invoke":106,"./collection/map":107,"./collection/max":108,"./collection/min":109,"./collection/partition":110,"./collection/pluck":111,"./collection/reduce":112,"./collection/reduceRight":113,"./collection/reject":114,"./collection/sample":115,"./collection/shuffle":116,"./collection/size":117,"./collection/some":118,"./collection/sortBy":119,"./collection/toArray":120,"./collection/where":121}],93:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseAt = require('../internal/baseAt'),
    baseFlatten = require('../internal/baseFlatten'),
    toIterable = require('../internal/toIterable');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Creates an array of elements corresponding to the specified keys, or indexes,
 * of the collection. Keys may be specified as individual arguments or as arrays
 * of keys.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {...(number|number[]|string|string[])} [props] The property names
 *  or indexes of elements to pick, specified individually or in arrays.
 * @returns {Array} Returns the new array of picked elements.
 * @example
 *
 * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
 * // => ['a', 'c', 'e']
 *
 * _.at(['fred', 'barney', 'pebbles'], 0, 2);
 * // => ['fred', 'pebbles']
 */
function at(collection) {
  var length = collection ? collection.length : 0;

  if (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER) {
    collection = toIterable(collection);
  }
  return baseAt(collection, baseFlatten(arguments, false, false, 1));
}

module.exports = at;

},{"../internal/baseAt":152,"../internal/baseFlatten":163,"../internal/toIterable":214}],94:[function(require,module,exports){

'use strict';

var isArray = require('../lang/isArray');
var isString = require('../lang/isString');
var isObject = require('../lang/isObject');
var forOwn = require('../object/forOwn');

/**
 * Clears the collection by emptying it, not by assinging new empty array or object.
 *
 * @method
 * @memberof ash
 * @param {Array|Object|string} collection The collection to clear
 * @returns {Array|Object|string} The empty collection.
 */
function clear(collection)
{
	if (isArray(collection))
	{
		for (var i = collection.length - 1; i >= 0; i--)
		{
			collection.pop();
		} // for
	} else if (isString(collection))
	{
		collection = '';
	} else if (isObject(collection))
	{
		forOwn(collection, function (value, key, object)
		{
			delete object[key];
		});
	} else collection = null;

	return collection;
} // clear

module.exports = clear;
},{"../lang/isArray":222,"../lang/isObject":238,"../lang/isString":241,"../object/forOwn":255}],95:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('../internal/baseIndexOf'),
    isArray = require('../lang/isArray'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Checks if `value` is present in `collection` using  `SameValueZero` for
 * equality comparisons. If `fromIndex` is negative, it is used as the offset
 * from the end of the collection.
 *
 * **Note:** `SameValueZero` is like strict equality, e.g. `===`, except that
 * `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to check for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.contains([1, 2, 3], 1);
 * // => true
 *
 * _.contains([1, 2, 3], 1, 2);
 * // => false
 *
 * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.contains('pebbles', 'eb');
 * // => true
 */
function contains(collection, target, fromIndex) {
  var length = collection ? collection.length : 0;

  if (!(typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER)) {
    collection = values(collection);
    length = collection.length;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  } else {
    fromIndex = 0;
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
    : (baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = contains;

},{"../internal/baseIndexOf":170,"../lang/isArray":222,"../lang/isString":241,"../object/values":268}],96:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createAggregator = require('../internal/createAggregator');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is the number of times the key was returned by `iteratee`.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.countBy([4.3, 6.1, 6.4], function(n) { return Math.floor(n); });
 * // => { '4': 1, '6': 2 }
 *
 * _.countBy([4.3, 6.1, 6.4], function(n) { return this.floor(n); }, Math);
 * // => { '4': 1, '6': 2 }
 *
 * _.countBy(['one', 'two', 'three'], 'length');
 * // => { '3': 2, '5': 1 }
 */
var countBy = createAggregator(function(result, value, key) {
  hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
});

module.exports = countBy;

},{"../internal/createAggregator":188}],97:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEvery = require('../internal/arrayEvery'),
    baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    isArray = require('../lang/isArray');

/**
 * The base implementation of `_.every` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns `true` if all elements passed the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;

  baseEach(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

/**
 * Checks if the predicate returns truthy for **all** elements of `collection`.
 * The predicate is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias all
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {boolean} Returns `true` if all elements passed the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes']);
 * // => false
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.every(characters, 'age');
 * // => true
 *
 * // using "_.where" callback shorthand
 * _.every(characters, { 'age': 36 });
 * // => false
 */
function every(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayEvery : baseEvery;
  if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
    predicate = baseCallback(predicate, thisArg, 3);
  }
  return func(collection, predicate);
}

module.exports = every;

},{"../internal/arrayEvery":148,"../internal/baseCallback":153,"../internal/baseEach":159,"../lang/isArray":222}],98:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * the predicate returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * var evens = _.filter([1, 2, 3, 4], function(n) { return n % 2 == 0; });
 * // => [2, 4]
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40, 'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.filter(characters, 'blocked');
 * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
 *
 * // using "_.where" callback shorthand
 * _.filter(characters, { 'age': 36 });
 * // => [{ 'name': 'barney', 'age': 36 }]
 */
function filter(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;

  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, predicate);
}

module.exports = filter;

},{"../internal/arrayFilter":149,"../internal/baseCallback":153,"../internal/baseFilter":161,"../lang/isArray":222}],99:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    baseFind = require('../internal/baseFind'),
    findIndex = require('../array/findIndex'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning the first element that
 * the predicate returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36 },
 *   { 'name': 'fred',    'age': 40, 'blocked': true },
 *   { 'name': 'pebbles', 'age': 1 }
 * ];
 *
 * _.find(characters, function(chr) {
 *   return chr.age < 40;
 * });
 * // => { 'name': 'barney', 'age': 36 }
 *
 * // using "_.where" callback shorthand
 * _.find(characters, { 'age': 1 });
 * // =>  { 'name': 'pebbles', 'age': 1 }
 *
 * // using "_.pluck" callback shorthand
 * _.find(characters, 'blocked');
 * // => { 'name': 'fred', 'age': 40, 'blocked': true }
 */
function find(collection, predicate, thisArg) {
  if (isArray(collection)) {
    var index = findIndex(collection, predicate, thisArg);
    return index > -1 ? collection[index] : undefined;
  }
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(collection, predicate, baseEach);
}

module.exports = find;

},{"../array/findIndex":56,"../internal/baseCallback":153,"../internal/baseEach":159,"../internal/baseFind":162,"../lang/isArray":222}],100:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEachRight = require('../internal/baseEachRight'),
    baseFind = require('../internal/baseFind');

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) { return n % 2 == 1; });
 * // => 3
 */
function findLast(collection, predicate, thisArg) {
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(collection, predicate, baseEachRight);
}

module.exports = findLast;

},{"../internal/baseCallback":153,"../internal/baseEachRight":160,"../internal/baseFind":162}],101:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var find = require('./find'),
    matches = require('../utility/matches');

/**
 * Performs a deep comparison between each element in `collection` and the
 * source object, returning the first element that has equivalent property
 * values.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Object} source The object of property values to match.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36, 'employer': 'slate' },
 *   { 'name': 'fred',   'age': 40, 'employer': 'slate' }
 * ];
 *
 * _.findWhere(characters, { 'employer': 'slate' });
 * // => { 'name': 'barney', 'age': 36, 'employer': 'slate' }
 *
 * _.findWhere(characters, { 'age': 40 });
 * // =>  { 'name': 'fred', 'age': 40, 'employer': 'slate' }
 */
function findWhere(collection, source) {
  return find(collection, matches(source));
}

module.exports = findWhere;

},{"../utility/matches":296,"./find":99}],102:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEach = require('../internal/arrayEach'),
    baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2, 3]).forEach(function(n) { console.log(n); });
 * // => logs each value and returns the array
 *
 * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(n, key) { console.log(n, key); });
 * // => logs each value-key pair and returns the object (property order is not guaranteed)
 */
function forEach(collection, iteratee, thisArg) {
  return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, baseCallback(iteratee, thisArg, 3));
}

module.exports = forEach;

},{"../internal/arrayEach":147,"../internal/baseCallback":153,"../internal/baseEach":159,"../lang/isArray":222}],103:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEachRight = require('../internal/baseEachRight'),
    isArray = require('../lang/isArray');

/**
 * A specialized version of `_.forEachRight` for arrays without support for
 * callback shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEachRight(array, iteratee) {
  var length = array.length;

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * This method is like `_.forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @alias eachRight
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2, 3]).forEachRight(function(n) { console.log(n); }).join(',');
 * // => logs each value from right to left and returns the array
 */
function forEachRight(collection, iteratee, thisArg) {
  return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
    ? arrayEachRight(collection, iteratee)
    : baseEachRight(collection, baseCallback(iteratee, thisArg, 3));
}

module.exports = forEachRight;

},{"../internal/baseCallback":153,"../internal/baseEachRight":160,"../lang/isArray":222}],104:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createAggregator = require('../internal/createAggregator');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding
 * value of each key is an array of the elements responsible for generating
 * the key. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments; (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.groupBy([4.2, 6.1, 6.4], function(n) { return Math.floor(n); });
 * // => { '4': [4.2], '6': [6.1, 6.4] }
 *
 * _.groupBy([4.2, 6.1, 6.4], function(n) { return this.floor(n); }, Math);
 * // => { '4': [4.2], '6': [6.1, 6.4] }
 *
 * // using "_.pluck" callback shorthand
 * _.groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 */
var groupBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    result[key] = [value];
  }
});

module.exports = groupBy;

},{"../internal/createAggregator":188}],105:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of the collection through `iteratee`. The corresponding value
 * of each key is the last element responsible for generating the key. The
 * iteratee function is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var keyData = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.indexBy(keyData, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) { return String.fromCharCode(object.code); });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) { return this.fromCharCode(object.code); }, String);
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
var indexBy = createAggregator(function(result, value, key) {
  result[key] = value;
});

module.exports = indexBy;

},{"../internal/createAggregator":188}],106:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseEach = require('../internal/baseEach'),
    slice = require('../array/slice');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.invoke` which requires additional arguments
 * be provided as an array of arguments rather than individually.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|string} methodName The name of the method to invoke or
 *  the function invoked per iteration.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {Array} Returns the array of results.
 */
function baseInvoke(collection, methodName, args) {
  var index = -1,
      isFunc = typeof methodName == 'function',
      length = collection ? collection.length : 0,
      result = [];

  if (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER) {
    result.length = length;
  }
  baseEach(collection, function(value) {
    var func = isFunc ? methodName : (value != null && value[methodName]);
    result[++index] = func ? func.apply(value, args) : undefined;
  });
  return result;
}

/**
 * Invokes the method named by `methodName` on each element in the collection,
 * returning an array of the results of each invoked method. Any additional
 * arguments are provided to each invoked method. If `methodName` is a function
 * it is invoked for, and `this` bound to, each element in the collection.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|string} methodName The name of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invoke([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
function invoke(collection, methodName) {
  return baseInvoke(collection, methodName, slice(arguments, 2));
}

module.exports = invoke;

},{"../array/slice":71,"../internal/baseEach":159}],107:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in the collection through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments; (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * _.map([1, 2, 3], function(n) { return n * 3; });
 * // => [3, 6, 9]
 *
 * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(n) { return n * 3; });
 * // => [3, 6, 9] (property order is not guaranteed)
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.map(characters, 'name');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  iteratee = baseCallback(iteratee, thisArg, 3);

  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":150,"../internal/baseCallback":153,"../internal/baseMap":172,"../lang/isArray":222}],108:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    charAtCallback = require('../internal/charAtCallback'),
    isArray = require('../lang/isArray'),
    isString = require('../lang/isString'),
    toIterable = require('../internal/toIterable');

/**
 * Retrieves the maximum value of `collection`. If the collection is empty
 * or falsey `-Infinity` is returned. If an iteratee function is provided it
 * is invoked for each value in the collection to generate the criterion by
 * which the value is ranked. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 *  If a property name or object is provided it is used to create a "_.pluck"
 *  or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => -Infinity
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * _.max(characters, function(chr) { return chr.age; });
 * // => { 'name': 'fred', 'age': 40 };
 *
 * // using "_.pluck" callback shorthand
 * _.max(characters, 'age');
 * // => { 'name': 'fred', 'age': 40 };
 */
function max(collection, iteratee, thisArg) {
  var computed = -Infinity,
      result = computed,
      type = typeof iteratee;

  // enables use as a callback for functions like `_.map`
  if ((type == 'number' || type == 'string') && thisArg && thisArg[iteratee] === collection) {
    iteratee = null;
  }
  var noIteratee = iteratee == null,
      isArr = noIteratee && isArray(collection),
      isStr = !isArr && isString(collection);

  if (noIteratee && !isStr) {
    var index = -1,
        iterable = toIterable(collection),
        length = iterable.length;

    while (++index < length) {
      var value = iterable[index];
      if (value > result) {
        result = value;
      }
    }
  } else {
    iteratee = (noIteratee && isStr)
      ? charAtCallback
      : baseCallback(iteratee, thisArg, 3);

    baseEach(collection, function(value, index, collection) {
      var current = iteratee(value, index, collection);
      if (current > computed || (current === -Infinity && current === result)) {
        computed = current;
        result = value;
      }
    });
  }
  return result;
}

module.exports = max;

},{"../internal/baseCallback":153,"../internal/baseEach":159,"../internal/charAtCallback":183,"../internal/toIterable":214,"../lang/isArray":222,"../lang/isString":241}],109:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    charAtCallback = require('../internal/charAtCallback'),
    isArray = require('../lang/isArray'),
    isString = require('../lang/isString'),
    toIterable = require('../internal/toIterable');

/**
 * Retrieves the minimum value of `collection`. If the collection is empty
 * or falsey `Infinity` is returned. If an iteratee function is provided it
 * is invoked for each value in the collection to generate the criterion by
 * which the value is ranked. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 *  If a property name or object is provided it is used to create a "_.pluck"
 *  or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => Infinity
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * _.min(characters, function(chr) { return chr.age; });
 * // => { 'name': 'barney', 'age': 36 };
 *
 * // using "_.pluck" callback shorthand
 * _.min(characters, 'age');
 * // => { 'name': 'barney', 'age': 36 };
 */
function min(collection, iteratee, thisArg) {
  var computed = Infinity,
      result = computed,
      type = typeof iteratee;

  // enables use as a callback for functions like `_.map`
  if ((type == 'number' || type == 'string') && thisArg && thisArg[iteratee] === collection) {
    iteratee = null;
  }
  var noIteratee = iteratee == null,
      isArr = noIteratee && isArray(collection),
      isStr = !isArr && isString(collection);

  if (noIteratee && !isStr) {
    var index = -1,
        iterable = toIterable(collection),
        length = iterable.length;

    while (++index < length) {
      var value = iterable[index];
      if (value < result) {
        result = value;
      }
    }
  } else {
    iteratee = (noIteratee && isStr)
      ? charAtCallback
      : baseCallback(iteratee, thisArg, 3);

    baseEach(collection, function(value, index, collection) {
      var current = iteratee(value, index, collection);
      if (current < computed || (current === Infinity && current === result)) {
        computed = current;
        result = value;
      }
    });
  }
  return result;
}

module.exports = min;

},{"../internal/baseCallback":153,"../internal/baseEach":159,"../internal/charAtCallback":183,"../internal/toIterable":214,"../lang/isArray":222,"../lang/isString":241}],110:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements the predicate returns truthy for, while the second of which
 * contains elements the predicate returns falsey for. The predicate is bound
 * to `thisArg` and invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the array of grouped elements.
 * @example
 *
 * _.partition([1, 2, 3], function(n) { return n % 2; });
 * // => [[1, 3], [2]]
 *
 * _.partition([1.2, 2.3, 3.4], function(n) { return this.floor(n) % 2; }, Math);
 * // => [[1, 3], [2]]
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36 },
 *   { 'name': 'fred',    'age': 40, 'blocked': true },
 *   { 'name': 'pebbles', 'age': 1 }
 * ];
 *
 * // using "_.where" callback shorthand
 * _.map(_.partition(characters, { 'age': 1 }), function(array) { return _.pluck(array, 'name'); });
 * // => [['pebbles'], ['barney', 'fred']]
 *
 * // using "_.pluck" callback shorthand
 * _.map(_.partition(characters, 'blocked'), function(array) { return _.pluck(array, 'name'); });
 * // => [['fred'], ['barney', 'pebbles']]
 */
var partition = createAggregator(function(result, value, key) {
  result[key ? 0 : 1].push(value);
}, function() { return [[], []]; });

module.exports = partition;

},{"../internal/createAggregator":188}],111:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var map = require('./map'),
    property = require('../utility/property');

/**
 * Retrieves the value of a specified property from all elements in the collection.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string} key The name of the property to pluck.
 * @returns {Array} Returns the property values.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * _.pluck(characters, 'name');
 * // => ['barney', 'fred']
 */
function pluck(collection, key) {
  return map(collection, property(key));
}

module.exports = pluck;

},{"../utility/property":302,"./map":107}],112:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    baseReduce = require('../internal/baseReduce'),
    isArray = require('../lang/isArray');

/**
 * A specialized version of `_.reduce` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initFromArray=false] Specify using the first element of
 *  `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initFromArray) {
  var index = -1,
      length = array.length;

  if (initFromArray && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Reduces a collection to a value which is the accumulated result of running
 * each element in the collection through `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not provided the first element of the collection is used as the initial
 * value. The `iteratee` is bound to `thisArg`and invoked with four arguments;
 * (accumulator, value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @alias foldl, inject
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var sum = _.reduce([1, 2, 3], function(sum, n) { return sum + n; });
 * // => 6
 *
 * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
 *   result[key] = n * 3;
 *   return result;
 * }, {});
 * // => { 'a': 3, 'b': 6, 'c': 9 } (property order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator, thisArg) {
  var func = isArray(collection) ? arrayReduce : baseReduce;
  return func(collection, baseCallback(iteratee, thisArg, 4), accumulator, arguments.length < 3, baseEach);
}

module.exports = reduce;

},{"../internal/baseCallback":153,"../internal/baseEach":159,"../internal/baseReduce":175,"../lang/isArray":222}],113:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEachRight = require('../internal/baseEachRight'),
    baseReduce = require('../internal/baseReduce'),
    isArray = require('../lang/isArray');

/**
 * A specialized version of `_.reduceRight` for arrays without support for
 * callback shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initFromArray=false] Specify using the last element of
 *  `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
  var length = array.length;

  if (initFromArray && length) {
    accumulator = array[--length];
  }
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length, array);
  }
  return accumulator;
}

/**
 * This method is like `_.reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @alias foldr
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var array = [[0, 1], [2, 3], [4, 5]];
 * _.reduceRight(array, function(flattened, other) { return flattened.concat(other); }, []);
 * // => [4, 5, 2, 3, 0, 1]
 */
function reduceRight(collection, iteratee, accumulator, thisArg) {
  var func = isArray(collection) ? arrayReduceRight : baseReduce;
  return func(collection, baseCallback(iteratee, thisArg, 4), accumulator, arguments.length < 3, baseEachRight);
}

module.exports = reduceRight;

},{"../internal/baseCallback":153,"../internal/baseEachRight":160,"../internal/baseReduce":175,"../lang/isArray":222}],114:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * The opposite of `_.filter`; this method returns the elements of `collection`
 * the predicate does **not** return truthy for.
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * var odds = _.reject([1, 2, 3, 4], function(n) { return n % 2 == 0; });
 * // => [1, 3]
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40, 'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.reject(characters, 'blocked');
 * // => [{ 'name': 'barney', 'age': 36 }]
 *
 * // using "_.where" callback shorthand
 * _.reject(characters, { 'age': 36 });
 * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
 */
function reject(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;

  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, function(value, index, collection) {
    return !predicate(value, index, collection);
  });
}

module.exports = reject;

},{"../internal/arrayFilter":149,"../internal/baseCallback":153,"../internal/baseFilter":161,"../lang/isArray":222}],115:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseRandom = require('../internal/baseRandom'),
    shuffle = require('./shuffle'),
    toIterable = require('../internal/toIterable');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMin = Math.min;

/**
 * Retrieves a random element or `n` random elements from a collection.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to sample.
 * @param {number} [n] The number of elements to sample.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {*} Returns the random sample(s).
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 *
 * _.sample([1, 2, 3, 4], 2);
 * // => [3, 1]
 */
function sample(collection, n, guard) {
  if (n == null || guard) {
    collection = toIterable(collection);
    var length = collection.length;
    return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
  }
  var result = shuffle(collection);
  result.length = nativeMin(n < 0 ? 0 : (+n || 0), result.length);
  return result;
}

module.exports = sample;

},{"../internal/baseRandom":174,"../internal/toIterable":214,"./shuffle":116}],116:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseRandom = require('../internal/baseRandom'),
    toIterable = require('../internal/toIterable');

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates
 * shuffle. See [Wikipedia](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  collection = toIterable(collection);

  var index = -1,
      length = collection.length,
      result = Array(length);

  while (++index < length) {
    var rand = baseRandom(0, index);
    if (index != rand) {
      result[index] = result[rand];
    }
    result[rand] = collection[index];
  }
  return result;
}

module.exports = shuffle;

},{"../internal/baseRandom":174,"../internal/toIterable":214}],117:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = require('../object/keys');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Gets the size of the collection by returning `collection.length` for
 * array-like values or the number of own enumerable properties for objects.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns `collection.length` or number of own enumerable properties.
 * @example
 *
 * _.size([1, 2]);
 * // => 2
 *
 * _.size({ 'one': 1, 'two': 2, 'three': 3 });
 * // => 3
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  var length = collection ? collection.length : 0;
  return (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER)
    ? length
    : keys(collection).length;
}

module.exports = size;

},{"../object/keys":260}],118:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    isArray = require('../lang/isArray');

/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passed the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.some` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passed the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

/**
 * Checks if the predicate returns truthy for **any** element of `collection`.
 * The function returns as soon as it finds a passing value and does not iterate
 * over the entire collection. The predicate is bound to `thisArg` and invoked
 * with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias any
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {boolean} Returns `true` if any element passed the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40, 'blocked': true }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.some(characters, 'blocked');
 * // => true
 *
 * // using "_.where" callback shorthand
 * _.some(characters, { 'age': 1 });
 * // => false
 */
function some(collection, predicate, thisArg) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
    predicate = baseCallback(predicate, thisArg, 3);
  }
  return func(collection, predicate);
}

module.exports = some;

},{"../internal/baseCallback":153,"../internal/baseEach":159,"../lang/isArray":222}],119:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseCompareAscending = require('../internal/baseCompareAscending'),
    baseEach = require('../internal/baseEach'),
    isArray = require('../lang/isArray');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Used by `_.sortBy` to compare transformed elements of `collection` and stable
 * sort them in ascending order.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareAscending(object, other) {
  return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
}

/**
 * Used by `_.sortBy` to compare multiple properties of each element in a
 * collection and stable sort them in ascending order.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultipleAscending(object, other) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length;

  while (++index < length) {
    var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      return result;
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value
  // for `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://code.google.com/p/v8/issues/detail?id=90
  return object.index - other.index;
}

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection through `iteratee`. This method performs
 * a stable sort, that is, it preserves the original sort order of equal elements.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an array of property names is provided for `iteratee` the collection
 * is sorted by each property value.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Array|Function|Object|string} [iteratee=identity] The function
 *  invoked per iteration. If property name(s) or an object is provided it
 *  is used to create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * _.sortBy([1, 2, 3], function(n) { return Math.sin(n); });
 * // => [3, 1, 2]
 *
 * _.sortBy([1, 2, 3], function(n) { return this.sin(n); }, Math);
 * // => [3, 1, 2]
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36 },
 *   { 'name': 'fred',    'age': 40 },
 *   { 'name': 'barney',  'age': 26 },
 *   { 'name': 'fred',    'age': 30 }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.map(_.sortBy(characters, 'age'), _.values);
 * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
 *
 * // sorting by multiple properties
 * _.map(_.sortBy(characters, ['name', 'age']), _.values);
 * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
 */
function sortBy(collection, iteratee, thisArg) {
  var index = -1,
      length = collection ? collection.length : 0,
      multi = iteratee && isArray(iteratee),
      result = [];

  if (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER) {
    result.length = length;
  }
  if (!multi) {
    iteratee = baseCallback(iteratee, thisArg, 3);
  }
  baseEach(collection, function(value, key, collection) {
    if (multi) {
      var length = iteratee.length,
          criteria = Array(length);

      while (length--) {
        criteria[length] = value == null ? undefined : value[iteratee[length]];
      }
    } else {
      criteria = iteratee(value, key, collection);
    }
    result[++index] = { 'criteria': criteria, 'index': index, 'value': value };
  });

  length = result.length;
  result.sort(multi ? compareMultipleAscending : compareAscending);
  while (length--) {
    result[length] = result[length].value;
  }
  return result;
}

module.exports = sortBy;

},{"../internal/baseCallback":153,"../internal/baseCompareAscending":155,"../internal/baseEach":159,"../lang/isArray":222}],120:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSlice = require('../internal/baseSlice'),
    values = require('../object/values');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Converts `collection` to an array.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to convert.
 * @returns {Array} Returns the new converted array.
 * @example
 *
 * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
 * // => [2, 3, 4]
 */
function toArray(collection) {
  var length = collection ? collection.length : 0;
  if (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER) {
    return baseSlice(collection);
  }
  return values(collection);
}

module.exports = toArray;

},{"../internal/baseSlice":177,"../object/values":268}],121:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var filter = require('./filter'),
    matches = require('../utility/matches');

/**
 * Performs a deep comparison between each element in `collection` and the
 * source object, returning an array of all elements that have equivalent
 * property values.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Object} source The object of property values to match.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36, 'employer': 'slate', 'pets': ['hoppy'] },
 *   { 'name': 'fred',   'age': 40, 'employer': 'slate', 'pets': ['baby puss', 'dino'] }
 * ];
 *
 * _.pluck(_.where(characters, { 'age': 36 }), 'name');
 * // => ['barney']
 *
 * _.pluck(_.where(characters, { 'pets': ['dino'] }), 'name');
 * // => ['fred']
 *
 * _.pluck(_.where(characters, { 'employer': 'slate' }), 'name');
 * // => ['barney', 'fred']
 */
function where(collection, source) {
  return filter(collection, matches(source));
}

module.exports = where;

},{"../utility/matches":296,"./filter":98}],122:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'after': require('./function/after'),
  'backflow': require('./function/flowRight'),
  'before': require('./function/before'),
  'bind': require('./function/bind'),
  'bindAll': require('./function/bindAll'),
  'bindKey': require('./function/bindKey'),
  'compose': require('./function/flowRight'),
  'curry': require('./function/curry'),
  'curryRight': require('./function/curryRight'),
  'debounce': require('./function/debounce'),
  'defer': require('./function/defer'),
  'delay': require('./function/delay'),
  'flow': require('./function/flow'),
  'flowRight': require('./function/flowRight'),
  'memoize': require('./function/memoize'),
  'negate': require('./function/negate'),
  'once': require('./function/once'),
  'partial': require('./function/partial'),
  'partialRight': require('./function/partialRight'),
  'throttle': require('./function/throttle'),
  'wrap': require('./function/wrap'),
  'unary': require('./function/unary'),
  'binary': require('./function/binary'),
  'ternary': require('./function/ternary'),
  'quaternary': require('./function/quaternary')
};

},{"./function/after":123,"./function/before":124,"./function/binary":125,"./function/bind":126,"./function/bindAll":127,"./function/bindKey":128,"./function/curry":129,"./function/curryRight":130,"./function/debounce":131,"./function/defer":132,"./function/delay":133,"./function/flow":134,"./function/flowRight":135,"./function/memoize":136,"./function/negate":137,"./function/once":138,"./function/partial":139,"./function/partialRight":140,"./function/quaternary":141,"./function/ternary":142,"./function/throttle":143,"./function/unary":144,"./function/wrap":145}],123:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite;

/**
 * The opposite of `_.before`; this method creates a function that invokes
 * `func` only after it is called `n` times.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var saves = ['profile', 'settings'];
 *
 * var done = _.after(saves.length, function() {
 *   console.log('done saving!');
 * });
 *
 * _.forEach(saves, function(type) {
 *   asyncSave({ 'type': type, 'complete': done });
 * });
 * // => logs 'done saving!' after all saves have completed
 */
function after(n, func) {
  if (!isFunction(func)) {
    if (isFunction(n)) {
      var temp = n;
      n = func;
      func = temp;
    } else {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
  }
  n = nativeIsFinite(n = +n) ? n : 0;
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}

module.exports = after;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isFunction":231}],124:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func`, with the `this` binding and
 * arguments of the created function, until it is called `n` times.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {number} n The number of times `func` may be called.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery('#add').on('click', _.before(5, addContactToList));
 * // => allows adding up to 5 contacts to the list
 */
function before(n, func) {
  var result;
  if (!isFunction(func)) {
    if (isFunction(n)) {
      var temp = n;
      n = func;
      func = temp;
    } else {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
  }
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    } else {
      func = null;
    }
    return result;
  };
}

module.exports = before;

},{"../lang/isFunction":231}],125:[function(require,module,exports){
'use strict';

/**
 * Creates a function that only accepts two arguments and ignores the rest.
 *
 * @method
 * @memberOf ash
 * @category Functions
 * @param {Function} func The target function.
 * @returns {Function} Returns The new function.
 */
function binary (func)
{
	return function binary (a, b)
	{
		if (a === null)
		{
			return binary;
		}	else if (b === null)
		{
			return unary(function (b)
			{
				return func(a, b);
			});
		}	else
		{
			return func(a, b);
		}
	};
}

module.exports = binary;
},{}],126:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var basePartial = require('../internal/basePartial'),
    createWrapper = require('../internal/createWrapper'),
    replaceHolders = require('../internal/replaceHolders'),
    slice = require('../array/slice');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and prepends any additional `bind` arguments to those provided to the bound
 * function.
 *
 * **Note:** Unlike native `Function#bind` this method does not set the `length`
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  if (arguments.length < 3) {
    return createWrapper(func, BIND_FLAG, null, thisArg);
  }
  var args = slice(arguments, 2),
      holders = replaceHolders(args, bind.placeholder);

  return basePartial(func, BIND_FLAG | PARTIAL_FLAG, args, holders, thisArg);
}

// assign default placeholders
bind.placeholder = {};

module.exports = bind;

},{"../array/slice":71,"../internal/basePartial":173,"../internal/createWrapper":197,"../internal/replaceHolders":212}],127:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFlatten = require('../internal/baseFlatten'),
    createWrapper = require('../internal/createWrapper'),
    functions = require('../object/functions');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1;

/**
 * The base implementation of `_.bindAll` without support for individual
 * method name arguments.
 *
 * @private
 * @param {Object} object The object to bind and assign the bound methods to.
 * @param {string[]} methodNames The object method names to bind.
 * @returns {Object} Returns `object`.
 */
function baseBindAll(object, methodNames) {
  var index = -1,
      length = methodNames.length;

  while (++index < length) {
    var key = methodNames[index];
    object[key] = createWrapper(object[key], BIND_FLAG, null, object);
  }
  return object;
}

/**
 * Binds methods of an object to the object itself, overwriting the existing
 * method. Method names may be specified as individual arguments or as arrays
 * of method names. If no method names are provided all enumerable function
 * properties, own and inherited, of `object` are bound.
 *
 * **Note:** This method does not set the `length` property of bound functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Object} object The object to bind and assign the bound methods to.
 * @param {...(string|string[])} [methodNames] The object method names to bind,
 *  specified as individual method names or arrays of method names.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var view = {
 *   'label': 'docs',
 *   'onClick': function() { console.log('clicked ' + this.label); }
 * };
 *
 * _.bindAll(view);
 * jQuery('#docs').on('click', view.onClick);
 * // => logs 'clicked docs' when the element is clicked
 */
function bindAll(object) {
  return baseBindAll(object,
    arguments.length > 1
      ? baseFlatten(arguments, false, false, 1)
      : functions(object)
  );
}

module.exports = bindAll;

},{"../internal/baseFlatten":163,"../internal/createWrapper":197,"../object/functions":257}],128:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('../internal/createWrapper'),
    replaceHolders = require('../internal/replaceHolders'),
    slice = require('../array/slice');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2;

/**
 * Creates a function that invokes the method at `object[key]` and prepends
 * any additional `bindKey` arguments to those provided to the bound function.
 * This method differs from `_.bind` by allowing bound functions to reference
 * methods that may be redefined or don't yet exist.
 * See [Peter Michaux's article](http://michaux.ca/articles/lazy-function-definition-pattern)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Object} object The object the method belongs to.
 * @param {string} key The key of the method.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var object = {
 *   'name': 'fred',
 *   'greet': function(greeting) {
 *     return greeting + ' ' + this.name;
 *   }
 * };
 *
 * var func = _.bindKey(object, 'greet', 'hi');
 * func();
 * // => 'hi fred'
 *
 * object.greet = function(greeting) {
 *   return greeting + 'ya ' + this.name + '!';
 * };
 *
 * func();
 * // => 'hiya fred!'
 */
function bindKey(object, key) {
  var bitmask = BIND_FLAG | BIND_KEY_FLAG;
  if (arguments.length > 2) {
    var args = slice(arguments, 2),
        holders = replaceHolders(args, bindKey.placeholder);
  }
  return args
    ? createWrapper(key, bitmask, null, object, args, holders)
    : createWrapper(key, bitmask, null, object);
}

// assign default placeholders
bindKey.placeholder = {};

module.exports = bindKey;

},{"../array/slice":71,"../internal/createWrapper":197,"../internal/replaceHolders":212}],129:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCurry = require('../internal/baseCurry');

/** Used to compose bitmasks for wrapper metadata */
var CURRY_FLAG = 4;

/**
 * Creates a function that accepts one or more arguments of `func` that when
 * called either invokes `func` returning its result if all `func` arguments
 * have been provided, or returns a function that accepts one or more of the
 * remaining `func` arguments, and so on. The arity of `func` can be specified
 * if `func.length` is not sufficient.
 *
 * **Note:** This method does not set the `length` property of curried functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var curried = _.curry(function(a, b, c) {
 *   console.log([a, b, c]);
 * });
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 */
function curry(func, arity) {
  var result = baseCurry(func, CURRY_FLAG, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// assign default placeholders
curry.placeholder = {};

module.exports = curry;

},{"../internal/baseCurry":157}],130:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCurry = require('../internal/baseCurry');

/** Used to compose bitmasks for wrapper metadata */
var CURRY_RIGHT_FLAG = 8;

/**
 * This method is like `_.curry` except that arguments are applied to `func`
 * in the manner of `_.partialRight` instead of `_.partial`.
 *
 * **Note:** This method does not set the `length` property of curried functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var curried = _.curryRight(function(a, b, c) {
 *   console.log([a, b, c]);
 * });
 *
 * curried(3)(2)(1);
 * // => [1, 2, 3]
 *
 * curried(2, 3)(1);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 */
function curryRight(func, arity) {
  var result = baseCurry(func, CURRY_RIGHT_FLAG, arity);
  result.placeholder = curryRight.placeholder;
  return result;
}

// assign default placeholders
curryRight.placeholder = {};

module.exports = curryRight;

},{"../internal/baseCurry":157}],131:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction'),
    isObject = require('../lang/isObject'),
    now = require('../utility/now');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates a function that delays the invocation of `func` until after `wait`
 * milliseconds have elapsed since the last time it was invoked. The created
 * function comes with a `cancel` method to cancel delayed invokes. Provide an
 * options object to indicate that `func` should be invoked on the leading
 * and/or trailing edge of the `wait` timeout. Subsequent calls to the
 * debounced function return the result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked on
 * the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * });
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }, false);
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'name': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : wait;
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

module.exports = debounce;

},{"../lang/isFunction":231,"../lang/isObject":238,"../utility/now":300}],132:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction'),
    slice = require('../array/slice');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to defer.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.defer(function(text) { console.log(text); }, 'deferred');
 * // logs 'deferred' after one or more milliseconds
 */
function defer(func) {
  if (!isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var args = slice(arguments, 1);
  return setTimeout(function() { func.apply(undefined, args); }, 1);
}

module.exports = defer;

},{"../array/slice":71,"../lang/isFunction":231}],133:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction'),
    slice = require('../array/slice');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) { console.log(text); }, 1000, 'later');
 * // => logs 'later' after one second
 */
function delay(func, wait) {
  if (!isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var args = slice(arguments, 2);
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}

module.exports = delay;

},{"../array/slice":71,"../lang/isFunction":231}],134:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEvery = require('../internal/arrayEvery'),
    isFunction = require('../lang/isFunction');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes the provided functions with the `this`
 * binding of the created function, where each successive invocation is
 * supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {...Function} [funcs] Functions to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function add(x, y) {
 *   return x + y;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow(add, square);
 * addSquare(1, 2);
 * // => 9
 */
function flow() {
  var funcs = arguments,
      length = funcs.length;

  if (!length) {
    return function() {};
  }
  if (!arrayEvery(funcs, isFunction)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var index = 0,
        result = funcs[index].apply(this, arguments);

    while (++index < length) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}

module.exports = flow;

},{"../internal/arrayEvery":148,"../lang/isFunction":231}],135:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEvery = require('../internal/arrayEvery'),
    isFunction = require('../lang/isFunction');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * This method is like `_.flow` except that it creates a function that
 * invokes the provided functions from right to left.
 *
 * @static
 * @memberOf _
 * @alias backflow, compose
 * @category Function
 * @param {...Function} [funcs] Functions to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function add(x, y) {
 *   return x + y;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flowRight(square, add);
 * addSquare(1, 2);
 * // => 9
 */
function flowRight() {
  var funcs = arguments,
      fromIndex = funcs.length - 1;

  if (fromIndex < 0) {
    return function() {};
  }
  if (!arrayEvery(funcs, isFunction)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var index = fromIndex,
        result = funcs[index].apply(this, arguments);

    while (index--) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}

module.exports = flowRight;

},{"../internal/arrayEvery":148,"../lang/isFunction":231}],136:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the cache key. The `func` is
 * invoked with the `this` binding of the memoized function. The result cache
 * is exposed as the `cache` property on the memoized function.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoizing function.
 * @example
 *
 * var fibonacci = _.memoize(function(n) {
 *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
 * });
 *
 * fibonacci(9)
 * // => 34
 *
 * // modifying the result cache
 * var upperCase = _.memoize(function(string) {
 *   return string.toUpperCase();
 * });
 *
 * upperCase('fred');
 * // => 'FRED'
 *
 * upperCase.cache.fred = 'BARNEY'
 * upperCase('fred');
 * // => 'BARNEY'
 */
function memoize(func, resolver) {
  if (!isFunction(func) || (resolver && !isFunction(resolver))) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var key = resolver ? resolver.apply(this, arguments) : arguments[0];
    if (key == '__proto__') {
      return func.apply(this, arguments);
    }
    var cache = memoized.cache;
    return hasOwnProperty.call(cache, key)
      ? cache[key]
      : (cache[key] = func.apply(this, arguments));
  };
  memoized.cache = {};
  return memoized;
}

module.exports = memoize;

},{"../lang/isFunction":231}],137:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (!isFunction(predicate)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    return !predicate.apply(this, arguments);
  };
}

module.exports = negate;

},{"../lang/isFunction":231}],138:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var before = require('./before'),
    partial = require('./partial');

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first call. The `func` is invoked
 * with the `this` binding of the created function.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // `initialize` invokes `createApplication` once
 */
var once = partial(before, 2);

module.exports = once;

},{"./before":124,"./partial":139}],139:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var basePartial = require('../internal/basePartial'),
    replaceHolders = require('../internal/replaceHolders'),
    slice = require('../array/slice');

/** Used to compose bitmasks for wrapper metadata */
var PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with `partial` arguments prepended
 * to those provided to the new function. This method is similar to `_.bind`
 * except it does **not** alter the `this` binding.
 *
 * **Note:** This method does not set the `length` property of partially
 * applied functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * var greet = function(greeting, name) { return greeting + ' ' + name; };
 * var sayHelloTo = _.partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 */
function partial(func) {
  var args = slice(arguments, 1),
      holders = replaceHolders(args, partial.placeholder);

  return basePartial(func, PARTIAL_FLAG, args, holders);
}

// assign default placeholders
partial.placeholder = {};

module.exports = partial;

},{"../array/slice":71,"../internal/basePartial":173,"../internal/replaceHolders":212}],140:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var basePartial = require('../internal/basePartial'),
    replaceHolders = require('../internal/replaceHolders'),
    slice = require('../array/slice');

/** Used to compose bitmasks for wrapper metadata */
var PARTIAL_RIGHT_FLAG = 64;

/**
 * This method is like `_.partial` except that partially applied arguments
 * are appended to those provided to the new function.
 *
 * **Note:** This method does not set the `length` property of partially applied
 * functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * var greet = function(greeting, name) { return greeting + ' ' + name; };
 * var greetFred = _.partialRight(greet, 'fred');
 * greetFred('hello');
 * // => 'hello fred'
 *
 * // create a deep `_.defaults`
 * var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
 *   return _.merge(value, other, deep);
 * });
 *
 * var object = { 'a': { 'b': { 'c': 1 } } },
 *     source = { 'a': { 'b': { 'c': 2, 'd': 2 } } };
 *
 * defaultsDeep(object, source);
 * // => { 'a': { 'b': { 'c': 1, 'd': 2 } } }
 */
function partialRight(func) {
  var args = slice(arguments, 1),
      holders = replaceHolders(args, partialRight.placeholder);

  return basePartial(func, PARTIAL_RIGHT_FLAG, args, holders);
}

// assign default placeholders
partialRight.placeholder = {};

module.exports = partialRight;

},{"../array/slice":71,"../internal/basePartial":173,"../internal/replaceHolders":212}],141:[function(require,module,exports){
'use strict';

/**
 * Creates a function that only accepts four arguments and ignores the rest.
 *
 * @method
 * @memberOf ash
 * @category Functions
 * @param {Function} func The target function.
 * @returns {Function} Returns The new function.
 */
function quaternary(func)
{
	return function quaternary(a, b, c, d)
	{
		if (a === null)
		{
			return quaternary;
		}	else if (b === null)
		{
			return ternary(function (b, c, d)
			{
				return func(a, b, c, d);
			});
		}	else if (c === null)
		{
			return binary(function (c, d)
			{
				return func(a, b, c, d);
			});
		}	else if (d === null)
		{
			return unary(function (d)
			{
				return func(a, b, c, d);
			});
		}	else
		{
			return func(a, b, c, d);
		}
	};
}

module.exports = quaternary;
},{}],142:[function(require,module,exports){
'use strict';

/**
 * Creates a function that only accepts three arguments and ignores the rest.
 *
 * @method
 * @memberOf ash
 * @category Functions
 * @param {Function} func The target function.
 * @returns {Function} Returns The new function.
 */
function ternary (func)
{
	return function ternary (a, b, c)
	{
		if (a === null)
		{
			return ternary;
		}	else if (b === null)
		{
			return binary(function (b, c)
			{
				return func(a, b, c);
			});
		}	else if (c === null)
		{
			return unary(function (c)
			{
				return func(a, b, c);
			});
		}	else
		{
			return func(a, b, c);
		}
	};
}

module.exports = ternary;
},{}],143:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var debounce = require('./debounce'),
    isFunction = require('../lang/isFunction'),
    isObject = require('../lang/isObject');

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as an internal `_.debounce` options object by `_.throttle` */
var debounceOptions = {
  'leading': false,
  'maxWait': 0,
  'trailing': false
};

/**
 * Creates a function that only invokes `func` at most once per every `wait`
 * milliseconds. The created function comes with a `cancel` method to cancel
 * delayed invokes. Provide an options object to indicate that `func` should
 * be invoked on the leading and/or trailing edge of the `wait` timeout.
 * Subsequent calls to the throttled function return the result of the last
 * `func` call.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the throttled function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} wait The number of milliseconds to throttle invocations to.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=true] Specify invoking on the leading
 *  edge of the timeout.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // avoid excessively updating the position while scrolling
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
 * var throttled =  _.throttle(renewToken, 300000, { 'trailing': false })
 * jQuery('.interactive').on('click', throttled);
 *
 * // cancel a trailing throttled call
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (options === false) {
    leading = false;
  } else if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  debounceOptions.leading = leading;
  debounceOptions.maxWait = +wait;
  debounceOptions.trailing = trailing;
  return debounce(func, wait, debounceOptions);
}

module.exports = throttle;

},{"../lang/isFunction":231,"../lang/isObject":238,"./debounce":131}],144:[function(require,module,exports){
'use strict';

/**
 * Creates a function that only accepts one argument and ignores the rest.
 *
 * @method
 * @memberOf ash
 * @category Functions
 * @param {Function} func The target function.
 * @returns {Function} Returns The new function.
 */
function unary(func)
{
	return function unary(a)
	{
		if (a === null)
		{
			return unary;
		}	else
		{
			return func(a);
		}
	};
}

module.exports = unary;
},{}],145:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var basePartial = require('../internal/basePartial');

/** Used to compose bitmasks for wrapper metadata */
var PARTIAL_FLAG = 32;

/**
 * Creates a function that provides `value` to the wrapper function as its
 * first argument. Any additional arguments provided to the function are
 * appended to those provided to the wrapper function. The wrapper is invoked
 * with the `this` binding of the created function.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {*} value The value to wrap.
 * @param {Function} wrapper The wrapper function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var p = _.wrap(_.escape, function(func, text) {
 *   return '<p>' + func(text) + '</p>';
 * });
 *
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 */
function wrap(value, wrapper) {
  return basePartial(wrapper, PARTIAL_FLAG, [value], []);
}

module.exports = wrap;

},{"../internal/basePartial":173}],146:[function(require,module,exports){
/**
 * @license
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var array = require('./array'),
    chain = require('./chain'),
    collection = require('./collection'),
    func = require('./function'),
    lang = require('./lang'),
    object = require('./object'),
    string = require('./string'),
    number = require('./number'),
    utility = require('./utility'),
    arrayEach = require('./internal/arrayEach'),
    baseAssign = require('./internal/baseAssign'),
    baseForOwn = require('./internal/baseForOwn'),
    baseFunctions = require('./internal/baseFunctions'),
    isObject = require('./lang/isObject'),
    keys = require('./object/keys'),
    lodash = require('./chain/lodash'),
    lodashWrapper = require('./internal/lodashWrapper'),
    mixin = require('./utility/mixin'),
    support = require('./support');

/** Used as the semantic version number */
var VERSION = '3.0.0-pre';

/** Used for native method references */
var arrayProto = Array.prototype;

// wrap `_.mixin` so it works when provided only one argument
mixin = (function(func) {
  return function(object, source, options) {
    var isObj = isObject(source),
        noOpts = options == null,
        props = noOpts && isObj && keys(source),
        methodNames = props && baseFunctions(source, props);

    if ((props && props.length && !methodNames.length) || (noOpts && !isObj)) {
      if (noOpts) {
        options = source;
      }
      source = object;
      object = this;
    }
    return func(object, source, options);
  };
}(mixin));

// add functions that return wrapped values when chaining
lodash.after = func.after;
lodash.assign = object.assign;
lodash.at = collection.at;
lodash.before = func.before;
lodash.bind = func.bind;
lodash.bindAll = func.bindAll;
lodash.bindKey = func.bindKey;
lodash.callback = utility.callback;
lodash.chain = chain.chain;
lodash.chunk = array.chunk;
lodash.compact = array.compact;
lodash.constant = utility.constant;
lodash.countBy = collection.countBy;
lodash.create = object.create;
lodash.curry = func.curry;
lodash.curryRight = func.curryRight;
lodash.debounce = func.debounce;
lodash.defaults = object.defaults;
lodash.defer = func.defer;
lodash.delay = func.delay;
lodash.difference = array.difference;
lodash.drop = array.drop;
lodash.dropRight = array.dropRight;
lodash.dropRightWhile = array.dropRightWhile;
lodash.dropWhile = array.dropWhile;
lodash.filter = collection.filter;
lodash.flatten = array.flatten;
lodash.flattenDeep = array.flattenDeep;
lodash.flow = func.flow;
lodash.flowRight = func.flowRight;
lodash.forEach = collection.forEach;
lodash.forEachRight = collection.forEachRight;
lodash.forIn = object.forIn;
lodash.forInRight = object.forInRight;
lodash.forOwn = object.forOwn;
lodash.forOwnRight = object.forOwnRight;
lodash.functions = object.functions;
lodash.groupBy = collection.groupBy;
lodash.indexBy = collection.indexBy;
lodash.initial = array.initial;
lodash.intersection = array.intersection;
lodash.invert = object.invert;
lodash.invoke = collection.invoke;
lodash.keys = keys;
lodash.keysIn = object.keysIn;
lodash.map = collection.map;
lodash.mapValues = object.mapValues;
lodash.matches = utility.matches;
lodash.memoize = func.memoize;
lodash.merge = object.merge;
lodash.mixin = mixin;
lodash.negate = func.negate;
lodash.omit = object.omit;
lodash.once = func.once;
lodash.pairs = object.pairs;
lodash.partial = func.partial;
lodash.partialRight = func.partialRight;
lodash.partition = collection.partition;
lodash.pick = object.pick;
lodash.pluck = collection.pluck;
lodash.property = utility.property;
lodash.pull = array.pull;
lodash.pullAt = array.pullAt;
lodash.range = utility.range;
lodash.reject = collection.reject;
lodash.remove = array.remove;
lodash.rest = array.rest;
lodash.shuffle = collection.shuffle;
lodash.slice = array.slice;
lodash.sortBy = collection.sortBy;
lodash.take = array.take;
lodash.takeRight = array.takeRight;
lodash.takeRightWhile = array.takeRightWhile;
lodash.takeWhile = array.takeWhile;
lodash.tap = chain.tap;
lodash.throttle = func.throttle;
lodash.times = utility.times;
lodash.toArray = collection.toArray;
lodash.transform = object.transform;
lodash.union = array.union;
lodash.uniq = array.uniq;
lodash.unzip = array.unzip;
lodash.values = object.values;
lodash.valuesIn = object.valuesIn;
lodash.where = collection.where;
lodash.without = array.without;
lodash.wrap = func.wrap;
lodash.xor = array.xor;
lodash.zip = array.zip;
lodash.zipObject = array.zipObject;
lodash.unary = func.unary;
lodash.binary = func.binary;
lodash.ternary = func.ternary;
lodash.quaternary = func.quaternary;
lodash.roundToMultiple = number.roundToMultiple;
lodash.sameDecimals = number.sameDecimals;
lodash.limit = number.limit;
lodash.clear = collection.clear;

// add functions to `lodash.prototype`
mixin(lodash, baseAssign({}, lodash));

// add functions that return unwrapped values when chaining
lodash.attempt = utility.attempt;
lodash.camelCase = string.camelCase;
lodash.capitalize = string.capitalize;
lodash.clone = lang.clone;
lodash.cloneDeep = lang.cloneDeep;
lodash.contains = collection.contains;
lodash.endsWith = string.endsWith;
lodash.escape = string.escape;
lodash.escapeRegExp = string.escapeRegExp;
lodash.every = collection.every;
lodash.find = collection.find;
lodash.findIndex = array.findIndex;
lodash.findKey = object.findKey;
lodash.findLast = collection.findLast;
lodash.findLastIndex = array.findLastIndex;
lodash.findLastKey = object.findLastKey;
lodash.findWhere = collection.findWhere;
lodash.first = array.first;
lodash.has = object.has;
lodash.identity = utility.identity;
lodash.indexOf = array.indexOf;
lodash.isArguments = lang.isArguments;
lodash.isArray = lang.isArray;
lodash.isBoolean = lang.isBoolean;
lodash.isDate = lang.isDate;
lodash.isElement = lang.isElement;
lodash.isEmpty = lang.isEmpty;
lodash.isEqual = lang.isEqual;
lodash.isError = lang.isError;
lodash.isFinite = lang.isFinite;
lodash.isFiniteLike = lang.isFiniteLike;
lodash.isFunction = lang.isFunction;
lodash.isNaN = lang.isNaN;
lodash.isNative = lang.isNative;
lodash.isNode = lang.isNode;
lodash.isNull = lang.isNull;
lodash.isNumber = lang.isNumber;
lodash.isNumberLike = lang.isNumberLike;
lodash.isObject = isObject;
lodash.isPlainObject = lang.isPlainObject;
lodash.isRegExp = lang.isRegExp;
lodash.isString = lang.isString;
lodash.isUndefined = lang.isUndefined;
lodash.kebabCase = string.kebabCase;
lodash.last = array.last;
lodash.lastIndexOf = array.lastIndexOf;
lodash.max = collection.max;
lodash.min = collection.min;
lodash.noConflict = utility.noConflict;
lodash.noop = utility.noop;
lodash.now = utility.now;
lodash.pad = string.pad;
lodash.padLeft = string.padLeft;
lodash.padRight = string.padRight;
lodash.parseInt = utility.parseInt;
lodash.random = utility.random;
lodash.reduce = collection.reduce;
lodash.reduceRight = collection.reduceRight;
lodash.repeat = string.repeat;
lodash.result = utility.result;
lodash.size = collection.size;
lodash.snakeCase = string.snakeCase;
lodash.some = collection.some;
lodash.sortedIndex = array.sortedIndex;
lodash.sortedLastIndex = array.sortedLastIndex;
lodash.startsWith = string.startsWith;
lodash.template = string.template;
lodash.trim = string.trim;
lodash.trimLeft = string.trimLeft;
lodash.trimRight = string.trimRight;
lodash.trunc = string.trunc;
lodash.unescape = string.unescape;
lodash.uniqueId = utility.uniqueId;
lodash.uuid = utility.uuid;
lodash.isMatching = array.isMatching;

mixin(lodash, (function() {
  var source = {};
  baseForOwn(lodash, function(func, methodName) {
    if (!lodash.prototype[methodName]) {
      source[methodName] = func;
    }
  });
  return source;
}()), false);

// add functions capable of returning wrapped and unwrapped values when chaining
lodash.sample = collection.sample;

baseForOwn(lodash, function(func, methodName) {
  var callbackable = methodName != 'sample';
  if (!lodash.prototype[methodName]) {
    lodash.prototype[methodName] = function(n, guard) {
      var chainAll = this.__chain__,
          result = func(this.__wrapped__, n, guard);

      return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
        ? result
        : new lodashWrapper(result, chainAll);
    };
  }
});

/**
 * The semantic version number.
 *
 * @static
 * @memberOf _
 * @type string
 */
lodash.VERSION = VERSION;

lodash.support = support;
(lodash.templateSettings = string.templateSettings).imports._ = lodash;

// assign default placeholders
arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
  lodash[methodName].placeholder = lodash;
});

// add "Chaining" functions to the wrapper
lodash.prototype.chain = chain.wrapperChain;
lodash.prototype.toString = chain.wrapperToString;
lodash.prototype.toJSON = lodash.prototype.value = lodash.prototype.valueOf = chain.wrapperValueOf;

// add `Array` functions that return unwrapped values
arrayEach(['join', 'pop', 'shift'], function(methodName) {
  var func = arrayProto[methodName];
  lodash.prototype[methodName] = function() {
    var chainAll = this.__chain__,
        result = func.apply(this.__wrapped__, arguments);

    return chainAll
      ? new lodashWrapper(result, chainAll)
      : result;
  };
});

// add `Array` functions that return the existing wrapped value
arrayEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
  var func = arrayProto[methodName];
  lodash.prototype[methodName] = function() {
    func.apply(this.__wrapped__, arguments);
    return this;
  };
});

// add `Array` functions that return new wrapped values
arrayEach(['concat', 'splice'], function(methodName) {
  var func = arrayProto[methodName];
  lodash.prototype[methodName] = function() {
    return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
  };
});

module.exports = lodash;

},{"./array":48,"./chain":85,"./chain/lodash":87,"./collection":92,"./function":122,"./internal/arrayEach":147,"./internal/baseAssign":151,"./internal/baseForOwn":166,"./internal/baseFunctions":169,"./internal/lodashWrapper":205,"./lang":218,"./lang/isObject":238,"./number":243,"./object":247,"./object/keys":260,"./string":270,"./support":290,"./utility":291,"./utility/mixin":297}],147:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A specialized version of `_.forEach` for arrays without support for
 * callback shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],148:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A specialized version of `_.every` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns `true` if all elements passed the predicate check,
 *  else `false`
 */
function arrayEvery(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

module.exports = arrayEvery;

},{}],149:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],150:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],151:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];
  }
  return object;
}

module.exports = baseAssign;

},{"../object/keys":260}],152:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `_.at` without support for strings and individual
 * key arguments.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {number[]|string[]} [props] The property names or indexes of elements to pick.
 * @returns {Array} Returns the new array of picked elements.
 */
function baseAt(collection, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while(++index < length) {
    result[index] = collection[props[index]];
  }
  return result;
}

module.exports = baseAt;

},{}],153:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSetData = require('./baseSetData'),
    getData = require('./getData'),
    identity = require('../utility/identity'),
    isNative = require('../lang/isNative'),
    matches = require('../utility/matches'),
    property = require('../utility/property'),
    support = require('../support');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1;

/** Used to detect named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.callback` without support for creating
 * "_.pluck" and "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns the new function.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;

  if (type == 'function') {
    if (typeof thisArg == 'undefined') {
      return func;
    }
    var data = getData(func);
    if (typeof data == 'undefined') {
      if (support.funcNames) {
        data = !func.name;
      }
      data = data || !support.funcDecomp;
      if (!data) {
        var source = fnToString.call(func);
        if (!support.funcNames) {
          data = !reFuncName.test(source);
        }
        if (!data) {
          // checks if `func` references the `this` keyword and stores the result
          data = reThis.test(source) || isNative(func);
          baseSetData(func, data);
        }
      }
    }
    // exit early if there are no `this` references or `func` is bound
    if (data === false || (data !== true && data[1] & BIND_FLAG)) {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
      case 5: return function(value, other, key, object, source) {
        return func.call(thisArg, value, other, key, object, source);
      };
    }
    return function() {
      return func.apply(thisArg, arguments);
    };
  }
  if (func == null) {
    return identity;
  }
  // handle "_.pluck" and "_.where" style callback shorthands
  return type == 'object' ? matches(func) : property(func);
}

module.exports = baseCallback;

},{"../lang/isNative":233,"../support":290,"../utility/identity":295,"../utility/matches":296,"../utility/property":302,"./baseSetData":176,"./getData":199}],154:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEach = require('./arrayEach'),
    baseForOwn = require('./baseForOwn'),
    initArrayClone = require('./initArrayClone'),
    initObjectClone = require('./initObjectClone'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject');

/** `Object#toString` result references */
var objectClass = '[object Object]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep=false] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, stackA, stackB) {
  var result = customizer ? customizer(value) : undefined;
  if (typeof result != 'undefined') {
    return result;
  }
  var isArr = isArray(value);
  result = value;
  if (isArr) {
    result = initArrayClone(value, isDeep);
  } else if (isObject(value)) {
    result = initObjectClone(value, isDeep);
    value = (isDeep && toString.call(result) == objectClass) ? value : result;
  }
  if (!isDeep || result === value) {
    return result;
  }
  // check for circular references and return corresponding clone
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // add the source value to the stack of traversed objects
  // and associate it with its clone
  stackA.push(value);
  stackB.push(result);

  // recursively populate clone (susceptible to call stack limits)
  (isArr ? arrayEach : baseForOwn)(value, function(valValue, key) {
    var valClone = customizer ? customizer(valValue, key) : undefined;
    result[key] = typeof valClone == 'undefined'
      ? baseClone(valValue, isDeep, null, stackA, stackB)
      : valClone;
  });

  return result;
}

module.exports = baseClone;

},{"../lang/isArray":222,"../lang/isObject":238,"./arrayEach":147,"./baseForOwn":166,"./initArrayClone":200,"./initObjectClone":201}],155:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `compareAscending` which compares values and
 * sorts them in ascending order without guaranteeing a stable sort.
 *
 * @private
 * @param {*} value The value to compare to `other`.
 * @param {*} other The value to compare to `value`.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function baseCompareAscending(value, other) {
  if (value !== other) {
    if (value > other || typeof value == 'undefined') {
      return 1;
    }
    if (value < other || typeof other == 'undefined') {
      return -1;
    }
  }
  return 0;
}

module.exports = baseCompareAscending;

},{}],156:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject');

/* Native method references for those with the same name as other `lodash` methods */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for environments without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }());
}

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":233,"../lang/isObject":238}],157:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('./createWrapper');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * The base implementation of `_.curry` and `_.curryRight` which handles
 * resolving the default arity of `func`.
 *
 * @private
 * @param {Function} func The function to curry.
 * @param {number} bitmask The bitmask of flags to compose.
 * @param {number} [arity=func.length] The arity of `func`.
 * @returns {Function} Returns the new curried function.
 */
function baseCurry(func, bitmask, arity) {
  if (typeof arity != 'number') {
    arity = arity == null ? (func ? func.length : 0) : nativeMax(+arity || 0, 0);
  }
  return createWrapper(func, bitmask, arity);
}

module.exports = baseCurry;

},{"./createWrapper":197}],158:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} [values] The array of values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  var index = -1,
      indexOf = baseIndexOf,
      prereq = indexOf == baseIndexOf,
      isLarge = prereq && createCache && values && values.length >= 200,
      isCommon = prereq && !isLarge,
      result = [],
      valuesLength = values ? values.length : 0;

  if (isLarge) {
    indexOf = cacheIndexOf;
    values = createCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":170,"./cacheIndexOf":182,"./createCache":191}],159:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseForOwn = require('./baseForOwn'),
    toIterable = require('./toIterable');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!(typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toIterable(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":166,"./toIterable":214}],160:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseForOwnRight = require('./baseForOwnRight'),
    toIterable = require('./toIterable');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.forEachRight` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEachRight(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!(typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER)) {
    return baseForOwnRight(collection, iteratee);
  }
  var iterable = toIterable(collection);
  while (length--) {
    if (iteratee(iterable[length], length, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEachRight;

},{"./baseForOwnRight":167,"./toIterable":214}],161:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];

  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":159}],162:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey=false] Specify returning the key of the found
 *  element instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;

  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],163:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep=false] Specify a deep flatten.
 * @param {boolean} [isStrict=false] Restrict flattening to arrays and `arguments` objects.
 * @param {number} [fromIndex=0] The index to start from.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, fromIndex) {
  var index = (fromIndex || 0) - 1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value && typeof value == 'object' && typeof value.length == 'number'
        && (isArray(value) || isArguments(value))) {
      // recursively flatten arrays (susceptible to call stack limits)
      if (isDeep) {
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":221,"../lang/isArray":222}],164:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(object[key], key, object) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{}],165:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":261,"./baseFor":164}],166:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":260,"./baseFor":164}],167:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseForRight = require('./baseForRight'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwnRight` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return baseForRight(object, iteratee, keys);
}

module.exports = baseForOwnRight;

},{"../object/keys":260,"./baseForRight":168}],168:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This function is like `baseFor` except that it iterates over properties
 * in the opposite order.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseForRight(object, iteratee, keysFunc) {
  var props = keysFunc(object),
      length = props.length;

  while (length--) {
    var key = props[length];
    if (iteratee(object[key], key, object) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseForRight;

},{}],169:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/**
 * The base implementation of `_.functions` which creates an array of
 * `object` function property names filtered from those provided.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The property names to filter.
 * @returns {Array} Returns the new array of filtered property names.
 */
function baseFunctions(object, props) {
  var index = -1,
      length = props.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var key = props[index];
    if (isFunction(object[key])) {
      result[++resIndex] = key;
    }
  }
  return result;
}

module.exports = baseFunctions;

},{"../lang/isFunction":231}],170:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  var index = (fromIndex || 0) - 1,
      length = array ? array.length : 0,
      isReflexive = value === value;

  while (++index < length) {
    var other = array[index];
    if ((isReflexive ? other === value : other !== other)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{}],171:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction'),
    keys = require('../object/keys');

/** `Object#toString` result references */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    mapClass = '[object Map]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    setClass = '[object Set]',
    stringClass = '[object String]',
    weakMapClass = '[object WeakMap]';

var arrayBufferClass = '[object ArrayBuffer]',
    float32Class = '[object Float32Array]',
    float64Class = '[object Float64Array]',
    int8Class = '[object Int8Array]',
    int16Class = '[object Int16Array]',
    int32Class = '[object Int32Array]',
    uint8Class = '[object Uint8Array]',
    uint8ClampedClass = '[object Uint8ClampedArray]',
    uint16Class = '[object Uint16Array]',
    uint32Class = '[object Uint32Array]';

/** Used to identify object classifications that are treated like arrays */
var arrayLikeClasses = {};
arrayLikeClasses[argsClass] =
arrayLikeClasses[arrayClass] = arrayLikeClasses[float32Class] =
arrayLikeClasses[float64Class] = arrayLikeClasses[int8Class] =
arrayLikeClasses[int16Class] = arrayLikeClasses[int32Class] =
arrayLikeClasses[uint8Class] = arrayLikeClasses[uint8ClampedClass] =
arrayLikeClasses[uint16Class] = arrayLikeClasses[uint32Class] = true;
arrayLikeClasses[arrayBufferClass] = arrayLikeClasses[boolClass] =
arrayLikeClasses[dateClass] = arrayLikeClasses[errorClass] =
arrayLikeClasses[funcClass] = arrayLikeClasses[mapClass] =
arrayLikeClasses[numberClass] = arrayLikeClasses[objectClass] =
arrayLikeClasses[regexpClass] = arrayLikeClasses[setClass] =
arrayLikeClasses[stringClass] = arrayLikeClasses[weakMapClass] = false;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * The base implementation of `_.isEqual`, without support for `thisArg`
 * binding, which allows partial "_.where" style comparisons.
 *
 * @private
 * @param {*} value The value to compare to `other`.
 * @param {*} other The value to compare to `value`.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere=false] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  var result = customizer && !stackA ? customizer(value, other) : undefined;
  if (typeof result != 'undefined') {
    return !!result;
  }
  // exit early for identical values
  if (value === other) {
    // treat `+0` vs. `-0` as not equal
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // exit early for unlike primitive values
  if (!(valType == 'number' && othType == 'number') && (value == null || other == null ||
      (valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object'))) {
    return false;
  }
  var valClass = toString.call(value),
      valIsArg = valClass == argsClass,
      othClass = toString.call(other),
      othIsArg = othClass == argsClass;

  if (valIsArg) {
    valClass = objectClass;
  }
  if (othIsArg) {
    othClass = objectClass;
  }
  var valIsArr = arrayLikeClasses[valClass],
      valIsErr = valClass == errorClass,
      valIsObj = valClass == objectClass,
      othIsObj = othClass == objectClass;

  var isSameClass = valClass == othClass;
  if (isSameClass && valIsArr) {
    var valLength = value.length,
        othLength = other.length;

    if (valLength != othLength && !(isWhere && othLength > valLength)) {
      return false;
    }
  }
  else {
    // unwrap any `lodash` wrapped values
    var valWrapped = valIsObj && hasOwnProperty.call(value, '__wrapped__'),
        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (valWrapped || othWrapped) {
      return baseIsEqual(valWrapped ? value.__wrapped__ : value, othWrapped ? other.__wrapped__ : other, customizer, isWhere, stackA, stackB);
    }
    if (!isSameClass) {
      return false;
    }
    if (valIsErr || valIsObj) {
      // in older versions of Opera, `arguments` objects have `Array` constructors
      var valCtor = valIsArg ? Object : value.constructor,
          othCtor = othIsArg ? Object : other.constructor;

      if (valIsErr) {
        // error objects of different types are not equal
        if (valCtor.prototype.name != othCtor.prototype.name) {
          return false;
        }
      }
      else {
        var valHasCtor = !valIsArg && hasOwnProperty.call(value, 'constructor'),
            othHasCtor = !othIsArg && hasOwnProperty.call(other, 'constructor');

        if (valHasCtor != othHasCtor) {
          return false;
        }
        if (!valHasCtor) {
          // non `Object` object instances with different constructors are not equal
          if (valCtor != othCtor &&
                !(isFunction(valCtor) && valCtor instanceof valCtor && isFunction(othCtor) && othCtor instanceof othCtor) &&
                ('constructor' in value && 'constructor' in other)
              ) {
            return false;
          }
        }
      }
      var valProps = valIsErr ? ['message', 'name'] : keys(value),
          othProps = valIsErr ? valProps : keys(other);

      if (valIsArg) {
        valProps.push('length');
      }
      if (othIsArg) {
        othProps.push('length');
      }
      valLength = valProps.length;
      othLength = othProps.length;
      if (valLength != othLength && !isWhere) {
        return false;
      }
    }
    else {
      switch (valClass) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +value == +other;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (value != +value)
            ? other != +other
            // but treat `-0` vs. `+0` as not equal
            : (value == 0 ? ((1 / value) == (1 / other)) : value == +other);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4) and
          // treat strings primitives and string objects as equal
          return value == String(other);
      }
      return false;
    }
  }
  // assume cyclic structures are equal
  // the algorithm for detecting cyclic structures is adapted from ES 5.1
  // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
  stackA || (stackA = []);
  stackB || (stackB = []);

  var index = stackA.length;
  while (index--) {
    if (stackA[index] == value) {
      return stackB[index] == other;
    }
  }
  // add `value` and `other` to the stack of traversed objects
  stackA.push(value);
  stackB.push(other);

  // recursively compare objects and arrays (susceptible to call stack limits)
  result = true;
  if (valIsArr) {
    // deep compare the contents, ignoring non-numeric properties
    while (result && ++index < valLength) {
      var valValue = value[index];
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          result = baseIsEqual(valValue, other[othIndex], customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        var othValue = other[index];
        result = customizer ? customizer(valValue, othValue, index) : undefined;
        if (typeof result == 'undefined') {
          result = baseIsEqual(valValue, othValue, customizer, isWhere, stackA, stackB);
        }
      }
    }
  }
  else {
    while (result && ++index < valLength) {
      var key = valProps[index];
      result = valIsErr || hasOwnProperty.call(other, key);

      if (result) {
        valValue = value[key];
        othValue = other[key];
        result = customizer ? customizer(valValue, othValue, key) : undefined;
        if (typeof result == 'undefined') {
          result = baseIsEqual(valValue, othValue, customizer, isWhere, stackA, stackB);
        }
      }
    }
  }
  stackA.pop();
  stackB.pop();

  return !!result;
}

module.exports = baseIsEqual;

},{"../lang/isFunction":231,"../object/keys":260}],172:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var result = [];

  baseEach(collection, function(value, key, collection) {
    result.push(iteratee(value, key, collection));
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":159}],173:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('./createWrapper'),
    getData = require('./getData');

/** Used to compose bitmasks for wrapper metadata */
var PARTIAL_FLAG = 32;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * The base implementation of `_.partial` and `_.partialRight` which accepts
 * an array of arguments to partially apply and handles resolving the arity
 * of `func`.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags to compose.
 * @param {Array} args The array of arguments to be partially applied.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new partially applied function.
 */
function basePartial(func, bitmask, args, holders, thisArg) {
  if (func) {
    var data = getData(func),
        arity = data ? data[2] : func.length;

    arity = nativeMax(arity - args.length, 0);
  }
  return (bitmask & PARTIAL_FLAG)
    ? createWrapper(func, bitmask, arity, thisArg, args, holders)
    : createWrapper(func, bitmask, arity, thisArg, null, null, args, holders);
}

module.exports = basePartial;

},{"./createWrapper":197,"./getData":199}],174:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Native method references */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods */
var nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for argument juggling
 * and returning floating-point numbers.
 *
 * @private
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number} Returns the random number.
 */
function baseRandom(min, max) {
  return min + floor(nativeRandom() * (max - min + 1));
}

module.exports = baseRandom;

},{}],175:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `_.reduce` and `_.reduceRight` without support
 * for callback shorthands or `this` binding, which iterates over `collection`
 * usingthe provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initFromCollection Specify using the first or last element
 *  of `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initFromCollection
      ? (initFromCollection = false, value)
      : iteratee(accumulator, value, index, collection)
  });
  return accumulator;
}

module.exports = baseReduce;

},{}],176:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":295,"./metaMap":206}],177:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `_.slice` without support for `start` and `end`
 * arguments.
 *
 * @private
 * @param {Array} array The array to slice.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = array[index];
  }
  return result;
}

module.exports = baseSlice;

},{}],178:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/**
 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {boolean} [retHighest=false] Specify returning the highest, instead
 *  of the lowest, index at which a value should be inserted into `array`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array, value, iteratee, retHighest) {
  var low = 0,
      high = array ? array.length : low;

  value = iteratee(value);
  var hintNum = typeof value == 'number' ||
    (value != null && isFunction(value.valueOf) && typeof value.valueOf() == 'number');

  while (low < high) {
    var mid = (low + high) >>> 1,
        computed = iteratee(array[mid]),
        setLow = retHighest ? (computed <= value) : (computed < value);

    if (hintNum && typeof computed != 'undefined') {
      computed = +computed;
      setLow = computed != computed || setLow;
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return high;
}

module.exports = baseSortedIndex;

},{"../lang/isFunction":231}],179:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      prereq = indexOf == baseIndexOf,
      isLarge = prereq && createCache && length >= 200,
      isCommon = prereq && !isLarge,
      result = [];

  if (isLarge) {
    var seen = createCache();
    indexOf = cacheIndexOf;
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":170,"./cacheIndexOf":182,"./createCache":191}],180:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, keysFunc) {
  var index = -1,
      props = keysFunc(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],181:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var identity = require('../utility/identity'),
    isNative = require('../lang/isNative');

/** Native method references */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each Float64Array element */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`
  bufferClone = !(ArrayBuffer && Uint8Array) ? identity : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":233,"../utility/identity":295}],182:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * An implementation of `_.contains` for cache objects that mimics the return
 * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache object to inspect.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  return cache.has(value) ? 0 : -1;
}

module.exports = cacheIndexOf;

},{}],183:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used by `_.max` and `_.min` as the default callback when a given collection
 * is a string value.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the code unit of the first character of the string.
 */
function charAtCallback(string) {
  return string.charCodeAt(0);
}

module.exports = charAtCallback;

},{}],184:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used by `_.trim` and `_.trimLeft` to get the index of the first character
 * of `string` that is not found in `chars`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @param {string} chars The characters to find.
 * @returns {number} Returns the index of the first character not found in `chars`.
 */
function charsLeftIndex(string, chars) {
  var index = -1,
      length = string.length;

  while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
  return index;
}

module.exports = charsLeftIndex;

},{}],185:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used by `_.trim` and `_.trimRight` to get the index of the last character
 * of `string` that is not found in `chars`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @param {string} chars The characters to find.
 * @returns {number} Returns the index of the last character not found in `chars`.
 */
function charsRightIndex(string, chars) {
  var index = string.length;

  while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
  return index;
}

module.exports = charsRightIndex;

},{}],186:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} partialArgs An array of arguments to prepend to those provided.
 * @param {Array} partialHolders An array of `partialArgs` placeholder indexes.
 * @param {Array|Object} args The provided arguments.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(partialArgs, partialHolders, args) {
  var holdersLength = partialHolders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partialArgs.length,
      result = Array(argsLength + leftLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partialArgs[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[partialHolders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;

},{}],187:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} partialRightArgs An array of arguments to append to those provided.
 * @param {Array} partialHolders An array of `partialRightArgs` placeholder indexes.
 * @param {Array|Object} args The provided arguments.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(partialRightArgs, partialRightHolders, args) {
  var holdersIndex = -1,
      holdersLength = partialRightHolders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partialRightArgs.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var pad = argsIndex;
  while (++rightIndex < rightLength) {
    result[pad + rightIndex] = partialRightArgs[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[pad + partialRightHolders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgsRight;

},{}],188:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('./baseCallback'),
    baseEach = require('./baseEach'),
    isArray = require('../lang/isArray');

/**
 * Creates a function that aggregates a collection, creating an accumulator
 * object composed from the results of running each element in the collection
 * through `iteratee`. The given setter function sets the keys and values of
 * the accumulator object. If `initializer` is provided it is used to initialize
 * the accumulator object.
 *
 * @private
 * @param {Function} setter The function to set keys and values of the accumulator object.
 * @param {Function} [initializer] The function to initialize the accumulator object.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee, thisArg) {
    var result = initializer ? initializer() : {};
    iteratee = baseCallback(iteratee, thisArg, 3);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        setter(result, value, iteratee(value, index, collection), collection);
      }
    } else {
      baseEach(collection, function(value, key, collection) {
        setter(result, value, iteratee(value, key, collection), collection);
      });
    }
    return result;
  };
}

module.exports = createAggregator;

},{"../lang/isArray":222,"./baseCallback":153,"./baseEach":159}],189:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('./baseCallback');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to handle assigning values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var length = arguments.length,
        object = arguments[0];

    if (object == null || length < 2) {
      return object;
    }
    // enables use as a callback for functions like `_.reduce`
    var type = typeof arguments[2];
    if ((type == 'number' || type == 'string') && arguments[3] && arguments[3][arguments[2]] === arguments[1]) {
      length = 2;
    }
    // juggle arguments
    if (length > 3 && typeof arguments[length - 2] == 'function') {
      var customizer = baseCallback(arguments[--length - 1], arguments[length--], 5);
    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
      customizer = arguments[--length];
    }
    var index = 0;
    while (++index < length) {
      assigner(object, arguments[index], customizer);
    }
    return object;
  };
}

module.exports = createAssigner;

},{"./baseCallback":153}],190:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCtorWrapper = require('./createCtorWrapper');

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    return (this instanceof wrapper ? Ctor : func).apply(thisArg, arguments);
  }
  return wrapper;
}

module.exports = createBindWrapper;

},{"./createCtorWrapper":193}],191:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../lang/isNative');

/** Native method references */
var Set = isNative(Set = global.Set) && Set;

/**
 * Creates a cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [array=[]] The array to search.
 * @returns {Object} Returns the new cache object.
 */
var createCache = Set && function(array) {
  var cache = new Set,
      length = array ? array.length : 0;

  cache.push = cache.add;
  while (length--) {
    cache.push(array[length]);
  }
  return cache;
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":233}],192:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var deburrLetter = require('./deburrLetter');

/** Used to match latin-1 supplement letters */
var reLatin1 = /[\xC0-\xFF]/g;

/** Used to match words to create compound words */
var reWords = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

/**
 * Creates a function that produces compound words out of the words in a
 * given string.
 *
 * @private
 * @param {Function} callback The function invoked to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    var index = -1,
        words = string != null && String(string).replace(reLatin1, deburrLetter).match(reWords),
        length = words ? words.length : 0,
        result = '';

    while (++index < length) {
      result = callback(result, words[index], index, words);
    }
    return result;
  };
}

module.exports = createCompounder;

},{"./deburrLetter":198}],193:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('./baseCreate'),
    isObject = require('../lang/isObject');

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, arguments);

    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtorWrapper;

},{"../lang/isObject":238,"./baseCreate":156}],194:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createCtorWrapper = require('./createCtorWrapper'),
    replaceHolders = require('./replaceHolders'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_FLAG = 4,
    CURRY_RIGHT_FLAG = 8,
    CURRY_BOUND_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {number} arity The arity of `func`.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partialArgs] An array of arguments to prepend to those provided to the new function.
 * @param {Array} [partialHolders] An array of `partialArgs` placeholder indexes.
 * @param {Array} [partialRightArgs] An array of arguments to append to those provided to the new function.
 * @param {Array} [partialRightHolders] An array of `partialRightArgs` placeholder indexes.
 * @returns {Function} Returns the new function.
 */
function createHybridWrapper(func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders) {
  var isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partialArgs) {
      args = composeArgs(partialArgs, partialHolders, args);
    }
    if (partialRightArgs) {
      args = composeArgsRight(partialRightArgs, partialRightHolders, args);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          holders = replaceHolders(args, placeholder);

      length -= holders.length;
      if (length < arity) {
        var newArity = nativeMax(arity - length, 0),
            newPartialArgs = isCurry ? args : null,
            newPartialHolders = isCurry ? holders : null,
            newPartialRightArgs = isCurry ? null : args,
            newPartialRightHolders = isCurry ? null : holders;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, newArity, thisArg, newPartialArgs, newPartialHolders, newPartialRightArgs, newPartialRightHolders);
        result.placeholder = placeholder;
        return setData(result, [func, bitmask, newArity, thisArg, newPartialArgs, newPartialHolders, newPartialRightArgs, newPartialRightHolders]);
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    return (this instanceof wrapper ? (Ctor || createCtorWrapper(func)) : func).apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybridWrapper;

},{"./composeArgs":186,"./composeArgsRight":187,"./createCtorWrapper":193,"./replaceHolders":212,"./setData":213}],195:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var repeat = require('../string/repeat');

/** Native method references */
var ceil = Math.ceil;

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite;

/**
 * Creates the pad required for `string` based on the given padding length.
 * The `chars` string may be truncated if the number of padding characters
 * exceeds the padding length.
 *
 * @private
 * @param {string} string The string to create padding for.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the pad for `string`.
 */
function createPad(string, length, chars) {
  var strLength = string.length;
  length = +length;

  if (strLength >= length || !nativeIsFinite(length)) {
    return '';
  }
  var padLength = length - strLength;
  chars = chars == null ? ' ' : String(chars);
  return repeat(chars, ceil(padLength / chars.length)).slice(0, padLength);
}

module.exports = createPad;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../string/repeat":280}],196:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCtorWrapper = require('./createCtorWrapper');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` and invokes it with the optional `this`
 * binding of `thisArg` and the `partialArgs` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {Array} partialArgs An array of arguments to prepend to those provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createPartialWrapper(func, bitmask, partialArgs, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    // avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before passing it to `composeArgs`
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partialArgs.length,
        args = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      args[leftIndex] = partialArgs[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return (this instanceof wrapper ? Ctor : func).apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartialWrapper;

},{"./createCtorWrapper":193}],197:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSetData = require('./baseSetData'),
    baseSlice = require('./baseSlice'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createBindWrapper = require('./createBindWrapper'),
    createHybridWrapper = require('./createHybridWrapper'),
    createPartialWrapper = require('./createPartialWrapper'),
    getData = require('./getData'),
    isFunction = require('../lang/isFunction'),
    replaceHolders = require('./replaceHolders'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as the internal argument placeholder */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *   1  - `_.bind`
 *   2  - `_.bindKey`
 *   4  - `_.curry`
 *   8  - `_.curryRight`
 *   16 - `_.curry` or `_.curryRight` of a bound function
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 * @param {number} arity The arity of `func`.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partialArgs] An array of arguments to prepend to those provided to the new function.
 * @param {Array} [partialHolders] An array of `partialArgs` placeholder indexes.
 * @param {Array} [partialRightArgs] An array of arguments to append to those provided to the new function.
 * @param {Array} [partialRightHolders] An array of `partialRightArgs` placeholder indexes.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && !isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var isPartial = bitmask & PARTIAL_FLAG;
  if (isPartial && !partialArgs.length) {
    bitmask &= ~PARTIAL_FLAG;
    isPartial = false;
    partialArgs = partialHolders = null;
  }
  var isPartialRight = bitmask & PARTIAL_RIGHT_FLAG;
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~PARTIAL_RIGHT_FLAG;
    isPartialRight = false;
    partialRightArgs = partialRightHolders = null;
  }
  var data = (data = !isBindKey && getData(func)) && data !== true && data;
  if (data) {
    var funcBitmask = data[1],
        funcIsBind = funcBitmask & BIND_FLAG,
        isBind = bitmask & BIND_FLAG;

    // use metadata `func` and merge bitmasks
    func = data[0];
    bitmask |= funcBitmask;

    // use metadata `arity` if not provided
    if (arity == null) {
      arity = data[2];
    }
    // use metadata `thisArg` if available
    if (funcIsBind) {
      thisArg = data[3];
    }
    // set if currying a bound function
    if (!isBind && funcIsBind) {
      bitmask |= CURRY_BOUND_FLAG;
    }
    // append partial left arguments
    var funcArgs = data[4];
    if (funcArgs) {
      var funcHolders = data[5];
      partialArgs = isPartial ? composeArgs(funcArgs, funcHolders, partialArgs) : baseSlice(funcArgs);
      partialHolders = isPartial ? replaceHolders(partialArgs, PLACEHOLDER) : baseSlice(funcHolders);
    }
    // prepend partial right arguments
    funcArgs = data[6];
    if (funcArgs) {
      funcHolders = data[7];
      partialRightArgs = isPartialRight ? composeArgsRight(funcArgs, funcHolders, partialRightArgs) : baseSlice(funcArgs);
      partialRightHolders = isPartialRight ? replaceHolders(partialRightArgs, PLACEHOLDER) : baseSlice(funcHolders);
    }
  }
  if (arity == null) {
    arity = isBindKey ? 0 : func.length;
  }
  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(func, thisArg);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !partialHolders.length) {
    result = createPartialWrapper(func, bitmask, partialArgs, thisArg);
  } else {
    result = createHybridWrapper(func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders);
  }
  var setter = data ? baseSetData : setData;
  return setter(result, [func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders]);
}

module.exports = createWrapper;

},{"../lang/isFunction":231,"./baseSetData":176,"./baseSlice":177,"./composeArgs":186,"./composeArgsRight":187,"./createBindWrapper":190,"./createHybridWrapper":194,"./createPartialWrapper":196,"./getData":199,"./replaceHolders":212,"./setData":213}],198:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used to convert latin-1 supplement letters to basic latin (ASCII) letters.
 * See [Wikipedia](http://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * for more details.
 */
var deburredLetters = {
  '\xC0': 'A',  '\xC1': 'A', '\xC2': 'A', '\xC3': 'A', '\xC4': 'A', '\xC5': 'A',
  '\xE0': 'a',  '\xE1': 'a', '\xE2': 'a', '\xE3': 'a', '\xE4': 'a', '\xE5': 'a',
  '\xC7': 'C',  '\xE7': 'c',
  '\xD0': 'D',  '\xF0': 'd',
  '\xC8': 'E',  '\xC9': 'E', '\xCA': 'E', '\xCB': 'E',
  '\xE8': 'e',  '\xE9': 'e', '\xEA': 'e', '\xEB': 'e',
  '\xCC': 'I',  '\xCD': 'I', '\xCE': 'I', '\xCF': 'I',
  '\xEC': 'i',  '\xED': 'i', '\xEE': 'i', '\xEF': 'i',
  '\xD1': 'N',  '\xF1': 'n',
  '\xD2': 'O',  '\xD3': 'O', '\xD4': 'O', '\xD5': 'O', '\xD6': 'O', '\xD8': 'O',
  '\xF2': 'o',  '\xF3': 'o', '\xF4': 'o', '\xF5': 'o', '\xF6': 'o', '\xF8': 'o',
  '\xD9': 'U',  '\xDA': 'U', '\xDB': 'U', '\xDC': 'U',
  '\xF9': 'u',  '\xFA': 'u', '\xFB': 'u', '\xFC': 'u',
  '\xDD': 'Y',  '\xFD': 'y', '\xFF': 'y',
  '\xC6': 'AE', '\xE6': 'ae',
  '\xDE': 'Th', '\xFE': 'th',
  '\xDF': 'ss', '\xD7': ' ', '\xF7': ' '
};

/**
 * Used by `createCompounder` to convert latin-1 supplement letters to basic
 * latin (ASCII) letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
function deburrLetter(letter) {
  return deburredLetters[letter];
}

module.exports = deburrLetter;

},{}],199:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var metaMap = require('./metaMap'),
    noop = require('../utility/noop');

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;

},{"../utility/noop":299,"./metaMap":206}],200:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep=false] Specify a deep clone.
 * @returns {*} Returns the initialized clone value.
 */
function initArrayClone(array, isDeep) {
  var index = -1,
      length = array.length,
      result = array.constructor(length);

  if (!isDeep) {
    while (++index < length) {
      result[index] = array[index];
    }
  }
  // add array properties assigned by `RegExp#exec`
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initArrayClone;

},{}],201:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseAssign = require('./baseAssign'),
    bufferClone = require('./bufferClone'),
    isFunction = require('../lang/isFunction');

/** Used to match `RegExp` flags from their coerced string values */
var reFlags = /\w*$/;

/** `Object#toString` result references */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    mapClass = '[object Map]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    setClass = '[object Set]',
    stringClass = '[object String]',
    weakMapClass = '[object WeakMap]';

var arrayBufferClass = '[object ArrayBuffer]',
    float32Class = '[object Float32Array]',
    float64Class = '[object Float64Array]',
    int8Class = '[object Int8Array]',
    int16Class = '[object Int16Array]',
    int32Class = '[object Int32Array]',
    uint8Class = '[object Uint8Array]',
    uint8ClampedClass = '[object Uint8ClampedArray]',
    uint16Class = '[object Uint16Array]',
    uint32Class = '[object Uint32Array]';

/** Used to identify object classifications that `_.clone` supports */
var cloneableClasses = {};
cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
cloneableClasses[arrayBufferClass] = cloneableClasses[boolClass] =
cloneableClasses[dateClass] = cloneableClasses[float32Class] =
cloneableClasses[float64Class] = cloneableClasses[int8Class] =
cloneableClasses[int16Class] = cloneableClasses[int32Class] =
cloneableClasses[numberClass] = cloneableClasses[objectClass] =
cloneableClasses[regexpClass] = cloneableClasses[stringClass] =
cloneableClasses[uint8Class] = cloneableClasses[uint8ClampedClass] =
cloneableClasses[uint16Class] = cloneableClasses[uint32Class] = true;
cloneableClasses[errorClass] =
cloneableClasses[funcClass] = cloneableClasses[mapClass] =
cloneableClasses[setClass] = cloneableClasses[weakMapClass] = false;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep=false] Specify a deep clone.
 * @returns {*} Returns the initialized clone value.
 */
function initObjectClone(object, isDeep) {
  var className = toString.call(object);
  if (!cloneableClasses[className]) {
    return object;
  }
  var Ctor = object.constructor,
      isArgs = className == argsClass,
      isObj = className == objectClass;

  if (isObj && !(isFunction(Ctor) && (Ctor instanceof Ctor))) {
    Ctor = Object;
  }
  if (isArgs || isObj) {
    var result = isDeep ? new Ctor : baseAssign(new Ctor, object);
    if (isArgs) {
      result.length = object.length;
    }
    return result;
  }
  switch (className) {
    case arrayBufferClass:
      return bufferClone(object);

    case boolClass:
    case dateClass:
      return new Ctor(+object);

    case float32Class: case float64Class:
    case int8Class: case int16Class: case int32Class:
    case uint8Class: case uint8ClampedClass: case uint16Class: case uint32Class:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberClass:
    case stringClass:
      return new Ctor(object);

    case regexpClass:
      result = Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initObjectClone;

},{"../lang/isFunction":231,"./baseAssign":151,"./bufferClone":181}],202:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    mapClass = '[object Map]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    setClass = '[object Set]',
    stringClass = '[object String]',
    weakMapClass = '[object WeakMap]';

var arrayBufferClass = '[object ArrayBuffer]',
    float32Class = '[object Float32Array]',
    float64Class = '[object Float64Array]',
    int8Class = '[object Int8Array]',
    int16Class = '[object Int16Array]',
    int32Class = '[object Int32Array]',
    uint8Class = '[object Uint8Array]',
    uint8ClampedClass = '[object Uint8ClampedArray]',
    uint16Class = '[object Uint16Array]',
    uint32Class = '[object Uint32Array]';

/** Used to identify object classifications that are treated like arrays */
var arrayLikeClasses = {};
arrayLikeClasses[argsClass] =
arrayLikeClasses[arrayClass] = arrayLikeClasses[float32Class] =
arrayLikeClasses[float64Class] = arrayLikeClasses[int8Class] =
arrayLikeClasses[int16Class] = arrayLikeClasses[int32Class] =
arrayLikeClasses[uint8Class] = arrayLikeClasses[uint8ClampedClass] =
arrayLikeClasses[uint16Class] = arrayLikeClasses[uint32Class] = true;
arrayLikeClasses[arrayBufferClass] = arrayLikeClasses[boolClass] =
arrayLikeClasses[dateClass] = arrayLikeClasses[errorClass] =
arrayLikeClasses[funcClass] = arrayLikeClasses[mapClass] =
arrayLikeClasses[numberClass] = arrayLikeClasses[objectClass] =
arrayLikeClasses[regexpClass] = arrayLikeClasses[setClass] =
arrayLikeClasses[stringClass] = arrayLikeClasses[weakMapClass] = false;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is an array-like object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 */
function isArrayLike(value) {
  return (value && typeof value == 'object' && typeof value.length == 'number' &&
    arrayLikeClasses[toString.call(value)]) || false;
}

module.exports = isArrayLike;

},{}],203:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":238}],204:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used by `_.trimmedLeftIndex` and `_.trimmedRightIndex` to determine if a
 * character code is whitespace.
 *
 * @private
 * @param {number} charCode The character code to inspect.
 * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
 */
function isWhitespace(charCode) {
  return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
    (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
}

module.exports = isWhitespace;

},{}],205:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A fast path for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap in a `lodash` instance.
 * @param {boolean} [chainAll=false] Enable chaining for all methods.
 * @returns {Object} Returns a `lodash` instance.
 */
function lodashWrapper(value, chainAll) {
  this.__chain__ = !!chainAll;
  this.__wrapped__ = value;
}

module.exports = lodashWrapper;

},{}],206:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../lang/isNative');

/** Native method references */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":233}],207:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A specialized version of `_.pick` that picks `object` properties
 * specified by the `props` array.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{}],208:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` that picks `object` properties
 * the predicate returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};

  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":165}],209:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to match template delimiters */
var reEscape = /<%-([\s\S]+?)%>/g;

module.exports = reEscape;

},{}],210:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to match template delimiters */
var reEvaluate = /<%([\s\S]+?)%>/g;

module.exports = reEvaluate;

},{}],211:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to match template delimiters */
var reInterpolate = /<%=([\s\S]+?)%>/g;

module.exports = reInterpolate;

},{}],212:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used as the internal argument placeholder */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    if (array[index] === placeholder) {
      array[index] = PLACEHOLDER;
      result[++resIndex] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],213:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSetData = require('./baseSetData'),
    now = require('../utility/now');

/** Used to detect when a function becomes hot */
var HOT_COUNT = 150,
    HOT_SPAN = 16;

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = (function() {
  var count = 0,
      lastCalled = 0;

  return function(key, value) {
    var stamp = now ? now() : 0,
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return key;
      }
    } else {
      count = 0;
    }
    return baseSetData(key, value);
  };
}());

module.exports = setData;

},{"../utility/now":300,"./baseSetData":176}],214:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var toObject = require('./toObject'),
    values = require('../object/values');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Converts `value` to an array-like object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array|Object} Returns the array-like object.
 */
function toIterable(value) {
  if (value == null) {
    return [];
  }
  var length = value.length;
  if (!(typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER)) {
    return values(value);
  }
  value = toObject(value);
  return value;
}

module.exports = toIterable;

},{"../object/values":268,"./toObject":215}],215:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":238}],216:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isWhitespace = require('./isWhitespace');

/**
 * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the first non-whitespace character.
 */
function trimmedLeftIndex(string) {
  var index = -1,
      length = string.length;

  while (++index < length && isWhitespace(string.charCodeAt(index))) {}
  return index;
}

module.exports = trimmedLeftIndex;

},{"./isWhitespace":204}],217:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isWhitespace = require('./isWhitespace');

/**
 * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedRightIndex(string) {
  var index = string.length;

  while (index-- && isWhitespace(string.charCodeAt(index))) {}
  return index;
}

module.exports = trimmedRightIndex;

},{"./isWhitespace":204}],218:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'clone': require('./lang/clone'),
  'cloneDeep': require('./lang/cloneDeep'),
  'isArguments': require('./lang/isArguments'),
  'isArray': require('./lang/isArray'),
  'isBoolean': require('./lang/isBoolean'),
  'isDate': require('./lang/isDate'),
  'isElement': require('./lang/isElement'),
  'isEmpty': require('./lang/isEmpty'),
  'isEqual': require('./lang/isEqual'),
  'isError': require('./lang/isError'),
  'isFinite': require('./lang/isFinite'),
  'isFiniteLike': require('./lang/isFiniteLike'),
  'isFunction': require('./lang/isFunction'),
  'isNaN': require('./lang/isNaN'),
  'isNative': require('./lang/isNative'),
  'isNode': require('./lang/isNode'),
  'isNull': require('./lang/isNull'),
  'isNumber': require('./lang/isNumber'),
  'isNumberLike': require('./lang/isNumberLike'),
  'isObject': require('./lang/isObject'),
  'isPlainObject': require('./lang/isPlainObject'),
  'isRegExp': require('./lang/isRegExp'),
  'isString': require('./lang/isString'),
  'isUndefined': require('./lang/isUndefined')
};

},{"./lang/clone":219,"./lang/cloneDeep":220,"./lang/isArguments":221,"./lang/isArray":222,"./lang/isBoolean":223,"./lang/isDate":224,"./lang/isElement":225,"./lang/isEmpty":226,"./lang/isEqual":227,"./lang/isError":228,"./lang/isFinite":229,"./lang/isFiniteLike":230,"./lang/isFunction":231,"./lang/isNaN":232,"./lang/isNative":233,"./lang/isNode":234,"./lang/isNull":235,"./lang/isNumber":236,"./lang/isNumberLike":237,"./lang/isObject":238,"./lang/isPlainObject":239,"./lang/isRegExp":240,"./lang/isString":241,"./lang/isUndefined":242}],219:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseClone = require('../internal/baseClone');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it is
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with two argument; (value, index|key).
 *
 * **Note:** This method is loosely based on the structured clone algorithm. Functions
 * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
 * objects created by constructors other than `Object` are cloned to plain `Object` objects.
 * See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep=false] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * var shallow = _.clone(characters);
 * shallow[0] === characters[0];
 * // => true
 *
 * var deep = _.clone(characters, true);
 * deep[0] === characters[0];
 * // => false
 *
 * _.mixin({
 *   'clone': _.partialRight(_.clone, function(value) {
 *     return _.isElement(value) ? value.cloneNode(false) : undefined;
 *   })
 * });
 *
 * var clone = _.clone(document.body);
 * clone.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  var type = typeof isDeep;

  // juggle arguments
  if (type != 'boolean' && isDeep != null) {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;

    // enables use as a callback for functions like `_.map`
    if ((type == 'number' || type == 'string') && thisArg && thisArg[customizer] === value) {
      customizer = null;
    }
  }
  customizer = typeof customizer == 'function' && baseCallback(customizer, thisArg, 1);
  return baseClone(value, isDeep, customizer);
}

module.exports = clone;

},{"../internal/baseCallback":153,"../internal/baseClone":154}],220:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseClone = require('../internal/baseClone');

/**
 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with two argument; (value, index|key).
 *
 * **Note:** This method is loosely based on the structured clone algorithm. Functions
 * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
 * objects created by constructors other than `Object` are cloned to plain `Object` objects.
 * See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * var deep = _.cloneDeep(characters);
 * deep[0] === characters[0];
 * // => false
 *
 * var view = {
 *   'label': 'docs',
 *   'node': element
 * };
 *
 * var clone = _.cloneDeep(view, function(value) {
 *   return _.isElement(value) ? value.cloneNode(true) : undefined;
 * });
 *
 * clone.node == view.node;
 * // => false
 */
function cloneDeep(value, customizer, thisArg) {
  customizer = typeof customizer == 'function' && baseCallback(customizer, thisArg, 1);
  return baseClone(value, true, customizer);
}

module.exports = cloneDeep;

},{"../internal/baseCallback":153,"../internal/baseClone":154}],221:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/** `Object#toString` result references */
var argsClass = '[object Arguments]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })();
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = (value && typeof value == 'object') ? value.length : undefined;
  return (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER &&
    toString.call(value) == argsClass) || false;
}

module.exports = isArguments;

},{}],222:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('./isNative');

/** `Object#toString` result references */
var arrayClass = '[object Array]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * (function() { return _.isArray(arguments); })();
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == arrayClass) || false;
};

module.exports = isArray;

},{"./isNative":233}],223:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var boolClass = '[object Boolean]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return (value === true || value === false ||
    value && typeof value == 'object' && toString.call(value) == boolClass) || false;
}

module.exports = isBoolean;

},{}],224:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var dateClass = '[object Date]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */
function isDate(value) {
  return (value && typeof value == 'object' && toString.call(value) == dateClass) || false;
}

module.exports = isDate;

},{}],225:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isPlainObject = require('./isPlainObject'),
    support = require('../support');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return (value && typeof value == 'object' && value.nodeType === 1 &&
    toString.call(value).indexOf('Element') > -1) || false;
}
// fallback for environments without DOM support
if (!support.dom) {
  isElement = function(value) {
    return (value && typeof value == 'object' && value.nodeType === 1 &&
      !isPlainObject(value)) || false;
  };
}

module.exports = isElement;

},{"../support":290,"./isPlainObject":239}],226:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isFunction = require('./isFunction'),
    isString = require('./isString'),
    keys = require('../object/keys');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if a collection is empty. A value is considered empty unless it is
 * an array-like value with a length greater than `0` or an object with own
 * enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  var length = value.length;
  if ((typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER) &&
      (isArray(value) || isString(value) || isArguments(value) ||
        (typeof value == 'object' && isFunction(value.splice)))) {
    return !length;
  }
  return !keys(value).length;
}

module.exports = isEmpty;

},{"../object/keys":260,"./isArguments":221,"./isArray":222,"./isFunction":231,"./isString":241}],227:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseIsEqual = require('../internal/baseIsEqual'),
    isStrictComparable = require('../internal/isStrictComparable');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments; (value, other, key).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare to `other`.
 * @param {*} other The value to compare to `value`.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * var other = { 'name': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * var words = ['hello', 'goodbye'];
 * var otherWords = ['hi', 'goodbye'];
 *
 * _.isEqual(words, otherWords, function() {
 *   return _.every(arguments, _.bind(RegExp.prototype.test, /^h(?:i|ello)$/)) || undefined;
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' && baseCallback(customizer, thisArg, 3);
  return (!customizer && isStrictComparable(value) && isStrictComparable(other))
    ? value === other
    : baseIsEqual(value, other, customizer);
}

module.exports = isEqual;

},{"../internal/baseCallback":153,"../internal/baseIsEqual":171,"../internal/isStrictComparable":203}],228:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var errorClass = '[object Error]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  return (value && typeof value == 'object' && toString.call(value) == errorClass) || false;
}

module.exports = isError;

},{}],229:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('./isNative');

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite,
    nativeNumIsFinite = isNative(nativeNumIsFinite = Number.isFinite) && nativeNumIsFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on ES6 `Number.isFinite`. See the
 * [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(10);
 * // => true
 *
 * _.isFinite('10');
 * // => false
 *
 * _.isFinite(true);
 * // => false
 *
 * _.isFinite(Object(10));
 * // => false
 *
 * _.isFinite(Infinity);
 * // => false
 */
var isFinite = nativeNumIsFinite || function(value) {
  return typeof value == 'number' && nativeIsFinite(value);
};

module.exports = isFinite;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./isNative":233}],230:[function(require,module,exports){
(function (global){
'use strict';

/** Native method shortcuts */
var nativeIsFinite = global.isFinite;
var nativeIsNaN = global.isNaN;

/**
 * Checks if `value` is, or can be coerced to, a finite number.
 *
 * Note: This is not the same as native `isFinite` which will return true for
 * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
 *
 * @static
 * @memberOf ash
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
 * @example
 *
 * ash.isFinite(-101);
 * // => true
 *
 * ash.isFinite('10');
 * // => true
 *
 * ash.isFinite(true);
 * // => false
 *
 * ash.isFinite('');
 * // => false
 *
 * ash.isFinite(Infinity);
 * // => false
 */
function isFinite(value)
{
	return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
}

module.exports = isFinite;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],231:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // avoid a Chakra bug in IE 11
  // https://github.com/jashkenas/underscore/issues/1621
  return typeof value == 'function' || false;
}

module.exports = isFunction;

},{}],232:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNumber = require('./isNumber');

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is not the same as native `isNaN` which returns `true`
 * for `undefined` and other non-numeric values. See the [ES5 spec](http://es5.github.io/#x15.1.2.4)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * _.isNaN(NaN);
 * // => true
 *
 * _.isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * _.isNaN(undefined);
 * // => false
 */
function isNaN(value) {
  // `NaN` as a primitive is the only value that is not equal to itself
  // (perform the `[[Class]]` check first to avoid errors with some host objects in IE)
  return isNumber(value) && value != +value;
}

module.exports = isNaN;

},{"./isNumber":236}],233:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var escapeRegExp = require('../string/escapeRegExp'),
    isFunction = require('./isFunction');

/** Used to detect host constructors (Safari > 5) */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions */
var fnToString = Function.prototype.toString;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  escapeRegExp(toString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (isFunction(value)) {
    return reNative.test(fnToString.call(value));
  }
  return (value && typeof value == 'object' && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../string/escapeRegExp":275,"./isFunction":231}],234:[function(require,module,exports){
'use strict';


/**	
 * Checks if value is a DOM node.
 *
 * @method
 * @memberof ash
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if the value is a DOM node, else false.
 **/
function isNode(value)
{
	return (typeof Node === 'object' ? value instanceof Node : value && typeof value === 'object' && typeof value.nodeType === 'number' && typeof value.nodeName === 'string');
} // ash.isNode

module.exports = isNode;
},{}],235:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],236:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var numberClass = '[object Number]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(8.4);
 * // => true
 *
 * _.isNumber(NaN);
 * // => true
 *
 * _.isNumber('8.4');
 * // => false
 */
function isNumber(value) {
  var type = typeof value;
  return type == 'number' ||
    (value && type == 'object' && toString.call(value) == numberClass) || false;
}

module.exports = isNumber;

},{}],237:[function(require,module,exports){
(function (global){
'use strict';

/** Native method shortcuts */
var nativeIsNaN = global.isNaN;



/**	
 * Checks if value is, or can be coerced to, a number (including Infinity).
 *
 * @method
 * @memberof ash
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if the value is number, else false.
 **/
function isNumber(value)
{
	return !nativeIsNaN(value) && !nativeIsNaN(parseFloat(value));
} // isNumber

module.exports = isNumber;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],238:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](http://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // avoid a V8 bug in Chrome 19-20
  // https://code.google.com/p/v8/issues/detail?id=2291
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],239:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseForIn = require('../internal/baseForIn'),
    isFunction = require('./isFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references */
var objectClass = '[object Object]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/** Native method references */
var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

/**
 * A fallback implementation of `_.isPlainObject` which checks if `value`
 * is an object created by the `Object` constructor or has a `[[Prototype]]`
 * of `null`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var Ctor,
      result;

  // exit early for non `Object` objects
  if (!(value && typeof value == 'object' &&
        toString.call(value) == objectClass) ||
      (!hasOwnProperty.call(value, 'constructor') &&
        (Ctor = value.constructor, isFunction(Ctor) && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(value, key) {
    result = key;
  });
  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
}

/**
 * Checks if `value` is an object created by the `Object` constructor or has
 * a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * _.isPlainObject(new Shape);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && toString.call(value) == objectClass)) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

module.exports = isPlainObject;

},{"../internal/baseForIn":165,"./isFunction":231,"./isNative":233}],240:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var regexpClass = '[object RegExp]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
function isRegExp(value) {
  return (value && typeof value == 'object' && toString.call(value) == regexpClass) || false;
}

module.exports = isRegExp;

},{}],241:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result references */
var stringClass = '[object String]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (value && typeof value == 'object' && toString.call(value) == stringClass) || false;
}

module.exports = isString;

},{}],242:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return typeof value == 'undefined';
}

module.exports = isUndefined;

},{}],243:[function(require,module,exports){
module.exports =
{
	'roundToMultiple': require('./number/roundToMultiple'),
	'sameDecimals': require('./number/sameDecimals'),
	'limit': require('./number/limit')
};

},{"./number/limit":244,"./number/roundToMultiple":245,"./number/sameDecimals":246}],244:[function(require,module,exports){
'use strict';

/**
 * 
 */
function limit(value, lowerBound, upperBound)
{
	return value > upperBound ? upperBound : (value < lowerBound ? lowerBound : value);
}

module.exports = limit;
},{}],245:[function(require,module,exports){
'use strict';

/**
 * Returns number rounded to the multiple of another number. 
 *
 * @method
 * @memberof ash
 * @param {number} value Number to be rounded
 * @param {number} base Base of the multiple
 * @param {boolean} [round] Round to the nearest multiple?
 * @returns {number} The new number.
 * 
 * @example
 * ash.roundToMultiple(2.1, 2) // -> 4
 * ash.roundToMultiple(2.1, 2, true) // -> 2
 * ash.roundToMultiple(-2.1, 2) // -> -4
 * ash.roundToMultiple(-2.1, 2, true) // -> -2
 */
function roundToMultiple(value, base, round)
{
	if (value >= 0)
		return Math[round ? 'round' : 'ceil'](value / base) * base;
	else if (value < 0)
		return Math[round ? 'round' : 'floor'](value / base) * base;
	else
		return null;
} // roundToMultiple

module.exports = roundToMultiple;
},{}],246:[function(require,module,exports){
'use strict';

/**
 * Returns number converted to string with the same number decimal as in an number
 */
function sameDecimals(value, number)
{
	if (number.toString().split('.').length > 1)
	{
		return value.toFixed(number.toString().split('.')[1].length);
	} else
	{
		return value.toFixed(0);
	} // if
}

module.exports = sameDecimals;
},{}],247:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'assign': require('./object/assign'),
  'create': require('./object/create'),
  'defaults': require('./object/defaults'),
  'extend': require('./object/assign'),
  'findKey': require('./object/findKey'),
  'findLastKey': require('./object/findLastKey'),
  'forIn': require('./object/forIn'),
  'forInRight': require('./object/forInRight'),
  'forOwn': require('./object/forOwn'),
  'forOwnRight': require('./object/forOwnRight'),
  'functions': require('./object/functions'),
  'has': require('./object/has'),
  'invert': require('./object/invert'),
  'keys': require('./object/keys'),
  'keysIn': require('./object/keysIn'),
  'mapValues': require('./object/mapValues'),
  'merge': require('./object/merge'),
  'methods': require('./object/functions'),
  'omit': require('./object/omit'),
  'pairs': require('./object/pairs'),
  'pick': require('./object/pick'),
  'transform': require('./object/transform'),
  'values': require('./object/values'),
  'valuesIn': require('./object/valuesIn')
};

},{"./object/assign":248,"./object/create":249,"./object/defaults":250,"./object/findKey":251,"./object/findLastKey":252,"./object/forIn":253,"./object/forInRight":254,"./object/forOwn":255,"./object/forOwnRight":256,"./object/functions":257,"./object/has":258,"./object/invert":259,"./object/keys":260,"./object/keysIn":261,"./object/mapValues":262,"./object/merge":263,"./object/omit":264,"./object/pairs":265,"./object/pick":266,"./object/transform":267,"./object/values":268,"./object/valuesIn":269}],248:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * _.assign({ 'name': 'fred' }, { 'age': 40 }, { 'employer': 'slate' });
 * // => { 'name': 'fred', 'age': 40, 'employer': 'slate' }
 *
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'name': 'barney' }, { 'age': 36 }, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'age': 36, 'employer': 'slate' }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"../internal/baseAssign":151,"../internal/createAssigner":189}],249:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseAssign = require('../internal/baseAssign'),
    baseCreate = require('../internal/baseCreate');

/**
 * Creates an object that inherits from the given `prototype` object. If a
 * `properties` object is provided its own enumerable properties are assigned
 * to the created object.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} prototype The object to inherit from.
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new object.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * function Circle() {
 *   Shape.call(this);
 * }
 *
 * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
 *
 * var circle = new Circle;
 * circle instanceof Circle;
 * // => true
 *
 * circle instanceof Shape;
 * // => true
 */
function create(prototype, properties) {
  var result = baseCreate(prototype);
  return properties ? baseAssign(result, properties) : result;
}

module.exports = create;

},{"../internal/baseAssign":151,"../internal/baseCreate":156}],250:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var assign = require('./assign'),
    baseSlice = require('../internal/baseSlice');

/**
 * Used by `_.defaults` to customize its `_.assign` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignDefaults(objectValue, sourceValue) {
  return typeof objectValue == 'undefined'
    ? sourceValue
    : objectValue;
}

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional defaults of the same property are ignored.
 *
 * **Note:** See the [documentation example of `_.partialRight`](http://lodash.com/docs#partialRight)
 * for a deep version of this method.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * _.defaults({ 'name': 'barney' }, { 'age': 36 }, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'age': 36, 'employer': 'slate' }
 */
function defaults(object) {
  if (object == null) {
    return object;
  }
  var args = baseSlice(arguments);
  args.push(assignDefaults);
  return assign.apply(undefined, args);
}

module.exports = defaults;

},{"../internal/baseSlice":177,"./assign":248}],251:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseFind = require('../internal/baseFind'),
    baseForOwn = require('../internal/baseForOwn');

/**
 * This method is like `_.findIndex` except that it returns the key of the
 * first element the predicate returns truthy for, instead of the element itself.
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to search.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
 * @example
 *
 * var characters = {
 *   'barney': { 'age': 36 },
 *   'fred': { 'age': 40, 'blocked': true },
 *   'pebbles': { 'age': 1 }
 * };
 *
 * _.findKey(characters, function(chr) {
 *   return chr.age < 40;
 * });
 * // => 'barney' (property order is not guaranteed)
 *
 * // using "_.where" callback shorthand
 * _.findKey(characters, { 'age': 1 });
 * // => 'pebbles'
 *
 * // using "_.pluck" callback shorthand
 * _.findKey(characters, 'blocked');
 * // => 'fred'
 */
function findKey(object, predicate, thisArg) {
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(object, predicate, baseForOwn, true);
}

module.exports = findKey;

},{"../internal/baseCallback":153,"../internal/baseFind":162,"../internal/baseForOwn":166}],252:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseFind = require('../internal/baseFind'),
    baseForOwnRight = require('../internal/baseForOwnRight');

/**
 * This method is like `_.findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * If a property name is provided for `predicate` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to search.
 * @param {Function|Object|string} [predicate=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
 * @example
 *
 * var characters = {
 *   'barney': { 'age': 36, 'blocked': true },
 *   'fred': { 'age': 40 },
 *   'pebbles': { 'age': 1, 'blocked': true }
 * };
 *
 * _.findLastKey(characters, function(chr) {
 *   return chr.age < 40;
 * });
 * // => returns `pebbles`, assuming `_.findKey` returns `barney`
 *
 * // using "_.where" callback shorthand
 * _.findLastKey(characters, { 'age': 40 });
 * // => 'fred'
 *
 * // using "_.pluck" callback shorthand
 * _.findLastKey(characters, 'blocked');
 * // => 'pebbles'
 */
function findLastKey(object, predicate, thisArg) {
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(object, predicate, baseForOwnRight, true);
}

module.exports = findLastKey;

},{"../internal/baseCallback":153,"../internal/baseFind":162,"../internal/baseForOwnRight":167}],253:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseFor = require('../internal/baseFor'),
    keysIn = require('./keysIn');

/**
 * Iterates over own and inherited enumerable properties of an object invoking
 * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, key, object). Iterator functions may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.forIn(new Shape, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'x', 'y', and 'z' (property order is not guaranteed)
 */
function forIn(object, iteratee, thisArg) {
  if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
    iteratee = baseCallback(iteratee, thisArg, 3);
  }
  return baseFor(object, iteratee, keysIn);
}

module.exports = forIn;

},{"../internal/baseCallback":153,"../internal/baseFor":164,"./keysIn":261}],254:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseForRight = require('../internal/baseForRight'),
    keysIn = require('./keysIn');

/**
 * This method is like `_.forIn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.forInRight(new Shape, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'z', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'z'
 */
function forInRight(object, iteratee, thisArg) {
  iteratee = baseCallback(iteratee, thisArg, 3);
  return baseForRight(object, iteratee, keysIn);
}

module.exports = forInRight;

},{"../internal/baseCallback":153,"../internal/baseForRight":168,"./keysIn":261}],255:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseForOwn = require('../internal/baseForOwn');

/**
 * Iterates over own enumerable properties of an object invoking `iteratee`
 * for each property. The `iteratee` is bound to `thisArg` and invoked with
 * three arguments; (value, key, object). Iterator functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed)
 */
function forOwn(object, iteratee, thisArg) {
  if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
    iteratee = baseCallback(iteratee, thisArg, 3);
  }
  return baseForOwn(object, iteratee);
}

module.exports = forOwn;

},{"../internal/baseCallback":153,"../internal/baseForOwn":166}],256:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseForRight = require('../internal/baseForRight'),
    keys = require('./keys');

/**
 * This method is like `_.forOwn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
 *   console.log(key);
 * });
 * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
 */
function forOwnRight(object, iteratee, thisArg) {
  iteratee = baseCallback(iteratee, thisArg, 3);
  return baseForRight(object, iteratee, keys);
}

module.exports = forOwnRight;

},{"../internal/baseCallback":153,"../internal/baseForRight":168,"./keys":260}],257:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFunctions = require('../internal/baseFunctions'),
    keysIn = require('./keysIn');

/**
 * Creates an array of function property names from all enumerable properties,
 * own and inherited, of `object`.
 *
 * @static
 * @memberOf _
 * @alias methods
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the new array of property names.
 * @example
 *
 * _.functions(_);
 * // => ['all', 'any', 'bind', ...]
 */
function functions(object) {
  return baseFunctions(object, keysIn(object));
}

module.exports = functions;

},{"../internal/baseFunctions":169,"./keysIn":261}],258:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if the specified property name exists as a direct property of `object`,
 * instead of an inherited property.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {string} key The name of the property to check.
 * @returns {boolean} Returns `true` if key is a direct property, else `false`.
 * @example
 *
 * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
 * // => true
 */
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}

module.exports = has;

},{}],259:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = require('./keys');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of the inverted keys and values of the given
 * object. If the given object contains duplicate values, subsequent values
 * overwrite property assignments of previous values unless `multiValue`
 * is `true`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to invert.
 * @param {boolean} [multiValue=false] Allow multiple values per key.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * _.invert({ 'first': 'fred', 'second': 'barney' });
 * // => { 'fred': 'first', 'barney': 'second' }
 *
 * // without `multiValue`
 * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' });
 * // => { 'fred': 'third', 'barney': 'second' }
 *
 * // with `multiValue`
 * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' }, true);
 * // => { 'fred': ['first', 'third'], 'barney': ['second'] }
 */
function invert(object, multiValue) {
  var index = -1,
      props = keys(object),
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (multiValue) {
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }
    else {
      result[value] = key;
    }
  }
  return result;
}

module.exports = invert;

},{"./keys":260}],260:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isNative = require('../lang/isNative'),
    keysIn = require('./keysIn'),
    support = require('../support'),
    toObject = require('../internal/toObject');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var keyIndex,
      index = -1,
      props = keysIn(object),
      length = props.length,
      objLength = length && object.length,
      maxIndex = objLength - 1,
      result = [];

  var allowIndexes = typeof objLength == 'number' && objLength > 0 &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  while (++index < length) {
    var key = props[index];
    if ((allowIndexes && (keyIndex = +key, keyIndex > -1 && keyIndex <= maxIndex && keyIndex % 1 == 0)) ||
        hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.keys(new Shape);
 * // => ['x', 'y'] (property order is not guaranteed)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  object = toObject(object);

  var Ctor = object.constructor,
      length = object.length;

  if ((Ctor && object === Ctor.prototype) ||
      (typeof length == 'number' && length > 0)) {
    return shimKeys(object);
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"../internal/toObject":215,"../lang/isArguments":221,"../lang/isArray":222,"../lang/isNative":233,"../support":290,"./keysIn":261}],261:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    support = require('../support'),
    toObject = require('../internal/toObject');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.keysIn(new Shape);
 * // => ['x', 'y', 'z'] (property order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  object = toObject(object);

  var length = object.length;
  length = (typeof length == 'number' && length > 0 &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) >>> 0;

  var keyIndex,
      Ctor = object.constructor,
      index = -1,
      isProto = Ctor && object === Ctor.prototype,
      maxIndex = length - 1,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = String(index);
  }
  for (var key in object) {
    if (!(isProto && key == 'constructor') &&
        !(skipIndexes && (keyIndex = +key, keyIndex > -1 && keyIndex <= maxIndex && keyIndex % 1 == 0))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/toObject":215,"../lang/isArguments":221,"../lang/isArray":222,"../support":290}],262:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseForOwn = require('../internal/baseForOwn');

/**
 * Creates an object with the same keys as `object` and values generated by
 * running each own enumerable property of `object` through `iteratee`. The
 * iteratee function is bound to `thisArg` and invoked with three arguments;
 * (value, key, object).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the new mapped object.
 * @example
 *
 * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(n) { return n * 3; });
 * // => { 'a': 3, 'b': 6, 'c': 9 }
 *
 * var characters = {
 *   'fred': { 'name': 'fred', 'age': 40 },
 *   'pebbles': { 'name': 'pebbles', 'age': 1 }
 * };
 *
 * // using "_.pluck" callback shorthand
 * _.mapValues(characters, 'age');
 * // => { 'fred': 40, 'pebbles': 1 }
 */
function mapValues(object, iteratee, thisArg) {
  var result = {};
  iteratee = baseCallback(iteratee, thisArg, 3);

  baseForOwn(object, function(value, key, object) {
    result[key] = iteratee(value, key, object);
  });
  return result;
}

module.exports = mapValues;

},{"../internal/baseCallback":153,"../internal/baseForOwn":166}],263:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEach = require('../internal/arrayEach'),
    baseForOwn = require('../internal/baseForOwn'),
    createAssigner = require('../internal/createAssigner'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('../internal/isArrayLike'),
    isPlainObject = require('../lang/isPlainObject');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns the destination object.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  var isSrcArr = isArrayLike(source);

  (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
    var isArr = srcValue && isArrayLike(srcValue),
        isObj = srcValue && isPlainObject(srcValue),
        value = object[key];

    if (!(isArr || isObj)) {
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined;
      if (typeof result == 'undefined') {
        result = srcValue;
      }
      if (isSrcArr || typeof result != 'undefined') {
        object[key] = result;
      }
      return;
    }
    // avoid merging previously merged cyclic sources
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == srcValue) {
        object[key] = stackB[length];
        return;
      }
    }
    var result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
        isDeep = typeof result == 'undefined';

    if (isDeep) {
      result = isArr
        ? (isArray(value) ? value : [])
        : (isPlainObject(value) ? value : {});
    }
    // add the source value to the stack of traversed objects
    // and associate it with its merged value
    stackA.push(srcValue);
    stackB.push(result);

    // recursively merge objects and arrays (susceptible to call stack limits)
    if (isDeep) {
      baseMerge(result, srcValue, customizer, stackA, stackB);
    }
    object[key] = result;
  });

  return object;
}

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments; (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * var names = {
 *   'characters': [
 *     { 'name': 'barney' },
 *     { 'name': 'fred' }
 *   ]
 * };
 *
 * var ages = {
 *   'characters': [
 *     { 'age': 36 },
 *     { 'age': 40 }
 *   ]
 * };
 *
 * _.merge(names, ages);
 * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
 *
 * var food = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var otherFood = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(food, otherFood, function(a, b) {
 *   return _.isArray(a) ? a.concat(b) : undefined;
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/arrayEach":147,"../internal/baseForOwn":166,"../internal/createAssigner":189,"../internal/isArrayLike":202,"../lang/isArray":222,"../lang/isPlainObject":239}],264:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseDifference = require('../internal/baseDifference'),
    baseFlatten = require('../internal/baseFlatten'),
    keysIn = require('./keysIn'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback'),
    toObject = require('../internal/toObject');

/**
 * Creates a shallow clone of `object` excluding the specified properties.
 * Property names may be specified as individual arguments or as arrays of
 * property names. If a predicate is provided it is invoked for each property
 * of `object` omitting the properties the predicate returns truthy for. The
 * predicate is bound to `thisArg` and invoked with three arguments;
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to omit, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
 * // => { 'name': 'fred' }
 *
 * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
 *   return typeof value == 'number';
 * });
 * // => { 'name': 'fred' }
 */
function omit(object, predicate, thisArg) {
  if (object == null) {
    return {};
  }
  var iterable = toObject(object);
  if (typeof predicate != 'function') {
    var props = arrayMap(baseFlatten(arguments, false, false, 1), String);
    return pickByArray(iterable, baseDifference(keysIn(iterable), props));
  }
  predicate = baseCallback(predicate, thisArg, 3);
  return pickByCallback(iterable, function(value, key, object) {
    return !predicate(value, key, object);
  });
}

module.exports = omit;

},{"../internal/arrayMap":150,"../internal/baseCallback":153,"../internal/baseDifference":158,"../internal/baseFlatten":163,"../internal/pickByArray":207,"../internal/pickByCallback":208,"../internal/toObject":215,"./keysIn":261}],265:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = require('./keys');

/**
 * Creates a two dimensional array of a given object's key-value pairs,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed)
 */
function pairs(object) {
  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"./keys":260}],266:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseFlatten = require('../internal/baseFlatten'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback'),
    toObject = require('../internal/toObject');

/**
 * Creates a shallow clone of `object` composed of the specified properties.
 * Property names may be specified as individual arguments or as arrays of
 * property names. If a predicate is provided it is invoked for each property
 * of `object` picking the properties the predicate returns truthy for. The
 * predicate is bound to `thisArg` and invoked with three arguments;
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to pick, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
 * // => { 'name': 'fred' }
 *
 * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
 *   return key.charAt(0) != '_';
 * });
 * // => { 'name': 'fred' }
 */
function pick(object, predicate, thisArg) {
  if (object == null) {
    return {};
  }
  var iterable = toObject(object);
  return typeof predicate == 'function'
    ? pickByCallback(iterable, baseCallback(predicate, thisArg, 3))
    : pickByArray(iterable, baseFlatten(arguments, false, false, 1));
}

module.exports = pick;

},{"../internal/baseCallback":153,"../internal/baseFlatten":163,"../internal/pickByArray":207,"../internal/pickByCallback":208,"../internal/toObject":215}],267:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEach = require('../internal/arrayEach'),
    baseCallback = require('../internal/baseCallback'),
    baseCreate = require('../internal/baseCreate'),
    baseForOwn = require('../internal/baseForOwn'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject');

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable properties through `iteratee`, with each invocation potentially
 * mutating the `accumulator` object. The `iteratee` is bound to `thisArg`
 * and invoked with four arguments; (accumulator, value, key, object). Iterator
 * functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Array|Object} object The object to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var squares = _.transform([1, 2, 3, 4, 5, 6], function(result, n) {
 *   n *= n;
 *   if (n % 2) {
 *     return result.push(n) < 3;
 *   }
 * });
 * // => [1, 9, 25]
 *
 * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
 *   result[key] = n * 3;
 * });
 * // => { 'a': 3, 'b': 6, 'c': 9 }
 */
function transform(object, iteratee, accumulator, thisArg) {
  var isArr = isArrayLike(object);

  if (accumulator == null) {
    if (isArr) {
      accumulator = [];
    } else {
      if (isObject(object)) {
        var Ctor = object.constructor,
            proto = Ctor && Ctor.prototype;
      }
      accumulator = baseCreate(proto);
    }
  }
  if (iteratee) {
    iteratee = baseCallback(iteratee, thisArg, 4);
    (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
      return iteratee(accumulator, value, index, object);
    });
  }
  return accumulator;
}

module.exports = transform;

},{"../internal/arrayEach":147,"../internal/baseCallback":153,"../internal/baseCreate":156,"../internal/baseForOwn":166,"../internal/isArrayLike":202,"../lang/isObject":238}],268:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Shape(x, y) {
 *   this.x = x;
 *   this.y = y;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.values(new Shape(2, 1));
 * // => [2, 1] (property order is not guaranteed)
 */
function values(object) {
  return baseValues(object, keys);
}

module.exports = values;

},{"../internal/baseValues":180,"./keys":260}],269:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseValues = require('../internal/baseValues'),
    keysIn = require('./keysIn');

/**
 * Creates an array of the own and inherited enumerable property values
 * of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Shape(x, y) {
 *   this.x = x;
 *   this.y = y;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.valuesIn(new Shape(2, 1));
 * // => [2, 1, 0] (property order is not guaranteed)
 */
function valuesIn(object) {
  return baseValues(object, keysIn);
}

module.exports = valuesIn;

},{"../internal/baseValues":180,"./keysIn":261}],270:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'camelCase': require('./string/camelCase'),
  'capitalize': require('./string/capitalize'),
  'endsWith': require('./string/endsWith'),
  'escape': require('./string/escape'),
  'escapeRegExp': require('./string/escapeRegExp'),
  'kebabCase': require('./string/kebabCase'),
  'pad': require('./string/pad'),
  'padLeft': require('./string/padLeft'),
  'padRight': require('./string/padRight'),
  'repeat': require('./string/repeat'),
  'snakeCase': require('./string/snakeCase'),
  'startsWith': require('./string/startsWith'),
  'template': require('./string/template'),
  'templateSettings': require('./string/templateSettings'),
  'trim': require('./string/trim'),
  'trimLeft': require('./string/trimLeft'),
  'trimRight': require('./string/trimRight'),
  'trunc': require('./string/trunc'),
  'unescape': require('./string/unescape')
};

},{"./string/camelCase":271,"./string/capitalize":272,"./string/endsWith":273,"./string/escape":274,"./string/escapeRegExp":275,"./string/kebabCase":276,"./string/pad":277,"./string/padLeft":278,"./string/padRight":279,"./string/repeat":280,"./string/snakeCase":281,"./string/startsWith":282,"./string/template":283,"./string/templateSettings":284,"./string/trim":285,"./string/trimLeft":286,"./string/trimRight":287,"./string/trunc":288,"./string/unescape":289}],271:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCompounder = require('../internal/createCompounder');

/** Used to detect words composed of all capital letters */
var reAllCaps = /^[A-Z]+$/;

/**
 * Converts `string` to camel case.
 * See [Wikipedia](http://en.wikipedia.org/wiki/CamelCase) for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to camel case.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Hello world');
 * // => 'helloWorld'
 *
 * _.camelCase('--hello-world');
 * // => 'helloWorld'
 *
 * _.camelCase('__hello_world__');
 * // => 'helloWorld'
 */
var camelCase = createCompounder(function(result, word, index) {
  if (!index && reAllCaps.test(word)) {
    return result + word.toLowerCase();
  }
  return result + (word.charAt(0)[index ? 'toUpperCase' : 'toLowerCase']() + word.slice(1));
});

module.exports = camelCase;

},{"../internal/createCompounder":192}],272:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Capitalizes the first character of `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('fred');
 * // => 'Fred'
 */
function capitalize(string) {
  if (string == null) {
    return '';
  }
  string = String(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = capitalize;

},{}],273:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/* Native method references for those with the same name as other `lodash` methods */
var nativeMin = Math.min;

/**
 * Checks if `string` ends with a given target string.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to search.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search from.
 * @returns {boolean} Returns `true` if the given string ends with the
 *  target string, else `false`.
 * @example
 *
 * _.endsWith('abc', 'c');
 * // => true
 *
 * _.endsWith('abc', 'b');
 * // => false
 *
 * _.endsWith('abc', 'b', 2);
 * // => true
 */
function endsWith(string, target, position) {
  string = string == null ? '' : String(string);
  target = String(target);

  var length = string.length;
  position = (typeof position == 'undefined' ? length : nativeMin(position < 0 ? 0 : (+position || 0), length)) - target.length;
  return position >= 0 && string.indexOf(target, position) == position;
}

module.exports = endsWith;

},{}],274:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to match HTML entities and HTML characters */
var reUnescapedHtml = /[&<>"'`]/g;

/**
 * Used to convert characters to HTML entities.
 *
 * **Note:** Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't require escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value.
 * See [Mathias Bynens's article](http://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in Internet Explorer < 9, they can break out
 * of attribute values or HTML comments. See [#102](http://html5sec.org/#102),
 * [#108](http://html5sec.org/#108), and [#133](http://html5sec.org/#133) of
 * the [HTML5 Security Cheatsheet](http://html5sec.org/) for more details.
 */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(chr) {
  return htmlEscapes[chr];
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional characters
 * use a third-party library like [_he_](http://mths.be/he).
 *
 * When working with HTML you should always quote attribute values to reduce
 * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  // reset `lastIndex` because in IE < 9 `String#replace` does not
  string = string == null ? '' : String(string);
  return (reUnescapedHtml.lastIndex = 0, reUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;

},{}],275:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g;

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](http://lodash.com)');
 * // => '\[lodash\]\(http://lodash\.com\)'
 */
function escapeRegExp(string) {
  string = string == null ? '' : String(string);
  return (reRegExpChars.lastIndex = 0, reRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{}],276:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCompounder = require('../internal/createCompounder');

/**
 * Converts `string` to kebab case (a.k.a. spinal case).
 * See [Wikipedia](http://en.wikipedia.org/wiki/Letter_case#Computers) for
 * more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to kebab case.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Hello world');
 * // => 'hello-world'
 *
 * _.kebabCase('helloWorld');
 * // => 'hello-world'
 *
 * _.kebabCase('__hello_world__');
 * // => 'hello-world'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;

},{"../internal/createCompounder":192}],277:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createPad = require('../internal/createPad');

/** Native method references */
var ceil = Math.ceil,
    floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite;

/**
 * Pads `string` on the left and right sides if it is shorter then the given
 * padding length. The `chars` string may be truncated if the number of padding
 * characters can't be evenly divided by the padding length.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.pad('abc', 8);
 * // => '  abc   '
 *
 * _.pad('abc', 8, '_-');
 * // => '_-abc_-_'
 *
 * _.pad('abc', 3);
 * // => 'abc'
 */
function pad(string, length, chars) {
  string = string == null ? '' : String(string);
  length = +length;

  var strLength = string.length;
  if (strLength >= length || !nativeIsFinite(length)) {
    return string;
  }
  var mid = (length - strLength) / 2,
      leftLength = floor(mid),
      rightLength = ceil(mid);

  chars = createPad('', rightLength, chars);
  return chars.slice(0, leftLength) + string + chars;
}

module.exports = pad;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/createPad":195}],278:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createPad = require('../internal/createPad');

/**
 * Pads `string` on the left side if it is shorter then the given padding
 * length. The `chars` string may be truncated if the number of padding
 * characters exceeds the padding length.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padLeft('abc', 6);
 * // => '   abc'
 *
 * _.padLeft('abc', 6, '_-');
 * // => '_-_abc'
 *
 * _.padLeft('abc', 3);
 * // => 'abc'
 */
function padLeft(string, length, chars) {
  string = string == null ? '' : String(string);
  return createPad(string, length, chars) + string;
}

module.exports = padLeft;

},{"../internal/createPad":195}],279:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createPad = require('../internal/createPad');

/**
 * Pads `string` on the right side if it is shorter then the given padding
 * length. The `chars` string may be truncated if the number of padding
 * characters exceeds the padding length.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padRight('abc', 6);
 * // => 'abc   '
 *
 * _.padRight('abc', 6, '_-');
 * // => 'abc_-_'
 *
 * _.padRight('abc', 3);
 * // => 'abc'
 */
function padRight(string, length, chars) {
  string = string == null ? '' : String(string);
  return string + createPad(string, length, chars);
}

module.exports = padRight;

},{"../internal/createPad":195}],280:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Native method references */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite;

/**
 * Repeats the given string `n` times.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=0] The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * _.repeat('*', 3);
 * // => '***'
 *
 * _.repeat('abc', 2);
 * // => 'abcabc'
 *
 * _.repeat('abc', 0);
 * // => ''
 */
function repeat(string, n) {
  var result = '';
  n = +n;

  if (n < 1 || string == null || !nativeIsFinite(n)) {
    return result;
  }
  string = String(string);

  // leverage the exponentiation by squaring algorithm for a faster repeat
  // http://en.wikipedia.org/wiki/Exponentiation_by_squaring
  do {
    if (n % 2) {
      result += string;
    }
    n = floor(n / 2);
    string += string;
  } while (n);

  return result;
}

module.exports = repeat;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],281:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCompounder = require('../internal/createCompounder');

/**
 * Converts `string` to snake case.
 * See [Wikipedia](http://en.wikipedia.org/wiki/Snake_case) for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to snake case.
 * @returns {string} Returns the snake cased string.
 * @example
 *
 * _.snakeCase('Hello world');
 * // => 'hello_world'
 *
 * _.snakeCase('--hello-world');
 * // => 'hello_world'
 *
 * _.snakeCase('helloWorld');
 * // => 'hello_world'
 */
var snakeCase = createCompounder(function(result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});

module.exports = snakeCase;

},{"../internal/createCompounder":192}],282:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/* Native method references for those with the same name as other `lodash` methods */
var nativeMin = Math.min;

/**
 * Checks if `string` starts with a given target string.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to search.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if the given string starts with the
 *  target string, else `false`.
 * @example
 *
 * _.startsWith('abc', 'a');
 * // => true
 *
 * _.startsWith('abc', 'b');
 * // => false
 *
 * _.startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = string == null ? '' : String(string);
  position = typeof position == 'undefined' ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
  return string.lastIndexOf(target, position) == position;
}

module.exports = startsWith;

},{}],283:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var assign = require('../object/assign'),
    attempt = require('../utility/attempt'),
    escape = require('./escape'),
    isError = require('../lang/isError'),
    keys = require('../object/keys'),
    reInterpolate = require('../internal/reInterpolate'),
    templateSettings = require('./templateSettings'),
    values = require('../object/values');

/** Used to match empty string literals in compiled template source */
var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

/**
 * Used to match ES6 template delimiters.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components)
 * for more details.
 */
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/** Used to ensure capturing order of template delimiters */
var reNoMatch = /($^)/;

/** Used to match unescaped characters in compiled string literals */
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

/** Used to escape characters for inclusion in compiled string literals */
var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

/**
 * Used by `_.template` to escape characters for inclusion in compiled
 * string literals.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.template` to customize its `_.assign` use.
 *
 * **Note:** This method is like `assignDefaults` except that it ignores
 * inherited property values when checking if a property is `undefined`.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @param {string} key The key associated with the object and source values.
 * @param {Object} object The destination object.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignOwnDefaults(objectValue, sourceValue, key, object) {
  return (typeof objectValue == 'undefined' || !hasOwnProperty.call(object, key))
    ? sourceValue
    : objectValue;
}

/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is provided it overrides `_.templateSettings` for the template.
 *
 * **Note:** In the development build `_.template` utilizes sourceURLs for easier debugging.
 * See the [HTML5 Rocks article on sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for more details.
 *
 * For more information on precompiling templates see
 * [Lo-Dash's custom builds documentation](http://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](http://developer.chrome.com/stable/extensions/sandboxingEval.html).
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options] The options object.
 * @param {RegExp} [options.escape] The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
 * @param {Object} [options.imports] An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
 * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
 * @param {string} [options.variable] The data object variable name.
 * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
 * @returns {Function} Returns the compiled template function.
 * @example
 *
 * // using the "interpolate" delimiter to create a compiled template
 * var compiled = _.template('hello <%= name %>');
 * compiled({ 'name': 'fred' });
 * // => 'hello fred'
 *
 * // using the HTML "escape" delimiter to escape data property values
 * var compiled = _.template('<b><%- value %></b>');
 * compiled({ 'value': '<script>' });
 * // => '<b>&lt;script&gt;</b>'
 *
 * // using the "evaluate" delimiter to execute JavaScript and generate HTML
 * var compiled = _.template('<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>');
 * compiled({ 'people': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // using the internal `print` function in "evaluate" delimiters
 * var compiled = _.template('<% print("hello " + name); %>!');
 * compiled({ 'name': 'barney' });
 * // => 'hello barney!'
 *
 * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
 * var compiled = _.template('hello ${ name }');
 * compiled({ 'name': 'pebbles' });
 * // => 'hello pebbles'
 *
 * // using custom template delimiters
 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
 * var compiled = _.template('hello {{ name }}!');
 * compiled({ 'name': 'mustache' });
 * // => 'hello mustache!'
 *
 * // using backslashes to treat delimiters as plain text
 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
 * compiled({ 'value': 'ignored' });
 * // => '<%- value %>'
 *
 * // using the `imports` option to import `jQuery` as `jq`
 * var text = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
 * compiled({ 'people': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // using the `sourceURL` option to specify a custom sourceURL for the template
 * var compiled = _.template('hello <%= name %>', { 'sourceURL': '/basic/greeting.jst' });
 * compiled(data);
 * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
 *
 * // using the `variable` option to ensure a with-statement isn't used in the compiled template
 * var compiled = _.template('hi <%= data.name %>!', { 'variable': 'data' });
 * compiled.source;
 * // => function(data) {
 *   var __t, __p = '', __e = _.escape;
 *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
 *   return __p;
 * }
 *
 * // using the `source` property to inline compiled templates for meaningful
 * // line numbers in error messages and a stack trace
 * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
 *   var JST = {\
 *     "main": ' + _.template(mainText).source + '\
 *   };\
 * ');
 */
function template(string, options, otherOptions) {
  // based on John Resig's `tmpl` implementation
  // http://ejohn.org/blog/javascript-micro-templating/
  // and Laura Doktorova's doT.js
  // https://github.com/olado/doT
  var settings = templateSettings.imports._.templateSettings || templateSettings;
  options = assign({}, otherOptions || options, settings, assignOwnDefaults);
  string = String(string == null ? '' : string);

  var imports = assign({}, options.imports, settings.imports, assignOwnDefaults),
      importsKeys = keys(imports),
      importsValues = values(imports);

  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";

  // compile the regexp to match each delimiter
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
  , 'g');

  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);

    // escape characters that can't be included in string literals
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    // replace delimiters with snippets
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;

    // the JS engine embedded in Adobe products requires returning the `match`
    // string in order to produce the correct `offset` value
    return match;
  });

  source += "';\n";

  // if `variable` is not specified, wrap a with-statement around the generated
  // code to add the data object to the top of the scope chain
  var variable = options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  // cleanup code by stripping empty strings
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');

  // frame code as the function body
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
       ? ', __e = _.escape'
       : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
        "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';

  var result = attempt(function() {
    return Function(importsKeys, 'return ' + source).apply(undefined, importsValues);
  });

  // provide the compiled function's source by its `toString` method or
  // the `source` property as a convenience for inlining compiled templates
  result.source = source;
  if (isError(result)) {
    throw result;
  }
  return result;
}

module.exports = template;

},{"../internal/reInterpolate":211,"../lang/isError":228,"../object/assign":248,"../object/keys":260,"../object/values":268,"../utility/attempt":292,"./escape":274,"./templateSettings":284}],284:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var escape = require('./escape'),
    reEscape = require('../internal/reEscape'),
    reEvaluate = require('../internal/reEvaluate'),
    reInterpolate = require('../internal/reInterpolate');

/**
 * By default, the template delimiters used by Lo-Dash are similar to those
 * in embedded Ruby (ERB). Change the following template settings to use
 * alternative delimiters.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var templateSettings = {

  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type RegExp
   */
  'escape': reEscape,

  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type RegExp
   */
  'evaluate': reEvaluate,

  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type RegExp
   */
  'interpolate': reInterpolate,

  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type string
   */
  'variable': '',

  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type Object
   */
  'imports': {

    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type Function
     */
    '_': { 'escape': escape }
  }
};

module.exports = templateSettings;

},{"../internal/reEscape":209,"../internal/reEvaluate":210,"../internal/reInterpolate":211,"./escape":274}],285:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var charsLeftIndex = require('../internal/charsLeftIndex'),
    charsRightIndex = require('../internal/charsRightIndex'),
    trimmedLeftIndex = require('../internal/trimmedLeftIndex'),
    trimmedRightIndex = require('../internal/trimmedRightIndex');

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  fred  ');
 * // => 'fred'
 *
 * _.trim('-_-fred-_-', '_-');
 * // => 'fred'
 */
function trim(string, chars) {
  string = string == null ? '' : String(string);
  if (!string) {
    return string;
  }
  if (chars == null) {
    return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
  }
  chars = String(chars);
  return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
}

module.exports = trim;

},{"../internal/charsLeftIndex":184,"../internal/charsRightIndex":185,"../internal/trimmedLeftIndex":216,"../internal/trimmedRightIndex":217}],286:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var charsLeftIndex = require('../internal/charsLeftIndex'),
    trimmedLeftIndex = require('../internal/trimmedLeftIndex');

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimLeft('  fred  ');
 * // => 'fred  '
 *
 * _.trimLeft('-_-fred-_-', '_-');
 * // => 'fred-_-'
 */
function trimLeft(string, chars) {
  string = string == null ? '' : String(string);
  if (!string) {
    return string;
  }
  if (chars == null) {
    return string.slice(trimmedLeftIndex(string))
  }
  chars = String(chars);
  return string.slice(charsLeftIndex(string, chars));
}

module.exports = trimLeft;

},{"../internal/charsLeftIndex":184,"../internal/trimmedLeftIndex":216}],287:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var charsRightIndex = require('../internal/charsRightIndex'),
    trimmedRightIndex = require('../internal/trimmedRightIndex');

/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimRight('  fred  ');
 * // => '  fred'
 *
 * _.trimRight('-_-fred-_-', '_-');
 * // => '-_-fred'
 */
function trimRight(string, chars) {
  string = string == null ? '' : String(string);
  if (!string) {
    return string;
  }
  if (chars == null) {
    return string.slice(0, trimmedRightIndex(string) + 1)
  }
  chars = String(chars);
  return string.slice(0, charsRightIndex(string, chars) + 1);
}

module.exports = trimRight;

},{"../internal/charsRightIndex":185,"../internal/trimmedRightIndex":217}],288:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isObject = require('../lang/isObject'),
    isRegExp = require('../lang/isRegExp');

/** Used to match `RegExp` flags from their coerced string values */
var reFlags = /\w*$/;

/**
 * Truncates `string` if it is longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to truncate.
 * @param {Object|number} [options] The options object or maximum string length.
 * @param {number} [options.length=30] The maximum string length.
 * @param {string} [options.omission='...'] The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
 * @returns {string} Returns the truncated string.
 * @example
 *
 * _.trunc('hi-diddly-ho there, neighborino');
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * _.trunc('hi-diddly-ho there, neighborino', 24);
 * // => 'hi-diddly-ho there, n...'
 *
 * _.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': ' ' });
 * // => 'hi-diddly-ho there,...'
 *
 * _.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': /,? +/ });
 * //=> 'hi-diddly-ho there...'
 *
 * _.trunc('hi-diddly-ho there, neighborino', { 'omission': ' [...]' });
 * // => 'hi-diddly-ho there, neig [...]'
 */
function trunc(string, options) {
  var length = 30,
      omission = '...';

  if (isObject(options)) {
    var separator = 'separator' in options ? options.separator : separator;
    length = 'length' in options ? +options.length || 0 : length;
    omission = 'omission' in options ? String(options.omission) : omission;
  }
  else if (options != null) {
    length = +options || 0;
  }
  string = string == null ? '' : String(string);
  if (length >= string.length) {
    return string;
  }
  var end = length - omission.length;
  if (end < 1) {
    return omission;
  }
  var result = string.slice(0, end);
  if (separator == null) {
    return result + omission;
  }
  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      var match,
          newEnd,
          substring = string.slice(0, end);

      if (!separator.global) {
        separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
      }
      separator.lastIndex = 0;
      while ((match = separator.exec(substring))) {
        newEnd = match.index;
      }
      result = result.slice(0, newEnd == null ? end : newEnd);
    }
  } else if (string.indexOf(separator, end) != end) {
    var index = result.lastIndexOf(separator);
    if (index > -1) {
      result = result.slice(0, index);
    }
  }
  return result + omission;
}

module.exports = trunc;

},{"../lang/isObject":238,"../lang/isRegExp":240}],289:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to match HTML entities and HTML characters */
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g;

/** Used to convert HTML entities to characters */
var htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#96;': '`'
};

/**
 * Used by `_.unescape` to convert HTML entities to characters.
 *
 * @private
 * @param {string} chr The matched character to unescape.
 * @returns {string} Returns the unescaped character.
 */
function unescapeHtmlChar(chr) {
  return htmlUnescapes[chr];
}

/**
 * The inverse of `_.escape`; this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
 * corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional HTML
 * entities use a third-party library like [_he_](http://mths.be/he).
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @example
 *
 * _.unescape('fred, barney &amp; pebbles');
 * // => 'fred, barney & pebbles'
 */
function unescape(string) {
  string = string == null ? '' : String(string);
  return (reEscapedHtml.lastIndex = 0, reEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, unescapeHtmlChar)
    : string;
}

module.exports = unescape;

},{}],290:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to detect DOM support */
var document = (document = global.window) && document.document;

/** Native method references */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lang/isNative":233}],291:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'attempt': require('./utility/attempt'),
  'callback': require('./utility/callback'),
  'constant': require('./utility/constant'),
  'identity': require('./utility/identity'),
  'iteratee': require('./utility/callback'),
  'matches': require('./utility/matches'),
  'mixin': require('./utility/mixin'),
  'noConflict': require('./utility/noConflict'),
  'noop': require('./utility/noop'),
  'now': require('./utility/now'),
  'parseInt': require('./utility/parseInt'),
  'property': require('./utility/property'),
  'random': require('./utility/random'),
  'range': require('./utility/range'),
  'result': require('./utility/result'),
  'times': require('./utility/times'),
  'uniqueId': require('./utility/uniqueId'),
  'uuid': require('./utility/uuid')
};

},{"./utility/attempt":292,"./utility/callback":293,"./utility/constant":294,"./utility/identity":295,"./utility/matches":296,"./utility/mixin":297,"./utility/noConflict":298,"./utility/noop":299,"./utility/now":300,"./utility/parseInt":301,"./utility/property":302,"./utility/random":303,"./utility/range":304,"./utility/result":305,"./utility/times":306,"./utility/uniqueId":307,"./utility/uuid":308}],292:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isError = require('../lang/isError');

/**
 * Attempts to invoke `func`, returning either the result or the caught
 * error object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} func The function to attempt.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // avoid throwing errors for invalid selectors
 * var elements = _.attempt(function() {
 *   return document.querySelectorAll(selector);
 * });
 *
 * if (_.isError(elements)) {
 *   elements = [];
 * }
 */
function attempt(func) {
  try {
    return func();
  } catch(e) {
    return isError(e) ? e : Error(e);
  }
}

module.exports = attempt;

},{"../lang/isError":228}],293:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/**
 * Creates a function bound to an optional `thisArg`. If `func` is a property
 * name the created callback returns the property value for a given element.
 * If `func` is an object the created callback returns `true` for elements
 * that contain the equivalent object properties, otherwise it returns `false`.
 *
 * @static
 * @memberOf _
 * @alias iteratee
 * @category Utility
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // wrap to create custom callback shorthands
 * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
 *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
 *   if (!match) {
 *     return callback(func, thisArg);
 *   }
 *   return function(object) {
 *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
 *   };
 * });
 *
 * _.filter(characters, 'age__gt38');
 * // => [{ 'name': 'fred', 'age': 40 }]
 */
function callback(func, thisArg) {
  return baseCallback(func, thisArg);
}

module.exports = callback;

},{"../internal/baseCallback":153}],294:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'name': 'fred' };
 * var getter = _.constant(object);
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],295:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],296:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseClone = require('../internal/baseClone'),
    baseIsEqual = require('../internal/baseIsEqual'),
    isStrictComparable = require('../internal/isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a "_.where" style predicate function which performs a deep comparison
 * between a given object and the `source` object, returning `true` if the given
 * object has equivalent property values, else `false`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'fred',   'age': 40 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * var matchesAge = _.matches({ 'age': 36 });
 *
 * _.filter(characters, matchesAge);
 * // => [{ 'name': 'barney', 'age': 36 }]
 *
 * _.find(characters, matchesAge);
 * // => { 'name': 'barney', 'age': 36 }
 */
function matches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && value === object[key] && hasOwnProperty.call(object, key);
      };
    }
  }
  var index = length,
      flags = Array(length),
      vals = Array(length);

  while (index--) {
    value = source[props[index]];
    var isStrict = isStrictComparable(value);

    flags[index] = isStrict;
    vals[index] = isStrict ? value : baseClone(value);
  }
  return function(object) {
    index = length;
    if (object == null) {
      return !index;
    }
    while (index--) {
      if (flags[index] ? vals[index] !== object[props[index]] : !hasOwnProperty.call(object, props[index])) {
        return false;
      }
    }
    index = length;
    while (index--) {
      if (flags[index] ? !hasOwnProperty.call(object, props[index]) : !baseIsEqual(vals[index], object[props[index]], null, true)) {
        return false;
      }
    }
    return true;
  };
}

module.exports = matches;

},{"../internal/baseClone":154,"../internal/baseIsEqual":171,"../internal/isStrictComparable":203,"../object/keys":260}],297:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseFunctions = require('../internal/baseFunctions'),
    isFunction = require('../lang/isFunction'),
    isObject = require('../lang/isObject'),
    keys = require('../object/keys');

/** Used for native method references */
var arrayProto = Array.prototype;

/** Native method references */
var push = arrayProto.push;

/**
 * Adds all own enumerable function properties of a source object to the
 * destination object. If `object` is a function then methods are added to
 * its prototype as well.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Function|Object} [object=this] object The destination object.
 * @param {Object} source The object of functions to add.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.chain=true] Specify whether the functions added
 *  are chainable.
 * @returns {Function|Object} Returns `object`.
 * @example
 *
 * function vowels(string) {
 *   return _.filter(string, function(v) {
 *     return /[aeiou]/i.test(v);
 *   });
 * }
 *
 * _.mixin({ 'vowels': vowels });
 * _.vowels('fred');
 * // => ['e']
 *
 * _('fred').vowels().value();
 * // => ['e']
 *
 * _.mixin({ 'vowels': vowels }, { 'chain': false });
 * _('fred').vowels();
 * // => ['e']
 */
function mixin(object, source, options) {
  var chain = true,
      isObj = isObject(source),
      noOpts = options == null,
      props = noOpts && isObj && keys(source),
      methodNames = props && baseFunctions(source, props);

  methodNames || (methodNames = baseFunctions(source, keys(source)));
  if (options === false) {
    chain = false;
  } else if (isObject(options) && 'chain' in options) {
    chain = options.chain;
  }
  var index = -1,
      isFunc = isFunction(object),
      length = methodNames.length;

  while (++index < length) {
    var methodName = methodNames[index],
        func = object[methodName] = source[methodName];

    if (isFunc) {
      object.prototype[methodName] = (function(func) {
        return function() {
          var chainAll = this.__chain__,
              value = this.__wrapped__,
              args = [value];

          push.apply(args, arguments);
          var result = func.apply(object, args);
          if (chain || chainAll) {
            if (value === result && isObject(result)) {
              return this;
            }
            result = new object(result);
            result.__chain__ = chainAll;
          }
          return result;
        };
      }(func));
    }
  }
  return object;
}

module.exports = mixin;

},{"../internal/baseFunctions":169,"../lang/isFunction":231,"../lang/isObject":238,"../object/keys":260}],298:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to restore the original `_` reference in `_.noConflict` */
var oldDash = global._;

/**
 * Reverts the `_` variable to its previous value and returns a reference to
 * the `lodash` function.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @returns {Function} Returns the `lodash` function.
 * @example
 *
 * var lodash = _.noConflict();
 */
function noConflict() {
  global._ = oldDash;
  return this;
}

module.exports = noConflict;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],299:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

module.exports = noop;

},{}],300:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../lang/isNative');

/* Native method references for those with the same name as other `lodash` methods */
var nativeNow = isNative(nativeNow = Date.now) && nativeNow;

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Utility
 * @example
 *
 * _.defer(function(stamp) { console.log(_.now() - stamp); }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

module.exports = now;

},{"../lang/isNative":233}],301:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var trim = require('../string/trim');

/** Used to detect hexadecimal string values */
var reHexPrefix = /^0[xX]/;

/** Used to detect and test whitespace */
var whitespace = (
  // whitespace
  ' \t\x0B\f\xA0\ufeff' +

  // line terminators
  '\n\r\u2028\u2029' +

  // unicode category "Zs" space separators
  '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
);

/* Native method references for those with the same name as other `lodash` methods */
var nativeParseInt = global.parseInt;

/**
 * Converts `value` to an integer of the specified radix. If `radix` is
 * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
 * in which case a `radix` of `16` is used.
 *
 * **Note:** This method avoids differences in native ES3 and ES5 `parseInt`
 * implementations. See the [ES5 spec](http://es5.github.io/#E)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} value The value to parse.
 * @param {number} [radix] The radix to interpret `value` by.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.parseInt('08');
 * // => 8
 */
function parseInt(value, radix, guard) {
  return nativeParseInt(value, guard ? 0 : radix);
}
// fallback for environments with pre-ES5 implementations
if (nativeParseInt(whitespace + '08') != 8) {
  parseInt = function(value, radix, guard) {
    // Firefox < 21 and Opera < 15 follow ES3 for `parseInt` and
    // Chrome fails to trim leading <BOM> whitespace characters.
    // See https://code.google.com/p/v8/issues/detail?id=3109
    value = trim(value);
    radix = guard ? 0 : +radix;
    return nativeParseInt(value, radix || (reHexPrefix.test(value) ? 16 : 10));
  };
}

module.exports = parseInt;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../string/trim":285}],302:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates a "_.pluck" style function which returns the `key` value of a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} key The name of the property to retrieve.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'fred',   'age': 40 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * var getName = _.property('name');
 *
 * _.map(characters, getName);
 * // => ['barney', 'fred']
 *
 * _.sortBy(characters, getName);
 * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
 */
function property(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = property;

},{}],303:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseRandom = require('../internal/baseRandom');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMin = Math.min,
    nativeRandom = Math.random;

/**
 * Produces a random number between `min` and `max` (inclusive). If only one
 * argument is provided a number between `0` and the given number is returned.
 * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
 * number is returned instead of an integer.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {number} [min=0] The minimum possible value.
 * @param {number} [max=1] The maximum possible value.
 * @param {boolean} [floating=false] Specify returning a floating-point number.
 * @returns {number} Returns the random number.
 * @example
 *
 * _.random(0, 5);
 * // => an integer between 0 and 5
 *
 * _.random(5);
 * // => also an integer between 0 and 5
 *
 * _.random(5, true);
 * // => a floating-point number between 0 and 5
 *
 * _.random(1.2, 5.2);
 * // => a floating-point number between 1.2 and 5.2
 */
function random(min, max, floating) {
  // enables use as a callback for functions like `_.map`
  var type = typeof max;
  if ((type == 'number' || type == 'string') && floating && floating[max] === min) {
    max = floating = null;
  }
  var noMin = min == null,
      noMax = max == null;

  if (floating == null) {
    if (noMax && typeof min == 'boolean') {
      floating = min;
      min = 1;
    }
    else if (typeof max == 'boolean') {
      floating = max;
      noMax = true;
    }
  }
  if (noMin && noMax) {
    max = 1;
    noMax = false;
  }
  min = +min || 0;
  if (noMax) {
    max = min;
    min = 0;
  } else {
    max = +max || 0;
  }
  if (floating || min % 1 || max % 1) {
    var rand = nativeRandom();
    return nativeMin(min + (rand * (max - min + parseFloat('1e-' + (String(rand).length - 1)))), max);
  }
  return baseRandom(min, max);
}

module.exports = random;

},{"../internal/baseRandom":174}],304:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Native method references */
var ceil = Math.ceil;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to but not including `end`. If `start` is less than `stop` a
 * zero-length range is created unless a negative `step` is specified.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the new array of numbers.
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
function range(start, end, step) {
  start = +start || 0;

  // enables use as a callback for functions like `_.map`
  var type = typeof end;
  if ((type == 'number' || type == 'string') && step && step[end] === start) {
    end = step = null;
  }
  step = step == null ? 1 : (+step || 0);

  if (end == null) {
    end = start;
    start = 0;
  } else {
    end = +end || 0;
  }
  // use `Array(length)` so engines like Chakra and V8 avoid slower modes
  // http://youtu.be/XAqIpGU8ZZk#t=17m25s
  var index = -1,
      length = nativeMax(ceil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (++index < length) {
    result[index] = start;
    start += step;
  }
  return result;
}

module.exports = range;

},{}],305:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../lang/isFunction');

/**
 * Resolves the value of property `key` on `object`. If `key` is a function
 * it is invoked with the `this` binding of `object` and its result returned,
 * else the property value is returned. If `object` is `null` or `undefined`
 * then `undefined` is returned. If a default value is provided it is returned
 * if the property value resolves to `undefined`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Object} object The object to inspect.
 * @param {string} key The name of the property to resolve.
 * @param {*} [defaultValue] The value returned if the property value
 *  resolves to `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = {
 *   'name': 'fred',
 *   'age': function() {
 *     return 40;
 *   }
 * };
 *
 * _.result(object, 'name');
 * // => 'fred'
 *
 * _.result(object, 'age');
 * // => 40
 *
 * _.result(object, 'employer', 'slate');
 * // => 'slate'
 */
function result(object, key, defaultValue) {
  var value = object == null ? undefined : object[key];
  if (typeof value == 'undefined') {
    return defaultValue;
  }
  return isFunction(value) ? object[key]() : value;
}

module.exports = result;

},{"../lang/isFunction":231}],306:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/** Used as a reference for the max length of an array */
var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite,
    nativeMin = Math.min;

/**
 * Invokes the iteratee function `n` times, returning an array of the results
 * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
 * one argument; (index).
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
 * // => [3, 6, 4]
 *
 * _.times(3, function(n) { mage.castSpell(n); });
 * // => invokes `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
 *
 * _.times(3, function(n) { this.cast(n); }, mage);
 * // => also invokes `mage.castSpell(n)` three times
 */
function times(n, iteratee, thisArg) {
  n = nativeIsFinite(n = +n) && n > -1 ? n : 0;
  iteratee = baseCallback(iteratee, thisArg, 1);

  var index = -1,
      result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

  while (++index < n) {
    if (index < MAX_ARRAY_LENGTH) {
      result[index] = iteratee(index);
    } else {
      iteratee(index);
    }
  }
  return result;
}

module.exports = times;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseCallback":153}],307:[function(require,module,exports){
/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to generate unique IDs */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is provided the ID is appended to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} [prefix] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return String(prefix == null ? '' : prefix) + id;
}

module.exports = uniqueId;

},{}],308:[function(require,module,exports){
'use strict';

var __cache = [];

var __uuid4 = function (a, b)
{
	for (b = a = ''; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-');
	return b;
};

var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
function e7()
{
var d0 = Math.random()*0xffffffff|0;
var d1 = Math.random()*0xffffffff|0;
var d2 = Math.random()*0xffffffff|0;
var d3 = Math.random()*0xffffffff|0;
return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
  lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
  lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
  lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
}

/**	
 * Returns random (v4) UUID
 *
 * @method
 * @memberof ash
 * @returns {string} Returns a UUID.
 **/
function uuid()
{
	var id;
	
	do
	{
		id = __uuid4();
	}
	while (__cache[id]);

	__cache.push(id);

	return id;
} // uuid

//window.__cache = __cache;

//return __uuid4;
module.exports = e7;
},{}],309:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1]);
