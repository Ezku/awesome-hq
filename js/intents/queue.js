'use strict';
/*global Cycle */

function nameFromNearestAncestor(element) {
  if (element.dataset.name) {
    return element.dataset.name;
  }
  if (element.parentNode) {
    try {
      return nameFromNearestAncestor(element.parentNode);
    } catch(e) {
      throw new Error("Could not find an ancestor with name for element: " + element);
    }
  }
  throw new Error("Could not find an ancestor with name");
}

var QueueIntent = Cycle.createIntent(function (view) {
  return {
    addToQueue$: view.get('addToQueue$').map(function(event) {
      event.preventDefault();
      return nameFromNearestAncestor(event.target);
    }),
    removeFromQueue$: view.get('removeFromQueue$').map(function(event) {
      event.preventDefault();
      return nameFromNearestAncestor(event.target);
    })
  }
});

module.exports = QueueIntent
