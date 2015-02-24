function test() {
	return true;
}

function install(t) {
	return () => {
		setTimeout(t, 0);
	};
}

var timeout = {
	test,
	install
};

export default timeout;
