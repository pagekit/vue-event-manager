# vue-event-manager [![Build](https://circleci.com/gh/pagekit/vue-event-manager.svg?style=shield)](https://circleci.com/gh/pagekit/vue-event-manager) [![Downloads](https://img.shields.io/npm/dm/vue-event-manager.svg)](https://www.npmjs.com/package/vue-event-manager) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/vue-event-manager/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue-event-manager) [![Version](https://img.shields.io/npm/v/vue-event-manager.svg)](https://www.npmjs.com/package/vue-event-manager) [![License](https://img.shields.io/npm/l/vue-event-manager.svg)](https://www.npmjs.com/package/vue-event-manager)

The plugin for [Vue.js](http://vuejs.org) provides a declarative way to bind events to a global event manager. It uses the Vue lifecycle to automatically bind and unbind all events.

## Features

- Supports event priorities and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) based asynchronous events
- Supports latest Firefox, Chrome, Safari, Opera and IE9+
- Supports Vue 2.0
- Compact size 3KB (1,5KB gzipped)

## Installation
You can install it via [yarn](https://yarnpkg.com) or [NPM](https://npmjs.org).
```
$ yarn add vue-event-manager
$ npm install vue-event-manager
```

### CDN
Available on [jsdelivr](https://cdn.jsdelivr.net/npm/vue-event-manager@2.1.2) or [unpkg](https://unpkg.com/vue-event-manager@2.1.2).
```html
<script src="https://cdn.jsdelivr.net/npm/vue-event-manager@2.1.2"></script>
```

## Example
Try the example on [jsfiddle](https://jsfiddle.net/gh/get/library/pure/pagekit/vue-event-manager/tree/master/examples/demo/).
```js
new Vue({

  created() {

    // trigger event
    this.$trigger('someEvent', {foo: 'bar'});

  },

  events: {

    // event handler (priority 0)
    someEvent(event, param) { ... },

    // event handler (priority 10)
    earlyEvent: {

        // handler callback
        handler(event, param) { ... },

        // a higher priority, means earlier execution
        priority: 10

    },

    // event handler (priority -10)
    lateEvent: {

        // handler callback
        handler(event, param) { ... },

        // a lower priority, means late execution
        priority: -10

    }

  }

});
```

Lets see how **easy** you can **watch global events** like reactive properties! (Like in this [example](https://vuejs.org/v2/examples/commits.html)).
Let's assume you have a logout button in any component template and want it to be handled *somewhere else* without these nasty `$on(...)` and `$off(...)` lines in the created and destroy hooks.

```html
<!-- logoutButton.vue -->
<button @click="$trigger('logout:the-user')">Logout</button>
```

```js
// userManager.vue
export default {

  name: 'any-other-component',

  events: {
    // the event name string binds the method name string
    'logout:the-user': 'logout'
  },

  methods: {
    // this method will be called everytime the event occurs
    logout (event, param) {
      this.$http.post('/logout')
    }
  }

}
```

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/pagekit/vue-event-manager/releases).

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/pagekit/vue-event-manager/issues) or a [pull request](https://github.com/pagekit/vue-event-manager/pulls).

## License

[MIT](http://opensource.org/licenses/MIT)
