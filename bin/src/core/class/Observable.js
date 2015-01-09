var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

"use strict!";

var _ = require("_");
var setImmediate = require("../polyfill/immediate");

// Regular expressions used to split event name strings
var REGEX_TOPIC = /\s+/; // one or more space
var REGEX_CATEGORY = /\.|\//; // dot , or forward slash

var store = global.store = {};

var Observable = (function () {
  var Observable = function Observable() {
    if (!(this instanceof Observable)) {
      return new Observable();
    }

    return this;
  };

  _classProps(Observable, null, {
    observe: {
      writable: true,
      value: function () {
        var observable = this;
        var object = arguments[0];
        var events = arguments[1];
        var callback = arguments[2];
        var context = arguments[3];
        var i;

        if (!_.isObject(object)) {
          throw new Error(object + " must be an object.");
        }

        // events string is missing, we will use '*', and juggle the remaining arguments
        if (_.isFunction(events)) {
          context = callback;
          callback = events;
          events = "*";
        }

        if (!_.isFunction(callback)) {
          throw new Error(callback + " must be a function.");
        }

        if (typeof context !== "undefined" && !_.isObject(context)) {
          throw new Error(context + " must be an object.");
        }

        events = _.isString(events) ? events.trim().split(REGEX_TOPIC) : ["*"];

        for (i = 0; i < events.length; i++) {
          if (!store[events[i]]) {
            store[events[i]] = {
              name: events[i],
              categories: events[i].split(REGEX_CATEGORY),
              observables: []
            };
          }

          store[events[i]].observables.push({
            observable: observable,
            observed: object,
            callback: callback,
            context: context || null
          });
        }

        return observable;
      }
    },
    unobserve: {
      writable: true,
      value: function () {
        var observable = this;
        var object = arguments[0];
        var events = arguments[1];
        var callback = arguments[2];
        var context = arguments[3];
        var i, j, key;

        // events string is missing, we will use '*', and juggle the remaining arguments
        if (_.isFunction(events)) {
          context = callback;
          callback = events;
          events = "*";
        }

        events = _.isString(events) ? events.trim().split(REGEX_TOPIC) : ["*"];

        for (i = 0; i < events.length; i++) {
          for (key in store) {
            if (store.hasOwnProperty(key) && (store[key] == events[i] || events[i] == "*")) {
              for (j = 0; j < store[key].observables.length; j++) {
                // we can remove only this observable
                if (store[key].observables[j].observable == observable) {
                  if ((!object || store[key].observables[j].observed == object) && (!callback || store[key].observables[j].callback == callback) && (!context || store[key].observables[j].context == context)) {
                    // remove observable from the store
                    store[key].observables.splice(j, 1);
                  }
                }
              }
            }
          }
        }

        return observable;
      }
    },
    trigger: {
      writable: true,
      value: function () {
        var observable = this;
        var events = _.isString(arguments[0]) ? arguments[0].trim().split(REGEX_TOPIC) : ["*"];
        var data = [];
        var useAsync = arguments.length > 1 && _.isPlainObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].async ? true : false;
        var noEventArgument = arguments.length > 1 && _.isPlainObject(arguments[arguments.length - 1]) && arguments[arguments.length - 1].noEventArgument ? true : false;
        var categories;
        var i, j, k;

        for (i = 1; i < (useAsync || noEventArgument ? arguments.length - 1 : arguments.length); i++) {
          data.push(arguments[i]);
        }

        function trigger() {
          for (i = 0; i < events.length; i++) {
            categories = events[i].split(REGEX_CATEGORY);

            for (j in store) {
              if (store.hasOwnProperty(j) && (_.isMatching(store[j].categories, categories) || store[j].name == "*" || events[i] == "*")) {
                for (k = 0; k < store[j].observables.length; k++) {
                  if (observable == store[j].observables[k].observed) {
                    if (!noEventArgument) {
                      data = [{
                        type: events[i]
                      }].concat(data);
                    }

                    store[j].observables[k].callback.apply(store[j].observables[k].context || store[j].observables[k].observable, data);
                  }
                }
              }
            }
          }
        }

        if (useAsync) {
          setImmediate(trigger);
        } else {
          trigger();
        }

        return observable;
      }
    }
  });

  return Observable;
})();

module.exports = Observable;