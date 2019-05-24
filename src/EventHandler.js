/**
 * Event handler callbacks.
 */

import {isUndefined} from './util';

export default {

    async(event, parameters = []) {

        let result = undefined;

        const reject = _result => Promise.reject(_result);
        const reducer = (promise, {callback}) => promise.then(_result => {

            if (!isUndefined(_result)) {
                result = _result;
            }

            return callback(...parameters);

        }, reject);

        return event.listeners.reduce(reducer, Promise.resolve()).then(
            _result => !isUndefined(_result) ? _result : result, reject
        );
    },

    basic(event, parameters = []) {

        let result = undefined;

        for (let i = 0; i < event.listeners.length; i++) {

            const {callback} = event.listeners[i];
            const _result = callback(...parameters);

            if (_result === false) {
                return result;
            }

            if (!isUndefined(_result)) {
                result = _result;
            }
        }

        return result;
    },

    filter(event, parameters = []) {

        if (!parameters.length) {
            throw new Error('Filter must have at least one argument');
        }

        for (let i = 0; i < event.listeners.length; i++) {

            const {callback} = event.listeners[i];
            const _result = callback(...parameters);

            if (_result === false) {
                return parameters[0];
            }

            if (!isUndefined(_result)) {
                parameters[0] = _result;
            }
        }

        return parameters[0];
    }

};
