'use strict';
/*global Cycle */

var QueueModelSource = require('./sources/queue')
var QueueModel = require('./models/queue')
var QueueView = require('./views/queue')
var QueueIntent = require('./intents/queue')
var LocalStorageSink = require('./sinks/local-storage')
var ScrollLocationSink = require('./sinks/scroll-location')

Cycle.createRenderer('#queueapp').inject(QueueView);
LocalStorageSink.inject(QueueModel);
ScrollLocationSink.inject(QueueModel);
QueueIntent.inject(QueueView);
QueueView.inject(QueueModel);
QueueModel.inject(QueueIntent, QueueModelSource);
