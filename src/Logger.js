/**
 * Logger object.
 */

import {assign} from './util';

export default {

    log(message, {prefix, params = [], color = '#41B883'}) {

        const parameters = prefix ? [
            `%c ${prefix} %c ${message} `,
            'color: #fff; background: #35495E; padding: 1px; border-radius: 3px 0 0 3px;',
            `color: #fff; background: ${color}; padding: 1px; border-radius: 0 3px 3px 0;`
        ] : [message];

        console.log(...parameters.concat(params));
    },

    warn(message, options = {}) {
        this.log(message, assign({color: '#DB6B00'}, options));
    },

    info(message, options = {}) {
        this.log(message, assign({color: '#1A73E8'}, options));
    }

};
