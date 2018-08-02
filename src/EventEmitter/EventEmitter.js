export default class EventEmitter {
  constructor() {
    this._events = {};
  }

  dispatch(event, ...args) {
    const events = (this._events[event] || []).slice();

    for (let i = 0; i < events.length; i++) {
      events[i].apply(this, args);
    }
  }

  on(event, fn) {
    if (typeof fn !== 'function') {
      return;
    }

    this._events[event] = this._events[event] || [];

    if (this._events[event].indexOf(fn) > -1) {
      return;
    }

    this._events[event].push(fn);
  }

  off(event, fn) {
    let events = this._events[event];

    if (event === undefined) {
      this._events = {};
      return;
    }

    if (events !== undefined && fn === undefined) {
      delete this._events[event];
      return;
    }

    if (events !== undefined) {
      const index = events.indexOf(fn);

      if (index > -1) {
        events.splice(index, 1);
      }
    }
  }
}
