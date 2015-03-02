"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isAshTextNode = _interopRequire(require("../internals/isAshTextNode"));

var setNodeProperties = _interopRequire(require("./setNodeProperties"));

var constants = _interopRequire(require("../internals/constants"));

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
	if (ashNodeTree.tagName === "svg" || ashNodeTree.tagName === "use" || ashNodeTree.tagName === "path" || ashNodeTree.tagName === "circle" || ashNodeTree.tagName === "text" || ashNodeTree.tagName === "ellipse" || ashNodeTree.tagName === "line" || ashNodeTree.tagName === "polygon" || ashNodeTree.tagName === "polyline" || ashNodeTree.tagName === "rect" || ashNodeTree.tagName === "g") {
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