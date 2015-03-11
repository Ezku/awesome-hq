'use strict';
/*global Cycle */
/** @jsx Cycle.h */

var h = Cycle.h;

function vrenderHeader(people) {
  return <header id="header">
    <h1>Awesome Human Queue</h1>
  </header>
}

function vrenderQueuedPerson(name) {
  return h('li', [
    h('button.button-primary', {
      attributes: {'data-name': name},
      style: nameToUniquePrimaryStyle(name),
      onclick: 'removeFromQueue$'
    }, [
      h('i.fa.fa-chevron-left'),
      ' ',
      name
    ])
  ]);
}

function nameToUniquePrimaryStyle(name) {
  var awesome = Color({ r: 51, g: 195, b: 240 });
  var baseColor = Color('#' + string_to_color(name));

  return {
    background: awesome.rotate(baseColor.hsl().h + 137).hexString(),
    'border-color': 'transparent'
  };
}

function nameToUniqueBasicStyle(name) {
  var awesome = Color({ r: 51, g: 195, b: 240 }).lighten(0.6);
  var baseColor = Color('#' + string_to_color(name));

  return {
    background: awesome.rotate(baseColor.hsl().h + 137).hexString()
  };
}

function vrenderListPerson(name) {
  return h('li', [
    h('button', {
      attributes: {
        'data-name': name
      },
      style: nameToUniqueBasicStyle(name),
      onclick: 'addToQueue$'
    }, [
      name,
      ' ',
      h('i.fa.fa-chevron-right')
    ])
  ]);
}

function vrenderList(unqueued) {
  return h('div#unqueued.one-half.column', [
    h('h3', 'People'),
    h('ul', {
        style: {'display': unqueued.size ? '' : 'none'}
      },
      unqueued.map(vrenderListPerson).toJS()
    )
  ]);
}

function vrenderQueue(queue) {
  return h('div#queued.one-half.column', [
    h('h3', 'Waiting'),
    h('ul', {
        style: {'display': queue.size ? '' : 'none'}
      },
      queue.map(vrenderQueuedPerson).toJS()
    )
  ]);
}

var QueueView = Cycle.createView(function (model) {
  return {
    vtree$: Rx.Observable.zip(
      model.get('unqueued$'),
      model.get('queued$'),
      function (unqueued, queued) {
        return h('div.container', [
          vrenderHeader(),
          h('section#main.row', [
            vrenderList(unqueued),
            vrenderQueue(queued)
          ])
        ]);
      }
    )
  };
});

module.exports = QueueView
