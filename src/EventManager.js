/**
 * Event manager class.
 */

import {array, isArray, isUndefined} from './util';

export default class EventManager {

    constructor() {
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

    trigger(event, params, asynch = false) {

        const $event = new Event(event, params);
        const reject = result => Promise.reject(result);
        const resolve = result => !isUndefined(result) ? result : $event.result;
        const reducer = (result, {callback}) => {

            const next = result => {

                if (!isUndefined(result)) {
                    $event.result = result;
                }

                if (result === false) {
                    $event.stopPropagation();
                }

                if ($event.isPropagationStopped()) {
                    return $event.result;
                }

                return callback.apply(callback, [$event].concat($event.params));
            };

            return asynch ? result.then(next, reject) : next(result);
        };

        const listeners = (this.listeners[event] || []).concat();
        const result = listeners.reduce(reducer, asynch ? Promise.resolve() : undefined);

        return asynch ? result.then(resolve, reject) : resolve(result);
    }

}

export class Event {

    constructor(name, params = []) {

        if (!isArray(params)) {
            params = [params];
        }

        this.name = name;
        this.params = params;
        this.result = undefined;
    }

    stopPropagation() {
        this.stop = true;
    }

    isPropagationStopped() {
        return this.stop === true;
    }

}
