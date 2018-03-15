import Vue from 'vue';

describe('Vue.events', () => {

  it('Trigger Method with one param', () => {
    new Vue({
      created() {
        this.$trigger('someEvent', 'foo');
      },
      events: {
        someEvent(event, param) {
          expect(param).toBe('foo');
          expect(event.name).toBe('someEvent');
        }
      }
    });
  });

  it('Trigger Method with Array', () => {
    new Vue({
      created() {
        this.$trigger('paramArray', ['foo', 'bar']);
      },
      events: {
        paramArray(event, param, param2) {
          expect(param).toBe('foo');
          expect(param2).toBe('bar');
        }
      }
    });
  });

  it('Trigger Method with Object', () => {
    new Vue({
      created() {
        this.$trigger('paramObject', { foo : 'bar' });
      },
      events: {
        paramObject(event, param) {
          expect(param.foo).toBe('bar');
        }
      }
    });
  });

  it('Trigger Method with Priority', () => {
    var vm = new Vue({
      data() {
        return {
          lastPrio : null
        }
      },
      events: {
        // event handler (priority 10)
        prioHandler: [
          {
            // handler callback
            handler(event, param) {
              this.lastPrio = 10;
            },
            // a higher priority, means earlier execution
            priority: 10
          },
          {
            // handler callback
            handler(event, param) {
              expect(this.lastPrio).toBe(10);
              this.lastPrio = -10;
            },
            // a higher priority, means earlier execution
            priority: -10
          }
        ]
      }
    });
    vm.$trigger('prioHandler');
  });


  it('Trigger Method with Different Instances and Priority', () => {

    var vm1 = new Vue({
      data() {
        return {
          isLoaded : false
        }
      },
      events: {
        testEvent(event, param) {
          this.isLoaded = true;
          expect(this.isLoaded).toBe(true);
        }
      }
    });

    var vm2 = new Vue({
      events: {
        testEvent:{
          handler(event, param) {
           expect(param).toBe('foo');
          },
          priority: 10
        }
      }
    });
   vm1.$trigger('testEvent', 'foo');
  });

  it('Trigger Method with Cancel Event', () => {

    var vm1 = new Vue({
      data() {
        return {
          isLoaded: false
        }
      },
      events: {
        actionCancel(event, param) {
          this.isLoaded = true;
          return "lastAction";
        }
      }
    });

    var vm2 = new Vue({
      events: {
        actionCancel:{
          handler(event, param) {
           expect(param).toBe('foo');
           return false;
          },
          priority: 10
        }
      }
    });

    vm1.$trigger('actionCancel', 'foo');
    expect(vm1.isLoaded).toBe(false);

  });

  it('Use string names of methods in event list', () => {
    new Vue({
      data() {
        return {
          isRun : false
        }
      },
      created() {
        this.$trigger('test');
        expect(this.isRun).toBe(true);
      },
      methods: {
        test() {
          this.isRun = true;
        }
      },
      events: {
        test: 'test'
      }
    });
  });

});