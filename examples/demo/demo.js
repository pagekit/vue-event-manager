new Vue({

    el: '#app',

    data: function() {
        return {
            eventLog: []
        }
    },

    created: function() {
        this.pushLog('created hook executed');
    },

    events: {

        test: function(fn) {
            this.pushLog('\'test\' event executed using ' + fn);
        },

        pushLog: 'pushLog'

    },

    filters: {

        json: function (val) {
            return JSON.stringify(val, null, 2);
        }

    },

    methods: {

        pushLog: function(msg) {
            this.eventLog.push((new Date).getTime() + ': ' + msg);
        },

        triggerGlobalMethod: function() {
            Vue.events.trigger('test', 'Vue.events.trigger');
        },

        triggerInstanceMethod: function() {
            this.$trigger('test', 'this.$trigger');
        }

    }

});