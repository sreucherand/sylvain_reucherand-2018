export default class Factory {

  constructor () {
    this.component = {};
  }

  register (name, component) {
    this.component[name] = component;
  }

  get (name) {
    return this.component[name];
  }

}
