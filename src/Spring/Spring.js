import emptyFunction from 'emptyfunction';
import rebound from 'rebound';

import EventEmitter from '../EventEmitter/EventEmitter';

const defaults = {
  delay: 0,
  friction: 10,
  tension: 40,
};

export default class Spring extends EventEmitter {

  static create (options) {
    return new Spring(options);
  }

  constructor (options) {
    super();

    this._listener = null;
    this._value = 0;

    this.options = Object.assign({}, defaults, options);

    const springSystem = new rebound.SpringSystem();

    this._spring = springSystem.createSpring(this.options.tension, this.options.friction);
    this._spring.addListener({
      onSpringAtRest: this.handleSpringAtRest.bind(this),
      onSpringEndStateChange: this.handleSpringEndStateChange.bind(this),
      onSpringUpdate: this.handleSpringUpdate.bind(this),
    });
  }

  handleSpringAtRest (spring) {
    this.complete();
  }

  handleSpringEndStateChange (spring) {
    this.dispatch('endstateupdate', this);
  }

  handleSpringUpdate (spring) {
    this.dispatch('update', spring.getCurrentValue());
  }

  complete () {
    if (this._listener === null) {
      return;
    }

    if (this.value === this._listener.value) {
      this._listener.callback();
    }
  }

  off (...args) {
    super.off(...args);

    return this;
  }

  on (...args) {
    super.on(...args);

    return this;
  }

  setAtRest () {
    this._spring.setAtRest();

    return this;
  }

  stop () {
    this._spring.setCurrentValue(this.value);
  }

  to (value, callback = emptyFunction) {
    if (this.value === value) {
      callback();

      return;
    }

    this._spring.setEndValue(value);

    return this;
  }

  get value () {
    return this._spring.getCurrentValue();
  }

  set value (value) {
    this._spring.setCurrentValue(value);
  }

  get endValue () {
    return this._spring.getEndValue();
  }

  get velocity () {
    return this._spring.getVelocity();
  }

  set velocity (velocity) {
    this._spring.setVelocity(velocity);
  }

}
