"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var support = _interopRequire(require("./core/support"));

var _coreClassesImmutables = require("./core/classes/Immutables");

var ImmutableArray = _coreClassesImmutables.ImmutableArray;
var ImmutableObject = _coreClassesImmutables.ImmutableObject;

var Observable = _interopRequire(require("./core/classes/Observable"));

var Component = _interopRequire(require("./core/classes/Component"));

var Renderer = _interopRequire(require("./core/classes/Renderer"));

var Action = _interopRequire(require("./core/classes/Action"));

var Store = _interopRequire(require("./core/classes/Store"));

var createElement = _interopRequire(require("./core/internals/createElement"));

var assign = _interopRequire(require("./core/internals/assign"));

var isImmutable = _interopRequire(require("./core/internals/isImmutable"));

var isAncestor = _interopRequire(require("./core/internals/isAncestor"));

/**
 * ash object
 */
var ash = {};

var VERSION = "0.1.0";

assign(ash, {
	"VERSION": VERSION,
	"support": support,

	"ImmutableArray": ImmutableArray,
	"ImmutableObject": ImmutableObject,

	"Observable": Observable,
	"Component": Component,
	"Renderer": Renderer,
	"Action": Action,
	"Store": Store,

	"e": createElement,
	"createElement": createElement,

	"isImmutable": isImmutable,
	"isAncestor": isAncestor
});

module.exports = ash;