/**
 * Install plugin.
 */

import EventManager from './EventManager';
import {forEach, isArray, isObject} from './util';

var Events = new EventManager();

Events.install = function (Vue) {

    if (this.installed) {
        return;
    }

    Vue.events = this;
    Vue.prototype.$events = this;
    Vue.prototype.$trigger = this.trigger.bind(this);
    Vue.mixin(Number(Vue.version[0]) < 2 ? {init: initEvents} : {beforeCreate: initEvents});
};

function initEvents() {

    var {events} = this.$options, _events = [];

    if (events) {

        forEach(events, (listeners, event) => {
            forEach(isArray(listeners) ? listeners : [listeners], listener => {

                var priority = 0;

                if (isObject(listener)) {
                    priority = listener.priority;
                    listener = listener.handler;
                }

                _events.push(Events.on(event, bindListener(listener, this), priority));
            });
        });

        this.$on('hook:beforeDestroy', () => _events.forEach(off => off()));
    }
}

function bindListener(fn, vm) {

    if (typeof fn === 'string') {
        return function () {
            return vm[fn].apply(vm, arguments);
        }
    }

    return fn.bind(vm);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Events);
}

export default Events;
