"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var support = _interopRequire(require("./core/support"));

var Observable = _interopRequire(require("./core/class/Observable"));

var Component = _interopRequire(require("./core/class/Component"));

var Renderer = _interopRequire(require("./core/class/Renderer"));

var Action = _interopRequire(require("./core/class/Action"));

var Store = _interopRequire(require("./core/class/Store"));

var createElement = _interopRequire(require("./core/internal/createElement"));

var _coreImmutableImmutables = require("./core/immutable/Immutables");

var ImmutableArray = _coreImmutableImmutables.ImmutableArray;
var ImmutableObject = _coreImmutableImmutables.ImmutableObject;

var assign = _interopRequire(require("./core/internal/assign"));

/**
 * ash object
 */
var ash = {};

var VERSION = "0.1.0";

assign(ash, {
	VERSION: VERSION,
	support: support,
	Observable: Observable,
	Component: Component,
	Renderer: Renderer,
	Action: Action,
	Store: Store,

	"e": createElement,
	createElement: createElement,

	ImmutableArray: ImmutableArray,
	ImmutableObject: ImmutableObject
});

module.exports = ash;