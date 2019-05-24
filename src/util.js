/**
 * Utility functions.
 */

export const assign = Object.assign || _assign;
export const isArray = Array.isArray;
export const inBrowser = typeof window !== 'undefined';

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

export function findIndex(array, callback) {

    if (array.findIndex) {
        return array.findIndex(callback);
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return i;
        }
    }

    return -1;
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
