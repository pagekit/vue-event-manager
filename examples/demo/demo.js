/* global Vue */

new Vue({

    el: '#app',

    data() {
        return {
            eventLog: []
        };
    },

    created() {
        this.pushLog('created hook executed');
    },

    events: {

        test(fn) {
            this.pushLog('\'test\' event executed using ' + fn);
        },

        pushLog: 'pushLog'

    },

    filters: {

        json (val) {
            return JSON.stringify(val, null, 2);
        }

    },

    methods: {

        pushLog(msg) {
            this.eventLog.push((new Date).getTime() + ': ' + msg);
        },

        triggerGlobalMethod() {
            Vue.events.trigger('test', 'Vue.events.trigger');
        },

        triggerInstanceMethod() {
            this.$trigger('test', 'this.$trigger');
        }

    }

});