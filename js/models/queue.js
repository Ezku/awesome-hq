'use strict';
/*global Cycle */

var QueueModel = Cycle.createModel(function (intent, initial) {

  var addToQueueMod$ = intent.get('addToQueue$').map(function(name) {
    return function (peopleData) {
      return peopleData.update('queue', function(queue) {
        return queue.push(name);
      });
    };
  });

  var removeFromQueueMod$ = intent.get('removeFromQueue$').map(function(name) {
    return function (peopleData) {
      return peopleData.update('queue', function(queue) {
        return queue.filterNot(function(queued) {
          return name == queued;
        });
      });
    };
  });

  var incrementWeightMod$ = intent.get('addToQueue$').map(function(name) {
    return function (peopleData) {
      return peopleData.update('weights', function(weights) {
        return weights.update(name, 1, function(weight) {
          return weight + 1;
        });
      });
    };
  })

  var modifications$ = Rx.Observable.merge(
    addToQueueMod$,
    removeFromQueueMod$,
    incrementWeightMod$
  );

  var people$ = modifications$
    .merge(initial.get('peopleData$'))
    .scan(function (data, modification) {
      return modification(data);
    })
    .publish().refCount();

  return {
    people$: people$,
    unqueued$: people$.map(function(people) {
      return people.get('list')
        .filter(function(person) {
          return !people.get('queue').contains(person);
        })
        .sortBy(function(person) {
          return -people.getIn(['weights', person], -1);
        });
    }),
    queued$: people$.map(function(people) {
      return people.get('queue');
    })
  }
});
