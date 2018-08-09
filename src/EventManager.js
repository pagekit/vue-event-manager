/**
 * Event manager class.
 */

import {array, assign, isArray, isObject, isUndefined} from './util';

export default class EventManager {

    constructor() {
        this.log = null;
        this.listeners = {};
    }

    on(event, callback, priority = 0) {

        const listeners = array(this.listeners[event]);
        const index = listeners.findIndex(listener => listener.priority < priority);

        if (~index) {
            listeners.splice(index, 0, {callback, priority});
        } else {
            listeners.push({callback, priority});
        }

        this.listeners[event] = listeners;

        return () => this.off(event, callback);
    }

    off(event, callback) {

        if (!callback) {
            delete this.listeners[event];
        }

        const listeners = this.listeners[event];

        if (listeners && callback) {

            const index = listeners.findIndex(listener => listener.callback === callback);

            if (~index) {
                listeners.splice(index, 1);
            }
        }
    }

    trigger(event, params = [], asynch = false) {

        const _event = new Event(event, params);
        const reject = result => Promise.reject(result);
        const resolve = result => !isUndefined(result) ? result : _event.result;
        const reducer = (result, {callback}) => {

            const next = result => {

                if (!isUndefined(result)) {
                    _event.result = result;
                }

                if (result === false) {
                    _event.stopPropagation();
                }

                if (_event.isPropagationStopped()) {
                    return _event.result;
                }

                return callback.apply(callback, [_event].concat(_event.params));
            };

            return asynch ? result.then(next, reject) : next(result);
        };

        if (this.log) {
            this.log.call(this, _event);
        }

        const listeners = (this.listeners[_event.name] || []).concat();
        const result = listeners.reduce(reducer, asynch ? Promise.resolve() : undefined);

        return asynch ? result.then(resolve, reject) : resolve(result);
    }

}

export class Event {

    constructor(event, params) {

        if (!isObject(event)) {
            event = {name: event};
        }

        if (!isArray(params)) {
            params = [params];
        }

        assign(this, event, {params, result: undefined});
    }

    stopPropagation() {
        this.stop = true;
    }

    isPropagationStopped() {
        return this.stop === true;
    }

}
