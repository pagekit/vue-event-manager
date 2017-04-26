/**
 * Utility functions.
 */

export const isArray = Array.isArray;

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function forEach(collection, callback) {
    Object.keys(collection || {}).forEach(key => {
        callback.call(null, collection[key], key);
    });
}
