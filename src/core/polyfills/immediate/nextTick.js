function test() {
	// Don't get fooled by e.g. browserify environments.
	return process && !process.browser;
}

function install(func) {
	return () => {
		process.nextTick(func);
	};
}

var nextTick = {
	test,
	install
};

export default nextTick;
