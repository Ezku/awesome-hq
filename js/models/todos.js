'use strict';
/*global Cycle */

function getFilterFn(route) {
	switch (route) {
		case '/active':
			return function (task) { return task.completed === false; };
		case '/completed':
			return function (task) { return task.completed === true; };
		default:
			return function () { return true; }; // allow anything
	}
}

function determineTodosIndexes(todosData) {
	todosData.list.forEach(function(todoData, index) {
		todoData.index = index;
	});
	return todosData;
}

function determineFilter(todosData, route) {
	todosData.filter = route.replace('/', '').trim();
	todosData.filterFn = getFilterFn(route);
	return todosData;
}

// Rx's missing golden operator
function withLatest(A$, B$, combineFunc) {
	var hotA$ = A$.publish().refCount();
	return B$
		.map(function (b) {
			return hotA$.map(function (a) { return combineFunc(a, b); });
		})
		.switch();
}

var TodosModel = Cycle.createModel(function (intent, initial) {

	var addToQueueMod$ = intent.get('addToQueue$').map(function(name) {
		return function (peopleData) {
			peopleData.queue.push('name');
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
