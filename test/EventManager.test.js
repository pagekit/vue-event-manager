/* eslint-env jest */

import Vue from 'vue';
import VueEventManager from '../src';

Vue.use(VueEventManager);

/**
 * @jest-environment node
 */
describe('Vue.events', () => {

    it('Basic event', () => {

        const event = 'basic';

        Vue.events.on(event, (foo, bar) => {

            expect(foo).toBe('foo');
            expect(bar).toBe('bar');

            return true;
        });

        expect(Vue.events.emit(event, 'foo', 'bar')).toBe(true);

    });

    it('Basic event with priority', () => {

        const event = 'basicPrio';

        Vue.events.on(event, () => true, 10);
        Vue.events.on(event, () => null, -10);

        expect(Vue.events.emit(event)).toBe(null);

    });

    it('Basic event with stop propergation', () => {

        const event = 'basicStop';

        Vue.events.on(event, () => true, 10);
        Vue.events.on(event, () => false, 0);
        Vue.events.on(event, () => null, -10);

        expect(Vue.events.emit(event)).toBe(true);

    });

    it('Filter event', () => {

        const event = 'testFilter';

        Vue.events.on(event, result => {

            expect(result).toBe('foo');

            return 'bar';
        });

        Vue.events.on(event, result => {

            expect(result).toBe('bar');

            return 'baz';
        });

        expect(Vue.events.emit('filter:testFilter', 'foo')).toBe('baz');

    });

    it('Async event', () => {

        return Vue.events.emit('async:testAsync').then(
      result => expect(result).toBe(undefined)
    );

    });

    it('Async event with listener', () => {

        Vue.events.on('testAsync', () => true);

        return Vue.events.emit('async:testAsync').then(
      result => expect(result).toBe(true)
    );

    });

    it('Unkown event', () => {

        expect(Vue.events.emit('unknown')).toBe(undefined);

    });

});
