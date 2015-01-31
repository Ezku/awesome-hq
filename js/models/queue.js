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
			peopleData.queue.push(name);
			return peopleData;
		};
	});

	var removeFromQueueMod$ = intent.get('removeFromQueue$').map(function(name) {
		return function (peopleData) {
			var queue = [];
			for (var i in peopleData.queue) {
				if (peopleData.queue[i] !== name) {
					queue.push(peopleData.queue[i]);
				}
			}
			peopleData.queue = queue;
			return peopleData;
		};
	});

	var modifications$ = Rx.Observable.merge(
		addToQueueMod$,
		removeFromQueueMod$
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
