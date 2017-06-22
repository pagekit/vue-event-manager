/**
 * Install plugin.
 */

import EventManager from './EventManager';
import { forEach, isArray, isObject } from './util';

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    var Events = new EventManager();
    var version = Number(Vue.version.split('.')[0]);

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

                    _events.push(Events.on(event, listener.bind(this), priority));
                });
            });

            this.$on('hook:beforeDestroy', () => _events.forEach(off => off()));
        }
    }

    Vue.events = Events;
    Vue.prototype.$events = Events;
    Vue.prototype.$trigger = Events.trigger.bind(Events);
    Vue.mixin(version < 2 ? {init: initEvents} : {beforeCreate: initEvents});
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
