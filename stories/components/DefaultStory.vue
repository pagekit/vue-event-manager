<template>

    <div class="container">

        <h1>Event Manager</h1>

        <hr>

        <button class="btn btn-primary" type="button" @click="$trigger('test', 'this.$trigger')">Trigger 'test' event using instance method</button>
        <button class="btn btn-primary" type="button" @click="trigger('test', 'Vue.events.trigger')">Trigger 'test' event using global method</button>

    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        methods: {

            trigger(event, params) {
                Vue.events.trigger(event, params);
            }

        },

        events: {

            test(...args) {
                console.log(...args);
            }

        }

    };

</script>

<style>

@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

</style>
