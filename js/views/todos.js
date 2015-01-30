'use strict';
/*global Cycle */

var h = Cycle.h;

function vrenderHeader(todosData) {
	return h('header#header', [
		h('h1', 'queue')
	]);
}

function vrenderQueuedPerson(name) {
	return h('div.view', [
		h('label', {}, name),
		h('button', {
			'data-name': name,
			onclick: 'removeFromQueue$'
		})
	])
}

function vrenderListPerson(name) {
	return h('div.view', [
		h('label', {}, name),
		h('button', {
			'data-name': name,
			onclick: 'addToQueue$'
		})
	])
}

function vrenderList(people) {
	var unqueued = people.list.filter(function(person) {
		return people.queue.indexOf(person) === -1
	});
	return h('section#main', {
		style: {'display': unqueued.length ? '' : 'none'}
	}, [
		h('ul#todo-list', unqueued
			.map(vrenderListPerson)
		)
	])
}

function vrenderQueue(people) {
	return h('section#main', {
		style: {'display': people.queue.length ? '' : 'none'}
	}, [
		h('ul#todo-list', people.queue
			.map(vrenderQueuedPerson)
		)
	])
}

var TodosView = Cycle.createView(function (model) {
	return {
		vtree$: model.get('people$')
			.map(function (todosData) {
				return h('div', [
					vrenderHeader(todosData),
					vrenderList(todosData),
					vrenderQueue(todosData)
				])
			})
	}
});
