'use strict';
/*global Cycle */

Cycle.createRenderer('#todoapp').inject(TodosView);
LocalStorageSink.inject(TodosModel);
QueueIntent.inject(TodosView);
TodosView.inject(TodosModel);
TodosModel.inject(QueueIntent, TodosModelSource);
