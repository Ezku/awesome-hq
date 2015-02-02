'use strict';
/*global Cycle */

// Rx's missing golden operator
function withLatest(A$, B$, combineFunc) {
  var hotA$ = A$.publish().refCount();
  return B$
    .map(function (b) {
      return hotA$.map(function (a) { return combineFunc(a, b); });
    })
    .switch();
}

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

  return {
    people$: modifications$
      .merge(initial.get('peopleData$'))
      .scan(function (data, modification) {
        return modification(data);
      })
      .publish().refCount()
  }
});
