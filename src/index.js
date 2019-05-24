/**
 * Install plugin.
 */

import Plugin from './plugin';
import EventManager from './EventManager';
import {assign, inBrowser} from './util';

assign(EventManager, Plugin);

if (inBrowser && window.Vue) {
    window.Vue.use(EventManager);
}

export default EventManager;