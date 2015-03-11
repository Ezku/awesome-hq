/* @flow */

var QueueModelSource: Injectable = require('./sources/queue')
var QueueModel: Injectable = require('./models/queue')
var QueueView: Injectable = require('./views/queue')
var QueueIntent: Injectable = require('./intents/queue')
var LocalStorageSink: Injectable = require('./sinks/local-storage')
var ScrollLocationSink: Injectable = require('./sinks/scroll-location')

Cycle.createRenderer('#queueapp').inject(QueueView);
LocalStorageSink.inject(QueueModel);
ScrollLocationSink.inject(QueueModel);
QueueIntent.inject(QueueView);
QueueView.inject(QueueModel);
QueueModel.inject(QueueIntent, QueueModelSource);
