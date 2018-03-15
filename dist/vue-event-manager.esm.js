/*!
 * vue-event-manager v2.0.0
 * https://github.com/pagekit/vue-event-manager
 * Released under the MIT License.
 */

/**
 * Utility functions.
 */

var isArray = Array.isArray;

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isUndefined(obj) {
    return typeof obj === 'undefined';
}

function forEach(collection, callback) {
    Object.keys(collection || {}).forEach(function (key) {
        callback.call(null, collection[key], key);
    });
}

/**
 * Array.findIndex() polyfill.
 */
if (!Array.prototype.findIndex) {

    // eslint-disable-next-line
    Object.defineProperty(Array.prototype, 'findIndex', {

        value: function value(predicate) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var o = Object(this);
            var len = o.length >>> 0;
            var thisArg = arguments[1];

            var k = 0;

            while (k < len) {

                var kValue = o[k];

                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }

                k++;
            }

            return -1;
        }

    });
}

/**
 * Event manager class.
 */

var EventManager = function EventManager() {
    this.listeners = {};
};

EventManager.prototype.on = function on (event, callback, priority) {
        var this$1 = this;
        if ( priority === void 0 ) priority = 0;


    var listeners = this.listeners[event] || [];
    var index = listeners.findIndex(function (listener) { return listener.priority < priority; });

    if (~index) {
        listeners.splice(index, 0, {callback: callback, priority: priority});
    } else {
        listeners.push({callback: callback, priority: priority});
    }

    this.listeners[event] = listeners;

    return function () { return this$1.off(event, callback); };
};

EventManager.prototype.off = function off (event, callback) {

    if (!callback) {
        delete this.listeners[event];
    }

    var listeners = this.listeners[event];

    if (listeners && callback) {

        var index = listeners.findIndex(function (listener) { return listener.callback === callback; });

        if (~index) {
            listeners.splice(index, 1);
        }
    }
};

EventManager.prototype.trigger = function trigger (event, params, asynch) {
        if ( asynch === void 0 ) asynch = false;


    var $event = new Event(event, params);
    var reject = function (result) { return Promise.reject(result); };
    var resolve = function (result) { return !isUndefined(result) ? result : $event.result; };
    var reducer = function (result, ref) {
            var callback = ref.callback;


        var next = function (result) {

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

    var listeners = (this.listeners[event] || []).concat();
    var result = listeners.reduce(reducer, asynch ? Promise.resolve() : undefined);

    return asynch ? result.then(resolve, reject) : resolve(result);
};

var Event = function Event(name, params) {
    if ( params === void 0 ) params = [];


    if (!isArray(params)) {
        params = [params];
    }

    this.name = name;
    this.params = params;
    this.result = undefined;
};

Event.prototype.stopPropagation = function stopPropagation () {
    this.stop = true;
};

Event.prototype.isPropagationStopped = function isPropagationStopped () {
    return this.stop === true;
};

/**
 * Install plugin.
 */

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
    var this$1 = this;


    var _events = [];
    var ref = this.$options;
    var events = ref.events;

    if (events) {

        forEach(events, function (listeners, event) {
            forEach(isArray(listeners) ? listeners : [listeners], function (listener) {

                var priority = 0;

                if (isObject(listener)) {
                    priority = listener.priority;
                    listener = listener.handler;
                }

                _events.push(Events.on(event, bindListener(listener, this$1), priority));
            });
        });

        this.$on('hook:beforeDestroy', function () { return _events.forEach(function (off) { return off(); }); });
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
