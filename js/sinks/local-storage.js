'use strict';
/*global Cycle */

var LocalStorageSink = Cycle.createDataFlowSink(function (todosModel) {
	// Observe all todos data and save them to localStorage
	return todosModel.get('people$').subscribe(function (todosData) {
		localStorage.setItem('tqueue', JSON.stringify(todosData));
	});
});
