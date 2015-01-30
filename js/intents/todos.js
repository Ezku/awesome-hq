'use strict';
/*global Cycle */

var TodosIntent = Cycle.createIntent(function (view) {
	return {
		addToQueue$: view.get('addToQueue$').map(function(element) {
			return element.getAttribute('data-name');
		}),
		removeFromQueue$: view.get('removeFromQueue$').map(function(element) {
			return element.getAttribute('data-name');
		})
	}
});
