var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

"use strict";

var _ = require("_");

var Observable = require("./Observable");
var isAshNodeAshElement = require("../internal/isAshNodeAshElement");
var constants = require("../internal/constants");
var findNode = require("../DOM/findNode");

var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

var Component = (function (Observable) {
  var Component = function Component(props) {
    // autobind functions
    var keys = this.autobind();
    var i;

    if (keys && Array.isArray(keys) && keys.length) {
      for (i = 0; i < keys.length; i++) {
        if (_.isFunction(this[keys[i]]) && keys[i] != "constructor") {
          this[keys[i]] = this[keys[i]].bind(this);
        }
      }
    }

    this.props = props || {};
    this.state = this.getInitialState ? this.getInitialState() : {};

    // set state if specified in props
    if (this.props.state) {
      _.keys(this.state).forEach(function (key) {
        this.props.state[key] = this.state[key];
      }, this);

      delete this.props.state;
    }

    this.__isDirty = true;
    this.__lifecycle = LIFECYCLE_UNMOUNTED;
  };

  _extends(Component, Observable);

  _classProps(Component, null, {
    autobind: {
      writable: true,
      value: function () {
        return null;
      }
    },
    setDirty: {
      writable: true,
      value: function (options) {
        this.__isDirty = true;

        if (!options || (options && options.update !== false)) {
          if (this.element.stage) {
            this.element.stage.update();
          }
        }

        return this;
      }
    },
    isMounted: {
      writable: true,
      value: function () {
        return this.__lifecycle == LIFECYCLE_MOUNTED;
      }
    },
    isDirty: {
      writable: true,
      value: function () {
        return !!this.__isDirty;
      }
    },
    setState: {
      writable: true,
      value: function (state) {
        if (state && typeof state === "object") {
          _.assign(this.state, state);

          // set component dirty
          this.setDirty();
        }

        return this;
      }
    },
    __getRender: {
      writable: true,
      value: function () {
        this.__isDirty = false;
        this.__cachedRender = this.render();

        return this.__cachedRender;
      }
    },
    __setLifecycle: {
      writable: true,
      value: function (lifecycle) {
        // value check
        if (lifecycle != LIFECYCLE_UNMOUNTED && lifecycle != LIFECYCLE_MOUNTING && lifecycle != LIFECYCLE_MOUNTED) {
          throw new Error(lifecycle + " must be \"Unmounted\", \"Mounting\" or \"Mounted\".");
        }

        this.__lifecycle = lifecycle;

        return this;
      }
    },
    shouldUpdate: {
      writable: true,
      value: function () {
        return true;
      }
    },
    mount: {
      writable: true,
      value: function () {
        // set lifecycle
        this.__setLifecycle(LIFECYCLE_MOUNTED);

        // call an event
        this.onMount();

        return this;
      }
    },
    unmount: {
      writable: true,
      value: function () {
        // set lifecycle
        this.__setLifecycle(LIFECYCLE_UNMOUNTED);

        // call an event
        this.onUnmount();

        return this;
      }
    },
    onBeforeMount: {
      writable: true,
      value: function () {}
    },
    onMount: {
      writable: true,
      value: function () {}
    },
    onUnmount: {
      writable: true,
      value: function () {}
    },
    onBeforeReceiveProps: {
      writable: true,
      value: function () {}
    },
    render: {
      writable: true,
      value: function () {
        return null;
      }
    },
    getDOMNode: {
      writable: true,
      value: function () {
        if (this.isMounted() && isAshNodeAshElement(this.__cachedRender)) {
          return findNode(this.element.stage.getRootDOMNode(), this.__cachedRender.instance.index);
        }

        return null;
      }
    }
  });

  return Component;
})(Observable);

module.exports = Component;