/**
 * 事件总线
 */
export class EventSystem {
    _events;
    constructor() {
      this._events = {};
    }
    on(event, cb) {
      if (!this._events || !this._events[event]) {
        this._events[event] = [];
      }
      this._events[event].push(cb);
      return this;
    }
  
    emit(event, ...args) {
      if (!this._events[event]) {
        return;
      }
      this._events[event].forEach((cb) => {
        cb(...args);
      });
      return this;
    }
  
    off(event, cb) {
      if (!cb) {
        // clear all event cb
        this._events[event] = [];
        return;
      }
      if (this._events[event]) {
        this._events[event] = this._events[event].filter(
          (item) => item !== cb,
        );
      }
      return this;
    }
  
    once(event, cb) {
      const fn = (...args) => {
        cb(...args);
        this.off(event, fn);
      };
      this.on(event, fn);
      return this;
    }
  }
  