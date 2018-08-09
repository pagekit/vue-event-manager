/**
 * Install plugin.
 */

import EventManager from './EventManager';
import {assign, forEach, isArray, isObject} from './util';

const Events = new EventManager();

Events.install = function (Vue, options = {}) {

    if (this.installed) {
        return;
    }

    // add global instance/methods
    Vue.prototype.$events = Vue.events = assign(Events, options);
    Vue.prototype.$trigger = function (event, params = [], asynch = false) {

        if (!isObject(event)) {
            event = {name: event, origin: this};
        }

        return Events.trigger(event, params, asynch);
    };

    // add merge strategy for "events"
    Vue.config.optionMergeStrategies.events = mergeEvents;

    // add mixin to parse "events" from component options
    Vue.mixin(Number(Vue.version[0]) < 2 ? {init: initEvents} : {beforeCreate: initEvents});
};

function mergeEvents(parentVal, childVal) {

    if (!childVal) {
        return parentVal;
    }

    if (!parentVal) {
        return childVal;
    }

    const events = assign({}, parentVal);

    for (const event in childVal) {

        let parent = events[event];
        const child = childVal[event];

        if (parent && !isArray(parent)) {
            parent = [parent];
        }

        events[event] = parent
            ? parent.concat(child)
            : isArray(child) ? child : [child];
    }

    return events;
}

function initEvents() {

    const _events = [];
    const {events} = this.$options;

    if (events) {

        forEach(events, (listeners, event) => {
            forEach(isArray(listeners) ? listeners : [listeners], listener => {

                let priority = 0;

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
        };
    }

    return fn.bind(vm);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Events);
}

export default Events;
