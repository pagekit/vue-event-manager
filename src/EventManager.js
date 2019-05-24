/**
 * Event manager object.
 */

import Event from './Event';
import Handler from './EventHandler';

export default {

    log: null,

    map: Handler,

    events: {},

    version: '__VERSION__',

    on(event, callback, priority = 0) {

        if (!this.events[event]) {
            this.events[event] = new Event(event);
        }

        return this.events[event].add(callback, priority);
    },

    off(event, callback) {

        if (!event) {
            this.events = {}; return true;
        }

        if (this.events[event]) {
            return this.events[event].remove(callback);
        }

        return false;
    },

    emit(event, ...parameters) {

        const [name, prefix] = event.split(':').reverse();
        const handler = this.map[prefix] || this.map['basic'];
        const _event = this.events[name] || new Event(name);

        if (this.log) {
            this.log(_event, parameters);
        }

        return handler.call(this, _event, parameters);
    }

};
