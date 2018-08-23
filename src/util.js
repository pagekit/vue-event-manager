/**
 * Utility functions.
 */

let _config = {};

export const assign = Object.assign || _assign;

export const isArray = Array.isArray;

export default function ({config}) {
    _config = config;
}

export function log(message, color = '#41B883') {
    if (typeof console !== 'undefined' && _config.devtools) {
        console.log(`%c vue-event-manager %c ${message} `, 'color: #fff; background: #35495E; padding: 1px; border-radius: 3px 0 0 3px;', `color: #fff; background: ${color}; padding: 1px; border-radius: 0 3px 3px 0;`);
    }
}

export function warn(message, color = '#DB6B00') {
    log(message, color);
}

export function isObject(val) {
    return val !== null && typeof val === 'object';
}

export function isUndefined(val) {
    return typeof val === 'undefined';
}

export function forEach(collection, callback) {
    Object.keys(collection || {}).forEach(
        key => callback.call(null, collection[key], key)
    );
}

export function array(array = []) {

    if (!array.findIndex) {
        array.findIndex = _findIndex;
    }

    return array;
}

/**
 * Object.assign() polyfill.
 */
function _assign(target, ...sources) {

    sources.forEach(source => {
        Object.keys(source || {}).forEach(
            key => target[key] = source[key]
        );
    });

    return target;
}

/**
 * Array.findIndex() polyfill.
 */
function _findIndex(predicate) {

    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }

    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }

    const o = Object(this);
    const len = o.length >>> 0;
    const thisArg = arguments[1];

    let k = 0;

    while (k < len) {

        const kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
            return k;
        }

        k++;
    }

    return -1;
}
