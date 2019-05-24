/**
 * Event class.
 */

import {findIndex} from './util';

export default class Event {

    constructor(name) {
        this.name = name;
        this.listeners = [];
    }

    add(callback, priority = 0) {

        const index = findIndex(this.listeners,
            listener => listener.priority < priority
        );

        if (~index) {
            this.listeners.splice(index, 0, {callback, priority});
        } else {
            this.listeners.push({callback, priority});
        }

        return () => this.remove(callback);
    }

    remove(callback) {

        if (!callback) {
            this.listeners = []; return true;
        }

        const index = findIndex(this.listeners,
            listener => listener.callback === callback
        );

        if (~index) {
            this.listeners.splice(index, 1); return true;
        }

        return false;
    }

}
