/**
 * Utility functions.
 */

export const isArray = Array.isArray;

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isUndefined(obj) {
    return typeof obj === 'undefined';
}

export function forEach(collection, callback) {
    Object.keys(collection || {}).forEach(key => {
        callback.call(null, collection[key], key);
    });
}

export function array(array = []) {

    if (!array.findIndex) {
        array.findIndex = findIndex;
    }

    return array;
}

/**
 * Array.findIndex() polyfill.
 */
function findIndex(predicate) {

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
