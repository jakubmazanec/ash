(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines */

// import $ from 'jquery';
// import _ from 'lodash-fp';
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

// var promise1 = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve('promise 1 resolved!');
// 	}, 2000);
// });

// var promise2 = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve('promise 2 resolved!');
// 	}, 4000);
// });

// var promise1 = 'no promise 1';
// var promise2 = 'no promise 2';

// var foo$ = flyd.stream();

// console.log(foo$);

// foo$(promise1);
// foo$(promise2);

// flyd.stream([foo$], function() {
// 	console.log('Recieved response!', arguments);
// 	console.log(foo$());
// });

// var foo$ = new ash.Stream();

// console.log(foo$);

// foo$.push(promise1);

// foo$.push(promise2);

// benchmark
// const MAX = 100000;

// var foo$ = new ash.Stream();

// $('body').on('click', () => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		foo$.push(i);
// 	}
// });

// setTimeout(() => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		foo$.push(i);
// 	}
// }, 1000);

// var bar$ = ash.Stream.from(() => {
// 	if (foo$.get() >= MAX) {
// 		console.log('ash Done!', MAX, foo$.get());
// 	}
// }, foo$);

// var testStream = new rx.ReplaySubject();

// setTimeout(() => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		testStream.onNext(i);
// 	}
// }, 1500);

// var resultStream = testStream.subscribe((value) => {
// 	if (value >= MAX) {
// 		console.log('rx Done!', MAX, value);
// 	}
// });

// merge test
/*var btn1Clicks = new ash.Stream();
var btn2Clicks = new ash.Stream();

btn1Clicks.name = 'btn1Clicks';
btn2Clicks.name = 'btn2Clicks';

// console.log(btn1Clicks);

$('body').on('click', btn1Clicks.push);
$('body').on('keydown', btn2Clicks.push);

var allClicks = ash.Stream.merge(btn1Clicks, btn2Clicks);

allClicks.name = 'allClicks';

allClicks.subscribe(() => {
	console.log('allClicks subscription!');
})


var resultStream = new ash.Stream();

resultStream.name = 'resultStream';


resultStream.from(() => {
	// console.log(btn1Clicks.end.get(), btn2Clicks.end.get(), allClicks.end.get());
 //  console.log(allClicks.get());
}, allClicks);

setTimeout(() => {
	console.log('btn1Clicks end!');
	btn1Clicks.end.push(true);
}, 2000);

setTimeout(() => {
	console.log('btn2Clicks end!');
	// btn2Clicks.end.push(true);
}, 4000);

setInterval(() => {
	// console.log(btn1Clicks.end.get(), btn2Clicks.end.get(), allClicks.end.get());
}, 250);*/

/*var btn1Clicks = flyd.stream();
var btn2Clicks = flyd.stream();

$('body').on('click', btn1Clicks);
$('body').on('keydown', btn2Clicks);

var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
var resultStream = flyd.stream([allClicks], () => {
	console.log(btn1Clicks.end(), btn2Clicks.end(), allClicks.end());
  console.log(allClicks());
});

setTimeout(() => {
	console.log('btn1Clicks end!');
	btn1Clicks.end(true);
}, 2000);

setTimeout(() => {
	console.log('btn2Clicks end!');
	btn2Clicks.end(true);
}, 4000);

setInterval(() => {
	console.log(btn1Clicks.end(), btn2Clicks.end(), allClicks.end());
}, 250);*/

/*var foo$ = flyd.stream([], () => 'oi!');

flyd.stream([foo$], function() {
	console.log('Recieved response!');
	console.log(foo$());
});*/

// var foo$ = new ash.Stream(() => 'oi!');

// console.log(foo$);

// var bar$ = new ash.Stream([foo$], function() {
// 	console.log('Recieved response!', arguments);
// 	console.log(foo$.get());
// });

// console.log(bar$);

// mappign test
/*var numbers = new ash.Stream();
var squaredNumbers = numbers.map((n) => Math.round(n));

setInterval(() => {
	numbers.push(Math.random());
}, 1000);

new ash.Stream([squaredNumbers], () => {
	console.log(squaredNumbers.get());
});*/

/*var numbers = flyd.stream(0);
var squaredNumbers = flyd.map(function(n) { return n * n; }, numbers);


flyd.stream([squaredNumbers], () => {
	console.log(squaredNumbers());
});*/

// atomic updates test
/*var a = new ash.Stream();
var b = new ash.Stream();

a.push(1);
b.push(2);

var b = new ash.Stream();

b.from(() => {
	return a.get() * 2;
}, a);

var c = new ash.Stream();

c.from(() => {
	return a.get() + 4;
}, a);

var d = new ash.Stream();

d.from(function(self, ch) {
  console.log(b.get(), c.get(), b.get() + c.get());
  // a.end.push(true);
}, b, c);

console.log(d);*/

// var a = flyd.stream(1);

// setTimeout(() => a(2), 500);

// var b = flyd.stream([a], function() { console.log(arguments); return a() * 2; });
// var c = flyd.stream([a], function() { console.log(arguments); return a() + 4; });
// var d = flyd.stream([b, c], function(self, ch) {
// 	console.log(arguments);
//   console.log(b() + c());
// });

// end stream test
/*var n1 = new ash.Stream();
var n2 = new ash.Stream();
var sum = new ash.Stream();

setInterval(() => {
	n1.push(1);
}, 500);

setInterval(() => {
	n2.push(2);
}, 600);

sum.from(() => {
	console.log(n1.get(), n2.get());
}, n1, n2);

$('body').on('click', (event) => {
	event.preventDefault();

	console.log('ending n1!');

	n1.end.push(true);
});

$('body').on('keydown', () => {
	console.log('ending n2!');

	n2.end.push(true);
});*/

/*var n1 = flyd.stream();
var n2 = flyd.stream();
var sum = flyd.stream([n1, n2], function() {
  console.log(n1(), n2());

  return n1() + n2();
});

n1.foo = 'n1';
n2.foo = 'n2';
sum.foo = 'sum';

console.log(n1, n2, sum);

setInterval(() => {
	n1(1);
}, 500);

setInterval(() => {
	n2(2);
}, 600);


$('body').on('click', (event) => {
	event.preventDefault();

	console.log('ending n1!');

	n1.end(true);
});

$('body').on('keydown', () => {
	console.log('ending n2!');

	n2.end(true);
});*/

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

// import flyd from 'flyd';
// import rx from 'rx';

// global.$ = $;
// global._ = _;
global.ash = _ash2.default;
// global.flyd = flyd;
// global.rx = rx;

var Renderer = global.Renderer = new _ash2.default.Renderer();

console.log('ash.js start...');
function _ref(value, index) {
	return _ash2.default.e(
		'button',
		{ key: '' + index /* events={{click: this.hello.bind(null, index, value)}}*/ },
		'' + value
	);
}

var ReorderApp = (function (_ash$Component) {
	function ReorderApp() {
		_classCallCheck(this, ReorderApp);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = {
			reversed: false,
			items: []
		};
	}

	_inherits(ReorderApp, _ash$Component);

	_createClass(ReorderApp, [{
		key: 'render',
		value: function render() {
			var items = this.state.items.map(_ref);

			if (this.state.reversed) {}

			return _ash2.default.e(
				'div',
				null,
				_ash2.default.e('button', { key: 'btn', events: {
						click: this.addItem
					} }),
				this.state.reversed ? _ash2.default.e(
					'b',
					null,
					'!'
				) : null,
				_ash2.default.e(
					'div',
					{ key: 'inr' },
					this.state.reversed ? _ash2.default.e(
						'b',
						null,
						'!'
					) : null,
					_ash2.default.e(
						'div',
						{ key: 'itm' },
						items
					)
				)
			);
		}
	}, {
		key: 'addItem',
		value: function addItem() {
			console.log('adding item...');

			this.state.items.push('' + (Math.random() * 100 >> 0));
			this.state.reversed = !this.state.reversed;

			this.isDirty = true;
		}
	}, {
		key: 'hello',
		value: function hello(index, value) {
			console.log('Hello, this is', value, 'at', index);
		}
	}]);

	return ReorderApp;
})(_ash2.default.Component);

var viewStream = _ash2.default.AshNodeStream.from(_ash2.default.e(_componentsApp2.default, null));
// var viewStream = ash.AshNodeStream.from(<ReorderApp />);

console.log('viewStream', viewStream);

Renderer.addStream(viewStream, global.document.querySelector('.page'));

// items = items.reverse();
/*'' + this.state.reversed*/
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/App":44,"ash":46}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createAshElementTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsAshElement = require('../internals/isAshElement');

var _internalsIsAshElement2 = _interopRequireDefault(_internalsIsAshElement);

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;

function walkCreateAshElementTree(ashElement, owner, index) {
	// type check
	if (!(0, _internalsIsComponentAshElement2.default)(owner)) {
		throw new Error(owner + ' must be a Component type AshElement Object');
	}

	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.index = index;

		// set up owner & stream
		ashElement.owner = owner;
		ashElement.stream = owner.stream;

		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				// set up parent
				ashElement.children[i].parent = ashElement;

				// walk the child
				walkCreateAshElementTree(ashElement.children[i], owner, i);
			}
		}
	} else if ((0, _internalsIsComponentAshElement2.default)(ashElement)) {
		// instantiate ashElement
		ashElement.instantiate();

		// set up ordering properties
		ashElement.index = index;

		// set up owner
		ashElement.owner = owner;
		ashElement.stream = owner.stream;

		// create child by rendering component
		ashElement.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElement.children[0] = ashElement.instance.render();

		if (ashElement.children[0]) {
			// set up parent
			ashElement.children[0].parent = ashElement;

			// walk the child
			walkCreateAshElementTree(ashElement.children[0], ashElement, 0);
		}
	}
}

function createAshElementTree(rootAshElement, stream /*, startingLevel*/) {
	// type check
	if (!(0, _internalsIsAshElement2.default)(rootAshElement)) {
		throw new Error(rootAshElement + ' must be a AshElement object.');
	}

	if (!stream) {
		throw new Error(stream + ' must be an object.');
	}

	var ashElementTree = rootAshElement;

	ashElementTree.stream = stream;
	ashElementTree.isRoot = true;

	if ((0, _internalsIsComponentAshElement2.default)(ashElementTree)) {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.index = typeof ashElementTree.index === 'undefined' ? 0 : ashElementTree.index;

		// create child by rendering component
		ashElementTree.instance.__lifecycle = LIFECYCLE_MOUNTING;
		ashElementTree.children[0] = ashElementTree.instance.render();

		// set up a parent
		if (ashElementTree.children[0]) {
			ashElementTree.children[0].parent = ashElementTree;
		}

		// walk the child
		walkCreateAshElementTree(ashElementTree.children[0], ashElementTree, 0);
	} else {
		// instantiate descriptor
		ashElementTree.instantiate();

		// set up ordering properties
		ashElementTree.index = typeof ashElementTree.index === 'undefined' ? 0 : ashElementTree.index;

		for (var i = 0; i < ashElementTree.children.length; i++) {
			// set up a parent
			ashElementTree.children[i].parent = ashElementTree;

			// walk the child
			walkCreateAshElementTree(ashElementTree.children[i], ashElementTree.owner, i);
		}
	}

	// return resulting descriptor tree
	return ashElementTree;
}

module.exports = exports.default;
},{"../internals/constants":20,"../internals/isAshElement":23,"../internals/isAshNodeAshElement":25,"../internals/isComponentAshElement":27}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsIsAshNode = require('../internals/isAshNode');

var _internalsIsAshNode2 = _interopRequireDefault(_internalsIsAshNode);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function cloneAshNode(ashNodeAshElement) {
	if ((0, _internalsIsAshNode2.default)(ashNodeAshElement.instance)) {
		return {
			id: ashNodeAshElement.instance.id,
			index: ashNodeAshElement.instance.index,
			indices: ashNodeAshElement.instance.indices,
			type: ashNodeAshElement.instance.type,
			streamId: ashNodeAshElement.stream.id,
			tagName: ashNodeAshElement.instance.tagName,
			key: ashNodeAshElement.instance.key,
			properties: ashNodeAshElement.instance.properties,
			children: []
		};
	} else {
		return {
			id: ashNodeAshElement.instance.id,
			index: ashNodeAshElement.instance.index,
			indices: ashNodeAshElement.instance.indices,
			type: ashNodeAshElement.instance.type,
			streamId: ashNodeAshElement.stream.id,
			text: ashNodeAshElement.instance.text };
	}
}

function walkCreateAshNodeTree(ashNodeTree, ashElement, index, parentId, isParentDirty, parentIndices) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		// set up ordering properties
		ashElement.instance.id = parentId + INDEX_SEPARATOR + index;
		ashElement.instance.index = index;
		ashElement.instance.indices = parentIndices.concat(index);

		// clone virtual node
		var clonedAshNode = cloneAshNode(ashElement);

		// is parent component dirty?
		clonedAshNode.isDirty = isParentDirty;

		// add child
		clonedAshNode.parent = ashNodeTree;
		ashNodeTree.children.push(clonedAshNode);

		// walk the children
		for (var i = 0; i < ashElement.children.length; i++) {
			walkCreateAshNodeTree(ashNodeTree.children[ashNodeTree.children.length - 1], ashElement.children[i], i, ashNodeTree.children[ashNodeTree.children.length - 1].id, isParentDirty, ashNodeTree.children[ashNodeTree.children.length - 1].indices);
		}
	} else if (ashElement && ashElement.children[0]) {
		var isDirty = ashElement.isDirty;

		ashElement.isDirty = false;

		walkCreateAshNodeTree(ashNodeTree, ashElement.children[0], index, parentId, isDirty, parentIndices);
	}
}

function createAshNodeTree(componentAshElement) {
	// type check
	if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
		throw new Error(componentAshElement + ' must be a Component Descriptor object.');
	}

	var ashElement = componentAshElement;
	var ashNodeTree = undefined;
	var isDirty = ashElement.isDirty;

	ashElement.isDirty = false;

	// find first children Virtual Node ashElement
	while (!(0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		ashElement = ashElement.children[0];
	}

	// set up ordering properties
	ashElement.instance.id = '0';
	ashElement.instance.index = 0;
	ashElement.instance.indices = [0];

	// set up ash node tree
	ashNodeTree = cloneAshNode(ashElement);
	ashNodeTree.parent = null;

	// is parent component dirty?
	ashNodeTree.isDirty = isDirty;

	// walk the children
	for (var i = 0; i < ashElement.children.length; i++) {
		walkCreateAshNodeTree(ashNodeTree, ashElement.children[i], i, ashNodeTree.id, isDirty, ashNodeTree.indices);
	}

	return ashNodeTree;
}

exports.default = createAshNodeTree;
module.exports = exports.default;
},{"../internals/constants":20,"../internals/isAshNode":24,"../internals/isAshNodeAshElement":25,"../internals/isComponentAshElement":27}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsAshTextNode = require('../internals/isAshTextNode');

var _internalsIsAshTextNode2 = _interopRequireDefault(_internalsIsAshTextNode);

var _setNodeProperties = require('./setNodeProperties');

var _setNodeProperties2 = _interopRequireDefault(_setNodeProperties);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var STREAM_ID_ATTRIBUTE_NAME = _internalsConstants2.default.STREAM_ID_ATTRIBUTE_NAME;

function createNodeTree(ashNodeTree) {
	var nodeTree;
	var child;

	if ((0, _internalsIsAshTextNode2.default)(ashNodeTree)) {
		nodeTree = global.document.createTextNode(ashNodeTree.text);
		nodeTree[ID_ATTRIBUTE_NAME] = ashNodeTree.id;
		nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
		nodeTree[STREAM_ID_ATTRIBUTE_NAME] = ashNodeTree.streamId;

		return nodeTree;
	}

	// create element
	if (ashNodeTree.tagName === 'svg' || ashNodeTree.tagName === 'use' || ashNodeTree.tagName === 'path' || ashNodeTree.tagName === 'circle' || ashNodeTree.tagName === 'text' || ashNodeTree.tagName === 'ellipse' || ashNodeTree.tagName === 'line' || ashNodeTree.tagName === 'polygon' || ashNodeTree.tagName === 'polyline' || ashNodeTree.tagName === 'rect' || ashNodeTree.tagName === 'g') {
		nodeTree = global.document.createElementNS('http://www.w3.org/2000/svg', ashNodeTree.tagName);
	} else {
		nodeTree = global.document.createElement(ashNodeTree.tagName);
	}

	// set properties
	nodeTree[ID_ATTRIBUTE_NAME] = ashNodeTree.id;
	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[STREAM_ID_ATTRIBUTE_NAME] = ashNodeTree.streamId;

	(0, _setNodeProperties2.default)(nodeTree, ashNodeTree.properties, true);
	// $(nodeTree).attr('nodeId', nodeTree[ID_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);
	//$(nodeTree).attr('index', nodeTree[INDEX_ATTRIBUTE_NAME]/* + ' - ' + ashNodeTree.key*/);

	for (var i = 0; i < ashNodeTree.children.length; i++) {
		child = createNodeTree(ashNodeTree.children[i]);

		if (child) {
			nodeTree.appendChild(child);
		}
	}

	return nodeTree;
}

exports.default = createNodeTree;
module.exports = exports.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internals/constants":20,"../internals/isAshTextNode":26,"./setNodeProperties":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = diffAshNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var PATCH_ASH_NODE = _internalsConstants2.default.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = _internalsConstants2.default.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = _internalsConstants2.default.PATCH_PROPERTIES;
var PATCH_ORDER = _internalsConstants2.default.PATCH_ORDER;
var PATCH_INSERT = _internalsConstants2.default.PATCH_INSERT;
var PATCH_REMOVE = _internalsConstants2.default.PATCH_REMOVE;

function diffChildren(oldChildren, newChildren, oldAshNode, newAshNode, patches) {
	// lets fill in keys, if needed; simple first-to-first correspondence
	var oldChildIndex = 0;
	var newChildIndex = 0;
	var lastKey = 0;
	var key = '__key:' + lastKey + '__';
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
		key = '__key:' + lastKey + '__';
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
	var foundIndex = undefined;

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
			if (i !== foundIndex) {
				patches.push({
					type: PATCH_ORDER,
					newId: newChildren[foundIndex].id,
					id: oldChildren[i].id,
					indices: oldChildren[i].indices,
					streamId: oldChildren[i].streamId,
					index: foundIndex
				});

				for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
					if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
						patches.maxIndex = patches[patches.length - 1].indices[k];
					}
				}
			}

			// now walk inside those children...
			diffAshNodeTree(oldChildren[i], newChildren[foundIndex], patches);
		} else {
			// node is to be removed...
			patches.push({
				type: PATCH_REMOVE,
				id: oldChildren[i].id,
				indices: oldChildren[i].indices,
				streamId: oldChildren[i].streamId });

			for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
					patches.maxIndex = patches[patches.length - 1].indices[k];
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
				node: newChildren[j],
				id: newChildren[j].id,
				indices: newChildren[j].indices,
				// parentId: newChildren[j].parent.id,
				// parentIndices: newChildren[j].parent.indices,
				// parentId: oldChildren[0].parent.id,
				// parentIndices: oldChildren[0].parent.indices,
				parentId: oldAshNode.id,
				parentIndices: oldAshNode.indices });

			for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
				if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
					patches.maxIndex = patches[patches.length - 1].indices[k];
				}
			}

			// let parentIndex = newChildren[j].index2;
			// let parentIndices = newChildren[j].indices.slice(0, -1);

			// let parentIndex = parseAshNodeIndex(newChildren[j].index);
			// console.log(newChildren[j].index, JSON.stringify(parentIndex), JSON.stringify(newChildren[j].index2));

			// parentIndex.pop();
			// patches[patches.length - 1].parentIndices = parentIndices;
			// patches[patches.length - 1].parentId = parentIndices.join(INDEX_SEPARATOR);

			// console.log(newChildren[j].index, JSON.stringify(parentIndex), JSON.stringify(newChildren[j].index2));
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

	if (typeof patches.maxIndex === 'undefined') {
		patches.maxIndex = 1;
	}

	if (typeof patches.streamId === 'undefined') {
		patches.streamId = oldAshNode.streamId;
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
			if (typeof newAshNode.properties[newProperty] === 'object' && oldAshNode.properties[newProperty] && typeof oldAshNode.properties[newProperty] === 'object') {
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
					if (oldAshNode.properties[newProperty].hasOwnProperty(oldSubproperty) && typeof newAshNode.properties[newProperty][oldSubproperty] === 'undefined') {
						propertiesToRemove.push(newProperty + '.' + oldSubproperty);

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
		if (oldAshNode.properties.hasOwnProperty(oldProperty) && newAshNode.properties && typeof newAshNode.properties[oldProperty] === 'undefined') {
			differentProperties = true;
			propertiesToRemove.push(oldProperty);
		}
	}

	if (oldAshNode.type !== newAshNode.type || oldAshNode.tagName !== newAshNode.tagName) {
		patches.push({
			type: PATCH_ASH_NODE,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			streamId: oldAshNode.streamId,
			node: newAshNode
		});

		for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
				patches.maxIndex = patches[patches.length - 1].indices[k];
			}
		}

		// whole node must be replaced; no sense in finding other differences
		return patches;
	}

	if (oldAshNode.text !== newAshNode.text) {
		patches.push({
			type: PATCH_ASH_TEXT_NODE,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			text: newAshNode.text
		});

		for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
				patches.maxIndex = patches[patches.length - 1].indices[k];
			}
		}
	}

	if (differentProperties) {
		patches.push({
			type: PATCH_PROPERTIES,
			id: oldAshNode.id,
			indices: oldAshNode.indices,
			streamId: oldAshNode.streamId,
			propertiesToChange: propertiesToChange,
			propertiesToRemove: propertiesToRemove
		});

		for (var k = 0; k < patches[patches.length - 1].indices.length; k++) {
			if (patches.maxIndex < patches[patches.length - 1].indices[k]) {
				patches.maxIndex = patches[patches.length - 1].indices[k];
			}
		}
	}

	// diff the children...
	if (!((!oldAshNode.children || !oldAshNode.children.length) && (!newAshNode.children || !newAshNode.children.length))) {
		diffChildren(oldAshNode.children, newAshNode.children, oldAshNode, newAshNode, patches);
	}

	return patches;
}

module.exports = exports.default;
},{"../internals/constants":20}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = findNode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import parseAshNodeIndex from './parseAshNodeIndex';

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;

function findNode(nodeTree, nodeId, ashNodeIndices) {
	// var ashNodeIndices = parseAshNodeIndex(nodeId);
	var node = nodeTree;

	if (!nodeTree) {
		throw new Error(nodeTree + ' cannot be falsy.');
	}

	if (ashNodeIndices.length === 1) {
		return node;
	} else {
		for (var i = 1, _length = ashNodeIndices.length - 1; i < _length; i++) {
			if (!node) {
				return false;
			}

			node = node.childNodes[ashNodeIndices[i]];
		}
	}

	for (var i = 0, _length2 = node.childNodes.length; i < _length2; i++) {
		if (node.childNodes[i].nodeType === 1 && node.childNodes[i][ID_ATTRIBUTE_NAME] === nodeId) {
			return node.childNodes[i];
		} else if (node.childNodes[i].nodeType === 3 && i === ashNodeIndices[ashNodeIndices.length - 1]) {
			return node.childNodes[i];
		}
	}

	return false;
}

module.exports = exports.default;
},{"../internals/constants":20}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = parseAshNodeId;

function parseAshNodeId(id) {
	var result = id.split('.');

	for (var i = 0; i < result.length; i++) {
		result[i] = result[i] >> 0; // NOTE: faster than parseInt
	}

	return result;
}

module.exports = exports.default;
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

// apply patches to dom tree
exports.default = patchNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _parseAshNodeId = require('./parseAshNodeId');

var _parseAshNodeId2 = _interopRequireDefault(_parseAshNodeId);

var _createNodeTree = require('./createNodeTree');

var _createNodeTree2 = _interopRequireDefault(_createNodeTree);

var _setNodeProperties = require('./setNodeProperties');

var _setNodeProperties2 = _interopRequireDefault(_setNodeProperties);

var _removeNodeProperties = require('./removeNodeProperties');

var _removeNodeProperties2 = _interopRequireDefault(_removeNodeProperties);

var _findNode = require('./findNode');

var _findNode2 = _interopRequireDefault(_findNode);

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var _internalsIsElement = require('../internals/isElement');

var _internalsIsElement2 = _interopRequireDefault(_internalsIsElement);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var PATCH_ASH_NODE = _internalsConstants2.default.PATCH_ASH_NODE;
var PATCH_ASH_TEXT_NODE = _internalsConstants2.default.PATCH_ASH_TEXT_NODE;
var PATCH_PROPERTIES = _internalsConstants2.default.PATCH_PROPERTIES;
var PATCH_ORDER = _internalsConstants2.default.PATCH_ORDER;
var PATCH_INSERT = _internalsConstants2.default.PATCH_INSERT;
var PATCH_REMOVE = _internalsConstants2.default.PATCH_REMOVE;
var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

var eventListener = new _classesEventListener2.default();

/*var v8 = require('v8-natives');
(function (fn) {
	switch (v8.getOptimizationStatus(fn)) {
		case 1: console.log(fn.name + ' is optimized'); break;
		case 2: console.log(fn.name + ' is not optimized'); break;
		case 3: console.log(fn.name + ' is always optimized'); break;
		case 4: console.log(fn.name + ' is never optimized'); break;
		case 6: console.log(fn.name + ' is maybe deoptimized'); break;
	}
})(compareNodes);*/

function zeroPadNumber(number, length) {
	var n = Math.pow(10, length);

	return number < n ? ('' + (n + number)).slice(1) : '' + number;
}

function comparePatches(a, b) {
	return a.sortOrder - b.sortOrder;
}

function compareNodes(a, b) {
	return a[INDEX_ATTRIBUTE_NAME] - b[INDEX_ATTRIBUTE_NAME];
}

function walkReindexChildNodes(node, level, newIndex) {
	var childIndices;

	for (var i = 0; i < node.childNodes.length; i++) {
		if (node.childNodes[i].nodeType === 1) {
			childIndices = (0, _parseAshNodeId2.default)(node.childNodes[i][ID_ATTRIBUTE_NAME]);
			childIndices[level] = newIndex;

			node.childNodes[i][ID_ATTRIBUTE_NAME] = childIndices.join(INDEX_SEPARATOR);
			node.childNodes[i][INDEX_ATTRIBUTE_NAME] = childIndices[childIndices.length - 1];
			//$(node.childNodes[i]).attr('nodeId', node.childNodes[i][ID_ATTRIBUTE_NAME]);
			//$(node.childNodes[i]).attr('index', node.childNodes[i][INDEX_ATTRIBUTE_NAME]);

			if (node.childNodes[i].childNodes && node.childNodes[i].childNodes.length) {
				walkReindexChildNodes(node.childNodes[i], level, newIndex);
			}
		}
	}
}

function reindexChildNodes(parentNode, newIndex) {
	var parentIndices = (0, _parseAshNodeId2.default)(parentNode[ID_ATTRIBUTE_NAME]);
	var level = parentIndices.length - 1;

	walkReindexChildNodes(parentNode, level, newIndex);
}

function flushCache(reindexCache, reorderCache) {
	while (reindexCache.length > 0) {
		reindexCache[0].node[ID_ATTRIBUTE_NAME] = reindexCache[0].newId;
		reindexCache[0].node[INDEX_ATTRIBUTE_NAME] = reindexCache[0].newIndex;

		//$(reindexCache[0].node).attr('nodeId', reindexCache[0].node[ID_ATTRIBUTE_NAME]);
		//$(reindexCache[0].node).attr('index', reindexCache[0].node[INDEX_ATTRIBUTE_NAME]);

		reindexChildNodes(reindexCache[0].node, reindexCache[0].newIndex);

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
function patchNodeTree(nodeTree /*, patches*/) {
	var patches = arguments[1];
	var node;
	var reindexCache = [];
	var reorderCache = [];

	// type check
	if (!(0, _internalsIsElement2.default)(nodeTree)) {
		return false;
	}

	if (!patches.length) {
		return true;
	}

	// if there is non zero max index, compute number of its digits
	var maxDigits = patches.maxIndex > 0 ? Math.floor(Math.log(Math.abs(Math.floor(patches.maxIndex))) / Math.LN10) + 1 : 1;

	// compute sort order
	for (var i = 0; i < patches.length; i++) {
		patches[i].sortOrder = '';

		// first we order patches by their levels without the last level
		for (var j = 0; j < patches[i].indices.length - 1; j++) {
			patches[i].sortOrder += zeroPadNumber(patches[i].indices[j], maxDigits);
		}

		// then the patch type is important
		if (patches[i].type === PATCH_ASH_NODE) {
			patches[i].sortOrder += zeroPadNumber(9, maxDigits);
		} else if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			patches[i].sortOrder += zeroPadNumber(8, maxDigits);
		} else if (patches[i].type === PATCH_PROPERTIES) {
			patches[i].sortOrder += zeroPadNumber(7, maxDigits);
		} else if (patches[i].type === PATCH_REMOVE) {
			patches[i].sortOrder += zeroPadNumber(6, maxDigits);
		} else if (patches[i].type === PATCH_INSERT) {
			patches[i].sortOrder += zeroPadNumber(5, maxDigits);
		} else if (patches[i].type === PATCH_ORDER) {
			patches[i].sortOrder += zeroPadNumber(4, maxDigits);
		} else {
			patches[i].sortOrder += zeroPadNumber(0, maxDigits);
		}

		// and now the last level
		patches[i].sortOrder += zeroPadNumber(patches[i].indices[patches[i].indices.length - 1], maxDigits);

		// convert to number;
		patches[i].sortOrder = parseInt(patches[i].sortOrder, 10);
	}

	// sort patches by their order
	patches.sort(comparePatches);

	// console.log(patches);

	// now lets proof-check - inserting into nodes that will be reordered...
	/*for (let i = patches.length - 1; i >= 0; i--) {
 	if (patches[i].type === PATCH_INSERT) {
 		let indices = patches[i].indices.slice(0);
 
 		while (indices.length >= 3) {
 			indices.pop();
 
 			let id = indices.join(INDEX_SEPARATOR);
 
 			for (let j = i; j >= 0; j--) {
 				if (patches[j].type === PATCH_ORDER && patches[j].newId === id) {
 
 					let newIndices = patches[i].indices.slice(0);
 
 					for (let k = 0; k < patches[j].indices.length; k++) {
 						newIndices[k] = patches[j].indices[k];
 					}
 
 					patches[i].id = newIndices.join(INDEX_SEPARATOR);
 					patches[i].indices = newIndices;
 					newIndices = patches[i].parentIndices.slice(0);
 
 					for (let k = 0; k < patches[j].indices.length; k++) {
 						newIndices[k] = patches[j].indices[k];
 					}
 
 					patches[i].parentId = newIndices.join(INDEX_SEPARATOR);
 				}
 			}
 		}
 	}
 }*/

	// now iterate over patches...
	var lastLevel = patches[patches.length - 1].indices.length;

	for (var i = patches.length - 1; i >= 0; i--) {
		if (lastLevel < patches[i].indices.length) {
			// patching new level, must flush cache
			flushCache(reindexCache, reorderCache);

			lastLevel = patches[i].indices.length;
		}

		if (patches[i].type === PATCH_ASH_NODE) {
			// remove old events
			eventListener.removeEvents(patches[i].id, patches[i].streamId);

			// replace node
			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				return false;
			}

			node.parentNode.replaceChild((0, _createNodeTree2.default)(patches[i].node), node);
		}

		if (patches[i].type === PATCH_ASH_TEXT_NODE) {
			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				return false;
			}

			node.nodeValue = patches[i].text;
		}

		if (patches[i].type === PATCH_PROPERTIES) {
			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				return false;
			}

			(0, _setNodeProperties2.default)(node, patches[i].propertiesToChange, false);
			(0, _removeNodeProperties2.default)(node, patches[i].propertiesToRemove);
		}

		if (patches[i].type === PATCH_REMOVE) {
			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				return false;
			}

			// remove old events
			eventListener.removeEvents(patches[i].id, patches[i].streamId);

			node.parentNode.removeChild(node);
		}

		if (patches[i].type === PATCH_INSERT) {
			node = (0, _findNode2.default)(nodeTree, patches[i].parentId, patches[i].parentIndices);

			if (!node) {
				return false;
			}

			node.appendChild((0, _createNodeTree2.default)(patches[i].node));

			reorderCache.push(node);
		}

		if (patches[i].type === PATCH_ORDER) {
			node = (0, _findNode2.default)(nodeTree, patches[i].id, patches[i].indices);

			if (!node) {
				return false;
			}

			// reindex events
			eventListener.reindexEvents(patches[i].id, patches[i].indices, patches[i].index, patches[i].streamId);

			reindexCache.push({
				node: node,
				newId: patches[i].newId,
				newIndex: patches[i].index,
				streamId: patches[i].streamId
			});

			reorderCache.push(node.parentNode);
		}
	}

	flushCache(reindexCache, reorderCache);

	eventListener.markEvents(patches.streamId);

	return true;
}

module.exports = exports.default;
},{"../classes/EventListener":16,"../internals/constants":20,"../internals/isElement":28,"./createNodeTree":4,"./findNode":6,"./parseAshNodeId":7,"./removeNodeProperties":9,"./setNodeProperties":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = removeNodeProperties;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var eventListener = new _classesEventListener2.default();

function removeNodeProperties(node, properties) {
	for (var i = 0; i < properties.length; i++) {
		var props = properties[i].split('.');

		if (props.length === 1) {
			if (props[0] === 'style') {
				node.removeAttribute('style');
				// } else if (props[0] === 'events') {
			} else if (props[0] === 'className' || props[0] === 'class') {
				if (typeof node.className === 'string') {
					node.className = '';
				} else {
					node.setAttribute('class', '');
				}
			} else {
				if (props[0].substring(0, 6) === 'xlink:') {
					node.removeAttributeNS('http://www.w3.org/1999/xlink', props[0].substring(6));
				} else if (props[0].substring(0, 4) === 'xml:') {
					node.removeAttributeNS('http://www.w3.org/2000/svg', props[0].substring(4));
				} else {
					node.removeAttribute(props[0]);
				}
			}
		} else if (props.length === 2) {
			if (props[0] === 'style') {
				node.style[props[1]] = '';
			} else if (props[0] === 'events') {
				eventListener.removeEvent(node, props[1]);
			}
		}
	}
}

module.exports = exports.default;
},{"../classes/EventListener":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = setNodeProperties;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsObject = require('../internals/isObject');

var _internalsIsObject2 = _interopRequireDefault(_internalsIsObject);

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var eventListener = new _classesEventListener2.default();

function setNodeProperties(node, properties, isNewlyInserted) {
	for (var prop in properties) {
		if (properties.hasOwnProperty(prop)) {
			if (prop === 'style' && (0, _internalsIsObject2.default)(properties[prop])) {
				for (var style in properties[prop]) {
					if (properties[prop].hasOwnProperty(style)) {
						node.style[style] = properties[prop][style];
					}
				}
			} else if (prop === 'events' && (0, _internalsIsObject2.default)(properties[prop])) {
				eventListener.addEvents(node, properties[prop], isNewlyInserted);
			} else if (prop === 'className' || prop === 'class') {
				if (typeof node.className === 'string') {
					node.className = properties[prop];
				} else {
					node.setAttribute('class', properties[prop]);
				}
			} else if (!(0, _internalsIsObject2.default)(properties[prop])) {
				if (prop.substring(0, 6) === 'xlink:') {
					node.setAttributeNS('http://www.w3.org/1999/xlink', prop.substring(6), properties[prop]);
				} else if (prop.substring(0, 4) === 'xml:') {
					node.setAttributeNS('http://www.w3.org/2000/svg', prop.substring(4), properties[prop]);
				} else {
					if (prop === 'checked') {
						node.checked = !!properties[prop];
						if (node.checked) {
							node.setAttribute('checked', 'checked');
						} else {
							node.removeAttribute('checked');
						}
					} else if (prop === 'value') {
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

module.exports = exports.default;
},{"../classes/EventListener":16,"../internals/isObject":34}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = stringifyAshNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsAshNode = require('../internals/isAshNode');

var _internalsIsAshNode2 = _interopRequireDefault(_internalsIsAshNode);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

function escapeAttributeValue(s /*, preserveCR*/) {
	var preserveCR = arguments[1] ? '&#13;' : '\n';

	return ('' + s).replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
	.replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
	.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	/*
 You may add other replacements here for HTML only
 (but it's not necessary).
 Or for XML, only if the named entities are defined in its DTD.
 */
	.replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
	.replace(/[\r\n]/g, preserveCR);
}

function walkStringifyAshNodeTree(ashNodeTree, index /*, parentId*/) {
	var html = '';
	var openingTag = '<';
	var closingTag = '';
	var content = '';
	var parentId = arguments[2];
	var i;
	var key1;
	var key2;

	if ((0, _internalsIsAshNode2.default)(ashNodeTree)) {
		openingTag += ashNodeTree.tagName;
		closingTag = '</' + ashNodeTree.tagName + '>';

		if (parentId) {
			openingTag += ' ' + ID_ATTRIBUTE_NAME + '="' + parentId + INDEX_SEPARATOR + index + '"';
			openingTag += ' ' + INDEX_ATTRIBUTE_NAME + '="' + index + '"';
			parentId = parentId + INDEX_SEPARATOR + index;
		} else {
			openingTag += ' ' + ID_ATTRIBUTE_NAME + '="' + index + '"';
			openingTag += ' ' + INDEX_ATTRIBUTE_NAME + '="' + index + '"';
			parentId = '' + index;
		}

		if (ashNodeTree.properties) {
			for (key1 in ashNodeTree.properties) {
				if (ashNodeTree.properties.hasOwnProperty(key1) && key1 !== 'events') {
					if (key1 === 'style') {
						openingTag += ' style="';

						// add style definitions
						for (key2 in ashNodeTree.properties.style) {
							if (ashNodeTree.properties.style.hasOwnProperty(key2)) {
								if (typeof ashNodeTree.properties.style[key2] === 'string') {
									openingTag += key2 + ':' + ashNodeTree.properties.style[key2] + ';';
								} else {}
							}
						}

						openingTag += '"';
					} else {
						if (typeof ashNodeTree.properties[key1] === 'string') {
							if (key1.toLowerCase() === 'classname') {
								openingTag += ' class="' + escapeAttributeValue(ashNodeTree.properties[key1]) + '"';
							} else {
								openingTag += ' ' + key1 + '="' + escapeAttributeValue(ashNodeTree.properties[key1]) + '"';
							}
						} else if (typeof ashNodeTree.properties[key1] === 'boolean') {
							openingTag += ' ' + key1;
						} else if (typeof ashNodeTree.properties[key1] === 'number') {
							openingTag += ' ' + key1 + '="' + ashNodeTree.properties[key1] + '"';
						}
					}
				}
			}
		}

		openingTag += '>';

		if (ashNodeTree.children && ashNodeTree.children.length) {
			for (i = 0; i < ashNodeTree.children.length; i++) {
				content += walkStringifyAshNodeTree(ashNodeTree.children[i], i, parentId);
			}
		}

		html = openingTag + content + closingTag;
	} else {
		html = ashNodeTree.text;
	}

	return html;
}

function stringifyAshNodeTree(ashNodeTree) {
	return walkStringifyAshNodeTree(ashNodeTree, 0, '');
}

module.exports = exports.default;
/* Forces the conversion to string. */

// TODO
},{"../internals/constants":20,"../internals/isAshNode":24}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = validateNodeTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var INDEX_ATTRIBUTE_NAME = _internalsConstants2.default.INDEX_ATTRIBUTE_NAME;
var STREAM_ID_ATTRIBUTE_NAME = _internalsConstants2.default.STREAM_ID_ATTRIBUTE_NAME;

var eventListener = new _classesEventListener2.default();

function walkValidateNodeTree(nodeTree, ashNodeTree, streamId, eventsCache) {
	if (nodeTree.tagName && nodeTree.tagName.toLowerCase() !== ashNodeTree.tagName) {
		return false;
	}

	if (nodeTree.getAttribute && nodeTree.getAttribute(ID_ATTRIBUTE_NAME) !== ashNodeTree.id || nodeTree.getAttribute && nodeTree.getAttribute(INDEX_ATTRIBUTE_NAME) >> 0 !== ashNodeTree.index) {
		return false;
	}

	nodeTree[ID_ATTRIBUTE_NAME] = ashNodeTree.id;
	nodeTree[INDEX_ATTRIBUTE_NAME] = ashNodeTree.index;
	nodeTree[STREAM_ID_ATTRIBUTE_NAME] = ashNodeTree.streamId;

	if (ashNodeTree.properties && ashNodeTree.properties.events && typeof ashNodeTree.properties.events === 'object') {
		eventsCache.push({
			events: ashNodeTree.properties.events,
			node: nodeTree
		});
	}

	if (nodeTree.childNodes.length && (!ashNodeTree.children || !ashNodeTree.children.length) || !nodeTree.childNodes.length && (ashNodeTree.children && ashNodeTree.children.length) || ashNodeTree.children && nodeTree.childNodes.length !== ashNodeTree.children.length) {

		console.log('oj');
		return false;
	}

	if (ashNodeTree.children && ashNodeTree.children.length) {
		for (var i = 0; i < ashNodeTree.children.length; i++) {
			if (!walkValidateNodeTree(nodeTree.childNodes[i], ashNodeTree.children[i], streamId, eventsCache)) {
				return false;
			}
		}
	}

	return true;
}

function validateNodeTree(nodeTree, ashNodeTree, streamId) {
	var eventsCache = [];
	var isNodeTreeValid = walkValidateNodeTree(nodeTree, ashNodeTree, streamId, eventsCache);

	if (isNodeTreeValid) {
		for (var i = 0; i < eventsCache.length; i++) {
			eventListener.addEvents(eventsCache[i].node, eventsCache[i].events);
		}
	}

	return isNodeTreeValid;
}

module.exports = exports.default;
},{"../classes/EventListener":16,"../internals/constants":20}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

// constants references
var ASH_NODE_ASH_ELEMENT = _internalsConstants2.default.ASH_NODE_ASH_ELEMENT;
var COMPONENT_ASH_ELEMENT = _internalsConstants2.default.COMPONENT_ASH_ELEMENT;

/**
 * AshElement
 */

var AshElement = (function () {
	function AshElement(type, Spec) {
		_classCallCheck(this, AshElement);

		if (type !== COMPONENT_ASH_ELEMENT && type !== ASH_NODE_ASH_ELEMENT) {
			throw new Error('' + type + ' "type" must be "' + COMPONENT_ASH_ELEMENT + '" or "' + ASH_NODE_ASH_ELEMENT + '".');
		}

		if (!Spec) {
			throw new Error('' + Spec + ' "Spec" must be specified.');
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

	_createClass(AshElement, [{
		key: 'instantiate',
		value: function instantiate() {
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
				throw new Error('' + this + ' is not an AshElement object.');
			}

			return this.instance;
		}
	}]);

	return AshElement;
})();

exports.default = AshElement;
module.exports = exports.default;
},{"../internals/constants":20}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var ASH_NODE = _internalsConstants2.default.ASH_NODE;
var ASH_TEXT_NODE = _internalsConstants2.default.ASH_TEXT_NODE;

var AshNode = function AshNode(tagName, properties) {
	_classCallCheck(this, AshNode);

	if (typeof properties !== 'undefined') {
		this.type = ASH_NODE;
		this.tagName = tagName.toLowerCase();
		this.properties = properties || {};
		// this.parent = null;
		// this.children = [];
		this.id = null;
		this.index = null;
		this.indices = null;
		this.key = null;

		// find element's key
		if (this.properties.key) {
			this.key = this.properties.key;

			delete this.properties.key;
		}
	} else {
		this.type = ASH_TEXT_NODE;
		this.text = tagName;
		// this.parent = null;
		this.id = null;
		this.index = null;
		this.indices = null;
	}
};

exports.default = AshNode;
module.exports = exports.default;
},{"../internals/constants":20}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMFindNode = require('../DOM/findNode');

var _DOMFindNode2 = _interopRequireDefault(_DOMFindNode);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var LIFECYCLE_UNMOUNTED = _internalsConstants2.default.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNINITIALIZED = _internalsConstants2.default.LIFECYCLE_UNINITIALIZED;

var Component = (function () {
	function Component() {
		var _this = this;

		var props = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Component);

		this.state = {};

		// autobind methods
		var prototype = Object.getPrototypeOf(this);

		Object.getOwnPropertyNames(prototype).forEach(function (value) {
			var descriptor = Object.getOwnPropertyDescriptor(prototype, value);

			if (!(descriptor && (typeof descriptor.get !== 'undefined' || typeof descriptor.set !== 'undefined')) && (0, _internalsIsFunction2.default)(_this[value]) && value !== 'constructor') {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props;

		this.__isDirty = false;
		this.__previousLifecycle = LIFECYCLE_UNINITIALIZED;
		this.__currentLifecycle = LIFECYCLE_UNMOUNTED;
	}

	_createClass(Component, [{
		key: 'isDirty',
		get: function () {
			return this.__isDirty;
		},
		set: function (value) {
			this.__isDirty = !!value;

			if (this.__isDirty && this.__element.stream) {
				this.__element.stream.push(this);
			}
		}
	}, {
		key: '__lifecycle',
		get: function () {
			return this.__currentLifecycle;
		},
		set: function (nextLifecycle) {
			if (nextLifecycle !== LIFECYCLE_UNMOUNTED && nextLifecycle !== LIFECYCLE_MOUNTING && nextLifecycle !== LIFECYCLE_MOUNTED) {
				throw new Error('' + nextLifecycle + ' must be "' + LIFECYCLE_UNMOUNTED + '", "' + LIFECYCLE_MOUNTING + '" or "' + LIFECYCLE_MOUNTED + '". Also, this property is for internal use only. Do not change it!');
			}

			this.__previousLifecycle = this.__currentLifecycle;
			this.__currentLifecycle = nextLifecycle;

			if (this.__previousLifecycle !== this.__currentLifecycle) {
				if (this.__currentLifecycle === LIFECYCLE_MOUNTING) {
					this.onBeforeMount();
				} else if (this.__currentLifecycle === LIFECYCLE_MOUNTED) {
					this.onMount();
				} else if (this.__currentLifecycle === LIFECYCLE_UNMOUNTED) {
					this.onUnmount();
				}
			}
		}
	}, {
		key: 'isMounted',
		get: function () {
			return this.__currentLifecycle === LIFECYCLE_MOUNTED;
		}
	}, {
		key: 'domNode',
		get: function () {
			if (this.isMounted && (0, _internalsIsAshNodeAshElement2.default)(this.__element.children[0])) {
				return (0, _DOMFindNode2.default)(this.__element.stream.getRootNode(), this.__element.children[0].instance.id, this.__element.children[0].instance.indices);
			}

			return null;
		}
	}, {
		key: 'shouldUpdate',
		value: function shouldUpdate(newProps) {
			return this.props !== newProps;
		}
	}, {
		key: 'onBeforeMount',
		value: function onBeforeMount() {}
	}, {
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {}
	}, {
		key: 'onBeforeReceiveProps',
		value: function onBeforeReceiveProps() {}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return Component;
})();

exports.default = Component;
module.exports = exports.default;
},{"../DOM/findNode":6,"../internals/constants":20,"../internals/isAshNodeAshElement":25,"../internals/isFunction":30}],16:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _DOMParseAshNodeId = require('../DOM/parseAshNodeId');

var _DOMParseAshNodeId2 = _interopRequireDefault(_DOMParseAshNodeId);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsMatching = require('../internals/isMatching');

var _internalsIsMatching2 = _interopRequireDefault(_internalsIsMatching);

var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;
var STREAM_ID_ATTRIBUTE_NAME = _internalsConstants2.default.STREAM_ID_ATTRIBUTE_NAME;
var INDEX_SEPARATOR = _internalsConstants2.default.INDEX_SEPARATOR;

var topics = global.topics = {};
var eventListener;

var EventListener = (function () {
	function EventListener() {
		_classCallCheck(this, EventListener);

		if (eventListener) {
			return eventListener;
		}

		eventListener = this;

		return eventListener;
	}

	_createClass(EventListener, [{
		key: 'addEvent',
		value: function addEvent(node, eventName, callback, isNewlyInserted) {
			if (!topics[eventName]) {
				topics[eventName] = [];

				global.document.addEventListener(eventName, this.callback.bind(this, eventName), true);
			}

			for (var i = 0; i < topics[eventName].length; i++) {
				if (topics[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
					topics[eventName][i].callback = callback;
					topics[eventName][i].isNewlyInserted = isNewlyInserted;

					return this;
				}
			}

			topics[eventName].push({
				id: node[ID_ATTRIBUTE_NAME],
				streamId: node[STREAM_ID_ATTRIBUTE_NAME],
				callback: callback,
				isNewlyInserted: isNewlyInserted,
				isReindexed: {}
			});

			return this;
		}
	}, {
		key: 'addEvents',
		value: function addEvents(node, events, isNewlyInserted) {
			for (var eventName in events) {
				if (events.hasOwnProperty(eventName)) {
					if ((0, _internalsIsFunction2.default)(events[eventName])) {
						this.addEvent(node, eventName, events[eventName], isNewlyInserted);
					}
				}
			}

			return this;
		}
	}, {
		key: 'removeEvent',
		value: function removeEvent(node, eventName) {
			if (eventName && topics[eventName]) {
				for (var i = 0; i < topics[eventName].length; i++) {
					if (topics[eventName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[eventName][i].id === node[ID_ATTRIBUTE_NAME]) {
						topics[eventName].splice(i, 1);

						return this;
					}
				}
			} else if (!eventName) {
				for (var topicName in topics) {
					if (topics.hasOwnProperty(topicName)) {
						for (var i = 0; i < topics[topicName].length; i++) {
							if (topics[topicName][i].streamId === node[STREAM_ID_ATTRIBUTE_NAME] && topics[topicName][i].id === node[ID_ATTRIBUTE_NAME]) {
								topics[topicName].splice(i, 1);

								return this;
							}
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'removeEvents',

		// removes all events, that has id same or matching via isMatching()
		// removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
		// if eventName is specified, only events with that name are removed
		value: function removeEvents(id, streamId) {
			var splitId = id.split(INDEX_SEPARATOR);

			for (var topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (var i = 0; i < topics[topicName].length; i++) {
						if (streamId === topics[topicName][i].streamId && (0, _internalsIsMatching2.default)(splitId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted) {
							topics[topicName].splice(i, 1);

							i--;
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'reindexEvents',
		value: function reindexEvents(oldId, oldIndices, newIndex, streamId) {
			var splitOldId = oldId.split(INDEX_SEPARATOR);

			for (var topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (var i = 0; i < topics[topicName].length; i++) {
						if (streamId === topics[topicName][i].streamId && (0, _internalsIsMatching2.default)(splitOldId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted && !topics[topicName][i].isReindexed[oldIndices.length - 1]) {
							var indices = (0, _DOMParseAshNodeId2.default)(topics[topicName][i].id);

							indices[oldIndices.length - 1] = newIndex;
							topics[topicName][i].id = indices.join(INDEX_SEPARATOR);
							topics[topicName][i].isReindexed[oldIndices.length - 1] = true;
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'markEvents',
		value: function markEvents(streamId) {
			for (var topicName in topics) {
				if (topics.hasOwnProperty(topicName)) {
					for (var i = 0; i < topics[topicName].length; i++) {
						if (streamId === topics[topicName][i].streamId) {
							topics[topicName][i].isNewlyInserted = false;
							topics[topicName][i].isReindexed = {};
						}
					}
				}
			}

			return this;
		}
	}, {
		key: 'callback',
		value: function callback(eventName, eventObject) {
			var id = eventObject.target[ID_ATTRIBUTE_NAME];
			var streamId = eventObject.target[STREAM_ID_ATTRIBUTE_NAME];

			if (id) {
				var indices = (0, _DOMParseAshNodeId2.default)(id);

				while (indices.length) {
					for (var i = 0; i < topics[eventName].length; i++) {
						if (topics[eventName][i].id === id && topics[eventName][i].streamId === streamId) {
							topics[eventName][i].callback(eventObject);
						}
					}

					indices.pop();

					id = indices.join(INDEX_SEPARATOR);
				}
			}
		}
	}]);

	return EventListener;
})();

exports.default = EventListener;
module.exports = exports.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../DOM/parseAshNodeId":7,"../internals/constants":20,"../internals/isFunction":30,"../internals/isMatching":32}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _internalsIsFinite = require('../internals/isFinite');

var _internalsIsFinite2 = _interopRequireDefault(_internalsIsFinite);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _internalsIsString = require('../internals/isString');

var _internalsIsString2 = _interopRequireDefault(_internalsIsString);

var IMMUTABLE_TAG = _internalsConstants2.default.IMMUTABLE_TAG;

var ImmutableArray = (function (_Array) {
	function ImmutableArray() {
		_classCallCheck(this, ImmutableArray);

		_get(Object.getPrototypeOf(ImmutableArray.prototype), 'constructor', this).call(this);

		if (arguments[0] && arguments[0][IMMUTABLE_TAG]) {
			return arguments[0];
		}

		var array = undefined;
		var clone = true;

		if (arguments.length >= 2 && (arguments[arguments.length - 1] !== null && typeof arguments[arguments.length - 1] === 'object') && arguments[arguments.length - 1].clone === false) {
			clone = false;
		}

		if (clone && arguments.length === 1 && Array.isArray(arguments[0])) {
			array = arguments[0].slice(0);
		} else if (!clone && arguments.length === 2 && Array.isArray(arguments[0])) {
			array = arguments[0];
		} else {
			array = [];
			array.push.apply(array, arguments);
		}

		// deep immutability
		for (var i = 0, _length = array.length; i < _length; i++) {
			if (array[i] && array[i][IMMUTABLE_TAG]) {} else if (Array.isArray(array[i])) {
				array[i] = new ImmutableArray(array[i]);
			} else if (array[i] !== null && typeof array[i] === 'object') {
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

	_inherits(ImmutableArray, _Array);

	_createClass(ImmutableArray, [{
		key: 'push',
		value: function push() {
			var array = this.slice(0);

			array.push.apply(array, arguments);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'pop',
		value: function pop() {
			var array = this.slice(0);

			array.pop();

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'sort',
		value: function sort(compareFunction) {
			var array = this.slice(0);

			array.sort(compareFunction);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'splice',
		value: function splice() {
			var array = this.slice(0);

			array.splice.apply(array, arguments);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'shift',
		value: function shift() {
			var array = this.slice(0);

			array.shift();

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'unshift',
		value: function unshift() {
			var array = this.slice(0);

			array.unshift.apply(array, arguments);

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			var array = this.slice(0);

			array.reverse();

			return new ImmutableArray(array, { clone: false });
		}
	}, {
		key: 'set',
		value: function set(index, value) {
			if (!((0, _internalsIsFinite2.default)(index) && index >= 0)) {
				throw new Error(index + ' ("index") must be non-negative finite number.');
			}

			var array = this.slice(0);

			array[index] = value;

			return new ImmutableArray(array, { clone: false });
		}
	}]);

	return ImmutableArray;
})(Array);

var ImmutableObject = (function () {
	function ImmutableObject(value /*, options*/) {
		_classCallCheck(this, ImmutableObject);

		if (value && value[IMMUTABLE_TAG]) {
			return value;
		}

		for (var key in value) {
			if (value.hasOwnProperty(key) && !(0, _internalsIsFunction2.default)(value[key])) {
				this[key] = value[key];

				if (this[key] && this[key][IMMUTABLE_TAG]) {} else if (Array.isArray(this[key])) {
					this[key] = new ImmutableArray(this[key]);
				} else if (this[key] !== null && typeof this[key] === 'object') {
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

	_createClass(ImmutableObject, [{
		key: 'set',
		value: function set(key, value) {
			var clone;

			if (!(0, _internalsIsString2.default)(key)) {
				throw new Error(key + ' ("key") must be a string.');
			}

			if (typeof value === 'undefined') {
				throw new Error(value + ' ("value") must be defined.');
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
		}
	}, {
		key: 'remove',
		value: function remove(key) {
			var clone;

			if (!(0, _internalsIsString2.default)(key)) {
				throw new Error(key + ' ("key") must be a string.');
			}

			if (typeof this[key] === 'undefined') {
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
		}
	}, {
		key: 'merge',
		value: function merge(source) {
			var hasChanged;
			var clone;

			if (!(source !== null && typeof source === 'object')) {
				throw new Error(source + ' ("source") must be an object.');
			}

			clone = {};

			for (var prop in source) {
				if (source.hasOwnProperty(prop) && !(0, _internalsIsFunction2.default)(source[prop])) {
					if (source[prop] && source[prop][IMMUTABLE_TAG]) {
						if (source[prop] !== this[prop]) {
							clone[prop] = source[prop];
							hasChanged = true;
						}
					} else if (Array.isArray(source[prop])) {
						if (source[prop] !== this[prop]) {
							clone[prop] = source[prop];
							hasChanged = true;
						}
					} else if (source[prop] !== null && typeof source[prop] === 'object') {
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
				if (this.hasOwnProperty(prop) && !(0, _internalsIsFunction2.default)(this[prop]) && typeof clone[prop] === 'undefined') {
					clone[prop] = this[prop];
				}
			}

			return new ImmutableObject(clone);
		}
	}]);

	return ImmutableObject;
})();

exports.ImmutableArray = ImmutableArray;
exports.ImmutableObject = ImmutableObject;

// no action needed

// no action needed
},{"../internals/constants":20,"../internals/isFinite":29,"../internals/isFunction":30,"../internals/isString":36}],18:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _internalsIsAshNodeAshElement = require('../internals/isAshNodeAshElement');

var _internalsIsAshNodeAshElement2 = _interopRequireDefault(_internalsIsAshNodeAshElement);

var _DOMCreateNodeTree = require('../DOM/createNodeTree');

var _DOMCreateNodeTree2 = _interopRequireDefault(_DOMCreateNodeTree);

var _DOMDiffAshNodeTree = require('../DOM/diffAshNodeTree');

var _DOMDiffAshNodeTree2 = _interopRequireDefault(_DOMDiffAshNodeTree);

var _DOMPatchNodeTree = require('../DOM/patchNodeTree');

var _DOMPatchNodeTree2 = _interopRequireDefault(_DOMPatchNodeTree);

var _DOMStringifyAshNodeTree = require('../DOM/stringifyAshNodeTree');

var _DOMStringifyAshNodeTree2 = _interopRequireDefault(_DOMStringifyAshNodeTree);

var _DOMValidateNodeTree = require('../DOM/validateNodeTree');

var _DOMValidateNodeTree2 = _interopRequireDefault(_DOMValidateNodeTree);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var _internalsIsElement = require('../internals/isElement');

var _internalsIsElement2 = _interopRequireDefault(_internalsIsElement);

var _streamsStream = require('../streams/Stream');

var _streamsStream2 = _interopRequireDefault(_streamsStream);

var _streamsAshNodeStream = require('../streams/AshNodeStream');

var _streamsAshNodeStream2 = _interopRequireDefault(_streamsAshNodeStream);

var LIFECYCLE_MOUNTING = _internalsConstants2.default.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = _internalsConstants2.default.LIFECYCLE_MOUNTED;
var ID_ATTRIBUTE_NAME = _internalsConstants2.default.ID_ATTRIBUTE_NAME;

var renderer;

function mountComponents(ashElement) {
	if ((0, _internalsIsAshNodeAshElement2.default)(ashElement)) {
		for (var i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				mountComponents(ashElement.children[i]);
			}
		}
	} else if ((0, _internalsIsComponentAshElement2.default)(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle === LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}

var Renderer = (function () {
	function Renderer() {
		_classCallCheck(this, Renderer);

		this.streams = [];

		if (renderer) {
			return renderer;
		}

		// save singleton
		renderer = this;

		// render loop is always bound to renderer
		renderer.render = renderer.render.bind(renderer);

		return renderer;
	}

	_createClass(Renderer, [{
		key: 'addStream',
		value: function addStream(ashNodeStream, node) {
			if (!(ashNodeStream instanceof _streamsAshNodeStream2.default)) {
				throw new Error('' + ashNodeStream + ' (ashNodeStream) must be an AshNodeStream instance.');
			}

			if (!(0, _internalsIsElement2.default)(node)) {
				throw new Error(node + ' must be a DOM Element.');
			}

			var renderStream = new _streamsStream2.default();

			renderStream.id = ashNodeStream.id;
			renderStream.node = node;
			renderStream.getRootNode = function () {
				for (var i = 0; i < node.childNodes.length; i++) {
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
	}, {
		key: 'streamToString',
		value: function streamToString(ashNodeStream) {
			if (!(ashNodeStream instanceof _streamsAshNodeStream2.default)) {
				throw new Error('' + ashNodeStream + ' (ashNodeStream) must be an AshNodeStream instance.');
			}

			return (0, _DOMStringifyAshNodeTree2.default)(ashNodeStream.get());
		}
	}, {
		key: 'render',
		value: function render(stream, changed, dependencies) {
			var ashNodeStream = dependencies[0];

			function _ref() {
				stream.node.appendChild((0, _DOMCreateNodeTree2.default)(stream.ashNodeTree));

				// mount components
				mountComponents(ashNodeStream.ashElementTree);

				stream.isRendering = false;
			}

			if (!stream.ashNodeTree) {
				var isNodeTreeValid = false;
				var isNodeTreeValidated = false;

				// remove child nodes which are not element nodes
				for (var j = 0; j < stream.node.childNodes.length; j++) {
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
					isNodeTreeValid = (0, _DOMValidateNodeTree2.default)(stream.node.childNodes[0], stream.ashNodeTree, stream.id);
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

					global.requestAnimationFrame(_ref);
				}if (isNodeTreeValid && isNodeTreeValidated) {
					// mount components
					mountComponents(ashNodeStream.ashElementTree);
				}
			} else {
				(function () {
					var newAshNodeTree = ashNodeStream.get();
					var patches = (0, _DOMDiffAshNodeTree2.default)(stream.ashNodeTree, newAshNodeTree);

					stream.ashNodeTree = newAshNodeTree;
					stream.isRendering = true;

					global.requestAnimationFrame(function () {
						var isSuccessful = (0, _DOMPatchNodeTree2.default)(stream.getRootNode(), patches);

						if (!isSuccessful) {
							throw new Error('Patching the DOM was unsuccesful!');
						}

						// mount components
						mountComponents(ashNodeStream.ashElementTree);

						stream.isRendering = false;
					});
				})();
			}
		}
	}]);

	return Renderer;
})();

exports.default = Renderer;
module.exports = exports.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../DOM/createNodeTree":4,"../DOM/diffAshNodeTree":5,"../DOM/patchNodeTree":8,"../DOM/stringifyAshNodeTree":11,"../DOM/validateNodeTree":12,"../internals/constants":20,"../internals/isAshNodeAshElement":25,"../internals/isComponentAshElement":27,"../internals/isElement":28,"../streams/AshNodeStream":37,"../streams/Stream":38}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function assign() {
	var sources = [];
	var target = arguments[0] || {};

	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] && typeof arguments[i] === 'object') {
			sources.push(arguments[i]);
		}
	}

	if (!sources.length) {
		return target;
	}

	for (var i = 0; i < sources.length; i++) {
		for (var prop in sources[i]) {
			if (sources[i].hasOwnProperty(prop) && typeof sources[i][prop] !== 'undefined' && sources[i][prop] !== null) {
				target[prop] = sources[i][prop];
			}
		}
	}

	return target;
}

exports.default = assign;
module.exports = exports.default;
/*target, ...source*/
},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var constants = {
	// component lifecycle
	LIFECYCLE_UNMOUNTED: 'Unmounted',
	LIFECYCLE_MOUNTING: 'Mounting',
	LIFECYCLE_MOUNTED: 'Mounted',
	LIFECYCLE_UNINITIALIZED: 'Uninitialized',

	// patch types
	PATCH_NONE: 'Patch None',
	PATCH_ASH_NODE: 'Patch Ash Node',
	PATCH_ASH_TEXT_NODE: 'Patch Ash Text Node',
	PATCH_PROPERTIES: 'Patch Properties',
	PATCH_ORDER: 'Patch Order',
	PATCH_INSERT: 'Patch Insert',
	PATCH_REMOVE: 'Patch Remove',

	// descriptor types
	COMPONENT_ASH_ELEMENT: 'Component Ash Element',
	ASH_NODE_ASH_ELEMENT: 'Ash Node Ash Element',

	// virtual node types
	ASH_NODE: 'Ash Node',
	ASH_TEXT_NODE: 'Ash Text Node',

	// misc
	INDEX_SEPARATOR: '.',
	ID_ATTRIBUTE_NAME: '__ash:id__',
	INDEX_ATTRIBUTE_NAME: '__ash:index__',
	STREAM_ID_ATTRIBUTE_NAME: '__ash:stream__',

	IMMUTABLE_TAG: '__ash:immutable__'
};

exports.default = constants;
module.exports = exports.default;
},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesAshNode = require('../classes/AshNode');

var _classesAshNode2 = _interopRequireDefault(_classesAshNode);

var _classesAshElement = require('../classes/AshElement');

var _classesAshElement2 = _interopRequireDefault(_classesAshElement);

var _isAshElement = require('./isAshElement');

var _isAshElement2 = _interopRequireDefault(_isAshElement);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _classesComponent = require('../classes/Component');

var _classesComponent2 = _interopRequireDefault(_classesComponent);

var _internalsIsAncestor = require('../internals/isAncestor');

var _internalsIsAncestor2 = _interopRequireDefault(_internalsIsAncestor);

// constants references
var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function createElement(tagName, props /*, children...*/) {
	var children = [];

	if (typeof tagName !== 'string' && typeof tagName === 'function' && (0, _internalsIsAncestor2.default)(_classesComponent2.default, tagName)) {
		return new _classesAshElement2.default(COMPONENT_ASH_ELEMENT, tagName, arguments[1]);
	} else if (typeof tagName === 'string' && !tagName.length) {
		throw new Error(tagName + ' (tagName) must be non-empty string or Component class.');
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, null);
	}

	/*if (Array.isArray(arguments[1])) {
 	children = arguments[1];
 	props = null;
 } else {
 	props = arguments[1];
 }
 
 if (!children && !Array.isArray(arguments[2])) {
 	children = [];
 
 	// children are not in an array, iterate over arguments...
 	for (let i = 2; i < arguments.length; i++) {
 		if (typeof arguments[i] === 'string') {
 			children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
 		} else if (isAshElement(arguments[i])) {
 			children.push(arguments[i]);
 		}
 	}
 } else {
 	children = children || arguments[2];
 
 	// check type of children
 	for (let i = 0; i < children.length; i++) {
 		if (typeof children[i] === 'string') {
 			children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
 		} else if (!isAshElement(children[i])) {
 			//children[i] = null;
 			children.splice(i, 1);
 			i--;
 		}
 	}
 }*/

	for (var i = 2; i < arguments.length; i++) {
		if (typeof arguments[i] === 'string') {
			children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, arguments[i]));
		} else if ((0, _isAshElement2.default)(arguments[i])) {
			children.push(arguments[i]);
		} else if (Array.isArray(arguments[i])) {
			for (var j = 0; j < arguments[i].length; j++) {
				if (typeof arguments[i][j] === 'string') {
					children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, arguments[i][j]));
				} else if ((0, _isAshElement2.default)(arguments[i][j])) {
					children.push(arguments[i][j]);
				}
			}
		}
	}

	/*if (!Array.isArray(arguments[2])) {
 	children = [];
 
 	// children are not in an array, iterate over arguments...
 	for (let i = 2; i < arguments.length; i++) {
 		if (typeof arguments[i] === 'string') {
 			children.push(new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, arguments[i]));
 		} else if (isAshElement(arguments[i])) {
 			children.push(arguments[i]);
 		}
 	}
 } else {
 	children = arguments[2];
 
 	// check type of children
 	for (let i = 0; i < children.length; i++) {
 		if (typeof children[i] === 'string') {
 			children[i] = new AshElement(ASH_NODE_ASH_ELEMENT, AshNode, children[i]);
 		} else if (!isAshElement(children[i])) {
 			//children[i] = null;
 			children.splice(i, 1);
 			i--;
 		}
 	}
 }*/

	return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, props, children);
}

exports.default = createElement;
module.exports = exports.default;
},{"../classes/AshElement":13,"../classes/AshNode":14,"../classes/Component":15,"../internals/isAncestor":22,"./constants":20,"./isAshElement":23}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

/**
 * Finds if ancestor is parent of ancestor class of value.
 */
function isAncestor(ancestor, value) {
	if (!(0, _isFunction2.default)(ancestor) || !(0, _isFunction2.default)(value) || ancestor === Function || value === Function) {
		return false;
	}

	if (ancestor === value) {
		return true;
	}

	if (ancestor === Function && value !== Object) {
		return true;
	}if (ancestor === Function && value === Object) {
		return false;
	}

	if (ancestor === Object && value === Function) {
		return true;
	} else if (ancestor === Object) {
		return true;
	}

	var prototype, lastPrototype;

	while (prototype !== ancestor) {
		lastPrototype = prototype;
		prototype = Object.getPrototypeOf(value);

		if (lastPrototype === prototype) {
			return false;
		}

		if (prototype === ancestor) {
			return true;
		} else if (prototype === Function || prototype === Object) {
			return false;
		}
	}

	return false;
}

exports.default = isAncestor;
module.exports = exports.default;
},{"./isFunction":30}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function isAshElement(value) {
	return value && (value.type === COMPONENT_ASH_ELEMENT || value.type === ASH_NODE_ASH_ELEMENT);
}

exports.default = isAshElement;
module.exports = exports.default;
},{"./constants":20}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_NODE = _constants2.default.ASH_NODE;

function isAshNode(value) {
	return value && value.type === ASH_NODE;
}

exports.default = isAshNode;
module.exports = exports.default;
},{"./constants":20}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function isAshNodeAshElement(value) {
	return value && value.type === ASH_NODE_ASH_ELEMENT;
}

exports.default = isAshNodeAshElement;
module.exports = exports.default;
},{"./constants":20}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var ASH_TEXT_NODE = _constants2.default.ASH_TEXT_NODE;

function isAshTextNode(value) {
	return value && value.type === ASH_TEXT_NODE;
}

exports.default = isAshTextNode;
module.exports = exports.default;
},{"./constants":20}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;

function isComponentAshElement(value) {
	return value && value.type == COMPONENT_ASH_ELEMENT;
}

exports.default = isComponentAshElement;
module.exports = exports.default;
},{"./constants":20}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isObjectLike = require('./isObjectLike');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

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
  return value && value.nodeType === 1 && (0, _isObjectLike2.default)(value) && Object.prototype.toString.call(value).indexOf('Element') > -1 || false;
}

exports.default = isElement;
module.exports = exports.default;
},{"./isObjectLike":35}],29:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isNative = require('./isNative');

var _isNative2 = _interopRequireDefault(_isNative);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = global.isFinite,
    nativeNumIsFinite = (0, _isNative2.default)(nativeNumIsFinite = Number.isFinite) && nativeNumIsFinite;

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
  return typeof value == 'number' && nativeIsFinite(value);
};

exports.default = isFinite;
module.exports = exports.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./isNative":33}],30:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isNative = require('./isNative');

var _isNative2 = _interopRequireDefault(_isNative);

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = (0, _isNative2.default)(Uint8Array = global.Uint8Array) && Uint8Array;

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
  return typeof value == 'function' || false;
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

exports.default = isFunction;
module.exports = exports.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./isNative":33}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var IMMUTABLE_TAG = _internalsConstants2.default.IMMUTABLE_TAG;

function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}

exports.default = isImmutable;
module.exports = exports.default;
},{"../internals/constants":20}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
	if (!Array.isArray(chain1) || !Array.isArray(chain2)) {
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

exports.default = isMatching;
module.exports = exports.default;
},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/** Used to detect if a method is native */
var regexNative = new RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/toString| for [^\]]+/g, '.*?') + '$');

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && regexNative.test(value);
}

exports.default = isNative;
module.exports = exports.default;
},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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
  return type == 'function' || value && type == 'object' || false;
}

exports.default = isObject;
module.exports = exports.default;
},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return value && typeof value == 'object' || false;
}

exports.default = isObjectLike;
module.exports = exports.default;
},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isObjectLike = require('./isObjectLike');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

/** `Object#toString` result references. */
var STRING_TAG = '[object String]';

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
  return typeof value == 'string' || (0, _isObjectLike2.default)(value) && Object.prototype.toString.call(value) == STRING_TAG || false;
}

exports.default = isString;
module.exports = exports.default;
},{"./isObjectLike":35}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Stream2 = require('./Stream');

var _Stream3 = _interopRequireDefault(_Stream2);

var _classesComponent = require('../classes/Component');

var _classesComponent2 = _interopRequireDefault(_classesComponent);

var _DOMCreateAshElementTree = require('../DOM/createAshElementTree');

var _DOMCreateAshElementTree2 = _interopRequireDefault(_DOMCreateAshElementTree);

var _internalsIsComponentAshElement = require('../internals/isComponentAshElement');

var _internalsIsComponentAshElement2 = _interopRequireDefault(_internalsIsComponentAshElement);

var _DOMCreateAshNodeTree = require('../DOM/createAshNodeTree');

var _DOMCreateAshNodeTree2 = _interopRequireDefault(_DOMCreateAshNodeTree);

var _internalsConstants = require('../internals/constants');

var _internalsConstants2 = _interopRequireDefault(_internalsConstants);

var LIFECYCLE_UNMOUNTED = _internalsConstants2.default.LIFECYCLE_UNMOUNTED;
var COMPONENT_ASH_ELEMENT = _internalsConstants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _internalsConstants2.default.ASH_NODE_ASH_ELEMENT;

var streamId = 0;

function walkUpdateComponentAshElement(oldAshElement, newAshElement, stream) {
	if (newAshElement.type === COMPONENT_ASH_ELEMENT) {
		if (oldAshElement === null) {
			// old is null, new is component

			// newAshElement must be added as a child...
			if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[newAshElement.index] = newAshElement;
			} else if (newAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT && newAshElement.Spec === oldAshElement.Spec) {
			// old is component, new is same component

			if (oldAshElement.instance.shouldUpdate(newAshElement.args ? newAshElement.args[0] : null)) {
				oldAshElement.isDirty = true;

				// copy the new to the old...
				oldAshElement.args = newAshElement.args;
				oldAshElement.instance.onBeforeReceiveProps(newAshElement.args ? newAshElement.args[0] : null);
				oldAshElement.instance.props = newAshElement.args ? newAshElement.args[0] : null;

				// create child for the new descriptor
				newAshElement.children[0] = oldAshElement.instance.render();

				// adding children to the queue
				if (newAshElement.children[0] && oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].index = 0;

					walkUpdateComponentAshElement(oldAshElement.children[0], newAshElement.children[0], stream);
				} else if (newAshElement.children[0] && !oldAshElement.children[0]) {
					newAshElement.children[0].owner = oldAshElement;
					newAshElement.children[0].parent = oldAshElement;
					newAshElement.children[0].index = 0;

					walkUpdateComponentAshElement(null, newAshElement.children[0], stream);
				}

				// deleting old surplus children
				if (!newAshElement.children[0] && oldAshElement.children[0]) {
					if (oldAshElement.children[0].type === COMPONENT_ASH_ELEMENT) {
						oldAshElement.children[0].instance.__lifecycle = LIFECYCLE_UNMOUNTED;
					}

					oldAshElement.children.pop();
				}
			}
		} else if (oldAshElement.type === COMPONENT_ASH_ELEMENT) {
			// old is component, new is different component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			}
		} else {
			// old is virtual node, new is component

			if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			} else if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

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
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[0] = newAshElement;
			} else if (newAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				newAshElement.parent.children[newAshElement.index] = newAshElement;
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
					newAshElement.children[i].index = i;

					walkUpdateComponentAshElement(oldAshElement.children[i], newAshElement.children[i], stream);
				} else if (newAshElement.children[i] && !oldAshElement.children[i]) {
					newAshElement.children[i].owner = oldAshElement.owner;
					newAshElement.children[i].parent = oldAshElement;
					newAshElement.children[i].index = i;

					walkUpdateComponentAshElement(null, newAshElement.children[i], stream);
				}
			}

			// deleting old surplus children
			while (oldAshElement.children.length > newAshElement.children.length) {
				if (oldAshElement.children[oldAshElement.children.length - 1].type === COMPONENT_ASH_ELEMENT) {
					oldAshElement.children[oldAshElement.children.length - 1].instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				}

				oldAshElement.children.pop();
			}
		} else {
			// old is component, new is virtual node

			if (oldAshElement.parent.type === COMPONENT_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[0] = newAshElement;
			} else if (oldAshElement.parent.type === ASH_NODE_ASH_ELEMENT) {
				// now, the component descriptor's tree is not complete
				newAshElement.owner = oldAshElement.owner;
				newAshElement.parent = oldAshElement.parent;
				newAshElement.index = oldAshElement.index;
				(0, _DOMCreateAshElementTree2.default)(newAshElement, stream);

				// replace the old
				oldAshElement.instance.__lifecycle = LIFECYCLE_UNMOUNTED;
				oldAshElement.parent.children[oldAshElement.index] = newAshElement;
			}
		}
	}
}

function updateComponentAshElement(componentAshElement, stream) {
	var render = componentAshElement.instance.render();

	render.owner = componentAshElement;
	render.parent = componentAshElement;
	render.index = 0;

	componentAshElement.isDirty = true;

	walkUpdateComponentAshElement(componentAshElement.children[0], render, stream);

	componentAshElement.instance.isDirty = false;
}

var AshNodeStream = (function (_Stream) {
	function AshNodeStream() {
		_classCallCheck(this, AshNodeStream);

		if (_Stream != null) {
			_Stream.apply(this, arguments);
		}

		this.id = streamId++;
		this.ashElementTree = null;
		this.isUpdating = false;
	}

	_inherits(AshNodeStream, _Stream);

	_createClass(AshNodeStream, [{
		key: 'from',
		value: function from(componentAshElement) {
			if (!(0, _internalsIsComponentAshElement2.default)(componentAshElement)) {
				throw new Error('' + componentAshElement + ' (componentAshElement) must be an Compoent ashElement object instance.');
			}

			this.ashElementTree = (0, _DOMCreateAshElementTree2.default)(componentAshElement, this);

			return _get(Object.getPrototypeOf(AshNodeStream.prototype), 'from', this).call(this, (0, _DOMCreateAshNodeTree2.default)(this.ashElementTree));
		}
	}, {
		key: 'push',
		value: function push(arg) {
			if (arg instanceof _classesComponent2.default && !this.isUpdating) {
				this.isUpdating = true;

				updateComponentAshElement(arg.__element, this);
				_get(Object.getPrototypeOf(AshNodeStream.prototype), 'push', this).call(this, (0, _DOMCreateAshNodeTree2.default)(this.ashElementTree));

				this.isUpdating = false;
			} else if (arg instanceof _classesComponent2.default && this.isUpdating) {
				throw new Error('You cannot update components during previous update!');
			} else {
				_get(Object.getPrototypeOf(AshNodeStream.prototype), 'push', this).call(this, arg);
			}

			return this;
		}
	}], [{
		key: 'from',
		value: function from(componentAshElement) {
			return new AshNodeStream().from(componentAshElement);
		}
	}]);

	return AshNodeStream;
})(_Stream3.default);

exports.default = AshNodeStream;
module.exports = exports.default;
},{"../DOM/createAshElementTree":2,"../DOM/createAshNodeTree":3,"../classes/Component":15,"../internals/constants":20,"../internals/isComponentAshElement":27,"./Stream":38}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _StreamTransformer = require('./StreamTransformer');

var _StreamTransformer2 = _interopRequireDefault(_StreamTransformer);

var _StreamsQueue = require('./StreamsQueue');

var _StreamsQueue2 = _interopRequireDefault(_StreamsQueue);

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var _streamMethods = require('./streamMethods');

var streamsQueue = new _StreamsQueue2.default();

function _ref() {
	return true;
}

var Stream = (function () {
	function Stream() {
		var _ref3 = arguments[0] === undefined ? {} : arguments[0];

		var _ref3$isEndStream = _ref3.isEndStream;
		var isEndStream = _ref3$isEndStream === undefined ? false : _ref3$isEndStream;
		var value = _ref3.value;

		_classCallCheck(this, Stream);

		this.__initializeProperties();

		if (value !== undefined || typeof arguments[0] === 'object' && arguments[0].hasOwnProperty('value')) {
			this.value = value;
			this.hasValue = true;
		}

		// autobind push method
		// this.push = this.push.bind(this);

		this.isEndStream = !!isEndStream;

		if (!this.isEndStream) {
			this.end = new Stream({ isEndStream: true });
			this.end.__listeners.push(this);
		} else {
			this.fn = _ref;
		}
	}

	_createClass(Stream, [{
		key: 'get',
		value: function get() {
			return this.value;
		}
	}, {
		key: 'push',
		value: function push(value) {
			var _this = this;

			// handle a Promise...
			if (value && value.then && (0, _internalsIsFunction2.default)(value.then)) {
				value.then(function (result) {
					_this.push(result);
				}, function (error) {
					_this.push(error);
				});

				return this;
			}

			this.value = value;
			this.hasValue = true;

			if (!(0, _streamMethods.isInStream)(this)) {
				streamsQueue.push(this);

				if (!(0, _streamMethods.getInStream)()) {
					streamsQueue.update();
				}
			} else {
				for (var i = 0; i < this.__listeners.length; i++) {
					if (this.__listeners[i].end === this) {
						(0, _streamMethods.detachStreamDependencies)(this.__listeners[i]);
						(0, _streamMethods.detachStreamDependencies)(this.__listeners[i].end);
					} else {
						this.__listeners[i].__updatedDependencies.push(this);
					}
				}
			}

			return this;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return 'stream(' + this.value + ')';
		}
	}, {
		key: 'from',
		value: function from(arg) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (args.length) {
				if ((0, _internalsIsFunction2.default)(arg)) {
					this.fn = arg;
				}

				(0, _streamMethods.detachStreamDependencies)(this);

				for (var i = 0; i < args.length; i++) {
					if (args[i] instanceof Stream) {
						args[i].__listeners.push(this);
						this.__dependencies.push(args[i]);
					}
				}

				if (!this.isEndStream && this.__dependencies.length) {
					var endStreams = [];

					for (var i = 0; i < this.__dependencies.length; i++) {
						endStreams.push(this.__dependencies[i].end);
					}

					this.endsOn.apply(this, endStreams);
				}

				(0, _streamMethods.updateStream)(this);
				streamsQueue.update();
			} else if (Array.isArray(arg)) {
				for (var i = 0; i < arg.length; i++) {
					this.push(arg[i]);
				}
			} else if (arg && arg.then && (0, _internalsIsFunction2.default)(arg.then)) {
				this.push(arg);
			} else {
				this.push(arg);
			}

			return this;
		}
	}, {
		key: 'subscribe',
		value: function subscribe(fn) {
			return Stream.from(fn, this);
		}
	}, {
		key: 'endsOn',
		value: function endsOn() {
			for (var _len2 = arguments.length, endStreams = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				endStreams[_key2] = arguments[_key2];
			}

			if (this.isEndStream) {
				return this;
			}

			var endStream = new Stream({ isEndStream: true });

			(0, _streamMethods.detachStreamDependencies)(this.end);
			endStream.from.apply(endStream, [null].concat(endStreams));
			endStream.__listeners.push(this.end);
			this.end.__dependencies.push(endStream);

			return this;
		}
	}, {
		key: 'immediate',
		value: function immediate() {
			if (this.__dependenciesMet === false) {
				this.__dependenciesMet = true;

				(0, _streamMethods.updateStream)(this);
				streamsQueue.update();
			}

			return this;
		}
	}, {
		key: 'map',
		value: function map(fn) {
			var _this2 = this;

			return Stream.from(function (stream) {
				stream.push(fn(_this2.get()));
			}, this);
		}
	}, {
		key: 'ap',
		value: function ap(stream) {
			var _this3 = this;

			return Stream.from(function (self) {
				self.push(_this3.get()(stream.get()));
			}, this, stream);
		}
	}, {
		key: 'reduce',
		value: function reduce(fn, acc) {
			var _this4 = this;

			var result = acc;
			var newStream = Stream.from(function () {
				result = fn(result, _this4.get());

				return result;
			}, this);

			if (!newStream.hasValue) {
				newStream.push(acc);
			}

			return newStream;
		}
	}, {
		key: 'merge',
		value: function merge(otherStream) {
			var _this5 = this;

			return Stream.from(function (stream, changed) {
				return changed[0] ? changed[0].get() : _this5.hasValue ? _this5.get() : otherStream.get();
			}, this, otherStream).immediate().endsOn(this.end, otherStream.end);
		}
	}, {
		key: '__initializeProperties',
		value: function __initializeProperties() {
			this.value = undefined;
			this.hasValue = false;
			this.end = undefined;
			this.fn = undefined;
			this.__queued = false;
			this.__listeners = [];
			this.__dependencies = [];
			this.__updatedDependencies = [];
			this.__dependenciesMet = false;
		}
	}], [{
		key: 'isStream',
		value: function isStream(stream) {
			return stream instanceof Stream;
		}
	}, {
		key: 'from',
		value: function from(fn) {
			var _ref2;

			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			return (_ref2 = new Stream()).from.apply(_ref2, [fn].concat(args));
		}
	}, {
		key: 'map',
		value: function map(fn, stream) {
			return stream.map(fn);
		}
	}, {
		key: 'ap',
		value: function ap(stream1, stream2) {
			return stream1.ap(stream2);
		}
	}, {
		key: 'reduce',
		value: function reduce(fn, acc, stream) {
			return stream.reduce(fn, acc);
		}
	}, {
		key: 'merge',
		value: function merge(stream1, stream2) {
			return stream1.merge(stream2);
		}
	}, {
		key: 'transduce',
		value: function transduce(xform, sourceStream) {
			var xformResult = xform(new _StreamTransformer2.default());

			return Stream.from(function (stream) {
				var result = xformResult['@@transducer/step'](undefined, sourceStream.get());

				if (result && result['@@transducer/reduced'] === true) {
					stream.end.push(true);

					return result['@@transducer/value'];
				}

				return result;
			}, sourceStream);
		}
	}]);

	return Stream;
})();

exports.default = Stream;
module.exports = exports.default;
},{"../internals/isFunction":30,"./StreamTransformer":39,"./StreamsQueue":40,"./streamMethods":41}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var StreamTransformer = (function () {
	function StreamTransformer() {
		_classCallCheck(this, StreamTransformer);
	}

	_createClass(StreamTransformer, [{
		key: '@@transducer/init',
		value: function transducerInit() {}
	}, {
		key: '@@transducer/result',
		value: function transducerResult() {}
	}, {
		key: '@@transducer/step',
		value: function transducerStep(s, v) {
			return v;
		}
	}]);

	return StreamTransformer;
})();

exports.default = StreamTransformer;
module.exports = exports.default;
},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _streamMethods = require('./streamMethods');

var streamsQueue;

function findStreamDependencies(stream, dependenciesCache) {
	if (!stream.__queued) {
		stream.__queued = true;

		for (var i = 0; i < stream.__listeners.length; i++) {
			findStreamDependencies(stream.__listeners[i], dependenciesCache);
		}

		dependenciesCache.push(stream);
	}
}

var StreamsQueue = (function () {
	function StreamsQueue() {
		_classCallCheck(this, StreamsQueue);

		this.streams = [];

		if (streamsQueue) {
			return streamsQueue;
		}

		streamsQueue = this;

		return this;
	}

	_createClass(StreamsQueue, [{
		key: 'push',
		value: function push(value) {
			this.streams.push(value);

			return this;
		}
	}, {
		key: 'update',
		value: function update() {
			while (this.streams.length > 0) {
				var dependenciesCache = [];

				for (var i = 0; i < this.streams[0].__listeners.length; i++) {
					if (this.streams[0].__listeners[i].end === this.streams[0]) {
						(0, _streamMethods.detachStreamDependencies)(this.streams[0].__listeners[i]);
						(0, _streamMethods.detachStreamDependencies)(this.streams[0].__listeners[i].end);
					} else {
						this.streams[0].__listeners[i].__updatedDependencies.push(this.streams[0]);

						findStreamDependencies(this.streams[0].__listeners[i], dependenciesCache);
					}
				}

				for (var i = dependenciesCache.length - 1; i >= 0; i--) {
					if (dependenciesCache[i].__updatedDependencies !== undefined && dependenciesCache[i].__updatedDependencies.length) {
						(0, _streamMethods.updateStream)(dependenciesCache[i]);
					}

					dependenciesCache[i].__queued = false;
				}

				this.streams.shift();
			}
		}
	}]);

	return StreamsQueue;
})();

exports.default = StreamsQueue;
module.exports = exports.default;
},{"./streamMethods":41}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.isInStream = isInStream;
exports.getInStream = getInStream;
exports.updateStream = updateStream;
exports.detachStreamDependencies = detachStreamDependencies;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _internalsIsFunction = require('../internals/isFunction');

var _internalsIsFunction2 = _interopRequireDefault(_internalsIsFunction);

var inStream;

function isInStream(stream) {
	return stream === inStream;
}

function getInStream() {
	return inStream;
}

function updateStream(stream) {
	if (stream.end && stream.end.value) {
		return;
	}

	if (!stream.__dependenciesMet) {
		stream.__dependenciesMet = true;

		for (var i = 0; i < stream.__dependencies.length; i++) {
			if (!stream.__dependencies[i].hasValue) {
				stream.__dependenciesMet = false;

				return;
			}
		}
	}

	inStream = stream;

	var newValue = (0, _internalsIsFunction2.default)(stream.fn) ? stream.fn(stream, stream.__updatedDependencies, stream.__dependencies) : undefined;

	if (newValue !== undefined) {
		stream.push(newValue);
	}

	inStream = null;

	stream.__updatedDependencies = [];
}

function detachStreamDependencies(stream) {
	for (var i = 0; i < stream.__dependencies.length; i++) {
		stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.indexOf(stream)] = stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.length - 1];
		stream.__dependencies[i].__listeners.pop();
	}

	stream.__dependencies = [];
}
},{"../internals/isFunction":30}],42:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf ash
 * @type Object
 */
var support = {};

(function () {

	/**
  * Detect if modern javascript is supported.
  *
  * @memberOf ash.support
  * @type boolean
  */
	support.modernJavascript = typeof Object.getOwnPropertyNames && typeof Object.getPrototypeOf === 'function' && typeof Object.defineProperties === 'function' && typeof Object.freeze === 'function' && typeof Object.freeze === 'function' && typeof Function.prototype.bind === 'function' && typeof Array.isArray === 'function' && { __proto__: [] } instanceof Array;

	/**
  */

	support.browser = global.history && global.history.pushState && global.requestAnimationFrame && global.getComputedStyle;

	/**
  * Detect if the DOM is supported.
  *
  * @memberOf ash.support
  * @type boolean
  */
	try {
		support.dom = global.document.createDocumentFragment().nodeType === 11 && typeof global.addEventListener === 'function';
	} catch (error) {
		support.dom = false;
	}
})(0, 0);

// add supported class to <html>
if (support.modernJavascript && support.browser && support.dom) {
	global.document.documentElement.className = global.document.documentElement.className.replace(new RegExp('(^|\\b)' + 'no-js'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	global.document.documentElement.className += ' js ash--supported';
	global.document.documentElement.className = global.document.documentElement.className.trim();
}

if (!support.modernJavascript) {
	throw new Error('Unsupported javascript engine.');
}

exports.default = support;
module.exports = exports.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreSupport = require('./core/support');

var _coreSupport2 = _interopRequireDefault(_coreSupport);

var _coreClassesImmutables = require('./core/classes/Immutables');

var _coreClassesComponent = require('./core/classes/Component');

var _coreClassesComponent2 = _interopRequireDefault(_coreClassesComponent);

var _coreClassesRenderer = require('./core/classes/Renderer');

var _coreClassesRenderer2 = _interopRequireDefault(_coreClassesRenderer);

var _coreStreamsStream = require('./core/streams/Stream');

var _coreStreamsStream2 = _interopRequireDefault(_coreStreamsStream);

var _coreStreamsAshNodeStream = require('./core/streams/AshNodeStream');

var _coreStreamsAshNodeStream2 = _interopRequireDefault(_coreStreamsAshNodeStream);

var _coreInternalsCreateElement = require('./core/internals/createElement');

var _coreInternalsCreateElement2 = _interopRequireDefault(_coreInternalsCreateElement);

var _coreInternalsAssign = require('./core/internals/assign');

var _coreInternalsAssign2 = _interopRequireDefault(_coreInternalsAssign);

var _coreInternalsIsImmutable = require('./core/internals/isImmutable');

var _coreInternalsIsImmutable2 = _interopRequireDefault(_coreInternalsIsImmutable);

var _coreInternalsIsAncestor = require('./core/internals/isAncestor');

var _coreInternalsIsAncestor2 = _interopRequireDefault(_coreInternalsIsAncestor);

/**
 * ash object
 */
var ash = {};

var VERSION = '0.1.0';

(0, _coreInternalsAssign2.default)(ash, {
	VERSION: VERSION,
	support: _coreSupport2.default,

	ImmutableArray: _coreClassesImmutables.ImmutableArray,
	ImmutableObject: _coreClassesImmutables.ImmutableObject,

	Component: _coreClassesComponent2.default,
	Renderer: _coreClassesRenderer2.default,
	Stream: _coreStreamsStream2.default,
	AshNodeStream: _coreStreamsAshNodeStream2.default,

	e: _coreInternalsCreateElement2.default,
	createElement: _coreInternalsCreateElement2.default,

	isImmutable: _coreInternalsIsImmutable2.default,
	isAncestor: _coreInternalsIsAncestor2.default
});

exports.default = ash;
module.exports = exports.default;
},{"./core/classes/Component":15,"./core/classes/Immutables":17,"./core/classes/Renderer":18,"./core/internals/assign":19,"./core/internals/createElement":21,"./core/internals/isAncestor":22,"./core/internals/isImmutable":31,"./core/streams/AshNodeStream":37,"./core/streams/Stream":38,"./core/support":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var App = (function (_ash$Component) {
	function App() {
		_classCallCheck(this, App);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = new _ash2.default.ImmutableObject({
			list1: new _ash2.default.ImmutableArray(),
			list2: new _ash2.default.ImmutableArray(),
			redShadow: true
		});
		this.name = 'App';
	}

	_inherits(App, _ash$Component);

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _ash2.default.e(
				'div',
				null,
				_ash2.default.e(
					'div',
					{ style: {
							boxShadow: this.state.redShadow ? '2px 2px 5px red' : '2px 2px 5px blue'
						} },
					_ash2.default.e(
						'button',
						{ events: {
								click: this.addToList1
							} },
						'+ list 1!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.addToList2
							} },
						'+ list 2!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.clearList1
							} },
						'+ clear 1!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.clearList2
							} },
						'+ clear 2!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.changeShadow
							} },
						'!!!'
					)
				),
				_ash2.default.e(_List2.default, this.state.list1),
				_ash2.default.e(_List2.default, this.state.list2)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'changeShadow',
		value: function changeShadow() {
			this.state = this.state.set('redShadow', !this.state.redShadow);
			this.isDirty = true;
		}
	}, {
		key: 'addToList1',
		value: function addToList1() {
			// console.log('App addToList1...');

			var items = [];

			for (var i = 0; i < 5000; i++) {
				items.push(Math.random().toFixed(1));
			}

			this.state = this.state.merge({ list1: this.state.list1.concat(items) });
			// this.state.list1 = this.state.list1.concat(items);

			this.isDirty = true;
		}
	}, {
		key: 'addToList2',
		value: function addToList2() {
			var items = [];

			for (var i = 0; i < 5000; i++) {
				items.push(Math.random().toFixed(1));
			}

			this.state = this.state.merge({ list2: this.state.list2.concat(items) });
			// this.state.list2 = this.state.list2.concat(items);

			this.isDirty = true;
		}
	}, {
		key: 'clearList1',
		value: function clearList1() {
			this.state = this.state.merge({ list1: [] });
			// this.state.list1 = [];
			this.isDirty = true;
		}
	}, {
		key: 'clearList2',
		value: function clearList2() {
			this.state = this.state.merge({ list2: [] });
			// this.state.list2 = [];
			this.isDirty = true;
		}
	}, {
		key: 'randomFoo',
		get: function () {
			return Math.random();
		}
	}]);

	return App;
})(_ash2.default.Component);

exports.default = App;
module.exports = exports.default;

// console.log('App mounted!');
},{"./List":45,"ash":46}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

function _ref(value, index) {
	return _ash2.default.e(
		'li',
		{ key: '' + index },
		'' + value
	);
}

var List = (function (_ash$Component) {
	function List() {
		_classCallCheck(this, List);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = { redOutline: false };
		this.name = 'List';
	}

	_inherits(List, _ash$Component);

	_createClass(List, [{
		key: 'render',
		value: function render() {
			return _ash2.default.e(
				'ul',
				{ style: {
						outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
					} },
				_ash2.default.e(
					'button',
					{ events: {
							click: this.changeOutline
						} },
					'!!!'
				),
				this.props.map(_ref)
			);
		}
	}, {
		key: 'changeOutline',
		value: function changeOutline() {
			this.state.redOutline = !this.state.redOutline;

			this.isDirty = true;
		}
	}, {
		key: 'onBeforeReceiveProps',
		value: function onBeforeReceiveProps() {}
	}]);

	return List;
})(_ash2.default.Component);

exports.default = List;
module.exports = exports.default;
},{"ash":46}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dist = require('../../../../dist');

var _dist2 = _interopRequireDefault(_dist);

exports.default = _dist2.default;
module.exports = exports.default;
},{"../../../../dist":43}]},{},[1]);
