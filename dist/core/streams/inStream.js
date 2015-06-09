"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInStream = getInStream;
exports.setInStream = setInStream;
var inStream;

function getInStream() {
	return inStream;
}

function setInStream(stream) {
	inStream = stream;

	return inStream;
}