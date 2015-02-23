'use strict';
/*global Cycle */

var ScrollLocationSink = Cycle.createDataFlowSink(function (queueModel) {
  return queueModel
    .get('scrollLocation$')
    .subscribe(function (location) {
      window.scrollTo(location.x, location.y);
    });
});
