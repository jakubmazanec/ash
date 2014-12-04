"use strict!";

var _ = require("_");
var $ = require("jquery");
var Construct = require("../classes/Construct");
var misc = require("../constants/misc");
var parseVirtualDOMIndex = require("../virtualDOM/parseVirtualDOMIndex");

var INDEX_ATTRIBUTE = misc.INDEX_ATTRIBUTE;
var ORDER_ATTRIBUTE = misc.ORDER_ATTRIBUTE;
var STAGE_ATTRIBUTE = misc.STAGE_ATTRIBUTE;

var domEvents;

// list of topics
var topics = window.domTopics = {};

var DOMEvents = Construct.extend({
  constructor: function () {
    if (domEvents) {
      return domEvents;
    }

    if (!(this instanceof DOMEvents)) {
      return new DOMEvents();
    }

    domEvents = this;

    return domEvents;
  },

  addEvent: function (node, eventName, callback) {
    var i;

    if (!topics[eventName]) {
      topics[eventName] = [];

      $(document).on(eventName, this.callback.bind(this, eventName));
    }

    for (i = 0; i < topics[eventName].length; i++) {
      if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE] && topics[eventName][i].index == node[INDEX_ATTRIBUTE]) {
        topics[eventName][i].callback = callback;

        return this;
      }
    }

    topics[eventName].push({
      index: node[INDEX_ATTRIBUTE],
      stage: node[STAGE_ATTRIBUTE],
      callback: callback
    });

    return this;
  },

  removeEvent: function (node, eventName) {
    var i;

    if (eventName && topics[eventName]) {
      for (i = 0; i < topics[eventName].length; i++) {
        if (topics[eventName][i].stage == node[STAGE_ATTRIBUTE] && topics[eventName][i].index == node[INDEX_ATTRIBUTE]) {
          topics[eventName].splice(i, 1);

          return this;
        }
      }
    } else if (!eventName) {
      _.forOwn(topics, function (value, key, object) {
        var i;

        for (i = 0; i < topics[key].length; i++) {
          if (topics[key][i].stage == node[STAGE_ATTRIBUTE] && topics[key][i].index == node[INDEX_ATTRIBUTE]) {
            topics[key].splice(i, 1);

            return this;
          }
        }
      }, this);
    }

    return this;
  },

  // removes all events, that has indx same or matching via _.isMatching
  // removeEvents('0.1') removes events '0.1', '0.1.0', '0.1.1', etc.
  // if eventName is specified, only events with that name are removed
  removeEvents: function (index, stage) {
    //console.log('remove events!');
    _.forOwn(topics, function (value, key, object) {
      var i;

      /*if ((eventName && eventName == key) || !eventName)
      for (i = 0; i < value.length; i++) {
        if (stage == value[i].stage && _.isMatching(index.split("."), value[i].index.split("."), true)) {
          //console.log('match found!');

          value.splice(i, 1);
          i--;
        }
      }
      /*}*/
    }, this);
  },

  reindexEvents: function (oldIndex, newOrder, stage) {
    //console.log('reindex events!', oldIndex, newOrder);
    _.forOwn(topics, function (value, key, object) {
      var i;
      var levels;
      var index;

      for (i = 0; i < value.length; i++) {
        if (stage == value[i].stage && _.isMatching(oldIndex.split("."), value[i].index.split("."), true)) {
          //console.log('match found!');

          levels = parseVirtualDOMIndex(value[i].index);
          levels[parseVirtualDOMIndex(oldIndex).length - 1] = newOrder;
          value[i].index = levels.join(".");
        }
      }
    }, this);
  },

  callback: function (eventName, event) {
    var index = event.target[INDEX_ATTRIBUTE];
    var levels;
    var i;

    if (index) {
      levels = parseVirtualDOMIndex(index);

      while (levels.length) {
        for (i = 0; i < topics[eventName].length; i++) {
          if (topics[eventName][i].index == index && topics[eventName][i].stage == event.target[STAGE_ATTRIBUTE]) {
            topics[eventName][i].callback(event);
          }
        }

        levels.pop();
        index = levels.join(".");
      }
    }
  }
}, {
  extendable: false
});

module.exports = DOMEvents;