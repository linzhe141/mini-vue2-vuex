export let Vue = null;
import { Store } from "./store.js";

const Vuex = {
  // vue的插件机制
  install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
      beforeCreate() {
        if (this.$options.store) {
          this.$store = this.$options.store;
        } else if (this.$options.parent && this.$options.parent.$store) {
          this.$store = this.$options.parent.$store;
        }
      },
    });
  },
  Store,
};
export default Vuex;
