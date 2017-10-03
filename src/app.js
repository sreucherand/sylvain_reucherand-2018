import InteractivesFactory from './interactive/interactives-factory';

const interactives = [];

const elements = document.querySelectorAll('[data-interactive]');

for (let element of elements) {
  interactives.push(new (InteractivesFactory.get(element.getAttribute('data-interactive')))(element));
}
