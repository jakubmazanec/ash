"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var AshElement = _interopRequire(require("../class/AshElement"));

var constants = _interopRequire(require("./constants"));

// constants references
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

var createFactory = function (Component) {
	var ComponentElementFactory = AshElement.bind(null, COMPONENT_ASH_ELEMENT, Component);

	ComponentElementFactory.spec = Component;

	return ComponentElementFactory;
};

module.exports = createFactory;