'use strict';
/*global Cycle */

var h = Cycle.h;

function vrenderHeader(people) {
  return h('header#header', [
    h('h1', 'Awesome Human Queue')
  ]);
}

function vrenderQueuedPerson(name) {
  return h('li', [
    h('button.button-primary', {
      attributes: {'data-name': name},
      onclick: 'removeFromQueue$'
    }, [
      h('i.fa.fa-chevron-left'),
      ' ',
      name
    ])
  ]);
}

function vrenderListPerson(name) {
  return h('li', [
    h('button', {
      attributes: {
        'data-name': name
      },
      onclick: 'addToQueue$'
    }, [
      name,
      ' ',
      h('i.fa.fa-chevron-right')
    ])
  ]);
}

function vrenderList(people) {
  var unqueued = people.list.filter(function(person) {
    return people.queue.indexOf(person) === -1
  });
  return h('div#unqueued.one-half.column', [
    h('h3', 'People'),
    h('ul', {
        style: {'display': unqueued.length ? '' : 'none'}
      },
      unqueued.map(vrenderListPerson)
    )
  ]);
}

function vrenderQueue(people) {
  return h('div#queued.one-half.column', [
    h('h3', 'Waiting'),
    h('ul', {
        style: {'display': people.queue.length ? '' : 'none'}
      },
      people.queue.map(vrenderQueuedPerson)
    )
  ]);
}

var QueueView = Cycle.createView(function (model) {
  return {
    vtree$: model.get('people$')
      .map(function (people) {
        return h('div.container', [
          vrenderHeader(people),
          h('section#main.row', [
            vrenderList(people),
            vrenderQueue(people)
          ])
        ]);
      })
  }
});
