class StreamTransformer {
	['@@transducer/init']() {}

	['@@transducer/result']() {}

	['@@transducer/step'](s, v) {
		return v;
	}
}

export default StreamTransformer;
