'use strict';
/*global Cycle */

Cycle.createRenderer('#todoapp').inject(TodosView);
LocalStorageSink.inject(QueueModel);
QueueIntent.inject(TodosView);
TodosView.inject(QueueModel);
QueueModel.inject(QueueIntent, TodosModelSource);
