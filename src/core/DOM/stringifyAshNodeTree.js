'use strict';

var _ = require('_');
var $ = require('jquery');

var createAshElementTree = require('../DOM/createAshElementTree');
var isAshNode = require('../internal/isAshNode');
var isAshTextNode = require('../internal/isAshTextNode');
var isComponentAshElement = require('../internal/isComponentAshElement');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var createAshNodeTree = require('../DOM/createAshNodeTree');
var createNodeTree = require('../DOM/createNodeTree');
var diffAshNodeTree = require('../DOM/diffAshNodeTree');
var patchNodeTree = require('../DOM/patchNodeTree');
var constants = require('../internal/constants');

var INDEX_ATTRIBUTE_NAME = constants.INDEX_ATTRIBUTE_NAME;
var ORDER_ATTRIBUTE_NAME = constants.ORDER_ATTRIBUTE_NAME;
var LEVEL_SEPARATOR = constants.LEVEL_SEPARATOR;

function escapeAttributeValue(s, preserveCR) {
	preserveCR = preserveCR ? '&#13;' : '\n';
	return ('' + s) /* Forces the conversion to string. */
		.replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
		.replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		/*
		You may add other replacements here for HTML only 
		(but it's not necessary).
		Or for XML, only if the named entities are defined in its DTD.
		*/ 
		.replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
		.replace(/[\r\n]/g, preserveCR);
}

function walkStringifyAshNodeTree(ashNodeTree, index/*, parentIndex*/) {
	var html = '';
	var openingTag = '<';
	var closingTag = '';
	var content = '';
	var parentIndex = arguments[2];
	var i, key1, key2;

	if (isAshNode(ashNodeTree)) {
		openingTag += ashNodeTree.tagName;
		closingTag = '</' + ashNodeTree.tagName + '>';

		if (parentIndex) {
			openingTag += ' ' + INDEX_ATTRIBUTE_NAME + '="' + parentIndex + LEVEL_SEPARATOR + index + '"';
			openingTag += ' ' + ORDER_ATTRIBUTE_NAME + '="' + index + '"';
			parentIndex = parentIndex + LEVEL_SEPARATOR + index;
		} else {
			openingTag += ' ' + INDEX_ATTRIBUTE_NAME + '="' + index + '"';
			openingTag += ' ' + ORDER_ATTRIBUTE_NAME + '="' + index + '"';
			parentIndex = '' + index;
		}

		if (ashNodeTree.properties) {
			for (key1 in ashNodeTree.properties) {
				if (ashNodeTree.properties.hasOwnProperty(key1) && key1 != 'events') {
					if (key1 == 'style') {
						openingTag += ' style="';

						// add style definitions
						for (key2 in ashNodeTree.properties.style) {
							if (ashNodeTree.properties.style.hasOwnProperty(key2)) {
								if (typeof ashNodeTree.properties.style[key2] === 'string') {
									openingTag += key2 + ':' + ashNodeTree.properties.style[key2] + ';';
								} else {
									// TODO
								}
							}
						}

						openingTag += '"';
					} else {
						if (typeof ashNodeTree.properties[key1] === 'string') {
							console.log(key1);
							if (key1.toLowerCase() == 'classname') {
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
				content += walkStringifyAshNodeTree(ashNodeTree.children[i], i, parentIndex);
			}
		}

		html = openingTag + content + closingTag;
	} else {
		html = ashNodeTree.text;
	}

	return html;
}

function stringifyAshNodeTree(ashNodeTree)
{
	return walkStringifyAshNodeTree(ashNodeTree, 0, '');
}

module.exports = stringifyAshNodeTree;