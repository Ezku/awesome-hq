'use strict';
/*global Cycle */

Cycle.createRenderer('#todoapp').inject(QueueView);
LocalStorageSink.inject(QueueModel);
QueueIntent.inject(QueueView);
QueueView.inject(QueueModel);
QueueModel.inject(QueueIntent, TodosModelSource);
