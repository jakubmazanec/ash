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