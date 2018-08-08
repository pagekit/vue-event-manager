import Vue from 'vue';
import VueEventManager from 'vue-event-manager';
import DefaultStory from './components/DefaultStory.vue';
import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';

// load plugin
Vue.use(VueEventManager, {

    // log event action
    log({name, params}) {
        action(name)(...params);
    }

});

storiesOf('Event Manager', module)
    .add('Default', () => ({extends: DefaultStory}));
