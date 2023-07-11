/**
 * 原理：就是就用户传入的state和其他改变state的方法，创建一个store，并
 * 利用Vue构造函数，创建一个组件实例vm（没有模板），包含用户store的state的响应式数据，
 * 并将这个store挂载到根组件上，这个用户store包含了vm和改变state的方法
 * 其他组件用到这个vm的状态时，就会进行依赖收集，当commit改变状态后，那么对于的依赖就会自动执行了，从而做到，视图全局更新了
 */
import { Vue } from "./index";

// 暴露给用户配置store的类
export class Store {
  constructor(options) {
    this.options = options || {};
    // 将用户的state => vue实例
    // 这模板中用到了 vuex的vm实例，
    this.vm = new Vue({
      //vue对data中的数据进行了依赖收集，因此data中的数据是响应式的
      data: {
        state: options.state,
      },
    });
    this.initGetters();
  }
  get state() {
    return this.vm.state;
  }

  initGetters() {
    const getters = this.options.getters || {};
    const target = {};
    const vm = this;
    for (const key in getters) {
      if (Object.hasOwnProperty.call(getters, key)) {
        const fn = getters[key];
        Object.defineProperty(target, key, {
          get() {
            return fn(vm.state);
          },
        });
      }
    }
    this.getters = target;
  }

  commit(type, payload) {
    if (this.options.mutations[type]) {
      const fn = this.options.mutations[type];
      fn(this.state, payload);
    }
  }

  dispatch(type, payload) {
    if (this.options.actions[type]) {
      const fn = this.options.actions[type];
      const context = {
        // 因为用户在actions中使用这个commit时,并不是通过xxx.commit的形式使用，
        // 所以需要把这个这个store实例绑定成this
        commit: this.commit.bind(this),
      };
      fn(context, payload);
    }
  }
}
