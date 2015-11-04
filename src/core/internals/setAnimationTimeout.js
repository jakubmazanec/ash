let setAnimationTimeout;

if (global.requestAnimationFrame) {
	setAnimationTimeout = global.requestAnimationFrame;
} else if (global.setImmediate) {
	setAnimationTimeout = global.setImmediate;
} else {
	setAnimationTimeout = function (callback) {
		global.setTimeout(callback, 0);
	};
}

export default setAnimationTimeout;
