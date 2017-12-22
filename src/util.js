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

/**
 * Array.findIndex() polyfill.
 */
if (!Array.prototype.findIndex) {

    // eslint-disable-next-line
    Object.defineProperty(Array.prototype, 'findIndex', {

        value(predicate) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var o = Object(this);
            var len = o.length >>> 0;
            var thisArg = arguments[1];
            var k = 0;

            while (k < len) {

                var kValue = o[k];

                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }

                k++;
            }

            return -1;
        }

    });
}
