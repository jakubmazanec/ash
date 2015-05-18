'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

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