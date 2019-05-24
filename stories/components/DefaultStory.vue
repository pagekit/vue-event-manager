<template>

    <div class="container">

        <h1>Event Manager</h1>

        <hr>

        <button class="btn btn-primary" type="button" @click="emit('test', 'Vue.events.emit')">Vue.events.emit('test')</button>
        <button class="btn btn-primary" type="button" @click="$events.emit('test', 'this.$events.emit')">this.$events.emit('test')</button>

    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        methods: {

            emit(event, ...params) {
                Vue.events.emit(event, ...params);
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
