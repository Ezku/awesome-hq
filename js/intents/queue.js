'use strict';
/*global Cycle */

var QueueIntent = Cycle.createIntent(function (view) {
	return {
		addToQueue$: view.get('addToQueue$').map(function(event) {
			return event.target.dataset.name;
		}),
		removeFromQueue$: view.get('removeFromQueue$').map(function(event) {
			return event.target.dataset.name;
		})
	}
});
