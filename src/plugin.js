/**
 * Plugin object.
 */

import Logger from './Logger';
import {assign, forEach, isArray, isObject, inBrowser} from './util';

export default {

    logger: Logger,

    install(Vue, options = {debug: Vue.config.devtools}) {

        if (this.installed) {
            return;
        }

        if (inBrowser && options.debug) {
            this.logger.log(this.version, {prefix: 'vue-event-manager'});
        }

        // add global instance/methods
        Vue.prototype.$events = Vue.events = assign(this, options);

        // add merge strategy for "events"
        Vue.config.optionMergeStrategies.events = mergeEvents;

        // add mixin to parse "events" from component options
        Vue.mixin({beforeCreate: initEvents});
    }

};

export function mergeEvents(parentVal, childVal) {

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

export function initEvents() {

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

                _events.push(this.$events.on(event, bindListener(listener, this), priority));
            });
        });

        this.$on('hook:beforeDestroy', () => _events.forEach(off => off()));
    }
}

export function bindListener(fn, vm) {

    if (typeof fn === 'string') {
        return function () {
            return vm[fn].apply(vm, arguments);
        };
    }

    return fn.bind(vm);
}
