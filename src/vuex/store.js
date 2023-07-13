/**
 * 大致原理：
 * - 就是根据用户传入的state和其他改变state的方法的options对象创建一个store，
 * - 利用Vue构造函数，创建一个组件实例vm（没有模板），包含用户state的响应式数据
 *   ```
 *      data: {
 *        state: options.state
 *      }
 *   ```
 * - 将这个store挂载到根组件上($store = 用户的store)
 * - 其他组件用到这个vm的state时，就会进行依赖收集，当commit改变状态后，那么对应的依赖就会自动执行了，从而做到视图更新
 */
let Vue = null;
// 暴露给用户配置store的类
export class Store {
  constructor(options) {
    this.options = options || {};
    // 将用户的state => vue实例
    // 在模板中用到了 vuex 的vm实例，就会进行依赖收集
    this.vm = new Vue({
      data: {
        state: options.state
      }
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
          }
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
        commit: this.commit.bind(this)
      };
      fn(context, payload);
    }
  }
}

// vue的插件机制
export function install(_Vue) {
  Vue = _Vue;
  // 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。
  // 所有子组件都是继承Vue，所以都会执行
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // 代表就是根组件
        this.$store = this.$options.store;
      } else if (this.$options.parent && this.$options.parent.$store) {
        // 代表就是子组件
        this.$store = this.$options.parent.$store;
      }
    }
  });
}
