export default class Interactive {

  constructor (element) {
    this.element = element;
    this.element.removeAttribute('data-interactive');
  }

}
