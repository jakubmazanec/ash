import StreamTransformer from './StreamTransformer';
import StreamsQueue from './StreamsQueue';
import isFunction from '../internals/isFunction';
import {detachStreamDependencies, getInStream, updateStream, updateStreamDependencies} from './streamMethods';


var streamsQueue = new StreamsQueue();

class Stream {
	value = undefined;
	hasValue = false;
	end = undefined;
	fn = undefined;
	transformFn = null;
	isEndStream = false;

	__queued = false;
	__listeners = [];
	__dependencies = [];
	__updatedDependencies = [];
	__dependenciesMet = false;

	constructor({isEndStream = false, value, transformFn} = {}) {
		if (value !== undefined || typeof arguments[0] === 'object' && arguments[0].hasOwnProperty('value')) {
			this.value = value;
			this.hasValue = true;
		}

		// autobind push method
		this.push = this.update = ::this.push;

		if (!isEndStream) {
			this.end = new Stream({isEndStream: true});

			this.end.__listeners.push(this);
		} else {
			this.isEndStream = true;
			this.fn = () => true;
		}

		if (isFunction(transformFn)) {
			this.transformFn = transformFn;
		}
	}

	get() {
		return this.value;
	}

	push(...args) {
		if (args[0] && args[0].then && isFunction(args[0].then)) {
			// handle a Promise...
			args[0].then((result) => {
				this.push(result);
			}, (error) => {
				this.push(error);
			});

			return this;
		}

		this.value = this.transformFn ? this.transformFn(...args) : args[0];
		this.hasValue = true;

		let inStream = getInStream();

		if (!inStream) {
			updateStreamDependencies(this);

			if (streamsQueue.length) {
				streamsQueue.update();
			}
		} else if (inStream === this) {
			for (let i = 0; i < this.__listeners.length; i++) {
				if (this.__listeners[i].end !== this) {
					this.__listeners[i].__updatedDependencies.push(this);
				}	else {
					detachStreamDependencies(this.__listeners[i]);
					detachStreamDependencies(this.__listeners[i].end);
				}
			}
		} else {
			streamsQueue.push(this);
		}

		return this;
	}

	toString() {
		return 'stream(' + this.value + ')';
	}

	static isStream(stream) {
		return stream instanceof Stream;
	}

	from(arg, ...args) {
		if (args.length || isFunction(arg) || arg instanceof Stream) {
			detachStreamDependencies(this);

			if (isFunction(arg)) {
				this.fn = arg;
			} else if (arg instanceof Stream) {
				arg.__listeners.push(this);
				this.__dependencies.push(arg);
			}

			for (let i = 0; i < args.length; i++) {
				if (args[i] instanceof Stream) {
					args[i].__listeners.push(this);
					this.__dependencies.push(args[i]);
				}
			}

			if (!this.isEndStream && this.__dependencies.length) {
				let endStreams = [];

				for (let i = 0; i < this.__dependencies.length; i++) {
					endStreams.push(this.__dependencies[i].end);
				}

				this.endsOn(...endStreams);
			}
			
			if (this.__dependencies.length) {
				updateStream(this);
				streamsQueue.update();
			}
		} else if (Array.isArray(arg)) {
			for (let i = 0; i < arg.length; i++) {
				this.push(arg[i]);
			}
		} else if (arg && arg.then && isFunction(arg.then)) {
			this.push(arg);
		} else {
			this.push(arg);
		}

		return this;
	}

	static from(fn, ...args) {
		return new Stream().from(fn, ...args);
	}

	subscribe(fn) {
		return Stream.from(fn, this);
	}

	endsOn(...endStreams) {
		if (this.isEndStream) {
			return this;
		}

		let endStream = new Stream({isEndStream: true});

		detachStreamDependencies(this.end);
		endStream.from(null, ...endStreams);
		endStream.__listeners.push(this.end);
		this.end.__dependencies.push(endStream);

		return this;
	}

	immediate() {
		if (this.__dependenciesMet === false) {
			this.__dependenciesMet = true;

			updateStream(this);
			streamsQueue.update();
		}

		return this;
	}

	map(fn) {
		return Stream.from((stream) => {
			stream.push(fn(this.get()));
		}, this);
	}

	static map(fn, stream) {
		return stream.map(fn);
	}

	ap(stream) {
		return Stream.from((self) => {
			self.push(this.get()(stream.get()));
		}, this, stream);
	}

	static ap(stream1, stream2) {
		return stream1.ap(stream2);
	}

	reduce(fn, acc) {
		var result = acc;
		var newStream = Stream.from(() => {
			result = fn(result, this.get());

			return result;
		}, this);

		if (!newStream.hasValue) {
			newStream.push(acc);
		}

		return newStream;
	}

	static reduce(fn, acc, stream) {
		return stream.reduce(fn, acc);
	}

	merge(otherStream) {
		return Stream
			.from((self, changed) => changed[0] ? changed[0].get() : this.hasValue ? this.get() : otherStream.get(), this, otherStream)
			.immediate()
			.endsOn(this.end, otherStream.end);
	}

	static merge(stream1, stream2) {
		return stream1.merge(stream2);
	}

	static transduce(xform, sourceStream) {
		var xformResult = xform(new StreamTransformer());

		return Stream.from((stream) => {
			var result = xformResult['@@transducer/step'](undefined, sourceStream.get());

			if (result && result['@@transducer/reduced'] === true) {
				stream.end.push(true);

				return result['@@transducer/value'];
			}

			return result;
		}, sourceStream);
	}
}


export default Stream;
