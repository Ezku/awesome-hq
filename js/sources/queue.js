'use strict';
/*global Cycle */

function merge() {
  var result = {};
  for (var i = 0; i < arguments.length; i++) {
    var object = arguments[i];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        result[key] = object[key];
      }
    }
  }
  return result;
}

var defaultQueueData = {
  list: [
    "Christoffer",
    "Dr. Luukkainen",
    "Ezku",
    "Harri",
    "Henri",
    "Jesse",
    "Juha",
    "JuhQ",
    "Matti",
    "Marko",
    "Mevi",
    "Nate",
    "Petrus",
    "Rafael",
    "Satu",
    "Sampo",
    "Tomi"
  ],
  weights: {},
  queue: []
};

var storedQueueData = JSON.parse(localStorage.getItem('awesome-human-queue')) || {};

var initialQueueData = merge(defaultQueueData, storedQueueData);

var QueueModelSource = Cycle.createDataFlowSource({
  peopleData$: Rx.Observable.just(initialQueueData).map(function(data) {
    return Immutable.fromJS(data);
  })
});

module.exports = QueueModelSource
