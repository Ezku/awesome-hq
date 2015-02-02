'use strict';
/*global Cycle */

var h = Cycle.h;

function vrenderHeader(people) {
  return h('header#header', [
    h('h1', 'queue')
  ]);
}

function vrenderQueuedPerson(name) {
  return h('li', [
    h('label', name),
    h('button', {
      attributes: {'data-name': name},
      onclick: 'removeFromQueue$'
    }, 'Remove')
  ]);
}

function vrenderListPerson(name) {
  return h('li', [
    h('label', name),
    h('button', {
      attributes: {'data-name': name},
      onclick: 'addToQueue$'
    }, 'Add')
  ]);
}

function vrenderList(people) {
  var unqueued = people.list.filter(function(person) {
    return people.queue.indexOf(person) === -1
  });
  return h('ul#unqueued', {
      style: {'display': unqueued.length ? '' : 'none'}
    },
    unqueued.map(vrenderListPerson)
  );
}

function vrenderQueue(people) {
  return h('ul#queued', {
      style: {'display': people.queue.length ? '' : 'none'}
    },
    people.queue.map(vrenderQueuedPerson)
  );
}

var QueueView = Cycle.createView(function (model) {
  return {
    vtree$: model.get('people$')
      .map(function (people) {
        return h('div', [
          vrenderHeader(people),
          h('section#main', [
            vrenderList(people),
            vrenderQueue(people)
          ])
        ]);
      })
  }
});
