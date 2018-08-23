/**
 * Install plugin.
 */

import Plugin from './plugin';

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}

export default Plugin;