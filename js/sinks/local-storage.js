'use strict';
/*global Cycle */

var LocalStorageSink = Cycle.createDataFlowSink(function (queueModel) {
  // Observe all todos data and save them to localStorage
  return queueModel.get('people$')
    .map(function(people) {
      return people.toJS();
    })
    .subscribe(function (people) {
      localStorage.setItem('awesome-human-queue', JSON.stringify(people));
    });
});
