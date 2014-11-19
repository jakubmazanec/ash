"use strict";

var _ = require("_");
var $ = require("jquery");
var Construct = require("../classes/Construct");
var Events = require("./Events");

var events = new Events();

var router;

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for stripping urls of hash.
var pathStripper = /#.*$/;

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;



// Handles cross-browser history management, based on either
// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
// and URL fragments. If the browser supports neither (old IE, natch),
// falls back to polling.
var Router = Construct.extend({
  constructor: function () {
    if (router) {
      return router;
    }

    if (!(this instanceof Router)) {
      return new Router();
    }

    this.handlers = [];
    this.isStarted = false;
    _.bindAll(this, "checkUrl");

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== "undefined") {
      this.location = window.location;
      this.history = window.history;
    }

    router = this;

    return router;
  },

  getListeners: events.getListeners,
  hasListeners: events.hasListeners,
  listenTo: events.listenTo,
  listenToOnce: events.listenToOnce,
  off: events.off,
  on: events.on,
  once: events.once,
  stopListening: events.stopListening,
  trigger: events.triggerAsync,

  // Are we at the app root?
  atRoot: function () {
    var path = this.location.pathname.replace(/[^\/]$/, "$&/");

    return path === this.root && !this.getSearch();
  },

  // In IE6, the hash fragment and search params are incorrect if the
  // fragment contains `?`.
  getSearch: function () {
    var match = this.location.href.replace(/#.*/, "").match(/\?.+/);

    return match ? match[0] : "";
  },

  // Get the pathname and search params, without the root.
  getPath: function () {
    var path = decodeURI(this.location.pathname + this.getSearch());
    var root = this.root.slice(0, -1);

    if (!path.indexOf(root)) {
      path = path.slice(root.length);
    }

    return path.slice(1);
  },

  // Get the cross-browser normalized URL fragment from the path or hash.
  getFragment: function (fragment) {
    if (typeof fragment === "undefined" || fragment === null) {
      fragment = this.getPath();
    }

    return fragment.replace(routeStripper, "");
  },

  // Start the hash change handling, returning `true` if the current URL matches
  // an existing route, and `false` otherwise.
  start: function (options) {
    // Figure out the initial configuration.
    this.options = _.assign({}, this.options, options);
    this.root = this.options.root || "/";
    this.fragment = this.getFragment();

    // Normalize root to always include a leading and trailing slash.
    this.root = ("/" + this.root + "/").replace(rootStripper, "/");

    $(window).on("popstate", this.checkUrl);

    this.isStarted = true;

    if (!this.options.silent) {
      return this.loadUrl();
    }
  },

  // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
  // but possibly useful for unit testing Routers.
  stop: function () {
    // Remove window listeners.
    $(window).off("popstate");

    this.isStarted = false;
  },

  // Add a route to be tested when the fragment changes. Routes added later
  // may override previous routes.
  route: function (route, callback) {
    this.handlers.unshift({
      route: route,
      callback: callback
    });
  },

  // Checks the current URL to see if it has changed, and if it has,
  // calls `loadUrl`, normalizing across the hidden iframe.
  checkUrl: function (e) {
    var current = this.getFragment();

    if (current === this.fragment) {
      return false;
    }

    this.loadUrl();
  },

  // Attempt to load the current URL fragment. If a route succeeds with a
  // match, returns `true`. If no defined routes matches the fragment,
  // returns `false`.
  loadUrl: function (fragment) {
    this.fragment = this.getFragment(fragment);

    return _.some(this.handlers, function (handler) {
      if (handler.route.test(this.fragment)) {
        handler.callback(this.fragment);

        return true;
      }
    }, this);
  },

  // Save a fragment into the hash history, or replace the URL state if the
  // 'replace' option is passed. You are responsible for properly URL-encoding
  // the fragment in advance.
  //
  // The options object can contain `trigger: true` if you wish to have the
  // route callback be fired (not usually desirable), or `replace: true`, if
  // you wish to modify the current URL without adding an entry to the history.
  navigate: function (fragment, options) {
    if (!this.isStarted) {
      return false;
    }

    if (!options || options === true) {
      options = {
        trigger: !!options
      };
    }

    var url = this.root + (fragment = this.getFragment(fragment || ""));

    // Strip the hash and decode for matching.
    fragment = decodeURI(fragment.replace(pathStripper, ""));

    if (this.fragment === fragment) {
      return;
    }

    this.fragment = fragment;

    // Don't include a trailing slash on the root.
    if (fragment === "" && url !== "/") url = url.slice(0, -1);

    // If pushState is available, we use it to set the fragment as a real URL.
    this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);

    if (options.trigger) {
      return this.loadUrl(fragment);
    }
  },

  // Manually bind a single named route to a callback. For example:
  //
  //     this.route('search/:query/p:num', 'search', function(query, num) {
  //       ...
  //     });
  //
  add: function (route, name /*, callback*/) {
    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    function routeToRegExp(route) {
      route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function (match, optional) {
        return optional ? match : "([^/?]+)";
      }).replace(splatParam, "([^?]*?)");

      return new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$");
    }

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    function extractParameters(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function (param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

    var router = this;

    if (!_.isRegExp(route)) {
      route = routeToRegExp(route);
    }

    router.route(route, function (fragment) {
      var args = extractParameters(route, fragment);

      if (name) {
        router.trigger.apply(router, ["route:" + _.camelCase(name)].concat(args));
      } else {
        router.trigger("route", args);
      }
    });

    return router;
  }
});

module.exports = Router;