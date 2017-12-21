import Vue from 'vue';

describe('Vue.eventmanager Async', () => {
  it('Trigger Method asynchronous', () => {
    new Vue({
      data() {
        return {
          isRun : false
        }
      },
      created() {
        this.$trigger('setRun', [], true);
        this.$trigger('sendParam', 'foo');
      },
      events: {
        setRun() { 
          this.isRun = true;
          expect(this.isRun).toBe(true);
        },
        sendParam(param) { 
          expect(this.isRun).toBe(false);
        }
      }
    });
  });

  it('Trigger Method asynchronous with Different Instances', (done) => {

    var vm1 = new Vue({
      data() {
        return {
          isLoaded : false
        }
      },
      events: {
        testEvent(param) { 
          this.isLoaded = true;
          expect(this.isLoaded).toBe(true);
          done();
        }
      }
    });
    
    var vm2 = new Vue({
      events: {
        testEvent:{
          handler(param) { 
           expect(param).toBe('foo');
           return new Promise((resolve) => {
            setTimeout(resolve, 300);
           });
          },
          priority: 10
        }
      }
    });
   vm1.$trigger('testEvent', 'foo', true);
  });

});